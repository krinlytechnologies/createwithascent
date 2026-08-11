import { ABOUT } from "@/lib/about-content";

/**
 * The vocabulary strip.
 *
 * Very slow, very quiet, and it pauses on hover — the conditions the motion
 * system attaches to a marquee. The track is duplicated so the 50% translate
 * loops without a seam, and the copy is hidden from assistive technology so the
 * list is not announced twice.
 *
 * Decorative by definition, so it stops entirely under reduced motion and
 * simply reads as a static line of words.
 */
export function Marquee() {
  const words = [...ABOUT.marquee, ...ABOUT.marquee];

  return (
    <div
      aria-hidden="true"
      className="group relative overflow-hidden border-y border-line py-6 select-none"
    >
      <div className="marquee-track group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-10 pr-10 font-mono text-label tracking-[0.16em] text-muted uppercase"
          >
            {word}
            <span className="size-1 rounded-full bg-brand" />
          </span>
        ))}
      </div>

      {/* Feathered edges, so words enter and leave rather than being cut. */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
    </div>
  );
}
