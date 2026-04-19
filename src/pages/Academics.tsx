import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, FlaskConical, Languages, Calculator, Globe, Music, Trophy, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell, Legend,
} from "recharts";

const KCSE_TREND = [
  { year: "2015", mean: 6.8, grade: "B-" },
  { year: "2016", mean: 7.0, grade: "B-" },
  { year: "2017", mean: 7.4, grade: "B" },
  { year: "2018", mean: 7.7, grade: "B" },
  { year: "2019", mean: 8.0, grade: "B" },
  { year: "2020", mean: 7.9, grade: "B" },
  { year: "2021", mean: 8.1, grade: "B" },
  { year: "2022", mean: 8.4, grade: "B" },
  { year: "2023", mean: 8.7, grade: "B" },
  { year: "2024", mean: 9.2, grade: "B+" },
];

const GRADE_DIST_2024 = [
  { grade: "A", count: 18, color: "hsl(var(--grade-a))" },
  { grade: "A-", count: 32, color: "hsl(var(--grade-a))" },
  { grade: "B+", count: 58, color: "hsl(var(--grade-b))" },
  { grade: "B", count: 71, color: "hsl(var(--grade-b))" },
  { grade: "B-", count: 64, color: "hsl(var(--grade-b))" },
  { grade: "C+", count: 42, color: "hsl(var(--grade-c))" },
  { grade: "C", count: 21, color: "hsl(var(--grade-c))" },
];

const SUBJECTS = [
  { icon: Calculator, name: "Mathematics", desc: "Pure & Applied" },
  { icon: BookOpen, name: "English & Literature", desc: "Language and texts" },
  { icon: Languages, name: "Kiswahili & Fasihi", desc: "Lugha na fasihi" },
  { icon: FlaskConical, name: "Sciences", desc: "Bio · Chem · Physics" },
  { icon: Globe, name: "Humanities", desc: "Geo · His · CRE" },
  { icon: Music, name: "Arts & Tech", desc: "Music · Comp · Business" },
];

const PLACEMENTS = [
  { name: "University of Nairobi", count: 38 },
  { name: "Kenyatta University", count: 24 },
  { name: "JKUAT", count: 19 },
  { name: "Strathmore", count: 12 },
  { name: "Moi University", count: 16 },
  { name: "International (US/UK/CA)", count: 9 },
];

const Academics = () => (
  <SiteLayout>
    <Seo
      title="Academics — KCSE Results, Curriculum & University Placements | St. Mary's Bomet"
      description="Explore St. Mary's Senior School academics: 10-year KCSE trend (B+ in 2024), 8-4-4 curriculum, science labs, and 96% university placement rate."
    />

    {/* Hero */}
    <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 pattern-grid opacity-25" />
      <div className="aurora-orb h-[420px] w-[420px] -left-32 top-10 bg-primary-glow opacity-35" />
      <div className="container-prose relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Academics</span>
          <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
            A culture of <span className="text-gradient-aurora italic">scholarship</span>.
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl leading-relaxed">
            Rigorous teaching, modern labs, and small classes — driving steady KCSE improvement and strong university placement.
          </p>
        </motion.div>
      </div>
    </section>

    {/* KCSE trend chart */}
    <section className="py-24 bg-background" id="results">
      <div className="container-prose">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-10">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— KCSE Trend</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
              Ten years of <span className="text-primary italic">rising</span> mean scores.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <Stat label="2024 Mean" value="9.2" sub="B+" />
            <Stat label="10-yr gain" value="+2.4" sub="pts" />
            <Stat label="C+ and above" value="98%" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
          <div className="h-[360px]">
            <ResponsiveContainer>
              <LineChart data={KCSE_TREND} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 4" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                <YAxis domain={[5, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number, _n, p) => [`${v} (${(p.payload as any).grade})`, "Mean"]}
                />
                <Line type="monotone" dataKey="mean" stroke="url(#lineGrad)" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--accent))" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>

    {/* Grade distribution */}
    <section className="py-24 bg-gradient-soft">
      <div className="container-prose">
        <div className="max-w-2xl mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— 2024 Distribution</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            How the 306 candidates performed.
          </h2>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
          <div className="h-[320px]">
            <ResponsiveContainer>
              <BarChart data={GRADE_DIST_2024}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="grade" stroke="hsl(var(--muted-foreground))" fontSize={13} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [`${v} candidates`, "Count"]}
                  cursor={{ fill: "hsl(var(--accent) / 0.08)" }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {GRADE_DIST_2024.map((g, i) => <Cell key={i} fill={g.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>

    {/* Curriculum */}
    <section className="py-24 bg-background">
      <div className="container-prose">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Curriculum</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            8-4-4 KCSE pathway, taught with depth.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Forms 1–4 study a balanced subject mix with strong sciences, humanities, languages, and creative pathways.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 hover-lift"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Placements */}
    <section className="py-24 bg-primary-deep text-primary-foreground relative overflow-hidden" id="placements">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="container-prose relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— University Placements</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-balance text-primary-foreground">
              <span className="text-gradient-aurora">96%</span> placed in degree programmes.
            </h2>
            <p className="mt-5 text-primary-foreground/80">
              The 2024 cohort secured placements via KUCCPS and direct international admissions. Where our graduates head:
            </p>
            <Button asChild variant="hero" className="mt-7">
              <Link to="/admissions">Become a Marian <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="lg:col-span-7 space-y-3">
            {PLACEMENTS.map((p, i) => {
              const max = Math.max(...PLACEMENTS.map((x) => x.count));
              const pct = (p.count / max) * 100;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-44 sm:w-56 text-sm font-medium text-primary-foreground/90">{p.name}</div>
                  <div className="flex-1 h-3 rounded-full bg-primary-foreground/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-cyan"
                    />
                  </div>
                  <div className="w-10 text-right font-mono text-sm text-accent font-semibold">{p.count}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  </SiteLayout>
);

const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="rounded-xl border border-border bg-card px-5 py-3 min-w-[110px]">
    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className="mt-0.5 flex items-baseline gap-1">
      <span className="font-display text-2xl font-bold text-gradient-aurora">{value}</span>
      {sub && <span className="text-xs font-mono text-muted-foreground">{sub}</span>}
    </div>
  </div>
);

export default Academics;
