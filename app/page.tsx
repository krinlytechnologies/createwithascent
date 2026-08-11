import dynamic from "next/dynamic";

import { Hero } from "@/components/home/Hero";
import { IntroScene } from "@/components/home/IntroScene";

/**
 * Everything past the hero is code-split into its own chunk. All of it still
 * server-renders, so the HTML is complete and nothing shifts when a chunk lands.
 *
 * Note: Next counts these toward the route's reported First Load JS, so the
 * build output shows no saving. The benefit is in how the chunks are fetched
 * and hydrated — verify with Lighthouse before treating it as a win.
 */
const Problem = dynamic(() =>
  import("@/components/home/Problem").then((m) => m.Problem),
);
const Shift = dynamic(() =>
  import("@/components/home/Shift").then((m) => m.Shift),
);
const OperatingSystem = dynamic(() =>
  import("@/components/home/OperatingSystem").then((m) => m.OperatingSystem),
);
const WhatWeDo = dynamic(() =>
  import("@/components/home/WhatWeDo").then((m) => m.WhatWeDo),
);
const HowWeWork = dynamic(() =>
  import("@/components/home/HowWeWork").then((m) => m.HowWeWork),
);

/**
 * Home.
 *
 * Two sections, and they are genuinely separate: the cinematic intro, then the
 * website beneath it. The homepage is not inside the intro and does not appear
 * during it — it begins where the intro ends.
 *
 * The eleven-section narrative is defined in brand/06-homepage.md and is built
 * one sprint at a time. §01–§06 are in place.
 */
export default function HomePage() {
  return (
    <>
      <IntroScene />

      {/* Follows the intro in normal flow. An overlap was tried so the page
          could be uncovered through the parting clouds; it broke the hero,
          because the intro's sticky child still occupies the overlapped region
          after it releases and was painting over the page and swallowing its
          clicks. Reverted — see brand/00-decisions.md. */}
      <div id="homepage" className="relative bg-canvas">
        <Hero />
        <Problem />
        <Shift />
        <OperatingSystem />
        <WhatWeDo />
        <HowWeWork />
      </div>
    </>
  );
}
