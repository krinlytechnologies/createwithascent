"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type UseScrollStagesOptions = {
  /** Wrapper that defines the scroll distance. */
  sectionRef: RefObject<HTMLElement | null>;
  /** Element held in place while the content progresses. */
  pinRef: RefObject<HTMLElement | null>;
  stageCount: number;
  /**
   * Scroll distance as a multiple of viewport height. Capped at 2 by
   * brand/04-motion.md — beyond that a pin stops being storytelling.
   */
  viewportsOfScroll?: number;
  /**
   * Called on every scrub tick with 0–1 progress. Use it to drive transforms
   * directly through GSAP rather than through React state.
   */
  onProgress?: (progress: number) => void;
};

type ScrollStagesState = {
  /** Index of the stage currently being introduced. */
  activeIndex: number;
  /**
   * False until the pinned experience is confirmed running. While false every
   * stage renders as reached, so the static fallback is complete — which is
   * what mobile, reduced motion and no-JS all receive.
   */
  pinned: boolean;
};

/**
 * Drives a pinned, scrub-linked sequence of stages.
 *
 * Pinning is only ever active at 1024px and above with motion allowed. Below
 * that the section renders as ordinary stacked content, per the pin constraints
 * in brand/04-motion.md.
 *
 * React state changes once per stage — a handful of renders for the whole
 * section. Per-frame work is handed to `onProgress`, which should write
 * transforms via GSAP so it never touches the React tree.
 */
export function useScrollStages({
  sectionRef,
  pinRef,
  stageCount,
  viewportsOfScroll = 2,
  onProgress,
}: UseScrollStagesOptions): ScrollStagesState {
  const [activeIndex, setActiveIndex] = useState(stageCount - 1);
  const [pinned, setPinned] = useState(false);

  /* Held in a ref so a changing callback identity never rebuilds the trigger. */
  const progressRef = useRef(onProgress);
  progressRef.current = onProgress;

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const distance = Math.min(viewportsOfScroll, 2) * 100;
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        setPinned(true);
        setActiveIndex(0);
        progressRef.current?.(0);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${distance}%`,
          pin,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current?.(self.progress);

            /* Fast scrolling lands on the end state, never a half-drawn frame. */
            const next = Math.min(
              stageCount - 1,
              Math.floor(self.progress * stageCount),
            );
            setActiveIndex((current) => (current === next ? current : next));
          },
        });

        return () => {
          trigger.kill();
          setPinned(false);
          setActiveIndex(stageCount - 1);
          progressRef.current?.(1);
        };
      },
    );

    return () => mm.revert();
  }, [sectionRef, pinRef, stageCount, viewportsOfScroll]);

  return { activeIndex, pinned };
}
