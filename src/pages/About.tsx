import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Users, Shield, Sparkles, Target, Eye } from "lucide-react";

const VALUES = [
  { icon: Sparkles, title: "God Centeredness", body: "Faith-based foundation in all we do — anchored in Catholic values." },
  { icon: Heart, title: "Respect", body: "Honoring the dignity and diversity of every learner and staff member." },
  { icon: Users, title: "Teamwork", body: "A collaborative learning environment where everyone contributes." },
  { icon: Shield, title: "Responsibility", body: "Ownership of actions and outcomes, in and out of the classroom." },
  { icon: Award, title: "Accountability", body: "An unwavering commitment to excellence and integrity." },
  { icon: BookOpen, title: "Excellence", body: "Continuous improvement and the highest standards in everything we do." },
];

const TIMELINE = [
  { year: "1990", title: "Foundation", body: "Established by Rev. Fr. Ceasser & Rev. Sr. Francis Xavier Chebet F.S.S.J with 50 students — uplifting girl-child education in the region." },
  { year: "1995", title: "First Graduation", body: "Outstanding KCSE results from our first graduating class set the academic tone." },
  { year: "2010", title: "Major Expansion", body: "New dormitories and laboratory facilities added to support a growing community." },
  { year: "2014", title: "Excellence Award", body: "Recognised as a top performing school in the South Rift region." },
  { year: "2020", title: "Digital Learning", body: "Smart classrooms and a digital learning platform launched." },
  { year: "2023", title: "Junior School Launch", body: "Junior Mixed School opened on the Senior School compound — welcoming the boy child." },
  { year: "2025", title: "Grade 10 Launch", body: "Introduction of Grade 10 with the advanced CBE curriculum and specialised pathways." },
];

const LEADERSHIP = [
  { name: "Sr. Dr. Mary Gabriel C.", role: "Principal", dept: "Administration", img: "/images/sr.jpg" },
  { name: "Md. Kiama M.W.", role: "Deputy Principal", dept: "Administration", img: "/images/dp1.jpg" },
  { name: "Mr. Cyrus L.", role: "Director of Studies — JSS", dept: "Junior Secondary", img: "/images/langat.jpg" },
  { name: "Md. Winnie C.", role: "IQASO", dept: "Quality Assurance", img: "/images/image.png" },
  { name: "Mr. Emmanuel O.", role: "Examination Officer", dept: "Examinations", img: "/images/exams1.jpg" },
  { name: "Md. Marble K.", role: "Boarding Mistress", dept: "Boarding", img: "/images/image.png" },
  { name: "Mr. Korir D.", role: "H.O.D — Mathematics", dept: "Mathematics", img: "/images/korir.jpg" },
  { name: "Md. Faith S.", role: "H.O.D — Languages", dept: "Languages", img: "/images/faith.jpg" },
  { name: "Mr. Odhiambo M.", role: "Guidance & Counselling", dept: "Guidance", img: "/images/mose.jpg" },
];

