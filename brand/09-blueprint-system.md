# 09 — Editorial Blueprint × Premium 3D

**D-06 resolution.** The visual identity of Ascent Studios.

> The Personal Brand Operating System becomes the visual identity of Ascent
> Studios. It combines the precision of an architectural blueprint with subtle
> 3D spatial interactions. The goal is not to impress users with technology, but
> to make the operating system feel **tangible**.

---

## Why this is the right metaphor

An operating system is infrastructure. A blueprint is how infrastructure is
communicated *before it exists*. That is precisely what Ascent sells — the
system underneath the content, described before it is built.

It also solves a constraint that has been open since Phase 2. The design system
forbids fake dashboards, stock illustration, SaaS UI mockups and generic
marketing graphics, but never named what should be used instead. Blueprint is
the answer: a legitimate visual language, drawn rather than decorated, that
carries technical precision without borrowing software's clothes.

**The governing rule:** the blueprint describes something real. Every
annotation, dimension and mark refers to an actual part of the system. The
moment a mark is added because the composition looked bare, it stops being a
blueprint and becomes decoration.

---

## Two surfaces, one language

"Visual identity" cannot mean the whole site turns dark — the design system
specifies an off-white ground that dominates. The resolution is that the
blueprint has **two states**, the way a technical drawing does.

| | **Blueprint** (deep) | **Whiteprint** (paper) |
|---|---|---|
| Ground | `#082236` navy | `#FAFAF8` off-white |
| Grid | Blue-300 at 6–10% | Line at 40–60% |
| Ink | `#FAFAF8` | `#111111` |
| Annotation | `#A9B6C2` | `#5F6368` |
| Accent | `#7EC7FC` | `#0870BA` |
| Where | Home §04 · Home §11 · Services §02, §06 · About §04 | Everywhere else |

Both carry the same vocabulary — grid, hairlines, extension rules, registration
marks, mono annotation, leader lines, drawn-not-filled. The paper surface simply
runs it quieter.

This is how one identity spans a mostly-light site: **the deep surface is where
the system is explained; the light surface is where it is referenced.**

---

## Blueprint vocabulary

Six devices. Nothing else.

### 1. The construction grid

A visible measuring field, not a texture. 32px minor, 160px major, drawn with
`repeating-linear-gradient` so it costs no DOM and no JavaScript.

Never above 10% opacity on deep, 60% of `--color-line` on paper. **The grid must
never reduce text contrast** — measure it, do not eyeball it.

### 2. Extension rules

Hairlines that run past the content they measure, the way a dimension line
overshoots its object. This is what makes a layout read as *drawn* rather than
*boxed*.

Rules extend to the container edge, or a clean 32px past the element. Never a
random length.

### 3. Registration marks

Small crosses at genuine structural intersections — where a section's measuring
lines meet, where a composition is anchored.

Maximum four per composition. They mark alignment; they are not confetti.

### 4. Mono annotation

Labels set in mono, 12px, 0.14em tracked, uppercase. They sit **outside** the
thing they annotate and connect to it with a leader line.

Annotations must be true: a stage index, a real count, an actual dimension.
`R.240` is acceptable if something is genuinely 240. Invented technical noise is
the fastest way to make this look like a template.

### 5. Leader lines

A thin horizontal rule from the annotation to a small tick on the object.
Weight matches the grid, not the structure.

### 6. Line weight as hierarchy

Two weights, and only two:

- **0.5px** — grid, extension rules, leader lines
- **1px** — structure, panel edges, active state

Everything is drawn. Fills are reserved for a filled node marking an active
state, and for nothing else. **Depth comes from line weight and Z position, not
from shadow.**

---

## The 3D system

The stated goal is **tangible, not impressive**. Every constraint below follows
from that sentence.

### CSS transforms only

**No WebGL. No Three.js. No canvas.** Three reasons, in order of weight:

