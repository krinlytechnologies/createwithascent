import type { Metadata } from "next";

import { SERVICES } from "@/lib/services-content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ConnectWithUs } from "@/components/shared/ConnectWithUs";

export const metadata: Metadata = {
  title: SERVICES.meta.title,
  description: SERVICES.meta.description,
};

/**
 * Services — opening a blueprint.
 *
 * Each pillar takes a full section of its own, alternating side so the page
 * reads as a sequence of spreads rather than a stack of matching blocks. No
 * packages, no pricing cards, no boxes.
 *
 * The page closes on the loop, which is where the mechanism is *explained* —
 * Home asserts it, About concludes with it.
 */
export default function ServicesPage() {
  return (
    <>
      {/* ── Opening ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="services-heading"
        className="border-b border-line pt-40 pb-24 sm:pt-48 sm:pb-32"
      >
        <Container>
          <Reveal>
            <SectionLabel>{SERVICES.hero.label}</SectionLabel>
          </Reveal>

          <h1
            id="services-heading"
            className="mt-10 max-w-[14ch] text-hero text-ink"
          >
            <LineReveal>{SERVICES.hero.heading}</LineReveal>
          </h1>

          <Reveal level="component" className="mt-10">
            <p className="max-w-[58ch] text-lead text-copy">
              {SERVICES.hero.body}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── The three pillars, one section each, alternating ─────────────── */}
      {SERVICES.pillars.map((pillar, index) => {
        const flipped = index % 2 === 1;

        return (
          <section
            key={pillar.id}
            id={pillar.id}
            aria-labelledby={`${pillar.id}-heading`}
            className={cn(
              "section-y border-t border-line",
              index === 1 && "bg-surface",
              index === 2 && "bg-sand",
            )}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Statement side */}
                <div
                  className={cn(
                    "lg:col-span-5",
                    flipped ? "lg:order-2 lg:col-start-8" : "lg:col-start-1",
                  )}
                >
                  <div className="lg:sticky lg:top-32">
                    <span className="font-mono text-[clamp(3rem,5vw,5rem)] leading-none text-line-strong">
                      {pillar.index}
                    </span>

                    <h2
                      id={`${pillar.id}-heading`}
                      className="mt-6 max-w-[12ch] text-section text-ink"
                    >
                      <LineReveal>{pillar.name}</LineReveal>
                    </h2>

                    <Reveal level="component" className="mt-8">
                      <p className="max-w-[38ch] text-lead text-copy">
                        {pillar.outcome}
                      </p>
                    </Reveal>
                  </div>
                </div>

                {/* Substance side */}
                <div
                  className={cn(
                    "lg:col-span-6",
                    flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
                  )}
                >
                  <Reveal level="component">
                    <h3 className="font-mono text-label tracking-[0.14em] text-muted uppercase">
                      Why it exists
                    </h3>
                    <p className="mt-5 max-w-[52ch] text-body text-copy">
                      {pillar.why}
                    </p>
                  </Reveal>

                  <Reveal level="component" className="mt-14">
                    <h3 className="font-mono text-label tracking-[0.14em] text-muted uppercase">
                      What it includes
                    </h3>
                    <ul className="mt-5">
                      {pillar.includes.map((item) => (
                        <li
                          key={item}
                          className="border-t border-line py-4 text-body text-copy first:border-t-0"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {/* The sentence that does the most work in each pillar. */}
                  <Reveal level="component" className="mt-10">
                    <p className="max-w-[52ch] border-l-2 border-action pl-6 text-body text-ink">
                      {pillar.note}
                    </p>
                  </Reveal>

                  <Reveal level="component" className="mt-14">
                    <h3 className="font-mono text-label tracking-[0.14em] text-muted uppercase">
                      How it connects
                    </h3>
                    <p className="mt-5 max-w-[52ch] text-body text-copy">
                      {pillar.connects}
                    </p>
                  </Reveal>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ── The loop, explained ─────────────────────────────────────────── */}
      <section
        aria-labelledby="loop-heading"
        className="section-y border-t border-line"
      >
        <Container>
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <SectionLabel>{SERVICES.loop.label}</SectionLabel>
            </Reveal>

            <h2
              id="loop-heading"
              className="mt-10 max-w-[20ch] text-section text-ink"
            >
              <LineReveal>{SERVICES.loop.heading}</LineReveal>
            </h2>

            <Reveal level="component" className="mt-10">
              <p className="max-w-[56ch] text-lead text-copy">
                {SERVICES.loop.body}
              </p>
            </Reveal>
          </div>

          <ol className="mt-20 grid gap-px overflow-hidden rounded-none border border-line bg-line md:grid-cols-4">
            {SERVICES.loop.stages.map((stage) => (
              <Reveal
                key={stage.id}
                as="li"
                level="component"
                className="bg-canvas p-8"
              >
                <span className="font-mono text-label tracking-[0.14em] text-action">
                  {stage.index}
                </span>
                <h3 className="mt-4 text-sub text-ink">{stage.name}</h3>
                <p className="mt-2 text-caption text-muted">{stage.role}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Fit ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="fit-heading"
        className="section-y border-t border-line bg-surface"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel>{SERVICES.fit.label}</SectionLabel>
              </Reveal>
              <h2
                id="fit-heading"
                className="mt-8 max-w-[12ch] text-section text-ink"
              >
                <LineReveal>{SERVICES.fit.heading}</LineReveal>
              </h2>
            </div>

            <Reveal level="component" className="self-end lg:col-span-6 lg:col-start-7">
              <p className="max-w-[50ch] text-body text-copy">
                {SERVICES.fit.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <ConnectWithUs />
    </>
  );
}
