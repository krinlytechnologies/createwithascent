"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth scrolling.
 *
 * Momentum scroll replaces the browser's native scroll, so it is only safe
 * under the constraints in brand/04-motion.md:
 *
 *  - `lerp` is high enough that motion settles within ~100ms of input stopping.
 *    Exaggerated inertia is prohibited; scrolling must stay responsive.
 *  - Lenis drives the real scroll position rather than a transform, so
 *    find-in-page, keyboard paging (Page Down / Home / End) and focus scrolling
 *    all keep working natively.
 *  - `syncTouch` is off. Touch devices already apply their own momentum and
 *    compounding the two feels wrong on exactly the device founders use most.
 *  - It is disabled entirely under `prefers-reduced-motion`, and the CSS in
 *    styles/globals.css restores native smooth behaviour when the `lenis`
 *    class is absent.
 */
export function SmoothScrollProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    /* Lenis moves the real scroll position, so ScrollTrigger needs no proxy —
       it only needs to recompute in the same frame the position changes,
       otherwise pinned sections lag a frame behind the content. */
    lenis.on("scroll", ScrollTrigger.update);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    /**
     * In-page anchors are handed to Lenis so the jump is smoothed rather than
     * fought. Modified clicks and cross-page links fall through to the browser.
     */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const hash = anchor?.getAttribute("href");
      if (!anchor || !hash?.startsWith("#") || hash.length < 2) return;

      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -96 });
      /* Move focus as well as the viewport, so keyboard users follow the jump. */
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
