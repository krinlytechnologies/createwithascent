import type { Metadata } from "next";

import { ABOUT } from "@/lib/about-content";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ConnectWithUs } from "@/components/shared/ConnectWithUs";

export const metadata: Metadata = {
  title: ABOUT.meta.title,
  description: ABOUT.meta.description,
};

/**
 * About — why should I trust Ascent?
 *
 * Philosophy, not company history. Every section carries a different rhythm:
 * a belief opening, a single reading column, alternating statements, a
 * preference list, a worked case, a typographic close, and a two-sided fit.
 */
export default function AboutPage() {
  return (
    <>
      {/* ── Opening: a belief, not the company ─────────────────────────── */}
      <section
        aria-labelledby="about-heading"
        className="border-b border-line pt-40 pb-24 sm:pt-48 sm:pb-32"
      >
        <Container>
          <Reveal>
            <SectionLabel>{ABOUT.hero.label}</SectionLabel>
          </Reveal>

          <h1
            id="about-heading"
            className="mt-10 max-w-[16ch] text-hero text-ink"
          >
            <LineReveal>{ABOUT.hero.heading}</LineReveal>
          </h1>

          <Reveal level="component" className="mt-10">
            <p className="max-w-[52ch] text-lead text-copy">
              {ABOUT.hero.body}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Our Story: one narrow reading column, label held in the margin ── */}
      <section aria-labelledby="story-heading" className="section-y">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <SectionLabel>{ABOUT.story.label}</SectionLabel>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <h2
                id="story-heading"
                className="max-w-[18ch] text-section text-ink"
              >
                <LineReveal>{ABOUT.story.heading}</LineReveal>
              </h2>

              <Reveal level="component" className="mt-12">
                <div className="flex max-w-reading flex-col gap-7">
                  {ABOUT.story.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-body text-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What We Believe: statements alternating across the spread ───── */}
      <section
        aria-labelledby="believe-heading"
        className="section-y border-t border-line bg-surface"
      >
        <Container>
          <Reveal>
            <SectionLabel>{ABOUT.beliefs.label}</SectionLabel>
          </Reveal>

          <h2
            id="believe-heading"
            className="mt-8 max-w-[20ch] text-section text-ink"
          >
            <LineReveal>{ABOUT.beliefs.heading}</LineReveal>
          </h2>

          <ol className="mt-20 flex flex-col gap-20 sm:gap-24">
            {ABOUT.beliefs.items.map((belief, index) => (
              <Reveal
                key={belief.id}
                as="li"
                className={
                  index % 2 === 0
                    ? "lg:mr-auto lg:max-w-[62%]"
                    : "lg:ml-auto lg:max-w-[62%] lg:text-right"
                }
              >
                <p className="text-sub text-ink">{belief.statement}</p>
                <p
                  className={
                    index % 2 === 0
                      ? "mt-5 max-w-[46ch] text-body text-copy"
                      : "mt-5 max-w-[46ch] text-body text-copy lg:ml-auto"
                  }
                >
                  {belief.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Principles: preference over rejected alternative ────────────── */}
      <section
        aria-labelledby="principles-heading"
        className="section-y border-t border-line"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel>{ABOUT.principles.label}</SectionLabel>
              </Reveal>
              <h2
                id="principles-heading"
                className="mt-8 max-w-[14ch] text-section text-ink"
              >
                <LineReveal>{ABOUT.principles.heading}</LineReveal>
              </h2>
              <Reveal level="component" className="mt-8">
                <p className="max-w-[40ch] text-body text-copy">
                  {ABOUT.principles.intro}
                </p>
              </Reveal>
            </div>

            <ol className="lg:col-span-6 lg:col-start-7">
              {ABOUT.principles.items.map((item) => (
                <Reveal
                  key={item.id}
                  as="li"
                  level="component"
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line py-6 first:border-t-0 first:pt-0"
                >
                  <span className="text-sub text-ink">{item.prefer}</span>
                  <span className="font-mono text-label tracking-[0.14em] text-muted uppercase">
                    over
                  </span>
                  <span className="text-sub text-muted">{item.over}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ── How We Think: a decision, shown rather than described ───────── */}
      <section
        aria-labelledby="thinking-heading"
        className="section-y border-t border-line bg-sand"
      >
        <Container width="editorial">
          <Reveal>
            <SectionLabel tone="muted">{ABOUT.thinking.label}</SectionLabel>
          </Reveal>

          <h2
            id="thinking-heading"
            className="mt-8 max-w-[16ch] text-section text-ink"
          >
            <LineReveal>{ABOUT.thinking.heading}</LineReveal>
          </h2>

          <Reveal level="component" className="mt-8">
            <p className="max-w-[52ch] text-lead text-copy">
              {ABOUT.thinking.intro}
            </p>
          </Reveal>

          <dl className="mt-16">
            {(
              [
                ["Situation", ABOUT.thinking.worked.situation],
                ["The tension", ABOUT.thinking.worked.tension],
                ["Decision", ABOUT.thinking.worked.decision],
                ["Outcome", ABOUT.thinking.worked.outcome],
              ] as const
            ).map(([term, description]) => (
              <Reveal
                key={term}
                level="component"
                className="grid gap-2 border-t border-line-strong py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10"
              >
                <dt className="font-mono text-label tracking-[0.14em] text-muted uppercase">
                  {term}
                </dt>
                <dd className="max-w-[58ch] text-body text-copy">
                  {description}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-12">
            <p className="max-w-[44ch] border-l-2 border-action pl-6 text-sub text-ink">
              {ABOUT.thinking.worked.principle}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Why It Works: the loop, concluded typographically. No diagram —
             Home asserts it, Services explains it, About closes with it. ── */}
      <section
        aria-labelledby="works-heading"
        className="section-y border-t border-line"
      >
        <Container width="editorial">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <SectionLabel>{ABOUT.works.label}</SectionLabel>
            </Reveal>

            <h2
              id="works-heading"
              className="mt-10 max-w-[24ch] text-section text-ink"
            >
              <LineReveal>{ABOUT.works.heading}</LineReveal>
            </h2>

            <Reveal level="component" className="mt-10">
              <p className="max-w-[54ch] text-lead text-copy">
                {ABOUT.works.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Who We Work With: both sides of the qualification ───────────── */}
      <section
        aria-labelledby="audience-heading"
        className="section-y border-t border-line bg-surface"
      >
        <Container>
          <Reveal>
            <SectionLabel>{ABOUT.audience.label}</SectionLabel>
          </Reveal>

          <h2
            id="audience-heading"
            className="mt-8 max-w-[16ch] text-section text-ink"
          >
            <LineReveal>{ABOUT.audience.heading}</LineReveal>
          </h2>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal level="component">
              <ul>
                {ABOUT.audience.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-5 text-sub text-ink first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal level="component">
              <h3 className="text-sub text-muted">
                {ABOUT.audience.notFor.heading}
              </h3>
              <ul className="mt-6">
                {ABOUT.audience.notFor.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-5 text-body text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <ConnectWithUs />
    </>
  );
}
