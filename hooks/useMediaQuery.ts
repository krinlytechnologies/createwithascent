"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a media query.
 *
 * Returns `false` during SSR and the first client render so markup matches the
 * server, then settles on the real value. Callers should treat `false` as the
 * conservative branch — for the signature reveal that means blur stays off
 * until we know the viewport is wide enough to afford it.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Blur is the most expensive thing in the motion system — `filter: blur()`
 * forces an offscreen render pass per element per frame. It is dropped below
 * 768px, where the reveal still reads correctly on opacity and translate alone.
 */
export function useBlurAllowed(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
