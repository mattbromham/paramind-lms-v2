# Paramind LMS – Comprehensive Design & Technical Brief (v0.2)

*Last updated: 5 July 2025*

---

## 0 · Essence

> **“A visual, prerequisite‑aware roadmap that lets paramedicine students *****see***** their knowledge grow node‑by‑node—while instructors quietly track, coach, and fine‑tune every step.”**

Paramind LMS is a desktop‑first learning platform for Australian undergraduate and bridging paramedicine students. It centres on an interactive **skill‑tree dashboard** rendered with React Flow, supports rich HTML lessons, and bakes in spaced‑repetition, progress analytics, and a lightweight tutor inbox.

---

## 1 · User Scope & Pedagogy

| Aspect                     | Decision                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| **Audience**               | • Any undergrad or bridging paramedicine student. • Postgraduate (Masters) not in scope. |
| **Pacing**                 | Fully self‑paced; semester gating may be layered later.                                  |
| **Assessment weight**      | Formative only; quizzes do **not** contribute to university grades.                      |
| **Accreditation evidence** | No formal CPD/TEQSA output required for v1.                                              |

---

## 2 · Skill‑Tree Dashboard

| Feature               | Spec                                                                                                                                                                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rendering library** | React Flow (pan + zoom, static node layout).                                                                                                                                                                                                                |
| **Layout source**     | Mermaid diagram ⇢ exported JSON ⇢ React Flow nodes/edges.                                                                                                                                                                                                   |
| **Static layout**     | Users cannot rearrange nodes. Scroll wheel = zoom; click‑drag = pan.                                                                                                                                                                                        |
| **Prerequisite rule** | *Exactly‑all* inbound prerequisites required.                                                                                                                                                                                                               |
| **Clusters**          | Defined in Mermaid using `subgraph`. All nodes inside a cluster unlock simultaneously once shared prerequisites are met. Each still requires individual completion before downstream nodes unlock. Visual: cluster enclosed in a subtle rounded‑corner box. |
| **Node states**       | 🔒 Locked · ○ Unlocked/In‑progress · ● Completed (accent tone). Edges colour‑shift with source node.                                                                                                                                                        |
| **Themes**            | Light & dark themes (automatic via OS pref). Accent colour palette differs per theme but fixed for all users.                                                                                                                                               |
| **Accessibility**     | Automated Axe/Lighthouse AA checks in CI; contrast ratios enforced on every PR.                                                                                                                                                                             |

---

## 3 · Lesson Content & Authoring

| Topic                      | Decision                                                                                                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authoring workflow**     | Markdown/HTML authored in Git (sole author initially). Glossary tags: `<glossary-term term="...">`. Knowledge checks via `<knowledge-check ...>` attributes.                 |
| **Media**                  | Inline images, GIFs, ≤10 s audio/video clips (self‑hosted in Supabase Storage). Max file ≈ 20 MB (tunable).                                                                  |
| **Versioning**             | Live lessons update immediately **except** when a learner has the lesson open. They see a non‑blocking banner; clicking **Refresh** reloads content and restores quiz state. |
| **Question types**         | MCQ (choice shuffle), drag‑and‑drop label, cloze (fill‑in‑blank).                                                                                                            |
| **Question randomisation** | MCQ choices shuffled per attempt; other types fixed.                                                                                                                         |
| **Completion rule**        | All inline checks + ≥80 % on end‑quiz. Unlimited retries.                                                                                                                    |
| **Attempt logging**        | All attempts (score + timestamp) stored; UI shows best score only.                                                                                                           |



### 3.1 Lesson Viewer UX *(desktop‑first, keyboard & screen‑reader friendly)*

