import { Link } from "react-router-dom";
import logoImg from "@/assets/school-logo.jpg";

interface LogoProps {
  variant?: "default" | "light";
}

/** School wordmark + crest. */
export const Logo = ({ variant = "default" }: LogoProps) => {
  const text = variant === "light" ? "text-primary-foreground" : "text-primary";
  const sub = variant === "light" ? "text-primary-foreground/70" : "text-muted-foreground";

  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3 group"
      aria-label="St. Mary's Mixed Junior & Senior School Bomet — home"
    >
      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-background ring-1 ring-border overflow-hidden transition-transform group-hover:scale-105 shrink-0">
        <img
          src={logoImg}
          alt="St. Mary's Bomet crest"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold ${text}`}>St.&nbsp;Mary's&nbsp;Bomet</span>
        <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${sub}`}>
          Empowering&nbsp;Skills&nbsp;·&nbsp;Since&nbsp;1990
        </span>
      </span>
    </Link>
  );
};
