import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Quote as QuoteIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import type { PublishedBlock } from "@/lib/cms/usePageBlocks";

type Data = Record<string, any>;

const Eyebrow = ({ text }: { text?: string }) =>
  text ? <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{text}</span> : null;

// ---- Renderers ----
const HeroBlock = ({ d }: { d: Data }) => (
  <section className="relative min-h-[80svh] flex items-center overflow-hidden bg-primary-deep">
    {d.image && <img src={d.image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
    <div className="absolute inset-0 bg-gradient-hero" />
    <div className="container-prose relative z-10 pt-40 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
        {d.eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-md">
            {d.eyebrow}
          </span>
        )}
        {d.title && (
          <h1
            className="mt-6 font-display font-bold text-display-xl text-primary-foreground text-balance leading-[1.02]"
            dangerouslySetInnerHTML={{ __html: d.title }}
          />
        )}
        {d.subtitle && <p className="mt-7 max-w-xl text-base sm:text-lg text-primary-foreground/90 leading-relaxed">{d.subtitle}</p>}
        <div className="mt-9 flex flex-wrap gap-3">
          {d.primary_cta_label && d.primary_cta_href && (
            <Button asChild variant="hero" size="xl">
              <Link to={d.primary_cta_href}>{d.primary_cta_label} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          )}
          {d.secondary_cta_label && d.secondary_cta_href && (
            <Button asChild variant="hero-outline" size="xl">
              <Link to={d.secondary_cta_href}>{d.secondary_cta_label}</Link>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  </section>
);

const RichTextBlock = ({ d }: { d: Data }) => (
  <section className="py-20 bg-background">
    <div className={`container-prose ${d.align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}`}>
      <Eyebrow text={d.eyebrow} />
      {d.title && <h2 className="mt-3 font-display font-bold text-display-md text-foreground text-balance">{d.title}</h2>}
      {d.body && (
        <div
          className="prose prose-lg dark:prose-invert mt-6 max-w-none text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: d.body }}
        />
      )}
    </div>
  </section>
);

const StatsBlock = ({ d }: { d: Data }) => (
  <section className="py-16 bg-background">
    <div className="container-prose">
      {d.title && <h2 className="font-display font-bold text-display-sm text-center mb-10">{d.title}</h2>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-2 rounded-2xl glass shadow-elevated py-10 px-6 sm:px-10">
        {(d.items ?? []).map((s: Data, i: number) => (
          <div key={i} className="text-center px-2">
            <div className="font-display font-bold text-4xl sm:text-5xl text-gradient-aurora tabular-nums">{s.value}</div>
            <div className="mt-2 font-semibold text-sm text-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CardsBlock = ({ d }: { d: Data }) => (
  <section className="py-20 bg-background">
    <div className="container-prose">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Eyebrow text={d.eyebrow} />
        {d.title && <h2 className="mt-3 font-display font-bold text-display-md text-foreground">{d.title}</h2>}
        {d.subtitle && <p className="mt-4 text-muted-foreground">{d.subtitle}</p>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(d.items ?? []).map((c: Data, i: number) => {
          const Inner = (
            <div className="group h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-elevated transition-all">
              {c.image && <img src={c.image} alt="" className="w-full aspect-[16/10] object-cover rounded-lg mb-4" />}
              {c.title && <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">{c.title}</h3>}
              {c.body && <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>}
            </div>
          );
          return c.href ? <Link key={i} to={c.href}>{Inner}</Link> : <div key={i}>{Inner}</div>;
        })}
      </div>
    </div>
  </section>
);

const TestimonialsBlock = ({ d }: { d: Data }) => (
  <section className="py-20 bg-gradient-soft">
    <div className="container-prose">
      {d.title && <h2 className="font-display font-bold text-display-md text-center mb-12">{d.title}</h2>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(d.items ?? []).map((t: Data, i: number) => (
          <figure key={i} className="rounded-2xl bg-card border border-border p-6 shadow-sm">
            <QuoteIcon className="h-6 w-6 text-accent mb-3" />
            <blockquote className="text-foreground italic">"{t.quote}"</blockquote>
            <figcaption className="mt-4 text-sm">
              <div className="font-semibold text-foreground">{t.name}</div>
              {t.role && <div className="text-muted-foreground">{t.role}</div>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const GalleryBlock = ({ d }: { d: Data }) => (
  <section className="py-20 bg-background">
    <div className="container-prose">
      {d.title && <h2 className="font-display font-bold text-display-md text-center mb-10">{d.title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {(d.items ?? []).map((p: Data, i: number) => (
          <figure key={i} className="rounded-xl overflow-hidden bg-muted">
            {p.image && <img src={p.image} alt={p.caption ?? ""} loading="lazy" className="w-full aspect-square object-cover" />}
            {p.caption && <figcaption className="text-xs p-2 text-muted-foreground">{p.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const CtaBlock = ({ d }: { d: Data }) => (
  <section className="py-20 bg-background">
    <div className="container-prose">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-aurora bg-[length:200%_200%] animate-gradient-pan px-8 py-14 sm:px-14 sm:py-16">
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            {d.eyebrow && <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/80">{d.eyebrow}</span>}
            {d.title && <h2 className="mt-3 font-display font-bold text-display-md text-primary-foreground text-balance">{d.title}</h2>}
            {d.body && <p className="mt-4 text-primary-foreground/85 max-w-md">{d.body}</p>}
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {d.primary_cta_label && d.primary_cta_href && (
              <Button asChild variant="forest" size="xl">
                <Link to={d.primary_cta_href}>{d.primary_cta_label} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            )}
            {d.secondary_cta_label && d.secondary_cta_href && (
              <Button asChild variant="outline" size="xl" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to={d.secondary_cta_href}>{d.secondary_cta_label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FaqBlock = ({ d }: { d: Data }) => (
  <section className="py-20 bg-background">
    <div className="container-prose max-w-3xl">
      {d.title && <h2 className="font-display font-bold text-display-md text-center mb-8">{d.title}</h2>}
      <Accordion type="single" collapsible>
        {(d.items ?? []).map((q: Data, i: number) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{q.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{q.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

const ImageBlock = ({ d }: { d: Data }) => (
  <section className="py-12 bg-background">
    <div className="container-prose">
      {d.image && <img src={d.image} alt={d.alt ?? ""} className="w-full rounded-2xl shadow-elevated" />}
      {d.caption && <p className="mt-3 text-center text-sm text-muted-foreground">{d.caption}</p>}
    </div>
  </section>
);

const VideoBlock = ({ d }: { d: Data }) => {
  if (!d.url) return null;
  // Convert YouTube/Vimeo URLs to embed form
  let embed = d.url as string;
  const yt = embed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) embed = `https://www.youtube.com/embed/${yt[1]}`;
  const vm = embed.match(/vimeo\.com\/(\d+)/);
  if (vm) embed = `https://player.vimeo.com/video/${vm[1]}`;
  return (
    <section className="py-12 bg-background">
      <div className="container-prose">
        {d.title && <h2 className="font-display text-display-sm font-bold text-center mb-6">{d.title}</h2>}
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated">
          <iframe src={embed} title={d.title ?? "video"} className="absolute inset-0 w-full h-full" allowFullScreen />
        </div>
      </div>
    </section>
  );
};

const BreakingNewsBlock = ({ d }: { d: Data }) => {
  const items = d.items ?? [];
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <section className="py-3 bg-primary-deep">
      <div className="container-prose">
        <div className="flex items-stretch gap-0 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 backdrop-blur-md overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-destructive text-destructive-foreground font-semibold text-xs uppercase tracking-wider">
            <Bell className="h-3.5 w-3.5" /> {d.label ?? "News"}
          </div>
          <div className="group flex-1 overflow-hidden relative">
            <div className="flex items-center gap-10 whitespace-nowrap py-2.5 animate-marquee group-hover:[animation-play-state:paused]">
              {loop.map((item: Data, i: number) => (
                <Link key={i} to={item.href ?? "#"} className="text-sm text-primary-foreground/90 hover:text-accent">
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RENDERERS: Record<string, React.FC<{ d: Data }>> = {
  hero: HeroBlock,
  richtext: RichTextBlock,
  stats: StatsBlock,
  cards: CardsBlock,
  testimonials: TestimonialsBlock,
  gallery: GalleryBlock,
  cta: CtaBlock,
  faq: FaqBlock,
  image: ImageBlock,
  video: VideoBlock,
  breaking_news: BreakingNewsBlock,
};

export const BlockRenderer = ({ block }: { block: PublishedBlock }) => {
  const Comp = RENDERERS[block.block_type];
  if (!Comp) return null;
  return <Comp d={block.data} />;
};

export const BlockList = ({ blocks }: { blocks: PublishedBlock[] }) => (
  <>{blocks.map((b) => <BlockRenderer key={b.id} block={b} />)}</>
);
