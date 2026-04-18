import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV: { label: string; to: string; children?: { label: string; to: string; desc: string }[] }[] = [
  { label: "About", to: "/about", children: [
    { label: "Our Story", to: "/about", desc: "History, mission and vision" },
    { label: "Leadership", to: "/about#leadership", desc: "Board, principal & deputies" },
    { label: "Accreditations", to: "/about#accreditations", desc: "KNEC, KSSHA, MoE" },
  ]},
  { label: "Academics", to: "/academics", children: [
    { label: "Curriculum", to: "/academics", desc: "8-4-4 + KCSE pathways" },
    { label: "KCSE Results", to: "/academics#results", desc: "10-year mean scores" },
    { label: "University Placements", to: "/academics#placements", desc: "Where graduates go" },
  ]},
  { label: "Admissions", to: "/admissions", children: [
    { label: "How to Apply", to: "/admissions", desc: "Step-by-step guide" },
    { label: "Fee Structure", to: "/admissions#fees", desc: "Termly breakdown" },
    { label: "Open Days", to: "/admissions#open-days", desc: "Visit the campus" },
  ]},
  { label: "School Life", to: "/life" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setOpenMenu(null); }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-card" : "bg-transparent"
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <div className="container-prose flex h-20 items-center justify-between gap-4">
        <Logo variant={scrolled ? "default" : "light"} />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) => cn(
                  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground",
                  isActive && (scrolled ? "text-primary" : "text-accent")
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </NavLink>

              {item.children && openMenu === item.label && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 animate-fade-in">
                  <div className="w-72 rounded-xl border border-border bg-popover p-2 shadow-elevated">
                    {item.children.map((c) => (
                      <Link key={c.to} to={c.to} className="block rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors">
                        <div className="text-sm font-semibold text-foreground">{c.label}</div>
                        <div className="text-xs text-muted-foreground">{c.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant={scrolled ? "ghost" : "hero-outline"} size="sm">
            <Link to="/portal">Portal Login</Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link to="/admissions">Apply for Form 1</Link>
          </Button>
        </div>

        <button
          className={cn("lg:hidden grid h-10 w-10 place-items-center rounded-md", scrolled ? "text-foreground" : "text-primary-foreground")}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-20 bg-background border-b border-border shadow-elevated animate-fade-in-up">
          <nav className="container-prose py-4 flex flex-col" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="py-3 border-b border-border text-base font-medium text-foreground">
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              <Button asChild variant="outline" className="flex-1"><Link to="/portal">Portal</Link></Button>
              <Button asChild variant="gold" className="flex-1"><Link to="/admissions">Apply</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
