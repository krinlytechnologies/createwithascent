# Landing scene assets

Everything the intro needs is present. Wired in
`components/home/IntroScene.tsx`.

---

## ✅ Sky — done

Three sources, ordered smallest-first; the browser takes the first it can
decode.

| File | Codec | Size |
|---|---|---|
| `sky-av1.mp4` | AV1 (SVT-AV1, CRF 38) | **653 KB** |
| `sky.webm` | VP9 (CRF 40) | 789 KB |
| `sky.mp4` | H.264 (CRF 30, faststart) | 1.40 MB |
| `sky-poster.jpg` | JPEG, frame at 1s | 42 KB |

Re-encoded from a 4.77 MB original: 1920 × 1080, 30fps, 10.93s, no audio track.
Most visitors now download **653 KB** — an 86% reduction. Verified in the
browser as the served source.

---

## ✅ Clouds — `left.png` / `right.png`

1536 × 1024, RGBA, landscape (3:2). Sized by width — `w-[92vw] md:w-[62vw]` —
so each reads as a bank spanning the screen rather than a column.

> ⚠️ **The two files are byte-identical.** Same SHA256 (`3BA469B4AB4C54A8`),
> same dimensions, same 1779 KB. They are the same export saved twice, not two
> different banks.
>
> The right cloud is therefore **mirrored in CSS** so the pair faces each other.
> If a genuinely distinct right-hand bank is supplied, remove `mirrored` from
> the right `<Cloud>` — one line.

**Delivery is fine despite the source weight.** `next/image` serves AVIF:
**1779 KB → 62.7 KB** at 1200px. The 3.5 MB in the repository is duplicated
source, not payload.

---

## ✅ Logo — `ASCENT BLUE OG LOGO PNG.png`

2357 × 2330, RGBA, 114 KB → **7.5 KB AVIF** delivered.

Revealed centred as the banks close, held through the pause, and gone as the
curtain opens. Sized `clamp(34px, min(8vh, 10vw), 104px)`.

The filename contains spaces and is referenced as-is; verified loading in the
browser. Renaming it would be tidier but is not required.

---

## How the composition solves itself

At the hold the scene reads **ASCENT · mark · STUDIOS**, centred as one lockup.
None of it is hand-positioned.

`geometry()` in `IntroScene.tsx` measures the cloud box, both word widths, the
computed font size and the mark's width, then solves for all four cloud
positions. Re-measured on every `ScrollTrigger.refresh()`, so it survives
resize, orientation change and a change of artwork.

Measured at the hold:

| | Word gap | Mark width | Clearance each side |
|---|---|---|---|
| Desktop 1440 × 900 | 111px | 73px | 19px |
| Mobile 390 × 844 | 63px | 40px | 11px |

### The constants that govern it

Change these, never the timeline:

| Constant | Value | Meaning |
|---|---|---|
| `TYPE_CENTRE` | 0.68 | Where the word sits across the cloud's width |
| `WORD_SPACE` | 0.5 | Clearance around the mark, in font sizes |
| `VISIBLE_AT_REST` | 0.20 | Fraction of each cloud on screen before scrolling |
| `OPEN_GAP` | 0.55 | Curtain parting, as a fraction of viewport width |
| `APPROACH_FRACTION` | 0.55 | How far the first move travels toward the lockup |

`CUE.curtain = 50` is locked by direction. Do not change the `CUE` values.

### Swapping artwork later

Only two things in `IntroScene.tsx`:

```ts
const CLOUD = { width: 1536, height: 1024 };   // and aspect-[3/2] on the box
```

The wordmark clamp and every cloud position derive themselves from what is
actually rendered.

---

## Unused

`cloud.png` (408 × 611, 91 KB) was the original placeholder and is no longer
referenced anywhere. Safe to delete — left in place rather than removed without
asking.
