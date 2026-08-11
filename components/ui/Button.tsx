import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-button font-semibold " +
  "whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "hover:-translate-y-0.5 active:translate-y-0 " +
  "motion-reduce:transform-none motion-reduce:transition-none";

/**
 * Primary fills with `action` (#0870BA), not the brand blue. White text on
 * #0597FF measures 3.05:1 — below the 4.5:1 minimum. Hover darkens rather than
 * lightens so the hover state stays compliant too.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-action text-white border border-transparent " +
    "hover:bg-action-hover hover:shadow-cta",
  secondary:
    "bg-surface text-ink border border-line-strong " +
    "hover:border-action hover:bg-wash",
};

const SIZES: Record<ButtonSize, string> = {
  md: "text-small px-6 py-3",
  lg: "text-small px-7 py-3.5",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children"> & {
    href: string;
    /** External destinations open in a new tab with rel guards applied. */
    external?: boolean;
  };

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: never };

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonAsLink | ButtonAsButton) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && typeof props.href === "string") {
    const { href, external, ...rest } = props as ButtonAsLink;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
