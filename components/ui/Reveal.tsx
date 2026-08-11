"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { useBlurAllowed } from "@/hooks/useMediaQuery";
import { VIEWPORT, revealVariants, type RevealLevel } from "@/lib/motion";

/**
 * Motion components are created once at module scope. Calling `motion.create`
 * during render would return a new component type on every pass, remounting the
 * subtree and restarting the animation.
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  li: motion.li,
  span: motion.span,
} as const;

type RevealTag = keyof typeof TAGS;

type RevealProps = {
  children: ReactNode;
  /** Component 16px/4px · section 24px/6px · hero 32px/8px. */
  level?: RevealLevel;
  /** Set when a parent orchestrates timing — this element inherits it. */
  asChild?: boolean;
  as?: RevealTag;
  className?: string;
};

/**
 * The signature reveal — opacity → translateY → blur-to-sharp.
 *
 * Fires at 15% in view and reveals once; re-animating on scroll-back tells the
 * visitor the page is performing for them. Blur is dropped below 768px and
 * under reduced motion, where the reveal still reads on opacity alone.
 */
export function Reveal({
  children,
  level = "section",
  asChild = false,
  as = "div",
  className,
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const blurAllowed = useBlurAllowed();

  const MotionTag = TAGS[as];
  const variants = revealVariants({ level, blurEnabled: blurAllowed, reduced });

  if (asChild) {
    return (
      <MotionTag variants={variants} className={className}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
