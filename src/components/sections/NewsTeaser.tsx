import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const NEWS = [
  {
    cat: "Achievement",
    date: "12 March 2025",
    title: "St. Mary's posts best-ever KCSE mean of 9.2",
    excerpt: "The 2024 cohort delivered a B+ mean grade — the school's strongest performance in over a decade.",
    slug: "kcse-2024-results",
  },
  {
    cat: "Sports",
    date: "28 February 2025",
    title: "Rugby 1st XV crowned South Rift champions",
    excerpt: "An undefeated season culminates in a 24–17 final victory over Kericho Boys at Sotik Showground.",
    slug: "rugby-south-rift-2025",
  },
  {
    cat: "Admissions",
    date: "15 February 2025",
    title: "Form 1 2026 applications now open",
    excerpt: "Online applications and KCPE cut-off updates — apply by 30 September for early consideration.",
    slug: "form-1-2026-open",
  },
];

const CAT_STYLES: Record<string, string> = {
  Achievement: "bg-grade-a/10 text-grade-a",
  Sports: "bg-info/10 text-info",
  Admissions: "bg-accent/15 text-accent",
};

export const NewsTeaser = () => (
  <section className="py-24 sm:py-32 bg-background">
    <div className="container-prose">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Latest</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            News & announcements
          </h2>
        </div>
        <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
          View all stories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {NEWS.map((n, i) => (
          <motion.article
            key={n.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-card p-7 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${CAT_STYLES[n.cat]}`}>{n.cat}</span>
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {n.date}</span>
            </div>
            <h3 className="font-display text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
              <Link to={`/news/${n.slug}`} className="after:absolute after:inset-0">{n.title}</Link>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{n.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
