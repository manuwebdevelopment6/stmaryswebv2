import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Bed, Trophy, Users, Music, Heart, Utensils, Shield, Sparkles, Cpu, Mic } from "lucide-react";

const SECTIONS = [
  {
    id: "boarding",
    img: "https://stmarysseniorschoolbomet.co.ke/images/update3-banhs.jpg",
    eyebrow: "— Boarding",
    title: "A safe home in the highlands.",
    body: "Well-supervised dormitories, dedicated matrons and a calm study environment make St. Mary's a true home away from home for our learners from across the South Rift.",
    bullets: [
      { icon: Shield, text: "24/7 matron and security on site" },
      { icon: Heart, text: "On-campus first aid and weekly clinic" },
      { icon: Utensils, text: "Three balanced meals + evening snack" },
      { icon: Bed, text: "Quiet preps and structured study time" },
    ],
  },
  {
    id: "sports",
    img: "https://stmarysseniorschoolbomet.co.ke/images/band1.jpg",
    eyebrow: "— Sports & Music",
    title: "From the pitch to the National Music Festival.",
    body: "Our school band qualified for the Kenya Music Festival National Finals 2025 and shines at the Rift Valley Regional Sports gala. Athletics, ball games and cultural music thrive side by side.",
    bullets: [
      { icon: Music, text: "School band — National Finals qualifiers" },
      { icon: Trophy, text: "Athletics, football, netball, volleyball" },
      { icon: Users, text: "Inter-house leagues every term" },
      { icon: Sparkles, text: "Annual Sports Day with alumni" },
    ],
  },
  {
    id: "clubs",
    img: "https://stmarysseniorschoolbomet.co.ke/images/update_1-Bandjss.jpg",
    eyebrow: "— Clubs & Arts",
    title: "Spaces for every passion.",
    body: "Whether the debate floor, the science congress, the choir loft or the drama festival, every Marian finds a stage to grow on under our CBC pathways.",
    bullets: [
      { icon: Mic, text: "Debate, drama & literary clubs" },
      { icon: Sparkles, text: "Science Congress · Math Contest · STEM" },
      { icon: Music, text: "Choir, brass band, cultural dance" },
      { icon: Users, text: "Student council and prefect leadership" },
    ],
  },
  {
    id: "ict",
    img: "https://stmarysseniorschoolbomet.co.ke/images/students1.jpg",
    eyebrow: "— ICT Innovation Lab",
    title: "Empowering learners through digital skills.",
    body: "Our newly launched ICT Innovation Lab is a modern hub for digital skills, internet-based research, basic coding and CBC technology projects.",
    bullets: [
      { icon: Cpu, text: "Computer literacy & digital skills" },
      { icon: Sparkles, text: "Internet-based research stations" },
      { icon: Trophy, text: "Basic coding & robotics enrichment" },
    ],
  },
];

const SchoolLifePage = () => (
  <SiteLayout>
    <Seo
      title="School Life — Boarding, Sports, Music & ICT | St. Mary's Bomet"
      description="Discover student life at St. Mary's Bomet: boarding, sports, the National Finals music band, debate, drama, the ICT Innovation Lab and a vibrant 500+ student community."
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
            Outside the classroom is where Marians discover who they are — through sport, song, service and friendship.
          </p>
        </motion.div>
      </div>
    </section>

    {SECTIONS.map((s, i) => (
      <section key={s.id} id={s.id} className={i % 2 === 0 ? "py-24 bg-background" : "py-24 bg-gradient-soft"}>
        <div className="container-prose grid lg:grid-cols-12 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className={i % 2 === 0 ? "lg:col-span-6 order-1" : "lg:col-span-6 order-1 lg:order-2"}>
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img src={s.img} alt={s.title} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/40 to-transparent" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }} className={i % 2 === 0 ? "lg:col-span-6 order-2" : "lg:col-span-6 order-2 lg:order-1"}>
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
