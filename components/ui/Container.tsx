import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerWidth = "content" | "editorial" | "reading";

const WIDTHS: Record<ContainerWidth, string> = {
  content: "max-w-content",
  editorial: "max-w-editorial",
  reading: "max-w-reading",
};

type ContainerProps = {
  children: ReactNode;
  /** 1280px sections, 960px editorial blocks, 780px prose. */
  width?: ContainerWidth;
  as?: ElementType;
  className?: string;
};

export function Container({
  children,
  width = "content",
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full gutter", WIDTHS[width], className)}>
      {children}
    </Tag>
  );
}
