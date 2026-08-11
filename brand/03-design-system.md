# 03 — Design System & Visual Language

**Phase 2.** This is the permanent visual language. Every page, interaction and
animation in later phases conforms to it.

Values are authoritative in `tokens/tokens.css` and `tokens/tokens.json`.
This document explains why, and how to apply them.

> **Supersedes the Phase 1 visual system.** Brass accent, serif display, square
> corners and near-zero depth are all withdrawn. Positioning, voice and the
> operating-system model in `01` and `02` are unaffected. Full override log in
> `00-decisions.md`.

---

## Philosophy

The design system is not a collection of UI components. It is a visual language
that communicates who Ascent is before a single word is read.

The interface never impresses through complexity. It impresses through clarity.

**Good design disappears.** Visitors should remember the message, not the
interface.

Every screen belongs to the same ecosystem — the intersection of Apple, Linear,
Notion, Visuvate and Meld, resembling none of them. Timeless, not trendy.

---

## Colour

### The brand blue

```
#0597FF
```

The heartbeat of the interface. Used intentionally, never excessively.

Reserved for: primary CTA · links · interactive and hover states · active
navigation · icons · highlights · important metrics · progress indicators ·
motion accents.

**Never use blue simply because empty space exists. Whitespace is preferable.**

### The ramp

Derived from `#0597FF` at hue 205°, so every step reads as the same blue.

| Token | Value | Use |
|---|---|---|
| `--blue-50` | `#F0F9FF` | Lightest wash, callout blocks |
| `--blue-100` | `#D7EEFE` | Hover backgrounds, section transitions |
| `--blue-200` | `#B4DFFD` | Illustration accents |
| `--blue-300` | `#7EC7FC` | Accent on deep surfaces |
| `--blue-400` | `#3FAEFD` | Motion layers, decorative |
| **`--blue-500`** | **`#0597FF`** | **The brand blue — non-text use** |
| `--blue-600` | `#0685E0` | Pressed and active fills |
| **`--blue-700`** | **`#0870BA`** | **Anything blue that carries text** |
| `--blue-800` | `#095890` | Pressed state of blue-700 |
| `--blue-900` | `#09314E` | Deep brand navy |

Gradients built from this family must be extremely subtle. No neon. No
saturation. If a gradient is noticeable as a gradient, it is too strong.

### Surface

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#FAFAF8` | Warm off-white. Dominates the experience. |
| `--color-elevated` | `#FFFFFF` | Cards, nav, dialogs — **only when elevation is required** |
| `--color-surface` | `#F5F7FA` | Cool panel surface |
| `--color-wash` | `#F0F9FF` | Occasional sky blue |

The off-white ground is the personality of the site: bright, open, breathable,
never cold. Pure white is an elevation signal, not a background.

> **Craft note.** `#FAFAF8` is warm (yellow-biased) and `#F5F7FA` is cool
> (blue-biased). Placed adjacent they read as a slight mismatch rather than a
> deliberate step. Either keep `#F5F7FA` for genuinely cool contexts — data
> panels, code, product screenshots — or warm it to `#F5F6F4`. Ground stays
> `#FAFAF8` either way. Your call; nothing else depends on it.

### Text

| Token | Value | Contrast on bg | Use |
|---|---|---|---|
| `--color-text` | `#111111` | 18.1:1 | Headlines, body |
| `--color-text-2` | `#5F6368` | 5.79:1 | Supporting copy |
| `--color-text-3` | `#6B7075` | 4.78:1 | Captions, meta — safe at any size |
| `--color-text-muted-lg` | `#8B8B8B` | 3.26:1 | **Large text only** — ≥24px, or ≥18.66px bold |

### Line

`--color-border` `#E5E7EB` · `--color-divider` `#ECECEC` ·
`--color-border-strong` `#D3D7DE`

Prefer whitespace to dividers. Use a border only when whitespace alone leaves
the relationship ambiguous. Never thick separators.

### Colour philosophy

Blue attracts attention. Whitespace creates elegance. Typography creates
hierarchy.

**Do not rely on colour to organise the interface.** If a layout only makes
sense once the blue is applied, the layout is wrong.

---

## Accessibility corrections

The brief requires WCAG AA. Three of its own colour specifications do not meet
it. These are the minimum changes that keep the brand intact and the site
compliant — nothing else was altered.

| # | Specified | Measured | Problem | Fix |
|---|---|---|---|---|
| 1 | White text on a `#0597FF` filled button | **3.05:1** | Fails AA 4.5:1 for normal text. This is the primary CTA on every page. | Filled buttons use `--blue-700` `#0870BA` → **5.22:1** |
| 2 | `#0597FF` as link text on `#FAFAF8` | **2.92:1** | Fails AA 4.5:1, and also the 3:1 minimum for focus rings and UI borders | Links and focus rings use `--blue-700` → **4.99:1** |
| 3 | `#8B8B8B` muted text at 14px caption | **3.26:1** | Fails AA 4.5:1 at that size | Captions use `--color-text-3` `#6B7075` → **4.78:1**. `#8B8B8B` stays valid at ≥24px |

