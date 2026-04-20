import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    img: "https://stmarysseniorschoolbomet.co.ke/images/GRADE10.jpg",
    title: "Senior Secondary (Grade 10)",
    body: "University-prep with specialised CBE pathways: STEM, Social Sciences, Arts & Sports.",
    to: "/academics#senior",
    badge: "Grade 10",
  },
  {
    img: "https://stmarysseniorschoolbomet.co.ke/images/GRADE%209%20KNEC%20AGN.jpg",
    title: "Junior Secondary (Grade 7-9)",
    body: "Career pathway introduction and advanced skill development with mentorship.",
    to: "/academics#junior",
    badge: "Grade 7-9",
  },
  {
    img: "https://stmarysseniorschoolbomet.co.ke/images/update_1-Bandjss.jpg",
    title: "School Life",
    body: "From the school band & sports to the ICT Innovation Lab — a vibrant boarding community.",
    to: "/life",
    badge: "Boarding",
  },
];

export const SchoolLife = () => (
  <section className="py-24 sm:py-32 bg-background">
    <div className="container-prose">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Educational Programs</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            Complete educational <span className="text-primary italic">journey.</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          From Junior School through Senior Secondary — preparing learners for university and beyond, all within one nurturing campus.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300"
          >
            <Link to={item.to} className="block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/30 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent text-accent-foreground">
                  {item.badge}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-primary-foreground/85">{item.body}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
