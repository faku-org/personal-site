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
| Theme | System preference read once on first visit, then frozen | Follows the OS live until the reader toggles |
| Locale | Browser language read once on first visit, then frozen | Follows the browser live until the reader toggles |
| Type scale | Pure `vw` between the clamp bounds | `rem` + `vw`, so it tracks the browser's font-size setting |

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

### Theme resolution

`src/useTheme.ts` holds two pieces of state: the reader's explicit choice
(`'light' | 'dark' | null`) and the current system preference. The rendered
theme is the choice when there is one, and the system value otherwise.

- **No choice yet** → follows `prefers-color-scheme`, and keeps following it: a
  `matchMedia` listener updates the page the moment the OS flips, no reload.
- **After the toggle** → the choice is written to `localStorage` and the OS is
  ignored from then on.

The earlier version wrote `localStorage` inside the mount effect, so the first
system value it ever saw became permanent and the site stopped tracking the OS
after the first visit. Persisting only on the toggle is what fixes that.

A small inline script in `index.html` stamps `data-theme` on `<html>` before
first paint, reading the same two inputs. Without it a dark-preferring reader
gets a white flash while React mounts, because the tokens in `index.css` default
to light. It is the one place where the resolution logic is duplicated, and that
is the standard trade for avoiding the flash.

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

### Scale — fluid, and anchored to the reader's own font size

Every fluid step is a token in `:root`. Call sites reference the token; none of
them writes a `clamp()` of its own.

| Token | Min → Max | Used by |
| --- | --- | --- |
| `--text-display` | 3.4 → 12rem | Hero wordmark |
| `--text-hero` | 2.2 → 5rem | Footer heading |
| `--text-title` | 2.2 → 4.5rem | Modal title |
| `--text-era` | 2 → 4rem | Era label |
| `--text-h1` | 1.9 → 3.4rem | Story heading, orgs heading, blog index title |
| `--text-h2` | 1.8 → 2.8rem | Blog post title |
| `--text-h3` | 1.5 → 2.4rem | Card title, stat value |
| `--text-h4` | 1.4 → 2rem | Card year (mono) |
| `--text-lede` | 1.15 → 1.5rem | Story lede |
| `--text-lede-sm` | 1 → 1.4rem | Hero tagline, modal lede |
| `--text-caption` | 0.95 → 1.15rem | Footer email |
| `--text-mega` | 4 → 8rem | Blog 404 |

Fixed steps below the fluid range: body `1rem`, card description `0.98rem`,
mono label `0.66–0.68rem`, status badge `0.6rem`. These are plain `rem`, so they
already track the reader's setting.

#### Why the preferred value is not pure `vw`

The scale used to read `clamp(2rem, 5.5vw, 4rem)`. The problem is the middle
term: at any width where `5.5vw` wins the clamp — which is most of the desktop
range — the size is a pure function of the viewport, and a reader who sets their
browser's base font to 20px sees **no change at all** in the headlines while the
small print grows around them.

Each step now interpolates linearly between 360px and 1440px, expressed so the
preferred value carries a `rem` intercept:

```
clamp(min, <intercept>rem + <slope>vw, max)
```

Nothing sets `font-size` on `html`, so `rem` *is* the browser's font-size
setting. Measured at 1280px, raising that setting from 16px to 20px now grows
body copy 17.7%, card titles 13.3%, section headings 9–11%, the footer heading
6.9%. Every one of those was 0% before.

The cost is that the old scale reached its maximum at ~1280px and the new one
reaches it at 1440px, so sizes between roughly 1024px and 1440px land 2–10%
smaller than before. At 1440px and above they are identical, and the content
shell caps at 1240px, so the change is invisible on a large display.

#### The wordmark is the deliberate exception

`.hero__name` is `min(var(--text-display), 18vw)`. It is set to fill its column,
so on a narrow screen a 200% base font would push it past the viewport edge. It
is decorative type rather than content, so it is capped against the viewport:
the reader keeps their scale everywhere that carries meaning, and the page never
scrolls sideways. The cap only binds below roughly 960px.

