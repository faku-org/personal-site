# Design System — Swiss / International Typographic Style

Reference for the redesign that replaced the glassmorphism + Bauhaus-teal look
with an International Typographic Style system, and added the background story
and chronological project timeline.

Source of truth for tokens: [`src/index.css`](../src/index.css).
Source of truth for content: [`src/config.ts`](../src/config.ts).

---

## 1. What changed

| Area | Before | After |
| --- | --- | --- |
| Visual language | Glassmorphism + Bauhaus, teal | Swiss / International Typographic Style |
| Surfaces | `backdrop-filter: blur(18px)`, translucent cards | Flat opaque paper |
| Depth | `box-shadow`, inset highlights, glow orbs | Hairline rules only |
| Corners | `border-radius: 16–50px` | `0` everywhere |
| Colour | Gradients on every card | Flat fills, one accent |
| Background | Fixed grid pattern + two blurred glow blobs | Plain paper |
| Body type | Plus Jakarta Sans | Inter |
| Serif | IBM Plex Serif (story lede) | Removed — one grotesque |
| Projects | 12 hand-placed cards on a 12-col Bauhaus grid | Chronological timeline grouped by era |
| Project detail | External link only | Modal with story + evolution |
| Ornament | Gradient dot, floating accent block, per-card glow orbs | One 8×8 accent square |

**Deleted outright:** all `--glass-*` visual behaviour, `float` keyframe
animation, the `.hero__accent-block`, every `.project-card--*` rule (12 blocks
of bespoke grid placement and gradients), and the `body::before` / `body::after`
glow blobs.

The `--glass-*`, `--bg-color`, `--primary`, `--text-dark` and `--card-shadow`
token *names* still exist because `src/blog/*.css` (687 lines, untouched) reads
them. They are re-pointed at flat Swiss values — `--glass-blur: 0px`,
`--card-shadow: transparent` — so the blog inherits the new system without a
rewrite. Rewriting the blog stylesheets to the new tokens is still open.

---

## 2. Palette

Seeded from the four colours given (`#E3F2FD`, `#90CAF9`, `#2196F3`, `#0D47A1`),
then adjusted: near-black ink, and darker steps of the same blue where the base
tone did not clear contrast.

### The constraint that shaped it

`#2196F3` is a mid-luminance blue. Against a light paper it reaches only
**2.74:1** — below the 4.5:1 needed for body text, and below 3:1 for UI borders.
Nothing in the source palette clears 4.5:1 against it either, so it cannot carry
text *or* be a fill behind text on the light theme.

So the accent splits into three roles:

| Token | Role | Light | Dark |
| --- | --- | --- | --- |
| `--accent` | **Graphics only** — rules, squares, bars, the modal's top edge. Never text. | `#2196F3` | `#2196F3` |
| `--accent-text` | Blue that is legible as text | `#1565C0` | `#90CAF9` |
| `--accent-fill` | Blue that is legible *behind* text | `#1565C0` | `#2196F3` |
| `--accent-fill-ink` | Text sitting on `--accent-fill` | `#FFFFFF` | `#0A0F14` |

### Full token set

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--paper` | `#F7FAFD` | `#0A0F14` | Page ground |
| `--paper-raised` | `#E3F2FD` | `#141C24` | Row hover tint |
| `--ink` | `#0A0F14` | `#E3F2FD` | Primary text |
| `--ink-muted` | `#5A646E` | `#90A0B0` | Secondary text, mono labels |
| `--rule` | `rgba(10,15,20,.16)` | `rgba(227,242,253,.22)` | Hairline dividers |
| `--rule-soft` | `#90CAF9` | `rgba(144,202,249,.4)` | Secondary rules |
| `--rule-strong` | `#0A0F14` | `#E3F2FD` | Heavy section rules |
| `--backdrop` | `rgba(10,15,20,.86)` | `rgba(5,8,11,.9)` | Modal backdrop |

The light-blue `#E3F2FD` survives as the **hover tint** on timeline rows rather
than as the page ground — it reads as a deliberate highlight instead of a wash.
`#0D47A1` is not used directly; `#1565C0` replaced it as the text/fill blue for
a better step against near-black ink.

### Measured contrast

Sampled from the running page with a WCAG relative-luminance check, after the
theme transition settled. All text ≥ 4.5:1.

| Element | Light | Dark |
| --- | --- | --- |
| Card title (ink) | **18.37:1** | **16.85:1** |
| Card description (muted) | **5.76:1** | **7.18:1** |
| Tag / section label (muted) | **5.76:1** | **7.18:1** |
| Era range (accent text) | **5.49:1** | **11.0:1** |
| `LIVE` badge (ink on accent fill) | **5.75:1** | **6.16:1** |

> If you change a colour, re-check it. The trap is `--accent`: it looks fine and
> fails. Keep it out of `color:`.

---

## 3. Typography

Two families, no serif.

| Role | Family | Notes |
| --- | --- | --- |
| Everything structural | **Inter** | Neo-grotesque stand-in for Helvetica; variable, optical sizing on |
| Labels, years, metadata | **JetBrains Mono** | Uppercase, wide tracking |

