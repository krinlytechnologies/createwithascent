# Ascent Studios

Personal Brand Operating Systems for founders.

This repository holds the brand foundation, the design system, and the website.

---

## Running it

```bash
npm install
cp .env.example .env.local   # optional — booking + WhatsApp destinations
npm run dev                  # http://localhost:3000
```

`npm run build` · `npm run lint` · `npm run typecheck`

**Stack** — Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Lenis · Geist · Lucide.

The Tailwind theme lives in [`styles/globals.css`](styles/globals.css) under
`@theme`, mirroring [`tokens/tokens.css`](tokens/tokens.css). Never hardcode a
hex, radius or duration in a component — extend the theme.

```
app/                 routes + root layout
components/layout/   Navbar, MobileMenu, Logo, SmoothScrollProvider
components/home/     Hero, HeroVisual
components/ui/       Button, Container, Reveal
hooks/               useScrolled, useMediaQuery, useLockBodyScroll
lib/                 site constants, motion system, utils
styles/              globals.css — the Tailwind theme
```

### Build progress

| Section | Status |
|---|---|
| Navigation | ✅ Built |
| Home §01 Landing sequence | ✅ Built — scroll-driven cinematic intro |
| Home §02 The Problem | ✅ Built |
| Home §03 The Shift | ✅ Built |
| Home §04 Operating System | ⚠️ Built, **needs rebuilding** for the blueprint system |
| Home §05 What We Do | ✅ Built |
| Home §06 How We Work | ✅ Built — **pinned** |
| Home §07–§11 | Not started |
| About · Services · Let's Connect | Not started |

**Pins:** the landing sequence, plus §04 and §06. The mid-page cap of two is
fully allocated — a third mid-page pin must displace one of them.

**Assets:** the sky is encoded and done — AV1 653 KB / VP9 789 KB / H.264
1.40 MB, from 4.77 MB. **`cloud.png` is the blocker**: 408 × 611 portrait where
the composition needs a 3000 × 1500 landscape bank. Landing polish is paused
until it lands. Full brief in
[`public/assets/README.md`](public/assets/README.md).

`/about`, `/services` and `/lets-connect` are in the navigation as the real
information architecture; those routes land when their phases are built.

---

## Phase index

| Phase | Scope | Status |
|-------|-------|--------|
| **1** | Brand foundation & creative direction | ✅ Complete |
| **2** | Design system & visual language | ✅ Complete |
| **3** | Motion design system & scroll storytelling | ✅ Complete |
| **4** | Information architecture & experience flow | ✅ Complete |
| **5** | Homepage experience architecture | ✅ Complete |
| **6** | About page experience & storytelling | ✅ Complete |
| 7 | Services page — full specification | Content received, spec pending |
| 8 | Let's Connect page | Not started |
| 9 | Content & copywriting | Not started |
| 10 | Build — Next.js scaffold, component library, launch | Not started |

---

## Deliverables

```
brand/
  00-decisions.md             Every decision that changed, and why. Read second.
  01-creative-direction.md    The governing philosophy. Read first.
  02-positioning.md           Positioning, message hierarchy, voice, draft copy.
  03-design-system.md         PHASE 2. Colour, type, layout, components, imagery.
  04-motion.md                PHASE 3. Motion hierarchy, scroll, performance.
  05-site-architecture.md     PHASE 4. Pages, sections, journey, conversion.
  06-homepage.md              Home — all eleven sections, in full.
  07-services.md              Services — the three pillars. Provisional until Phase 7.
  08-about.md                 About — ten sections, philosophy over biography.
  09-blueprint-system.md      The visual identity. Blueprint × 3D. D-06 resolved.
tokens/
  tokens.css                  CSS custom properties. Source of truth.
  tokens.json                 Same values, machine-readable. Feeds the Tailwind theme.
CLAUDE.md                     Working rules for anyone (human or agent) building here.
```

---

## Locked

- **Positioning** — Personal Brand Operating Systems. Never an agency of any kind.
- **Brand blue** — `#0597FF`. Used intentionally, never excessively.
  Text-bearing uses take `#0870BA`.
- **Ground** — warm off-white `#FAFAF8`, dominant. Pure white signals elevation.
- **Typography** — Helvetica-inspired sans. Typography carries hierarchy, not colour.
- **Shape** — 14 / 18 / 20 / 24 / 28px. No sharp corners, no excessive rounding.
- **Motion** — one signature reveal (opacity → Y → blur-to-sharp), four
  hierarchy levels, four cinematic moments site-wide, 1000ms ceiling.
- **Architecture** — four pages: Home · About Us · Services · Let's Connect.
  Every page ends with the same Connect With Us block. One destination:
  Book a Strategy Call, or WhatsApp.
- **Stack** — Next.js (App Router, TypeScript) + Tailwind + Framer Motion, on Vercel.

### Accessibility corrections applied

Three Phase 2 colour values fail the WCAG AA standard the same brief requires:
white text on a `#0597FF` button (3.05:1), `#0597FF` link text on the off-white
ground (2.92:1), and `#8B8B8B` at caption size (3.26:1).

`#0597FF` is retained as the brand blue for every non-text use. `#0870BA` — one
step down the same hue — carries text, links and focus rings. Detail in
`brand/00-decisions.md`.

## Open

| Item | Blocks |
|---|---|
| **D-45** — one CTA label site-wide: "Book a Strategy Call" or "Book a Call" | Copy, analytics |
| "Not for" list in Home §07 — confirm it stays | Homepage copy |
| Booking URL and WhatsApp number | Working CTAs |
| Grid density below 768px — 24px minor, no major? | §04 rebuild |
| Founder time commitment — a defensible number | Content |
| Proof assets — artefacts, outcomes, attribution | Content |

---

## The one rule

Before adding any section, animation, interaction, or visual element:

> Does this help a founder understand why Ascent is different?

If no, it doesn't belong.
