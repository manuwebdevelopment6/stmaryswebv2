import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const QUOTES = [
  {
    body: "St. Mary's gave my son confidence as well as grades. He came home from Form 4 not just an A-student, but a young man ready for the world.",
    name: "Wanjiru K.",
    role: "Parent · Form 4 leaver, 2024",
  },
  {
    body: "The teachers stay late, mark our work the same week, and actually know us by name. That makes all the difference at the boarding house.",
    name: "Brian C.",
    role: "Form 3 student",
  },
  {
    body: "I joined as a shy KCPE candidate and left as Head Girl. The clubs, the sports, the pastoral care — it all shaped who I am at university today.",
    name: "Faith J.",
    role: "Alumna, University of Nairobi",
  },
];

export const Testimonials = () => (
  <section className="py-24 sm:py-32 bg-primary-deep text-primary-foreground relative overflow-hidden">
    {/* Layered atmosphere */}
    <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
    <div className="absolute inset-0 pattern-dots opacity-30" />
    <div className="aurora-orb h-[420px] w-[420px] -left-32 top-10 bg-primary-glow opacity-30" />
    <div className="aurora-orb h-[360px] w-[360px] right-0 bottom-0 bg-accent opacity-30" style={{ animationDelay: "2s" }} />

    <div className="container-prose relative">
      <div className="max-w-2xl mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Voices</span>
        <h2 className="mt-3 font-display font-bold text-display-lg text-balance text-primary-foreground">
          What our community <span className="text-gradient-aurora italic">says.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="group relative rounded-2xl bg-primary-foreground/[0.06] border border-primary-foreground/15 backdrop-blur-md p-7 flex flex-col hover:bg-primary-foreground/[0.1] hover:border-accent/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute -top-3 left-7 grid h-9 w-9 place-items-center rounded-full bg-gradient-cyan shadow-cyan">
              <Quote className="h-4 w-4 text-accent-foreground" />
            </div>
            <blockquote className="mt-4 font-display text-lg leading-snug text-primary-foreground flex-1">
              "{q.body}"
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-primary-foreground/15">
              <p className="font-semibold text-primary-foreground">{q.name}</p>
              <p className="text-xs text-accent/90 mt-0.5 font-mono uppercase tracking-wider">{q.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
