"use client";

import { motion } from "framer-motion";

import { WHY_ASCENT } from "@/lib/home-content";
import { VIEWPORT, staggerParent } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Why Ascent — magazine layout.
 *
 * Identity: a pull-quote set at display scale carries the section on its own,
 * with the reasons running as a narrow numbered column beside it. Nothing is
 * boxed; the rules and the measure do the work.
 *
 * Deliberately different from every other section — §02 is a descending
 * sequence, §04 a split with a spine, §05 broadsheet columns, §06 a centred
 * timeline. This one is an opened spread.
 */
export function WhyAscent() {
  return (
    <section
      id="why-ascent"
      aria-labelledby="why-ascent-heading"
      className="section-y border-t border-line"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left page: the argument, held at the top while the reasons pass. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <SectionLabel>{WHY_ASCENT.label}</SectionLabel>
              </Reveal>

              <h2
                id="why-ascent-heading"
                className="mt-8 max-w-[14ch] text-section text-ink"
              >
                <LineReveal>{WHY_ASCENT.heading}</LineReveal>
              </h2>

              <Reveal level="component" className="mt-10">
                <blockquote className="border-l-2 border-action pl-6">
                  <p className="max-w-[30ch] text-sub text-copy">
                    {WHY_ASCENT.quote}
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>

          {/* Right page: the reasons, numbered in the margin. */}
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerParent(0.05)}
            className="lg:col-span-6 lg:col-start-7"
          >
            {WHY_ASCENT.reasons.map((reason) => (
              <Reveal
                key={reason.id}
                as="li"
                level="component"
                asChild
                className="grid gap-2 border-t border-line py-9 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-8 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-label tracking-[0.14em] text-action">
                  {reason.index}
                </span>
                <div>
                  <h3 className="max-w-[26ch] text-sub text-ink">
                    {reason.name}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-body text-copy">
                    {reason.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
