import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "default" | "light";
}

export const ThemeToggle = ({ variant = "default" }: Props) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && (resolvedTheme ?? theme) === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full border transition-all overflow-hidden group",
        variant === "light"
          ? "border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:shadow-cyan",
      )}
    >
      <span className="absolute inset-0 bg-gradient-aurora opacity-0 group-hover:opacity-20 transition-opacity" />
      {!mounted ? (
        <Sun className="h-4 w-4" />
      ) : isDark ? (
        <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
      ) : (
        <Sun className="h-4 w-4 transition-transform group-hover:rotate-45" />
      )}
    </button>
  );
};
