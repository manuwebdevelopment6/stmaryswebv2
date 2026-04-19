import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Calendar, Search, ArrowRight } from "lucide-react";

const ARTICLES = [
  { cat: "Achievement", date: "12 March 2025", title: "St. Mary's posts best-ever KCSE mean of 9.2", excerpt: "The 2024 cohort delivered a B+ mean grade — the school's strongest performance in over a decade.", slug: "kcse-2024-results" },
  { cat: "Sports", date: "28 February 2025", title: "Rugby 1st XV crowned South Rift champions", excerpt: "An undefeated season culminates in a 24–17 final victory over Kericho Boys at Sotik Showground.", slug: "rugby-south-rift-2025" },
  { cat: "Admissions", date: "15 February 2025", title: "Form 1 2026 applications now open", excerpt: "Online applications and KCPE cut-off updates — apply by 30 September for early consideration.", slug: "form-1-2026-open" },
  { cat: "Academics", date: "30 January 2025", title: "Three students place in Top 100 nationally", excerpt: "Three of our 2024 KCSE candidates earned places among the country's Top 100 by mean score.", slug: "top-100-2024" },
  { cat: "Community", date: "20 January 2025", title: "Outreach: 200 trees planted with Bomet County", excerpt: "Form 3 environmental club partnered with the county forester for a campus and town greening day.", slug: "tree-planting-2025" },
  { cat: "Arts", date: "10 December 2024", title: "Drama club wins regional festival", excerpt: "A powerful performance of \"Mwananchi\" earns the troupe a national qualifier slot.", slug: "drama-regionals-2024" },
];

const CATS = ["All", "Achievement", "Sports", "Admissions", "Academics", "Community", "Arts"];

const CAT_STYLES: Record<string, string> = {
  Achievement: "bg-grade-a/10 text-grade-a",
  Sports: "bg-info/10 text-info",
  Admissions: "bg-accent/15 text-accent",
  Academics: "bg-primary/10 text-primary",
  Community: "bg-success/10 text-success",
  Arts: "bg-warning/10 text-warning",
};

const News = () => {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = ARTICLES.filter((a) =>
    (cat === "All" || a.cat === cat) &&
    (q === "" || (a.title + " " + a.excerpt).toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <SiteLayout>
      <Seo
        title="News & Announcements — St. Mary's Senior School Bomet"
        description="Latest news, achievements, and announcements from St. Mary's Senior School Bomet — KCSE results, sports, admissions and community stories."
      />

      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="container-prose relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— News</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              Stories from <span className="text-gradient-aurora italic">campus</span>.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-xl">
              Achievements, announcements, and the everyday life of the Marian community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-md bg-background/85">
        <div className="container-prose flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all ${
                  cat === c ? "bg-gradient-cyan text-accent-foreground shadow-cyan" : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={100}
              placeholder="Search stories…"
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-prose">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No stories match your search.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, i) => (
                <motion.article
                  key={a.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group rounded-2xl border border-border bg-card p-7 hover-lift"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${CAT_STYLES[a.cat]}`}>{a.cat}</span>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {a.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    <Link to={`/news/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                  <Link to={`/news/${a.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default News;
