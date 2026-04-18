import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  { title: "Quick Links", links: [
    { label: "About Us", to: "/about" },
    { label: "Admissions", to: "/admissions" },
    { label: "Fee Structure", to: "/admissions#fees" },
    { label: "Open Days", to: "/admissions#open-days" },
    { label: "Virtual Tour", to: "/virtual-tour" },
  ]},
  { title: "Academics", links: [
    { label: "Curriculum", to: "/academics" },
    { label: "KCSE Results", to: "/academics#results" },
    { label: "University Placements", to: "/academics#placements" },
    { label: "Library & Resources", to: "/academics#library" },
  ]},
  { title: "School Life", links: [
    { label: "Boarding", to: "/life#boarding" },
    { label: "Sports", to: "/life#sports" },
    { label: "Clubs", to: "/life#clubs" },
    { label: "Gallery", to: "/life#gallery" },
    { label: "Alumni", to: "/alumni" },
  ]},
];

export const Footer = () => {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container-prose py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm text-primary-foreground/70 leading-relaxed">
              Excellence in education since 1965. Forming young leaders of character, scholarship, and service in the Bomet highlands.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-primary-foreground/80">
              <p className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> P.O. Box 24, Bomet 20400, Kenya</p>
              <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-accent" /> +254 700 000 000</p>
              <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-accent" /> info@stmarysbomet.ac.ke</p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-display text-base font-semibold text-accent mb-4">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-prose py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/55">
          <p>© {new Date().getFullYear()} St. Mary's Senior School, Bomet. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-accent">Privacy</Link>
            <Link to="/terms" className="hover:text-accent">Terms</Link>
            <a href="#" className="hover:text-accent">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
