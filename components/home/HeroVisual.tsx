import { ChevronDown, ChevronUp } from "lucide-react";

type Stage = {
  index: string;
  name: string;
  detail: readonly string[];
};

/**
 * The three pillars, in the order the system runs them. Content mirrors
 * brand/07-services.md — this is the shape of the operating system, not a
 * feature list.
 */
const STAGES: readonly Stage[] = [
  {
    index: "01",
    name: "Content Strategy",
    detail: ["Market research", "Positioning", "Content pillars"],
  },
  {
    index: "02",
    name: "Production",
    detail: ["Video", "Written", "Repurposing"],
  },
  {
    index: "03",
    name: "Metrics",
    detail: ["Leads", "Conversations", "Demand"],
  },
] as const;

/**
 * NOT CURRENTLY RENDERED.
 *
 * The landing sequence replaced the two-column hero, so this composition has no
 * home on the page today. It is kept rather than deleted because D-63 queues
 * §01's composition for restatement in blueprint vocabulary — this is the
 * starting point for that work, not dead code. If the blueprint restatement is
 * dropped, delete this file.
 *
 * An abstract composition of the operating system: three panels connected in
 * sequence, held inside a bracket that closes back on itself.
 *
 * The bracket is the argument — it is what separates a system from three
 * services sold together. It is deliberately an open bracket rather than the
 * full circular diagram, which belongs to the Operating System section further
 * down the page.
 */
export function HeroVisual() {
  return (
    <div
      className="relative rounded-l-container border border-r-0 border-line-strong py-7 pr-0 pl-7 sm:py-9 sm:pl-10"
      role="img"
      aria-label="Ascent's operating system: content strategy feeds production, production feeds metrics, and metrics feed back into strategy."
    >
      {/* Direction marker on the return path. */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-canvas text-action"
      >
        <ChevronUp className="size-4" />
      </span>

      {/* The return path, labelled on the closing edge. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-10 translate-y-1/2 bg-canvas px-2 font-mono text-label tracking-[0.14em] text-muted uppercase"
      >
        Optimise
      </span>

      <ol className="flex flex-col">
        {STAGES.map((stage, position) => (
          <li key={stage.index}>
            {/* Not headings: the composition is exposed to assistive tech as a
                single labelled image, so its internals stay out of the document
                outline. */}
            <div className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
              <p className="font-mono text-label tracking-[0.14em] text-action">
                {stage.index}
              </p>
              <p className="mt-2 text-lg leading-tight font-semibold tracking-[-0.015em] text-ink sm:text-xl">
                {stage.name}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {stage.detail.map((item) => (
                  <li key={item} className="text-caption text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {position < STAGES.length - 1 ? (
              <div
                aria-hidden="true"
                className="flex flex-col items-center py-2"
              >
                <span className="h-4 w-px bg-line-strong" />
                <ChevronDown className="size-4 text-line-strong" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
