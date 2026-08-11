"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useScrolled } from "@/hooks/useScrolled";
import { CTA, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Close the overlay on navigation so a route change never leaves it open. */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* `intro-locked` is applied server-side to avoid the navigation flashing
     before the landing scene hydrates. Only the homepage has a scene, so every
     other route releases it immediately. */
  useEffect(() => {
    if (pathname !== "/") {
      document.documentElement.classList.remove("intro-locked");
    }
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        id="site-nav"
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-[background-color,box-shadow,border-color,backdrop-filter,opacity,transform]",
          "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          /* The navigation belongs to the website, not to the landing scene.
             `intro-locked` is set on the document element while the clouds are
             still closed, and released once the curtain begins to open. */
          "[.intro-locked_&]:pointer-events-none [.intro-locked_&]:-translate-y-3 [.intro-locked_&]:opacity-0",
          /* Transparent at the top; gains a blurred surface after scrolling.
             The overlay borrows the scrolled state so the bar stays legible
             above the full-screen menu. */
          scrolled || menuOpen
            ? "border-b border-line bg-surface/80 shadow-nav backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex items-center justify-between gap-6 py-5">
          <Logo className="relative z-10 shrink-0" />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      /* About, Services and Let's Connect are not built yet, so
                         prefetching them just fills the console with 404s.
                         Remove this once those routes exist. */
                      prefetch={link.href === "/" ? undefined : false}
                      className={cn(
                        "relative inline-block py-1 text-caption font-medium",
                        "transition-colors duration-200",
                        active ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {link.label}
                      {/* Active state carries a rule as well as colour —
                          nothing on this site depends on colour alone. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left",
                          "bg-action transition-transform duration-200",
                          "ease-[cubic-bezier(0.4,0,0.2,1)]",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Button
              href={CTA.primary.href}
              external={CTA.primary.external}
              className="hidden sm:inline-flex"
            >
              {CTA.primary.label}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-button",
                "border border-line-strong text-ink lg:hidden",
                "transition-colors duration-200 hover:border-action hover:bg-wash",
              )}
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
