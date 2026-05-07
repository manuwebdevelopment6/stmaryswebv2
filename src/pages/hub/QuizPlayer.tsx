import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { awardXp, checkAndAwardBadges } from "@/lib/learning/xp";
import { CheckCircle2, XCircle, Clock, Trophy, ArrowRight, Sparkles, Award } from "lucide-react";
import { toast } from "sonner";

const QuizPlayer = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [awards, setAwards] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data: q } = await supabase.from("quizzes").select("*, subjects(name)").eq("id", id).maybeSingle();
      const { data: qs } = await supabase.from("quiz_questions").select("*").eq("quiz_id", id).order("position");
      setQuiz(q);
      setQuestions(qs ?? []);
      if (q?.time_limit_seconds) setSecondsLeft(q.time_limit_seconds);
    })();
  }, [id]);

  useEffect(() => {
    if (secondsLeft === null || done) return;
    if (secondsLeft <= 0) { submit(); return; }
    const t = setTimeout(() => setSecondsLeft((s) => (s ?? 0) - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, done]);

  const current = questions[idx];
  const totalPoints = useMemo(() => questions.reduce((s, q) => s + (q.points ?? 1), 0), [questions]);

  const toggle = (optId: string) => {
    if (revealed) return;
    if (current.kind === "multi_select") {
      setSelected((s) => (s.includes(optId) ? s.filter((x) => x !== optId) : [...s, optId]));
    } else {
      setSelected([optId]);
    }
  };

  const reveal = () => {
    if (!selected.length) return toast.error("Pick an answer first");
    setAnswers((a) => ({ ...a, [current.id]: selected }));
    setRevealed(true);
  };

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setSelected([]);
      setRevealed(false);
    } else {
      submit();
    }
  };

  const submit = async () => {
    if (done) return;
    const finalAnswers = revealed ? answers : { ...answers, [current?.id]: selected };
    let score = 0;
    for (const q of questions) {
      const picks = finalAnswers[q.id] ?? [];
      const correct = q.correct_option_ids ?? [];
      const setA = new Set(picks);
      const setB = new Set(correct);
      const equal = setA.size === setB.size && [...setA].every((x) => setB.has(x));
      if (equal) score += q.points ?? 1;
    }
    const pct = totalPoints ? Math.round((score / totalPoints) * 100) : 0;
    const xpEarned = Math.round((quiz.xp_reward ?? 50) * (score / Math.max(totalPoints, 1)));

    if (user) {
      await supabase.from("quiz_attempts").insert({
        quiz_id: quiz.id, user_id: user.id,
        submitted_at: new Date().toISOString(),
        score, max_score: totalPoints, percentage: pct,
        answers: finalAnswers, xp_earned: xpEarned,
      });
      if (xpEarned > 0) await awardXp(user.id, xpEarned);
      const newBadges = await checkAndAwardBadges(user.id);
      setAwards(newBadges);
    }
    setResult({ score, total: totalPoints, pct, xp: xpEarned });
    setDone(true);
  };

  if (!quiz) {
    return <SiteLayout><div className="pt-40 pb-20 text-center">Loading…</div></SiteLayout>;
  }

  if (!questions.length) {
    return (
      <SiteLayout>
        <div className="pt-40 pb-20 text-center container-prose">
          <h1 className="font-display text-2xl font-bold">No questions yet</h1>
          <p className="text-muted-foreground mt-2">This quiz hasn't been populated. Try another one.</p>
          <Button asChild className="mt-6"><Link to="/hub">Back to Hub</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  if (done && result) {
    const passed = result.pct >= 50;
    return (
      <SiteLayout>
        <Seo title={`${quiz.title} — Results`} description="Your quiz results" />
        <section className="pt-32 pb-20 bg-gradient-soft min-h-[80vh]">
          <div className="container-prose max-w-2xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="rounded-3xl bg-card border border-border p-10 text-center shadow-card">
              <div className={`grid h-20 w-20 mx-auto place-items-center rounded-full ${passed ? "bg-accent/20 text-accent" : "bg-destructive/10 text-destructive"}`}>
                <Trophy className="h-9 w-9"/>
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold">{passed ? "Well done!" : "Keep practising!"}</h1>
              <p className="mt-2 text-muted-foreground">{quiz.title}</p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <Stat label="Score" value={`${result.score}/${result.total}`} />
                <Stat label="Accuracy" value={`${result.pct}%`} />
                <Stat label="XP Earned" value={`+${result.xp}`} accent />
              </div>
              {awards.length > 0 && (
                <div className="mt-8 rounded-xl bg-accent/10 border border-accent/30 p-4">
                  <div className="flex items-center justify-center gap-2 text-accent font-semibold">
                    <Award className="h-5 w-5"/> New badge{awards.length > 1 ? "s" : ""} unlocked!
                  </div>
                  <div className="mt-2 text-sm">{awards.map((a) => a.name).join(" · ")}</div>
                </div>
              )}
              <div className="mt-8 flex justify-center gap-3 flex-wrap">
                <Button asChild variant="outline"><Link to="/hub">Back to Hub</Link></Button>
                <Button onClick={() => window.location.reload()}>Try again</Button>
              </div>
            </motion.div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const progress = ((idx + (revealed ? 1 : 0)) / questions.length) * 100;

  return (
    <SiteLayout>
      <Seo title={`${quiz.title} — Quiz`} description="Take the quiz" />
      <section className="pt-28 pb-16 bg-background min-h-[85vh]">
        <div className="container-prose max-w-3xl">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div>
              <Badge variant="outline">{quiz.subjects?.name ?? "General"}</Badge>
              <h1 className="mt-2 font-display text-2xl font-bold">{quiz.title}</h1>
            </div>
            {secondsLeft !== null && (
              <div className="flex items-center gap-2 font-mono text-sm bg-card border border-border rounded-lg px-3 py-2">
                <Clock className="h-4 w-4 text-accent"/>
                {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Question {idx + 1} of {questions.length}</span>
            <span>+{quiz.xp_reward} XP available</span>
          </div>
          <Progress value={progress} className="h-2 mb-8" />

          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold leading-snug">{current.prompt}</h2>
                  <div className="mt-6 space-y-3">
                    {(current.options as any[]).map((opt) => {
                      const picked = selected.includes(opt.id);
                      const isCorrect = current.correct_option_ids.includes(opt.id);
                      let cls = "border-border hover:border-primary/50 hover:bg-primary/5";
                      if (revealed) {
                        if (isCorrect) cls = "border-green-500/60 bg-green-500/10";
                        else if (picked) cls = "border-destructive/60 bg-destructive/10";
                        else cls = "border-border opacity-60";
                      } else if (picked) {
                        cls = "border-primary bg-primary/10";
                      }
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggle(opt.id)}
                          disabled={revealed}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${cls}`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="grid h-7 w-7 place-items-center rounded-md bg-muted font-mono text-xs uppercase shrink-0">{opt.id}</span>
                            <span>{opt.text}</span>
                          </span>
                          {revealed && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0"/>}
                          {revealed && picked && !isCorrect && <XCircle className="h-5 w-5 text-destructive shrink-0"/>}
                        </button>
                      );
                    })}
                  </div>

                  {revealed && current.explanation && (
                    <div className="mt-5 rounded-lg bg-muted/50 border-l-4 border-accent p-4 text-sm">
                      <div className="flex items-center gap-2 font-semibold text-accent mb-1"><Sparkles className="h-4 w-4"/>Explanation</div>
                      {current.explanation}
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    {!revealed ? (
                      <Button onClick={reveal} disabled={!selected.length}>Check answer</Button>
                    ) : (
                      <Button onClick={next}>
                        {idx + 1 < questions.length ? <>Next <ArrowRight className="h-4 w-4"/></> : "Finish quiz"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </SiteLayout>
  );
};

const Stat = ({ label, value, accent }: any) => (
  <div className={`rounded-xl border ${accent ? "border-accent bg-accent/10" : "border-border bg-muted/30"} p-4`}>
    <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{label}</div>
    <div className={`mt-1 font-display text-2xl font-bold ${accent ? "text-accent" : ""}`}>{value}</div>
  </div>
);

export default QuizPlayer;
