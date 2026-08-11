import { PROBLEM } from "@/lib/home-content";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * §02 — The Problem.
 *
 * Identity: a descending sequence of statements. No visual beyond typography
 * and rules, because recognition is damaged by decoration — a founder reading
 * their own experience back does not need it illustrated.
 *
 * The label holds position in the left margin while the statements pass it, so
 * the section reads as one continuous thought rather than a stack of blocks.
 */
export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="section-y border-t border-line"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <SectionLabel>{PROBLEM.label}</SectionLabel>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {/* The setup: three plain statements, each arriving on its own. */}
            <div className="max-w-[34ch] text-lead text-muted">
              {PROBLEM.lines.map((line, index) => (
                <LineReveal key={line} step={index}>
                  {line}
                </LineReveal>
              ))}
            </div>

            {/* The turn. Isolated by whitespace rather than by scale. */}
            <h2
              id="problem-heading"
              className="mt-20 text-section sm:mt-28 lg:mt-32"
            >
              <LineReveal className="text-muted">{PROBLEM.turn}</LineReveal>
              <LineReveal step={1} className="text-ink">
                {PROBLEM.turnEmphasis}
              </LineReveal>
            </h2>

            <Reveal className="mt-20 max-w-reading sm:mt-28 lg:mt-32">
              <div className="flex flex-col gap-6 border-t border-line pt-10">
                {PROBLEM.body.map((paragraph) => (
                  <p key={paragraph} className="text-body text-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Hands the reader to §03 rather than ending the thought. */}
            <Reveal className="mt-16 max-w-[42ch]">
              <p className="text-sub text-ink">{PROBLEM.transition}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
