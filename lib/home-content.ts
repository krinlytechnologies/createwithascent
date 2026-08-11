/**
 * Homepage content, kept out of the presentation layer.
 *
 * Copy here is the approved working draft — on-brand and specific, pending the
 * dedicated content phase. Structure is locked by brand/06-homepage.md.
 */

export type Stage = {
  id: string;
  index: string;
  name: string;
  description: string;
};

/* --- §01 Hero / landing sequence ---------------------------------------- */

export const HERO = {
  /** Split across the two clouds. One word each. */
  wordmark: { left: "ASCENT", right: "STUDIOS" },
  eyebrow: "Personal Brand Operating Systems",
  headline: "Founder expertise, turned into demand.",
  copy: "We build the strategy, production and metrics that turn what you know into consistent business demand — run as one operating system, not a stack of services.",
  scrollHint: "Scroll",
} as const;

/* --- §02 The Problem ---------------------------------------------------- */

export const PROBLEM = {
  label: "The Problem",
  /** Read in sequence, each line revealed on its own. */
  lines: [
    "You hired the agency.",
    "The calendar arrived. So did the reels, the carousels, the posting schedule.",
    "Output landed on time, every week.",
  ],
  turn: "Reach went up.",
  turnEmphasis: "Nothing else did.",
  body: [
    "It isn't that the work was bad. It's that it started in the wrong place — a camera before a point of view, a calendar before a reason.",
    "Content built that way can only ever be output. There is nothing underneath it for the next month to compound into, so every month starts from zero.",
  ],
  transition: "Which raises the harder question. If more content was never the answer, what is?",
} as const;

/* --- §03 The Shift ------------------------------------------------------- */

export const SHIFT = {
  label: "The Shift",
  idea: "Content isn't the product. The system that makes it is.",
  support:
    "A deliverable ends when the invoice is paid. An operating system compounds — every month of it makes the next month sharper, cheaper and more likely to produce demand.",
  close: "We call it a Personal Brand Operating System.",
} as const;

/* --- §04 The Personal Brand Operating System ----------------------------- */

export const OPERATING_SYSTEM = {
  label: "The Operating System",
  heading: "One system. Not five services.",
  intro:
    "Expertise goes in. Demand comes out. Everything between is one connected loop, running on a cadence.",
  stages: [
    {
      id: "expertise",
      index: "01",
      name: "Expertise",
      description:
        "What you already know. The most valuable asset in the business, and the least distributed.",
    },
    {
      id: "strategy",
      index: "02",
      name: "Strategy",
      description:
        "Positioning, audience and content pillars. The thesis everything downstream is built on.",
    },
    {
      id: "production",
      index: "03",
      name: "Production",
      description:
        "The engine. Expertise turned into consistent content across every format that earns attention.",
    },
    {
      id: "metrics",
      index: "04",
      name: "Metrics",
      description:
        "Leads, conversations and demand signals. Not views. Not likes.",
    },
    {
      id: "optimisation",
      index: "05",
      name: "Optimisation",
      description:
        "What the market responds to changes what we say next. This is the return path — and the reason it compounds.",
    },
    {
      id: "growth",
      index: "06",
      name: "Business Growth",
      description:
        "Demand that arrives warm, because the people arriving already trust you.",
    },
  ] satisfies Stage[],
  /** The stage the return arc points back to. */
  loopTargetIndex: 1,
  loopSourceIndex: 4,
} as const;

/* --- §05 What We Do ------------------------------------------------------ */

export const PILLARS = [
  {
    id: "content-strategy",
    index: "01",
    name: "Content Strategy",
    outcome:
      "Clear positioning, audience insight, and content direction built around what the market cares about.",
  },
  {
    id: "production",
    index: "02",
    name: "Production",
    outcome:
      "Your expertise transformed into sharp, consistent content across platforms and formats.",
  },
  {
    id: "metrics",
    index: "03",
    name: "Metrics",
    outcome:
      "Content measured through meaningful business outcomes such as leads generated, conversations, and demand.",
  },
] as const;

export const WHAT_WE_DO = {
  label: "What We Do",
  heading: "Three pillars, run as one.",
  intro:
    "Each answers a different question. None of them works alone — which is the whole point.",
} as const;

/* --- Why Ascent ---------------------------------------------------------- */

export const WHY_ASCENT = {
  label: "Why Ascent",
  heading: "We sell the system, not the output.",
  /* The pull-quote carries the section on its own for anyone reading only the
     large type. */
  quote:
    "Most founders don't have a content problem. They have a system problem.",
  reasons: [
    {
      id: "strategy-first",
      index: "01",
      name: "Strategy before a camera is switched on",
      body: "Positioning, audience and content pillars are settled first. Everything produced afterwards is an expression of a decision already made, which is why it holds together month after month.",
    },
    {
      id: "measured",
      index: "02",
      name: "Measured against pipeline, not reach",
      body: "Leads, conversations, demand. If a month produced attention and no business, we treat that as information and change the strategy — not as a result to present.",
    },
    {
      id: "cadence",
      index: "03",
      name: "A cadence, not a campaign",
      body: "The system runs continuously and compounds. Each month starts from everything the previous months established, rather than from nothing.",
    },
    {
      id: "scoped",
      index: "04",
      name: "Scoped to the strategy, not to a package",
      body: "The mix of work follows where the strategy says attention should go. A fixed package is a deliverable, and a deliverable is exactly what failed before.",
    },
  ],
} as const;

/* --- Credibility --------------------------------------------------------- */

export const CREDIBILITY = {
  label: "Credibility",
  heading: "Judge the thinking before the logos.",
  body: "Ascent is deliberately low-volume. The honest way to assess us is the work product itself — the documents a system actually produces — and the reasoning behind them.",
  artefacts: [
    {
      id: "positioning",
      name: "The positioning document",
      body: "A defensible point of view, and an explicit list of what we will not talk about.",
    },
    {
      id: "calendar",
      name: "The content calendar",
      body: "A real operating cadence, with the founder's monthly hours stated as a number.",
    },
    {
      id: "dashboard",
      name: "The demand dashboard",
      body: "Leads, conversations and demand signals — the numbers that show the system working.",
    },
  ],
  /**
   * Client logos, once there are notable ones to show. The wall renders only
   * when this has entries — an empty logo wall is worse than none, and
   * inventing them would be exactly the fake authority the brand forbids.
   */
  logos: [] as ReadonlyArray<{ name: string; src: string }>,
} as const;

/* --- §06 How We Work ----------------------------------------------------- */

export const HOW_WE_WORK = {
  label: "How We Work",
  heading: "How an engagement runs.",
  stages: [
    {
      id: "discovery",
      index: "01",
      name: "Discovery & Audit",
      description:
        "We learn your business, goals, and where your content stands today.",
    },
    {
      id: "strategy",
      index: "02",
      name: "Strategy & Positioning",
      description:
        "We research your market, define your positioning, audience, and content pillars.",
    },
    {
      id: "production",
      index: "03",
      name: "Production",
      description:
        "We operate your content engine consistently across every relevant format.",
    },
    {
      id: "optimize",
      index: "04",
      name: "Optimize",
      description:
        "We measure business outcomes, refine the strategy, and continuously improve the operating system.",
    },
  ] satisfies Stage[],
  close: "This isn't a campaign. It's a repeatable operating system.",
} as const;
