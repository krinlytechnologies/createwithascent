import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: string;
  /** Set on tonal or inverted surfaces where the action blue loses contrast. */
  tone?: "action" | "muted";
  className?: string;
};

/**
 * The mono eyebrow that opens every section.
 *
 * The rule alongside it is structural, not decorative: it marks where a chapter
 * begins, so the label never depends on colour alone to read as a heading.
 */
export function SectionLabel({
  children,
  tone = "action",
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-label tracking-[0.14em] uppercase",
        tone === "action" ? "text-action" : "text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "action" ? "bg-action" : "bg-line-strong",
        )}
      />
      {children}
    </p>
  );
}