| Zone                             | Specification                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global top navbar**            | • **Left:** Logo (click→Dashboard). • **Centre:** **Dashboard** & **Reviews** links. • **Right:** *Ask a Tutor* button ➜ opens learner’s global thread; profile avatar dropdown (Settings, Log out). • **Sticky:** Compresses to 56 px on scroll past lesson header (logo shrinks, nav text hides on hover). • **Theme:** Uses inverted accent tint per light/dark, but success/error greens/reds stay constant. |
| **Lesson header banner**         | Sits below navbar. Lists: *Objectives*, *Estimated time* (e.g., “12 min”), *Prerequisites met* ✓/✗, *Last updated*, *Tags*.                                                                                                                                                                                                                                                                                      |
| **Collapsible contents sidebar** | Auto‑opens ≥1024 px width; hamburger toggle below 1024 px. Live‑highlight current H2/H3 as learner scrolls. Knowledge‑check pips ✔ appear beside headings once completed.                                                                                                                                                                                                                                        |
| **Inline knowledge checks**      | Author‑placed `<knowledge-check>` blocks. Immediate feedback pops below card; page scroll is locked until correct answer chosen (error toast on wrong pick). Unlimited retries; completion state persisted in DB so reload keeps green tick.                                                                                                                                                                     |
| **Lesson progress bar**          | 3 px accent strip stuck to bottom edge of navbar; width driven by **scroll depth gated by completed checks** (i.e., learners can’t game progress by scrolling until they answer locked check).                                                                                                                                                                                                                   |
| **Completion quiz**              | Renders in a dedicated `<section id="quiz">` collapsed behind a **Start Quiz** button that unlocks once *all* inline checks done. Full‑width modal overlay on click. Feedback & explanations shown on submission summary screen; learner clicks **Finish** to return (best score stored).                                                                                                                        |
| **Media blocks**                 | Custom React `<MediaPlayer>` skin for consistency (supersets HTML5). • Video: autoplay allowed, muted; global *Disable autoplay* toggle in Settings. • Audio: click‑to‑play. • Captions/alt required on publish.                                                                                                                                                                                                 |
| **Keyboard shortcuts**           | `N` next heading, `P` previous, `K` focus next knowledge check, `Q` jump to quiz, `?` help sheet. All buttons have tabindex.                                                                                                                                                                                                                                                                                     |
| **Accessibility**                | Sidebar collapses by default for screen‑reader “skip nav”; ARIA landmarks (`role="navigation"`, `main`, `complementary`). Knowledge‑check correctness announced via `aria-live="assertive"`.                                                                                                                                                                                                                     |
| **Responsive notes**             | Content column max‑width 720 px; sidebar becomes slide‑over on ≤768 px.                                                                                                                                                                                                                                                                                                                                          |

---

## 4 · Spaced‑Repetition Module‑Repetition Module

| Aspect             | Spec                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Algorithm**      | FSRS default parameters. Learner slider options:• **Fewer reviews** → ease × 0.85; stability × 0.9• **Normal** → algorithm baseline• **More reviews** → ease × 1.15; stability × 1.1 |
| **Card pool**      | Missed end‑quiz questions + any items the learner flags. Tutors can mark items *exclude from SR*.                                                                                    |
| **Review UI**      | Dedicated **Review** tab; shows *Due* count badge.                                                                                                                                   |
| **Daily rollover** | Learner‑configurable local midnight (preset to their device TZ).                                                                                                                     |
| **Streak counter** | Increments when learner completes **any** activity (review card, knowledge check, quiz) on a calendar day.                                                                           |
| **Badges**         | • 7, 30, 90‑day streaks • 25/50/100 nodes complete • 100 % branch completion. Minimal line‑art icons.                                                                                |



### 4.1 Review Screen UX

*(Keyboard‑friendly & screen‑reader‑ready)*

