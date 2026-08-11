# 00 — Decision Log

Every decision that changed, and why. Newest phase first.

Rule of precedence throughout this project: **the client brief wins, then the
existing system, then my judgement.** Where a phase brief contradicts an earlier
proposal, the brief is applied without argument and the override is recorded
here.

---

## Build 15 — About rewritten in a human voice

Brief: the page should read "like a conversation between two founders over
coffee — honest, confident, and approachable." Story, not frameworks. Apple's
clarity, Airbnb's storytelling, Linear's simplicity. **Design carries the
sophistication; the language does not.**

Only `lib/about-content.ts` changed in substance. Two components were updated to
consume the new shape. No section was added, removed or reordered — the Build 14
architecture stands.

### ⚠️ This brief overrides a standing non-negotiable

| Rule | Status on About |
|---|---|
| "Ascent builds **Personal Brand Operating Systems**" — `CLAUDE.md`, positioning | **The phrase no longer appears on the About page.** The brief named "operating system" as jargon to remove, by name. |

Precedence applies: the client brief wins. The *idea* survives intact — About
still describes a repeating six-step month that compounds, which is what the
term meant. What is gone is the term. Home and Services are untouched and still
carry the positioning language, so the product name is not lost site-wide, but
this is now an inconsistency between pages and it is deliberate.

Also removed by name at the client's instruction: *convictions*, *distribution
engine*, *business asset*. Verified absent from the rendered page.

| Decision | Was | Now |
|---|---|---|
| D-123 | "Expertise is the asset. Distribution is the problem." | "We help founders become impossible to ignore." The hero states a benefit a founder recognises, not a diagnosis. |
| D-124 | "We didn't start an agency. We solved a pattern." | "We kept seeing the same thing happen." — followed by three beats that *are* the pattern, ending "So we started Ascent." Show, then name. |
| D-125 | **Convictions → beliefs** | "A few things we've learned." Each one reads as advice from experience: real experience beats trends · showing up weekly beats going viral once · trust takes time · your story can't be copied. |
| D-126 | **Operating System → how we work** | Six plain steps — learn · plan · create · share · listen · improve — each written as a sentence ("We learn about your business"). Closes with "Every month builds on the last. That's how great brands grow." |
| D-127 | The loop diagram keeps its centre label | "Continuous / System" → "Every month / builds on the last". The drawing was never the jargon; the caption was. |
| D-128 | **Who We Work With, personal not exclusive** | Four kinds of *people*, each with a reason: founders who've done the work · people building for the long term · people who'd rather be honest · anyone tired of posting into silence. No industry list. Grid went 4-up → 2-up to hold the added line. |
| D-129 | Closing CTA is an invitation | "Let's talk about your story." · "Thirty minutes, and no pitch." · "If we're not the right fit, we'll tell you." |

### What was held to

The banned-word list, no exclamation marks, two CTAs only, ≤70-character
measure, and every section answering exactly one question. The voice got warmer;
none of the discipline moved.

### Images

Stock photography was proposed mid-build and **withdrawn** — the client is
supplying assets. `EditorialImage.tsx` and `public/assets/about/*.jpg` remain in
the tree but are referenced nowhere. Either delete them or point the component
at the real assets when they arrive.

---

## Build 14 — About rebuilt as an immersive narrative

Copy roughly halved; motion carries what the paragraphs used to. Every section
holds one idea.

### ⚠️ This brief reverses standing prohibitions

Recorded plainly, because the About page now looks different from every other
page on the site and someone will eventually ask why.

| Now used on About | Previously banned by |
|---|---|
| Glassmorphism | Design system "Never" list · Phase 2 |
| Glows / accent lighting | "Neon glows", "glowing edges" |
| Gradient mist fields | "Random blobs or abstract shapes" |
| Particle → network sequence | "Particle fields" (blueprint system) |
| Continuous ambient motion | "Nothing that idles on its own" |
| Circular loop diagram on About | "One circle per page — Home asserts, Services explains, **About concludes typographically**" |
| Its own closing CTA | "Connect With Us, identical on every page" |
| Removal of the worked case study | Phase 6 validation: "§06 shows a real decision rather than describing a framework" |

The last two are the ones worth revisiting later. The worked example was the
page's strongest trust device — declaring a methodology is what every agency
does; showing one was the differentiator. And the closing block was a signature
precisely because it did not vary.

### What was held to regardless

| Constraint | Why |
|---|---|
| **CSS and SVG only** | No canvas, no WebGL, no new library. Mist is layered gradients, the network and loop are inline SVG, tilt is a transform. This is what keeps the 60fps floor and the Lighthouse target reachable. |
| **Tilt capped at 3°**, perspective 1600px | The blueprint system's caps. Off on touch, off under reduced motion, `will-change` cleared on leave. |
| **All ambient motion stops** under reduced motion | Mist, grid, marquee and loop rotation freeze. Every section reads complete without motion. |
| Marquee pauses on hover, `aria-hidden` | The conditions the motion system attaches to a marquee. |
| Transition sequence is **scrubbed** | Nothing plays on its own; the visitor drives it. |

### Structure

Hero (oversized, masked reveal) · We Exist · marquee · particle→network→pipeline
· belief cards · principles comparison · the loop · Built For · closing CTA.

### Verified — four pages, desktop and mobile

| Check | Result |
|---|---|
| `<h1>` per page | Exactly 1 |
| Contrast failures | **0** on all four pages |
| Glass card contrast, **measured from rendered pixels** | Background `rgb(251,252,252)`, ink at **18.37:1** |
| Page errors · console errors · failed requests | **0 / 0 / 0** |
| Horizontal scroll at 390px | None |
| Oversized elements | Only the ambient layers and marquee track, all inside `overflow: hidden` |

### Probe correction

The audit first reported the glass cards failing at 1.11:1. That was **a bug in
my probe**, not the page: Tailwind v4 emits `bg-surface/60` as
`oklab(0.999994 … / 0.6)`, and the naive number regex read `0`, `999994`, `0`
as an RGB triple. Confirmed by sampling actual rendered pixels, then the probe
was fixed to ignore backgrounds it cannot parse rather than guess at them.

Worth remembering: a contrast checker that cannot parse modern colour syntax
fails **silently and in the alarming direction**.

---

## Build 13 — The rest of the website

Homepage completed and the three remaining pages built. The intro was not
touched.

### Shipped

| Area | Detail |
|---|---|
| Home §07–§09 | **Why Ascent** (magazine spread — sticky argument, numbered reasons), **Credibility** (staircase of artefacts, not a grid), **Connect With Us** (85vh destination) |
| Footer | Logo, navigation, email, social slot, copyright. Nothing else. |
| `/about` | Belief opening · story · alternating beliefs · preference list · **a worked decision** · typographic close · two-sided fit |
| `/services` | Three pillars, one full section each, alternating side · the loop explained · fit |
| `/lets-connect` | No form at all. Three channels and an honest account of what happens on the call. |

Each section carries a different rhythm — sticky margin, alternating spread,
staircase, preference list, worked case, centred close — so no two read the same
way.

### Three defects the browser audit caught

**D-120 — `tailwind-merge` was silently deleting classes.** Its default
`font-size` group only knows t-shirt names (`text-sm`, `text-lg`). Ours are
semantic — `text-body`, `text-small`, `text-label` — so it classified them as
**colours** and treated `text-white text-small` as two competing colours,
dropping the first.

Consequences, all live: the **primary button rendered body-grey on action blue
at 2.72:1**, far under AA; every section label and navigation link lost its font
size. Fixed by declaring the sizes in `extendTailwindMerge`, which separates the
groups. One change, whole site.

**D-121 — every masked heading was invisible.** `LineReveal` put `whileInView`
on the element that starts translated a full height below its own box — entirely
outside its `overflow-hidden` wrapper. IntersectionObserver accounts for
clipping by ancestors, so it reported the line as never intersecting and the
animation never fired. The headings were present, opaque and permanently hidden.

Now observed with `useInView` on the unclipped wrapper. Variant propagation
through the mask was tried first and did not work; the explicit hook does.

**D-122 — footer tap targets were 18px tall.** WCAG 2.5.8 asks for 24px
minimum. Links and email now sit in 44px targets.

### Backgrounds

Cream tones (`#F5F5DC` / `#FFFDD0` / `#F7E6CA`) were applied and then reverted
on request. Back to warm off-white `#FAFAF8` with white elevation, plus
`--color-sand: #F4F4F1` — a barely-there neutral for banding sections apart
without introducing colour.

### Verified — four pages, desktop and mobile

