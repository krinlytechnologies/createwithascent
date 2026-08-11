import { CONNECT } from "@/lib/connect-content";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * The closing block, identical on every page.
 *
 * It fills the viewport on purpose — a destination the visitor arrives at,
 * rather than a banner bolted to the bottom. The offer to disqualify does the
 * conversion work; nothing here applies pressure.
 */
export function ConnectWithUs() {
  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="flex min-h-[85vh] items-center border-t border-line bg-surface py-28 sm:py-32"
    >
      <Container width="editorial">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel>{CONNECT.label}</SectionLabel>
          </Reveal>

          <Reveal level="hero" className="mt-10">
            <h2
              id="connect-heading"
              className="max-w-[16ch] text-section text-ink"
            >
              {CONNECT.heading}
            </h2>
          </Reveal>

          <Reveal level="component" className="mt-8">
            <p className="max-w-[52ch] text-lead text-copy">{CONNECT.body}</p>
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

          <Reveal level="component" className="mt-14 w-full">
            <div className="flex flex-col items-center gap-3 border-t border-line pt-10">
              <p className="text-sub text-ink">{CONNECT.close}</p>
              <a
                href={`mailto:${CONNECT.email}`}
                className="inline-flex min-h-11 items-center font-mono text-caption tracking-[0.06em] text-action underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-action"
              >
                {CONNECT.email}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
