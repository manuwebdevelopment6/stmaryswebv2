import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaBand = () => (
  <section className="py-20 bg-background">
    <div className="container-prose">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-aurora bg-[length:200%_200%] animate-gradient-pan px-8 py-14 sm:px-14 sm:py-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-primary-foreground/10" />
        <div className="absolute -left-10 -bottom-24 h-60 w-60 rounded-full border-[30px] border-primary-foreground/10" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/80">— Join Our Excellence Community</span>
            <h2 className="mt-3 font-display font-bold text-display-md text-primary-foreground text-balance">
              Ready to join our school community?
            </h2>
            <p className="mt-4 text-primary-foreground/85 max-w-md">
              Take the first step towards your child's bright future. From Junior School (Grade 7-9) through Grade 10, our admissions team is ready to guide you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild variant="forest" size="xl">
              <Link to="/admissions">Start Application <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">Schedule Visit</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
