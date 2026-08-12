import { ABOUT } from "@/lib/about-content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * How we work, drawn as a circle: five stages, the last one feeding the first.
 *
 * Recalibrate is the return beat — it is what makes this a cycle rather than a
 * checklist, so it is the one node the ring marks in the action colour.
 *
 * The ring is drawn with an SVG dash pattern that rotates slowly — enough to
 * read as flow without a particle system. Pure SVG and CSS; the whole thing
 * costs one animated transform.
 *
 * Every stage is a real part of the cycle, so the drawing reads correctly with
 * all motion removed — the rotation adds pace, never meaning. The list beside
 * it carries the same stages in full, so the section works without the diagram
 * at all.
 */

const RADIUS = 150;
const CENTRE = 190;

/** Steps run clockwise from twelve o'clock. */
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
              <p className="max-w-[42ch] text-lead text-copy">{ABOUT.loop.intro}</p>
            </Reveal>

            {/* The stages in full, readable without the drawing. */}
            <Reveal level="component" className="mt-10">
              <ol>
                {stages.map((stage, index) => (
                  <li key={stage.id} className="border-t border-line py-5">
                    <p className="flex items-baseline gap-4">
                      <span className="font-mono text-label tracking-[0.14em] text-action">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sub text-ink">{stage.name}</span>
                    </p>
                    <p className="mt-2 pl-10 text-body text-copy">{stage.detail}</p>
                  </li>
                ))}
                <li className="flex items-baseline gap-4 border-t border-line py-5">
                  <span aria-hidden="true" className="text-action">
                    ↺
                  </span>
                  <span className="text-body text-ink">
                    Then the cycle starts again, sharper than the last.
                  </span>
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
                aria-label="A cycle of five stages — strategy, production, editing, metrics, recalibrate — returning to the start."
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
                  /* Recalibrate is where the cycle turns back on itself. */
                  const isReturn = stage.id === "recalibrate";

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
                  Repeating
                </text>
                <text
                  x={CENTRE}
                  y={CENTRE + 12}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] font-mono text-[10px] tracking-[0.16em] uppercase"
                >
                  and sharpening
                </text>
              </svg>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
