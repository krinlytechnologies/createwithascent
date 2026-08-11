"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The cinematic intro. A section in its own right — the homepage is not inside
 * it and is never part of it.
 *
 * The scene contains three things: the sky, and two clouds carrying the brand
 * name. No navigation, no headline, no scroll prompt. The navigation is
 * suppressed by the `intro-locked` class on the document element, released once
 * the curtain begins to open.
 *
 * ## Geometry
 *
 * The section is 200vh with a 100vh sticky child, so the timeline spans scroll
 * 0 → 100vh and the child releases at exactly that point. `#homepage` begins at
 * 200vh and follows in normal flow, so the curtain opens first and the website
 * arrives after — the two are sequential, not simultaneous.
 *
 * Overlapping the two so the page could be uncovered *through* the parting
 * clouds was tried and reverted: after the sticky child releases it still
 * occupies the overlapped region, so it painted over the hero and swallowed its
 * clicks. Any second attempt needs the scene to stop covering the page once the
 * timeline ends. See brand/00-decisions.md.
 */

/**
 * The cloud banks. 1536 × 1024, landscape — sized by width so each reads as a
 * bank spanning the screen rather than a column.
 *
 * `left.png` and `right.png` are currently **byte-identical** (same SHA256), so
 * the right one is mirrored to make the pair face each other. If a genuinely
 * distinct right-hand bank is supplied, drop `mirrored` from the right cloud.
 */
const CLOUD = { width: 1536, height: 1024 } as const;

/**
 * The mark revealed between the words as the banks close.
 *
 * Served from `/assets/…` — `public/` is the folder on disk, not part of the
 * URL, so a `public/`-prefixed src 404s.
 *
 * The artwork is 1536 × 1024 with **19% transparent padding on each side**:
 * the visible mark is only 963 × 909 inside it. `contentWidth` carries that
 * ratio so the clouds converge to the mark you can see rather than to the empty
 * canvas around it — otherwise the gap looks far too wide for the logo in it.
 */
const LOGO = {
  src: "/assets/Ascent Black PNG.png",
  width: 1536,
  height: 1024,
  contentWidth: 963 / 1536,
} as const;

/**
 * The wordmark is **baked into the artwork** — `left.png` carries "Ascent" and
 * `right.png` carries "Studios", each spanning almost the full width of its
 * image (measured: lettering runs 1.6%–97.5% and 1.8%–98.6%).
 *
 * So there is no live HTML wordmark. An earlier build overlaid one, which
 * simply printed the words a second time in navy on top of the artwork.
 *
 * The consequence is that the lockup can no longer be measured from the DOM:
 * the words are pixels. Convergence is instead derived from the cloud boxes and
 * the mark between them.
 */

/** Clearance either side of the mark, as a fraction of its visible width. */
const LOGO_CLEARANCE = 0.1;

/** Fraction of each cloud on screen before the visitor scrolls. */
const VISIBLE_AT_REST = 0.2;

/** How far the curtain parts, as a fraction of viewport width. */
const OPEN_GAP = 0.7;

/** How much of the distance to the lockup is covered by the first move. */
const APPROACH_FRACTION = 0.55;

/**
 * Timeline is 100 units, so positions read as percentages of the section.
 * `CUE.curtain = 50` is locked by direction.
 */
const CUE = {
  approach: 0,
  close: 30,
  hold: 45,
  curtain: 50,
  settle: 90,
} as const;

