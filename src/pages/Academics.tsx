import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, FlaskConical, Languages, Calculator, Globe, Music, Trophy, ArrowRight, Palette, Activity, Briefcase, Sprout, Heart, Accessibility, Target, Users, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CmsPage } from "@/components/cms/CmsPage";

const FRAMEWORK = [
  { icon: Target, title: "Competency-Based", body: "Focus on skills and abilities rather than just knowledge." },
  { icon: Users, title: "Learner-Centered", body: "Individualised learning paths for every student." },
  { icon: Layers, title: "Flexible Pacing", body: "Students progress at their own optimal pace." },
  { icon: Activity, title: "Continuous Assessment", body: "Regular evaluation and feedback for improvement." },
];

const LEVELS = [
  { id: "junior", students: "200+", grade: "Grade 7 – 9", title: "Junior Secondary", body: "Comprehensive secondary foundation with career pathways introduction.", points: ["Career pathways introduction", "Advanced projects & mentorship", "Foundation skills development", "Character building"], duration: "3 Years" },
  { id: "senior", students: "150+", grade: "Grade 10", title: "Senior Secondary", body: "Specialised learning in chosen career pathways with university preparation.", points: ["Pathway specialisation", "University entrance preparation", "Advanced research projects", "Industry partnerships"], duration: "Currently Grade 10 — expanding to 11 & 12" },
  { id: "844", students: "100+", grade: "Form 3 – 4", title: "High School (8-4-4)", body: "The legacy 8-4-4 system cohort for girls — currently Form 3 & 4.", points: ["KCSE preparation", "Leadership development", "Community service", "University prep"], duration: "Closing cohort" },
];

const CORE_SUBJECTS = ["English", "Kiswahili", "Core/Essential Mathematics", "Physical Education"];

