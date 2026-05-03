import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Plus, X, MapPin, Church, BookOpen, FlaskConical, Trophy, Bed, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import campus from "@/assets/campus-map.jpg";
import { CmsPage } from "@/components/cms/CmsPage";

type Spot = {
  id: string;
  x: number; // % from left
  y: number; // % from top
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const SPOTS: Spot[] = [
  { id: "chapel", x: 12, y: 60, icon: Church, title: "St. Mary's Chapel", body: "Daily mass, evening prayers, and the heartbeat of our spiritual life since 1965." },
  { id: "admin", x: 30, y: 55, icon: MapPin, title: "Administration Block", body: "Principal's office, admissions, and the bursary. Your first stop on visiting day." },
  { id: "labs", x: 45, y: 55, icon: FlaskConical, title: "Science Complex", body: "Three modern labs (Bio · Chem · Physics) refurbished in 2022." },
  { id: "library", x: 55, y: 50, icon: BookOpen, title: "Library & Resource Centre", body: "12,000+ titles, quiet study zones, and a digital learning suite." },
  { id: "sports", x: 78, y: 58, icon: Trophy, title: "Sports Field", body: "Rugby, football and athletics — home of the South Rift champions." },
  { id: "dining", x: 38, y: 80, icon: UtensilsCrossed, title: "Dining Hall", body: "Three nutritious meals daily for 1,240 students." },
  { id: "dorms", x: 88, y: 48, icon: Bed, title: "Boarding Houses", body: "Five well-supervised dormitory blocks with 24/7 matron care." },
];

const VirtualTour = () => {
  const [active, setActive] = useState<Spot | null>(null);

  return (
    <SiteLayout>
      <Seo
        title="Virtual Campus Tour — St. Mary's Senior School Bomet"
        description="Explore the St. Mary's campus from anywhere. Click hotspots to see the chapel, science labs, library, sports field, dining hall and boarding houses."
      />
      <CmsPage slug="virtual-tour" fallback={<>

      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="container-prose relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Virtual Tour</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              Walk the <span className="text-gradient-aurora italic">campus</span>.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-xl">
              Tap the glowing pins to explore each part of the school — from the chapel to the rugby pitch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive map */}
      <section className="bg-primary-deep pb-24">
        <div className="container-prose">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated ring-1 ring-primary-foreground/10">
            <img
              src={campus}
              alt="Aerial view of St. Mary's campus in Bomet"
              width={1920}
              height={1024}
              className="w-full h-auto block select-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-deep/40" />

            {SPOTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                aria-label={s.title}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <span className="absolute inset-0 -m-2 rounded-full bg-accent/40 animate-ping" />
                <span className="relative grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-gradient-cyan text-accent-foreground shadow-cyan ring-2 ring-primary-foreground/80 transition-transform group-hover:scale-110">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-primary-foreground/90 bg-primary-deep/70 backdrop-blur px-2 py-0.5 rounded">
                  {s.title}
                </span>
              </button>
            ))}

            {/* Detail panel */}
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm rounded-xl glass border border-primary-foreground/15 bg-primary-deep/85 backdrop-blur-xl p-5 text-primary-foreground shadow-elevated"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-cyan text-accent-foreground">
                      <active.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold">{active.title}</h3>
                      <p className="mt-1 text-sm text-primary-foreground/85 leading-relaxed">{active.body}</p>
                    </div>
                    <button onClick={() => setActive(null)} aria-label="Close" className="text-primary-foreground/70 hover:text-accent transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container-prose text-center max-w-2xl mx-auto">
          <h2 className="font-display text-display-md font-bold text-foreground text-balance">
            Want to see it in person?
          </h2>
          <p className="mt-4 text-muted-foreground">Book one of our open days and experience St. Mary's first-hand.</p>
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Button asChild variant="default" size="lg"><Link to="/admissions#open-days">Book an open day</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/contact">Contact us</Link></Button>
          </div>
        </div>
      </section>
      </>} />
    </SiteLayout>
  );
};

export default VirtualTour;
