"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { DURATION, EASE_BRAND, STAGGER, VIEWPORT } from "@/lib/motion";
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
 * This is the strongest typographic device in the motion system, so it is
 * reserved for section-level moments (brand/04-motion.md). It animates
 * `transform` only, and the mask is a plain overflow clip, so it costs nothing
 * beyond a compositor layer.
 */
export function LineReveal({ children, step = 0, className }: LineRevealProps) {
  const reduced = useReducedMotion() ?? false;

  if (reduced) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <span className="block overflow-hidden py-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={VIEWPORT}
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
