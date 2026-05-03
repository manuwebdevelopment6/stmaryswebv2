import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Camera, Image as ImageIcon, Calendar, MapPin, X } from "lucide-react";
import { CmsPage } from "@/components/cms/CmsPage";

const STATS = [
  { v: "2,800+", l: "Photos", sub: "growing weekly" },
  { v: "150+", l: "Albums", sub: "organised by theme" },
  { v: "40+", l: "Events", sub: "captured this year" },
  { v: "180+", l: "Videos", sub: "highlights & reels" },
];

type Album = {
  id: string;
  title: string;
  cat: "Events" | "Sports" | "Culture" | "Academics" | "Trips";
  date: string;
  location: string;
  cover: string;
  desc: string;
  count: number;
};

const ALBUMS: Album[] = [
  {
    id: "thanksgiving-2024",
    title: "Thanksgiving for 2024 KCSE Results",
    cat: "Events",
    date: "14 November 2024",
    location: "Main Hall",
    cover: "/images/students1.jpg",
    desc: "A joyous celebration honouring our students' achievements in the 2024 KCSE examinations — gratitude, recognition and hope for the future.",
    count: 65,
  },
  {
    id: "graduation-2024",
    title: "Graduation Ceremony 2024",
    cat: "Events",
    date: "17 May 2024",
    location: "Main Hall",
    cover: "/images/teachers.jpg",
    desc: "A memorable day celebrating our graduating class with inspiring speeches, prestigious awards and cherished family moments.",
    count: 156,
  },
  {
    id: "music-band-rally-2025",
    title: "School Band at Catholic Youth Rally 2025",
    cat: "Culture",
    date: "5 July 2025",
    location: "Diocese of Kericho",
    cover: "/images/band2.jpg",
    desc: "St. Mary's Music Band proudly representing the school at the Catholic Diocese of Kericho Youth Rally 2025.",
    count: 84,
  },
  {
    id: "rift-valley-band",
    title: "Rift Valley Regional Sports Gala",
    cat: "Sports",
    date: "27 March 2025",
    location: "Rift Valley Region",
    cover: "/images/band1.jpg",
    desc: "Our school band added colour and pride to the Rift Valley Regional Sports gala — performing alongside top schools from the region.",
    count: 102,
  },
  {
    id: "grade-7-agric",
    title: "Grade 7 CBC Agriculture Practical",
    cat: "Academics",
    date: "12 July 2025",
    location: "School Farm",
    cover: "/images/grade-7-agric.jpg",
    desc: "Grade 7 learners showcased creativity and hands-on skills during the CBC Agriculture practical assessment.",
    count: 47,
  },
  {
    id: "junior-band",
    title: "Junior School Band Showcase",
    cat: "Culture",
    date: "April 2025",
    location: "School Quad",
    cover: "/images/update_1-bandjss.jpg",
    desc: "The Junior Secondary band rehearsing for inter-house finals — beautiful harmonies from our youngest musicians.",
    count: 38,
  },
  {
    id: "bom-visit",
    title: "Board of Management Visit",
    cat: "Events",
    date: "March 2025",
    location: "Administration Block",
    cover: "/images/bom1.jpg",
    desc: "Our Board of Management touring the new ICT Innovation Lab and meeting prefects.",
    count: 32,
  },
  {
    id: "classroom-life",
    title: "Inside the Classroom",
    cat: "Academics",
    date: "Term 2 · 2025",
    location: "Various Classrooms",
    cover: "/images/academics_2.jpg",
    desc: "Capturing daily learning moments, group projects and interactive sessions that bring CBE to life.",
    count: 73,
  },
  {
    id: "boarding-life",
    title: "Boarding House Life",
    cat: "Events",
    date: "Term 1 · 2025",
    location: "Boarding Houses",
    cover: "/images/update3-banhs.jpg",
    desc: "Quiet preps, weekend chapel and meals together — a safe home away from home in the Bomet highlands.",
    count: 56,
  },
];

const CATS: (Album["cat"] | "All")[] = ["All", "Events", "Sports", "Culture", "Academics", "Trips"];

const CAT_STYLES: Record<string, string> = {
  Events: "bg-primary/10 text-primary",
  Sports: "bg-warning/15 text-warning",
  Culture: "bg-accent/15 text-accent",
  Academics: "bg-info/10 text-info",
  Trips: "bg-success/15 text-success",
};

const Gallery = () => {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [active, setActive] = useState<Album | null>(null);

  const list = cat === "All" ? ALBUMS : ALBUMS.filter((a) => a.cat === cat);

  return (
    <SiteLayout>
      <Seo
        title="Gallery — Photos & Videos | St. Mary's Bomet"
        description="Explore St. Mary's Bomet through photos: graduation, sports, music band, classroom life, boarding and community events. Updated weekly."
      />
      <CmsPage slug="gallery" fallback={<>

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="aurora-orb h-[400px] w-[400px] -left-24 top-10 bg-primary-glow opacity-35" />
        <div className="container-prose relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              — Featured Moments
            </span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              St. Mary's <span className="text-gradient-aurora italic">Gallery</span>.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-xl">
              Explore our vibrant school community through thousands of captured moments — academic
              achievements, cultural celebrations and the memories that shape our story.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="rounded-xl glass border border-primary-foreground/15 p-4"
              >
                <div className="font-display text-2xl font-bold text-gradient-aurora">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-primary-foreground/75 mt-1">
                  {s.l}
                </div>
                <div className="text-[10px] text-primary-foreground/60 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter strip */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-md bg-background/85">
        <div className="container-prose flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mr-2">
            <ImageIcon className="inline h-3.5 w-3.5 mr-1" /> {list.length} albums
          </span>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all ${
                cat === c
                  ? "bg-gradient-cyan text-accent-foreground shadow-cyan"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="container-prose">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((a, i) => (
              <motion.button
                key={a.id}
                onClick={() => setActive(a)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group text-left rounded-2xl border border-border bg-card overflow-hidden hover-lift focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="img-zoom shine relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={a.cover}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-primary-deep/10 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded ${CAT_STYLES[a.cat]} backdrop-blur-md`}
                  >
                    {a.cat}
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-xs text-primary-foreground bg-primary-deep/60 backdrop-blur px-2 py-1 rounded">
                    <Camera className="h-3 w-3" /> {a.count}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground bg-accent/90 text-accent-foreground px-2.5 py-1 rounded">
                      View album →
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.desc}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {a.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {a.location}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox-ish detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-primary-deep/85 backdrop-blur-sm grid place-items-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-elevated"
            >
              <div className="relative aspect-[16/9] bg-muted">
                <img
                  src={active.cover}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-primary-deep/70 text-primary-foreground hover:bg-primary-deep"
                >
                  <X className="h-4 w-4" />
                </button>
                <span
                  className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded ${CAT_STYLES[active.cat]} backdrop-blur`}
                >
                  {active.cat}
                </span>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto">
                <h3 className="font-display text-2xl font-bold text-foreground">{active.title}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {active.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {active.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Camera className="h-4 w-4" /> {active.count} photos
                  </span>
                </div>
                <p className="mt-5 text-foreground/85 leading-relaxed">{active.desc}</p>
                <p className="mt-6 text-xs text-muted-foreground italic border-t border-border pt-4">
                  💡 Full album viewer coming soon. For high-resolution copies of any photo,
                  email <span className="text-primary font-semibold">stmaryssecbomet@gmail.com</span>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </>} />
    </SiteLayout>
  );
};

export default Gallery;
