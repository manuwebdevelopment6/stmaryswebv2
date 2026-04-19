import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Bed, Trophy, Users, Music, Heart, Utensils, Shield, Sparkles } from "lucide-react";
import academics from "@/assets/life-academics.jpg";
import sports from "@/assets/life-sports.jpg";
import boarding from "@/assets/life-boarding.jpg";

const SECTIONS = [
  {
    id: "boarding",
    img: boarding,
    eyebrow: "— Boarding",
    title: "A safe home in the highlands.",
    body: "Five well-supervised dormitory blocks, dedicated matrons, 24/7 nursing care, and a calm study environment make St. Mary's a true home away from home.",
    bullets: [
      { icon: Shield, text: "24/7 matron and security on site" },
      { icon: Heart, text: "On-campus nurse and weekly clinic" },
      { icon: Utensils, text: "Three balanced meals + evening snack" },
    ],
  },
  {
    id: "sports",
    img: sports,
    eyebrow: "— Sports",
    title: "Champions on the pitch.",
    body: "From the South Rift rugby title to track athletics and netball, our students compete — and win — at county, regional, and national levels.",
    bullets: [
      { icon: Trophy, text: "Rugby · Football · Hockey · Athletics" },
      { icon: Users, text: "Inter-house leagues every term" },
      { icon: Sparkles, text: "Annual Sports Day with alumni" },
    ],
  },
  {
    id: "clubs",
    img: academics,
    eyebrow: "— Clubs & Arts",
    title: "30+ clubs, one community.",
    body: "Whether the debate floor, the chess board, the choir loft, or the science congress, every Marian finds a stage to grow on.",
    bullets: [
      { icon: Music, text: "Choir, brass band, drama troupe" },
      { icon: Sparkles, text: "Science Congress · Math Contest · KSSSA" },
      { icon: Users, text: "Student council and prefect leadership" },
    ],
  },
];

const SchoolLifePage = () => (
  <SiteLayout>
    <Seo
      title="School Life — Boarding, Sports, Clubs & Arts | St. Mary's Bomet"
      description="Discover student life at St. Mary's Senior School Bomet: boarding, sports, music, drama, debate, science clubs, and a vibrant community of 1,240 students."
    />

    <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="aurora-orb h-[400px] w-[400px] -left-24 top-10 bg-primary-glow opacity-35" />
      <div className="container-prose relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— School Life</span>
          <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
            More than a school. <span className="text-gradient-aurora italic">A family.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl">
            Outside the classroom is where Marians discover who they are — through sport, song, service, and friendship.
          </p>
        </motion.div>
      </div>
    </section>

    {SECTIONS.map((s, i) => (
      <section key={s.id} id={s.id} className={i % 2 === 0 ? "py-24 bg-background" : "py-24 bg-gradient-soft"}>
        <div className="container-prose grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className={i % 2 === 0 ? "lg:col-span-6 order-1" : "lg:col-span-6 order-1 lg:order-2"}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img src={s.img} alt={s.title} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/40 to-transparent" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={i % 2 === 0 ? "lg:col-span-6 order-2" : "lg:col-span-6 order-2 lg:order-1"}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{s.eyebrow}</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">{s.title}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{s.body}</p>
            <ul className="mt-7 space-y-3">
              {s.bullets.map((b) => (
                <li key={b.text} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <b.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground pt-1.5">{b.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    ))}
  </SiteLayout>
);

export default SchoolLifePage;
