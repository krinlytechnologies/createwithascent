/**
 * About — written the way a founder would say it out loud.
 *
 * No frameworks, no consultant vocabulary. Deliberately absent: "operating
 * system", "convictions", "distribution engine", "business asset", "leverage".
 * Every section answers a plain question — who are we, why did we start, what
 * do we believe, how do we work, who do we work with, why trust us — and reads
 * as the next line of the same conversation.
 *
 * Short sentences. Real observations instead of abstractions.
 */

export const ABOUT = {
  meta: {
    title: "About",
    description:
      "We help founders become impossible to ignore. The story behind Ascent, what we believe, and how we work.",
  },

  hero: {
    label: "About",
    lines: ["We help founders", "become impossible to ignore."],
    support:
      "Every business has a story worth telling. We make sure the right people hear yours.",
  },

  exist: {
    label: "Why we started",
    lines: ["We kept seeing", "the same thing happen."],
    beats: [
      "Brilliant founders. Years of experience, real products, results to show for it.",
      "Online, almost none of it came across. Posts went out. Nothing built.",
      "So we started Ascent.",
    ],
  },

  /** Words under the drawing as scattered points resolve into something moving. */
  transition: {
    stages: ["Experience", "Story", "Audience", "Momentum", "Growth"],
    caption: "What you already know, turned into something people follow.",
  },

  beliefs: {
    label: "What we believe",
    heading: "A few things we've learned.",
    items: [
      {
        id: "experience",
        name: "Experience",
        body: "Real experience beats trends. Every single time.",
      },
      {
        id: "consistency",
        name: "Consistency",
        body: "Showing up every week matters more than going viral once.",
      },
      {
        id: "trust",
        name: "Trust",
        body: "People buy from people they trust. That takes time, and there's no shortcut.",
      },
      {
        id: "story",
        name: "Your story",
        body: "Your story is the one thing a competitor can't copy.",
      },
    ],
  },

  principles: {
    label: "How we think",
    heading: "What we choose, and what we don't.",
    items: [
      { id: "p1", prefer: "Clarity", over: "Cleverness" },
      { id: "p2", prefer: "Substance", over: "Volume" },
      { id: "p3", prefer: "Momentum", over: "Moments" },
      { id: "p4", prefer: "Your voice", over: "Our style" },
      { id: "p5", prefer: "The long game", over: "The quick win" },
    ],
  },

  loop: {
    label: "How we work",
    heading: "Six steps. Then around again, better.",
    /* `name` labels the drawing; `detail` is the plain-English version. */
    stages: [
      { id: "learn", name: "Learn", detail: "We learn about your business" },
      { id: "plan", name: "Plan", detail: "We build a plan together" },
      { id: "create", name: "Create", detail: "We create it with you" },
      { id: "share", name: "Share", detail: "We share it consistently" },
      { id: "listen", name: "Listen", detail: "We see what lands" },
      { id: "improve", name: "Improve", detail: "We make the next month better" },
    ],
    caption: "Every month builds on the last. That's how great brands grow.",
  },

  builtFor: {
    label: "Who we work with",
    heading: "The people we love working with.",
    items: [
      {
        id: "done-the-work",
        name: "Founders who've done the work",
        body: "You have the experience. You just haven't had the time to talk about it.",
      },
      {
        id: "long-term",
        name: "People building for the long term",
        body: "You're not chasing one good month. You want something that keeps compounding.",
      },
      {
        id: "honest",
        name: "People who'd rather be honest",
        body: "No hype, no exaggerating. Just what's true, said well.",
      },
      {
        id: "tired",
        name: "Anyone tired of posting into silence",
        body: "You've tried content before and it went nowhere. We understand why.",
      },
    ],
  },

  cta: {
    heading: "Let's talk about your story.",
    body: "Thirty minutes, and no pitch. We'll ask about your business, what you've already tried, and what you want to be known for.",
    close: "If we're not the right fit, we'll tell you.",
  },

  marquee: [
    "Story",
    "Trust",
    "Consistency",
    "Craft",
    "Momentum",
    "Clarity",
    "Voice",
    "Patience",
    "Growth",
  ],
} as const;