Loaded from Google Fonts via a single preconnected `<link>` in `index.html`
(see §10). `--font-serif` is aliased to the
sans stack so the blog's serif rules collapse into the grotesque instead of
falling back to Georgia.

### Scale (as specified; all headings `clamp()`)

| Element | Size | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- |
| Hero name | `clamp(3.4rem, 15vw, 12rem)` | 800 | `-0.045em` | `0.82` |
| Footer heading | `clamp(2.2rem, 7vw, 5rem)` | 800 | `-0.04em` | `0.88` |
| Modal title | `clamp(2.2rem, 7vw, 4.5rem)` | 800 | `-0.045em` | `0.88` |
| Era label | `clamp(2rem, 5.5vw, 4rem)` | 800 | `-0.04em` | `0.9` |
| Story heading | `clamp(1.9rem, 4.5vw, 3.4rem)` | 800 | `-0.035em` | `0.92` |
| Card title | `clamp(1.5rem, 3.4vw, 2.4rem)` | 700 | `-0.035em` | `1.0` |
| Card year (mono) | `clamp(1.4rem, 3vw, 2rem)` | 500 | `-0.03em` | `1.0` |
| Story lede | `clamp(1.15rem, 2.1vw, 1.5rem)` | 500 | `-0.015em` | `1.35` |
| Body | `1rem` | 400 | normal | `1.65` |
| Card description | `0.98rem` | 400 | normal | `1.55` |
| Mono label | `0.66–0.68rem` | 500 | `0.16em` | — |
| Status badge | `0.6rem` | 500 | `0.14em` | — |

Rules of the scale: display type is uppercase, heavy, tight-tracked and set
below 1.0 leading. Mono labels are the inverse — small, wide-tracked, muted.
Nothing sits in between; that gap is what makes the hierarchy read.

Measure is capped at `--measure: 66ch` on every prose block.

---

## 4. Layout

- Shell: `max-width: 1240px`, gutter `--gutter: 1.5rem` (1rem on mobile).
- Field: 12 columns, expressed as `4fr / 8fr` or `3fr / 9fr` splits rather than
  a declared grid — label left, content right.
- Structure is drawn entirely with rules:
  - `--rule-heavy` (3px, `--rule-strong`) closes the hero and opens each era.
  - `--rule-hairline` (1px, `--rule`) separates every timeline row and meta row.
- No shadow, no radius, no gradient anywhere in the new stylesheets.

### Section anatomy

```
hero          meta rule · name · tagline + socials   ▸ 3px rule
story         4fr heading / 8fr prose · stat strip
orgs          4fr heading / 8fr blurb ▸ 3px rule · rows
timeline      era block ▸ 3px rule
                era head: 4fr (range + label) / 8fr blurb
                rows:     4fr (year + status) / 8fr (title, desc, tags, cta)
footer        3px rule · heading / email + socials
```

---

## 5. Components

**Hero** — uppercase name at up to `12rem`, a hairline meta row above
(`PORTFOLIO` / `URUGUAY`), tagline segments split on `|` and rejoined with a
blue `/`.

**Story** (`src/timeline/Story.tsx`) — 4fr/8fr split, first paragraph set as a
lede, followed by a three-cell stat strip divided by vertical rules.

**Orgs** (`src/timeline/Orgs.tsx`) — the seven umbrellas the work is organised
under, as a rule-separated list: name in mono on the left, purpose on the right,
an accent arrow revealed on hover. Sits between the story and the timeline so the
structure is known before the chronology starts.

**Timeline** (`src/timeline/Timeline.tsx`) — projects grouped into eras, sorted
by `started` (`YYYY-MM`) ascending. Each row is a full-width `<button>`; the external link lives
inside the modal, which keeps a link out of a button. Status badges:
`live` (filled), `building` (outlined accent), `archived` (dimmed), `concept`.
The row head also carries the project's org, prefixed by a short soft rule.
An 8×8 accent square appears in the left margin on hover or focus-within.

**Modal** (`src/timeline/ProjectModal.tsx`) — native `<dialog>` + `showModal()`,
so the focus trap, `Esc` and background inerting come from the platform. Added
on top: backdrop-click close, body scroll lock, and scroll reset on open.
Sheet is `min(100%, 900px)` on a 6px accent top edge. Sections: head, meta
(role / stack), background prose, numbered evolution list, CTA footer.

`display` is scoped to `.modal[open]` so the dialog's native `display: none`
is not overridden while closed.

`::backdrop` does not inherit custom properties in every engine, so
`var(--backdrop, <literal>)` carries a fallback.

---

## 6. Motion

Deliberately minimal — Swiss is a static discipline.

| What | Duration | Easing |
| --- | --- | --- |
| Hover state changes | `0.15s` | `linear` |
| CTA rule extending 24px → 48px | `0.2s` | `ease` |
| Scroll reveal (fade + 14px rise) | `0.5s` | `ease` |
| Modal sheet enter (`@starting-style`) | `0.2s` | `ease` |
| Theme change | `0.25s` | `linear` |

