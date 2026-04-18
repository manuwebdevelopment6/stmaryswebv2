import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "light";
}

/** School wordmark + crest (SVG, no external asset). */
export const Logo = ({ variant = "default" }: LogoProps) => {
  const text = variant === "light" ? "text-primary-foreground" : "text-primary";
  const sub = variant === "light" ? "text-primary-foreground/70" : "text-muted-foreground";
  const ring = variant === "light" ? "stroke-primary-foreground" : "stroke-primary";
  const fill = variant === "light" ? "fill-accent" : "fill-accent";

  return (
    <Link to="/" className="inline-flex items-center gap-3 group" aria-label="St. Mary's Senior School Bomet — home">
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-primary-deep transition-transform group-hover:scale-105">
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden>
          <circle cx="20" cy="20" r="17" className={`fill-transparent ${ring}`} strokeWidth="1.5" />
          <path d="M20 7 L24 17 L34 17 L26 23 L29 33 L20 27 L11 33 L14 23 L6 17 L16 17 Z" className={fill} />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold ${text}`}>St.&nbsp;Mary's</span>
        <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${sub}`}>Senior · Bomet</span>
      </span>
    </Link>
  );
};
