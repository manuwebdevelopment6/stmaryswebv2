import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { FileText, Download, Search, Lock, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CmsPage } from "@/components/cms/CmsPage";

type Doc = {
  id: string;
  title: string;
  grade: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Form 3" | "Form 4";
  subject: string;
  type: "Past Paper" | "Marking Scheme" | "Notes" | "Syllabus";
  term: string;
  size: string;
  protected?: boolean;
};

const DOCS: Doc[] = [
  { id: "1", title: "Grade 7 Mathematics — End-Term 1", grade: "Grade 7", subject: "Mathematics", type: "Past Paper", term: "Term 1 · 2025", size: "1.2 MB" },
  { id: "2", title: "Grade 7 Mathematics — Marking Scheme", grade: "Grade 7", subject: "Mathematics", type: "Marking Scheme", term: "Term 1 · 2025", size: "0.8 MB", protected: true },
  { id: "3", title: "Grade 8 English — Mid-Term", grade: "Grade 8", subject: "English", type: "Past Paper", term: "Term 2 · 2025", size: "1.0 MB" },
  { id: "4", title: "Grade 8 Kiswahili — Mtihani wa Muhula", grade: "Grade 8", subject: "Kiswahili", type: "Past Paper", term: "Term 2 · 2025", size: "0.9 MB" },
  { id: "5", title: "Grade 9 Integrated Science — End-Term", grade: "Grade 9", subject: "Integrated Science", type: "Past Paper", term: "Term 3 · 2024", size: "1.5 MB" },
  { id: "6", title: "Grade 9 Social Studies — Notes", grade: "Grade 9", subject: "Social Studies", type: "Notes", term: "All terms · 2024", size: "2.4 MB" },
  { id: "7", title: "Grade 10 Mathematics — Term 1 Paper", grade: "Grade 10", subject: "Mathematics", type: "Past Paper", term: "Term 1 · 2025", size: "1.4 MB" },
  { id: "8", title: "Grade 10 Mathematics — Marking Scheme", grade: "Grade 10", subject: "Mathematics", type: "Marking Scheme", term: "Term 1 · 2025", size: "0.7 MB", protected: true },
  { id: "9", title: "Grade 10 Biology — End-Term Paper", grade: "Grade 10", subject: "Biology", type: "Past Paper", term: "Term 2 · 2025", size: "1.6 MB" },
  { id: "10", title: "Grade 10 Computer Studies — Notes", grade: "Grade 10", subject: "Computer Studies", type: "Notes", term: "Term 1 · 2025", size: "3.1 MB" },
  { id: "11", title: "CBC Senior School Syllabus Overview", grade: "Grade 10", subject: "All", type: "Syllabus", term: "2025-2027", size: "2.0 MB" },
  { id: "12", title: "Form 4 KCSE Mathematics — Mock", grade: "Form 4", subject: "Mathematics", type: "Past Paper", term: "Term 2 · 2025", size: "1.3 MB" },
  { id: "13", title: "Form 4 Chemistry — Practical Mock", grade: "Form 4", subject: "Chemistry", type: "Past Paper", term: "Term 2 · 2025", size: "1.1 MB" },
  { id: "14", title: "Form 3 English — End-Term Paper 2", grade: "Form 3", subject: "English", type: "Past Paper", term: "Term 1 · 2025", size: "1.0 MB" },
];

const GRADES = ["All", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Form 3", "Form 4"];
const TYPES = ["All", "Past Paper", "Marking Scheme", "Notes", "Syllabus"];

const TYPE_STYLES: Record<string, string> = {
  "Past Paper": "bg-primary/10 text-primary",
  "Marking Scheme": "bg-accent/15 text-accent",
  Notes: "bg-info/10 text-info",
  Syllabus: "bg-success/15 text-success",
};

const ExamDownloads = () => {
  const [grade, setGrade] = useState("All");
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");

  const filtered = DOCS.filter(
    (d) =>
      (grade === "All" || d.grade === grade) &&
      (type === "All" || d.type === type) &&
      (q === "" || (d.title + " " + d.subject).toLowerCase().includes(q.toLowerCase())),
  );

  const handleDownload = (doc: Doc) => {
    if (doc.protected) {
      alert(
        "This resource is protected. Please sign in to the Student Portal with your school credentials to download.",
      );
      return;
    }
    alert(`Demo: '${doc.title}' would download here. Real PDFs will be uploaded by the academic office.`);
  };

  return (
    <SiteLayout>
      <Seo
        title="Exam Downloads — Past Papers & Notes | St. Mary's Bomet"
        description="Download CBC past papers, marking schemes and study notes for Grade 7-10 and Form 3-4 students at St. Mary's Mixed Junior & Senior School Bomet."
      />
      <CmsPage slug="exam-downloads" fallback={<>

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="aurora-orb h-[380px] w-[380px] right-0 top-10 bg-accent opacity-25" />
        <div className="container-prose relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              — Academic Resources
            </span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              Exam <span className="text-gradient-aurora italic">Downloads</span>.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-2xl">
              Past papers, marking schemes, study notes and syllabus documents for our Grade 7-10
              CBC learners and Form 3-4 KCSE candidates. Updated each term by the academic office.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1.5">
                <FileText className="h-3.5 w-3.5 text-accent" /> {DOCS.length} resources available
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1.5">
                <Lock className="h-3.5 w-3.5 text-accent" /> Marking schemes — students only
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30 backdrop-blur-md bg-background/85">
        <div className="container-prose flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all ${
                  grade === g
                    ? "bg-gradient-cyan text-accent-foreground shadow-cyan"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-10 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                maxLength={80}
                placeholder="Search resources…"
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-16 bg-background">
        <div className="container-prose">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              No resources match your filters.
            </p>
          ) : (
            <div className="grid gap-3">
              {filtered.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="rounded-xl border border-border bg-card p-5 flex flex-wrap items-center gap-4 shadow-card hover:shadow-elevated transition-shadow"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-[220px]">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {d.title}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> {d.subject}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {d.term}
                      </span>
                      <span className="font-mono">{d.size}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-[10px] font-semibold uppercase tracking-wider">
                    {d.grade}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${TYPE_STYLES[d.type]}`}
                  >
                    {d.type}
                  </span>
                  <Button
                    onClick={() => handleDownload(d)}
                    size="sm"
                    variant={d.protected ? "outline" : "default"}
                  >
                    {d.protected ? (
                      <>
                        <Lock className="h-3.5 w-3.5" /> Sign in
                      </>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" /> Download
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help band */}
      <section className="py-16 bg-gradient-soft">
        <div className="container-prose grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-7">
            <h3 className="font-display text-xl font-semibold text-foreground">Need a specific paper?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact the academic office and we'll send you a digital copy by email.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/contact">Contact academic office</Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-primary-deep text-primary-foreground p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
            <div className="relative">
              <h3 className="font-display text-xl font-semibold">Are you a current student?</h3>
              <p className="mt-2 text-sm text-primary-foreground/85">
                Sign in to the Student Portal for marking schemes and protected resources.
              </p>
              <Button asChild variant="hero" size="sm" className="mt-5">
                <Link to="/portal">Open Student Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </>} />
    </SiteLayout>
  );
};

export default ExamDownloads;
