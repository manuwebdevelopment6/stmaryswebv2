import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, GraduationCap, Home, CreditCard, BookOpen, Heart, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { cn } from "@/lib/utils";

interface QA { q: string; a: string; }
interface Cat { id: string; label: string; icon: typeof Home; items: QA[]; }

const FAQS: Cat[] = [
  {
    id: "admissions",
    label: "Admissions",
    icon: GraduationCap,
    items: [
      { q: "Which grades do you admit?", a: "We admit learners into Grade 7 (Junior Secondary entry), Grades 8 & 9 (transfers), and Grade 10 (senior pathway entry — STEM, Social Sciences, Arts & Sports Science)." },
      { q: "When is the admissions window for 2026?", a: "Applications open 1 September 2025 and close 30 November 2025. Late applications are accepted only if vacancies remain after the entrance interview." },
      { q: "What documents do I need?", a: "Birth certificate, KPSEA result slip (for Grade 7), most recent report form, parent/guardian ID, and a passport-size photo. Upload these directly in our 4-step online application." },
      { q: "Is there an entrance interview?", a: "Yes — short, friendly competency interviews are held during scheduled Open Days. Boarding learners also have a brief pastoral interview." },
      { q: "How are admission decisions communicated?", a: "Within 14 days of the interview by SMS and email. An offer letter and joining instructions follow the acceptance fee." },
    ],
  },
  {
    id: "fees",
    label: "Fees & Payments",
    icon: CreditCard,
    items: [
      { q: "What is the fee structure?", a: "Termly fees are published in the Fee Information section of /admissions. They cover tuition, boarding, meals, and basic learning materials." },
      { q: "Which payment methods are accepted?", a: "M-Pesa Paybill (Daraja), bank deposit, bank transfer, and online card payments via our secure Stripe checkout." },
      { q: "Are there bursaries or scholarships?", a: "Yes — limited needs-based bursaries through the Catholic Diocese of Kericho and merit awards for top KPSEA performers. Apply with the admissions form." },
      { q: "Is the registration fee refundable?", a: "The registration fee is non-refundable as it covers processing, the entrance interview, and the welcome pack." },
    ],
  },
  {
    id: "academics",
    label: "Academics",
    icon: BookOpen,
    items: [
      { q: "Are you fully CBE-aligned?", a: "Yes. We follow the Competency-Based Education curriculum from Grade 7 through Grade 10, with formative, summative and KNEC-administered national assessments." },
      { q: "Which senior pathways are offered?", a: "STEM, Social Sciences, and Arts & Sports Science. Each has tracks tailored to university and TVET pathways." },
      { q: "How big are the classes?", a: "We cap classes at 35 learners to ensure individualised attention and meaningful project-based work." },
      { q: "Do you offer remediation and enrichment?", a: "Yes — preps every weekday evening, Saturday clinics for learners needing extra support, and enrichment clubs for high achievers." },
    ],
  },
  {
    id: "boarding",
    label: "Boarding & Welfare",
    icon: Home,
    items: [
      { q: "Is boarding compulsory?", a: "Boarding is the default for Grades 9 and 10. Day-scholar arrangements are considered case-by-case for learners living within Bomet town." },
      { q: "How are dormitories supervised?", a: "Each house has a resident Matron/Patron, a Boarding Master/Mistress on duty rotation, and 24/7 security with controlled gate access." },
      { q: "What about medical care?", a: "An on-campus sick bay is staffed during school hours, with an after-hours nurse on call. We partner with Tenwek Hospital for serious cases." },
      { q: "Can parents visit?", a: "Visiting Sundays are scheduled twice per term. Mid-term breaks allow learners to go home." },
    ],
  },
  {
    id: "life",
    label: "School Life",
    icon: Heart,
    items: [
      { q: "What clubs and sports do you offer?", a: "Football, volleyball, athletics, music band (national finalists), drama, debate, science congress, ICT/coding club, scouts, Young Christian Students, and Wildlife Club." },
      { q: "Is the school Catholic or open to all?", a: "Founded by the Catholic Diocese of Kericho and rooted in Catholic values — yet we warmly welcome learners of all faith backgrounds." },
      { q: "How is discipline handled?", a: "Through a restorative framework: clear expectations, mentorship, parent partnership, and a graduated response policy that prioritises learner growth." },
    ],
  },
];

const Faq = () => {
  const [active, setActive] = useState<string>("admissions");
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const cat = FAQS.find((c) => c.id === active)!;
  const filtered = query.trim()
    ? FAQS.flatMap((c) => c.items.filter((i) => (i.q + i.a).toLowerCase().includes(query.toLowerCase())).map((i) => ({ ...i, _cat: c.label })))
    : cat.items.map((i) => ({ ...i, _cat: cat.label }));

  return (
    <SiteLayout>
      <Seo
        title="Frequently Asked Questions — St. Mary's Bomet"
        description="Quick answers about admissions, fees, academics, boarding, and school life at St. Mary's Mixed Junior & Senior School, Bomet."
      />

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute inset-0 pattern-grid opacity-25" />
        <div className="container-prose relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-accent">
            Help Centre
          </span>
          <h1 className="mt-5 font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
            Frequently asked <span className="text-gradient-aurora italic">questions</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
            Everything parents and prospective learners ask us — admissions, fees, boarding, academics and life on campus.
          </p>

          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-md pl-11 pr-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/55 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-prose grid lg:grid-cols-[260px,1fr] gap-10">
          {/* Categories */}
          <aside>
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">Categories</p>
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2">
              {FAQS.map((c) => {
                const Icon = c.icon;
                const isActive = !query && active === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => { setActive(c.id); setQuery(""); setOpen(null); }}
                    className={cn(
                      "shrink-0 inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium text-left transition-all",
                      isActive
                        ? "border-primary bg-primary/10 text-primary shadow-card"
                        : "border-border text-foreground/75 hover:text-primary hover:border-primary/40"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {c.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Questions */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                <p className="text-foreground/70">No questions match "{query}".</p>
                <Link to="/contact" className="mt-3 inline-block text-primary font-semibold hover:underline">Ask us directly →</Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {filtered.map((qa, idx) => {
                  const key = `${qa._cat}-${idx}`;
                  const isOpen = open === key;
                  return (
                    <li key={key} className="rounded-2xl border border-border bg-card overflow-hidden hover-lift">
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left"
                      >
                        <div>
                          {query && <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-1">{qa._cat}</p>}
                          <h3 className="font-display font-semibold text-base sm:text-lg text-foreground">{qa.q}</h3>
                        </div>
                        <ChevronDown className={cn("h-5 w-5 mt-1 text-muted-foreground shrink-0 transition-transform", isOpen && "rotate-180 text-primary")} />
                      </button>
                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 -mt-1 text-foreground/80 leading-relaxed border-t border-border pt-4">
                          {qa.a}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-12 rounded-2xl bg-gradient-royal text-primary-foreground p-8 sm:p-10 shadow-elevated">
              <h3 className="font-display text-2xl font-semibold">Still have questions?</h3>
              <p className="mt-2 text-primary-foreground/85">Our admissions team responds within one working day.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-glow transition">
                  <Phone className="h-4 w-4" /> Contact us
                </Link>
                <Link to="/admissions" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition">
                  Apply now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Faq;