1. The motion system sets a hard floor of 60fps on a mid-range Android phone.
2. Lighthouse 95+ is a stated target, and a 3D runtime is a large parcel of
   JavaScript on the critical path.
3. The brief itself says the point is not to impress with technology. A WebGL
   scene announces its own technology; a tilted drawing does not.

If a future moment genuinely cannot be expressed in CSS transforms, that is the
conversation to have then — not a default to reach for now.

### Long focal length

```
perspective: 1600px
```

Short perspective (600px and below) reads like a game engine. Long perspective
reads like an axonometric drawing — the object is described, not staged. This
single value does more to keep the system premium than any other.

### Planes, not objects

The 3D is **layered flat planes separated in Z**. Nothing is modelled. Parallax
comes free from perspective rather than being animated, which is why it stays
cheap and why it never over-runs.

### Rotation caps

| Motion | Cap |
|---|---|
| Base viewing angle (static) | 6° on X |
| Pointer response | **3°** on each axis, damped |
| Scroll-driven change | 4° total across a whole section |

Beyond these it stops reading as a drawing on a desk and starts reading as a
gimmick. The motion system already bans dramatic camera movement; these are the
numbers that make that enforceable.

### Depth as meaning

Z separation is not decoration — it carries the argument. **Layers separate as
the explanation deepens.** In Home §04 the planes begin nearly flat and pull
apart in Z as each stage activates, so the visitor literally sees a single
surface resolve into a system.

That is the only justification for depth on this site. Where depth doesn't mean
anything, don't add it.

### Pointer response

The tangible moment. The composition tilts subtly toward the cursor, damped by
a lerp so it trails rather than tracks.

- Maximum 3° on each axis
- rAF-throttled, one write per frame, `transform` only
- **Off on touch** — there is no cursor, and hover emulation on touch is a bug
- **Off under reduced motion**
- `will-change: transform` applied on pointer-enter and removed on leave, never
  left on permanently

---

## The flat-legibility test

> **Every 3D composition must be completely legible as a flat 2D drawing with
> all transforms removed.**

This is the discipline that keeps the system honest, and it mirrors the
reduced-motion rule that already governs the site. If flattening the composition
loses information, the information was encoded in the effect — which means it
was never really communicated.

Test it by setting `transform: none` on the stage. If it still reads, ship it.

---

## Constraints

- **One 3D composition per page.** Two is a portfolio, not a system.
- Grid visible on deep surfaces; on paper it appears only inside a composition,
  never behind body copy.
- No shadows on 3D layers. They are expensive and they fight the drawn look.
- No rotation on typography, ever — kinetic typography rules still apply.
- No auto-rotating, floating or idling objects. The composition is still until
  the visitor acts on it or scrolls it.
- Registration marks and annotations must refer to something real.

## Never

Wireframe globes · rotating cubes · particle fields · glowing edges · glass
panes · isometric city illustrations · animated gradient meshes · anything that
idles on its own.

Each of these is a way of asking for attention. The brand does not ask.

---

## Where it applies now

| Location | Surface | Composition |
|---|---|---|
| **Home §04** Operating System | Blueprint | The full system, layers separating in Z as stages activate |
| **Home §11** Connect With Us | Blueprint | No composition — surface only. The close is typographic. |
| **Home §01** Hero | Whiteprint | Existing panel composition, restated in blueprint vocabulary |
| **Home §05** What We Do | Whiteprint | Grid-aligned columns, extension rules, annotation |
| Services §02, §06 | Blueprint | The loop, explained |
| About §04 | Blueprint | The missing layer |

**Consequence for what is already built:** Home §04 currently renders on paper
with a node spine. It now needs the blueprint surface and the Z-separating
composition. §01 and §05 need the vocabulary applied, not rebuilding.

---

## Open

**Grid density on mobile.** A 32px grid at 375px wide is visually busy. Likely
resolution: 24px minor and no major grid below 768px. Confirm when §04 is rebuilt.
