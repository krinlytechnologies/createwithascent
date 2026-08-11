"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { ABOUT } from "@/lib/about-content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The transformation: scattered points resolve into a network, then into a
 * pipeline, then into growth.
 *
 * Scrubbed by scroll, so nothing plays on its own — the visitor drives it. The
 * drawing is one inline SVG: points fade, links draw via `stroke-dashoffset`,
 * and a pipeline sweeps. No canvas and no particle library, which is what keeps
 * it inside the frame budget.
 *
 * It carries no information the words do not, so losing it to reduced motion
 * costs nothing: there, the finished state is simply shown.
 */

/** Scattered origin points, resolving into a left-to-right pipeline. */
const NODES = [
  { x: 60, y: 120 },
  { x: 150, y: 52 },
  { x: 236, y: 158 },
  { x: 330, y: 74 },
  { x: 424, y: 140 },
  { x: 520, y: 60 },
  { x: 612, y: 132 },
  { x: 706, y: 78 },
  { x: 800, y: 148 },
  { x: 890, y: 96 },
] as const;

const LINKS: ReadonlyArray<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [7, 8], [8, 9],
  [1, 3], [3, 5], [5, 7], [2, 4], [4, 6],
];

export function TransitionSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointsRef = useRef<SVGGElement>(null);
  const linksRef = useRef<SVGGElement>(null);
  const pipeRef = useRef<SVGPathElement>(null);
  const stagesRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const points = gsap.utils.toArray<SVGCircleElement>("circle", pointsRef.current ?? undefined);
      const links = gsap.utils.toArray<SVGLineElement>("line", linksRef.current ?? undefined);
      const stages = gsap.utils.toArray<HTMLElement>("li", stagesRef.current ?? undefined);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 55%",
          scrub: true,
        },
      });

      /* Particles arrive. */
      timeline.fromTo(
        points,
        { opacity: 0, scale: 0.4, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 22, stagger: 0.8 },
        0,
      );

      /* Network forms — the links draw themselves. */
      timeline.fromTo(
        links,
        { strokeDashoffset: 220 },
        { strokeDashoffset: 0, duration: 34, stagger: 0.9 },
        20,
      );

      /* Pipeline sweeps through, and growth follows. */
      timeline.fromTo(
        pipeRef.current,
        { strokeDashoffset: 1100, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 34 },
        52,
      );

      /* The caption keeps pace with the drawing. */
      stages.forEach((stage, index) => {
        timeline.to(
          stage,
          { opacity: 1, duration: 6 },
          index * (86 / stages.length),
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="transition-heading"
      className="relative overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <Container>
        <h2 id="transition-heading" className="sr-only">
          {ABOUT.transition.caption}
        </h2>

        <div className="relative">
          <svg
            viewBox="0 0 950 210"
            aria-hidden="true"
            className="w-full"
            role="presentation"
          >
            <g ref={linksRef} stroke="var(--color-brand)" strokeWidth="1" opacity="0.45">
              {LINKS.map(([a, b]) => {
                const from = NODES[a];
                const to = NODES[b];
                if (!from || !to) return null;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    strokeDasharray="220"
                    strokeDashoffset="220"
                  />
                );
              })}
            </g>

            <path
              ref={pipeRef}
              d="M60 120 C 220 20, 380 200, 520 100 S 800 40, 890 96"
              fill="none"
              stroke="var(--color-action)"
              strokeWidth="2"
              strokeDasharray="1100"
              strokeDashoffset="1100"
              opacity="0"
            />

            <g ref={pointsRef} fill="var(--color-action)">
              {NODES.map((node) => (
                <circle
                  key={`${node.x}-${node.y}`}
                  cx={node.x}
                  cy={node.y}
                  r="4"
                  opacity="0"
                />
              ))}
            </g>
          </svg>

          <ol
            ref={stagesRef}
            aria-hidden="true"
            className="mt-10 flex flex-wrap justify-between gap-x-6 gap-y-3"
          >
            {ABOUT.transition.stages.map((stage) => (
              <li
                key={stage}
                className={cn(
                  "font-mono text-label tracking-[0.14em] text-muted uppercase",
                  "opacity-25 motion-reduce:opacity-100",
                )}
              >
                {stage}
              </li>
            ))}
          </ol>

          <p className="mt-8 text-center text-sub text-ink">
            {ABOUT.transition.caption}
          </p>
        </div>
      </Container>
    </section>
  );
}
