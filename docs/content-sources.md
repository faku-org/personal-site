# Content Sources

Where every fact in [`src/config.ts`](../src/config.ts) came from. Written so the
next person (or the next session) does not have to re-derive it.

**Status: no placeholders left.** Every date, status and story is either sourced
from a repository or confirmed by Facundo directly — §6 records how each open
question was closed.

**Rule for future edits:** the site renders whatever is in the config as fact. If
you add something unverified, mark it `CONFIRM` in the code so it is findable.

---

## 1. How the data was gathered

Four sources, in order of trust:

1. **Local git repos** — `git log --reverse` for first commit dates, commit
   subjects for milestones, `package.json` for the real dependency list, and
   `README.md` for what the thing actually does.
2. **GitHub org metadata** — `gh repo list` across every org for creation dates,
   descriptions, topics and licenses.
3. **Project documents** — `~/Developer/work/novum/docs/Novum-Documento-Matriz.md`.
4. **Your own account** of the story and the org structure, which is the only
   source for anything personal and overrides the rest where they conflict.

A repo's first commit is when the **repository** started, not always when the
**project** started. Ad Astra is the clearest case: the repo is from 2023, the
project from 2021. Where the two disagreed, Facundo's account won.

---

## 2. The orgs

Seven umbrellas, from your description. `orgs` in the config; each project points
at one via `org`, shown on its timeline row and in the modal.

| Org | GitHub | What it is for |
| --- | --- | --- |
| **Ad Astra** | `adastra-org` | Where it began — the FiveM server and its tooling |
| **fakuuy** | `fakuuy` | Personal profile: UTU coursework and side quests |
| **faku-org** | `faku-org` | Ideas tied to your ideology, before their sector is clear |
| **WeFaber** | `wefaber` | The strong one — enterprise-class, incubator-facing |
| **Eternum** | in `wefaber` | Class team, student productivity software |
| **Talentum** | in `wefaber` | Talent management for creators and public speakers |
| **Novum** | `novum-org` | Geopolitical Minecraft |

Note the GitHub layout does not match the conceptual one: the `wefaber` org
physically holds `eternum`, `talentum`, `lux`, `libraria`, `itica-web` and
`novum-site`. The site follows **your** structure, not the repo layout. Also
worth knowing: the `talentum` GitHub *user* is an unrelated Swedish company.

---

## 3. Verified from repos

| Project | `started` | Evidence |
| --- | --- | --- |
| Ad Astra | `2021` | Age 14, from a confirmed birth date of 2006-12-06. The `astra` repo (2023-10-29) came two years later |
| WeFaber | `2025-07` | `itica-web` first commit 2025-07-26, 72 commits, last 2026-05-05 |
| Novum | `2026-04` | `wefaber/novum-site` 2026-04-06; `novum-org/novum` 2026-05-31; charter dated 2026-08-30 |
| Eternum | `2026-01` | Founded early 2026 (confirmed); first repos land 2026-04-14 |
| OhMy | `2026-04` | `ohmymail` 2026-04-23 (first), then docs + grid 04-26, forms 04-29, charts 05-06, gantt 05-14, diagrams 08-18 |
| Talentum | `2026-05` | `wefaber/talentum-site` 2026-05-07; `wefaber/talentum` 2026-06-10 |
| MindVault | `2026-05` | Created 2026-05-09, still pushed to 2026-09-08 |
| Cipher | `2026-05` | Created 2026-05-19, last push 2026-05-20 — a two-day build |
| Lux | `2026-05` | First commit 2026-05-26, 40 commits, last 2026-08-31 |
| Libraria | `2026-06` | `wefaber/libraria` created 2026-06-10 |
| LearnIt | `2026-06` | First commit 2026-06-23, 49 commits, last 2026-08-04 |
| SearchIt | `2026-07` | First commit 2026-07-03, 19 commits, last 2026-07-06 |
| JobIt | `2026-08` | First commit 2026-08-17, 38 commits, last 2026-09-04 |

### Corrections the repos and your account forced

- **Talentum** was *"a talent agency connecting creative professionals."* It is
  talent management for **creators and anyone who goes public** — speakers and
  presenters included — providing resources, information and content. Stream
  Panel is its first tool. Its date moved from a guessed `2024-11` to `2026-05`
  on repo evidence, which also moved it out of the Roots era.
- **Eternum** was *"High School Team"* and later *"the company behind Lux."* It
  is a **class team** building student productivity software, aiming to be a
  local reference in Uruguay — tools, resources, papers, books. Alumnus runs
  internally. The `eternum` repo turned out to be the original static SGRSI
  mockup Lux was built from.
- **OhMy** was standalone. It **grew out of Eternum's** student-resource goal,
  so it now carries `org: 'eternum'` and says so in its story. It has its own
  GitHub org (`ohmyapps-org`) but that is hosting, not lineage.
- **Ad Astra** was a generic blurb. It is now the **origin story** — first
  project, age 14, not knowing what a variable was, learning the fundamentals
  alone. Its `stack` gained Tauri because of AstraMapper (a CodeWalker port).
- **Libraria** had no sourced description. GitHub's is *"Visual component builder
  with theme engine — manual-first, AI-assisted. Navy blue liquid glass UI."*
- **The stat strip** now reads **14 / 13 / Uruguay** — the age you started, the
  project count, and where you are. The previous "building since 2023" was
  replaced because the age is both stronger and something you actually stated.

### Other things the repos supplied

- **Lux** — four roles: Super Admin, Administrador, Técnico, Solicitante. The
  *planilla* assigns students to numbered machines and records each machine's
  state per session. The public demo runs on an MSW mock layer.
