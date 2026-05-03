import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Calendar, Search, ArrowRight } from "lucide-react";
import { CmsPage } from "@/components/cms/CmsPage";

const ARTICLES = [
  { cat: "Academic", date: "12 July 2025", img: "/images/grade-7-agric.jpg", title: "Grade 7 Learners Excel in Agriculture Assessment", excerpt: "Grade 7 students showcased creativity and hands-on skills during their CBC Agriculture practical assessment.", author: "Academic Department" },
  { cat: "Community", date: "5 July 2025", img: "/images/band2.jpg", title: "Band Represents School at Catholic Youth Rally", excerpt: "The school band proudly represented St. Mary's at the Catholic Diocese of Kericho Youth Rally 2025.", author: "Chaplaincy" },
  { cat: "Sports", date: "27 March 2025", img: "/images/band1.jpg", title: "School Band Shines at Rift Valley Regional Sports", excerpt: "Our talented school band added colour and pride to the Rift Valley Regional Sports gala.", author: "Co-Curricular Office" },
  { cat: "Achievement", date: "14 March 2024", img: "/images/pexels-5905709.jpeg", title: "Outstanding KCSE Results 2024", excerpt: "Form 4 students achieved exceptional results in the KCSE examinations, with 65% University Transition.", author: "Academic Department" },
  { cat: "Achievement", date: "9 March 2024", img: "/images/pexels-2280571.jpeg", title: "Science Fair Competition Winners", excerpt: "St. Mary's students dominated the county science fair, winning first place in three categories including environmental science and tech innovation.", author: "Science Department" },
  { cat: "Infrastructure", date: "4 March 2024", img: "/images/pexels-159844.jpeg", title: "New ICT Innovation Lab Opening", excerpt: "State-of-the-art ICT lab officially opened, featuring 40 modern computers and high-speed internet to enhance digital literacy.", author: "Principal" },
  { cat: "Sports", date: "27 February 2024", img: "/images/pexels-2105028.jpeg", title: "Inter-School Sports Championships", excerpt: "Our athletics team brought home 12 medals from the regional inter-school sports championships, including 5 gold.", author: "Sports Department" },
  { cat: "Academic", date: "20 February 2024", img: "/images/grade10.jpg", title: "New Languages Introduced — French, German & Indigenous", excerpt: "St. Mary's expands its CBC pathways with new foreign and indigenous language programs.", author: "Languages Dept" },
];

const CATS = ["All", "Academic", "Achievement", "Infrastructure", "Sports", "Community"];

const CAT_STYLES: Record<string, string> = {
  Academic: "bg-primary/10 text-primary",
  Achievement: "bg-grade-a/10 text-grade-a",
  Infrastructure: "bg-info/10 text-info",
  Sports: "bg-warning/10 text-warning",
  Community: "bg-success/10 text-success",
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
        title="School News & Events — St. Mary's Bomet"
        description="Latest happenings, achievements and events at St. Mary's Mixed Junior & Senior School Bomet — KCSE results, sports, music band, ICT lab and community stories."
      />
      <CmsPage slug="news" fallback={<>

      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="container-prose relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— School News</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              Stories from <span className="text-gradient-aurora italic">campus</span>.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-xl">
              Stay updated with the latest happenings, achievements and events at St. Mary's School.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-md bg-background/85">
        <div className="container-prose flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all ${cat === c ? "bg-gradient-cyan text-accent-foreground shadow-cyan" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} maxLength={100} placeholder="Search stories…" className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
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
                  key={a.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden hover-lift"
                >
                  <div className="img-zoom shine relative aspect-[16/10] overflow-hidden bg-muted">
                    <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md ${CAT_STYLES[a.cat]}`}>{a.cat}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {a.date}
                      <span className="opacity-40">·</span>
                      <span className="font-mono">{a.author}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">{a.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.excerpt}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Read story <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
      </>} />
    </SiteLayout>
  );
};

export default News;
