import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Sparkles, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreakingNewsTicker } from "./BreakingNewsTicker";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden bg-primary-deep">
      {/* Background image with parallax + Ken Burns */}
      <motion.div
        style={{ y: yImg }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="https://stmarysseniorschoolbomet.co.ke/images/students1.jpg"
          alt="St. Mary's Mixed Junior & Senior School Bomet — students on campus"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-80" />
      <div className="absolute inset-0 pattern-grid opacity-30" />

      <div
        className="aurora-orb h-[420px] w-[420px] -left-32 top-20 bg-primary-glow"
        style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }}
      />
      <div
        className="aurora-orb h-[360px] w-[360px] right-0 bottom-10 bg-accent"
        style={{ transform: `translate(${-mouse.x}px, ${-mouse.y}px)`, animationDelay: "3s" }}
      />

      {/* Breaking news ticker */}
      <div className="absolute top-20 sm:top-24 left-0 right-0 z-20">
        <BreakingNewsTicker />
      </div>

      <motion.div style={{ y: yText, opacity }} className="container-prose relative z-10 pt-40 pb-24 lg:pt-44">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-3xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-md ring-1 ring-accent/30"
          >
            <Sparkles className="h-3 w-3 text-accent animate-pulse" />
            35+ Years of Educational Excellence · Admissions Grade 7-10 · 2026
          </motion.span>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display font-bold text-display-xl text-primary-foreground text-balance leading-[1.02]"
          >
            Shaping Tomorrow's
            <span className="relative inline-block ml-3">
              <span className="text-gradient-aurora italic">Leaders</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                <path d="M2 7 Q 50 1 100 5 T 198 4" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            <span className="block mt-2 text-primary-foreground/90">Today.</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="mt-7 max-w-xl text-base sm:text-lg text-primary-foreground/90 leading-relaxed"
          >
            At St. Mary's Mixed Junior &amp; Senior School — Bomet, we deliver exceptional <span className="text-accent font-semibold">CBE education</span> from <span className="text-accent font-semibold">Grade 7</span> through <span className="text-accent font-semibold">Grade 10</span>, nurturing academic excellence, character development and lifelong learning.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button asChild variant="hero" size="xl" className="animate-pulse-glow">
              <Link to="/admissions">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/virtual-tour">
                <Play className="h-4 w-4" /> Virtual Tour
              </Link>
            </Button>
          </motion.div>

          {/* Quick contacts */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-primary-foreground/80"
          >
            <a href="tel:+254721771568" className="inline-flex items-center gap-2 hover:text-accent transition-colors"><Phone className="h-4 w-4 text-accent" /> +254 721 771 568</a>
            <a href="mailto:stmaryssecbomet@gmail.com" className="inline-flex items-center gap-2 hover:text-accent transition-colors"><Mail className="h-4 w-4 text-accent" /> stmaryssecbomet@gmail.com</a>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Bomet, Kenya</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-primary-foreground/70"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce-soft" />
      </motion.div>
    </section>
  );
};
