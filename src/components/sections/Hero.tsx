import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCampus from "@/assets/hero-campus.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image with Ken Burns slow zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroCampus}
          alt="Aerial view of St. Mary's Senior School campus in Bomet at golden hour"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 pattern-dots opacity-40" />

      <div className="container-prose relative z-10 pt-28 pb-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Form 1 Admissions 2026 — Now Open
          </span>

          <h1 className="mt-6 font-display font-bold text-display-xl text-primary-foreground text-balance">
            Excellence in Education,
            <span className="block text-accent italic">since 1965.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
            A premier secondary boarding school in the Bomet highlands, forming young men and women of character, scholarship, and service for Kenya and the world.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/admissions">
                Apply for Form 1 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/virtual-tour">
                <Play className="h-4 w-4" /> Take a Virtual Tour
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-primary-foreground/70">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce-soft" />
      </div>
    </section>
  );
};
