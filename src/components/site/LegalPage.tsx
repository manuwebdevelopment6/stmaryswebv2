import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SiteLayout } from "./SiteLayout";
import { Seo } from "./Seo";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  kicker?: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  seoDescription?: string;
}

export const LegalPage = ({ title, kicker = "Policies", intro, updated, sections, seoDescription }: LegalPageProps) => {
  return (
    <SiteLayout>
      <Seo title={`${title} — St. Mary's Bomet`} description={seoDescription ?? intro.slice(0, 155)} />

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute inset-0 pattern-grid opacity-25" />
        <div className="container-prose relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-mono text-accent">
            <Link to="/" className="hover:text-accent-glow">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="text-primary-foreground/70">{kicker}</span>
          </div>
          <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
            {intro}
          </p>
          <p className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-primary-foreground/60">
            Last updated · {updated}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-prose grid lg:grid-cols-[260px,1fr] gap-12">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">On this page</p>
              <nav className="flex flex-col gap-1.5 border-l border-border pl-4">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article */}
          <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:leading-relaxed prose-p:text-foreground/85 prose-li:text-foreground/85 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                {i > 0 && <hr className="my-10 border-border" />}
                <h2>{s.title}</h2>
                <div>{s.body}</div>
              </section>
            ))}

            <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-foreground">Have questions?</h3>
              <p className="mt-2 text-foreground/80 text-sm">
                Our administration team is happy to clarify anything in this document.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
                  Contact the school
                </Link>
                <a href="mailto:stmaryssecbomet@gmail.com" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary transition">
                  Email us
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
};