const About = () => (
  <SiteLayout>
    <Seo
      title="About St. Mary's Bomet — Our Story, Mission & Vision Since 1990"
      description="Founded in 1990 by Rev. Fr. Ceasser & Sr. Francis Xavier Chebet F.S.S.J, St. Mary's Mixed Junior & Senior School Bomet is a Catholic Diocese of Kericho institution shaping young Kenyan leaders through CBE."
    />

    {/* Hero */}
    <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="aurora-orb h-[420px] w-[420px] -left-32 top-10 bg-primary-glow opacity-35" />
      <div className="container-prose relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Excellence Since 1990</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              About <span className="text-gradient-aurora italic">St. Mary's</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl leading-relaxed">
              Founded in 1990, St. Mary's Mixed Junior &amp; Senior School Bomet has been a beacon of educational excellence in the South Rift — shaping young minds and building character from Junior School through Grade 10 in a nurturing Christian environment.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
              {[
                { v: "500+", l: "Students" },
                { v: "98%", l: "University Success" },
                { v: "35+", l: "Years Excellence" },
                { v: "25+", l: "Expert Teachers" },
              ].map(s => (
                <div key={s.l} className="rounded-xl glass border border-primary-foreground/15 p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient-aurora">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-primary-foreground/75 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="img-zoom img-overlay relative rounded-3xl overflow-hidden shadow-elevated">
              <img src="/images/teachers.jpg" alt="St. Mary's School staff" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-mono font-semibold uppercase tracking-wider shine z-10">
                35+ Years Award
              </div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-accent/30 blur-2xl pointer-events-none" />
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-primary-glow/30 blur-2xl pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* History narrative */}
    <section className="py-24 bg-background">
      <div className="container-prose grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Our Journey</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Our rich history.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            St. Mary's Senior School — Bomet is a diverse Catholic Community engaged in offering value-based education. We promote an environment where self-confidence, moral and trust are cultivated, and spiritual and intellectual potential is realised for the integral development of each person.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            St. Mary's is a private school owned by the Catholic Diocese of Kericho. The school was founded in <span className="text-primary font-semibold">1990</span> by Rev. Fr. Ceasser and Rev. Sr. Francis Xavier Chebet F.S.S.J, with the aim of uplifting girl-child education in the region. In <span className="text-primary font-semibold">2023</span> it expanded with a Junior Mixed School on the Senior School compound to cater for the boy child too. From 50 students to over 500, we have maintained our commitment to academic excellence while embracing modern educational approaches including Kenya's Competency-Based Education (CBE).
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="img-zoom img-overlay rounded-3xl overflow-hidden shadow-elevated">
            <img src="/images/ourhistory.jpg" alt="St. Mary's School journey" className="w-full aspect-[5/4] object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-24 bg-gradient-soft">
      <div className="container-prose grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Milestones</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">35 years of excellence.</h2>
          <p className="mt-5 text-muted-foreground">From a small institution to one of Kenya's most respected CBE schools.</p>
        </div>
        <div className="lg:col-span-8">
          <ol className="relative border-l-2 border-border pl-8 space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.li key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <span className="absolute -left-3 grid h-6 w-6 place-items-center rounded-full bg-accent text-accent-foreground font-mono text-[10px] font-bold">●</span>
                <p className="font-display text-2xl font-bold text-primary">{t.year} <span className="font-sans text-base font-semibold text-foreground ml-2">{t.title}</span></p>
                <p className="mt-1 text-foreground/80 max-w-xl">{t.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    {/* Mission / Vision */}
    <section className="py-24 bg-background" id="mission">
      <div className="container-prose">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Our Purpose</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Mission &amp; Vision</h2>
          <p className="mt-4 text-muted-foreground">Guiding principles that drive our educational excellence and shape tomorrow's leaders.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card border border-border p-10 shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary mb-5"><Target className="h-6 w-6" /></div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Mission</span>
            <p className="mt-3 font-display text-xl text-foreground leading-snug">
              To provide an Excellent, Modern and God-Centered Environment for Holistic Learning, Development of Skills and Sound Character Formation.
            </p>
          </div>
          <div className="rounded-2xl bg-primary text-primary-foreground p-10 shadow-royal relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-accent mb-5"><Eye className="h-6 w-6" /></div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Vision</span>
              <p className="mt-3 font-display text-xl leading-snug">
                To be a World Class Model Senior and Junior Secondary School that Empowers Learners to Excel in Academics and Skills Competencies.
              </p>
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-semibold text-foreground mb-8">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="rounded-2xl border border-border bg-card p-6 hover-lift">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary mb-4"><v.icon className="h-5 w-5" /></div>
                <h4 className="font-display text-lg font-semibold text-foreground">{v.title}</h4>
                <p className="text-sm text-muted-foreground mt-1.5">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Leadership */}
    <section className="py-24 bg-gradient-soft" id="leadership">
      <div className="container-prose">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Leadership Excellence</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Our leadership team.</h2>
          <p className="mt-4 text-muted-foreground">Meet the dedicated professionals leading our school community.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group rounded-2xl border border-border bg-card overflow-hidden hover-lift shine">
              <div className="img-zoom img-overlay aspect-[4/3] bg-muted">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 relative">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{p.dept}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* BOM Message */}
    <section className="py-24 bg-background" id="bom">
      <div className="container-prose grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="img-zoom img-overlay rounded-3xl overflow-hidden shadow-elevated">
            <img src="/images/bom1.jpg" alt="BOM Chair" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Stewardship</span>
          <h2 className="mt-3 font-display font-bold text-display-md text-foreground text-balance">Message from our BOM Chair</h2>
          <blockquote className="mt-6 font-display text-xl text-foreground leading-snug border-l-4 border-accent pl-6 italic">
            "At St. Mary's, we firmly believe that education is the foundation of a strong and prosperous society. As the Board of Management, we are committed to steering this institution with vision, integrity and dedication. Guided by the Competency-Based Curriculum, our mission is to provide not only academic excellence but also life skills, innovation and character formation that prepare our learners to thrive in an ever-changing world."
          </blockquote>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Together with our devoted staff, supportive parents and vibrant student community, we continue to invest in modern resources, advanced facilities and holistic programs that ensure every learner has the opportunity to discover their potential and rise to greatness.
          </p>
          <p className="mt-6 font-display font-semibold text-foreground">Dr. Alexander R.</p>
          <p className="text-sm text-muted-foreground">Chair, Board of Management</p>
        </div>
      </div>
    </section>

    {/* Principal Message */}
    <section className="py-24 bg-gradient-soft">
      <div className="container-prose grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Excellence</span>
          <h2 className="mt-3 font-display font-bold text-display-md text-foreground text-balance">Message from our Principal</h2>
          <blockquote className="mt-6 font-display text-xl text-foreground leading-snug border-l-4 border-accent pl-6 italic">
            "At St. Mary's School, we believe that every child has unique talents and potential waiting to be discovered and nurtured. Our dedicated team of educators works tirelessly to create an environment where students can thrive academically, socially and spiritually from their earliest years through Grade 10."
          </blockquote>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We are committed to preparing our students not just for examinations, but for life and university success. Through our comprehensive curriculum spanning Junior School through Grade 10, extracurricular activities and character development programs, we ensure that our graduates are well-rounded individuals ready to make positive contributions to society.
          </p>
          <p className="mt-6 font-display font-semibold text-foreground">Sr. Dr. Mary Gabriel C.</p>
          <p className="text-sm text-muted-foreground">Principal</p>
        </div>
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="img-zoom img-overlay rounded-3xl overflow-hidden shadow-elevated">
            <img src="/images/sr.jpg" alt="Principal" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Achievements */}
    <section className="py-24 bg-primary-deep text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="container-prose relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Our Success</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-balance">Our achievements.</h2>
          <p className="mt-4 text-primary-foreground/80">Celebrating excellence across all educational levels.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { v: "98%", l: "University Admission Rate" },
            { v: "95%", l: "KJSEA & KPLEA Excellence" },
            { v: "50+", l: "Awards & Recognition" },
            { v: "100%", l: "CBE Implementation" },
          ].map(s => (
            <div key={s.l} className="rounded-2xl glass border border-primary-foreground/15 p-7 text-center">
              <div className="font-display text-4xl font-bold text-gradient-aurora">{s.v}</div>
              <div className="text-sm text-primary-foreground/85 mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default About;
