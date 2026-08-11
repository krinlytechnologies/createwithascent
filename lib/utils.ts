import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about our custom font sizes.
 *
 * Its default `font-size` group only recognises t-shirt names (`text-sm`,
 * `text-lg`, `text-2xl`…). Ours are semantic — `text-body`, `text-small`,
 * `text-label` — so it classified them as *colours* and treated
 * `text-white text-small` as two competing colours, silently discarding the
 * first.
 *
 * That is not theoretical: it stripped `text-white` from the primary button,
 * leaving body-grey text on the action blue at 2.72:1 — well under AA — and it
 * dropped the font size from every section label and navigation link.
 *
 * Declaring the sizes here separates the two groups, so a size and a colour can
 * coexist on one element.
 */
const FONT_SIZES = [
  "hero",
  "section",
  "sub",
  "lead",
  "body",
  "small",
  "caption",
  "label",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
    },
  },
});

/**
 * Merge conditional class names, resolving Tailwind conflicts so a caller's
 * override always wins over a component's default.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
