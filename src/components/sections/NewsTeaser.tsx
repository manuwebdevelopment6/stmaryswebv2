import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const NEWS = [
  {
    cat: "Academic Excellence",
    date: "12 July 2025",
    img: "/images/grade-7-agric.jpg",
    title: "Grade 7 Learners Excel in Agriculture Assessment",
    excerpt: "Grade 7 students showcased creativity and hands-on skills during their CBC Agriculture practical assessment.",
    slug: "grade-7-agric-2025",
  },
  {
    cat: "Faith & Culture",
    date: "5 July 2025",
    img: "/images/band2.jpg",
    title: "Band Represents School at Catholic Youth Rally",
    excerpt: "The school band proudly represented St. Mary's at the Catholic Diocese of Kericho Youth Rally 2025.",
    slug: "catholic-youth-rally-2025",
  },
  {
    cat: "Co-Curricular",
    date: "27 March 2025",
    img: "/images/band1.jpg",
    title: "School Band Shines at Rift Valley Regional Sports",
    excerpt: "Our talented school band added colour and pride to the Rift Valley Regional Sports gala.",
    slug: "rift-valley-band-2025",
  },
];

const CAT_STYLES: Record<string, string> = {
  "Academic Excellence": "bg-grade-a/10 text-grade-a",
  "Faith & Culture": "bg-accent/15 text-accent",
  "Co-Curricular": "bg-info/10 text-info",
};

export const NewsTeaser = () => (
  <section className="py-24 sm:py-32 bg-background">
    <div className="container-prose">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Latest Updates</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            School news & events
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
            className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img src={n.img} alt={n.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${CAT_STYLES[n.cat]}`}>{n.cat}</span>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {n.date}</span>
              </div>
              <h3 className="font-display text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                <Link to="/news">{n.title}</Link>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{n.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
