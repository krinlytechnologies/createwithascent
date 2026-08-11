import { ABOUT } from "@/lib/about-content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * The operating system as a circle: five stages, with insights returning to
 * strategy.
 *
 * The ring is drawn with an SVG dash pattern that rotates slowly, and a marker
 * travels the circumference — enough to read as flow without a particle
 * system. Pure SVG and CSS; the whole thing costs one animated transform.
 *
 * Every stage is a real part of the system, so the drawing reads correctly with
 * all motion removed — the rotation adds pace, never meaning.
 */

const RADIUS = 150;
const CENTRE = 190;

/** Five stages, starting at twelve o'clock and running clockwise. */
function positionFor(index: number, total: number, radius = RADIUS) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTRE + Math.cos(angle) * radius,
    y: CENTRE + Math.sin(angle) * radius,
  };
}

export function OperatingLoop() {
  const stages = ABOUT.loop.stages;
  const total = stages.length;

  return (
    <section
      aria-labelledby="loop-heading"
      className="relative overflow-hidden border-t border-line py-28 sm:py-36"
    >
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{ABOUT.loop.label}</SectionLabel>
            </Reveal>

            <Reveal level="section" className="mt-8">
              <h2 id="loop-heading" className="max-w-[14ch] text-section text-ink">
                {ABOUT.loop.heading}
              </h2>
            </Reveal>

            <Reveal level="component" className="mt-8">
              <p className="max-w-[38ch] text-lead text-copy">
                {ABOUT.loop.caption}
              </p>
            </Reveal>

            {/* The stage order, readable without the diagram. */}
            <Reveal level="component" className="mt-10">
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {stages.map((stage, index) => (
                  <li key={stage.id} className="flex items-center gap-3">
                    <span className="font-mono text-label tracking-[0.14em] text-muted uppercase">
                      {stage.name}
                    </span>
                    <span aria-hidden="true" className="text-action">
                      {index === stages.length - 1 ? "↺" : "→"}
                    </span>
                  </li>
                ))}
                <li className="font-mono text-label tracking-[0.14em] text-action uppercase">
                  Strategy
                </li>
              </ol>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal level="section">
              <svg
                viewBox="0 0 380 380"
                className="mx-auto w-full max-w-[440px]"
                role="img"
                aria-label="A closed loop: strategy, production, distribution, demand and insights, with insights returning to strategy."
              >
                {/* The ring. The dashed overlay rotates; the base does not. */}
                <circle
                  cx={CENTRE}
                  cy={CENTRE}
                  r={RADIUS}
                  fill="none"
                  stroke="var(--color-line-strong)"
                  strokeWidth="1"
                />
                <circle
                  cx={CENTRE}
                  cy={CENTRE}
                  r={RADIUS}
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="8 26"
                  className="origin-center motion-safe:animate-[spin_28s_linear_infinite] motion-reduce:animate-none"
                />

                {stages.map((stage, index) => {
                  const { x, y } = positionFor(index, total);
                  const label = positionFor(index, total, RADIUS + 34);
                  const isReturn = stage.id === "insights";

                  return (
                    <g key={stage.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="9"
                        fill="var(--color-canvas)"
                        stroke={
                          isReturn
                            ? "var(--color-action)"
                            : "var(--color-line-strong)"
                        }
                        strokeWidth="2"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill={
                          isReturn ? "var(--color-action)" : "var(--color-brand)"
                        }
                      />
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-[var(--color-ink)] font-mono text-[11px] tracking-[0.12em] uppercase"
                      >
                        {stage.name}
                      </text>
                    </g>
                  );
                })}

                <text
                  x={CENTRE}
                  y={CENTRE - 6}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] font-mono text-[10px] tracking-[0.16em] uppercase"
                >
                  Continuous
                </text>
                <text
                  x={CENTRE}
                  y={CENTRE + 12}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] font-mono text-[10px] tracking-[0.16em] uppercase"
                >
                  System
                </text>
              </svg>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
