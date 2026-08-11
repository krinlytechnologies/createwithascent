import { HERO } from "@/lib/home-content";
import { CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The homepage hero — the first thing inside `#homepage`, and entirely separate
 * from the intro scene above it.
 *
 * It is a normal section on the page's own ground, so it reveals on scroll like
 * every other section rather than being animated into existence by the intro.
 * By the time it arrives the visitor has already come through the curtain.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center bg-canvas py-28 sm:py-32"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal level="hero">
            <h1 id="hero-heading" className="max-w-[18ch] text-hero text-ink">
              {HERO.headline}
            </h1>
          </Reveal>

          <Reveal level="component" className="mt-7">
            <p className="max-w-[46ch] text-lead text-copy">{HERO.copy}</p>
          </Reveal>

          <Reveal level="component" className="mt-10">
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
        </div>
      </Container>
    </section>
  );
}
