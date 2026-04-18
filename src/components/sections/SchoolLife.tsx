import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import academics from "@/assets/life-academics.jpg";
import sports from "@/assets/life-sports.jpg";
import boarding from "@/assets/life-boarding.jpg";

const ITEMS = [
  { img: academics, title: "Academics", body: "Rigorous curriculum, modern science labs, and 1:18 teacher ratio.", to: "/academics" },
  { img: sports, title: "Sports & Co-curriculars", body: "Rugby, football, hockey, athletics, music, drama and 30+ clubs.", to: "/life#sports" },
  { img: boarding, title: "Boarding Life", body: "A safe, well-supervised home-away-from-home in the Bomet highlands.", to: "/life#boarding" },
];

export const SchoolLife = () => (
  <section className="py-24 sm:py-32 bg-background">
    <div className="container-prose">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— School Life</span>
          <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">
            More than a school. <span className="text-primary italic">A community.</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          From the classroom to the rugby pitch to the dorm common room — every space is designed to help young people grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300"
          >
            <Link to={item.to} className="block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-primary-foreground/85">{item.body}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