const PATHWAYS = [
  {
    id: "stem",
    label: "STEM",
    icon: FlaskConical,
    desc: "Science, Technology, Engineering & Mathematics — for engineering, medical, computing and research careers.",
    tracks: [
      {
        id: "pure-sciences",
        name: "Pure Sciences Track",
        careers: [
          "Doctor", "Pharmacist", "Biotechnologist", "Medical Researcher", "Veterinarian",
          "Microbiologist", "Lab Scientist", "Nutritionist", "Public Health Officer", "Dentist",
          "Forensic Scientist", "Geneticist", "Marine Biologist", "Optometrist", "Radiologist",
          "Anesthesiologist", "Surgeon", "Epidemiologist", "Clinical Officer", "Nurse",
        ],
        combos: [
          "Biology + Chemistry + Mathematics",
          "Biology + Chemistry + Physics",
          "Biology + Chemistry + Geography",
          "Biology + Chemistry + Home Science",
          "Biology + Chemistry + Agriculture",
        ],
      },
      {
        id: "engineering",
        name: "Engineering & Technology Track",
        careers: [
          "Software Engineer", "Civil Engineer", "Electrical Engineer", "Mechanical Engineer",
          "Data Scientist", "Architect", "Aerospace Engineer", "Robotics Engineer",
          "Cybersecurity Analyst", "AI Researcher", "Cloud Architect", "Network Engineer",
          "DevOps Engineer", "Mobile Developer", "Game Developer", "Hardware Engineer",
          "Systems Analyst", "Quantity Surveyor", "Mining Engineer", "Telecoms Engineer",
        ],
        combos: [
          "Mathematics + Physics + Chemistry",
          "Mathematics + Physics + Computer Studies",
          "Mathematics + Physics + Geography",
          "Advanced Mathematics + Physics + Computer Studies",
        ],
      },
      {
        id: "applied",
        name: "Applied & Earth Sciences Track",
        careers: [
          "Agronomist", "Environmental Scientist", "Geologist", "Meteorologist",
          "Conservationist", "Surveyor", "Agribusiness Manager", "Food Scientist",
          "Soil Scientist", "Hydrologist", "GIS Specialist", "Wildlife Manager",
        ],
        combos: [
          "General Science + Mathematics + Agriculture",
          "Biology + Geography + Agriculture",
          "Mathematics + Geography + Computer Studies",
        ],
      },
    ],
  },
  {
    id: "social",
    label: "Social Sciences",
    icon: Globe,
    desc: "Languages, Humanities & Business — for law, journalism, diplomacy, business and teaching careers.",
    tracks: [
      {
        id: "humanities",
        name: "Humanities Track",
        careers: [
          "Lawyer", "Diplomat", "Historian", "Sociologist", "Anthropologist",
          "Religious Leader", "Counsellor", "Public Administrator", "Policy Analyst",
          "Foreign Service Officer", "NGO Programme Officer", "Curator", "Archaeologist",
          "Political Scientist", "Civic Educator", "Researcher", "Author", "Journalist",
          "Editor", "University Lecturer",
        ],
        combos: [
          "History & Citizenship + Geography + CRE",
          "History & Citizenship + Geography + Business Studies",
          "Geography + CRE + Kiswahili Lugha na Fasihi",
          "Literature + History + CRE",
        ],
      },
      {
        id: "business",
        name: "Business & Economics Track",
        careers: [
          "Economist", "Accountant", "Banker", "Marketing Manager", "Entrepreneur",
          "Investment Analyst", "Auditor", "Insurance Broker", "Tax Consultant",
          "HR Manager", "Supply Chain Manager", "Procurement Officer",
          "Business Consultant", "Stockbroker", "Actuary", "Project Manager",
        ],
        combos: [
          "Business Studies + Mathematics + Geography",
          "Business Studies + Mathematics + Computer Studies",
          "Business Studies + CRE + Kiswahili / Literature",
          "Business Studies + Geography + Agriculture",
        ],
      },
      {
        id: "languages",
        name: "Languages & Literature Track",
        careers: [
          "Translator", "Interpreter", "Foreign Correspondent", "Tour Guide",
          "Diplomatic Attaché", "Language Teacher", "Linguist", "Editor",
          "Publisher", "Speech Writer", "Communications Officer", "Copywriter",
        ],
        combos: [
          "Literature + Kiswahili Lugha na Fasihi + History",
          "Literature + History + French / German / Arabic",
          "Advanced English + Literature + History",
          "Kiswahili + French + Literature",
        ],
      },
    ],
  },
  {
    id: "arts",
    label: "Arts & Sports",
    icon: Palette,
    desc: "Creative Arts and Sports & Recreation — for media, performing arts, design, coaching and sports careers.",
    tracks: [
      {
        id: "arts-track",
        name: "Arts Track",
        careers: [
          "Creative Director", "Film Producer", "Writer", "Artist", "Cultural Ambassador",
          "Art Therapist", "Museum Curator", "Graphic Designer", "Animation Director",
          "Theatre Director", "Art Gallery Manager", "Creative Writing Teacher",
          "Film Editor", "Costume Designer", "Set Designer", "Arts Administrator",
          "Digital Media Specialist", "Content Creator", "Brand Designer", "Illustrator",
        ],
        combos: [
          "Fine Art + Theatre & Film + Literature in English",
          "Theatre & Film + Music & Dance + French",
          "Theatre & Film + Music & Dance + German",
          "Fine Art + Music & Dance + Literature in English",
        ],
      },
      {
        id: "sports-track",
        name: "Sports & Recreation Track",
        careers: [
          "Sports Management", "Athletic Training", "Sports Medicine", "Recreation Therapy",
          "Fitness Instructor", "Sports Psychologist", "Physical Education Teacher",
          "Sports Journalist", "Sports Marketing Manager", "Athletic Director",
          "Sports Nutritionist", "Physiotherapist", "Sports Event Coordinator",
          "Fitness Center Manager", "Sports Equipment Designer", "Sports Analyst",
          "Olympic Coach", "Sports Broadcaster", "Wellness Consultant", "Yoga Instructor",
        ],
        combos: [
          "Sports & Recreation + Biology + Computer Studies",
          "Sports & Recreation + Biology + Mandarin",
          "Sports & Recreation + Biology + Advanced Mathematics",
          "Sports & Recreation + Geography + Business Studies",
        ],
      },
    ],
  },
];

