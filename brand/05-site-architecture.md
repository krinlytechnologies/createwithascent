# 05 — Information Architecture & Experience Flow

**Phase 4.** Approved. This defines *what information appears and in what order*
— not visuals (Phase 2), not motion (Phase 3), not copy, not layout, not
implementation.

> Supersedes the Phase 1 architecture draft. Override log in `00-decisions.md`.

---

## Philosophy

**Do not build a website. Build a founder journey.**

The visitor should never wonder: *What does Ascent do? Who is this for? Why is
this different? What happens next?* The architecture answers those naturally.

The site should feel like a **conversation, not a presentation**. Every scroll
answers the visitor's next question before they ask it.

---

## Structure

Four pages. Intentionally. No others.

```
Home  →  About Us  →  Services  →  Let's Connect
```

| Page | The one question it answers |
|---|---|
| **Home** | Why should I care? |
| **About Us** | Why should I trust Ascent? |
| **Services** | What exactly do we get? |
| **Let's Connect** | How do we start working together? |

The fewer decisions a visitor makes, the easier the experience becomes.

### Navigation

Logo · Home · About · Services · Let's Connect · **Book a Strategy Call**

Consistent across every page. Navigation is a guide, not a sitemap.

### Journey

```
Arrival → Recognition → Understanding → Trust → Confidence → Conversation
```

No page interrupts this flow.

---

## HOME

**Purpose:** answer *why should I care?*

The homepage should not explain everything. It should introduce the right
questions. Establish positioning, create curiosity, build trust, encourage
exploration.

| # | Section | The one question | Emotion | Must not |
|---|---|---|---|---|
| 01 | **Hero** | What is this? | Curiosity | Explain the whole offer |
| 02 | **The Problem** | Do they understand my situation? | Recognition | Attack the agencies they hired |
| 03 | **The Shift** | Is there another way to think about this? | Relief | Become a feature list |
| 04 | **The Personal Brand Operating System** | What is the philosophy? | Understanding | Read as a service menu |
| 05 | **What We Do** | What exactly do I get? | Clarity | Become three feature lists |
| 06 | **How We Work** | How does engagement run? | Confidence | Hide the founder's time cost |
| 07 | **Who We Work With** | Is this for me? | Qualification | Try to include everyone |
| 08 | **Why Ascent** | Why them and not someone else? | Trust | Claim superiority — show reasoning |
| 09 | **Proof** | Does it actually work? | Trust | Pad with logos |
| 10 | **FAQ** | What am I not being told? | Reassurance | Hedge |
| 11 | **Connect With Us** | What happens next? | Action | Apply pressure |

Do not reorder without a strong rationale.

> **Full homepage specification — purpose, emotion, content, motion level, layout
> direction, success criteria and failure modes for every section — is in
> `06-homepage.md` (Phase 5).** The summary below stays for cross-page context.

### Notes on individual sections

**02 — The Problem.** This is where the page is won or lost. If recognition
does not land here, nothing after it matters. Attack the *model*, not the
vendor: the founder chose those agencies, and defensiveness kills recognition.

**05 — Why Ascent** is new to the architecture and is the section most at risk
of becoming a boast. It sits *after* the operating system is explained, which
means it should not re-argue the system — it should answer why Ascent is the
company that runs it. Reasoning and method, not adjectives.

**07 — Who We Help** must include who Ascent is **not** for. Turning work away
in public is the strongest trust signal available and it costs nothing. This is
a qualification device, not a disclaimer.

**08 — Proof.** Ranked by trust generated per unit of space: process artefacts
first (a redacted positioning document, a real cadence calendar, a demand
dashboard), then one or two specific attributed outcomes, then point of view.
Logo walls last, and only if the names are notable. If outcome data is thin at
launch, lead with artefacts. Never manufacture the rest.

---

## ABOUT US

**Purpose:** answer *why should I trust Ascent?*

Philosophy — not company history, not milestones, not timelines. Visitors leave
understanding what Ascent believes, why it exists, and why it works differently.

