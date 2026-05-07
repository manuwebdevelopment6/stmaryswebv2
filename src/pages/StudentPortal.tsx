import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, Sparkles, Trophy } from "lucide-react";

const StudentPortal = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/hub", { replace: true });
  }, [user, loading, navigate]);

  return (
    <SiteLayout>
      <Seo title="Student Portal — St. Mary's Bomet" description="Sign in to enter the St. Mary's Learning Hub." />
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="container-prose relative max-w-3xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Student Portal</span>
          <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl">
            Welcome to the <span className="text-gradient-aurora italic">Learning Hub</span>
          </h1>
          <p className="mt-5 text-lg text-primary-foreground/85">
            Trivia, quizzes, exams, assignments, resources and a class leaderboard — sign in to begin.
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Button asChild variant="hero"><Link to="/auth">Sign in</Link></Button>
            <Button asChild variant="hero-outline"><Link to="/auth?mode=signup">Create account</Link></Button>
          </div>
          <div className="mt-14 grid sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: Sparkles, t: "Trivia & quizzes", d: "Practice with instant marking and explanations." },
              { icon: GraduationCap, t: "Exams & assignments", d: "Take timed exams and upload your work." },
              { icon: Trophy, t: "XP, badges & streaks", d: "Climb the class leaderboard." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl bg-primary/30 backdrop-blur border border-primary-foreground/10 p-5">
                <c.icon className="h-6 w-6 text-accent"/>
                <h3 className="mt-3 font-display text-lg font-semibold">{c.t}</h3>
                <p className="mt-1 text-sm text-primary-foreground/75">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default StudentPortal;
