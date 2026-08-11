"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ChevronUp } from "lucide-react";
import { useCallback, useRef } from "react";

import { useScrollStages } from "@/hooks/useScrollStages";
import { OPERATING_SYSTEM } from "@/lib/home-content";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const { label, heading, intro, stages, loopSourceIndex } = OPERATING_SYSTEM;

/**
 * §04 — The Personal Brand Operating System.
 *
 * The intellectual centre of the site, and one of only two pinned sections
 * (brand/04-motion.md caps them at two, site-wide).
 *
 * Identity: the type carries the state. A single stage name is set at display
 * scale on the left and swaps as the sequence advances, while the spine on the
 * right holds every stage on screen at once so the relationships stay visible.
 * The return arc draws last — everything before it exists to set up that stroke.
 *
 * Below 1024px, or with reduced motion, the pin never engages and the section
 * renders as ordinary stacked content with every stage reached.
 */
export function OperatingSystem() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  /* Per-frame work bypasses React and writes a transform directly. */
  const onProgress = useCallback((progress: number) => {
    if (!railRef.current) return;
    gsap.set(railRef.current, { scaleY: progress });
  }, []);

  const { activeIndex, pinned } = useScrollStages({
    sectionRef,
    pinRef,
    stageCount: stages.length,
    viewportsOfScroll: 2,
    onProgress,
  });

  const active = stages[activeIndex] ?? stages[0];
  const loopDrawn = activeIndex >= loopSourceIndex;

  return (
    <section
      ref={sectionRef}
      id="operating-system"
      aria-labelledby="os-heading"
      className="border-t border-line"
    >
      <div
        ref={pinRef}
        className="section-y flex items-center lg:min-h-screen lg:py-0"
      >
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* --- Left: the argument, and the active stage at display scale --- */}
            <div className="lg:col-span-5">
              <SectionLabel>{label}</SectionLabel>

              <h2 id="os-heading" className="mt-8 max-w-[14ch] text-sub text-ink">
                {heading}
              </h2>

              <p className="mt-6 max-w-[38ch] text-body text-copy">{intro}</p>

              {/* Amplifies the spine rather than adding to it, so it stays out
                  of the accessibility tree. */}
              <div
                aria-hidden="true"
                className="relative mt-12 hidden min-h-[13rem] border-t border-line pt-10 lg:block"
              >
                <AnimatePresence mode="sync">
                  <motion.div
                    key={active?.id ?? "stage"}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
                    transition={{
                      duration: reduced ? 0.01 : DURATION.card,
                      ease: EASE_BRAND,
                    }}
                    className="absolute inset-x-0 top-10"
                  >
                    <span className="block font-mono text-[clamp(3rem,4vw,4.5rem)] leading-none text-line-strong">
                      {active?.index}
                    </span>
                    <span className="mt-4 block text-sub text-ink">
                      {active?.name}
                    </span>
                    <span className="mt-3 block max-w-[34ch] text-body text-copy">
                      {active?.description}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* --- Right: the spine. Every stage stays on screen at once. --- */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="relative">
                {/* Track and its scrub-driven fill. */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-[5px] w-px bg-line"
                />
                <span
                  ref={railRef}
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 bottom-0 left-[5px] w-px origin-top bg-action",
                    /* Written to `transform`, not Tailwind's `scale-y-*`.
                       Tailwind v4 emits those as the standalone `scale`
                       property, which CSS applies *before* `transform` — so a
                       `scale-y-0` class would multiply against the scrubbed
                       value from GSAP and hold the rail at zero forever. */
                    pinned ? "[transform:scaleY(0)]" : "[transform:scaleY(1)]",
                  )}
                />

                {/* The return path. Drawn last, once optimisation is reached. */}
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={{
                    opacity: !pinned || loopDrawn ? 1 : 0,
                    scaleX: !pinned || loopDrawn ? 1 : 0.7,
                  }}
                  transition={{
                    duration: reduced ? 0.01 : DURATION.section,
                    ease: EASE_BRAND,
                  }}
                  className="absolute top-[25%] -right-6 hidden h-[50%] w-6 origin-right rounded-r-full border-y border-r border-action/40 lg:block"
                >
                  <ChevronUp className="absolute -top-2 -left-[7px] size-3.5 text-action" />
                </motion.span>

                <ol className="grid gap-8 lg:h-[30rem] lg:grid-rows-6 lg:gap-0">
                  {stages.map((stage, index) => {
                    const reached = !pinned || index <= activeIndex;
                    const isCurrent = pinned && index === activeIndex;

                    return (
                      <li
                        key={stage.id}
                        aria-current={isCurrent ? "step" : undefined}
                        className="flex items-start gap-5 lg:items-center"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-2 size-[11px] shrink-0 rounded-full border transition-colors duration-300 lg:mt-0",
                            reached
                              ? "border-action bg-action"
                              : "border-line-strong bg-canvas",
                          )}
                        />

                        <div className="min-w-0">
                          <h3
                            className={cn(
                              "flex items-baseline gap-3 text-lg font-semibold tracking-[-0.015em] transition-colors duration-300 sm:text-xl",
                              reached ? "text-ink" : "text-muted",
                            )}
                          >
                            <span className="font-mono text-label tracking-[0.14em] text-muted">
                              {stage.index}
                            </span>
                            {stage.name}
                          </h3>

                          {/* Present for everyone; on large screens the left
                              panel shows it visually instead. */}
                          <p className="mt-2 max-w-[42ch] text-caption text-muted lg:sr-only">
                            {stage.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
