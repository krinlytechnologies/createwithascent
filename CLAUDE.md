# Working rules — Ascent Studios

Read `brand/01-creative-direction.md` before making any copy decision and
`brand/03-design-system.md` before any design decision. Check
`brand/00-decisions.md` for what has changed and what is still open.

Precedence: the client brief, then the existing system, then judgement. A later
phase brief overrides an earlier proposal without argument — record the
override in `00-decisions.md`.

## The gate

Every addition passes one test:

> Does this help a founder understand why Ascent is different?

No → it doesn't ship. This applies to sections, animations, illustrations,
gradients, icons, badges, counters, and adjectives.

## Positioning — non-negotiable

Ascent builds **Personal Brand Operating Systems**.

Never describe Ascent as a creative, marketing, content, social media, or video
agency — in copy, meta tags, alt text, schema markup, or code comments. Content,
production and analytics are *components* of the system, never the product.

The product sells **certainty**, not content. The outcome is **business demand**,
not followers or reach.

## Architecture — non-negotiable

Full IA in `brand/05-site-architecture.md`.

Four pages only: **Home · About Us · Services · Let's Connect.** Never add a
fifth without displacing one. The contact page is always called *Let's Connect*.

Each page answers one question — why should I care · why should I trust them ·
what exactly do we get · how do we start. **Each section answers exactly one
business question.** If a section needs two headings of equal weight, it is two
sections.

Every page ends with the same **Connect With Us** block, identical everywhere.
Contact email: **contact@createwithascent.com**.

**Educate first, differentiate second, convert third.** Never reverse this order.

Homepage sections are fixed at **eleven** — see `brand/06-homepage.md`. Future
additions attach to an existing section (usually §09 Proof); they never become a
twelfth.

Only **one circular diagram per page.** Home §04 (the operating system loop) gets
it; §06 How We Work is a linear progressive reveal with a single return beat, not
a second circle. About §09 concludes with the loop typographically — no diagram.

The loop appears on three pages and must do a different job each time:
Home **asserts** it · Services **explains** it · About **concludes** with it.

Audience list, everywhere: startup founders · SaaS companies · CEOs ·
high-growth personal brands. Four entries, one wording.

Only two sections on the entire site may be pinned: Home §04 (Operating System)
and Home §06 (How We Work). Both are allocated. Nothing else can be pinned.

Three service pillars: **Content Strategy · Production · Metrics**, closing into
a loop — Metrics feeds back into Strategy. The five OS modules proposed in
Phase 1 are retired. Homepage introduces the pillars; Services explains them.
Never duplicate.

## Copy rules

- Short sentences. One idea per line.
- Write for founders, not marketers or designers.
- No exaggerated claims. Trust is earned through clear thinking, not adjectives.
- Banned words: innovative, cutting-edge, revolutionary, world-class, passionate,
  end-to-end, synergy, disruption, game-changing, seamless, unlock, elevate,
  supercharge, next-level, best-in-class.
- No exclamation marks. No urgency tactics. No countdown timers. No fake scarcity.
- Two CTAs only, everywhere: **Book a Strategy Call** (primary) and **WhatsApp**
  (secondary). No competing CTAs — no newsletter signups, downloads, extra
  forms, or pop-ups. The site has one job: start qualified conversations.
- Write for scanning. The headline-only reading must still deliver the argument.

## Design rules

Full system in `brand/03-design-system.md`. Overrides logged in
`brand/00-decisions.md`.

- Warm off-white `#FAFAF8` dominates. Pure white signals elevation, not
  background. Never busy backgrounds.
- Consume tokens from `tokens/tokens.css`. Never hardcode a hex, px size,
  radius or duration in a component.
- **Brand blue `#0597FF` is used intentionally, never excessively.** Never use
  blue because empty space exists — whitespace is preferable.
- **Anything blue that carries or outlines text uses `--blue-700` `#0870BA`.**
  Buttons, links, focus rings. `#0597FF` fails AA against both white text and
  the off-white ground. Everything non-text stays `#0597FF`.
- Typography creates hierarchy; colour does not. If a layout only reads once
  the blue is applied, the layout is wrong.
- No sharp corners, no excessive rounding. 14 / 18 / 20 / 24 / 28px.
  `999px` is for avatars and dots only, never buttons.
- Shadows are almost invisible. Depth comes from spacing. Never a heavy shadow.
- Gradients from the blue family only, and extremely subtle. If it reads as a
  gradient, it is too strong.
