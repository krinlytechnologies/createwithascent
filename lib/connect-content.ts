import { SITE } from "@/lib/site";

/**
 * The closing block. Identical on every page — it is a signature, and a
 * signature that varies is just a shape.
 *
 * It occupies almost a full viewport by design: a destination, not a footer
 * banner.
 */
export const CONNECT = {
  label: "Connect With Us",
  heading: "Ready to build your Personal Brand Operating System?",
  body: "Thirty minutes. We look at your positioning, what you are publishing today, and whether an operating system is the right call for your business.",
  /* Offering to disqualify is the highest-converting sentence available to a
     premium company, and the most on-brand. */
  close: "If it isn't the right call, we'll say so.",
  email: SITE.email,
} as const;
