import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const QUICK = [
  { label: "About", to: "/about" },
  { label: "Admissions", to: "/admissions" },
  { label: "Academics", to: "/academics" },
  { label: "School Life", to: "/life" },
  { label: "News", to: "/news" },
  { label: "Gallery", to: "/gallery" },
  { label: "Virtual Tour", to: "/virtual-tour" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-primary-deep text-primary-foreground overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="absolute -top-24 left-1/3 aurora-orb h-[220px] w-[220px] bg-primary-glow opacity-15 pointer-events-none" />

      <div className="container-prose py-10 relative">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Brand + contact */}
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-3 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
              Excellence in education since <span className="text-accent font-semibold">1990</span>. A Catholic Diocese of Kericho school in the Bomet highlands.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-primary-foreground/80">
              <a href="https://maps.google.com/?q=St+Mary's+Bomet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
                <MapPin className="h-3.5 w-3.5 text-accent" /> Bomet, Kenya
              </a>
              <a href="tel:+254721771568" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone className="h-3.5 w-3.5 text-accent" /> +254 721 771 568
              </a>
              <a href="mailto:stmaryssecbomet@gmail.com" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
                <Mail className="h-3.5 w-3.5 text-accent" /> stmaryssecbomet@gmail.com
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav className="md:col-span-5" aria-label="Footer">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">Explore</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
              {QUICK.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">Follow</h3>
            <div className="flex gap-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/5 hover:bg-gradient-cyan hover:text-accent-foreground hover:border-transparent transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-prose py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-primary-foreground/55">
          <p>© {new Date().getFullYear()} <span className="text-primary-foreground/85 font-medium">St. Mary's Mixed Junior & Senior School</span> · Diocese of Kericho.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
