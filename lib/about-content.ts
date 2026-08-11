/**
 * About — an immersive narrative, not a document.
 *
 * Copy is roughly half the previous length. Every section carries one idea;
 * the rest is carried by motion. Where a paragraph used to explain, a visual
 * now demonstrates.
 */

export const ABOUT = {
  meta: {
    title: "About",
    description:
      "Expertise is the asset. Distribution is the problem. Ascent builds the operating system between them.",
  },

  hero: {
    label: "About",
    lines: ["Expertise is the asset.", "Distribution is the problem."],
    support: "We build the operating system between them.",
  },

  exist: {
    label: "Why we exist",
    lines: ["We didn't start an agency.", "We solved a pattern."],
    beats: [
      "Great founders had expertise.",
      "Great agencies produced content.",
      "Almost nobody built the system between them.",
    ],
  },

  /** The transition sequence: expertise resolving into distribution. */
  transition: {
    stages: ["Particles", "Network", "Connections", "Pipeline", "Growth"],
    caption: "Expertise, turned into distribution.",
  },

  beliefs: {
    label: "What we believe",
    heading: "Four convictions.",
    items: [
      {
        id: "expertise",
        name: "Expertise",
        body: "A founder's expertise is a business asset — not content.",
      },
      {
        id: "systems",
        name: "Systems",
        body: "Consistency beats brilliance. Systems beat effort.",
      },
      {
        id: "attention",
        name: "Attention",
        body: "Attention without demand is simply cost.",
      },
      {
        id: "voice",
        name: "Voice",
        body: "Your voice cannot be outsourced. Only amplified.",
      },
    ],
  },

  principles: {
    label: "Principles",
    heading: "What we choose, and what we choose against.",
    items: [
      { id: "p1", prefer: "Strategy", over: "Production" },
      { id: "p2", prefer: "Systems", over: "Campaigns" },
      { id: "p3", prefer: "Business Outcomes", over: "Vanity Metrics" },
      { id: "p4", prefer: "Long-term Brand Equity", over: "Short-term Attention" },
      { id: "p5", prefer: "Consistency", over: "Occasional Virality" },
    ],
  },

  loop: {
    label: "The operating system",
    heading: "A system that improves itself.",
    stages: [
      { id: "strategy", name: "Strategy" },
      { id: "production", name: "Production" },
      { id: "distribution", name: "Distribution" },
      { id: "demand", name: "Demand" },
      { id: "insights", name: "Insights" },
    ],
    caption: "Insights feed back into strategy. That is the whole difference.",
  },

  builtFor: {
    label: "Built for",
    heading: "A specific kind of founder.",
    items: [
      { id: "startup", name: "Startup Founders" },
      { id: "saas", name: "SaaS Companies" },
      { id: "ceo", name: "CEOs" },
      { id: "brands", name: "High-Growth Personal Brands" },
    ],
  },

  cta: {
    heading: "Let's build your distribution engine.",
    body: "Thirty minutes. We'll evaluate your positioning, your distribution system, and whether an operating system is the right fit for your business.",
    close: "If it isn't, we'll tell you.",
  },

  /** Slow, subtle, and paused on hover — per the motion system. */
  marquee: [
    "Strategy",
    "Positioning",
    "Distribution",
    "Authority",
    "Systems",
    "Narrative",
    "Growth",
    "Demand",
    "Expertise",
  ],
} as const;