| # | Section | The one question |
|---|---|---|
| 01 | **Hero** | What does this company stand for? |
| 02 | **Why We Exist** | Why does this company exist? |
| 03 | **The Problem With Traditional Agencies** | Do they see what I have experienced? |
| 04 | **Our Belief** | What is the missing layer? |
| 05 | **Our Philosophy** | What principles govern the work? |
| 06 | **How We Think** | Is their reasoning sound? |
| 07 | **How We Work** | How does an engagement progress? |
| 08 | **Who We Build For** | Is this for me? |
| 09 | **Why It Works** | Does it hold together? |
| 10 | **Connect With Us** | What happens next? |

**Full specification in `08-about.md` (Phase 6).**

The overlap risk flagged here in Phase 4 — three belief-adjacent sections — was
resolved by Phase 6, which gave §04, §05 and §06 distinct remits: what Ascent
believes about the market · the principles that belief produces · the reasoning
method applied to a specific founder.

**07 How We Work** also appears on Home. On About it is the concise reference
version of the four-stage model; on Home it is the full progressive-reveal
treatment. The difference in weight signals which page owns the explanation.

---

## SERVICES

**Purpose:** answer *what exactly do we get?*

Do not present services as disconnected offerings. Present them as **one
integrated operating system**.

| # | Section | The one question |
|---|---|---|
| 01 | **Introduction** | What am I looking at? |
| 02 | **The Personal Brand Operating System** | What is the system? |
| 03 | **Content Strategy** | What gets decided? |
| 04 | **Production** | What gets made? |
| 05 | **Metrics** | How is it measured? |
| 06 | **How Everything Works Together** | Why is this one system, not three services? |
| 07 | **Ideal Client** | Is my business the right fit? |
| 08 | **FAQ** | What are the practical details? |
| 09 | **Connect With Us** | What happens next? |

### The three pillars

| Pillar | Answers |
|---|---|
| **Content Strategy** | Clear positioning, audience insight and direction built around what the market cares about |
| **Production** | Expertise transformed into sharp, consistent content across platforms and formats |
| **Metrics** | Leads, conversations and demand — not views, not likes |

Full inclusions and scope in `07-services.md`.

The five OS modules proposed in Phase 1 — Positioning, Narrative, Production,
Distribution, Demand — are **retired**. They were a working model pending
confirmation; the three defined pillars replaced them.

**06 How Everything Works Together** is the most important section on this page
and the reason the page is not a service menu. It carries the feedback loop:
Performance feeds back into Strategy, so what the market responds to changes
what gets said next. That loop is the single most defensible claim available,
and this is the only place it is explained in full.

### Deliberate overlaps to differentiate

Two sections appear on both Home and Services and must not repeat:

| | Home | Services |
|---|---|---|
| **Fit** | *Who We Help* — am I the right kind of founder? | *Ideal Client* — is my business at the right stage for this engagement? |
| **FAQ** | Should I even have this conversation? Price bracket, timeline, my time, what if it doesn't work | How does delivery actually work? Cadence, ownership of output, revisions, onboarding, tooling |

---

## LET'S CONNECT

Named **Let's Connect**, never *Contact*. The goal is conversation, not form
submission.

**Purpose:** answer *how do we start working together?*

| # | Element | Purpose |
|---|---|---|
| 01 | Large editorial heading | Set the tone — welcoming, not transactional |
| 02 | Short introduction | One paragraph. Why this conversation is worth thirty minutes |
| 03 | **Book a Strategy Call** | Primary action |
| 04 | **WhatsApp** | Secondary action |
| 05 | Email | Tertiary. For those who prefer it |
| 06 | Expectation setting | What actually happens on the call, and what does not |
| 07 | Closing statement | The offer to disqualify |

**No lengthy forms. No unnecessary friction.** Welcoming, simple, professional.

**06 Expectation setting** is what separates this from a contact page. Say
plainly: how long the call is, who is on it, what will be discussed, and that
there is no pitch. Uncertainty about what happens next is the largest remaining
barrier at this point in the journey.

**07 Closing statement** carries the disqualifying offer — *if an operating
system isn't the right call for your business, we'll say so*. It is the highest
converting sentence available to a premium company, and the most on-brand.

---

## Reusable CTA — Connect With Us

Every page ends with the same signature section.

**Purpose:** transition naturally from information to action. The visitor should
already want to continue; the CTA simply gives them the opportunity.

Identical structure and identical actions on all four pages. Consistency here is
what makes it read as a signature rather than a repeated ask.

