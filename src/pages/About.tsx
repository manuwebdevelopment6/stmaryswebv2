import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Users } from "lucide-react";

const PILLARS = [
  { icon: BookOpen, title: "Scholarship", body: "A relentless pursuit of academic mastery, anchored in the 8-4-4 curriculum and beyond." },
  { icon: Heart, title: "Character", body: "Daily formation in honesty, discipline, and the Christian values our founders held dear." },
  { icon: Users, title: "Community", body: "A boarding family where students from 30+ counties learn to live and lead together." },
  { icon: Award, title: "Service", body: "Outreach, leadership clubs, and partnerships that root our students in the wider Bomet community." },
];

const TIMELINE = [
  { year: "1965", body: "St. Mary's founded by the Catholic Diocese of Kericho with 42 boys." },
  { year: "1978", body: "Recognised as a National School after consistent KCE excellence." },
  { year: "1996", body: "First girls' wing opens — full co-education by 2001." },
  { year: "2012", body: "Centenary Hall and modern science complex commissioned." },
  { year: "2024", body: "Best-ever KCSE mean of 9.2 (B+) — 96% university placement." },
];

const About = () => (
  <SiteLayout>
    <Seo
      title="About St. Mary's Senior School Bomet — Our Story, Mission & Vision"
      description="Founded in 1965, St. Mary's Senior School Bomet has shaped generations of Kenyan leaders through scholarship, character, community and service."
    />
    {/* Hero */}
    <section className="relative bg-gradient-forest text-primary-foreground pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="container-prose relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— About</span>
          <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
            Sixty years of <span className="italic text-accent">forming</span> Kenya's young leaders.
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl leading-relaxed">
            From a small Catholic mission school in 1965 to one of the most respected secondary schools in the South Rift — our story is woven from scholarship, faith, and a stubborn belief in every young person's potential.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission / Vision */}
    <section className="py-24 bg-background">
      <div className="container-prose grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl bg-card border border-border p-10 shadow-card">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Mission</span>
          <p className="mt-4 font-display text-2xl text-foreground leading-snug">
            To form young men and women of integrity, scholarship and service — equipped to lead Kenya and the world with wisdom and compassion.
          </p>
        </div>
        <div className="rounded-2xl bg-primary text-primary-foreground p-10 shadow-forest">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Vision</span>
          <p className="mt-4 font-display text-2xl leading-snug">
            To be East Africa's most trusted secondary school — a beacon of academic excellence and Christian character.
          </p>
        </div>
      </div>
    </section>

    {/* Pillars */}
    <section className="py-24 bg-gradient-soft" id="pillars">
      <div className="container-prose">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Our Pillars</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Four values, one Marian spirit.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-card border border-border p-7 hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary mb-5">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-24 bg-background" id="leadership">
      <div className="container-prose grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Our Story</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Six decades, one mission.</h2>
          <p className="mt-5 text-muted-foreground">A timeline of the moments that have shaped who we are.</p>
        </div>
        <div className="lg:col-span-8">
          <ol className="relative border-l-2 border-border pl-8 space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="absolute -left-3 grid h-6 w-6 place-items-center rounded-full bg-accent text-accent-foreground font-mono text-[10px] font-bold">●</span>
                <p className="font-display text-2xl font-bold text-primary">{t.year}</p>
                <p className="mt-1 text-foreground/80 max-w-xl">{t.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default About;