| Step              | Interaction & UI details                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| **Entry**         | **Review** badge in header shows due count (e.g., “🔄 12”). Click opens `/review`.                              |
| **Card view**     | Single central card• Top bar progress `(6 / 12)`• Prompt side shown first.                                      |
| **Reveal**        | Click **Show Answer** or press **Space**/**Enter** triggers a CSS flip.                                         |
| **Rate recall**   | Four buttons appear: **Again (0 min)**, **Hard**, **Good**, **Easy**. Hotkeys 1‑4.                              |
| **Extra info**    | Optional *Explanation* accordion; link back to source lesson; last‑seen timestamp.                              |
| **Queue flow**    | Next card loads instantly. On completion → confetti + modal summary (cards reviewed, % correct, next‑due time). |
| **Sidebar tools** | Collapsible panel (`S`) with *Flag*, *Edit*, *Remove from queue*.                                               |
| **Pause/Snooze**  | `Esc` opens pause modal with *Resume* / *Snooze 10 min*.                                                        |
| **Responsive**    | Full desktop; graceful down to 600 px for quick mobile review.                                                  |
| **Accessibility** | ARIA live region announces flips; focus rings high‑contrast; all actions reachable via keyboard.                |

---

## 5 · Progress & Motivation Widgets · Progress & Motivation Widgets

- Collapsible sidebar shows per‑branch % bars, overall %, total lessons.
- Global **Reset progress** button (does not erase quiz history).
- Badge shelf with tooltip descriptions.

---

## 6 · Communication

| Feature              | Spec                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Ask‑Tutor button** | Appends message to learner’s single global thread (thread carries lesson reference metadata). Purely asynchronous. |
| **Tutor inbox**      | Lists threads, filter by *unanswered*. Tutors can reply, close, or tag.                                            |
| **Notifications**    | In‑app toasts + drawer. Email via Supabase/Postmark. Toggles: • Reviews due • New tutor reply.                     |

---

## 7 · Analytics & Instructor Tools

| Module             | Detail                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Learner view**   | Node grid with status, first‑pass date, streak, all attempt history.                              |
| **Aggregate view** | Node heat‑map (pass rate), per‑question stats, histograms (attempts‑to‑pass, time‑to‑completion). |
| **Data refresh**   | Cron at 02:00 & 14:00 AEST.                                                                       |
| **Exports**        | CSV/Excel download (pseudonymised IDs).                                                           |

---

## 8 · Technical Architecture

### 8.1 Front End

```
React 18 + TypeScript
Vite build
Tailwind CSS (with @tailwindcss/typography)
shadcn/ui & Radix Primitives for accessible components
React Flow for skill‑tree canvas
```

Deployed to Supabase Edge Functions (SSR optional), served via global CDN.

### 8.2 Back End & Data

| Layer             | Tech                                                                             | Notes                                                            |
| ----------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Auth**          | Supabase Auth (email + Google OAuth)                                             | Row‑level security policies.                                     |
| **Relational DB** | Postgres (Supabase)                                                              | Core tables: users, lessons, nodes, attempts, SR\_cards, badges. |
| **Files**         | Supabase Storage (S3‑compatible)                                                 | Public read, private write.                                      |
| **Graph queries** | SQL adjacency list; consider `ltree` or `pgvector` if path queries grow.         |                                                                  |
| **CI/CD**         | GitHub → Supabase auto deploy; PR preview URLs. Axe/Lighthouse runs in workflow. |                                                                  |
| **Email**         | Supabase‑managed Postmark.                                                       |                                                                  |

### 8.3 Ops

| Concern            | Baseline                                                                                         | Notes                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| **Backups (RPO)**  | Nightly automated (Supabase)                                                                     | Additional weekly CSV dump to cloud drive. |
| **Recovery (RTO)** | < 4 h via point‑in‑time restore.                                                                 |                                            |
| **Uptime**         | Supabase 99.9 % SLA acceptable for MVP.                                                          |                                            |
| **Data retention** | Purge inactive accounts & data after 4 years.                                                    |                                            |
| **Privacy**        | Australian Privacy Principles compliant; pseudonymised analytics; consent banner on first login. |                                            |

### 8.4 Accessibility & Compliance

- WCAG 2.2 AA targeted; automated Axe checks in CI + annual manual audit.
- Colour palette contrast‑checked per theme.

### 8.5 Offline Capability (Future)

- Option to export a lesson as static PDF for offline reading (non‑interactive) — low complexity.
- Fully interactive offline packages deferred.

---

## 8.6 · Data Model (initial schema)\$1

### 8.6.1 Implementation status

- **Deployed:** tables created in Supabase project `mupsfsdbeiqfezliapyn` with `pgcrypto` extension enabled (for `gen_random_uuid()`).
- **Row‑Level Security:** RLS ON for every table with "minimum safe set" policies → `SELECT` and `INSERT` permitted for role `authenticated`.
- **Storage:** bucket `media` (public read) exists for all lesson assets.
- **Env files:** local `.env.local` holds `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; `.env.local.example` committed as template.

## 8.7 · Security, Limits & Compliance · Security, Limits & Compliance

| Topic                                                                                                | Decision                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth flows**                                                                                       | Password ≥ 12 chars incl. upper + lower + digit; email verification via magic‑link; Google OAuth scopes `profile email openid`; forgot‑pwd link TTL = 2 h. |
| **Rate limits**                                                                                      | Public API 100 req/min; quiz‑submit 10/min; chat 20 msgs/min. After 5× 429 responses ➜ 1 h cooling‑off.                                                    |
| **Media formats**                                                                                    | Accept: `.mp4 (H.264 + AAC)`, `.webm (VP9 + Opus)`, `.mp3`, `.wav`, `.png`, `.jpg`, `.svg`, `.gif`. CI auto‑transcodes video to 720p max via ffmpeg.       |
| **File size caps**                                                                                   | Images ≤ 5 MB, audio ≤ 10 MB, video ≤ 50 MB (warning at 80 %).                                                                                             |
| **Progress bar calc**                                                                                | `progress = clamp((scrollY + viewportH) / (docH - footerH), 0, 1)` ➜ width %. Update only when learner has cleared preceding knowledge‑check anchor.       |
| **Email schedule**                                                                                   | Reviews‑due digest at 07:00 local; bulk digest (if > 5 items) at 19:00 local via **Postmark sandbox** (limit 100 emails/day)                               |
| Reviews‑due digest at 07:00 local; bulk digest (if > 5 items) at 19:00 local via SendGrid batch 500. |                                                                                                                                                            |
| **Anonymised exports**                                                                               | Replace user\_id with SHA‑256(email + yearly salt). Remove names/email before CSV.                                                                         |

## 8.8 · Developer Workflow & QA

| Stage                   | Tooling / Policy                                                                                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pre‑commit hooks**    | **Lefthook** runs ESLint, Prettier, Tailwind lint, Markdown lint.                                                                                           |
| **CI pipeline**         | GitHub Actions: build → Axe (0 critical, ≤ 5 serious) → Jest (≥ 70 % lines) → Playwright e2e (login, lesson complete, chat) → Lighthouse perf/a11y budgets. |
| **Branch strategy**     | GitFlow: `dev` → staging auto‑deploy, `main` → prod on tagged release.                                                                                      |
| **Backup drills**       | Monthly restore into isolated Supabase project; integration tests; result logged to Slack & Wiki.                                                           |
| **Supported browsers**  | Desktop: Chrome 114+, Edge 114+, Firefox 113+, Safari 16+. Mobile review: iOS 16+, Android Chrome 114+.                                                     |
| **Performance budgets** | FCP ≤ 1.8 s, TTI ≤ 2.5 s, tree render ≤ 120 ms/100 nodes, card flip ≤ 50 ms.                                                                                |
| **Error/empty states**  | Designs for 404, offline, 0 due cards, API 500, "all caught up" confetti.                                                                                   |

## 9 · Roadmap Notes

- **Semester gating** — potential v2 feature if partnering universities onboard.
- **Clinical placement linkage** — park until v3.
- **SCORM/LTI integrations** — out of scope for MVP.

---

## 10 · Open Questions / Parking Lot

1. Maximum per‑file limit (current placeholder 20 MB) — revisit once storage billing model clearer.
2. Badge artwork source — custom vs icon library? (Minimal line art assumed.)
3. Additional email toggles (e.g. badge earned) — decide post‑beta.

---

## 8.9 · Observability & Monitoring

| Tool                       | Purpose                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Sentry**                 | Front‑ & back‑end error tracking; DSN stored in Supabase Project Secrets.                                                      |
| **Pino (JSON)**            | Structured console logs for Supabase Functions; piped to CloudWatch.                                                           |
| **Grafana Cloud / Influx** | Collect Supabase Postgres + Edge metrics (uptime, p95 latency, CPU). Dashboards shareable with tutors for outage transparency. |

## 8.10 · API & Routing Conventions

| Aspect              | Spec                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Style**           | REST, versioned under `/v1/`. All responses JSON, camelCase keys. OpenAPI 3 docs auto‑generated via Zod schema.                             |
| **Slug policy**     | Auto‑generate slug from lesson title (`kebab‑case`, ≤ 60 chars). On rename, old slug stored in `lesson_redirects` table and 301‑redirected. |
| **Search endpoint** | `GET /v1/search?q=` returns lessons, glossary terms, nodes (max 8). Used by command palette.                                                |

## 8.11 · Security & Compliance (extra)

| Topic             | Decision                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Cookie policy** | Auth cookies `SameSite=Strict`, Secure, HTTPOnly. LocalStorage only for ephemeral UI state.         |
| **Robots meta**   | Entire app `noindex, nofollow` until marketing site live; lessons stay noindex.                     |
| **Legal docs**    | `/privacy` & `/terms` MDX stubs referenced in footer.                                               |
| **Secrets mgmt**  | SendGrid key, SHA salt, Sentry DSN stored in Supabase Secrets; accessed in GitHub Actions via OIDC. |
| **Rate‑limit UX** | On 429: toast "Too many actions. Please wait 30 s" with countdown; buttons disabled until timeout.  |

## 8.12 · Image & Asset Optimisation

| Step         | Detail                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| **Upload**   | Supabase Image Transform generates 400 px thumbnail + 2× & 3× variants. |
| **Delivery** | `<img>` uses `srcset`; browsers pick optimal size.                      |

## 8.13 · Glossary & Global Search

| Feature             | Spec                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Glossary index**  | `/glossary` route: left search filter, alphabetical list, table showing term, short def, linked lessons count.               |
| **Hover card**      | Width = 320 px; auto‑positions; closes with ESC; link "View in glossary".                                                    |
| **Command palette** | `Ctrl/⌘ + K` opens shadcn/ui *Command* overlay; fuzzy‑search lessons, nodes, glossary; arrow‑keys navigate; Enter navigates. |

## 8.14 · Accessibility Notes (extra)

| Area              | Add‑on spec                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Drag‑and‑drop** | Keyboard mode: when focus enters DnD block, presents radio‑button list alternative. Triggered if `prefers‑reduced‑motion` or Tab key. |

## 8.15 · Testing Matrix

| Dimension    | Values                                                     |
| ------------ | ---------------------------------------------------------- |
| **Browsers** | Chrome Stable, Firefox ESR, WebKit.                        |
| **OS**       | Ubuntu 22.04 in CI; manual smoke on macOS 14 + Windows 11. |
| **Schedule** | Full matrix nightly; Chrome smoke on every push.           |

## 8.16 · Global Settings Page

Route `/settings`, tabs:

1. **Account** – name, email, password, delete account.
2. **Preferences** – Day‑rollover timezone selector, Autoplay toggle, Theme override (System/Light/Dark).
3. **Notifications** – Email toggles: Reviews due, Tutor reply, Badge earned.
4. **Data** – JSON export, Reset progress, Request purge.

## 9 · Roadmap Notes

- **Semester gating** — potential v2 feature if partnering universities onboard.
- **Clinical placement linkage** — park until v3.
- **SCORM/LTI integrations** — out of scope for MVP.

---

## 10 · Open Questions / Parking Lot

1. Maximum per‑file limit (current placeholder 20 MB) — revisit once storage billing model clearer.
2. Badge artwork source — custom vs icon library? (Minimal line art assumed.)
3. Additional email toggles (e.g. badge earned) — decide post‑beta.

---

**End of Brief**

