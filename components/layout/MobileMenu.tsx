"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { DURATION, EASE_BRAND, STAGGER } from "@/lib/motion";
import { CTA, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const reduced = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(open);

  /* Remember what opened the menu so focus can return there on close. */
  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
    } else {
      restoreFocusRef.current?.focus?.();
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);

      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      /* Trap focus inside the overlay while it owns the screen. */
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    document.addEventListener("keydown", handleKeyDown);
    /* Move focus into the panel so the first Tab lands inside it. */
    const firstItem = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    firstItem?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  const panelTransition = {
    duration: reduced ? 0.01 : DURATION.component,
    ease: EASE_BRAND,
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={panelTransition}
          className={cn(
            "fixed inset-0 z-40 flex flex-col bg-canvas lg:hidden",
            "pt-24 pb-10 gutter",
          )}
        >
          <nav aria-label="Primary" className="flex-1">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, index) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...panelTransition,
                      delay: reduced ? 0 : index * STAGGER,
                    }}
                    className="border-b border-line"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      /* Not built yet — see the note in Navbar. */
                      prefetch={link.href === "/" ? undefined : false}
                      className={cn(
                        "flex items-baseline gap-3 py-5 text-sub",
                        "transition-colors duration-200",
                        active ? "text-action" : "text-ink hover:text-action",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-label text-muted"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <Button
              href={CTA.primary.href}
              external={CTA.primary.external}
              onClick={onClose}
              size="lg"
            >
              {CTA.primary.label}
            </Button>
            <Button
              href={CTA.secondary.href}
              external={CTA.secondary.external}
              variant="secondary"
              onClick={onClose}
              size="lg"
            >
              {CTA.secondary.label}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
