import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Upload, CheckCircle2, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";

const AssignmentView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [a, setA] = useState<any>(null);
  const [sub, setSub] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data } = await supabase.from("assignments").select("*, subjects(name)").eq("id", id).maybeSingle();
      setA(data);
      if (user) {
        const { data: s } = await supabase.from("assignment_submissions")
          .select("*").eq("assignment_id", id).eq("user_id", user.id).maybeSingle();
        setSub(s);
        if (s?.notes) setNotes(s.notes);
      }
    })();
  }, [id, user]);

  const submit = async () => {
    if (!user || !a) return;
    if (!file && !sub?.file_path) return toast.error("Attach a file");
    setBusy(true);
    try {
      let path = sub?.file_path ?? null;
      if (file) {
        const ext = file.name.split(".").pop();
        path = `${user.id}/${a.id}-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("assignment-submissions").upload(path, file, { upsert: true });
        if (error) throw error;
      }
      if (sub) {
        await supabase.from("assignment_submissions").update({ file_path: path, notes, submitted_at: new Date().toISOString() }).eq("id", sub.id);
      } else {
        await supabase.from("assignment_submissions").insert({ assignment_id: a.id, user_id: user.id, file_path: path, notes });
      }
      toast.success("Submission received!");
      const { data: s } = await supabase.from("assignment_submissions")
        .select("*").eq("assignment_id", id).eq("user_id", user.id).maybeSingle();
      setSub(s);
      setFile(null);
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  if (!a) return <SiteLayout><div className="pt-40 text-center">Loading…</div></SiteLayout>;

  return (
    <SiteLayout>
      <Seo title={`${a.title} — Assignment`} description={a.description ?? ""} />
      <section className="pt-32 pb-16 bg-background">
        <div className="container-prose max-w-3xl">
          <Link to="/hub" className="text-sm text-muted-foreground hover:text-primary">← Back to Hub</Link>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <Badge variant="outline">{a.subjects?.name ?? "General"}</Badge>
            {a.due_date && <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Calendar className="h-3 w-3"/>Due {new Date(a.due_date).toLocaleString()}</span>}
            <Badge className="ml-auto">{a.max_points} pts</Badge>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold">{a.title}</h1>
          <p className="mt-3 text-muted-foreground whitespace-pre-line">{a.description}</p>

          <Card className="mt-8">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary"/> Your submission
              </h2>
              {sub?.graded_at ? (
                <div className="rounded-xl bg-accent/10 border border-accent/30 p-5">
                  <div className="flex items-center gap-2 text-accent font-semibold"><CheckCircle2 className="h-5 w-5"/> Graded</div>
                  <div className="mt-2 font-display text-3xl font-bold">{sub.grade}/{a.max_points}</div>
                  {sub.feedback && <p className="mt-3 text-sm text-foreground/80 whitespace-pre-line">{sub.feedback}</p>}
                </div>
              ) : sub ? (
                <div className="rounded-xl bg-muted/40 border border-border p-4 text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary"/> Submitted {new Date(sub.submitted_at).toLocaleString()} — awaiting grading. You can re-upload until graded.
                </div>
              ) : null}

              <div>
                <Label htmlFor="file">Upload work (PDF, image or document)</Label>
                <Input id="file" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1.5"/>
                {sub?.file_path && !file && <p className="text-xs text-muted-foreground mt-1">Current file uploaded ✓</p>}
              </div>
              <div>
                <Label htmlFor="notes">Notes for your teacher (optional)</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000} rows={4} className="mt-1.5"/>
              </div>
              <Button onClick={submit} disabled={busy || (sub?.graded_at)}>{busy ? "Submitting…" : sub ? "Re-submit" : "Submit assignment"}</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
};

export default AssignmentView;
