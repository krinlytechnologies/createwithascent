"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { ABOUT } from "@/lib/about-content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The transformation — one of the four Level 4 moments.
 *
 * Two states of the same business, in matched pairs. Row *n* on the left is
 * answered by row *n* on the right, so the rows are laid out as a grid rather
 * than two independent lists: the pairing is the argument, and a mismatch in
 * length would break it silently. The lengths are asserted below.
 *
 * Scrubbed by scroll, so nothing plays on its own — the visitor drives it. As
 * the section passes, each "before" line recedes and its "after" answer resolves
 * to full weight, one pair at a time down the column.
 *
 * The flat-legibility test: with every transform removed, this is still two
 * headed lists of four lines each in a table. Motion sets the pace and the
 * pairing; it carries no information of its own, which is why reduced motion
 * simply shows the finished state.
 */

const { transformation } = ABOUT;

if (transformation.before.items.length !== transformation.after.items.length) {
  throw new Error("Transformation: before and after must be the same length — they are pairs.");
}

const PAIRS = transformation.before.items.map((before, index) => ({
  before,
  after: transformation.after.items[index]!,
}));

export function TransitionSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /*
       * `matchMedia` rather than a manual check: under reduced motion the
       * timeline is never built, so every element keeps its CSS state — which
       * is deliberately the *finished* state. Nothing has to be undone, and
       * nothing can be left half-resolved.
       */
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const afters = gsap.utils.toArray<HTMLElement>("[data-after]", gridRef.current ?? undefined);
        const rules = gsap.utils.toArray<HTMLElement>("[data-rule]", gridRef.current ?? undefined);

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            /* Completes as the section reaches the middle of the viewport.
               Ending on `bottom` stretched the scrub so far that the last pair
               was still unresolved with the section sitting centred — a visitor
               who stopped scrolling there saw an argument missing its answer. */
            end: "center 40%",
            scrub: true,
          },
        });

        PAIRS.forEach((_, index) => {
          const at = index * 20;

          timeline.to(rules[index]!, { scaleX: 1, duration: 12 }, at);
          timeline.fromTo(
            afters[index]!,
            { opacity: 0.15, y: 8 },
            { opacity: 1, y: 0, duration: 14 },
            at + 2,
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="transformation-heading"
      className="relative overflow-hidden border-t border-line py-28 sm:py-36"
    >
      <Container>
        <Reveal>
          <SectionLabel>{transformation.label}</SectionLabel>
        </Reveal>

        <Reveal level="section" className="mt-8">
          <h2 id="transformation-heading" className="max-w-[16ch] text-section text-ink">
            {transformation.heading}
          </h2>
        </Reveal>

        <div ref={gridRef} className="mt-16">
          {/* Column headings, carried by the grid so they sit over their column. */}
          <div className="grid grid-cols-1 gap-x-10 border-b border-line pb-4 sm:grid-cols-2">
            <p className="font-mono text-label tracking-[0.14em] text-muted uppercase">
              {transformation.before.title}
            </p>
            <p className="mt-3 font-mono text-label tracking-[0.14em] text-action uppercase sm:mt-0">
              {transformation.after.title}
            </p>
          </div>

          <ul>
            {PAIRS.map(({ before, after }) => (
              <li
                key={before}
                className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-line py-7 sm:grid-cols-2"
              >
                {/*
                  The "before" state is set apart by colour and by its column
                  heading, never by opacity. An earlier pass faded it to 0.4 as
                  the pair resolved, which read well and dropped the text under
                  the 4.5:1 floor — `--color-muted` is contrast-checked at full
                  opacity, so it carries the same meaning and stays legible.
                */}
                <span className="text-body text-muted">{before}</span>

                <span className="relative flex items-start">
                  {/* The connector: draws from the old state toward the new one
                      as the pair resolves. Hidden on one column, where there is
                      no gap to cross. */}
                  <span
                    aria-hidden
                    data-rule
                    className="absolute top-[0.7em] -left-10 hidden h-px w-8 origin-left bg-action/40 [transform:scaleX(0)] motion-reduce:[transform:scaleX(1)] sm:block"
                  />
                  <span data-after className="text-body text-ink motion-reduce:opacity-100">
                    {after}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
