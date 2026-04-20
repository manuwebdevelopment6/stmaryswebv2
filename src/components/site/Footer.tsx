import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  { title: "Quick Links", links: [
    { label: "About Us", to: "/about" },
    { label: "Admissions", to: "/admissions" },
    { label: "Fee Information", to: "/admissions#fees" },
    { label: "Open Days", to: "/admissions#open-days" },
    { label: "Virtual Tour", to: "/virtual-tour" },
  ]},
  { title: "Academics", links: [
    { label: "CBE Curriculum", to: "/academics" },
    { label: "Career Pathways", to: "/academics#pathways" },
    { label: "Junior Secondary (G7-9)", to: "/academics#junior" },
    { label: "Senior Secondary (G10)", to: "/academics#senior" },
  ]},
  { title: "School Life", links: [
    { label: "Boarding", to: "/life#boarding" },
    { label: "Sports & Music Band", to: "/life#sports" },
    { label: "Clubs & Arts", to: "/life#clubs" },
    { label: "ICT Innovation Lab", to: "/life#ict" },
    { label: "News & Events", to: "/news" },
  ]},
];

export const Footer = () => {
  return (
    <footer className="relative bg-primary-deep text-primary-foreground overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-25 pointer-events-none" />
      <div className="absolute -top-32 left-1/4 aurora-orb h-[320px] w-[320px] bg-primary-glow opacity-20" />

      <div className="container-prose py-20 relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm text-primary-foreground/75 leading-relaxed">
              Excellence in education since <span className="text-accent font-semibold">1990</span>. A Catholic Diocese of Kericho school nurturing learners from Junior School through Grade 10 in the Bomet highlands.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-primary-foreground/85">
              <p className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> P.O. Box 329-20300, Bomet, Kenya</p>
              <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-accent" /> +254 721 771 568</p>
              <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-accent" /> stmaryssecbomet@gmail.com</p>
            </div>
            <div className="mt-7 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/5 hover:bg-gradient-cyan hover:text-accent-foreground hover:border-transparent hover:shadow-cyan transition-all duration-300 hover:-translate-y-0.5">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-display text-base font-semibold text-gradient-aurora mb-4 inline-block">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-primary-foreground/75 hover:text-accent hover:translate-x-0.5 inline-block transition-all duration-200">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 relative">
        <div className="container-prose py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} <span className="text-primary-foreground/90 font-medium">St. Mary's Mixed Junior & Senior School, Bomet</span> · A Catholic Diocese of Kericho institution.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
