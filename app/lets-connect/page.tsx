import type { Metadata } from "next";

import { CTA, SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Let's Connect",
  description:
    "Book a strategy call with Ascent Studios, or send a WhatsApp message. Thirty minutes, no pitch.",
};

/**
 * Let's Connect — a conversation, not a form.
 *
 * No form at all, in fact: no budget selector, no enquiry dropdown, no fields.
 * Three channels and an honest account of what happens next.
 *
 * The page carries its own closing rather than the shared Connect block —
 * appending a "get in touch" section to the contact page would be absurd.
 */
export default function LetsConnectPage() {
  const expectations = [
    { term: "How long", detail: "Thirty minutes." },
    { term: "Who's on it", detail: "The person who would run your strategy. Not a salesperson." },
    {
      term: "What we cover",
      detail:
        "Your positioning, what you are publishing today, and where the demand is actually meant to come from.",
    },
    {
      term: "What it isn't",
      detail:
        "A pitch. If an operating system is not the right call for your business, we will say so on the call.",
    },
  ] as const;

  return (
    <>
      <section
        aria-labelledby="connect-heading"
        className="border-b border-line pt-40 pb-24 sm:pt-48 sm:pb-32"
      >
        <Container>
          <Reveal>
            <SectionLabel>Let&rsquo;s Connect</SectionLabel>
          </Reveal>

          <h1
            id="connect-heading"
            className="mt-10 max-w-[14ch] text-hero text-ink"
          >
            <LineReveal>Love our work?</LineReveal>
          </h1>

          <Reveal level="component" className="mt-10">
            <p className="max-w-[50ch] text-lead text-copy">
              Start a conversation. There is no form to fill in and nothing to
              download — just a thirty-minute call, or a message if that is
              easier.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── The three channels, in order of preference ──────────────────── */}
      <section aria-labelledby="channels-heading" className="section-y">
        <Container>
          <h2 id="channels-heading" className="sr-only">
            Ways to reach us
          </h2>

          <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
            <Reveal as="li" level="component" className="bg-surface p-10">
              <span className="font-mono text-label tracking-[0.14em] text-action">
                01
              </span>
              <h3 className="mt-5 text-sub text-ink">Schedule a Meeting</h3>
              <p className="mt-4 max-w-[32ch] text-body text-copy">
                The best use of thirty minutes if you are seriously considering
                this.
              </p>
              <Button
                href={CTA.primary.href}
                external={CTA.primary.external}
                size="lg"
                className="mt-8 w-full sm:w-auto"
              >
                Schedule a Meeting
              </Button>
            </Reveal>

            <Reveal as="li" level="component" className="bg-canvas p-10">
              <span className="font-mono text-label tracking-[0.14em] text-muted">
                02
              </span>
              <h3 className="mt-5 text-sub text-ink">WhatsApp</h3>
              <p className="mt-4 max-w-[32ch] text-body text-copy">
                For a quick question, or if you would rather write than talk.
              </p>
              <Button
                href={CTA.secondary.href}
                external={CTA.secondary.external}
                variant="secondary"
                size="lg"
                className="mt-8 w-full sm:w-auto"
              >
                Send a WhatsApp Message
              </Button>
            </Reveal>

            <Reveal as="li" level="component" className="bg-canvas p-10">
              <span className="font-mono text-label tracking-[0.14em] text-muted">
                03
              </span>
              <h3 className="mt-5 text-sub text-ink">Email</h3>
              <p className="mt-4 max-w-[32ch] text-body text-copy">
                Everything reaches the same place. We reply within a working
                day.
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-8 inline-flex min-h-11 items-center font-mono text-caption tracking-[0.06em] text-action underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-action"
              >
                {SITE.email}
              </a>
            </Reveal>
          </ol>
        </Container>
      </section>

      {/* ── Expectation setting: the largest remaining barrier ──────────── */}
      <section
        aria-labelledby="expect-heading"
        className="section-y border-t border-line bg-sand"
      >
        <Container width="editorial">
          <Reveal>
            <SectionLabel tone="muted">What happens on the call</SectionLabel>
          </Reveal>

          <h2
            id="expect-heading"
            className="mt-8 max-w-[16ch] text-section text-ink"
          >
            <LineReveal>No pitch. A working conversation.</LineReveal>
          </h2>

          <dl className="mt-14">
            {expectations.map((item) => (
              <Reveal
                key={item.term}
                level="component"
                className="grid gap-2 border-t border-line-strong py-7 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-10"
              >
                <dt className="font-mono text-label tracking-[0.14em] text-muted uppercase">
                  {item.term}
                </dt>
                <dd className="max-w-[54ch] text-body text-copy">
                  {item.detail}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-14">
            <p className="max-w-[40ch] border-l-2 border-action pl-6 text-sub text-ink">
              If it isn&rsquo;t the right call for your business, we&rsquo;ll
              say so.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