| Check | Result |
|---|---|
| `<h1>` per page | Exactly 1 |
| Footer + Connect block | Present on every page (Connect is inlined on Let's Connect, which carries its own close) |
| Contrast failures | **0** across 107 / 71 / 71 / 35 elements measured |
| Page errors · console errors · failed requests | **0 / 0 / 0** |
| Horizontal scroll at 390px | None on any page |
| Elements wider than viewport | None |
| Tap targets | 44px |

Prefetch is re-enabled on navigation and CTAs now the routes exist.

### Note on the probes

`reveal.mjs` produced a false negative by not calling `emulateMediaFeatures` —
headless Chrome defaults to `prefers-reduced-motion: reduce`, which is a
different code path. Any probe touching motion must emulate a real visitor.

---

## Build 12 — Artwork corrections

Four faults reported from a screenshot. All fixed and confirmed by screenshot,
not by measurement alone.

| # | Fault | Fix |
|---|---|---|
| D-116 | `right.png` reversed — "soibutS" | **Mirror removed.** The two files are no longer identical (`left.png` was replaced after the earlier hash check), and `right.png` already reads the correct way round. |
| D-117 | Black "ASCENT / STUDIOS" printed over the artwork | **The live HTML wordmark is gone.** The words are baked into the artwork — measured lettering spans 1.6%–97.5% of `left.png` and 1.8%–98.6% of `right.png` — so the overlay was printing them a second time in navy. |
| D-118 | The mark was tiny | `clamp(64px, min(18vh, 16vw), 220px)`. **164px on desktop, up from 73px.** |
| D-119 | Composition | Clouds narrowed to `w-[38vw] md:w-[42vw]` so both words and the mark fit without the lettering being clipped. Verified: 0px clipped at the hold on both viewports. |

### ⚠️ The trap: Next's image cache served a stale file

After the fixes the page rendered **"Studios" on both clouds**, which looked
exactly like a bad asset. It was not.

`next/image` caches optimised output in `.next/cache/images` keyed by the source
URL. `left.png` had been replaced on disk, but the cache still held the previous
file's output and kept serving it. Clearing `.next/cache/images` resolved it
immediately and the scene rendered `Ascent · mark · Studios` correctly.

**Worth knowing for the rest of the project:** replacing an image in `public/`
without changing its filename can leave a stale copy being served. Clear
`.next/cache/images`, or version the filename.

Nearly reported the client's artwork as faulty on the strength of a screenshot.
Checking the cache first was the difference.

### Consequence of removing the live wordmark

The intro's brand name is now pixels rather than text — not selectable, not
searchable, and not translatable. This runs against the earlier "keep
typography as live HTML text" direction, but the supplied artwork has the words
baked in and the client asked for the overlay removed.

**No SEO cost:** the navigation carries "Ascent Studios" as live text on every
page, and the `<h1>` lives in `#homepage`. Verified: still exactly one `<h1>`.

### Measured at the hold

| | Cloud width | Inner gap | Mark | Clearance each side | Clipped |
|---|---|---|---|---|---|
| Desktop 1440 × 900 | 605px | 225px | 164px | 30px | **0px** |
| Mobile 390 × 844 | 148px | 88px | 65px | 11px | **0px** |

Convergence is still derived — now from the cloud boxes and the mark, since the
words can no longer be measured from the DOM.

---

## Build 11 — Real artwork, and the mark at the meeting point

Client supplied `left.png`, `right.png` and the brand mark. The intro now runs
on real artwork.

| # | Decision | Detail |
|---|---|---|
| D-112 | **Two named cloud files, not one mirrored** | `left.png` enters from the left, `right.png` from the right, as instructed. This supersedes the earlier "one asset, rendered twice" rule. |
| D-113 | Clouds are **width-driven** | 1536 × 1024 landscape at `w-[92vw] md:w-[62vw]`, `aspect-[3/2]`. Replaces the height-driven sizing the portrait placeholder needed. |
| D-114 | **The mark completes the lockup** | Revealed centred as the banks close, held through the pause, gone as the curtain opens. The scene reads **ASCENT · mark · STUDIOS**. |
| D-115 | The word gap is **derived from the mark** | `geometry()` measures the mark's rendered width and opens the lockup to clear it — `markWidth + 2 × 0.5em`. Resizing the mark in CSS re-solves the whole composition; nothing is hand-positioned. |

### ⚠️ The two cloud files are byte-identical

Same SHA256 (`3BA469B4AB4C54A8`), same dimensions, same 1779 KB. They are one
export saved twice, not two banks.

The right cloud is therefore **mirrored in CSS** so the pair faces each other —
without it they would read as an obvious duplicate. If a genuinely distinct
right-hand bank arrives, remove `mirrored` from the right `<Cloud>`.

### Verified in the browser

Desktop 1440 × 900 and mobile 390 × 844, both with motion:

| Check | Desktop | Mobile |
|---|---|---|
| All three images loaded | ✅ | ✅ |
| Mark centred | 0px offset at every frame | 0px |
| Mark opacity through the scene | 0 → 0.70 → **1.00** → 0.35 → 0 | same |
| Word gap at the hold | **111px** around a 73px mark | **63px** around a 40px mark |
| Gap monotonic, no overshoot | ✅ | ✅ |
| Curtain opens | 111 → 1165px | 63 → 323px |
| Failed requests / page errors | 0 / 0 | 0 / 0 |

The logo filename contains spaces and is referenced as-is; confirmed loading
rather than assumed.

### Payload

`next/image` serves AVIF: clouds **1779 KB → 62.7 KB** at 1200px, mark
**114 KB → 7.5 KB**. The 3.5 MB of duplicated source in the repository is
hygiene, not payload.

`cloud.png` is now unreferenced. Left in place rather than deleted unasked.

---

## Build 10 — Full browser audit

Three configurations driven through a headless browser: desktop with motion,
desktop with reduced motion, mobile at 390 × 844. Every claim below is measured,
not inferred.

### Mobile was broken, and desktop hid it

| Scroll | Before | After |
|---|---|---|
| 30% word gap | **−79px** — the two words overlapped | +178px |
| 50% word gap | 20px | **16px** — lockup |
| Curtain travel | **5px** — it never opened | **118px** |

**Cause.** The waypoints were fixed `vw` values while the lockup is a fixed
number of *pixels* wide. On a 390px viewport the lockup came to 357px, so the
clouds had to sit at roughly ±39vw just to centre it — which put them past the
hardcoded `±40vw` curtain target. The curtain had nowhere to open into, and the
approach at `±24vw` sat *inside* the converge position, so the clouds overshot
the lockup and came back, colliding the words on the way.

### D-109 — every waypoint is now derived

`geometry()` measures the cloud box, both word widths and the computed font size,
then returns all four positions. Governed by three named constants rather than
tuned numbers:

| Constant | Meaning |
|---|---|
| `VISIBLE_AT_REST` 0.20 | Fraction of each cloud on screen before scrolling |
| `OPEN_GAP` 0.55 | Curtain parting, as a fraction of viewport width, measured between inner edges |
| `APPROACH_FRACTION` 0.55 | How far the first move travels toward the lockup — never past it |

The curtain is now defined by the *gap it opens*, so it always opens however far
the lockup had to push the clouds out. Re-measured on every ScrollTrigger
refresh.

Sanity check: on desktop the derived values land at −57.5vw start and −40.0vw
open, against the hand-tuned −57 and −40 they replace. The derivation agrees
with the eye where the eye was working, and fixes it where it was not.

### D-110 — the wordmark is sized against the smaller viewport dimension

`clamp(22px, min(4.4vh, 7.2vw), 58px)`. Scaling by height alone ignored width,
which is what made the lockup 357px wide inside a 390px phone. Desktop is
unchanged; narrow screens now get type that fits.

### D-111 — console is clean

- **Favicon** — `app/icon.svg` added, using the wordmark's ascent mark.
- **Prefetch 404s** — `/about`, `/services` and `/lets-connect` do not exist
  yet, so Next prefetching them produced 404s on every page load. `prefetch`
  disabled on those links and on internal CTAs, each with a note to remove it
  once the routes are built. A CTA destination is exactly what should be
  prefetched when it exists.

### Verified across desktop-motion, desktop-reduced and mobile

| Check | Result |
|---|---|
| Intro purity | 1 video, 2 images, **0 headings, 0 buttons, 0 links** |
| Wordmark colour | `rgb(8, 34, 54)` — `#082236` |
| Intro height | 200vh |
| Sky video | playing, `readyState` 4, serving **`sky-av1.mp4`** (653 KB) |
| Nav | hidden until exactly 50%, then released |
| Hero CTAs | on screen and topmost — nothing intercepting clicks |
| OS progress rail | scrubbing `scaleY` 0.1 → 0.5 → 0.95 |
| How We Work bar | scrubbing `scaleX` 0.125 → 0.625 → 1 |
| Pins under reduced motion | correctly disabled — static, full-length rails |
| Heading outline | exactly one `<h1>`, 19 headings |
| Focus ring | `2px solid rgb(8, 112, 186)` — `--blue-700` |
| Page errors / console errors / failed requests | **0 / 0 / 0** |

---

## Build 09 — "The clouds are not moving"

Diagnosed with a headless browser rather than by reading the code. That is how
it was found, and it should be how this class of thing is found in future.

### The cause

**`prefers-reduced-motion: reduce` was killing the entire timeline**, leaving two
clouds parked at ±40vw for the whole scene. The clouds were never broken — that
branch simply never ran the animation.

It reproduces on any machine with **Windows → Accessibility → Visual effects →
Animation effects** switched off, and on headless Chrome, which reports `reduce`
by default. The first probe run hit it immediately and showed
`translate(-576px)` at every scroll position.

### D-108 — the scene now runs under reduced motion

Everything in the intro is **scrub-linked**: the clouds move in direct
proportion to the visitor's own scrolling and stop the instant they stop.
Nothing plays by itself. What reduced motion should suppress is the
*autonomous* motion, and it still does:

- the idle breathe — killed by the global rule in `globals.css`
- the sky video — paused in the resume-guard effect

Parking the clouds at the edges was not an accommodation, it was a broken-looking
page. A static composition that reads as a failure serves nobody, least of all
the visitor who asked for less motion.

### Measured, at 1440 × 900

Identical under both settings, which is the point:

| scroll | cloud X | word gap |
|---|---|---|
| 0% | −290 \| 1351 | — |
| 30% | 141 \| 928 | 458px |
| **50%** | 359 \| 709 | **22px** ← lockup completes |
| 70% | 230 \| 841 | 282px |
| 100% | −36 \| 1116 | open |

**The derived convergence is correct.** Target word space is 0.5 × 39.6px font
= ~20px; measured 22px. The lockup lands within 2px without a single hand-tuned
value, and `intro-locked` releases at exactly 50%.

### Also observed

Four 404s, all benign: `/about`, `/services` and `/lets-connect` are Next.js
prefetching nav routes that are not built yet, and `favicon.ico` has never been
added.

### Tooling note

The probe lives in the session scratchpad with its own `package.json`.
**Puppeteer was not added to the project** — verified. It drives the system
Chrome via `executablePath`, since the sandbox blocks Chromium downloads.

---

## Build 08 — Reveal, composition and wordmark colour

Authorised by "fix all", which includes the section-overlap change flagged in
Build 07 as needing a decision.

| # | Decision | Detail |
|---|---|---|
| D-103 | ~~The homepage is uncovered, not delivered~~ | ❌ **Reverted — it broke the page.** See below. |
| D-104 | **Wordmark is brand navy, not white** | White type on a near-white cloud had almost no contrast. `#082236` — the blueprint ground from `09-blueprint-system.md` — gives ~15.5:1 and ties the scene to the identity rather than reaching for plain black. Added as the `--color-deep` token; not hardcoded. |
| D-105 | **Option B implemented now, without new artwork** | The wordmark is live HTML, so the inner-edge offset is a layout value, not something baked into the PNG. Type centre sits at `TYPE_CENTRE = 0.68` of cloud width today. The new artwork is still needed for the *calm reading area* under it — but the composition and motion can be judged immediately. |
| D-106 | **Converge is measured, not a constant** | `IntroScene` reads the cloud box, both word widths and the computed font size from the DOM and solves for the positions that land the lockup correctly. Re-evaluated on every `ScrollTrigger.refresh()`. |
| D-107 | Intro height unified to **200vh** | It was `160vh` on mobile. The geometry only holds when section height is exactly twice the sticky child, so a shorter mobile section broke the relationship between the curtain, the sticky release and the homepage. |

### Why the converge value had to be derived rather than tuned

Two things a hand-picked `vw` number cannot get right:

- **The lockup centres as a whole, not per word.** `ASCENT` and `STUDIOS` are
  different widths, so their individual centres are not symmetrical about the
  screen. Centring each word independently leaves the wordmark visibly
  off-centre — the exact failure the whole intro is built to avoid.
- **The cloud is height-driven**, so its width in `vw` changes with the
  viewport's aspect ratio. A fixed value is only correct at one aspect ratio.

The governing constants are `TYPE_CENTRE` (0.68) and `WORD_SPACE` (0.5em), at
the top of the file. Those are what to change — never the timeline.

### D-103 reverted — why the overlap broke the page

`#homepage` was pulled up with `-mt-[100vh]` and placed behind the intro so the
sky could fade and uncover it through the parting clouds. Client reported the
page broken; reverted.

**The fault:** the intro section is 200vh with a 100vh sticky child. When that
child releases at 100vh it does not disappear — it comes to rest occupying
document 100vh–200vh, which after the overlap is **exactly where the hero
sits**. With the intro at `z-10` above the page:

- the sky layer, though faded to `opacity: 0`, still covered the hero and
  **swallowed its clicks** — the CTAs were dead
- the clouds stayed painted over the page for a full viewport of scrolling

Fading a layer hides it; it does not remove it from the page.

**For any second attempt:** the scene has to stop covering the page once the
timeline ends — the z-order must invert, or the scene must be taken out of flow,
at progress 1. Simply overlapping is not enough. This should be attempted with
someone able to watch it run, not blind.

**Kept from this build** — none of these depend on the overlap: the wordmark
colour (D-104), Option B offset in live text (D-105), the derived converge
(D-106), the uniform 200vh (D-107), and the transform fixes from Build 07.

**Also added:** `pointer-events-none` on the scene. Nothing in the intro is
interactive, so it should never have been able to take pointer events from the
page — true regardless of the overlap.

### Consequence for the asset swap

Down from six touch points to five: the converge value no longer needs editing.

---

## Build 07 — Transform-property audit. Three defects fixed.

A check of the implementation against the locked specs. All three defects share
one root cause, and all three were invisible in `tsc`, `eslint` and the build.

### The root cause

**Tailwind v4 compiles `translate-*`, `scale-*` and `rotate-*` to the standalone
CSS properties `translate`, `scale` and `rotate` — not to `transform`.** CSS
applies those *before* `transform`, so they **compose with** anything GSAP or
Framer writes rather than being replaced by it.

```css
.-translate-x-\[57vw\]{translate:var(--tw-translate-x) var(--tw-translate-y)}
.scale-y-0{--tw-scale-y:0%;scale:var(--tw-scale-x) var(--tw-scale-y)}
```

Any element carrying one of these utilities *and* driven by a JS transform is
silently wrong. Nothing in the toolchain catches it.

| # | Where | Effect |
|---|---|---|
| D-98 | `IntroScene` clouds — `-translate-x-[57vw]` + GSAP `x` | Every cloud permanently offset an extra ±57vw. At the hold they sat at ∓68vw instead of ∓11vw — **the clouds never converged and the wordmark could never complete.** |
| D-99 | `OperatingSystem` rail — `scale-y-0` + `gsap.set({scaleY})` | Tailwind held the rail at scale 0 while pinned, multiplying the scrubbed value to nothing. **The progress rail never drew.** |
| D-100 | `HowWeWork` bar — `scale-x-0` + `gsap.set({scaleX})` | Same. **The progress bar never drew.** |

Fixed by writing the initial state to `transform` via arbitrary properties
(`[transform:translateX(-57vw)]`, `[transform:scaleY(0)]`), which GSAP then
replaces cleanly. Verified in the compiled CSS.

`Navbar` and `WhatWeDo` use the same utilities but have no JS transform on those
elements, so they are correct as they stand.

**Standing rule:** never combine a Tailwind transform utility with a
JS-animated transform on the same element. Use an arbitrary `[transform:…]`
property for the initial state.

### D-101 — resize made the composition stale

The timeline used `vw(-57)` etc., which bake the viewport width in at build
time, so `invalidateOnRefresh: true` had nothing to recompute. Any resize or
orientation change left the clouds at the wrong positions. Now function-based
(`x: () => vw(-57)`), which GSAP re-evaluates on refresh.

### D-102 — correction to a previously approved claim

I documented, and the client approved, that the curtain and the homepage reveal
were "the same moment by construction". **That was wrong.** Measured:

- the timeline spans scroll 0 → 100vh
- the sticky child releases at 100vh — the same point
- `#homepage` starts at 200vh, so its top edge enters the viewport at 100vh,
  which is progress **100%**

So the curtain at 50 opens half a viewport of scrolling *before* the homepage
starts to appear. They are sequential, not simultaneous. `CUE.curtain = 50` is
locked by direction, not derived from geometry.

**Consequence:** as it stands the curtain parts to reveal *sky*, and the
homepage arrives afterwards as the scene lifts away. That is a shortfall against
"the visitor should feel they are uncovering it". Closing it means changing the
relationship between the two sections, which is locked — so it needs a decision
rather than a unilateral fix.

---

## 🔒 Locked — background video behaviour

> The sky video is the world. The clouds are the interactive layer.

Never pause · never freeze · never scrub with scroll · never restart. It keeps
moving whether the visitor scrolls, stops, or scrolls back.

### Audit against the code

| Requirement | Status |
|---|---|
| Autoplay, muted, loop, inline, cover viewport | ✅ |
| Never scrubbed or seeked by scroll | ✅ — only the two clouds are on the timeline |
| Never restarts during the intro | ✅ — the element stays mounted for the whole scene |
| Never freezes | ✅ **fixed in this pass** |
| Never pauses | ⚠️ **one deliberate exception** — see below |

**D-95 — resume guard added.** Browsers pause muted autoplaying video on their
own: offscreen throttling, tab switches, power saving, or a refused autoplay
attempt. Nothing in the code was preventing that, so "never freeze" was a spec
without an implementation. A listener now resumes playback on `pause`,
`canplay` and `visibilitychange` whenever the page is visible. It never seeks,
so playback continues from where it was rather than restarting.

**D-96 — the reduced-motion exception, for sign-off.** Under
`prefers-reduced-motion: reduce` the video stays paused. This contradicts the
locked "never pause", and it is deliberate:

- The video loops indefinitely with no pause control, which WCAG 2.2.2 (Pause,
  Stop, Hide) requires for auto-playing motion over five seconds.
- `prefers-reduced-motion` is an explicit request from the user's own operating
  system, not a guess about them.
- It affects only visitors who asked for it. Everyone else sees a sky that never
  stops.

Recommendation: keep it. If the rule should be absolute instead, it is a
one-line removal — but it is a genuine accessibility regression, so it needs to
be your call rather than mine.

**D-97 — no baked text.** The wordmark is live HTML text over the cloud, never
part of the PNG: selectable, searchable, resizable, crisp at any density,
translatable. The type-safe zone exists so the artwork is *built around* a
region that will carry type it never contains. Made explicit in the brief,
where the type test could otherwise be misread as an instruction to include it.

---

## 🔒 Locked — wordmark placement, Option B

The emotional peak of the intro is **the completion of the brand name**, not the
collision of two clouds.

Initial frame reads `ASCENT` … `STUDIOS` — two halves of one brand, separated.
As the banks converge the wordmark completes itself.

| # | Decision | Detail |
|---|---|---|
| D-90 | Type offset toward the **inner** edge | Optical centre at **68% of canvas width**, safe zone 50–92% |
| D-91 | **No central glow** | The moment is earned through composition and motion. A subtle atmospheric bloom is permitted later *only* if visual review shows it reads flat. Motion first; effects only in support. |
| D-92 | Canvas is **3:1 or wider** | 3600 × 1200, up from the 2:1 previously specified |
| D-93 | Clouds **overlap ~15%** at the hold, they do not kiss | See below |
| D-94 | Converge X is **derived, not tuned** | `±(W/2 − O/2)` → ±34vw at `w-[80vw]` |

### What Option B forces

Because the words must land as a correctly-spaced lockup, **the convergence
distance stopped being a free parameter.** It now falls out of where the type
sits in the artwork.

At the hold the two word centres must be **5.06 × the font size** apart:
`ASCENT` 4.20em + a 0.50em word space + `STUDIOS` 4.92em, measured centre to
centre. Solving that against the cloud geometry produced the 68% type centre and
the 15% overlap.

### Why the clouds overlap rather than touch

Counterintuitive, and the detail most likely to be "corrected" by someone later.

If the banks meet edge to edge at the moment the wordmark completes, each word
has to sit flush against its cloud's inner edge — precisely where the alpha is
feathering to nothing. **The type would have no cloud underneath it.**

Overlapping by ~15% moves the type back into solid density while still landing
the words at the right spacing. It also reads better: two masses of air passing
through each other, rather than two objects colliding. The overlap region is
where the upper cloud's alpha is already near zero, so it does not obscure the
word beneath.

### Consequence for review

When the asset arrives, the first check is not "does the cloud look good" but
**does `ASCENT STUDIOS` read as one wordmark at the hold.** If the gap reads
wide, the type sits too far out in the artwork — fix the asset, not the motion.

---

## 🔒 Architecture frozen — art-direction phase

Signed off by the client. **No structural rewrites from this point unless
explicitly requested.** Every iteration should increase perceived quality, not
complexity.

### Locked

- Intro and homepage are separate sections. The intro is not a hero.
- The curtain and the homepage reveal are the same moment **by construction** —
  the section is 200vh, the sticky scene releases at 100vh, and `#homepage`
  enters the viewport there. The `CUE.curtain` value of 50 encodes that
  relationship; changing it breaks the geometry.
- Navbar stays in `layout.tsx`. It is `position: fixed`, so its DOM location is
  invisible; `intro-locked` governs when it appears.
- No new interactions, decorative motion, particle effects, or animation
  libraries. GSAP + ScrollTrigger + Framer Motion is the complete set.

### Blocking everything

**The cloud asset.** The current 408 × 611 portrait file is a placeholder and is
now the ceiling on the whole landing — the motion quality already exceeds the
artwork. Brief in `public/assets/README.md`.

**One decision still gates the artwork itself:** where the wordmark sits on the
cloud. Centred means the words are off screen at 0%; offset toward the inner
edge means they are visible from the first frame and the two halves complete the
wordmark as the clouds meet. Recommended: offset. This cannot be settled after
the asset is made.

### Polish backlog — specified, not built

Execution order once the asset lands. Nothing here needs re-deriving.

| # | Item | Notes for execution |
|---|---|---|
| 1 | Cloud realism — opacity variation, edge softness, atmospheric blur, gentle idle drift | Most of this belongs in the **artwork**, not CSS. Idle drift already exists at 6px / 7s on an inner wrapper so it never contends with the GSAP transform. |
| 2 | Meeting point — approach, slow, hold, subtle central glow, open | The hold already exists (`CUE.hold` → `CUE.curtain`). The glow is the only new element, and **recommendation B may remove the need for it** — the wordmark completing is a stronger peak. Decide after seeing B. |
| 3 | Curtain as masses of air, not translating PNGs | Wants eased sub-motion rather than linear scrub: slight scale and rotation drift layered onto X, plus per-cloud offset. Currently `ease: "none"` throughout, which is what makes it read mechanical. |
| 4 | Homepage reveal — less fade, more masking | Depends on the new asset. Masking against a cloud edge only works with a soft feathered alpha, which the current file cannot provide at scale. |
| 5 | Hero timing — one composition, minimal stagger | Current hero uses three `Reveal` blocks. Likely reduces to one parent reveal with a very small internal offset. |
| 6 | Performance verification | **Sky is already done** — AV1 653 KB / VP9 789 KB / H.264 1.40 MB / poster 42 KB, from 4.77 MB. Remaining: compress the new cloud, then run Lighthouse before any further polish. |

### Correction logged

The asset handover previously named `LandingSequence.tsx`, which was deleted in
Build 06, and described the swap as two values. It is **six touch points in
`IntroScene.tsx`** — the constant, the cloud box, `sizes`, the wordmark clamp,
the timeline X positions, and a flip from height-driven to width-driven sizing.
Corrected in `public/assets/README.md` and the published brief.

---

## Build 06 — Intro and homepage separated

Builds 03–05 kept the hero inside the intro's sticky container, revealing it
there. That was wrong twice over: the intro was still a hero section underneath,
and the homepage never existed as a thing of its own.

### The corrected architecture

```
<section id="intro">        200vh · sticky scene · sky + two clouds. Nothing else.
<div id="homepage">         Hero · Problem · Shift · OS · What We Do · How We Work
```

| # | Decision | Detail |
|---|---|---|
| D-85 | The intro renders **three things** | One `<video>`, two `<img>` from one asset, and the two brand words. Verified against the served HTML: no `<h1>`, `<button>`, `<nav>`, `<a>`, hero copy or CTA text inside `#intro`. |
| D-86 | **The curtain and the reveal are the same moment by construction** | The section is 200vh and the sticky scene releases at 100vh — which is exactly when `#homepage`'s top edge enters the viewport from below. The curtain cue is set to 50, so the clouds open at the instant the homepage begins to rise beneath. No coordination code, just geometry. |
| D-87 | `Hero` rebuilt as an ordinary section | It lives in `#homepage` on the page's own ground and reveals on scroll like every other section, rather than being animated into existence by the intro. |
| D-88 | Noise overlay removed | Review item 2 asked for less visual information on the first screen. The off-white overlay stays — it was requested twice and softens the blue — but the grain was the least essential layer. |
| D-89 | Navigation stays in `layout.tsx` | The requested architecture places it inside `#homepage`, but it is `position: fixed`, so its position in the tree is invisible, and every other route needs it. `intro-locked` still governs when it appears, which is the behaviour that was asked for. |

`LandingSequence.tsx` deleted and replaced by `IntroScene.tsx` — the name now
matches what it is.

### Verified

`tsc` clean · `eslint` clean · `next build` succeeds, 213 kB first load.

Served HTML checked section by section: `#intro` contains 1 video, 2 images, the
brand words, and none of the seven leak markers. `#homepage` contains the
headline, both CTAs, and every section through *How We Work*. One `<h1>` on the
page.

**Not verified:** no browser — the scene has not been scrubbed or watched.

---

## Build 05 — Sky encoded. Cloud blocked. Polish paused.

Sprint review directive: **do not continue polishing animation until the cloud
asset is replaced.** Items 3–7 (volume, drift easing, meeting point, asymmetric
opening, masked reveal) are specified and queued, not built.

### Done — the sky

| Output | Codec | Size |
|---|---|---|
| `sky-av1.mp4` | AV1, SVT-AV1 CRF 38 | **653 KB** |
| `sky.webm` | VP9 CRF 40 | **789 KB** |
| `sky.mp4` | H.264 CRF 30, faststart | **1.40 MB** |
| `sky-poster.jpg` | frame at 1s | **42 KB** |

Was 4.77 MB. Sources ordered smallest-first, so most visitors download **86%
less**; worst case with neither AV1 nor VP9 is 1.40 MB, inside the 2 MB budget.
`preload="metadata"` plus the poster means the scene is never a blank rectangle.

The original was overwritten; a copy sits in session scratchpad, which is
temporary. **The client should retain their own master** — everything was
encoded from a 3.66 Mbps delivery file, and re-encoding from a true master would
look better at the same size.

### Blocked — the cloud

Full brief in `public/assets/README.md` and published for the producer.

**A contradiction surfaced that must be settled before artwork is made.** The
scene starts with ~20% of each cloud on screen, and the visible portion is the
cloud's *inner* edge. So a word centred on the cloud is **off screen at 0%** —
which conflicts with the review's own "first screen: sky + two cloud edges +
brand words".

| | A — centred | B — offset toward inner edge |
|---|---|---|
| First screen | Two bare cloud edges | Cloud edges **and the brand words** |
| Meeting point | Two words on two clouds | The halves **complete the wordmark** — `ASCENT STUDIOS` reads across the join |

**Recommended: B.** It satisfies both "brand words on the first screen" and
"make the meeting point the emotional peak" with one idea — the wordmark
assembling itself is a stronger peak than a glow, and costs no extra motion.

**Consequence for the artwork:** the asset is mirrored, so an offset safe zone
lands on the inner edge of both clouds automatically. It must sit toward *one*
side of the canvas, not centred — get it wrong and the words sit on the outer
edges, off screen for the whole scene.

### Queued, not built

| Review item | Status |
|---|---|
| 3 — cloud volume, edge blur, shadow separation | Deferred. Most of it should come from the artwork, not CSS. |
| 4 — organic drift, atmospheric resistance easing | Deferred |
| 5 — meeting point: slow, hold, glow, expansion | Deferred. Recommendation B may replace the glow entirely. |
| 6 — asymmetric curtain, 80–120ms offset | Deferred |
| 7 — masked reveal instead of opacity fade | Deferred. Needs the cloud's alpha edge to mask against. |
| 9 — motion budget: no flourishes | Standing constraint, already held |

Item 7 in particular depends on the new asset: masking the reveal against a
cloud edge only works if the edge is a soft feathered alpha, which the current
408 × 611 asset does not provide at scale.

---

## Build 04 — Landing rebuilt as Scene 1

Build 03 was wrong. It produced a hero section with clouds animating over it,
rather than a scene the website is hidden behind. Corrected.

### What was actually broken

| Fault | Why it mattered |
|---|---|
| **Hero rendered above the clouds** (z-60 vs z-40) | Nothing was ever "revealed underneath". The clouds parted over content that was already in front of them — which is precisely what makes it read as decoration. **This was the root error.** |
| Navigation visible throughout | The first viewport must contain the sky and two clouds. Nothing else. |
| Scroll indicator and eyebrow present | Same. |
| Scene length 150vh | Now 200vh desktop, 140vh mobile. |

### The corrected model

| # | Decision | Detail |
|---|---|---|
| D-80 | **Website beneath the curtain** | Hero at z-35, clouds at z-40. Parting them uncovers the site. |
| D-81 | CSS `sticky`, not a GSAP pin | Composes better with Lenis, needs no pin spacer, and one less thing to fight the scroll. GSAP only scrubs the timeline. |
| D-82 | Navigation suppressed by `intro-locked` | Set on `<html>` **server-side**, so the nav cannot flash before the scene hydrates. Released when the curtain opens, re-applied if the visitor scrolls back up into the scene, and released immediately by Navbar on any route without a scene. |
| D-83 | Stage cues | 0–40 drift · 40–55 close · 55–60 hold · 60–85 curtain · reveal from 62, staggered. Timeline is 100 units, so positions read as percentages. |
| D-84 | `<noscript>` releases everything | Without JavaScript no scene runs, so nothing should stay hidden waiting for one. |

### One interpretation worth stating

The brief says *"the hero should NOT exist during the intro."* Taken literally
that means not rendering it — which would remove the `<h1>` from the document
and hide the page's only headline from crawlers and screen readers.

Read as **not visible**: the hero is in the HTML from the first byte at
`opacity: 0`, behind the clouds. Assistive technology and search engines get the
page; the visitor gets the scene. If literal non-existence is wanted, say so —
it is a one-line change and a real SEO cost.

### Verified

`tsc` clean · `eslint` clean · `next build` succeeds, 214 kB first load · SSR
HTML confirms `intro-locked` present on `<html>`, no scroll indicator, no
eyebrow, one `<h1>`, two `<img>` from one asset, one `<video>`.

**Not verified:** no browser — the scene has not been scrubbed or watched.
Cloud convergence points, the hold, and curtain speed all need eyes.

---

## Build 03 — Cinematic Landing Sequence  *(superseded by Build 04)*

Replaces the two-column hero with a scroll-driven cinematic intro. Nothing plays
on load; every frame is driven by the visitor's scroll.

### Overrides — these contradict locked decisions

| # | Locked rule | Now | Status |
|---|---|---|---|
| D-71 | Phase 5 §01: "**Must not** use a hero video." Phase 2 Never list: "auto-playing background videos". | A looping sky video is the ground of the intro | ⚠️ Overridden by instruction |
| D-72 | Phase 3: **max two pinned sections site-wide**, both spent on §04 and §06 | The landing is a third pin | ⚠️ Cap raised to three |
| D-73 | Phase 3: "**Never pin decorative content**" | The intro is atmosphere by design | ⚠️ See reconciliation |
| D-74 | Phase 5 §01: "Capture attention within **five seconds**" | The headline appears at 85% of a 150vh scroll | ⚠️ Mitigated, not solved |
| D-75 | Scroll indicator fades last, after the CTAs | Fades 0→18% | Deviation — a "scroll" prompt at 85% is noise once the visitor is already scrolling |

**D-72/D-73 reconciliation.** The pin cap exists to stop mid-page scroll
hijacking. This is the entry sequence, not a mid-page interruption, and the hero
content lives *inside* it — so it is not decorative in the sense the rule
targets. The cap is now: **two mid-page pins, plus the landing.** If a third
mid-page pin is ever requested, it still has to displace §04 or §06.

**D-74 mitigation, honestly stated.** A founder who lands and does not scroll
sees sky, two cloud edges and the navigation. The nav carries the wordmark from
frame one, and the headline is server-rendered — present in the HTML and to
screen readers immediately, just not yet visible. That covers SEO and assistive
tech. It does not cover a busy founder who bounces in three seconds. **This is a
real trade: atmosphere bought at the cost of immediate comprehension.** Worth
watching in analytics once live.

**Sky versus blueprint.** Two visual worlds now exist. They reconcile as
sequence rather than conflict: **the sky is the approach, the blueprint is the
system, and the curtain is the transition between them.** Atmosphere first, then
precision — which is the Apple-keynote structure the brief asks for. Neither
weakens the other provided the sky never reappears after §01.

### Implementation

| Decision | Detail |
|---|---|
| D-76 | One 100-unit GSAP timeline, so positions read as the brief's percentages |
| D-77 | Idle breathe runs on a wrapper *inside* the GSAP-driven node, so the two transforms never contend for one element |
| D-78 | `Hero.tsx` deleted — fully superseded. `HeroVisual.tsx` kept but unrendered, as the starting point for the D-63 blueprint restatement |
| D-79 | Cloud sized from **its own** aspect ratio, wordmark sized relative to the cloud | See assets below |

### Assets — as supplied

Both are in the repository.

| Asset | Supplied | Needed | Impact |
|---|---|---|---|
| `sky.mp4` | **4.77 MB**, no audio track | under 2 MB | Above the fold, competing with LCP. Re-encode command in `public/assets/README.md`. |
| `cloud.png` | **408 × 611 portrait**, RGBA, 91 KB | ~2400 × 1400 landscape | The composition assumes a wide cloud bank. At the specified 74vw this is a 2.9× upscale, and `ASCENT` at 120px (~700px wide) cannot sit inside a 408px cloud. |

**What the code does about the cloud.** Rather than letterbox a portrait image
in a landscape box — which would leave the wordmark wider than the visible cloud
— the cloud is sized from its own ratio, driven by height so it always fits the
viewport, and the wordmark scales relative to the cloud so it stays inside it.
Correct and crisp, but narrower and smaller than the brief intends. Two
constants swap when a landscape asset lands.

### Verified

`tsc` clean · `eslint` clean · `next build` succeeds, `/` prerendered static at
214 kB first-load JS · server-rendered HTML contains the wordmark, the hero
headline, one `<video>`, two `<img>` from a single asset, and a correct heading
outline (1 × h1, 5 × h2).

**Not verified:** no browser available — the sequence has not been scrubbed,
watched, or measured. The curtain timing, cloud framing and video weight all
need eyes on them before sign-off.

Lazy-loading the below-fold sections was applied as requested. Next still counts
those chunks toward First Load JS, so the reported figure did not move; the
benefit is in fetch and hydration behaviour and needs Lighthouse to confirm.

---

## D-06 — RESOLVED. Editorial Blueprint × Premium 3D

> The Personal Brand Operating System becomes the visual identity of Ascent
> Studios. It combines the precision of an architectural blueprint with subtle
> 3D spatial interactions. The goal is not to impress users with technology, but
> to make the operating system feel tangible.

Full system in `09-blueprint-system.md`. Tokens in `tokens/tokens.css`.

**How this was read.** D-06 asked whether deep sections stay or go. The answer
came as a visual direction rather than a yes or no, so: **deep sections are in,
and their treatment is blueprint navy.** If the resolution had been to drop
them, "blueprint" would not be the answer. One line reverses it.

| # | Decision | Detail |
|---|---|---|
| D-63 | Deep sections confirmed | `#082236`, treated as architectural blueprint. Home §04, Home §11, Services §02 and §06, About §04. |
| D-64 | **Two surfaces, one language** | "Visual identity" cannot mean the site turns dark — off-white still dominates. The blueprint has two states, like a technical drawing: **blueprint** on deep, **whiteprint** on paper. The deep surface is where the system is *explained*; the light surface is where it is *referenced*. |
| D-65 | **CSS transforms only** | No WebGL, no Three.js, no canvas. The 60fps floor on mid-range Android, the Lighthouse 95+ target, and the brief's own sentence — a WebGL scene announces its own technology, a tilted drawing does not. |
| D-66 | Perspective 1600px | Long focal length reads as an axonometric drawing. Short (≤600px) reads as a game engine. This single value does more to keep it premium than anything else. |
| D-67 | Rotation caps | Base 6° · pointer ±3° · scroll-driven 4°. Makes the existing "no dramatic camera movement" rule enforceable. |
| D-68 | Depth carries meaning | Layers separate in Z **as the explanation deepens** — a surface resolving into a system. Where depth means nothing, it isn't used. |
| D-69 | **The flat-legibility test** | Every 3D composition must be fully legible with all transforms removed. If flattening loses information, the information was encoded in the effect and was never communicated. Mirrors the reduced-motion rule. |
| D-70 | Six vocabulary devices | Construction grid · extension rules · registration marks · mono annotation · leader lines · two line weights. Nothing else. |

### What this closes

The design system has forbidden fake dashboards, stock illustration, generic
dashboard graphics and SaaS UI mockups since Phase 2 without naming what to use
instead. Blueprint is that answer — drawn rather than decorated, technically
precise without borrowing software's clothes.

### Consequence for built code

**Home §04 needs rebuilding.** It currently renders a node spine on paper; it
now needs the blueprint surface and the Z-separating composition. §01 and §05
need the vocabulary applied, not rebuilding. §11 takes the blueprint surface
with a typographic close and no composition.

### Open

**Grid density on mobile.** A 32px grid at 375px is busy. Likely 24px minor and
no major grid below 768px — confirm when §04 is rebuilt.

---

## Build 02 — Home §02–§06

| # | Decision | Detail |
|---|---|---|
| D-57 | **§03 uses scale, and drops blur** | The brief asked for "slight scale" on The Shift. The signature reveal already sits at the three-transformation cap, so scale **replaces** blur here rather than joining it — opacity + Y + scale. This is the rule working as written, not an exception to it. |
| D-58 | §03 is a sky-wash band | `#F0F9FF` full-bleed. Gives the section its own identity without pre-empting **D-06**, since "occasional sky blue" is already sanctioned in the background list. |
| D-59 | GSAP installed | Now genuinely required — two pinned, scrub-linked sections. `ScrollTrigger` only; no other plugins. |
| D-60 | Both pins spent | §04 and §06. The site-wide budget of two is now fully allocated. |
| D-61 | Pinned sections keep their content in the a11y tree | The cinematic display panels are `aria-hidden`; the full stage list is always in the DOM, visible below 1024px and `lg:sr-only` above it. Everyone gets the same content in a sensible order. |
| D-62 | Inactive stages dim by **colour, not opacity** | Reduced-opacity text fails AA. Upcoming stages use `--color-muted` (5.79:1) with a hollow node; reached stages use ink with a filled node. Contrast holds at every scroll position, and state never rests on colour alone. |

### Section identities

Each section was given its own layout and scroll mechanic rather than a shared
template:

| § | Identity | Mechanic |
|---|---|---|
| 02 The Problem | Descending statements, sticky margin label | Masked line reveals |
| 03 The Shift | Centred tonal band, rule drawing full width | Scale reveal |
| 04 Operating System | Split — display type left, spine right | **Pinned**, scrub, all stages held on screen |
| 05 What We Do | Broadsheet columns, floor-to-ceiling hairlines | Hover rules, staggered entrance |
| 06 How We Work | Fully centred, one stage at a time | **Pinned**, scrub, progress rule |

§04 and §06 are deliberate inverses: §04 holds every stage on screen because
the argument is that they form one system; §06 shows one at a time because the
argument is that an engagement is a path you walk.

### Verified

`tsc --noEmit` clean · `eslint` clean · `next build` succeeds, `/` prerendered
static at 208 kB first-load JS · server-rendered HTML contains all five
sections' copy, with a correct heading outline (1 × h1, 5 × h2, 13 × h3).

**Not verified:** no browser available, so nothing has been visually inspected,
scroll-tested or measured with Lighthouse.

A dynamic import of the two GSAP sections was tried and reverted — it did not
move the reported first-load figure, so it was complexity without a
demonstrable gain. If Lighthouse shows TBT pressure, that is the first lever to
pull, measured rather than assumed.

---

## Build 01 — Scaffold, Navigation, Hero

| # | Decision | Detail |
|---|---|---|
| D-52 | **Typeface resolved** | **Geist**, self-hosted via the `geist` package. Helvetica Neue cannot be licensed for web self-hosting, and a fallback stack would render a different face per platform. One family, every visitor. Closes an item open since Phase 2. |
| D-53 | Tailwind v4 | CSS-first `@theme` in `styles/globals.css`. The theme *is* the token file — no `tailwind.config.js`. |
| D-54 | Primary button hover **darkens** | `#0870BA` → `#095890`. Phase 2 specified a lighter hover (`#0685E0`), which measures 3.86:1 behind white text and fails AA. Hover states must pass too. |
| D-55 | GSAP not installed | Not required for the hero. "No unnecessary dependencies." Add it when a section genuinely needs a timeline Framer Motion cannot express. |
| D-56 | Booking + WhatsApp are env-configured | `NEXT_PUBLIC_BOOKING_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`; both fall back to `/lets-connect`. Neither destination was supplied. |

### Verified

`tsc --noEmit` clean · `eslint` clean · `next build` succeeds, `/` prerendered
static at 157 kB first-load JS · server-rendered HTML contains the full hero
copy and both CTAs, so the first frame is the headline rather than an empty box
awaiting JavaScript.

**Not verified:** no browser was available in this environment, so the hero has
not been visually inspected or measured with Lighthouse.

---

## Phase 6 — About Page Experience & Storytelling

Applied to the new `08-about.md`. Supersedes the About list in
`05-site-architecture.md`.

### Overrides applied

| # | Element | Phase 4 draft | Phase 6 specifies | Status |
|---|---|---|---|---|
| D-46 | §01 | "Who We Are" | **Hero — open with a belief, not the company** | ✅ Applied |
| D-47 | Order | Belief before the industry problem | **Industry problem (§03) before Our Belief (§04)** | ✅ Applied |
| D-48 | "Why We Built Ascent" | §04 | **"Why We Exist", §02** | ✅ Applied |
| D-49 | "The Future We're Building" | §08 | **Removed** — replaced by "Why It Works" | ✅ Applied |
| D-50 | Ideal client on About | Not present | **"Who We Build For", §08** | ✅ Applied |
| D-51 | Section count | 9 | **10** | ✅ Applied |

### Resolved by this phase

Phase 4 flagged three belief-adjacent sections that would collapse into the same
page said three times. Phase 6 separates their remits, close to the proposed
split: **§04** what Ascent believes about the market (and the operating system as
the answer) · **§05** the operating principles that belief produces · **§06** the
reasoning method applied to a specific founder.

D-49 is also an improvement rather than a swap. *The Future We're Building*
opened a new subject immediately before the CTA; *Why It Works* closes the
argument the page has been making.

### Flagged

**Density, not duplication.** §04, §05 and §06 are three consecutive sections of
thinking — roughly a third of the page in abstraction. Recommendation: **§06
should demonstrate rather than declare** — walk through one real decision (a
positioning call, a channel choice, a piece of content killed and why). A worked
example breaks the abstraction and proves the framework exists in a way that
describing it cannot. Declaring a methodology is what every agency does.

**Audience list mismatch.** About lists five entries including *business owners*;
the final homepage §07 lists four without it. Recommendation: **the four-item
list everywhere** — *business owners* is the vaguest and least aligned with a
founder/CEO positioning, and it widens the funnel where the page should narrow
it. Applied as four; reinstate on one word.

**The loop's third appearance.** Home asserts it (the circular diagram),
Services explains the mechanism, About §09 concludes with it typographically.
**No circular diagram on About** — one circle per page, and this page's would be
its third-best.

---

## Interim — Services Content & Final Homepage Architecture

Applied to `06-homepage.md` (rewritten) and the new `07-services.md`.

### Overrides applied

| # | Element | Previously | Now | Status |
|---|---|---|---|---|
| D-39 | Homepage section count | 10, "fixed" | **11** — *What We Do* separates from the OS section | ✅ Applied |
| D-40 | Why Ascent position | §05, before the process | **§08**, after *Who We Work With* | ✅ Applied |
| D-41 | Pillar names | Strategy · Production · Performance | **Content Strategy · Production · Metrics** | ✅ Applied |
| D-42 | The five OS modules | Proposed, pending confirmation | **Retired.** Replaced by three defined pillars | ✅ Applied |
| D-43 | How We Work | Unspecified stages | **Discovery & Audit → Strategy & Positioning → Production → Optimize**, cyclical | ✅ Applied |
| D-44 | Audience list | 5 entries | **4** — *business owners* dropped | ✅ Applied |
| D-45 | Services CTA | "Book a Strategy Call" | "Book a Call" | ⚠️ Applied, see below |

### D-40 — Why Ascent moving is a fix, not just a change

The Phase 5 narrative arc read *Who It Is For → Why Trust Us*, but the section
list placed *Why Ascent* at §05, before the process. Those disagreed, and it was
logged as a minor inconsistency at the time. The final architecture resolves it
in favour of the arc.

The new position is also the better one: by §08 the visitor knows what the
system is, what it produces, how it runs, and that it is meant for them. *Why
Ascent* stops being an assertion made to a stranger and becomes the answer to a
question they are actually asking.

### D-42 — the five modules are retired

Positioning, Narrative, Production, Distribution and Demand were a working model
proposed in Phase 1 and never confirmed. Real service definitions have now
replaced them, and the replacement is better: three pillars with stated
inclusions, closing into a loop. Nothing else in the system depended on the five
names.

This closes an item that had been open since Phase 1.

### Flagged

**Two loops on one page.** §04 (Strategy → Production → Metrics → Optimization →
↺) and §06 (Discovery & Audit → Strategy & Positioning → Production → Optimize,
cyclical) both describe cycles. Rendered as two circular diagrams, the page says
the same thing twice.

Resolution: **§04 is the product** — what the system *is*, always running, no
entry point, and it gets the circular diagram. **§06 is the engagement** — what
working together feels like over time, entered through Discovery & Audit, shown
as a linear progressive reveal closing with one return beat. One circle per page.

**Naming collision — "Production".** It is both a pillar (§05) and a stage
(§06); the capability versus the phase. Either accept it and let context carry
the difference, or rename the §06 stage (*Run the Engine*). Copy-phase decision;
nothing structural depends on it.

**D-45 — two CTA labels.** Services specifies "Book a Call"; every other page
uses "Book a Strategy Call", and Phase 4 requires the Connect With Us block be
identical everywhere. Recommendation: **"Book a Strategy Call" site-wide** —
*strategy* qualifies the visitor before they click and frames a working
conversation rather than a sales call, which is the filtering this site exists
to do. Applied as specified pending your decision.

**Website design and SEO** sits inside the Production pillar and is the one
inclusion that does not obviously read as content production. It fits if framed
as the owned destination content drives toward — the place demand lands. Needs a
line of framing in the copy phase.

---

## Phase 5 — Homepage Experience Architecture

Approved and applied to the new `06-homepage.md`. Section names updated in
`05-site-architecture.md`.

### Overrides applied

| # | Element | Phase 4 | Phase 5 specifies | Status |
|---|---|---|---|---|
| D-33 | Home §03 | "The New Perspective" | **"The Shift"** | ✅ Applied |
| D-34 | Home §07 | "Who We Help" | **"Who We Work With"** | ✅ Applied |
| D-35 | Home §04 content | Five modules | **Three pillars** — Strategy, Production, Performance | ✅ Applied |
| D-36 | WhatsApp CTA label | "WhatsApp" | **"Send a WhatsApp Message"** | ✅ Applied as working label |
| D-37 | Contact email | Not specified | **contact@createwithascent.com** | ✅ Applied |
| D-38 | Governing order | Not stated | **Educate → differentiate → convert.** Never reversed | ✅ Applied |

Section order is unchanged from Phase 4 and confirmed.

### D-35 — three pillars on Home, five modules on Services

Phase 5 specifies the homepage OS section as Introduction → Strategy →
Production → Performance → Complete Operating System. Services keeps the five
modules inside those pillars.

This is deliberate progressive disclosure, which Phase 4 asked for: Home gives a
founder the shape of the system, Services gives the substance. Both are correct
at their own altitude.

### Resolved by this phase

**Transformation now has a home.** Phase 3 designated it a cinematic moment;
Phase 4 could not place it. Phase 5 lists *transformations* as Proof content,
confirming the Phase 4 recommendation: **Transformation is the before/after
device inside Home §08 Proof.**

### Flagged

**The fourth cinematic moment has no content at launch.** Phase 5 lists case
studies, testimonials, transformations and metrics as *future expansion* for
Proof. So the site ships with **three** cinematic moments — Hero, Operating
System, Connect With Us — and the fourth activates when real proof content
exists. Building a cinematic frame around absent content is precisely the "fake
authority" that section is told to avoid.

**Both pins are now confirmed and spent.** Phase 5 encourages pinned scrolling
at §04 and sticky storytelling at §06. That is exactly Phase 3's two-pin
site-wide cap, fully allocated. Nothing else can be pinned anywhere on the site.

**Who We Work With — the "not for" list.** Phase 1 established that stating who
Ascent is *not* for is the strongest available trust signal. Phase 5 says
"self-qualify", which runs both ways, but does not state exclusion explicitly.
Retained as a recommendation, flagged for confirmation.

**Minor:** the Phase 5 narrative arc omits *Why Ascent* (§05) between the
Operating System and How It Works. Read as compression, not removal — §05 is the
bridge between understanding the system and understanding the process. No action.

**CTA wording.** Phase 5 gives "Send a WhatsApp Message" while also placing exact
CTA wording out of scope. Adopted as the working label; final wording in the
content phase.

---

## Phase 4 — Information Architecture & Experience Flow

Approved and applied to `05-site-architecture.md`.

### Overrides applied

| # | Element | Phase 1 draft | Phase 4 specifies | Status |
|---|---|---|---|---|
| D-22 | Page count | 5 — Home, The System, Work, About, Contact | **4** — Home, About Us, Services, Let's Connect | ✅ Applied |
| D-23 | Proof as a page | Dedicated *Work* page | A section on Home; Case Studies deferred | ✅ Applied |
| D-24 | The System as a page | Dedicated page | Becomes *Services* | ✅ Applied |
| D-25 | Contact naming | "Contact" | **"Let's Connect"** | ✅ Applied |
| D-26 | Home sections | 9 | **10** — adds *Why Ascent*; splits fit and proof | ✅ Applied |
| D-27 | "The Distinction" | Section name | **"The New Perspective"** | ✅ Applied |
| D-28 | "Fit" | Section name | **"Who We Help"** (Home) / **"Ideal Client"** (Services) | ✅ Applied |
| D-29 | Final CTA | "Final CTA" | **"Connect With Us"**, reusable on every page | ✅ Applied |
| D-30 | Service structure | 5 modules | **3 pillars** — Strategy, Production, Performance | ✅ Reconciled, see below |
| D-31 | Footer social icons | Excluded | Social links included | ✅ Applied |
| D-32 | Journey order | Relief → Confidence → Trust | Understanding → Trust → Confidence | ✅ Applied |

### D-30 — five modules inside three pillars

Both are kept, at two altitudes. Pillars are the navigation; modules are the
substance inside them.

| Pillar | Modules |
|---|---|
| Strategy | 01 Positioning · 02 Narrative |
| Production | 03 Production |
| Performance | 04 Distribution · 05 Demand |

Pillar names are confirmed by Phase 4. Module names remain **proposed**.

### Flagged

**Transformation has no home.** Phase 3 designates *Transformation* one of four
cinematic moments and a pinning candidate. The Phase 4 architecture contains no
such section. Recommendation: it is the before/after device inside **Home §08
Proof** — far enough from §04 that two heavy moments do not collide, and it
gives Proof weight without padding it with logos. Alternative: Services §06
*How Everything Works Together*. Both work; only one can be it.

**About has three belief-adjacent sections in a row** — *What We Believe* (02),
*Our Philosophy* (05), *How We Think* (06). Without hard remits they become the
same page said three times. Proposed split in `05-site-architecture.md`:
convictions → operating principles → demonstrated method. If a sentence could
sit in more than one, the split has failed.

**Two deliberate cross-page overlaps** — fit and FAQ appear on both Home and
Services. Phase 4 also requires pages avoid overlapping content for SEO.
Differentiated by altitude: Home asks *should I have this conversation*,
Services asks *how does delivery work*.

**Pin budget is now fully allocated.** Phase 3 caps pinned sections at two
site-wide. Home §04 Operating System and Home §06 How We Work take both. Any
later request to pin something else must displace one of them.

---

## Phase 3 — Motion Design System & Scroll Storytelling

Approved and applied to `04-motion.md` and the motion tokens. Implementation
(GSAP, Framer Motion, Lenis, Three.js) deliberately deferred.

### Overrides applied

| # | Element | Previously | Phase 3 specifies | Status |
|---|---|---|---|---|
| D-12 | Page transition | 300ms fade | 500ms transition | ✅ Kept as two separate things — 300ms first paint, 500ms route change |
| D-13 | Springs | Banned outright | Permitted, tiny interactions only | ✅ Applied, critically damped |
| D-14 | Button lift | −2px fixed | 2–4px | ✅ Default −2px, −4px for Level 4 CTAs |
| D-15 | Smooth scrolling | Not specified | Enabled globally | ✅ Applied, with hard requirements |
| D-16 | Counters | Banned (Phase 1) | Permitted, once, never repeat | ✅ Applied |
| D-17 | Marquee / auto-scroll | Banned (Phase 1) | Permitted, very slow and subtle | ✅ Applied, pauses on hover |
| D-18 | Blur in reveals | Not used | Part of the signature reveal | ✅ Applied, with a performance budget |
| D-19 | Signature reveal | opacity + Y | opacity → Y → blur-to-sharp | ✅ Applied |
| D-20 | Stagger | 60ms, cap 5 | Not specified | ✅ Set to 80ms, cap 6 — 480ms total, inside the 1000ms ceiling |
| D-21 | Cinematic moments | Not defined | Hero · OS · Transformation · Connect With Us | ✅ Treated as a fixed budget of four |

### Flagged

**Blur versus the 60fps floor.** The signature reveal uses blur, the performance
section says *filter (sparingly)*, and the floor is 60fps on mid-range Android.
`filter: blur()` forces an offscreen render pass per element per frame and is the
most reliable way to miss that floor. Resolved with a budget rather than a
rewrite: maximum 3 blurred elements animating at once, 8px ceiling, never on
large images or video, disabled below 768px, and first to be dropped under load.
The reveal reads correctly without it.

**Three-transformation cap.** The signature reveal is opacity + Y + blur, which
is exactly the stated maximum. Nothing may be layered on top of it — no scale,
no tracking change, no rotation on a signature reveal.

**Smooth scrolling.** Momentum scroll replaces native scroll and, done
carelessly, breaks find-in-page, keyboard paging, anchor jumps and focus
scrolling — and it compounds badly with trackpad inertia, which is what founders
use. Implemented as specified with hard requirements listed in `04-motion.md`
§ Global feel. If those cannot be met, native scroll is the better product.

### New section names to reconcile in Phase 4

Phase 3 names two sections that do not appear in the Phase 1 architecture draft:
**Transformation** and **Connect With Us**. Both are designated cinematic
moments, so Phase 4 needs to place them. Working assumption: *Transformation* is
the before/after outcome section and *Connect With Us* is the final CTA. Confirm
in Phase 4.

---

## Phase 2 — Design System & Visual Language

The Phase 2 brief specified the visual language directly. It overrode most of
the Phase 1 visual proposal. Positioning, voice, audience psychology and the
operating-system model are untouched.

### Overrides applied

| # | Element | Phase 1 proposed | Phase 2 specifies | Status |
|---|---|---|---|---|
| D-01 | Accent | Muted brass `#8A6636` | Brand blue `#0597FF` | ✅ Applied |
| D-02 | Ground | `#FBFAF8` | `#FAFAF8` | ✅ Applied |
| D-03 | Typography | Editorial serif display + sans body | Helvetica-inspired sans only | ✅ Applied |
| D-04 | Shape | Square-ish, 4px buttons, "no pill" | 14 / 18 / 20 / 24 / 28px, "no sharp corners" | ✅ Applied |
| D-05 | Depth | Near-zero, one nav shadow | Subtle shadows on nav, cards, modal, CTA | ✅ Applied |
| D-06 | Dark sections | Two dark anchors per page | Not listed in backgrounds | ⚠️ **Open** |
| D-07 | Body size | 17px | 18px | ✅ Applied |
| D-08 | Content width | 1120 / 720 | 1280 / 960 / 780 | ✅ Applied |
| D-09 | Section rhythm | 96–160px | 160px / 220px | ✅ Applied |
| D-10 | Gradients | Forbidden outright | Permitted, "extremely subtle" | ✅ Applied |
| D-11 | Motion timings | 150 / 250 / 400 / 600ms | 200 / 250 / 200 / 300ms | ✅ Applied |

Phase 1's justification for brass — that warm, print-adjacent colour separates
Ascent from SaaS blue — no longer applies and has been removed rather than
argued. `#0597FF` is now the brand.

### D-06 — the one genuinely open item

Phase 1 asked which visual base to build on. **Light editorial with dark anchors
was chosen.** Phase 2's background section reads:

> Mostly Off White. Some Pure White. Occasional Sky Blue. Rare use of Blue.

That enumeration omits dark sections without explicitly withdrawing them.

**Interim position:** navy tokens (`#082236`, under `.deep`) exist and are
unused. Nothing renders dark until this is settled, and deleting the block is a
one-line change if the answer is no.

The two readings, honestly:

- **Keep them.** Two per page, as brand navy rather than near-black, so they sit
  inside the blue family instead of introducing a second world. Gives the page
  two moments of weight and a reason for the eye to reset.
- **Drop them.** Simpler, closer to Apple/Linear/Notion, and consistent with an
  all-light background list. The site relies entirely on typography and
  whitespace for rhythm, which is harder to do well but quieter when it works.

Either is defensible. It needs one word from you before Phase 4 lays out
sections.

### Accessibility corrections

Three Phase 2 colour specifications fail the WCAG AA requirement the same brief
sets. Corrected in `tokens/tokens.css`, detailed in
`03-design-system.md` § Accessibility corrections.

| Specified | Measured | Required | Applied |
|---|---|---|---|
| White text on `#0597FF` button | 3.05:1 | 4.5:1 | Fill is `--blue-700` `#0870BA` → 5.22:1 |
| `#0597FF` link text on `#FAFAF8` | 2.92:1 | 4.5:1 | Link is `--blue-700` → 4.99:1 |
| `#8B8B8B` at 14px caption | 3.26:1 | 4.5:1 | Caption is `#6B7075` → 4.78:1 |

`#0597FF` remains the brand blue everywhere the brief specifies, except where it
carries or outlines text. The two blues sit one step apart on the same hue and
read as one colour with a pressed state.

### Flagged, not changed

- **Font stack.** `Helvetica Neue → Inter → Geist` renders a different face per
  platform, shifting headline wrapping and rhythm. Recommendation: ship one
  self-hosted family (Inter Display) and keep Helvetica Neue as the intent.
  Implemented as specified until you decide.
- **Surface temperature.** Ground `#FAFAF8` is warm; surface `#F5F7FA` is cool.
  Adjacent, they read as a mismatch rather than a step. Options in
  `03-design-system.md` § Surface. Implemented as specified.

### Scope moved by Phase 2

Phase 1 delivered more than Phase 2's scope map allows for. Those documents are
retained but re-labelled, not deleted — the thinking still holds and the later
phases can accept, revise or discard it.

| Document | Now |
|---|---|
| `04-motion.md` | ✅ Superseded by the approved Phase 3 system. |
| `05-site-architecture.md` | Phase 4 draft. |
| Draft copy in `02-positioning.md` | Content phase draft. |

---

## Phase 1 — Brand Foundation

| # | Decision | Rationale |
|---|---|---|
| D-00a | Positioning: Personal Brand Operating Systems, never an agency of any kind | Client brief |
| D-00b | Five-module OS: Positioning · Narrative · Production · Distribution · Demand | Proposed. **Still pending client confirmation.** |
| D-00c | Module 05 loops back into 01 and 02 | The most defensible claim available; answers "I got content, not business" |
| D-00d | Attack the model, never the vendor | Founders chose those agencies; defensiveness kills recognition |
| D-00e | State who Ascent is *not* for | Turning work away in public is the strongest available trust signal |
| D-00f | No exit-intent, sticky bars, floating bubbles, fake scarcity | ~10 qualified calls/month is a qualification problem, not a volume one |
| D-00g | Two CTAs only: Book a Strategy Call (primary), WhatsApp Us (secondary) | Client brief |

All still current.

---

## Still open

| Item | Blocks | Owner |
|---|---|---|
| **D-45** — one CTA label site-wide: "Book a Strategy Call" or "Book a Call" | Copy, analytics | Client |
| Grid density below 768px — 24px minor, no major? | §04 rebuild | Either |
| "Not for" list in Home §07 — confirm it stays | Homepage copy | Client |
| Booking URL and WhatsApp number | Working CTAs | Client |
| Founder time commitment — a defensible number | Content phase | Client |
| Proof assets — artefacts, outcomes, attribution | Content phase | Client |

**Closed:** the five OS module names (retired in D-42), Transformation placement
(resolved in Phase 5), the typeface (Geist, D-52), and **D-06** — resolved as
Editorial Blueprint × Premium 3D.