const SUBJECTS = [
  { icon: BookOpen, name: "English Language", desc: "Communication & literary appreciation" },
  { icon: Languages, name: "Kiswahili", desc: "Lugha ya taifa na fasihi" },
  { icon: Calculator, name: "Mathematics", desc: "Analytical & problem-solving" },
  { icon: FlaskConical, name: "Science & Technology", desc: "Integrated, hands-on" },
  { icon: Globe, name: "Social Studies", desc: "Society, history, geography" },
  { icon: Heart, name: "Religious Education", desc: "Moral & spiritual formation" },
  { icon: Music, name: "Creative Arts", desc: "Music, art & creative expression" },
  { icon: Activity, name: "Physical Education", desc: "Health, fitness & sports" },
  { icon: Sprout, name: "Life Skills", desc: "Practical daily-living skills" },
  { icon: Languages, name: "Foreign Languages", desc: "French & German options" },
];

const SUPPORT = [
  { icon: FlaskConical, title: "STEM Pathway Enrichment", body: "Robotics & coding clubs, STEM lab practical sessions, national science fair participation." },
  { icon: Music, title: "Arts & Sports Development", body: "School band & cultural music training, drama festivals, sports academies, regional competitions." },
  { icon: Briefcase, title: "Social Sciences & Entrepreneurship", body: "CBC project-based assessments, entrepreneurship & agribusiness clubs, civic education and debate forums." },
  { icon: Sprout, title: "Agriculture & Environment", body: "School farm projects, kitchen gardens, agri-business skills development, CBC continuous assessment." },
  { icon: Heart, title: "Life Skills & Guidance", body: "Career guidance for CBC pathways, peer mentorship & counseling, value-based leadership training." },
  { icon: Accessibility, title: "Inclusive Education", body: "Individualised learning support, assistive technology integration, special needs teacher support." },
];

