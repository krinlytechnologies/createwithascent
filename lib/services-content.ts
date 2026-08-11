/**
 * Services — one operating system, opened up.
 *
 * Each pillar gets a full section of its own: why it exists, what it includes,
 * and how it connects. No packages, no pricing cards, no agency boxes.
 */

export const SERVICES = {
  meta: {
    title: "Services",
    description:
      "Content Strategy, Production and Metrics — three pillars run as one operating system, closing into a loop.",
  },

  hero: {
    label: "Services",
    heading: "One system. Three pillars. No packages.",
    body: "Strategy sets the direction. Production runs it. Metrics tells you whether it is working — and feeds back into the strategy. Sold separately these are three services. Run together on a cadence they are an operating system.",
  },

  pillars: [
    {
      id: "content-strategy",
      index: "01",
      name: "Content Strategy",
      outcome:
        "Clear positioning, audience insight, and content direction built around what the market cares about.",
      why: "Almost everything that fails downstream fails here first. Without a settled thesis, production becomes a series of unrelated guesses and metrics have nothing to measure against. This is the decision layer, and it is why the order of the three pillars is not negotiable.",
      includes: [
        "Audience and market research",
        "Positioning",
        "Content pillars and ICP definition",
      ],
      /* Answers the founder's unspoken "how much of my time?" at the exact
         moment they are imagining a long discovery process. */
      note: "Delivered in 1–2 sessions.",
      connects:
        "Everything Production makes is an expression of a decision taken here — which is why the output holds together month after month instead of drifting.",
    },
    {
      id: "production",
      index: "02",
      name: "Production",
      outcome:
        "Your expertise transformed into sharp, consistent content across platforms and formats.",
      why: "Expertise is the least distributed asset most founders own. Production exists to move it out of their head and into the market on a fixed rhythm, without the quality depending on how their week went.",
      includes: [
        "Short-form video, and long-form video filmed and edited",
        "Carousels",
        "Long-form written content — blogs, newsletters, ghostwritten pieces",
        "Website design and SEO",
        "Repurposing across formats, with a content calendar",
      ],
      /* The sentence that proves the system claim: a package is a deliverable,
         and a deliverable is exactly what failed these founders before. */
      note: "Deliverables are scoped to your strategy, not a fixed package — the exact mix depends on where the strategy says attention should go.",
      connects:
        "Website and SEO sit here because they are the owned destination everything else drives toward. Attention has to land somewhere it can convert.",
    },
    {
      id: "metrics",
      index: "03",
      name: "Metrics",
      outcome:
        "Content measured through meaningful business outcomes — leads generated, conversations, and demand.",
      why: "This is the direct answer to the complaint that starts most of our conversations: I got more content, I did not get more business. If a month produced attention and no pipeline, that is a finding, not a result to present.",
      includes: [
        "Leads generated",
        "Conversations started",
        "Demand signals",
      ],
      note: "Not views, not likes — only the numbers that tell you the system is working.",
      connects:
        "What the market responds to changes what we say next. This is the return path, and the reason the system compounds instead of repeating.",
    },
  ],

  loop: {
    label: "How it connects",
    heading: "Strategy → Production → Metrics → Strategy",
    body: "Three services sold together are still three services. The feedback arrow is the entire difference: every month of measurement sharpens the next month of strategy, so the system gets cheaper and more accurate the longer it runs.",
    stages: [
      { id: "strategy", index: "01", name: "Strategy", role: "sets the direction" },
      { id: "production", index: "02", name: "Production", role: "runs it" },
      { id: "metrics", index: "03", name: "Metrics", role: "tells you whether it worked" },
      { id: "back", index: "↺", name: "Back to Strategy", role: "and changes what we say next" },
    ],
  },

  fit: {
    label: "Ideal Client",
    heading: "Where this works best.",
    body: "A business selling to people who make considered decisions, a founder with genuine expertise, and a willingness to commit a small fixed amount of time every month for at least a year. The system needs runway to compound; anything shorter is a campaign.",
  },
} as const;