type CloudProps = {
  side: "left" | "right";
  src: string;
  cloudRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * A cloud bank, carrying its half of the wordmark in the artwork itself.
 *
 * Neither image is mirrored. `right.png` already reads the correct way round;
 * flipping it reversed "Studios".
 */
function Cloud({ side, src, cloudRef }: CloudProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center">
      <div
        ref={cloudRef}
        className={cn(
          "will-change-transform",
          /* Start positions must be written to `transform`, not Tailwind's
             `translate-x-*` utilities: Tailwind v4 emits those as the
             standalone `translate` property, which CSS applies *before*
             `transform`, so it would compose with GSAP rather than be replaced
             by it and leave every cloud permanently offset. */
          side === "left"
            ? "[transform:translateX(-57vw)]"
            : "[transform:translateX(57vw)]",
        )}
      >
        <div
          className={cn(
            "cloud-breathe",
            side === "right" && "cloud-breathe-offset",
          )}
        >
          {/* Width-driven. Narrow enough that both words and the mark between
              them fit the viewport without the lettering being clipped —
              measured, not guessed. */}
          {/* Narrower on phones — at 40vw the lockup ran edge to edge with no
              margin at all. */}
          <div
            data-cloud-box
            className="relative aspect-[3/2] w-[36vw] md:w-[40vw]"
          >
            <Image
              src={src}
              alt=""
              width={CLOUD.width}
              height={CLOUD.height}
              priority
              sizes="(max-width: 768px) 36vw, 40vw"
              className="size-full object-contain select-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function IntroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftCloudRef = useRef<HTMLDivElement>(null);
  const rightCloudRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  /**
   * The sky is the world, not a layer. It keeps moving whether the visitor
   * scrolls, stops, or scrolls back, and it is never scrubbed or seeked.
   *
   * Browsers pause muted autoplaying video for reasons of their own — offscreen
   * throttling, tab switches, power saving, or a refused autoplay attempt. This
   * resumes playback whenever that happens while the page is visible. It never
   * seeks, so playback continues from where it was rather than restarting.
   *
   * The one deliberate exception is `prefers-reduced-motion`, where the video
   * stays paused. See brand/00-decisions.md.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resume = () => {
      if (reduceMotion.matches) return;
      if (document.visibilityState !== "visible") return;
      if (!video.paused) return;
      /* A refused autoplay leaves the poster in place, which is the correct
         fallback — a rejection needs no handling beyond not throwing. */
      void video.play().catch(() => undefined);
    };

    video.addEventListener("pause", resume);
    video.addEventListener("canplay", resume);
    document.addEventListener("visibilitychange", resume);
    resume();

    return () => {
      video.removeEventListener("pause", resume);
      video.removeEventListener("canplay", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftCloudRef.current;
    const right = rightCloudRef.current;
    const logo = logoRef.current;
    if (!section || !left || !right || !logo) return;

    const root = document.documentElement;

    /**
     * Every cloud position is derived from what is actually on screen — never
     * tuned by eye, and never a fixed `vw` value.
     *
     * Fixed values only work at one viewport. The lockup is a fixed number of
     * *pixels* wide, so on a narrow screen the clouds must sit much further out
     * for it to centre, which left the earlier hand-picked curtain value
     * (`±40vw`) inside the converge position on mobile — the curtain had
     * nowhere to open into, and the approach overshot past the lockup and came
     * back, briefly overlapping the two words.
     *
     * Re-measured on every ScrollTrigger refresh, so it survives resize,
     * orientation change and a change of artwork.
     */
    const geometry = () => {
      const viewport = window.innerWidth;
      const box = left.querySelector<HTMLElement>("[data-cloud-box]");
      const mark = logoRef.current?.querySelector("img");

      const cloudWidth =
        box?.getBoundingClientRect().width ?? viewport * 0.4;

      /* The rendered element includes the artwork's transparent margin. Only
         the visible mark should push the clouds apart — they can pass under
         the empty part quite safely. */
      const markWidth =
        (mark?.getBoundingClientRect().width ?? 0) * LOGO.contentWidth;

      /* At the hold, each bank's inner edge stops just clear of the mark, so
         the scene reads Ascent · mark · Studios with the mark never overlapped.
         Symmetrical, because both words are baked at the same scale. */
      const convergeL =
        -(markWidth / 2 + markWidth * LOGO_CLEARANCE) - cloudWidth / 2;

      /* At rest, a fifth of each cloud sits inside the viewport edge. */
      const startL = -viewport / 2 - cloudWidth * (0.5 - VISIBLE_AT_REST);

      /* The curtain is defined by the gap it opens, so it always opens however
         far the lockup had to push the banks out. */
      const openL = -(viewport * OPEN_GAP) / 2 - cloudWidth / 2;

      /* Partway in, never past the lockup. */
      const approachL = startL + (convergeL - startL) * APPROACH_FRACTION;

      return {
        startL, startR: -startL,
        approachL, approachR: -approachL,
        convergeL, convergeR: -convergeL,
        openL, openR: -openL,
      };
    };

    /** The navigation belongs to the homepage, not to the scene. */
    const lockNav = (locked: boolean) =>
      root.classList.toggle("intro-locked", locked);

    /**
     * The scene runs under reduced motion too, and deliberately.
     *
     * Everything here is scrub-linked: the clouds move in direct proportion to
     * the visitor's own scrolling and stop the instant they stop. Nothing plays
     * on its own. What `prefers-reduced-motion` disables is the *autonomous*
     * motion — the idle breathe (killed by the global rule in globals.css) and
     * the video (paused in the effect above).
     *
     * The earlier behaviour cut the whole timeline and left two clouds parked
     * at the edges, which reads as a broken page rather than as an
     * accommodation — and it is what headless Chrome and any Windows machine
     * with animation effects switched off will see.
     */
    const ctx = gsap.context(() => {
      lockNav(true);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          /* Released as the curtain opens, and re-applied if the visitor
             scrolls back up into the scene. */
          onUpdate: (self) => lockNav(self.progress < CUE.curtain / 100),
        },
      });

      /* Positions are functions, not numbers, so `invalidateOnRefresh` has
         something to recompute. Baking in a width would leave the composition
         wrong after any resize or orientation change. */

      /* Approach — the drift inward. Slow enough to read as air moving rather
         than objects sliding. */
      timeline
        .fromTo(
          left,
          { x: () => geometry().startL, rotate: -2, force3D: true },
          { x: () => geometry().approachL, rotate: -1, duration: CUE.close },
          CUE.approach,
        )
        .fromTo(
          right,
          { x: () => geometry().startR, rotate: 2, force3D: true },
          { x: () => geometry().approachR, rotate: 1, duration: CUE.close },
          CUE.approach,
        );

      /* The lockup completes and holds. This pause is the emotional peak — the
         brand becoming one word — not the collision of two clouds. */
      timeline
        .to(
          left,
          {
            x: () => geometry().convergeL,
            rotate: 0,
            duration: CUE.hold - CUE.close,
          },
          CUE.close,
        )
        .to(
          right,
          {
            x: () => geometry().convergeR,
            rotate: 0,
            duration: CUE.hold - CUE.close,
          },
          CUE.close,
        )
        .to({}, { duration: CUE.curtain - CUE.hold }, CUE.hold);

      /* The mark arrives with the close, in the space the two words leave for
         it, and holds through the pause. This is the moment the brand is
         complete: ASCENT · mark · STUDIOS. */
      timeline.fromTo(
        logo,
        { opacity: 0, scale: 0.94, force3D: true },
        { opacity: 1, scale: 1, duration: CUE.hold - CUE.close },
        CUE.close,
      );

      /* It leaves as the curtain opens — the scene is handing over. */
      timeline.to(
        logo,
        { opacity: 0, duration: (CUE.settle - CUE.curtain) / 2 },
        CUE.curtain,
      );

      /* The curtain. The clouds are never faded — they keep drifting to the
         edges and stay there. */
      timeline
        .to(
          left,
          { x: () => geometry().openL, duration: CUE.settle - CUE.curtain },
          CUE.curtain,
        )
        .to(
          right,
          { x: () => geometry().openR, duration: CUE.settle - CUE.curtain },
          CUE.curtain,
        );

    }, section);

    return () => {
      ctx.revert();
      root.classList.remove("intro-locked");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-label="Introduction"
      className="relative h-[200vh]"
    >
      {/* Nothing in the scene is interactive, so it never takes pointer events
          away from the page. */}
      <div className="pointer-events-none sticky top-0 h-screen w-full overflow-hidden">
        {/* The sky. Static in position throughout — the calm everything else
            moves against.
            One source: the AV1, WebM and poster variants were removed from the
            project, so the references went with them. If smaller encodes are
            reinstated later, add them as `<source>` elements *above* the mp4 —
            the browser takes the first it can decode — and restore `poster`. */}
        <div className="sky-fallback absolute inset-0 z-[5]">
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/assets/sky.mp4" type="video/mp4" />
          </video>

          {/* Softens the blue without blurring the footage. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(250,248,245,0.18)]"
          />
        </div>

        <Cloud side="left" src="/assets/left.png" cloudRef={leftCloudRef} />
        <Cloud side="right" src="/assets/right.png" cloudRef={rightCloudRef} />

        {/* Above the banks, so it stays visible where they overlap. */}
        <div
          ref={logoRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-50 grid place-items-center opacity-0"
        >
          <Image
            src={LOGO.src}
            alt=""
            width={LOGO.width}
            height={LOGO.height}
            priority
            sizes="(max-width: 768px) 26vw, 17vw"
            /* Sized by width, since the artwork is landscape. The visible mark
               is ~63% of this — see LOGO.contentWidth. */
            className="h-auto w-[clamp(96px,min(17vw,24vh),300px)] select-none"
          />
        </div>
      </div>
    </section>
  );
}