const Academics = () => {
  const [pathway, setPathway] = useState(PATHWAYS[0].id);
  const active = PATHWAYS.find(p => p.id === pathway)!;

  return (
    <SiteLayout>
      <Seo
        title="Academics — CBE Curriculum & Career Pathways | St. Mary's Bomet"
        description="Explore St. Mary's CBE curriculum from Grade 7-10: STEM, Social Sciences, and Arts & Sports pathways. 40+ subject combinations, 98% success rate."
      />
      <CmsPage slug="academics" fallback={<>

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute inset-0 pattern-grid opacity-25" />
        <div className="aurora-orb h-[420px] w-[420px] -left-32 top-10 bg-primary-glow opacity-35" />
        <div className="container-prose relative grid lg:grid-cols-12 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— CBE Excellence Since 1990</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              Academic <span className="text-gradient-aurora italic">Excellence</span>.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl leading-relaxed">
              Our comprehensive CBE curriculum spans from Junior School to Grade 10, designed to develop critical thinking, creativity and practical skills that prepare students for university and beyond.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[{ v: "40+", l: "Subject Combos" }, { v: "3", l: "Career Pathways" }, { v: "98%", l: "Success Rate" }].map(s => (
                <div key={s.l} className="rounded-xl glass border border-primary-foreground/15 p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient-aurora">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-primary-foreground/75 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="lg:col-span-5">
            <div className="img-zoom img-overlay relative rounded-3xl overflow-hidden shadow-elevated">
              <img src="/images/academics_2.jpg" alt="St. Mary's academics" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent/30 blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* CBE Framework */}
      <section className="py-24 bg-background">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Educational Framework</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Competency-Based Education (CBE)</h2>
            <p className="mt-4 text-muted-foreground">
              We have fully embraced Kenya's CBE system from Junior School (Grade 7-9) through Grade 10, focusing on competency development rather than content coverage — ensuring our students are well-prepared for university and career success.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FRAMEWORK.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="rounded-2xl border border-border bg-card p-6 hover-lift">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary mb-4"><f.icon className="h-5 w-5" /></div>
                <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-24 bg-gradient-soft">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Academic Structure</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Academic levels.</h2>
            <p className="mt-4 text-muted-foreground">Comprehensive education from Junior School through Senior Secondary.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LEVELS.map((l, i) => (
              <motion.div key={l.id} id={l.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-2xl border border-border bg-card p-7 shadow-card hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{l.students} Students</span>
                  <span className="px-2.5 py-1 rounded-md bg-accent/15 text-accent font-mono text-[10px] uppercase tracking-widest font-semibold">{l.grade}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{l.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{l.body}</p>
                <ul className="mt-5 space-y-2">
                  {l.points.map(p => (
                    <li key={p} className="text-sm text-foreground flex items-start gap-2"><span className="text-accent mt-1">●</span>{p}</li>
                  ))}
                </ul>
                <p className="mt-5 text-xs font-mono text-muted-foreground border-t border-border pt-4">Duration: {l.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways tabs */}
      <section className="py-24 bg-background" id="pathways">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Grade 10 Specialisation</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Career pathways &amp; subject combinations</h2>
            <p className="mt-4 text-muted-foreground">Choose from 40+ specialised subject combinations across three major pathways.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {PATHWAYS.map(p => (
              <button key={p.id} onClick={() => setPathway(p.id)} className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all",
                pathway === p.id ? "bg-gradient-cyan text-accent-foreground shadow-cyan" : "bg-secondary text-secondary-foreground hover:bg-muted"
              )}>
                <p.icon className="h-4 w-4" /> {p.label}
              </button>
            ))}
          </div>

          <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 rounded-2xl bg-primary-deep text-primary-foreground p-8 relative overflow-hidden self-start lg:sticky lg:top-28">
              <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground mb-5"><active.icon className="h-7 w-7" /></div>
                <h3 className="font-display text-2xl font-bold">{active.label}</h3>
                <p className="mt-3 text-primary-foreground/85 leading-relaxed text-sm">{active.desc}</p>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Core Subjects (Required)</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CORE_SUBJECTS.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-md bg-primary-foreground/10 text-xs font-medium">{s}</span>
                  ))}
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Tracks in this Pathway</p>
                <ul className="mt-3 space-y-1.5">
                  {active.tracks.map(t => (
                    <li key={t.id} className="text-sm text-primary-foreground/90 flex items-start gap-2">
                      <span className="text-accent mt-0.5">▸</span>{t.name}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="hero" className="mt-7" size="sm">
                  <Link to="/admissions">Apply for {active.label} <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-8 grid gap-6">
              {active.tracks.map((track, ti) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: ti * 0.08 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3 px-6 py-4 bg-secondary/40 border-b border-border">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-cyan text-accent-foreground font-mono text-xs font-bold">{ti + 1}</span>
                      <h4 className="font-display text-lg font-semibold text-foreground">{track.name}</h4>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{active.label}</span>
                  </div>
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-accent" /> Career Opportunities
                        <span className="text-[10px] font-mono text-muted-foreground">{track.careers.length}+ careers</span>
                      </h5>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {track.careers.map(c => (
                          <span key={c} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                        <Layers className="h-4 w-4 text-accent" /> Subject Combinations
                        <span className="text-[10px] font-mono text-muted-foreground">{track.combos.length} options</span>
                      </h5>
                      <div className="mt-3 space-y-2">
                        {track.combos.map((c, i) => (
                          <div key={c} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary/40">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary font-mono text-[10px] font-bold">{i + 1}</span>
                            <p className="text-sm text-foreground pt-0.5">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-24 bg-gradient-soft">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Core Curriculum</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Our subjects.</h2>
            <p className="mt-4 text-muted-foreground">Comprehensive curriculum covering all essential learning areas.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SUBJECTS.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }} className="rounded-2xl border border-border bg-card p-5 hover-lift">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary mb-3"><s.icon className="h-5 w-5" /></div>
                <h3 className="font-display text-base font-semibold text-foreground">{s.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support services */}
      <section className="py-24 bg-background">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Student Support</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">CBC support services.</h2>
            <p className="mt-4 text-muted-foreground">Tailored academic and co-curricular support to nurture every learner's potential under Kenya's CBC.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUPPORT.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl border border-border bg-card p-6 hover-lift">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent mb-4"><s.icon className="h-5 w-5" /></div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-deep text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="container-prose relative text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Start Your Academic Journey</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-balance max-w-2xl mx-auto">
            Ready to excel in <span className="text-gradient-aurora italic">academics</span>?
          </h2>
          <p className="mt-5 text-primary-foreground/85 max-w-xl mx-auto">
            Join St. Mary's School and experience world-class CBE education with personalised pathways.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl"><Link to="/admissions">Apply for Admission <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="hero-outline" size="xl"><Link to="/contact">Schedule Campus Visit</Link></Button>
          </div>
        </div>
      </section>
      </>} />
    </SiteLayout>
  );
};

export default Academics;
