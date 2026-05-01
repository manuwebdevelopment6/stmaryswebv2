import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Plus, Save, Send, Eye, EyeOff, GripVertical, Trash2,
  Loader2, ChevronDown, ChevronUp, Globe, FileEdit, ExternalLink,
} from "lucide-react";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoles } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BLOCK_DEFS, BLOCK_LIST } from "@/lib/cms/blocks";
import type { BlockType, PageBlockRow, PageRow } from "@/lib/cms/types";
import { BlockFieldForm } from "@/components/admin/BlockFieldForm";

const PageEditor = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: rolesLoading } = useUserRoles();

  const [page, setPage] = useState<PageRow | null>(null);
  const [blocks, setBlocks] = useState<PageBlockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingMeta, setSavingMeta] = useState(false);
  const [adding, setAdding] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [savingBlock, setSavingBlock] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  // ---- gating ----
  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/admin/pages");
  }, [authLoading, user, navigate]);

  // ---- load ----
  const fetchAll = async () => {
    setLoading(true);
    const { data: pageRow, error: pErr } = await supabase
      .from("pages").select("*").eq("slug", slug).maybeSingle();
    if (pErr || !pageRow) { toast.error(pErr?.message ?? "Page not found"); setLoading(false); return; }
    const { data: blockRows, error: bErr } = await supabase
      .from("page_blocks").select("*").eq("page_id", pageRow.id).order("position");
    if (bErr) toast.error(bErr.message);
    setPage(pageRow as PageRow);
    setBlocks((blockRows ?? []) as PageBlockRow[]);
    setLoading(false);
  };
  useEffect(() => { if (slug) fetchAll(); /* eslint-disable-next-line */ }, [slug]);

  // ---- meta save ----
  const saveMeta = async (patch: Partial<PageRow>) => {
    if (!page) return;
    setSavingMeta(true);
    const { error } = await supabase.from("pages").update(patch).eq("id", page.id);
    setSavingMeta(false);
    if (error) return toast.error(error.message);
    setPage({ ...page, ...patch });
    toast.success("Page details saved");
  };

  // ---- block ops ----
  const addBlock = async (type: BlockType) => {
    if (!page) return;
    const def = BLOCK_DEFS[type];
    const nextPos = blocks.length ? Math.max(...blocks.map((b) => b.position)) + 1 : 0;
    const { data, error } = await supabase.from("page_blocks").insert({
      page_id: page.id,
      block_type: type,
      position: nextPos,
      draft_data: def.defaults,
    }).select("*").single();
    if (error) return toast.error(error.message);
    setBlocks((prev) => [...prev, data as PageBlockRow]);
    setAdding(false);
    setExpanded((data as PageBlockRow).id);
    toast.success(`${def.name} added (draft)`);
  };

  const updateBlockDraft = async (id: string, draft: Record<string, unknown>) => {
    setSavingBlock(id);
    const { error } = await supabase.from("page_blocks")
      .update({ draft_data: draft }).eq("id", id);
    setSavingBlock(null);
    if (error) return toast.error(error.message);
    setBlocks((prev) => prev.map((b) => b.id === id ? { ...b, draft_data: draft } : b));
    toast.success("Draft saved");
  };

  const publishBlock = async (id: string) => {
    const b = blocks.find((x) => x.id === id);
    if (!b) return;
    setSavingBlock(id);
    const { error } = await supabase.from("page_blocks")
      .update({ published_data: b.draft_data }).eq("id", id);
    setSavingBlock(null);
    if (error) return toast.error(error.message);
    setBlocks((prev) => prev.map((x) => x.id === id ? { ...x, published_data: b.draft_data } : x));
    toast.success("Block published — visitors can now see it");
  };

  const toggleVisible = async (id: string) => {
    const b = blocks.find((x) => x.id === id);
    if (!b) return;
    const { error } = await supabase.from("page_blocks")
      .update({ is_visible: !b.is_visible }).eq("id", id);
    if (error) return toast.error(error.message);
    setBlocks((prev) => prev.map((x) => x.id === id ? { ...x, is_visible: !x.is_visible } : x));
  };

  const deleteBlock = async (id: string) => {
    if (!confirm("Delete this block? This cannot be undone.")) return;
    const { error } = await supabase.from("page_blocks").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    toast.success("Block deleted");
  };

  // ---- DnD reorder ----
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = blocks.findIndex((b) => b.id === active.id);
    const newIdx = blocks.findIndex((b) => b.id === over.id);
    const next = arrayMove(blocks, oldIdx, newIdx).map((b, i) => ({ ...b, position: i }));
    setBlocks(next);
    // persist new positions
    await Promise.all(next.map((b) =>
      supabase.from("page_blocks").update({ position: b.position }).eq("id", b.id)
    ));
  };

  // ---- publish all ----
  const publishAll = async () => {
    if (!page) return;
    setPublishing(true);
    const dirty = blocks.filter((b) => JSON.stringify(b.published_data) !== JSON.stringify(b.draft_data));
    await Promise.all(dirty.map((b) =>
      supabase.from("page_blocks").update({ published_data: b.draft_data }).eq("id", b.id)
    ));
    await supabase.from("pages").update({
      status: "published", published_at: new Date().toISOString(),
    }).eq("id", page.id);
    setBlocks((prev) => prev.map((b) => ({ ...b, published_data: b.draft_data })));
    setPage({ ...page, status: "published", published_at: new Date().toISOString() });
    setPublishing(false);
    toast.success(`Published ${dirty.length} block${dirty.length === 1 ? "" : "s"} — live now`);
  };

  // ---- guard ----
  if (authLoading || rolesLoading || loading) {
    return <SiteLayout><div className="container-prose py-40 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div></SiteLayout>;
  }
  if (!isAdmin) {
    return <SiteLayout><div className="container-prose py-40 text-center"><h1 className="text-2xl font-bold">Admins only</h1></div></SiteLayout>;
  }
  if (!page) {
    return <SiteLayout><div className="container-prose py-40 text-center"><h1 className="text-2xl font-bold">Page not found</h1></div></SiteLayout>;
  }

  const dirtyCount = blocks.filter(
    (b) => JSON.stringify(b.published_data) !== JSON.stringify(b.draft_data)
  ).length;

  return (
    <SiteLayout>
      <Seo title={`Edit ${page.title} — Admin`} description="Page editor" />

      {/* Header */}
      <section className="bg-primary-deep text-primary-foreground pt-32 pb-10">
        <div className="container-prose">
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/80 hover:text-accent">
            <ArrowLeft className="h-4 w-4" /> Back to admin dashboard
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Page editor — /{page.slug === "home" ? "" : page.slug}</span>
              <h1 className="mt-1 font-display font-bold text-display-md">{page.title}</h1>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className={cn(
                  "px-2.5 py-1 rounded-full font-mono uppercase tracking-wider",
                  page.status === "published" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                )}>
                  {page.status === "published" ? <Globe className="h-3 w-3 inline mr-1" /> : <FileEdit className="h-3 w-3 inline mr-1" />}
                  {page.status}
                </span>
                {dirtyCount > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent font-mono uppercase tracking-wider">
                    {dirtyCount} unpublished change{dirtyCount === 1 ? "" : "s"}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="hero-outline" size="sm">
                <Link to={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank">
                  <ExternalLink className="h-4 w-4" /> View live
                </Link>
              </Button>
              <Button onClick={publishAll} variant="gold" disabled={publishing || dirtyCount === 0}>
                {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Publish all changes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Page meta */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container-prose grid lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Page title</Label>
            <Input
              defaultValue={page.title}
              onBlur={(e) => e.target.value !== page.title && saveMeta({ title: e.target.value })}
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>SEO description</Label>
            <Textarea
              rows={2}
              defaultValue={page.description ?? ""}
              onBlur={(e) => e.target.value !== (page.description ?? "") && saveMeta({ description: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="py-10 bg-secondary/30 min-h-[60vh]">
        <div className="container-prose">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">Blocks ({blocks.length})</h2>
            <Button onClick={() => setAdding(true)} variant="default">
              <Plus className="h-4 w-4" /> Add block
            </Button>
          </div>

          {blocks.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-border bg-card p-16 text-center">
              <p className="text-muted-foreground mb-4">This page has no blocks yet. Add your first block to get started.</p>
              <Button onClick={() => setAdding(true)} variant="gold"><Plus className="h-4 w-4" /> Add your first block</Button>
            </div>
          )}

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {blocks.map((b) => (
                  <SortableBlock
                    key={b.id}
                    block={b}
                    expanded={expanded === b.id}
                    saving={savingBlock === b.id}
                    onToggleExpand={() => setExpanded(expanded === b.id ? null : b.id)}
                    onSaveDraft={(data) => updateBlockDraft(b.id, data)}
                    onPublish={() => publishBlock(b.id)}
                    onToggleVisible={() => toggleVisible(b.id)}
                    onDelete={() => deleteBlock(b.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </section>

      {/* Add block dialog */}
      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add a block</DialogTitle>
            <DialogDescription>Pick a block type. You can edit its content right after.</DialogDescription>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {BLOCK_LIST.map((def) => (
              <button
                key={def.type}
                onClick={() => addBlock(def.type)}
                className="text-left rounded-lg border border-border bg-card p-4 hover:border-primary/40 hover:shadow-card transition-all"
              >
                <div className="font-semibold">{def.name}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{def.description}</p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
};

const SortableBlock = ({
  block, expanded, saving, onToggleExpand, onSaveDraft, onPublish, onToggleVisible, onDelete,
}: {
  block: PageBlockRow;
  expanded: boolean;
  saving: boolean;
  onToggleExpand: () => void;
  onSaveDraft: (data: Record<string, unknown>) => void;
  onPublish: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
}) => {
  const def = BLOCK_DEFS[block.block_type];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const [draft, setDraft] = useState(block.draft_data);

  useEffect(() => { setDraft(block.draft_data); }, [block.draft_data]);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(block.draft_data);
  const hasUnpublished = JSON.stringify(block.draft_data) !== JSON.stringify(block.published_data);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  // friendly preview line
  const preview = useMemo(() => {
    const d = block.draft_data as Record<string, unknown>;
    return (d.title as string) || (d.eyebrow as string) || (d.label as string) || (d.url as string) || "(empty)";
  }, [block.draft_data]);

  return (
    <div ref={setNodeRef} style={style} className={cn(
      "rounded-xl border bg-card shadow-card",
      block.is_visible ? "border-border" : "border-warning/40 bg-warning/5",
    )}>
      <div className="flex items-center gap-3 p-4">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1" aria-label="Drag to reorder">
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{def?.name ?? block.block_type}</span>
            {!block.is_visible && <span className="text-xs px-2 py-0.5 rounded bg-warning/20 text-warning font-mono uppercase">Hidden</span>}
            {hasUnpublished && <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent font-mono uppercase">Draft</span>}
            {block.published_data && !hasUnpublished && <span className="text-xs px-2 py-0.5 rounded bg-success/15 text-success font-mono uppercase">Live</span>}
            {!block.published_data && <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono uppercase">Never published</span>}
          </div>
          <div className="text-xs text-muted-foreground truncate mt-0.5">{preview}</div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onToggleVisible} title={block.is_visible ? "Hide" : "Show"}>
            {block.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} title="Delete">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggleExpand}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border p-5 space-y-5 bg-background">
          {def ? (
            <>
              <BlockFieldForm fields={def.fields} value={draft} onChange={setDraft} />
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                <Button onClick={() => onSaveDraft(draft)} disabled={!isDirty || saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save draft
                </Button>
                <Button onClick={onPublish} variant="gold" disabled={!hasUnpublished && !isDirty}>
                  <Send className="h-4 w-4" /> Publish this block
                </Button>
                <span className="text-xs text-muted-foreground ml-auto">Last updated {new Date(block.updated_at).toLocaleString()}</span>
              </div>
            </>
          ) : (
            <p className="text-destructive">Unknown block type: {block.block_type}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PageEditor;
