/**
 * Single source of truth for site-wide constants: navigation, calls to action
 * and contact channels.
 *
 * The site has exactly two actions everywhere — Book a Strategy Call and Send a
 * WhatsApp Message. Competing CTAs (newsletters, downloads, gated content) are
 * prohibited by brand/05-site-architecture.md.
 */

export const SITE = {
  name: "Ascent Studios",
  tagline: "Personal Brand Operating Systems for founders.",
  description:
    "Ascent Studios builds Personal Brand Operating Systems that turn founder expertise into consistent business demand. Strategy, production and metrics, run as one system.",
  url: "https://createwithascent.com",
  email: "contact@createwithascent.com",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

/** Four pages. Intentionally. No dropdowns. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Let's Connect", href: "/lets-connect" },
] as const;

/**
 * Booking and WhatsApp destinations are environment-configured so the
 * scheduling tool and phone number can change without a code edit. Both fall
 * back to the Let's Connect page, which carries every channel.
 */
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const CTA = {
  primary: {
    label: "Book a Strategy Call",
    href: BOOKING_URL ?? "/lets-connect",
    external: Boolean(BOOKING_URL),
  },
  secondary: {
    label: "Send a WhatsApp Message",
    href: WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}`
      : "/lets-connect",
    external: Boolean(WHATSAPP_NUMBER),
  },
} as const;
