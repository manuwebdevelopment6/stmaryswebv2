import { motion } from "framer-motion";
import { TrendingUp, Award, GraduationCap, ArrowRight, Trophy, Music, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ALUMNI = [
  { name: "Dominic Kipyegon", track: "STEM", note: "Attaining good performance level across all learning areas", quote: "St. Mary's STEM program prepared me for the world's best C1 schools.", year: "Class of 2025" },
  { name: "June Mitchelle", track: "Social Sciences", note: "National Debate Champion", quote: "The critical thinking skills I learned here are invaluable.", year: "Class of 2025" },
  { name: "Onesmus Mogoko", track: "Sports & Arts", note: "National Athletics Gold Medal", quote: "Balanced excellence in both sports and academics is possible here.", year: "Class of 2025" },
];

const ACHIEVEMENTS = [
  { icon: Music, title: "Kenya Music Festivals — Band, National Level", year: "2025" },
  { icon: Award, title: "Best CBE Implementation", year: "2025" },
  { icon: Star, title: "Community Service Excellence", year: "2025" },
  { icon: Trophy, title: "Top 5 Performing School — KCSE 2024 (Bomet Region)", year: "2024" },
];

export const ResultsPreview = () => (
  <section className="py-24 sm:py-32 bg-gradient-soft" id="results">
    <div className="container-prose">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Success Stories</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            Celebrating our <span className="text-primary italic">alumni</span> & achievements.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            From the National Music Festival podium to gold-medal athletics and exceptional CBE implementation, our learners and staff continue to set the bar across the South Rift region.
          </p>
          <Button asChild variant="default" className="mt-7">
            <Link to="/news">
              View all news <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <div className="mt-10 space-y-4">
            {ACHIEVEMENTS.map((h) => (
              <div key={h.title} className="flex gap-4 items-start">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <h.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{h.title}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{h.year}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-7 grid sm:grid-cols-2 gap-5"
        >
          {ALUMNI.map((a) => (
            <div key={a.name} className="rounded-2xl border border-border bg-card p-6 shadow-card hover-lift sm:[&:nth-child(3)]:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-cyan text-accent-foreground font-display font-bold text-lg">
                  {a.name.split(" ").map(s => s[0]).join("")}
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">{a.name}</p>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary">{a.track}</p>
                </div>
              </div>
              <p className="text-sm text-foreground font-medium">{a.note}</p>
              <blockquote className="mt-3 text-sm italic text-muted-foreground leading-relaxed border-l-2 border-accent pl-3">
                "{a.quote}"
              </blockquote>
              <p className="mt-3 text-xs font-mono text-muted-foreground">{a.year}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);