- Never rely on colour alone — pair with an underline, icon, label or weight.
- No glassmorphism, neon glows, blobs, 3D icons, emoji, filled icons, or stock
  office photography.
- Maximum paragraph width 70 characters. Break every 2–4 lines.

## Visual identity — Editorial Blueprint × Premium 3D

Full system in `brand/09-blueprint-system.md`. **D-06 is resolved:** deep
sections are in, treated as architectural blueprint.

- **Two surfaces, one language.** *Blueprint* `#082236` where the system is
  explained (Home §04, §11 · Services §02, §06 · About §04). *Whiteprint* on
  `#FAFAF8` everywhere else — same vocabulary, run quieter.
- Six devices, nothing else: construction grid · extension rules · registration
  marks · mono annotation · leader lines · two line weights (0.5px measures,
  1px structures).
- **Everything is drawn.** Fills are for an active node only. Depth comes from
  line weight and Z position, never from shadow.
- Every mark must describe something real. A mark added because a composition
  looked bare is decoration, not a blueprint.
- **CSS transforms only — no WebGL, no Three.js, no canvas.** Perspective
  1600px. Base tilt 6°, pointer ±3°, scroll-driven 4°.
- Depth carries meaning: layers separate as the explanation deepens. Where depth
  means nothing, don't add it.
- **The flat-legibility test:** every 3D composition must read completely with
  all transforms removed. If flattening loses information, it was never
  communicated.
- One 3D composition per page. Pointer tilt is off on touch and under reduced
  motion.
- Never: wireframe globes · rotating cubes · particle fields · glowing edges ·
  glass panes · isometric city illustrations · shadows on 3D layers · anything
  that idles on its own.

## Motion rules

Full system in `brand/04-motion.md` (Phase 3, approved).

- **Motion is communication, not decoration.** If it doesn't explain something,
  reinforce hierarchy, or guide attention, remove it.
- Every animation belongs to exactly one hierarchy level: 1 micro · 2 component ·
  3 section · 4 cinematic. If you can't name the level, cut it.
- **Level 4 is a fixed budget of four moments site-wide** — Hero, Operating
  System, Transformation, Connect With Us. Never a fifth.
- **The signature reveal is opacity → translateY → blur-to-sharp.** One reveal,
  used everywhere. It already hits the three-transformation cap, so never layer
  scale, tracking or rotation on top of it.
- Hover 150–200ms · cards 250ms · component 350ms · section 450ms · page
  transition 500ms · hero 700ms. **Never exceed 1000ms.**
- Three easing curves only. Spring is Level 1 only and must be critically
  damped — visible overshoot is a bounce, and bounce is banned.
- Reveal once. Never re-animate on scroll-back.
- Stagger 80ms, capped at 6 siblings.
- **Blur budget:** max 3 blurred elements animating at once, 8px ceiling, never
  on large images or video, off below 768px, first thing dropped under load.
- Pinned sections: max 2 site-wide, max 2 viewport heights, static below 1024px,
  legible at every scroll position. Never pin decorative content.
- Animate `opacity` / `transform` / `filter` only. Never `width`, `height`,
  `top`, `left`, `margin`. 60fps floor on a mid-range Android.
- Never: bounce · elastic · rotating or spinning text · morphing logos or
  navigation · continuously animating icons · spinners · repeating counters ·
  dramatic zoom · site-wide scroll snap.
- `prefers-reduced-motion` turns off smooth scroll, parallax, pinning, blur and
  large transitions. Micro-interactions stay — colour and border changes are
  feedback, not motion. Content must be complete without motion.

## Stack (Phase 3 onward)

Next.js App Router + TypeScript + Tailwind + Framer Motion, deployed on Vercel.
Tailwind theme is generated from `tokens/tokens.json` — edit the token file,
not the Tailwind config.

## Accessibility floor

- Body text ≥ 4.5:1. Large text ≥ 3:1. UI borders and focus rings ≥ 3:1.
- Every interactive element has a visible focus state in `--blue-700`.
- Keyboard reachable in visual order.
- Every form field has a real label. Placeholders are not labels.

## What is still open

D-06 (dark sections — keep or drop), the typeface decision (one self-hosted
family vs. the stated stack), the five OS module names, the founder time
commitment figure, and all proof content. Everything else in `brand/` is
decided.
