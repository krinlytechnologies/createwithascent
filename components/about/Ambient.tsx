import { cn } from "@/lib/utils";

type AmbientProps = {
  /** Adds the drifting blueprint grid behind the mist. */
  grid?: boolean;
  className?: string;
};

/**
 * The ambient backdrop: volumetric mist, optionally over a drifting blueprint
 * grid.
 *
 * Pure CSS — layered radial gradients on two counter-drifting planes. No
 * canvas, no WebGL, no particle library. It animates `transform` only, so it
 * stays on the compositor, and the global reduced-motion rule freezes it
 * without removing it.
 *
 * Always `aria-hidden` and never interactive.
 */
export function Ambient({ grid = false, className }: AmbientProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {grid ? <div className="blueprint-drift" /> : null}
      <div className="mist-far" />
      <div className="mist" />
    </div>
  );
}
