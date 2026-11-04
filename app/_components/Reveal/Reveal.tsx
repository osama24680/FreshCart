"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type From = "up" | "left" | "right" | "scale";

interface IProps {
  children: ReactNode;
  className?: string;
  from?: From;
  delay?: number; // ms — use it to stagger items in a grid
}

// Where the element starts before it scrolls into view.
// Full class names only — Tailwind can't see classes built with `${}`.
const hidden: Record<From, string> = {
  up: "motion-safe:opacity-0 motion-safe:translate-y-6",
  left: "motion-safe:opacity-0 motion-safe:-translate-x-12",
  right: "motion-safe:opacity-0 motion-safe:translate-x-12",
  scale: "motion-safe:opacity-0 motion-safe:scale-95",
};

/**
 * Fades its children in the first time they scroll into view.
 * Motion only runs for users without "reduce motion" (motion-safe:).
 */
const Reveal = ({ children, className, from = "up", delay = 0 }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate once only
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
        visible ? "translate-0 scale-100 opacity-100" : hidden[from],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Reveal;