Reveal is driven by one `IntersectionObserver` that unobserves each node after
it fires, with a no-observer fallback that marks everything visible.
`prefers-reduced-motion: reduce` is honoured globally in `index.css` and again
on `[data-reveal]`, so nothing depends on animation to become visible.

---

## 7. Verified

Checked against the running dev server:

- Typecheck (`tsc -b --noEmit`) clean; lint clean for `src/` — the one remaining
  lint error is pre-existing in `admin/src/hooks/useAutoSave.ts`, untouched here.
- Both fonts resolve (`Inter`, `JetBrains Mono`), not fallbacks.
- 3 eras, 12 project rows render.
- Modal: opens on row click, focus lands inside, `body` scroll locks, closes via
  close button / `cancel` / backdrop click, and scroll lock is released each time.
- Contrast measured in both themes — table in §2.
- 375×812: no horizontal overflow (`scrollWidth === clientWidth === 375`), all
  grids collapse to one column.

Not verified: full-page visual screenshots — the browser pane was hidden during
the session, so the page could not paint. Layout was confirmed through computed
geometry instead. **Worth an eyeball pass before deploying.**

---

## 8. Internationalisation (EN / ES)

No i18n library — the site is small enough that a typed value per locale beats a
runtime translation layer.

```ts
type L<T = string> = Readonly<Record<'en' | 'es', T>>
```

Content is authored once per locale directly in `src/config.ts`, and read
through a single hook:

```tsx
const { t, locale, toggleLocale } = useLocale()
t(project.description)          // → string
t(ui.modalVisit)(project.title) // → 'Visit Lux' / 'Ir a Lux'
```

| File | Holds |
| --- | --- |
| `src/i18n/types.ts` | `Locale`, `L<T>`, `pick()`, the locale list |
| `src/i18n/context.ts` | The context object (no JSX, so Fast Refresh stays happy) |
| `src/i18n/LocaleProvider.tsx` | State, persistence, `<html lang>` sync |
| `src/i18n/useLocale.ts` | The `useLocale()` hook, returning a bound `t()` |
| `src/i18n/strings.ts` | Interface chrome — labels, buttons, aria text |

Locale resolution order: `localStorage` → `navigator.languages` → `en`.
The choice persists and sets `<html lang>`, which matters for screen readers and
for search engines.

`t()` falls back to the default locale when a key is missing, so a half-translated
entry renders English rather than blank.

The toggle sits in a fixed control cluster in the top-right corner, sharing a
border with the theme toggle — two 48px cells divided by a hairline.

---

## 9. Tags

Each project carries `tags: readonly string[]` — short topic and tech keywords,
shown on the timeline row and again in the modal's meta block.

They are **deliberately untranslated**: `Tauri`, `React 19`, `Browser-only`,
`Job board` are proper nouns or established terms, and translating them would
make them less scannable, not more. `stack` stays separate — it is the exact
dependency list, where `tags` is the curated summary.

Row tags render as a `/`-separated mono line; modal tags render as bordered
chips.

---

## 10. Machine-readable files

| File | Purpose |
| --- | --- |
| `public/llms.txt` | Site summary for language models, per the llmstxt.org convention: a blockquote summary, contact links, and every project with a one-paragraph description |
| `public/robots.txt` | Allows everything, points at the sitemap |
| `public/sitemap.xml` | Static routes only (`/`, `/blog`) |

All three hardcode `https://facupresa.com`, inferred from the contact email.
**CONFIRM the canonical domain** — each file carries a note saying so.

The sitemap does not list individual blog posts. If the blog grows, generate it
from `posts/` at build time rather than hand-editing.

### Font loading

`index.html` was loading a static-weight Inter while `index.css` `@import`ed the
variable version — two font requests for one family, the second blocked behind
CSS parsing. Now there is a single preconnected `<link>` in `index.html` for both
Inter and JetBrains Mono, and no `@import`.

---

## 11. Content — where to edit

Everything narrative is in [`src/config.ts`](../src/config.ts), authored per locale:

| Export | Drives |
| --- | --- |
| `siteConfig` | Name, tagline, email, footer line |
| `background` | Story paragraphs + stat strip |
| `eras` | Timeline chapters — `id`, `range`, `label`, `blurb` |
| `orgs` | The umbrellas — `id`, `name`, `url`, `purpose` |
| `projects` | Every row: `started`, `era`, `org`, `status`, `tags`, `role`, `stack`, `story`, `milestones`, `links` |

`started` is `YYYY-MM` and drives **both** the displayed year and the sort order,
so there is no way for the two to disagree. Ties break on array order.

Adding an era needs a matching `EraId` in the union type; adding an org needs an
`OrgId`. `orgById` resolves a project's `org` to its record, and the Orgs
section's heading counts the array rather than hardcoding a number.

Project data provenance and the open questions are tracked separately in
[content-sources.md](content-sources.md).
