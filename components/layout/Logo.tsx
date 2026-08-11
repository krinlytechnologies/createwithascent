import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

/**
 * The wordmark.
 *
 * The mark is the real brand asset rather than a drawn approximation — it is
 * near-square with no transparent margin (content 2355 × 2328 of 2357 × 2330),
 * so it sits on the baseline without needing optical correction.
 *
 * The name stays live text beside it: the intro's wordmark is baked into
 * artwork, so this is where "Ascent Studios" exists as readable, selectable,
 * translatable text on every page.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Ascent Studios — home"
      className={cn(
        /* py-2 lifts the touch target to 44px without changing the visual
           height — the header and footer both centre it. */
        "group inline-flex items-center gap-2.5 py-2 text-ink",
        "transition-opacity duration-200 hover:opacity-70",
        className,
      )}
    >
      <Image
        src="/assets/ASCENT BLUE OG LOGO PNG.png"
        alt=""
        width={2357}
        height={2330}
        priority
        sizes="28px"
        className="size-7 select-none"
      />
      <span className="text-caption font-bold tracking-[0.14em] uppercase">
        Ascent Studios
      </span>
    </Link>
  );
}
