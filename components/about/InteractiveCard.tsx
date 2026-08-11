"use client";

import { useCallback, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type InteractiveCardProps = {
  children: ReactNode;
  /** Adds a small pull toward the cursor on top of the tilt. */
  magnetic?: boolean;
  className?: string;
};

/** Caps from brand/09-blueprint-system.md. Beyond these it reads as a gimmick. */
const MAX_TILT = 3;
const MAX_PULL = 6;

/**
 * A glass panel that tilts toward the pointer.
 *
 * Constraints that keep it premium rather than novelty:
 *
 *  - **3° maximum** on each axis, with a long 1600px perspective — a described
 *    object, not a staged one.
 *  - Written once per frame through rAF, `transform` only.
 *  - **Off on touch**, where there is no cursor and hover emulation is a bug.
 *  - **Off under reduced motion.**
 *  - `will-change` is set on enter and cleared on leave, never left on.
 */
export function InteractiveCard({
  children,
  magnetic = false,
  className,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const target = useRef({ rx: 0, ry: 0, x: 0, y: 0 });

  const allowed = useCallback(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const render = useCallback(() => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    const { rx, ry, x, y } = target.current;
    el.style.transform = `perspective(1600px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  }, []);

  const schedule = useCallback(() => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(render);
  }, [render]);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!allowed()) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (event.clientX - r.left) / r.width - 0.5;
      const py = (event.clientY - r.top) / r.height - 0.5;
      target.current = {
        ry: px * MAX_TILT * 2,
        rx: -py * MAX_TILT * 2,
        x: magnetic ? px * MAX_PULL * 2 : 0,
        y: magnetic ? py * MAX_PULL * 2 : 0,
      };
      schedule();
    },
    [allowed, magnetic, schedule],
  );

  const onEnter = useCallback(() => {
    if (!allowed()) return;
    if (ref.current) ref.current.style.willChange = "transform";
  }, [allowed]);

  const onLeave = useCallback(() => {
    target.current = { rx: 0, ry: 0, x: 0, y: 0 };
    schedule();
    const el = ref.current;
    if (el) window.setTimeout(() => (el.style.willChange = "auto"), 400);
  }, [schedule]);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={cn(
        "group relative isolate overflow-hidden rounded-card",
        "border border-white/70 bg-surface/60 backdrop-blur-xl",
        "shadow-card transition-[transform,box-shadow,border-color] duration-300",
        "ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/40 hover:shadow-cta",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      {/* The accent that appears under the pointer. Sits behind the content and
          never affects contrast of the text above it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgb(5_151_255/0.14),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}
