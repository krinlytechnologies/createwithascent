"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ABOUT } from "@/lib/about-content";
import { DURATION, EASE_BRAND, VIEWPORT } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Principles as comparison panels.
 *
 * As each row arrives, the preferred side resolves to full weight while the
 * rejected alternative recedes. The contrast between them *is* the content —
 * a principle you could not have chosen against is not a principle.
 *
 * The faded side never carries information that is lost by fading: both terms
 * stay legible and in the accessibility tree, and reduced motion shows the
 * finished state immediately.
 */

const PREFER = {
  hidden: { opacity: 0.35, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const REJECT = {
  hidden: { opacity: 0.65, y: 12 },
  /* Settles to a lower weight, never below the contrast floor — `text-muted`
     stays AA on the canvas at every opacity used here. */
  visible: { opacity: 0.75, y: 0 },
};

export function Principles() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="principles-heading"
      className="relative border-t border-line py-28 sm:py-36"
    >
      <Container>
        <Reveal>
          <SectionLabel>{ABOUT.principles.label}</SectionLabel>
        </Reveal>

        <Reveal level="section" className="mt-8">
          <h2
            id="principles-heading"
            className="max-w-[20ch] text-section text-ink"
          >
            {ABOUT.principles.heading}
          </h2>
        </Reveal>

        <ol className="mt-20">
          {ABOUT.principles.items.map((item) => (
            <motion.li
              key={item.id}
              initial={reduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ duration: DURATION.section, ease: EASE_BRAND }}
              className="grid items-baseline gap-x-8 gap-y-2 border-t border-line py-10 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
            >
              <motion.span
                variants={PREFER}
                className="text-sub text-ink sm:text-right"
              >
                {item.prefer}
              </motion.span>

              <span
                aria-hidden="true"
                className="font-mono text-label tracking-[0.14em] text-muted uppercase"
              >
                over
              </span>

              <motion.span variants={REJECT} className="text-sub text-muted">
                {item.over}
              </motion.span>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
