"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useCallback, useRef } from "react";

import { useScrollStages } from "@/hooks/useScrollStages";
import { HOW_WE_WORK } from "@/lib/home-content";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const { label, heading, stages, close } = HOW_WE_WORK;

/**
 * §06 — How We Work.
 *
 * The second and final pinned section on the site.
 *
 * Identity: deliberately the inverse of §04. There, every stage stays on screen
 * at once because the argument is that they form one system. Here a single
 * stage occupies the centre of the screen at a time, because the argument is
 * that an engagement is a path you walk. Same mechanic, opposite meaning.
 *
 * Below 1024px, or with reduced motion, the pin never engages and all four
 * stages render as an ordinary numbered list.
 */
export function HowWeWork() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const onProgress = useCallback((progress: number) => {
    if (!progressRef.current) return;
    gsap.set(progressRef.current, { scaleX: progress });
  }, []);

  const { activeIndex, pinned } = useScrollStages({
    sectionRef,
    pinRef,
    stageCount: stages.length,
    viewportsOfScroll: 1.6,
    onProgress,
  });

  const active = stages[activeIndex] ?? stages[0];
  const atEnd = !pinned || activeIndex === stages.length - 1;

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="border-t border-line bg-surface"
    >
      <div
        ref={pinRef}
        className="section-y flex items-center lg:min-h-screen lg:py-0"
      >
        <Container width="editorial">
          <div className="flex flex-col items-center">
            <SectionLabel tone="muted">{label}</SectionLabel>

            <h2
              id="how-we-work-heading"
              className="mt-8 max-w-[16ch] text-center text-section text-ink"
            >
              {heading}
            </h2>

            {/* Progress: numerals plus a scrubbed rule. Position is never
                signalled by colour alone. */}
            <div
              aria-hidden="true"
              className="mt-14 w-full max-w-lg sm:mt-16"
            >
              <ol className="flex items-center justify-between font-mono text-label tracking-[0.14em]">
                {stages.map((stage, index) => (
                  <li
                    key={stage.id}
                    className={cn(
                      "transition-colors duration-300",
                      !pinned || index <= activeIndex
                        ? "text-action"
                        : "text-line-strong",
                    )}
                  >
                    {stage.index}
                  </li>
                ))}
              </ol>

              <div className="relative mt-4 h-px w-full bg-line">
                <span
                  ref={progressRef}
                  className={cn(
                    "absolute inset-0 origin-left bg-action",
                    /* Written to `transform`, not Tailwind's `scale-x-*` —
                       those compile to the standalone `scale` property, which
                       composes with GSAP's transform instead of being replaced
                       by it, holding the bar at zero for the whole section. */
                    pinned ? "[transform:scaleX(0)]" : "[transform:scaleX(1)]",
                  )}
                />
              </div>
            </div>

            {/* Desktop: one stage at a time, centre stage. Mirrors the list
                below, which carries the same content for everyone else. */}
            <div
              aria-hidden="true"
              className="relative mt-16 hidden min-h-[18rem] w-full lg:block"
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={active?.id ?? "stage"}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -22 }}
                  transition={{
                    duration: reduced ? 0.01 : DURATION.card,
                    ease: EASE_BRAND,
                  }}
                  className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
                >
                  <span className="block font-mono text-[clamp(4rem,7vw,7rem)] leading-none text-line">
                    {active?.index}
                  </span>
                  <span className="mt-6 block text-section text-ink">
                    {active?.name}
                  </span>
                  <span className="mt-6 block max-w-[44ch] text-lead text-copy">
                    {active?.description}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="mt-16 flex w-full flex-col gap-12 lg:sr-only lg:mt-0">
              {stages.map((stage) => (
                <li key={stage.id} className="flex flex-col items-center text-center">
                  <span className="font-mono text-label tracking-[0.14em] text-action">
                    {stage.index}
                  </span>
                  <h3 className="mt-4 text-sub text-ink">{stage.name}</h3>
                  <p className="mt-4 max-w-[42ch] text-body text-copy">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>

            {/* The closing line lands only once the sequence completes. */}
            <motion.p
              initial={false}
              animate={{ opacity: atEnd ? 1 : 0 }}
              transition={{
                duration: reduced ? 0.01 : DURATION.section,
                ease: EASE_BRAND,
              }}
              className="mt-20 max-w-[30ch] text-center text-sub text-ink"
            >
              {close}
            </motion.p>
          </div>
        </Container>
      </div>
    </section>
  );
}
