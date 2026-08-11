import Link from "next/link";

import { NAV_LINKS, SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

/**
 * The footer is not a dumping ground.
 *
 * Logo, navigation, email, social, copyright. Nothing else — no newsletter, no
 * sitemap sprawl, no second CTA. The Connect With Us block immediately above it
 * is the destination; this is only the exit.
 */

/** Populate as accounts exist. Empty renders nothing rather than dead links. */
const SOCIAL: ReadonlyArray<{ label: string; href: string }> = [];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas py-16">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-[28ch] text-caption text-muted">
              {SITE.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {/* min-h-11 gives a 44px touch target. The links are 18px of
                      type; WCAG 2.5.8 asks for 24px minimum and thumbs want
                      more. */}
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-caption text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 items-center font-mono text-caption tracking-[0.06em] text-action underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-action"
            >
              {SITE.email}
            </a>

            {SOCIAL.length > 0 ? (
              <ul className="flex gap-5">
                {SOCIAL.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-caption text-muted transition-colors duration-200 hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-8 text-caption text-muted">
          © {year} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}
