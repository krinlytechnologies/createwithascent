# 04 — Motion Design System & Scroll Storytelling

**Phase 3.** Approved. This defines *how things move* — not what they say
(content phases) or how pages are structured (Phase 4).

Timing and easing values are authoritative in `tokens/tokens.css`.
Implementation — GSAP timelines, Framer Motion code, Lenis config, Three.js,
component structure — is deliberately deferred.

> Supersedes the Phase 1 motion draft. Override log in `00-decisions.md`.

---

## Philosophy

**Motion is communication. Motion is not decoration.**

Every animation explains something, reinforces hierarchy, or guides attention.
If an animation does not improve understanding, remove it.

The visitor should never think *"that's a cool animation."* They should think
*"this website feels incredibly polished."*

The best motion goes unnoticed.

**Is** — calm · intentional · premium · responsive · elegant · invisible

**Is not** — flashy · chaotic · playful · excessive · distracting

---

## Motion hierarchy

Four levels. Every animation on the site belongs to exactly one. If you cannot
name the level, the animation has no reason to exist.

| Level | Scope | Purpose | Budget |
|---|---|---|---|
| **1 — Micro** | Hover, buttons, cards, links, nav, icons | Feedback | Unlimited. Every interactive element. |
| **2 — Component** | Cards, images, typography entering viewport | Guide attention | Most sections. |
| **3 — Section** | Full section reveals, pinned sections, background transitions | Tell the story | A few per page. |
| **4 — Cinematic** | Hero · Operating System · Transformation · Connect With Us | Create memory | **Four moments. Site-wide.** |

Level 4 is a fixed budget, not a guideline. A fifth cinematic moment does not
add a fifth memory — it devalues the other four. Everything outside those four
stays restrained.

---

## Timing

| Interaction | Duration | Level |
|---|---|---|
| Hover | 150–200ms | 1 |
| Cards | 250ms | 1–2 |
| Component reveal | 350ms | 2 |
| Section reveal | 450ms | 3 |
| Page transition | 500ms | 3 |
| Hero reveal | 700ms | 4 |

**Never exceed 1000ms.** Anything longer reads as a delay, not as elegance.

Page *fade* (300ms, first paint) and page *transition* (500ms, route change) are
separate. The first is content appearing; the second is content replacing
content, which needs longer to stay legible.

## Easing

| Token | Curve | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default. Anything entering or revealing. |
| `--ease-inout` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes, things that move and settle in place |
| `--spring-micro` | stiffness 380, damping 32 | **Level 1 only.** Critically damped. |

The spring is permitted for tiny interactions only, and must be tuned so
overshoot is effectively zero. A spring that visibly overshoots is a bounce, and
bounce is prohibited. **Never bounce. Never elastic.**

No `linear` except indeterminate progress. No curves outside these three.

---

## The signature reveal

One reveal, used everywhere, is what makes a motion language recognisable.

```
opacity     0    →  1
translateY  +Yd  →  0
blur        6px  →  0
```

Opacity, then Y translation, then blur to sharp. This is the site's signature
and it is the reason a visitor subconsciously recognises an Ascent page.

**Never combine more than three transformations.** The signature reveal is
already at that cap — so nothing else may be added on top of it. No scale, no
rotation, no tracking change layered onto a signature reveal.

### Travel distance by level

| Level | translateY | Blur | Duration |
|---|---|---|---|
| 1 — Micro | 0–4px | none | 150–200ms |
| 2 — Component | 16px | 4px | 350ms |
| 3 — Section | 24px | 6px | 450ms |
| 4 — Cinematic | 32px | 8px | 700ms |

Blur never exceeds 8px. Beyond that it stops reading as focus and starts
reading as a broken image.

### Trigger rules

- Fire at **15% of the element in view**.
- **Reveal once.** Never re-animate on scroll-back. Re-animating tells the
  visitor the page is performing for them, and makes re-reading a section
  actively irritating.
- **Stagger 80ms**, capped at **6 siblings** — 6 × 80ms = 480ms, which keeps the
  full group inside the 1000ms ceiling. Beyond six, reveal the group as one block.
- Fast scroll must land on the end state, never a half-drawn frame.

---

## Scroll

### Global feel

Scrolling should feel physical, natural, continuous and fluid. The page feels
connected, never segmented.

Smooth scrolling is enabled globally with **slight** momentum. Never exaggerated
inertia. Scrolling must remain responsive — input to movement should feel
immediate.

