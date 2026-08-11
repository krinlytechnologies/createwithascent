import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { SITE } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /* `intro-locked` hides the navigation for the landing scene. It is set
         here rather than on mount so the navigation never flashes before the
         scene hydrates; LandingSequence releases it when the curtain opens, and
         Navbar releases it immediately on every route that has no scene. */
      className={`${GeistSans.variable} ${GeistMono.variable} intro-locked`}
      suppressHydrationWarning
    >
      <body>
        {/* Without JavaScript no scene ever runs, so the navigation should not
            stay hidden waiting for it. */}
        <noscript>
          <style>{`.intro-locked #site-nav{opacity:1;transform:none;pointer-events:auto}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-button focus-visible:bg-surface focus-visible:px-5 focus-visible:py-3 focus-visible:text-caption focus-visible:font-semibold focus-visible:text-ink focus-visible:shadow-nav"
        >
          Skip to content
        </a>

        <SmoothScrollProvider />
        <Navbar />

        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
