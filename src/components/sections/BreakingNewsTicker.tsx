import { Link } from "react-router-dom";
import { Bell, ArrowRight } from "lucide-react";

const ITEMS = [
  { text: "Entrance Interviews for New Students: January 2026 – Book Your Slot Early!", to: "/admissions" },
  { text: "Admissions Open for Grade 7–10, 2026 Academic Year – Apply Now!", to: "/admissions" },
  { text: "School Reopens on 5th January 2026 for Term 1 – Welcome Back Students!", to: "/news" },
  { text: "Launch of New ICT Innovation Lab – Empowering Learners Through Digital Skills", to: "/news" },
  { text: "St. Mary's Music Band Qualifies for Kenya Music Festival National Finals 2025", to: "/news" },
  { text: "St. Mary's Ranked Among Top CBC Implementing Schools in the Rift Valley Region", to: "/about" },
  { text: "New Languages Introduced – French, German & Indigenous Language Program Now Available", to: "/academics" },
];

export const BreakingNewsTicker = () => {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-20 w-full">
      <div className="container-prose">
        <div className="flex items-stretch gap-0 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 backdrop-blur-md shadow-elevated overflow-hidden">
          {/* Label */}
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-destructive text-destructive-foreground font-semibold text-xs sm:text-sm whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-destructive-foreground opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive-foreground" />
            </span>
            <span className="hidden sm:inline tracking-wider uppercase">Breaking News</span>
            <span className="sm:hidden tracking-wider uppercase">News</span>
          </div>

          {/* Marquee */}
          <div className="group flex-1 overflow-hidden relative">
            <div className="flex items-center gap-10 whitespace-nowrap py-2.5 animate-marquee group-hover:[animation-play-state:paused]">
              {loop.map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  className="inline-flex items-center gap-2 text-sm text-primary-foreground/90 hover:text-accent transition-colors"
                >
                  <Bell className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>{item.text}</span>
                  <span className="text-primary-foreground/30">•</span>
                </Link>
              ))}
            </div>
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-primary-deep/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-primary-deep/60 to-transparent" />
          </div>

          {/* View all */}
          <Link
            to="/news"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground bg-accent/20 hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
