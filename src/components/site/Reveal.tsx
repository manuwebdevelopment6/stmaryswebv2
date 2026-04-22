import { ReactNode, ElementType, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Lightweight scroll-reveal wrapper. Pair with <RevealRoot /> at the
 * page level (or rely on useReveal in SiteLayout) to trigger the animation
 * via IntersectionObserver. CSS-only — no framer-motion overhead.
 */
export const Reveal = ({ as: Tag = "div", children, delay = 0, className, style }: RevealProps) => {
  return (
    <Tag
      data-reveal=""
      style={{ ...style, ["--reveal-delay" as never]: `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
};

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string; // e.g. "4/3"
  loading?: "eager" | "lazy";
  overlay?: boolean;
};

/**
 * Image with built-in zoom + optional vignette overlay on hover.
 * Use everywhere a static <img> sits inside a card or hero side-panel.
 */
export const ImageReveal = ({
  src,
  alt,
  className,
  imgClassName,
  ratio = "4/3",
  loading = "lazy",
  overlay = true,
}: ImageRevealProps) => (
  <div
    className={cn(
      "img-zoom relative rounded-2xl",
      overlay && "img-overlay",
      className
    )}
    style={{ aspectRatio: ratio }}
  >
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={cn("h-full w-full object-cover", imgClassName)}
    />
  </div>
);
