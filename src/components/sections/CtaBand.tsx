import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaBand = () => (
  <section className="py-20 bg-background">
    <div className="container-prose">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-gold px-8 py-14 sm:px-14 sm:py-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-accent-foreground/10" />
        <div className="absolute -left-10 -bottom-24 h-60 w-60 rounded-full border-[30px] border-accent-foreground/10" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display font-bold text-display-md text-accent-foreground text-balance">
              Ready to join the St. Mary's family?
            </h2>
            <p className="mt-4 text-accent-foreground/80 max-w-md">
              Form 1 admissions for 2026 are open. Submit your application online — or book a campus visit to see us in person.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild variant="forest" size="xl">
              <Link to="/admissions">Apply now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-transparent border-accent-foreground/40 text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              <Link to="/admissions#open-days">Book a visit</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