Weights and metrics are unchanged: display type is uppercase, 700–800, tracked
`-0.03em` to `-0.045em`, set below 1.0 leading. Mono labels are the inverse —
small, wide-tracked, muted. Nothing sits in between; that gap is what makes the
hierarchy read.

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

Checked against the running dev server.

**Build gates** — typecheck (`tsc -b --noEmit`) clean, `bun run build` clean,
lint clean for `src/`. The one remaining lint error is pre-existing in
`admin/src/hooks/useAutoSave.ts`, untouched here.

**Theme**

| Case | Result |
| --- | --- |
| Clean storage, OS dark | Renders dark; nothing written to `localStorage` |
| OS flipped light while open | Follows within the transition, no reload |
| After clicking the toggle | `theme: 'dark'` stored; two further OS flips ignored |
| Reload with a stored choice | Choice honoured, `--paper` correct before the transition |

**Locale**

| Case | Result |
| --- | --- |
| Clean storage, `navigator.languages` = `en-US, en-UY, es-UY` | `lang="en"`, nothing stored |
| `languagechange` fired with `es-UY` first | Flips to `es` live, still nothing stored |
| After clicking the toggle | `locale: 'es'` stored and pinned |

**Type scale** — at 1280px, raising the base font from 16px to 20px grows body
copy 17.7%, footer email 19.4%, card titles 13.3%, section headings 9–11%,
footer heading 6.9%. Under the previous pure-`vw` scale every one of those was
0%.

**No horizontal overflow** at 320px and 375px, in both locales, with the base
font at 16 / 20 / 24 / 32px (200%) — measured as `scrollWidth === clientWidth`
plus a walk of every element for `scrollWidth > clientWidth`. The modal is clean
at the same settings.

Five layout bugs surfaced during that sweep and were fixed:

| Bug | Fix |
| --- | --- |
| Hero tagline had no break opportunity (`Entrepreneur/Design/Programming` is one unbreakable run) so its min-content forced the page wider | `<wbr />` after each separator |
| Mobile single-column grids used bare `1fr`, whose implicit `auto` minimum cannot shrink below min-content | `minmax(0, 1fr)` — 9 call sites, portfolio and blog |
| Card head (year / status / org) and card CTA were non-wrapping flex rows | `flex-wrap: wrap` with a row gap |
| Hero meta row (`PORTFOLIO` / `URUGUAY`) overflowed at 320px | `flex-wrap: wrap` |
| Footer email is one long token that would not break | `overflow-wrap: anywhere`, `min-width: 0` on the column |

A `overflow-wrap: break-word` floor on `body` catches any long word in display
type that would otherwise widen the page. It only engages at large text-scale
settings or very narrow screens.

**Other** — both fonts resolve (`Inter`, `JetBrains Mono`), not fallbacks;
3 eras and 13 project rows render; modal opens on row click, focus lands inside,
`body` scroll locks and releases, closes via button / `cancel` / backdrop.
Contrast measured in both themes, table in §2.

**Visual confirmation is partial.** The browser pane was hidden for most of the
session, so the page could not paint. Confirmed by screenshot: desktop light
hero, mobile dark hero at 100% and 200% base font. Everything else was verified
through computed geometry and the DOM. **Worth an eyeball pass on the timeline,
orgs and footer before deploying.**

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

Locale resolution order: an explicit choice in `localStorage` →
`navigator.languages` → `en`. The resolved locale sets `<html lang>`, which
matters for screen readers and for search engines.

**Storage is written only on an explicit toggle.** The provider used to persist
the locale inside a mount effect, which pinned whatever was detected on the very
first visit and meant the site never tracked the browser again. It now keeps the
reader's choice and the detected value as separate state, follows the browser
until a choice exists, and listens for `languagechange` so a mid-session change
takes effect without a reload.

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