- **JobIt** — three services (scrapers → Bun + Elysia API → React 19 front end).
  Uruguay Concursa listings in their own tab by closing date. GitHub topics
  (`bun`, `elysia`, `job-board`, `react`, `uruguay`) seeded its tags.
- **LearnIt** — Deepseek via an OpenAI-compatible SDK, MongoDB + Zod, Google
  OAuth + JWT, SM-2 spaced repetition, adaptive difficulty, calibration.
- **SearchIt** — three processes bundled as autostarting Tauri sidecars, with a
  CI smoke test gating releases. Leaflet confirms the map/GPS features.
- **Novum** — the charter covers economy (currencies, activities, business types,
  treaties, sanctions), roleplay, an RPG layer (skills, user-driven quests,
  clans, reputation), territory via Towny escalating camps → colonies → cities →
  nations → blocs with invasions, wars and a power balance, plus environment and
  lore, the Alpha → Beta → V1 roadmap, and how it sustains itself.

---

## 4. ⚠ The Apache 2.0 claim does not match the repos

You said every project is Apache 2.0 and self-host focused. **The self-host part
holds** — SearchIt is local-first, OhMy is browser-only, `ether-enterprise` is
explicitly self-hosted — and the site says so.

**The license part does not.** Checked via the GitHub API:

| Repo | Actual license |
| --- | --- |
| `ohmyapps-org/ohmymail`, `ohmygrid`, `ohmyforms` | **Apache-2.0** ✅ |
| `faku-org/learnit` | `NOASSERTION` (a LICENSE file GitHub cannot match cleanly) |
| `faku-org/searchit`, `mindvault`, `cipher`, `jobit` | **none** |
| `wefaber/lux`, `wefaber/libraria` | **none** |
| `ohmyapps-org/ohmydocs`, `ohmycharts`, `ohmygantt`, `ohmydiagrams` | **none** |
| `adastra-org/astra` | **GPL-3.0** (private) |

A public repo with no LICENSE file is **all rights reserved by default** — the
exact opposite of what you want. Nobody may legally self-host it.

So the site does **not** claim Apache 2.0 anywhere. Add the LICENSE files and it
becomes true, at which point surfacing it per project is a small change.

---

## 5. Era boundaries

| Era | Range | Contains |
| --- | --- | --- |
| Roots | 2021 — 2024 | Ad Astra |
| The Studio | 2025 | WeFaber (as Itica) |
| Velocity | 2026 | Novum, Eternum, OhMy, Talentum, MindVault, Cipher, Lux, Libraria, LearnIt, SearchIt, JobIt |

Ad Astra sits alone in Roots on purpose, and the range is now the real one: four
years on one project, at 14, before anything else began. Eleven of thirteen projects start in 2026, which is why Velocity is
so heavy — splitting it (by half-year, or studio vs. personal) is three entries
in the config plus one line in the `EraId` union.

---

## 6. Resolved

Everything that was open is now answered, and **no `CONFIRM` markers remain** in
`src/config.ts` or on the rendered page.

### The age arithmetic

Born **2006-12-06**, 19 at time of writing (turns 20 on 2026-12-06). Turned 14 on
2020-12-06, so the year he was 14 runs to 2021-12-05.

Ad Astra therefore starts at **2021**, not 2023. The `astra` repo (2023-10-29) is
two years into the project — which is exactly the "I stayed on it for years"
part of the story, now literally true in the milestone text.

This is why `started` accepts a bare `YYYY` as well as `YYYY-MM`: inventing a
month for Ad Astra would have been fake precision. A bare year sorts before any
month within that year.

### Confirmed

| Question | Answer |
| --- | --- |
| Eternum founding | Early 2026 → `2026-01`, ahead of its April repos |
| Ad Astra status | Active. Next chapter waits on **Project ROMA** (roleplay on GTA VI) or **FiveM Enhanced** stabilising — now a `Next` milestone and a closing story paragraph |
| Talentum status | Active, waiting on creators — said plainly in its story |
| Domain | `facupresa.com` confirmed; the `CONFIRM` notes are gone from `robots.txt`, `sitemap.xml` and `llms.txt` |

### One paragraph rewritten rather than answered

**Cipher's** third paragraph asked what the two-day experiment settled. You did
not answer, so rather than leave a placeholder on a live page or invent a
conclusion, it now states only what is verifiable: built and closed in two days
to test whether the idea held, untouched since.

---

## 7. Not in the timeline

Real projects found while gathering this. Say the word and any can be added:

- **`ether-enterprise`** (`wefaber`, 2026-09-04) — the substantial one:
  *"Control plane that turns single-operator AI agent instances into an
  organization-aware fleet: org graph, governed skill co-evolution, cross-team
  situational awareness, and full human attribution. Self-hosted,
  model-agnostic."* This looks like WeFaber's flagship and it is not on the site.
- **`clases-uy`** (2026-08-19) — private-lesson platform for university students,
  React 19 + Bun + Elysia + GraphQL.
- **Alumnus** — mentioned in your account as Eternum's internal project; no repo
  found, so it is only named inside Eternum's story.
- **Stream Panel** (`faku-org/stream-panel`, 2026-09-07) — named inside
  Talentum's story; the repo is currently empty.
- **AstraMapper / CodeWalker** (`adastra-org`) — folded into Ad Astra's story
  rather than given their own rows.
- Others untouched: `buenno`, `obsidian-vault-sync`, `iti-comite`, `burndown`,
  `traductor`, `component-studio`, `ui-lib`, `ui-studio`.
