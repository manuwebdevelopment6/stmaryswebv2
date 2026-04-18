import { motion } from "framer-motion";
import { TrendingUp, Award, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RESULTS = [
  { year: "2024", mean: "9.2", grade: "B+", note: "Best in 10 years" },
  { year: "2023", mean: "8.7", grade: "B", note: "12 A-plain candidates" },
  { year: "2022", mean: "8.4", grade: "B", note: "98% C+ and above" },
  { year: "2021", mean: "8.1", grade: "B", note: "Top 50 nationally" },
];

const HIGHLIGHTS = [
  { icon: TrendingUp, title: "Decade of growth", body: "Mean score climbed from 6.8 (B-) in 2015 to 9.2 (B+) in 2024 — a sustained upward trajectory." },
  { icon: Award, title: "Top in Bomet County", body: "Ranked #1 boys' boarding school in the South Rift for four consecutive years." },
  { icon: GraduationCap, title: "University placements", body: "96% of 2024 leavers placed in degree programmes via KUCCPS or international universities." },
];

export const ResultsPreview = () => (
  <section className="py-24 sm:py-32 bg-gradient-soft">
    <div className="container-prose">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— KCSE Performance</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            A decade of <span className="text-primary italic">rising</span> excellence.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Our KCSE results speak for themselves. Year after year, our students outperform regional and national averages — fuelled by dedicated teaching, small class sizes, and a culture of high expectations.
          </p>
          <Button asChild variant="default" className="mt-7">
            <Link to="/academics#results">
              See full results & charts <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <div className="mt-10 space-y-5">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{h.title}</p>
                  <p className="text-sm text-muted-foreground">{h.body}</p>
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
          className="lg:col-span-7"
        >
          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="bg-gradient-forest text-primary-foreground px-6 py-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/70">KCSE Mean Score</p>
                <p className="font-display text-2xl font-semibold">2021 – 2024</p>
              </div>
              <span className="rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold">+1.1 pts</span>
            </div>
            <div className="divide-y divide-border">
              {RESULTS.map((r, i) => {
                const widthPct = ((parseFloat(r.mean) - 7) / 3) * 100;
                return (
                  <div key={r.year} className="px-6 py-5 grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 font-mono text-sm font-semibold text-foreground">{r.year}</div>
                    <div className="col-span-7">
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-gradient-gold"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">{r.note}</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="font-display text-2xl font-bold text-primary">{r.mean}</span>
                      <span className="ml-1.5 text-xs font-mono text-muted-foreground">({r.grade})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
