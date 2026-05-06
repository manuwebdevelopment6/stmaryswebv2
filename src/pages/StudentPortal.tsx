import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  GraduationCap,
  Calendar,
  FileText,
  BookOpen,
  Bell,
  CreditCard,
  MessageSquare,
  ClipboardList,
  Lock,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const TILES = [
  { icon: ClipboardList, title: "Results & Reports", desc: "View your latest CBC assessment reports and end-term grades.", soon: true },
  { icon: Calendar, title: "Class Timetable", desc: "Your weekly timetable, exam schedules and term calendar.", soon: true },
  { icon: FileText, title: "Past Papers", desc: "Download past papers and marking schemes for your grade.", to: "/exam-downloads" },
  { icon: BookOpen, title: "Learning Resources", desc: "Notes, videos and CBC project briefs from your teachers.", soon: true },
  { icon: Bell, title: "School Announcements", desc: "Important notices from the principal's office.", to: "/news" },
  { icon: CreditCard, title: "Fee Statement", desc: "View your current fee balance and payment history.", soon: true },
  { icon: MessageSquare, title: "Talk to a Teacher", desc: "Send a message to your class teacher or HOD.", to: "/contact" },
  { icon: GraduationCap, title: "My Application", desc: "Track the status of your application or open a draft.", to: "/admissions" },
];

const StudentPortal = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <SiteLayout>
      <Seo
        title="Student Portal — St. Mary's Bomet"
        description="Sign in to the St. Mary's Student Portal to view results, timetables, fee statements, past papers and announcements."
      />

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="aurora-orb h-[380px] w-[380px] -left-20 top-10 bg-primary-glow opacity-30" />
        <div className="container-prose relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              — Student Portal
            </span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              Welcome to your <span className="text-gradient-aurora italic">portal</span>.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-xl">
              Your one stop for results, timetables, learning resources and announcements at
              St. Mary's Bomet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auth gate or dashboard */}
      <section className="py-20 bg-background">
        <div className="container-prose">
          {!user ? (
            <div className="rounded-2xl border border-border bg-card p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-card">
              <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-primary/10 text-primary">
                <Lock className="h-7 w-7" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-foreground">
                Sign in to continue
              </h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                Use your school account to access results, timetables and protected resources.
                Don't have one yet? Create an account to start an application.
              </p>
              <div className="mt-7 flex justify-center gap-3 flex-wrap">
                <Button asChild variant="default">
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/auth?mode=signup">Create account</Link>
                </Button>
              </div>
              <p className="mt-8 text-xs text-muted-foreground border-t border-border pt-6">
                Lost your credentials? Contact the school office at
                <span className="text-primary font-semibold"> stmaryssecbomet@gmail.com</span> or call
                <span className="text-primary font-semibold"> +254 721 771 568</span>.
              </p>
            </div>
          ) : (
            <>
              {/* Welcome strip */}
              <div className="rounded-2xl bg-primary-deep text-primary-foreground p-7 mb-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
                <div className="relative flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-primary-foreground/75 font-mono uppercase tracking-widest">
                      Signed in as
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold">{user.email}</p>
                  </div>
                  <Button onClick={handleSignOut} variant="hero-outline" size="sm">
                    <LogOut className="h-4 w-4" /> Sign out
                  </Button>
                </div>
              </div>

              {/* Tile grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {TILES.map((t, i) => {
                  const inner = (
                    <>
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-gradient-cyan group-hover:text-accent-foreground transition-colors">
                        <t.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {t.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {t.desc}
                      </p>
                      {t.soon && (
                        <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Coming soon
                        </span>
                      )}
                    </>
                  );

                  return t.to ? (
                    <motion.div
                      key={t.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                    >
                      <Link
                        to={t.to}
                        className="group block rounded-2xl border border-border bg-card p-5 hover-lift focus:outline-none focus:ring-2 focus:ring-ring h-full"
                      >
                        {inner}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={t.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="group rounded-2xl border border-border bg-card p-5 opacity-80 cursor-not-allowed"
                    >
                      {inner}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 rounded-2xl bg-gradient-soft border border-border p-7 text-center">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Need help with the portal?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Talk to Marian AI (bottom-right) or contact the ICT office.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default StudentPortal;
