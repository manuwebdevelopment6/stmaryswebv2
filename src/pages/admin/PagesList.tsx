import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, FileEdit, Loader2, ArrowRight, Layers } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoles } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import type { PageRow } from "@/lib/cms/types";

const PagesList = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: rolesLoading } = useUserRoles();

  const [pages, setPages] = useState<(PageRow & { block_count: number; draft_count: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/admin/pages");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    (async () => {
      const { data: pageRows } = await supabase.from("pages").select("*").order("title");
      const { data: blockRows } = await supabase.from("page_blocks").select("page_id, draft_data, published_data");
      const counts: Record<string, { total: number; draft: number }> = {};
      (blockRows ?? []).forEach((b) => {
        counts[b.page_id] = counts[b.page_id] ?? { total: 0, draft: 0 };
        counts[b.page_id].total += 1;
        if (JSON.stringify(b.draft_data) !== JSON.stringify(b.published_data)) {
          counts[b.page_id].draft += 1;
        }
      });
      setPages((pageRows ?? []).map((p) => ({
        ...(p as PageRow),
        block_count: counts[p.id]?.total ?? 0,
        draft_count: counts[p.id]?.draft ?? 0,
      })));
      setLoading(false);
    })();
  }, []);

  if (authLoading || rolesLoading || loading) {
    return <SiteLayout><div className="container-prose py-40 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div></SiteLayout>;
  }
  if (!isAdmin) {
    return <SiteLayout><div className="container-prose py-40 text-center"><h1 className="text-2xl font-bold">Admins only</h1></div></SiteLayout>;
  }

  return (
    <SiteLayout>
      <Seo title="Pages — Admin CMS" description="Manage all website pages." />
      <section className="bg-primary-deep text-primary-foreground pt-32 pb-12">
        <div className="container-prose">
          <Link to="/admin" className="text-sm text-primary-foreground/80 hover:text-accent">← Admin dashboard</Link>
          <h1 className="mt-3 font-display font-bold text-display-md">Manage <span className="text-gradient-aurora italic">pages</span></h1>
          <p className="mt-2 text-primary-foreground/80 max-w-2xl">Edit any page on the website. Your changes stay as drafts until you publish.</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container-prose grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <Link
                to={`/admin/pages/${p.slug}`}
                className="group block rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-elevated transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider",
                        p.status === "published" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                      )}>
                        {p.status === "published" ? <Globe className="h-2.5 w-2.5 inline mr-0.5" /> : <FileEdit className="h-2.5 w-2.5 inline mr-0.5" />}
                        {p.status}
                      </span>
                    </div>
                    <code className="text-xs text-muted-foreground font-mono">/{p.slug === "home" ? "" : p.slug}</code>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{p.description}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> {p.block_count} block{p.block_count === 1 ? "" : "s"}</span>
                  {p.draft_count > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent font-mono uppercase">{p.draft_count} draft</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default PagesList;
