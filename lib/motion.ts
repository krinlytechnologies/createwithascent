import type { Transition, Variants } from "framer-motion";

/**
 * The motion system, in code. Governed by brand/04-motion.md.
 *
 * Motion is communication, not decoration. Every animation belongs to exactly
 * one hierarchy level, and nothing exceeds 1000ms.
 */

/** Anything entering or revealing. Fast start, long settle. */
export const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

/** State changes — things that move and settle in place. */
export const EASE_STATE = [0.4, 0, 0.2, 1] as const;

/** Seconds, by hierarchy level. */
export const DURATION = {
  hover: 0.18,
  card: 0.25,
  component: 0.35,
  section: 0.45,
  hero: 0.7,
} as const;

/** 80ms, capped at six siblings — six beats fit inside the 1000ms ceiling. */
export const STAGGER = 0.08;
export const STAGGER_MAX_SIBLINGS = 6;

/**
 * The signature reveal: opacity → translateY → blur-to-sharp.
 *
 * This already sits at the three-transformation cap, so nothing may be layered
 * on top of it — no scale, no tracking change, no rotation.
 */
export const REVEAL = {
  component: { y: 16, blur: 4, duration: DURATION.component },
  section: { y: 24, blur: 6, duration: DURATION.section },
  hero: { y: 32, blur: 8, duration: DURATION.hero },
} as const;

export type RevealLevel = keyof typeof REVEAL;

type RevealOptions = {
  level?: RevealLevel;
  /** Blur is dropped below 768px and under reduced motion. */
  blurEnabled?: boolean;
  /** Reduced motion keeps opacity and removes everything spatial. */
  reduced?: boolean;
};

export function revealVariants({
  level = "section",
  blurEnabled = true,
  reduced = false,
}: RevealOptions = {}): Variants {
  const { y, blur, duration } = REVEAL[level];

  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y,
      filter: blurEnabled ? `blur(${blur}px)` : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: EASE_BRAND },
    },
  };
}

/**
 * Parent orchestrator. Children reveal in DOM order, one stagger step apart.
 * `delayChildren` holds the first child back until the page has settled.
 */
export function staggerParent(delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: STAGGER,
        delayChildren,
      },
    },
  };
}

/** Reveal once, at 15% in view. Never re-animate on scroll-back. */
export const VIEWPORT = { once: true, amount: 0.15 } as const;

/** Hover feedback. Level 1 — 150–200ms, lift 2px, no bounce. */
export const HOVER_TRANSITION: Transition = {
  duration: DURATION.hover,
  ease: EASE_STATE,
};
