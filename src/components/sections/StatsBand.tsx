import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { end: 500, suffix: "+", label: "Students", sub: "Grade 7 – 10 + Form 3-4" },
  { end: 25, suffix: "+", label: "Teachers", sub: "Dedicated & qualified" },
  { end: 35, suffix: "+", label: "Years", sub: "Of excellence since 1990" },
  { end: 98, suffix: "%", label: "University", sub: "Admission rate" },
];

const Counter = ({ stat }: { stat: Stat }) => {
  const { ref, value } = useCountUp(stat.end, 1600);
  return (
    <div className="text-center px-2 group">
      <div className="font-display font-bold text-4xl sm:text-5xl text-gradient-aurora tabular-nums">
        {stat.prefix}<span ref={ref}>{value.toLocaleString()}</span>{stat.suffix}
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
