import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoles } from "@/hooks/useUserRole";
import { Sparkles, Plus, Lock, FileText, ClipboardList, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const TeacherPanel = () => {
  const { user, loading } = useAuth();
  const { roles, hasRole } = useUserRoles();
  const allowed = hasRole("staff") || hasRole("admin");

  if (loading) return null;
  if (!user) {
    return <SiteLayout><div className="pt-40 text-center"><Link to="/auth" className="text-primary">Sign in</Link></div></SiteLayout>;
  }
  if (roles.length && !allowed) {
    return (
      <SiteLayout>
        <div className="pt-40 pb-20 container-prose text-center max-w-md mx-auto">
          <Lock className="h-10 w-10 mx-auto text-accent"/>
          <h1 className="mt-4 font-display text-2xl font-bold">Teachers only</h1>
          <p className="mt-2 text-muted-foreground">Ask an administrator to grant you the staff role.</p>
          <Button asChild className="mt-6"><Link to="/hub">Back to Hub</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Seo title="Teacher Panel — Learning Hub" description="Create quizzes, post assignments, and grade submissions." />
      <section className="pt-28 pb-16 bg-background min-h-[85vh]">
        <div className="container-prose">
          <h1 className="font-display text-3xl font-bold">Teacher Panel</h1>
          <p className="text-muted-foreground mt-1">Create quizzes (manually or with Marian AI), post assignments, and grade student work.</p>

          <Tabs defaultValue="quiz" className="mt-8">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="quiz"><Sparkles className="h-4 w-4 mr-1.5"/>New quiz (AI)</TabsTrigger>
              <TabsTrigger value="assignment"><FileText className="h-4 w-4 mr-1.5"/>New assignment</TabsTrigger>
              <TabsTrigger value="grade"><ClipboardList className="h-4 w-4 mr-1.5"/>Grade submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="quiz"><AIQuizForm /></TabsContent>
            <TabsContent value="assignment"><AssignmentForm /></TabsContent>
            <TabsContent value="grade"><GradeList /></TabsContent>
          </Tabs>
        </div>
      </section>
    </SiteLayout>
  );
};

const AIQuizForm = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectId, setSubjectId] = useState("");
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("Grade 10");
  const [count, setCount] = useState(8);
  const [diff, setDiff] = useState<"easy" | "medium" | "hard">("medium");
  const [kind, setKind] = useState<"quiz" | "exam" | "trivia">("quiz");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [publish, setPublish] = useState(true);

  useEffect(() => {
    supabase.from("subjects").select("*").order("name").then(({ data }) => setSubjects(data ?? []));
  }, []);

  const generate = async () => {
    if (!topic.trim()) return toast.error("Enter a topic");
    setBusy(true);
    try {
      const subject = subjects.find((s) => s.id === subjectId);
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: { topic, subject: subject?.name, grade_level: grade, count, difficulty: diff, kind },
      });
      if (error) throw error;
      if ((data as any).error) throw new Error((data as any).error);
      setPreview(data);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to generate");
    } finally { setBusy(false); }
  };

  const save = async () => {
    if (!preview || !user) return;
    setBusy(true);
    try {
      const { data: q, error } = await supabase.from("quizzes").insert({
        title: preview.title, description: preview.description,
        subject_id: subjectId || null, grade_level: grade, kind,
        is_published: publish, created_by: user.id,
        xp_reward: 10 * preview.questions.length,
        time_limit_seconds: kind === "exam" ? preview.questions.length * 60 : null,
      }).select().single();
      if (error) throw error;
      const rows = preview.questions.map((it: any, i: number) => ({
        quiz_id: q.id, position: i, prompt: it.prompt, kind: it.kind,
        options: it.options, correct_option_ids: it.correct_option_ids,
        points: it.points ?? 1, explanation: it.explanation,
      }));
      const { error: qe } = await supabase.from("quiz_questions").insert(rows);
      if (qe) throw qe;
      toast.success(`Quiz "${q.title}" saved!`);
      setPreview(null); setTopic("");
    } catch (e: any) {
      toast.error(e.message ?? "Save failed");
    } finally { setBusy(false); }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Generate a quiz with Marian AI</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Topic</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Photosynthesis, Quadratic equations" />
          </div>
          <div>
            <Label>Subject</Label>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger><SelectValue placeholder="Select subject"/></SelectTrigger>
              <SelectContent>{subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Grade</Label>
            <Input value={grade} onChange={(e) => setGrade(e.target.value)} />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={kind} onValueChange={(v: any) => setKind(v)}>
              <SelectTrigger><SelectValue/></SelectTrigger>
              <SelectContent>
                <SelectItem value="trivia">Trivia</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="exam">Exam (timed)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Number of questions</Label>
            <Input type="number" min={3} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select value={diff} onValueChange={(v: any) => setDiff(v)}>
              <SelectTrigger><SelectValue/></SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="pub" checked={publish} onCheckedChange={setPublish}/>
          <Label htmlFor="pub" className="cursor-pointer">Publish immediately</Label>
        </div>
        <Button onClick={generate} disabled={busy}><Sparkles className="h-4 w-4"/>{busy ? "Generating…" : "Generate with Marian AI"}</Button>

        {preview && (
          <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="font-display text-lg font-semibold">{preview.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{preview.description}</p>
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {preview.questions.map((q: any, i: number) => (
                <div key={i} className="rounded-lg bg-card border border-border p-3">
                  <div className="font-semibold text-sm">{i + 1}. {q.prompt}</div>
                  <ul className="mt-2 space-y-1 text-xs">
                    {q.options.map((o: any) => (
                      <li key={o.id} className={q.correct_option_ids.includes(o.id) ? "text-green-600 font-semibold" : "text-muted-foreground"}>
                        {q.correct_option_ids.includes(o.id) ? "✓" : "○"} {o.id}. {o.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={save} disabled={busy}><Plus className="h-4 w-4"/>Save quiz</Button>
              <Button variant="outline" onClick={() => setPreview(null)}>Discard</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AssignmentForm = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", description: "", subject_id: "", grade_level: "Grade 10", due_date: "", max_points: 100 });
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const { data } = await supabase.from("assignments").select("*, subjects(name)").order("created_at", { ascending: false });
    setList(data ?? []);
  };

  useEffect(() => {
    supabase.from("subjects").select("*").order("name").then(({ data }) => setSubjects(data ?? []));
    refresh();
  }, []);

  const save = async () => {
    if (!form.title.trim() || !user) return toast.error("Title required");
    setBusy(true);
    const { error } = await supabase.from("assignments").insert({
      title: form.title, description: form.description,
      subject_id: form.subject_id || null, grade_level: form.grade_level,
      due_date: form.due_date ? new Date(form.due_date).toISOString() : null,
      max_points: form.max_points, created_by: user.id, is_published: true,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Assignment posted!");
    setForm({ title: "", description: "", subject_id: "", grade_level: "Grade 10", due_date: "", max_points: 100 });
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this assignment?")) return;
    await supabase.from("assignments").delete().eq("id", id);
    refresh();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Post a new assignment</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}/></div>
          <div><Label>Description / instructions</Label><Textarea rows={5} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}/></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Subject</Label>
              <Select value={form.subject_id} onValueChange={(v) => setForm({...form, subject_id: v})}>
                <SelectTrigger><SelectValue placeholder="Select"/></SelectTrigger>
                <SelectContent>{subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Grade</Label><Input value={form.grade_level} onChange={(e) => setForm({...form, grade_level: e.target.value})}/></div>
            <div><Label>Due date</Label><Input type="datetime-local" value={form.due_date} onChange={(e) => setForm({...form, due_date: e.target.value})}/></div>
            <div><Label>Max points</Label><Input type="number" value={form.max_points} onChange={(e) => setForm({...form, max_points: Number(e.target.value)})}/></div>
          </div>
          <Button onClick={save} disabled={busy}><Plus className="h-4 w-4"/>Post assignment</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Posted assignments</CardTitle></CardHeader>
        <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
          {list.length === 0 && <p className="text-sm text-muted-foreground">No assignments yet.</p>}
          {list.map((a) => (
            <div key={a.id} className="rounded-lg border border-border p-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.subjects?.name} · {a.due_date ? `Due ${new Date(a.due_date).toLocaleDateString()}` : "No due date"}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(a.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const GradeList = () => {
  const [subs, setSubs] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [grade, setGrade] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const { user } = useAuth();

  const refresh = async () => {
    const { data } = await supabase.from("assignment_submissions")
      .select("*, assignments(title, max_points), profiles:user_id(display_name)")
      .order("submitted_at", { ascending: false }).limit(50);
    setSubs(data ?? []);
  };

  useEffect(() => { refresh(); }, []);

  const openFile = async (path: string) => {
    const { data } = await supabase.storage.from("assignment-submissions").createSignedUrl(path, 60 * 10);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const saveGrade = async (s: any) => {
    if (!user) return;
    await supabase.from("assignment_submissions").update({
      grade, feedback, graded_by: user.id, graded_at: new Date().toISOString(),
    }).eq("id", s.id);
    toast.success("Graded");
    setActiveId(null); setFeedback(""); setGrade(0);
    refresh();
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Recent submissions</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {subs.length === 0 && <p className="text-sm text-muted-foreground">No submissions yet.</p>}
        {subs.map((s) => (
          <div key={s.id} className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className="font-semibold">{s.assignments?.title}</div>
                <div className="text-xs text-muted-foreground">{s.profiles?.display_name ?? "Student"} · {new Date(s.submitted_at).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                {s.graded_at ? <Badge className="bg-accent text-accent-foreground"><CheckCircle2 className="h-3 w-3 mr-1"/>{s.grade}/{s.assignments?.max_points}</Badge> : <Badge variant="outline">Pending</Badge>}
                {s.file_path && <Button size="sm" variant="outline" onClick={() => openFile(s.file_path)}>View file</Button>}
                {!s.graded_at && <Button size="sm" onClick={() => { setActiveId(s.id); setGrade(0); setFeedback(""); }}>Grade</Button>}
              </div>
            </div>
            {s.notes && <p className="mt-2 text-xs text-muted-foreground italic">"{s.notes}"</p>}
            {activeId === s.id && (
              <div className="mt-3 space-y-2 border-t border-border pt-3">
                <div className="flex gap-2">
                  <Input type="number" placeholder="Grade" value={grade} onChange={(e) => setGrade(Number(e.target.value))} max={s.assignments?.max_points} className="w-32"/>
                  <span className="self-center text-sm text-muted-foreground">/ {s.assignments?.max_points}</span>
                </div>
                <Textarea placeholder="Feedback…" rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)}/>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveGrade(s)}>Save grade</Button>
                  <Button size="sm" variant="ghost" onClick={() => setActiveId(null)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeacherPanel;