> **Engineering constraint — read before implementing.** Momentum scroll
> replaces the browser's native scroll. Done carelessly it breaks
> find-in-page, keyboard `Page Down` / `Home` / `End`, anchor jumps, focus
> scrolling, and the scrollbar position on some browsers. It also feels worst on
> the input founders actually use — a trackpad, which already applies its own
> momentum, so the two compound.
>
> Non-negotiable requirements: lerp kept low enough that motion settles within
> ~100ms of input stopping; native keyboard scrolling and anchor navigation
> preserved; focus-triggered scroll never fights the smoothing; disabled
> entirely under `prefers-reduced-motion`. If it cannot meet these, ship native
> scroll — it is better than a smooth scroll that fights the user.

### Scroll storytelling

The homepage unfolds like a documentary. Every scroll reveals the next chapter,
and the visitor is never lost.

**Each section answers one question before introducing the next.**

### Scroll rhythm

```
Heavy information  →  Whitespace  →  Animation  →  Next idea
                   →  Whitespace  →  Next chapter
```

The site breathes. Never overwhelm. Whitespace is part of the motion system —
the pauses between animated moments are what make the animated moments land.

### Scroll-triggered animation

Permitted transforms: fade · translate · blur reduction · scale · opacity.
Maximum three per element.

### Scroll-linked animation

Progress follows scroll position. Ideal for: **Timeline · Operating System ·
Process · Transformation.**

Not to be used everywhere. Requirements:

- Scrubbable in both directions, with no state that only exists going down.
- The end state is reached if the user scrolls fast.
- Content is legible at every progress value, including 0 and 1.

### Sticky / pinned sections

**Pinning is rare.** Only where content genuinely requires explanation:
*How We Work · Operating System · Transformation.*

**Never pin decorative content.**

| Constraint | Value |
|---|---|
| Maximum pin length | 2 viewport heights |
| Maximum pinned sections | 2 site-wide |
| Minimum viewport | 1024px — static stacked below |
| Legibility | Complete at any scroll position, including the first frame |
| Escape | Fast scroll reaches the end state immediately |

Beyond two viewport heights, a pin stops being storytelling and becomes a
hostage situation.

### Parallax

Subtle depth. Almost subconscious.

| Layer | Movement |
|---|---|
| Background | 5% |
| Midground | 15% |
| Foreground | 25% |

Percentages are of scroll distance through the section, with **absolute travel
capped at 120px** so a tall section does not produce a large slide.

Parallax applies to visual layers. Typography moves according to the kinetic
typography rules below, not as a parallax layer.

### Horizontal scroll

Only when comparing information: *Case Studies · Client Journey · Portfolio.*

Never force users sideways unnecessarily. A horizontal section must be
navigable by keyboard and must not trap vertical scrolling.

### Scroll snap

Full-screen storytelling only. Never across the whole site. **Visitors remain in
control** — snap that fights a deliberate scroll is a bug, not a feature.

---

## Element rules

### Kinetic typography

Typography is allowed to move. **Not to dance.**

Permitted: scale · opacity · tracking · line reveal · mask reveal · letter
spacing.

Never rotate words. Never spin text. Never distort typography.

Line and mask reveals are the strongest available device and should be reserved
for Level 3 and 4 moments. Used on every heading they become wallpaper.

### Images

Fade · reveal · scale to **1.03 maximum**.

Never zoom dramatically. Never rotate.

### Cards

Hover: lift · border highlight · shadow increase · scale to **1.02 maximum**.

### Buttons

Hover: lift **2–4px** · shadow increase · background transition · optional icon
slide.

Never bounce. Default to 2px; 4px is the ceiling for Level 4 CTAs only.

### Icons

Micro-interaction only. **Never continuous animation.** A permanently animating
icon is a distraction with no information content.

### Navigation

Fade background · blur · compress.

Never jump. Never disappear unexpectedly. The nav is the visitor's anchor —
it must behave predictably at every scroll position.

### Counters

Numbers may count up. **Once.** Never repeat, never re-trigger on scroll-back.

### Marquee

If used: very slow, very subtle, never distracting. Must pause on hover and
under reduced motion.

### Morphing transitions

Reserved for cards · buttons · CTA · section transitions.

**Never morph logos. Never morph navigation.**

### Bento transitions

Cards may expand, collapse and transform. **Maintain spatial continuity** — the
visitor must always understand where a thing came from and where it went. A
transform that breaks that thread is a cut, not a transition.

