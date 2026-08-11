"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SHIFT } from "@/lib/home-content";
import { DURATION, EASE_BRAND, VIEWPORT } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * §03 — The Shift.
 *
 * Identity: the only tonal band in this stretch of the page. A full-bleed sky
 * wash, one centred idea, and a rule that draws itself across the full width —
 * the shift made literal.
 *
 * Motion note: this is the one place scale is used. The signature reveal
 * already sits at the three-transformation cap, so scale *replaces* blur here
 * rather than joining it (brand/04-motion.md).
 */
export function Shift() {
  const reduced = useReducedMotion() ?? false;

  const idea = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: DURATION.hero, ease: EASE_BRAND },
        },
      };

  const rule = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { scaleX: 0 },
        visible: {
          scaleX: 1,
          transition: { duration: DURATION.hero, ease: EASE_BRAND, delay: 0.2 },
        },
      };

  return (
    <section
      id="the-shift"
      aria-labelledby="shift-heading"
      className="section-y bg-wash"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col items-center"
        >
          <motion.div variants={idea}>
            <SectionLabel tone="muted">{SHIFT.label}</SectionLabel>
          </motion.div>

          {/* Display statements may centre. Body copy, below, does not. */}
          <motion.h2
            id="shift-heading"
            variants={idea}
            className="mt-10 max-w-[16ch] text-center text-section text-ink"
          >
            {SHIFT.idea}
          </motion.h2>

          <motion.span
            aria-hidden="true"
            variants={rule}
            className="mt-16 h-px w-full origin-center bg-line-strong sm:mt-20"
          />

          <div className="mt-10 grid w-full gap-6 lg:grid-cols-12">
            <motion.p
              variants={idea}
              className="text-body text-copy lg:col-span-5 lg:col-start-7"
            >
              {SHIFT.support}
            </motion.p>
          </div>

          <motion.p
            variants={idea}
            className="mt-16 font-mono text-caption tracking-[0.06em] text-action"
          >
            {SHIFT.close}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
