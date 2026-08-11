import Image from "next/image";

import { CREDIBILITY } from "@/lib/home-content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Credibility.
 *
 * Identity: a warm full-bleed band, centred statement, and the artefacts set as
 * a staircase rather than a grid — three documents laid down beside each other
 * on a desk, not three matching cards. That keeps it distinct from §05, which
 * is an aligned broadsheet.
 *
 * The logo wall renders only when there are logos. An empty wall reads worse
 * than none, and inventing entries would be precisely the fake authority the
 * brand forbids — so the section leads with the work product instead, which is
 * true today and costs nothing but honesty.
 *
 */
export function Credibility() {
  const hasLogos = CREDIBILITY.logos.length > 0;

  return (
    <section
      id="credibility"
      aria-labelledby="credibility-heading"
      className="section-y border-t border-line bg-sand"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel tone="muted">{CREDIBILITY.label}</SectionLabel>
          </Reveal>

          <Reveal level="section" className="mt-8">
            <h2
              id="credibility-heading"
              className="max-w-[18ch] text-section text-ink"
            >
              {CREDIBILITY.heading}
            </h2>
          </Reveal>

          <Reveal level="component" className="mt-8">
            <p className="max-w-[54ch] text-lead text-copy">
              {CREDIBILITY.body}
            </p>
          </Reveal>
        </div>

        {/* The staircase. Each artefact sits a step lower than the last. */}
        <ol className="mt-20 grid gap-12 sm:mt-24 md:grid-cols-3 md:gap-8">
          {CREDIBILITY.artefacts.map((artefact, index) => (
            <Reveal
              key={artefact.id}
              as="li"
              level="component"
              className={cn(
                "border-t border-line-strong pt-8",
                index === 1 && "md:mt-16",
                index === 2 && "md:mt-32",
              )}
            >
              <h3 className="max-w-[18ch] text-sub text-ink">
                {artefact.name}
              </h3>
              <p className="mt-4 max-w-[34ch] text-body text-copy">
                {artefact.body}
              </p>
            </Reveal>
          ))}
        </ol>

        {hasLogos ? (
          <Reveal className="mt-24 border-t border-line-strong pt-14">
            <ul className="grid grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
              {CREDIBILITY.logos.map((logo) => (
                <li key={logo.name} className="flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={80}
                    sizes="(max-width: 640px) 40vw, 18vw"
                    className="h-8 w-auto opacity-70 transition-opacity duration-200 hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