**The rule this produces:** `#0597FF` remains the brand blue and is used
everywhere the brief specifies *except where it carries or outlines text*.
Icons, illustration, motion accents, progress fills, decorative shapes, active
indicators — all `#0597FF`. Buttons, links, focus rings — `#0870BA`.

The two sit one step apart on the same hue. Side by side they read as one
colour with a pressed state, which is exactly what they are.

**Never rely on colour alone.** Links carry an underline as well as blue.
Status carries an icon or label as well as a fill. Active navigation carries
weight or a rule as well as blue.

Also required: keyboard navigation for every interactive element, visible focus
states, adequate line height, and honoured `prefers-reduced-motion`.

---

## Typography

Typography is the primary visual element — not illustrations, not icons, not
animations. The interface is editorial. Headlines carry the experience.

### Family

Helvetica-inspired. Preferred order: **Helvetica Neue → Inter → Geist.**

Never decorative. Never futuristic. Never playful. Strong, minimal,
professional, confident, readable — never cute.

> **Recommendation.** As a fallback stack this renders Helvetica Neue on macOS
> and Inter (or Segoe/Arial) everywhere else. Those faces differ in width and
> x-height, so line breaks, headline wrapping and vertical rhythm shift between
> platforms — on a site where headlines carry the experience, that is visible.
>
> Ship **one** self-hosted family via `next/font` so every visitor sees the same
> composition. **Inter Display** is the closest match to the stated personality
> and has the tightest display tracking; **Geist** is the alternative if you
> want something marginally more distinctive. Keep Helvetica Neue as the
> intent, not the implementation.

### Scale

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero | 42 → 96px | 700 | 1.05 | −0.035em |
| Section heading | 32 → 64px | 700 | 1.10 | −0.025em |
| Subheading | 24 → 40px | 600 | 1.20 | −0.015em |
| Large body | 20 → 24px | 400 | 1.50 | −0.005em |
| Body | 18px | 400–500 | 1.60 | 0 |
| Small | 16px | 400 | 1.55 | 0 |
| Caption | 14px | 400 | 1.45 | 0 |
| Label / eyebrow | 12px | 600 | 1.20 | 0.10em, uppercase |

Sizes are fluid and clamped between the mobile and desktop values.

### Rules

- **Maximum paragraph width: 70 characters.**
- Never write walls of text. Break every 2–4 lines.
- **Use typography as whitespace.** The gaps between short paragraphs are doing
  layout work, not just separating sentences.
- Negative tracking at display sizes is mandatory. A grotesque set at 96px with
  default tracking is the clearest tell of an unconsidered site.
- Two type sizes per section, three maximum. Hierarchy comes from space and
  weight before it comes from size, and from size before it comes from colour.
- Body copy never centres.
- Never justify.

---

## Layout

Every page feels calm. The eye knows where to go without being told. Never
overwhelm.

| Token | Value |
|---|---|
| `--width-content` | 1280px |
| `--width-editorial` | 960px |
| `--width-reading` | 780px |

### Grid

| | Columns | Gutter | Container padding |
|---|---|---|---|
| Desktop | 12 | 32px | 64px |
| Tablet | 8 | 24px | 40px |
| Mobile | 4 | 16px | 24px |

### Section rhythm

Most websites feel crowded. This one shouldn't.

| Context | Space |
|---|---|
| Standard section | 160px |
| Large story section | 220px |
| Small components | 48px |
| Card padding | 32px |
| Internal component padding | 24–40px |

Both section values are clamped so mobile compresses gracefully without losing
the rhythm: `--section-y` and `--section-y-lg`.

### Visual hierarchy

Every section answers **one** question. Never show everything at once.

```
Large heading  →  Supporting copy  →  Visual  →  CTA
```

If a section needs two headings of equal weight, it is two sections.

---

## Shape

No sharp corners. No excessive rounding.

| Element | Radius |
|---|---|
| Buttons, inputs | 14px |
| Cards | 18px |
| Images | 20px |
| Floating elements | 24px |
| Large containers | 28px |

`999px` is available for avatars and status dots only — never for buttons.

**Nesting rule:** an inner radius should be roughly the outer radius minus the
padding between them. A 14px button inside a 32px-padded 18px card is correct;
an 18px control inside an 18px card looks like a mistake because the curves
run parallel.

---

## Elevation

Shadows are subtle. Almost invisible. Never dramatic.

| Token | Use |
|---|---|
| `--shadow-xs` | Inputs, quiet chips |
| `--shadow-card` | Cards |
| `--shadow-nav` | Floating navigation |
| `--shadow-modal` | Dialogs |
| `--shadow-cta` | Primary button hover only — the "subtle glow" |

Shadows are blue-black `rgba(16, 24, 40, …)`, not neutral black, so they sit
with the palette rather than greying it.

