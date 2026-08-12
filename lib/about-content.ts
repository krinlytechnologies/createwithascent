/**
 * About — the client's approved page copy, applied verbatim where possible.
 *
 * This supersedes the conversational rewrite that preceded it. That pass was
 * asked to sound like two founders over coffee; this brief pulls the register
 * back toward strategy — positioning, authority, demand, leverage — while
 * keeping the sentences short and the claims checkable.
 *
 * Section order is fixed by the brief: hero · why we started · what we believe ·
 * the transformation · how we work · who we work with.
 */

export const ABOUT = {
  meta: {
    title: "About",
    description:
      "A strategy-first studio for founders, CEOs and high-growth creators. How Ascent turns positioning, content and performance into one system.",
  },

  hero: {
    label: "About",
    lines: ["We help build personal brands", "that are impossible to ignore."],
    support:
      "A strategy-first studio for founders, CEOs and high-growth creators who would rather be known for their thinking than their posting schedule.",
  },

  exist: {
    label: "Why we started",
    lines: ["Why we", "started Ascent."],
    /* Three beats: the problem, the missing work, the answer. */
    beats: [
      {
        id: "authority",
        title: "Content is everywhere, authority is not",
        body: "Publishing more doesn't automatically make someone more credible. Visibility only matters when it builds recognition and trust.",
      },
      {
        id: "before-record",
        title: "The real work happens before you even hit record",
        body: "Clear positioning, a defined point of view and a strong understanding of what someone should be known for, before production starts.",
      },
      {
        id: "the-gap",
        title: "Ascent closes that gap for you",
        body: "We combine positioning, content and performance into one system, built to create visibility, demand and measurable business outcomes.",
      },
    ],
  },

  beliefs: {
    label: "What we believe",
    heading: "Four things we hold to.",
    items: [
      {
        id: "currency",
        name: "Visibility is a currency in this age",
        body: "A strong brand stays present across the channels that matter, not only when there is time to post.",
      },
      {
        id: "position-first",
        name: "Position before you produce",
        body: "Every piece of content should answer a question nobody's asking out loud: why should anyone care what this person has to say?",
      },
      {
        id: "leverage",
        name: "Content is the best leverage for your business",
        body: "Used strategically, content can build reputation, generate demand and create opportunities at scale.",
      },
      {
        id: "attention",
        name: "Attention should lead somewhere",
        body: "Views are a metric. The real value is what follows — conversations, leads, opportunities and revenue.",
      },
    ],
  },

  /**
   * The transformation.
   *
   * Two states of the same business, in matched pairs: each `before` line is
   * answered by the `after` line at the same index. The pairing is the argument,
   * so the two columns must stay the same length.
   */
  transformation: {
    label: "The transformation",
    heading: "What changes.",
    before: {
      title: "Before Ascent",
      items: [
        "Inconsistent content and visibility",
        "No clear market positioning or point of view",
        "Content disconnected from business objectives",
        "Unclear understanding of what visibility should achieve",
      ],
    },
    after: {
      title: "After Ascent",
      items: [
        "Clear, defensible market positioning",
        "A consistent content system that runs without your daily involvement",
        "Stronger recognition and authority within the market",
        "More inbound conversations, warm introductions and qualified opportunities",
      ],
    },
  },

  loop: {
    label: "How we work",
    heading: "Five stages, repeating.",
    intro:
      "We don't run this as a one-off project. It's a process — the same five stages, repeating and sharpening with every cycle.",
    stages: [
      {
        id: "strategy",
        name: "Strategy",
        detail:
          "Two focused sessions to map positioning, narrative and direction, specific to the business and the market it sits in.",
      },
      {
        id: "production",
        name: "Production",
        detail:
          "Content is planned and created against that strategy, not around whatever trend is loudest that week.",
      },
      {
        id: "editing",
        name: "Editing",
        detail:
          "Every piece is packaged for the platform it's actually built for, not just cut down from one master file.",
      },
      {
        id: "metrics",
        name: "Metrics",
        detail:
          "We track what's working, and more importantly, what it's doing for the business through conversations, leads and opportunities.",
      },
      {
        id: "recalibrate",
        name: "Recalibrate",
        detail:
          "Once a month, we sit down with the numbers and adjust direction. Nothing runs unexamined for more than 30 days.",
      },
    ],
    caption: "Nothing runs unexamined for more than 30 days.",
  },

  builtFor: {
    label: "Who we work with",
    heading: "The people we love working with.",
    items: [
      {
        id: "experience",
        name: "Experience worth putting forward",
        body: "Years of work, real expertise and a perspective worth building a name around.",
      },
      {
        id: "long-game",
        name: "Playing the long game",
        body: "Building a reputation that compounds, rather than chasing short-term attention.",
      },
      {
        id: "substance",
        name: "Substance over spectacle",
        body: "Clear thinking, strong work and ideas that don't need to be exaggerated to stand out.",
      },
      {
        id: "purpose",
        name: "Visibility with a purpose",
        body: "Turning the work already being done into a presence that creates recognition, opportunity and growth.",
      },
    ],
  },

  cta: {
    heading: "Let's talk about what you should be known for.",
    body: "Thirty minutes, and no pitch. We'll ask about the business, what you've already tried, and where recognition would actually change the numbers.",
    close: "If we're not the right fit, we'll tell you.",
  },

  marquee: [
    "Positioning",
    "Authority",
    "Visibility",
    "Demand",
    "Recognition",
    "Leverage",
    "Clarity",
    "Compounding",
    "Momentum",
  ],
} as const;