---

## Footer

The footer is not a dumping ground.

Logo · short statement · navigation · email · social links · copyright.

Nothing else. No newsletter signup, no sitemap sprawl, no secondary CTA.

---

## Content hierarchy

Every page follows the same reading rhythm:

```
Large headline → Supporting copy → Primary content → Visual → CTA
```

Visitors always know where to look next.

### Section hierarchy

**Each section answers exactly one business question.** Never combine multiple
ideas into one section. Problem, solution, process, transformation, proof and
CTA each deserve their own space.

If a section needs two headings of equal weight, it is two sections.

### Reading experience

Design for scanning: clear headings, short paragraphs, strong hierarchy,
generous spacing, progressive disclosure.

**Assume visitors will not read every word.** Important information must remain
obvious to someone reading only the headlines.

### Content density

Fewer sections. More breathing room. Better storytelling. Every section must
justify its existence.

---

## Conversion strategy

Every page has one destination: **Book a Strategy Call** or **WhatsApp**.

Do not introduce competing CTAs. No newsletter signups, no downloads, no
multiple forms, no pop-ups.

**The website has one job: start qualified conversations.** The target is
roughly ten qualified founder calls per month — a qualification problem, not a
volume problem. Any change that raises total submissions but lowers call quality
is a failure.

---

## Internal linking

Guide visitors naturally. Avoid dead ends — every page suggests the next
logical step.

```
Home  →  About        (why should I trust them?)
About →  Services     (what exactly do we get?)
Services → Let's Connect

Every page  →  Connect With Us  →  Let's Connect
```

Home may also link directly to Services for a visitor who is already convinced
and wants specifics. The chain is the default path, not a forced one.

---

## SEO

Each page has a distinct purpose and avoids overlapping content. Clarity over
keyword repetition.

The two deliberate overlaps — fit and FAQ — are differentiated above precisely
so they do not compete with each other in search.

---

## Scalability

The architecture accepts future additions without restructuring. Excluded from
version one, and where each would attach:

| Future page | Attaches at |
|---|---|
| Case Studies | Expands Home §08 Proof into its own page; nav item after Services |
| Insights / Blog | New nav item; feeds Home §05 Why Ascent with evidence of thinking |
| Resources | Child of Insights |
| Podcast | Child of Insights |
| Careers | Footer only — never primary navigation |

The first version stays focused.

---

## Cross-phase reconciliation

### Motion (Phase 3) mapped to sections

Phase 3 named four cinematic moments and capped pinned sections at two
site-wide. Against this architecture:

| Phase 3 moment | Section | Treatment |
|---|---|---|
| Hero | Home §01 | Cinematic, reveal choreography. Not pinned. |
| Personal Brand Operating System | Home §04 / Services §02 | Cinematic + **pinned** (Home only) |
| How We Work | Home §06 | **Pinned** — the second and final pin |
| Connect With Us | Every page | Cinematic. Not pinned. |
| **Transformation** | Home §08 Proof | ✅ Resolved in Phase 5 |

**Transformation** is the before/after device inside Home §08 Proof. Phase 5
lists *transformations* as Proof content, which settled it. Scroll-linked rather
than pinned, since both pins are allocated.

Note the consequence: Phase 5 lists that content as *future expansion*, so the
site **ships with three cinematic moments** — Hero, Operating System, Connect
With Us — and the fourth activates when real proof content exists. See
`06-homepage.md` §08.

### Surfaces (D-06) mapped to sections

If deep sections are confirmed, the two natural candidates are **Home §04 The
Personal Brand Operating System** and the **Connect With Us** block. That
placement puts weight at the intellectual centre and at the close, with light
between them. Still open — see `00-decisions.md`.

---

## Validation

Before approving any page:

- [ ] Does the visitor immediately understand what Ascent does?
- [ ] Who it serves?
- [ ] Why it is different?
- [ ] What the next step is?
- [ ] Does every section answer exactly one question?
- [ ] Is there exactly one destination — Book a Strategy Call or WhatsApp?
- [ ] Does the page suggest the next logical step rather than dead-ending?
- [ ] Does the headline-only reading still deliver the argument?

If any answer is unclear, refine the architecture before designing the page.
