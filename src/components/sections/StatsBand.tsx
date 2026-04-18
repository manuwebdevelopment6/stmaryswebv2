import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { end: 9.2, suffix: "", label: "KCSE Mean", sub: "2024 cohort (B+)" },
  { end: 60, suffix: "+", label: "Years", sub: "of academic legacy" },
  { end: 1240, label: "Students", sub: "Forms 1 – 4" },
  { end: 96, suffix: "%", label: "University", sub: "placement rate" },
];

const Counter = ({ stat }: { stat: Stat }) => {
  const { ref, value } = useCountUp(Math.floor(stat.end * (stat.end < 10 ? 10 : 1)), 1600);
  const display = stat.end < 10 ? (value / 10).toFixed(1) : value.toLocaleString();
  return (
    <div className="text-center px-2 group">
      <div className="font-display font-bold text-4xl sm:text-5xl bg-gradient-aurora bg-[length:200%_200%] animate-gradient-pan bg-clip-text text-transparent tabular-nums">
        {stat.prefix}<span ref={ref}>{display}</span>{stat.suffix}
      </div>
      <div className="mt-2 font-semibold text-sm text-foreground">{stat.label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
    </div>
  );
};

export const StatsBand = () => (
  <section className="relative -mt-16 z-20">
    <div className="container-prose">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-2 rounded-2xl glass shadow-elevated py-10 px-6 sm:px-10 hover:shadow-cyan transition-shadow duration-500">
        {STATS.map((s) => <Counter key={s.label} stat={s} />)}
      </div>
    </div>
  </section>
);
