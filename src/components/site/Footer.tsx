import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin, Send, ArrowRight, GraduationCap } from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";
import { toast } from "sonner";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Academics", to: "/academics" },
      { label: "Admissions", to: "/admissions" },
      { label: "School Life", to: "/life" },
      { label: "Virtual Tour", to: "/virtual-tour" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News & Events", to: "/news" },
      { label: "Photo Gallery", to: "/gallery" },
      { label: "Exam Downloads", to: "/exam-downloads" },
      { label: "Student Portal", to: "/portal" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const STATS = [
  { v: "35+", l: "Years of Excellence" },
  { v: "1,500+", l: "Students Enrolled" },
  { v: "65%", l: "University Transition" },
  { v: "100%", l: "CBC Aligned" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || email.length > 254) {
      toast.error("Enter a valid email");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setEmail("");
      toast.success("Subscribed! Watch your inbox for our next update.");
    }, 700);
  };

  return (
    <footer className="relative bg-primary-deep text-primary-foreground overflow-hidden">
      {/* CTA band */}
      <div className="relative border-b border-primary-foreground/10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
        <div className="absolute -top-20 right-1/4 aurora-orb h-[280px] w-[280px] bg-accent opacity-20 pointer-events-none" />
        <div className="container-prose relative py-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <GraduationCap className="h-3.5 w-3.5" /> Join our excellence community
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight text-balance">
              Ready to join our <span className="text-gradient-aurora italic">school community?</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-primary-foreground/75 max-w-xl">
              Take the first step towards your child's bright future. From Junior School through Grade 10, our admissions team is ready to guide you.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-cyan text-accent-foreground px-6 py-3 text-sm font-semibold shadow-cyan hover:opacity-95 hover:-translate-y-0.5 transition-all"
            >
              Start Application <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 backdrop-blur px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-b border-primary-foreground/10 bg-primary-foreground/[0.02]">
        <div className="container-prose py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-aurora leading-none">{s.v}</div>
              <div className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-primary-foreground/60 font-mono">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="container-prose py-14 relative">
        <div className="absolute -top-16 left-1/4 aurora-orb h-[260px] w-[260px] bg-primary-glow opacity-15 pointer-events-none" />
        <div className="grid gap-10 lg:grid-cols-12 relative">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70 leading-relaxed">
              Excellence in education since <span className="text-accent font-semibold">1990</span>. A Catholic Diocese of Kericho school nurturing learners from Junior School through Grade 10 in the Bomet highlands.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href="https://maps.google.com/?q=St+Mary's+Mixed+Secondary+School+Bomet" target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2.5 text-primary-foreground/80 hover:text-accent transition-colors">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> P.O. Box 329-20300, Bomet, Kenya
                </a>
              </li>
              <li>
                <a href="tel:+254721771568" className="inline-flex items-center gap-2.5 text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 text-accent" /> +254 721 771 568
                </a>
              </li>
              <li>
                <a href="mailto:stmaryssecbomet@gmail.com" className="inline-flex items-center gap-2.5 text-primary-foreground/80 hover:text-accent transition-colors break-all">
                  <Mail className="h-4 w-4 text-accent" /> stmaryssecbomet@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {COLS.map((c) => (
            <nav key={c.title} className="lg:col-span-2" aria-label={c.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="group inline-flex items-center text-sm text-primary-foreground/75 hover:text-accent transition-colors">
                      <span className="h-px w-0 bg-accent mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter + socials */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Stay Updated</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Subscribe to our newsletter for latest updates, events and news from St. Mary's.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                  required
                  placeholder="your.email@example.com"
                  className="w-full h-11 pl-9 pr-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/15 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent/60 focus:bg-primary-foreground/15 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-cyan text-accent-foreground px-4 h-11 text-sm font-semibold shadow-cyan hover:opacity-95 disabled:opacity-60 transition-opacity"
              >
                {busy ? "…" : (<><Send className="h-3.5 w-3.5" /> Join</>)}
              </button>
            </form>

            <div className="mt-6">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Follow Us</h4>
              <div className="flex gap-2.5">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Youtube, label: "YouTube" },
                  { Icon: Twitter, label: "Twitter / X" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/85 hover:bg-gradient-cyan hover:text-accent-foreground hover:border-transparent hover:shadow-cyan hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partners line */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.18em] font-mono text-primary-foreground/50">
          <span className="text-accent">Partners ·</span>
          <span>Catholic Diocese of Kericho</span>
          <span className="opacity-40">●</span>
          <span>Franciscan Sisters of St. Joseph — Asumbi</span>
          <span className="opacity-40">●</span>
          <span>Ministry of Education, Kenya</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 bg-primary-foreground/[0.03]">
        <div className="container-prose py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-primary-foreground/55">
          <p>
            © {new Date().getFullYear()} <span className="text-primary-foreground/85 font-medium">St. Mary's Mixed Junior & Senior School, Bomet</span> · A Catholic Diocese of Kericho institution. · Developed and managed by{" "}
            <a
              href="https://manuwebdesigns.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              Manu Web Designs
            </a>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center sm:justify-end">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
            <Link to="/accessibility" className="hover:text-accent transition-colors">Accessibility</Link>
            <Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <Link to="/auth" className="hover:text-accent transition-colors">Staff Sign-in</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
