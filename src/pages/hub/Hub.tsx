import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoles } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { xpForLevel } from "@/lib/learning/xp";
import {
  Trophy, Flame, Sparkles, BookOpen, ClipboardList, FileText, Award,
  GraduationCap, Lock, Play, Upload, Crown, Zap, Star,
} from "lucide-react";

const ICONS: Record<string, any> = { Trophy, Flame, Sparkles, Award, Crown, Zap, Star };

const Hub = () => {
  const { user, loading } = useAuth();
  const { hasRole } = useUserRoles();
  const navigate = useNavigate();
  const [xp, setXp] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [myBadges, setMyBadges] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const [{ data: subj }, { data: qz }, { data: asg }, { data: res }, { data: bd }] = await Promise.all([
        supabase.from("subjects").select("*").order("name"),
        supabase.from("quizzes").select("*, subjects(name)").eq("is_published", true).order("created_at", { ascending: false }),
        supabase.from("assignments").select("*, subjects(name)").eq("is_published", true).order("due_date", { ascending: true }),
        supabase.from("learning_resources").select("*, subjects(name)").order("created_at", { ascending: false }).limit(20),
        supabase.from("badges").select("*"),
      ]);
      setSubjects(subj ?? []);
      setQuizzes(qz ?? []);
      setAssignments(asg ?? []);
      setResources(res ?? []);
      setBadges(bd ?? []);

      const { data: lb } = await supabase
        .from("student_xp").select("user_id, xp, level, current_streak").order("xp", { ascending: false }).limit(10);
      if (lb && lb.length) {
        const ids = lb.map((l) => l.user_id);
        const { data: profs } = await supabase.from("profiles").select("user_id, display_name, avatar_url").in("user_id", ids);
        const map = new Map((profs ?? []).map((p) => [p.user_id, p]));
        setLeaderboard(lb.map((l) => ({ ...l, profile: map.get(l.user_id) })));
      }

      if (user) {
        const { data: x } = await supabase.from("student_xp").select("*").eq("user_id", user.id).maybeSingle();
        setXp(x);
        const { data: ub } = await supabase.from("user_badges").select("badge_id").eq("user_id", user.id);
        setMyBadges(new Set((ub ?? []).map((b) => b.badge_id)));
      }
    })();
  }, [user]);

  if (loading) return null;

  if (!user) {
    return (
      <SiteLayout>
        <Seo title="Learning Hub — St. Mary's Bomet" description="Interactive quizzes, assignments and resources for St. Mary's learners." />
        <section className="pt-40 pb-20 bg-primary-deep text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="container-prose relative text-center max-w-2xl mx-auto">
            <Lock className="h-12 w-12 mx-auto text-accent" />
            <h1 className="mt-6 font-display text-4xl font-bold">Sign in to enter the Learning Hub</h1>
            <p className="mt-4 text-primary-foreground/85">Trivia, exams, assignments, leaderboards and resources — all in one place.</p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button asChild variant="hero"><Link to="/auth">Sign in</Link></Button>
              <Button asChild variant="hero-outline"><Link to="/auth?mode=signup">Create account</Link></Button>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const level = xp?.level ?? 1;
  const currentXp = xp?.xp ?? 0;
  const nextLevelXp = xpForLevel(level);
  const prevLevelXp = level > 1 ? xpForLevel(level - 1) : 0;
  const progress = ((currentXp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100;

  return (
    <SiteLayout>
      <Seo title="Learning Hub — St. Mary's Bomet" description="Trivia, quizzes, exams, assignments and resources." />

      {/* Header */}
      <section className="relative bg-primary-deep text-primary-foreground pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="container-prose relative">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Learning Hub</span>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Hello, {user.email?.split("@")[0]}.</h1>
              <p className="mt-1 text-primary-foreground/80 text-sm">Pick up where you left off, or take a fresh trivia round.</p>
            </div>
            {(hasRole("staff") || hasRole("admin")) && (
              <Button asChild variant="hero"><Link to="/hub/teach"><GraduationCap className="h-4 w-4" /> Teacher panel</Link></Button>
            )}
          </div>

          {/* XP card */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-primary/30 backdrop-blur border border-primary-foreground/10 p-5">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest"><Trophy className="h-4 w-4"/> Level {level}</div>
              <div className="mt-2 font-display text-3xl font-bold">{currentXp} <span className="text-base font-normal text-primary-foreground/70">XP</span></div>
              <Progress value={progress} className="mt-3 h-2" />
              <div className="mt-2 text-xs text-primary-foreground/70">{nextLevelXp - currentXp} XP to level {level + 1}</div>
            </div>
            <div className="rounded-2xl bg-primary/30 backdrop-blur border border-primary-foreground/10 p-5">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest"><Flame className="h-4 w-4"/> Streak</div>
              <div className="mt-2 font-display text-3xl font-bold">{xp?.current_streak ?? 0} <span className="text-base font-normal text-primary-foreground/70">days</span></div>
              <div className="mt-3 text-xs text-primary-foreground/70">Longest: {xp?.longest_streak ?? 0} days</div>
            </div>
            <div className="rounded-2xl bg-primary/30 backdrop-blur border border-primary-foreground/10 p-5">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest"><Award className="h-4 w-4"/> Badges</div>
              <div className="mt-2 font-display text-3xl font-bold">{myBadges.size} <span className="text-base font-normal text-primary-foreground/70">/ {badges.length}</span></div>
              <div className="mt-3 flex gap-1.5 flex-wrap">
                {badges.slice(0, 6).map((b) => {
                  const Icon = ICONS[b.icon] ?? Award;
                  const owned = myBadges.has(b.id);
                  return (
                    <div key={b.id} title={`${b.name} — ${b.description}`}
                      className={`grid h-7 w-7 place-items-center rounded-md ${owned ? "bg-accent text-accent-foreground" : "bg-primary-foreground/10 text-primary-foreground/40"}`}>
                      <Icon className="h-3.5 w-3.5"/>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container-prose">
          <Tabs defaultValue="quizzes" className="w-full">
            <TabsList className="mb-6 flex flex-wrap h-auto">
              <TabsTrigger value="quizzes"><Sparkles className="h-4 w-4 mr-1.5"/>Trivia & Quizzes</TabsTrigger>
              <TabsTrigger value="exams"><ClipboardList className="h-4 w-4 mr-1.5"/>Exams</TabsTrigger>
              <TabsTrigger value="assignments"><FileText className="h-4 w-4 mr-1.5"/>Assignments</TabsTrigger>
              <TabsTrigger value="resources"><BookOpen className="h-4 w-4 mr-1.5"/>Resources</TabsTrigger>
              <TabsTrigger value="leaderboard"><Trophy className="h-4 w-4 mr-1.5"/>Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="quizzes">
              <QuizGrid items={quizzes.filter((q) => q.kind !== "exam")} navigate={navigate} />
            </TabsContent>
            <TabsContent value="exams">
              <QuizGrid items={quizzes.filter((q) => q.kind === "exam")} navigate={navigate} />
            </TabsContent>
            <TabsContent value="assignments">
              <AssignmentList items={assignments} />
            </TabsContent>
            <TabsContent value="resources">
              <ResourceList items={resources} subjects={subjects} />
            </TabsContent>
            <TabsContent value="leaderboard">
              <Leaderboard items={leaderboard} currentUserId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </SiteLayout>
  );
};

const QuizGrid = ({ items, navigate }: any) => {
  if (!items.length) return <Empty message="No items published yet. Check back soon!" />;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((q: any, i: number) => (
        <motion.div key={q.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
          <Card className="h-full hover-lift border-border">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="text-xs">{q.subjects?.name ?? "General"}</Badge>
                <Badge className="bg-accent text-accent-foreground text-xs">+{q.xp_reward} XP</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{q.title}</CardTitle>
              <CardDescription className="line-clamp-2">{q.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground mb-3">
                {q.grade_level ?? "All grades"}
                {q.time_limit_seconds ? ` · ${Math.round(q.time_limit_seconds / 60)} min` : ""}
              </div>
              <Button onClick={() => navigate(`/hub/quiz/${q.id}`)} className="w-full">
                <Play className="h-4 w-4"/> Start
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const AssignmentList = ({ items }: any) => {
  if (!items.length) return <Empty message="No assignments yet." />;
  return (
    <div className="space-y-3">
      {items.map((a: any) => (
        <Card key={a.id} className="hover-lift">
          <CardContent className="p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">{a.subjects?.name ?? "General"}</Badge>
                {a.due_date && <span className="text-xs text-muted-foreground">Due {new Date(a.due_date).toLocaleDateString()}</span>}
              </div>
              <h3 className="font-display text-lg font-semibold">{a.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{a.description}</p>
            </div>
            <Button asChild><Link to={`/hub/assignment/${a.id}`}><Upload className="h-4 w-4"/> Open</Link></Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ResourceList = ({ items }: any) => {
  if (!items.length) return <Empty message="No resources uploaded yet." />;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((r: any) => {
        const url = r.external_url || (r.file_path
          ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/learning-resources/${r.file_path}`
          : "#");
        return (
          <a key={r.id} href={url} target="_blank" rel="noreferrer"
            className="block rounded-xl border border-border bg-card p-5 hover-lift">
            <Badge variant="outline" className="text-xs mb-2">{r.kind.replace("_", " ")}</Badge>
            <h3 className="font-display font-semibold">{r.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{r.subjects?.name} · {r.grade_level}</p>
            {r.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.description}</p>}
          </a>
        );
      })}
    </div>
  );
};

const Leaderboard = ({ items, currentUserId }: any) => {
  if (!items.length) return <Empty message="No scores yet — be the first!" />;
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden max-w-2xl mx-auto">
      {items.map((row: any, i: number) => (
        <div key={row.user_id} className={`flex items-center gap-4 p-4 ${row.user_id === currentUserId ? "bg-accent/10" : ""} ${i > 0 ? "border-t border-border" : ""}`}>
          <div className={`grid h-9 w-9 place-items-center rounded-full font-display font-bold text-sm ${i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-zinc-300 text-zinc-900" : i === 2 ? "bg-amber-700 text-white" : "bg-muted text-foreground"}`}>{i + 1}</div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{row.profile?.display_name ?? "Student"}</div>
            <div className="text-xs text-muted-foreground">Level {row.level} · {row.current_streak}-day streak</div>
          </div>
          <div className="font-display font-bold text-primary">{row.xp} XP</div>
        </div>
      ))}
    </div>
  );
};

const Empty = ({ message }: { message: string }) => (
  <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">{message}</div>
);

export default Hub;
