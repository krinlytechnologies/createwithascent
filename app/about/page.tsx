import type { Metadata } from "next";

import { ABOUT } from "@/lib/about-content";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Ambient } from "@/components/about/Ambient";
import { InteractiveCard } from "@/components/about/InteractiveCard";
import { Marquee } from "@/components/about/Marquee";
import { OperatingLoop } from "@/components/about/OperatingLoop";
import { Principles } from "@/components/about/Principles";
import { TransitionSequence } from "@/components/about/TransitionSequence";

export const metadata: Metadata = {
  title: ABOUT.meta.title,
  description: ABOUT.meta.description,
};

/**
 * About — an immersive narrative.
 *
 * Copy is roughly half its previous length; motion carries what the paragraphs
 * used to. Every section holds one idea and reads completely with all motion
 * removed.
 *
 * The whole page is CSS and SVG: mist is layered gradients, the network and the
 * loop are inline SVG, the tilt is a transform. No canvas, no WebGL, no
 * particle library — which is what keeps it inside the 60fps floor.
 */
export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-heading"
        className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-line"
      >
        <Ambient grid />

        <Container className="relative">
          <Reveal>
            <SectionLabel>{ABOUT.hero.label}</SectionLabel>
          </Reveal>

          <h1
            id="about-heading"
            className="mt-10 max-w-[15ch] text-hero text-ink"
          >
            {ABOUT.hero.lines.map((line, index) => (
              <LineReveal key={line} step={index}>
                {line}
              </LineReveal>
            ))}
          </h1>

          <Reveal level="component" className="mt-10">
            <p className="max-w-[38ch] text-lead text-copy">
              {ABOUT.hero.support}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── We exist ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="exist-heading"
        className="relative overflow-hidden py-32 sm:py-40"
      >
        <Ambient />

        <Container className="relative">
          <Reveal>
            <SectionLabel>{ABOUT.exist.label}</SectionLabel>
          </Reveal>

          <h2
            id="exist-heading"
            className="mt-10 max-w-[16ch] text-section text-ink"
          >
            {ABOUT.exist.lines.map((line, index) => (
              <LineReveal key={line} step={index}>
                {line}
              </LineReveal>
            ))}
          </h2>

          <ol className="mt-16 max-w-[46ch]">
            {ABOUT.exist.beats.map((beat, index) => (
              <Reveal
                key={beat}
                as="li"
                level="component"
                className="border-t border-line py-6 text-lead text-copy last:text-ink"
              >
                <span className="mr-4 font-mono text-label tracking-[0.14em] text-action">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {beat}
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <Marquee />

      <TransitionSequence />

      {/* ── What we believe ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="believe-heading"
        className="relative overflow-hidden border-t border-line py-28 sm:py-36"
      >
        <Ambient />

        <Container className="relative">
          <Reveal>
            <SectionLabel>{ABOUT.beliefs.label}</SectionLabel>
          </Reveal>

          <Reveal level="section" className="mt-8">
            <h2
              id="believe-heading"
              className="max-w-[16ch] text-section text-ink"
            >
              {ABOUT.beliefs.heading}
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.beliefs.items.map((belief) => (
              <Reveal key={belief.id} as="li" level="component">
                <InteractiveCard className="h-full p-8">
                  <h3 className="text-sub text-ink">{belief.name}</h3>
                  <p className="mt-4 text-body text-copy">{belief.body}</p>
                </InteractiveCard>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <Principles />

      <OperatingLoop />

      {/* ── Built for ────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="built-heading"
        className="relative overflow-hidden border-t border-line py-28 sm:py-36"
      >
        <Ambient grid />

        <Container className="relative">
          <Reveal>
            <SectionLabel>{ABOUT.builtFor.label}</SectionLabel>
          </Reveal>

          <Reveal level="section" className="mt-8">
            <h2
              id="built-heading"
              className="max-w-[14ch] text-section text-ink"
            >
              {ABOUT.builtFor.heading}
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-6 sm:grid-cols-2">
            {ABOUT.builtFor.items.map((item, index) => (
              <Reveal key={item.id} as="li" level="component">
                <InteractiveCard
                  magnetic
                  className={
                    index % 2 === 1
                      ? "h-full p-8 lg:translate-y-6"
                      : "h-full p-8"
                  }
                >
                  <h3 className="text-sub text-ink">{item.name}</h3>
                  <p className="mt-4 text-body text-copy">{item.body}</p>
                </InteractiveCard>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Closing ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-cta-heading"
        className="relative flex min-h-[85vh] items-center overflow-hidden border-t border-line"
      >
        <Ambient grid />

        <Container width="editorial" className="relative">
          <div className="flex flex-col items-center text-center">
            <Reveal level="hero">
              <h2
                id="about-cta-heading"
                className="max-w-[16ch] text-section text-ink"
              >
                {ABOUT.cta.heading}
              </h2>
            </Reveal>

            <Reveal level="component" className="mt-8">
              <p className="max-w-[52ch] text-lead text-copy">
                {ABOUT.cta.body}
              </p>
            </Reveal>

            <Reveal level="component" className="mt-12">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  href={CTA.primary.href}
                  external={CTA.primary.external}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {CTA.primary.label}
                </Button>
                <Button
                  href={CTA.secondary.href}
                  external={CTA.secondary.external}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {CTA.secondary.label}
                </Button>
              </div>
            </Reveal>

            <Reveal level="component" className="mt-12">
              <p className="text-sub text-ink">{ABOUT.cta.close}</p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