---

## Choreography

### Loading

Minimal, elegant, fast. **No spinners.**

Prefer: logo fade · simple progress · editorial transition.

A loading screen on a marketing site is decoration with a progress bar attached.
If the site is fast, there is nothing to cover.

### Hero

Reveal order — not everything at once:

```
Headline  →  Supporting copy  →  CTA  →  Visual  →  Background accent
```

700ms, Level 4. This is the first thing a founder sees and it sets the tone for
everything after it.

### Section transitions

Each section feels connected to the last. Avoid abrupt cuts.

Permitted devices: typography becomes the next section's heading · a card
expands into the next section · background colour shifts · a divider fades ·
whitespace increases.

### Final CTA

Should feel special: background transition · headline reveal · buttons appear ·
subtle emphasis.

**Never aggressive.** The close is confident, not urgent.

---

## Emotional journey

Motion reinforces the sequence established in `01-creative-direction.md`.

| Section | Emotion | Motion's job |
|---|---|---|
| Hero | Curiosity | Reveal in order. Invite the scroll. |
| Problem | Recognition | Restrained. Let the words land unassisted. |
| Solution | Relief | The shift itself — a background or surface change |
| Operating System | Confidence | Scroll-linked assembly. The system builds. |
| Proof | Trust | Quiet. Evidence does not need choreography. |
| CTA | Action | Emphasis without pressure |

Note that Problem and Proof are deliberately the *least* animated sections on
the page. Recognition and trust are damaged by decoration — a founder reading
their own experience back to them does not need it to slide in.

---

## Performance

**60fps is the floor, measured on a mid-range Android phone** — not on the
designer's laptop.

**Animate:** `opacity`, `transform`, `filter` (sparingly).

**Never animate:** `width`, `height`, `top`, `left`, `margin`, or any property
that triggers layout.

### The blur constraint

The signature reveal uses blur, and blur is the most expensive thing in this
system. `filter: blur()` forces an offscreen render pass per element per frame,
and it is the single most reliable way to drop below 60fps on mobile.

Rules that keep the signature reveal affordable:

- Maximum **3 blurred elements animating simultaneously**.
- Never blur a large image, a full-bleed background, or a video.
- Blur applies to Level 2–4 reveals only. Never to Level 1.
- Below 768px, the signature reveal drops blur and runs opacity + Y only.
- If a device cannot hold frame rate, blur is the first thing dropped — the
  reveal still reads correctly without it.

### General

- `will-change` applied only for the duration of the animation, then removed.
  Left on permanently it costs memory and can make things slower.
- `IntersectionObserver` over scroll listeners. Any genuine scroll listener is
  passive and rAF-throttled.
- **No layout shift.** Reserve space for anything that reveals. CLS under 0.1.
- Above-the-fold motion must not delay LCP. The hero's first frame is the
  headline, not an empty box waiting for JavaScript.

---

## Reduced motion

Under `prefers-reduced-motion: reduce`:

| Feature | Behaviour |
|---|---|
| Smooth scrolling | **Off.** Native scroll. |
| Parallax | Off. Layers static. |
| Pinned sections | Off. Static stacked content. |
| Blur | Off. |
| Large transitions | Reduced to opacity only. |
| Counters | Show the final number immediately. |
| Marquee | Static. |
| Micro-interactions | Retained — colour and border changes are feedback, not motion. |

**Maintain usability.** Every piece of content must be complete and reachable
without motion, because for some visitors it will be. A pinned section that only
makes sense while pinned is a content failure, not a motion failure.

---

## Consistency

The site has a recognisable motion language. Visitors subconsciously recognise
the patterns. **Consistency creates polish.**

Practically: one reveal, three easing curves, four cinematic moments, one
stagger value. A second reveal pattern introduced "just for this section" is how
motion systems decay.

---

## Inspiration

Draw from Apple's product storytelling, Visuvate's editorial pacing, and Meld's
refined micro-interactions.

Do not imitate layouts or choreography directly. The motion identity must be
original and must serve Ascent.

---

## The motion gate

Before adding any animation:

1. **Which level is it?** If you cannot name it, cut it.
2. **What does it explain?** If the answer is "it looks nice", cut it.
3. **Does it survive reduced motion?** If the content breaks without it, redesign.
4. **Does it hold 60fps on a mid-range Android?** If not, simplify it.
5. **Is this a fifth cinematic moment?** Then it isn't cinematic. Restrain it.
