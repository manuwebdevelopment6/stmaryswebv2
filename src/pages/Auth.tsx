import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, LogIn, UserPlus, ArrowLeft, Mail, Lock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/site/Seo";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

const Auth = () => {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "signup" ? "signup" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      const msg: string = err?.message ?? "Something went wrong";
      if (msg.toLowerCase().includes("already") && msg.toLowerCase().includes("registered")) {
        toast.error("This email is already registered. Try signing in instead.");
        setMode("signin");
      } else if (msg.toLowerCase().includes("invalid")) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-svh flex items-center justify-center bg-primary-deep overflow-hidden px-4 py-12">
      <Seo
        title={mode === "signup" ? "Create Account — St. Mary's Senior School" : "Sign In — St. Mary's Senior School"}
        description="Sign in or create an account to access the St. Mary's portal: admissions, results, fees, and parent updates."
      />

      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-70" />
      <div className="absolute inset-0 pattern-grid opacity-25" />
      <div className="aurora-orb h-[480px] w-[480px] -left-32 -top-20 bg-primary-glow opacity-40" />
      <div className="aurora-orb h-[420px] w-[420px] -right-24 bottom-0 bg-accent opacity-35" style={{ animationDelay: "3s" }} />

      <Link
        to="/"
        className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Logo variant="light" />
        </div>

        <div className="rounded-2xl glass border border-primary-foreground/15 bg-primary-foreground/[0.04] p-8 shadow-elevated backdrop-blur-xl">
          {/* Mode toggle */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-primary-foreground/5 p-1 mb-7">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "py-2 text-sm font-medium rounded-lg transition-all",
                  mode === m
                    ? "bg-gradient-cyan text-accent-foreground shadow-cyan"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                )}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            {mode === "signin" ? "Welcome back." : "Join the Marian family."}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/70">
            {mode === "signin"
              ? "Access fees, results, applications and parent updates."
              : "Create your portal account in seconds."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <Field
                icon={UserIcon}
                label="Full name"
                type="text"
                value={displayName}
                onChange={setDisplayName}
                placeholder="Jane Wanjiku"
                autoComplete="name"
              />
            )}
            <Field
              icon={Mail}
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <Field
              icon={Lock}
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={6}
            />

            <Button type="submit" variant="hero" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === "signin" ? (
                <><LogIn className="h-4 w-4" /> Sign in</>
              ) : (
                <><UserPlus className="h-4 w-4" /> Create account</>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-primary-foreground/70">
            {mode === "signin" ? (
              <>New here? <button onClick={() => setMode("signup")} className="text-accent font-semibold hover:underline">Create an account</button></>
            ) : (
              <>Already have one? <button onClick={() => setMode("signin")} className="text-accent font-semibold hover:underline">Sign in</button></>
            )}
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-primary-foreground/50">
          By continuing you agree to our <Link to="/terms" className="underline hover:text-accent">Terms</Link> and <Link to="/privacy" className="underline hover:text-accent">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
};

const Field = ({
  icon: Icon, label, type, value, onChange, placeholder, autoComplete, required, minLength,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}) => (
  <div>
    <label className="block text-xs font-medium uppercase tracking-wider text-primary-foreground/70 mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full h-11 rounded-lg bg-primary-foreground/5 border border-primary-foreground/15 pl-10 pr-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/40 transition-all"
      />
    </div>
  </div>
);

export default Auth;
