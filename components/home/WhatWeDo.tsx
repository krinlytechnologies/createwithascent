"use client";

import { motion } from "framer-motion";

import { PILLARS, WHAT_WE_DO } from "@/lib/home-content";
import { VIEWPORT, staggerParent } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * §05 — What We Do.
 *
 * Identity: a broadsheet spread. Three columns divided by full-height hairlines
 * rather than boxed into cards — no background, no border box, no shadow, no
 * radius. Typography and rules carry the whole section.
 *
 * The hairlines run floor to ceiling on purpose: they read as columns of one
 * page rather than three separate objects, which is the argument the section is
 * making about the pillars themselves.
 */
export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="section-y border-t border-line"
    >
      <Container>
        {/* Asymmetric opening — heading left, framing right. */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionLabel>{WHAT_WE_DO.label}</SectionLabel>
            <h2
              id="what-we-do-heading"
              className="mt-8 max-w-[12ch] text-section text-ink"
            >
              {WHAT_WE_DO.heading}
            </h2>
          </Reveal>

          <Reveal className="self-end lg:col-span-5 lg:col-start-8">
            <p className="max-w-[36ch] text-body text-copy">
              {WHAT_WE_DO.intro}
            </p>
          </Reveal>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerParent(0.1)}
          className="mt-20 grid border-t border-line md:grid-cols-3 sm:mt-24"
        >
          {PILLARS.map((pillar) => (
            <Reveal
              key={pillar.id}
              as="li"
              level="component"
              asChild
              className="group relative border-line pt-10 pb-4 md:border-l md:px-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              {/* Sits on the section rule and draws in on hover or focus. */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
              />

              <span className="block font-mono text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-line-strong transition-colors duration-300 group-hover:text-action group-focus-within:text-action">
                {pillar.index}
              </span>

              <h3 className="mt-8 text-sub text-ink">{pillar.name}</h3>

              <p className="mt-4 max-w-[34ch] text-body text-copy">
                {pillar.outcome}
              </p>
            </Reveal>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
