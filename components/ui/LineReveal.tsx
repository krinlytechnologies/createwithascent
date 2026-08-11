"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { DURATION, EASE_BRAND, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

type LineRevealProps = {
  children: ReactNode;
  /** Position in a stacked sequence. One stagger step per line. */
  step?: number;
  className?: string;
};

/**
 * A masked line reveal — the line rises from behind its own edge rather than
 * fading up.
 *
 * The strongest typographic device in the motion system, so it is reserved for
 * section-level moments. It animates `transform` only, and the mask is a plain
 * overflow clip, so it costs nothing beyond a compositor layer.
 *
 * **Visibility is observed on the wrapper, never on the moving line.** The line
 * starts translated a full height below its own box, which puts it entirely
 * outside the `overflow-hidden` parent — and IntersectionObserver accounts for
 * clipping by ancestors, so `whileInView` on the line itself reports it as
 * never intersecting and the animation never fires. The heading then sits
 * present, opaque and permanently invisible.
 *
 * `useInView` on the unclipped wrapper drives the state explicitly, rather than
 * relying on variant propagation reaching through the mask.
 */
export function LineReveal({ children, step = 0, className }: LineRevealProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  if (reduced) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <span ref={ref} className="block overflow-hidden py-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: DURATION.section,
          ease: EASE_BRAND,
          delay: step * STAGGER,
        }}
        className={cn("block", className)}
      >
        {children}
      </motion.span>
    </span>
  );
}