**Never create depth through large shadows. Use spacing.** If a component needs
a heavier shadow to read as separate, its spacing is wrong.

---

## Components

Every component feels handcrafted. Never generic. Never template-like. Buttons,
cards, forms, navigation, accordion, footer — all visibly one family.

### Buttons

| | Fill | Text | Border | Hover |
|---|---|---|---|---|
| **Primary** | `--blue-700` | White | — | `--blue-600`, lift −2px, `--shadow-cta` |
| **Secondary** | White | `--color-text` | 1px `--color-border` | Border `--blue-700`, background `--blue-50` |
| **Text** | — | `--blue-700` | — | Underline |

Radius 14px, weight 600, generous horizontal padding, confident but **never
oversized**. Transition 200ms.

### Cards

White surface, 18px radius, `--shadow-card`, 32px padding, minimal borders,
simple hover (lift −2px over 250ms). Never noisy.

A card is an elevation device. If content does not need separating from the
ground, it does not need a card.

### Forms

Minimal. Few fields. No unnecessary inputs. Whitespace around every field.
14px radius, `--color-border-strong` at rest, `--blue-700` on focus.

Every field has a visible label. Placeholder text is not a label.

### Navigation

Sticky. Transparent initially, then blur (`--blur-nav`) and a white surface
after scroll, with `--shadow-nav`. Simple, never oversized.

### Footer

Editorial. Minimal. Large spacing. Not cluttered.

---

## Iconography

Icons support content. They never replace it.

**Style:** outline, rounded caps, consistent stroke weight, simple geometry,
modern. One library, one stroke width, one grid — mixing sources is immediately
visible.

**Avoid:** 3D icons · emoji · cartoon icons · filled icons · inconsistent
libraries.

---

## Illustration

Minimal. Geometric. Editorial. Premium.

Use only when an illustration clarifies an idea. **Never to decorate empty
space** — empty space is already doing a job.

---

## Photography

Authentic. Founder-first. Professional. Natural lighting. Minimal editing.

**Preferred:** founders · real conversations · creative workspaces · strategy
sessions · minimal environments.

**Avoid:** corporate office handshakes · fake meetings · stock smiles · random
laptops · generic startup imagery.

### Product visuals

Every deliverable is presented like a **product**, not a service. Clean mockups,
premium presentation, soft lighting, editorial composition.

### Image quality

High resolution only. Consistent lighting, perspective and aspect ratio across
the whole site. No pixelation. No mixed treatments.

---

## Backgrounds

Mostly off-white. Some pure white. Occasional sky blue. Rare use of blue.

Never busy backgrounds.

> **Open decision — deep sections.** Phase 1 selected dark anchor sections and
> that choice was confirmed. This list does not include them. Tokens for a
> brand navy `#082236` are in place under `.deep` but unused, so the decision
> costs nothing either way. See `00-decisions.md` § D-06.

---

## Motion foundation

*Phase 2 defines the foundation only. The complete motion system is Phase 3.*

Motion feels invisible. Quick, natural, purposeful.

| Interaction | Duration |
|---|---|
| Hover | 200ms |
| Buttons | 200ms |
| Cards | 250ms |
| Page fade | 300ms |

Never bounce. Never rubber-band. Never flashy.

---

## Responsive

This is not a desktop site adapted for mobile. It is a responsive system.

On smaller screens: preserve visual hierarchy · **reduce complexity, not
quality** · maintain generous spacing · stack layouts naturally · keep CTAs
prominent and reachable.

Animation stays smooth without costing performance.

---

## Performance

**Premium means fast.** Optimise images, fonts, animation, video and any 3D
assets. Avoid unnecessary JavaScript and oversized media. The site should feel
lightweight despite rich interaction.

Practical floor: self-host and subset fonts, serve AVIF/WebP with explicit
dimensions, lazy-load below the fold, and keep above-the-fold JavaScript out of
the LCP path.

---

## Never

Generic SaaS templates · overused glassmorphism · neon glows · excessive
gradients · random blobs or abstract shapes · stock-office photography ·
generic dashboard illustrations · heavy drop shadows · inconsistent spacing ·
loud colour combinations · overly rounded interfaces · animation for the sake of
animation · auto-playing background video that distracts from content ·
marketing clichés presented as design.

Every visual decision must strengthen the brand and support the story.

---

## Validation checklist

Before any page is considered complete:

- [ ] The interface immediately feels premium.
- [ ] Typography communicates hierarchy before colour does.
- [ ] Whitespace is generous and intentional.
- [ ] Components are visually consistent.
- [ ] Brand blue is used strategically, never to fill space.
- [ ] Every interaction feels smooth and purposeful.
- [ ] The page is readable and uncluttered.
- [ ] The design feels original, not template-derived.
- [ ] Text meets AA contrast; nothing depends on colour alone.
- [ ] It reads as a premium partner for founders — not a creative agency.
