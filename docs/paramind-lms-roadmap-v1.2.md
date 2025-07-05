# **Paramind LMS — Unified, Release-Ready Development Roadmap (v1.2)**

_AI-first workflow: Cursor agent writes code → ChatGPT plans & reviews_

---

## **Legend**

| Symbol | Meaning                                            |
| ------ | -------------------------------------------------- |
| **➜**  | Paste this as the Cursor-agent GitHub Issue prompt |
| **✅** | CI \+ human checks to merge                        |
| **⏱** | Indicative agent build time (h \= hours)           |
| **↔** | Ticket dependency                                  |

Timeboxes assume \~6 productive agent-hours/day. The calendar can be stretched; dependencies remain valid.

---

## **Phase 0 · Kick-off & Scope Freeze (Day 0\)**

| Ticket | Purpose                  | ➜ Steps                                                                 | ✅ Checklist                         | ⏱   |
| ------ | ------------------------ | ----------------------------------------------------------------------- | ------------------------------------ | ---- |
| 0-1    | **Read & Clarify Brief** | Summarise open questions, risk log; freeze MVP scope.                   | Stakeholders sign scope baseline.    | 2 h  |
| 0-2    | **Project Board**        | Create GitHub Projects columns _Backlog → In Progress → Review → Done_. | All tickets below created & ordered. | 30 m |

---

## **Phase 1 · Environment & CI/CD Skeleton (Day 1\)**

| Ticket | Purpose             | ➜ Steps                                                                        | ✅ Checklist                                 | ⏱   | ↔  |
| ------ | ------------------- | ------------------------------------------------------------------------------ | -------------------------------------------- | ---- | --- |
| 1-1    | **Repo bootstrap**  | Init Vite-React-TS, Tailwind, Radix/Shadcn, ESLint/Prettier, Vitest, Lefthook. | `pnpm dev` & `pnpm test` pass locally \+ CI. | 1 h  | –   |
| 1-2    | **Supabase client** | `src/lib/supabase.ts` typed, env vars, SSR-safe.                               | Import client in `main.tsx`; build OK.       | 30 m | 1-1 |
| 1-3    | **Auth provider**   | Wrap app in `<SessionContextProvider>`; Sign-in/out buttons.                   | Browser shows session state change.          | 1 h  | 1-2 |
| 1-4    | **CI baseline**     | GitHub Action: lint → test → vite build → Axe dummy page.                      | Green tick on PR.                            | 30 m | 1-3 |

---

## **Phase 2 · Data Layer & Core Schema (Day 2\)**

| Ticket | Purpose                | ➜ Steps                                                               | ✅ Checklist                             | ⏱   | ↔  |
| ------ | ---------------------- | --------------------------------------------------------------------- | ---------------------------------------- | ---- | --- |
| 2-1    | **DB migrations**      | Tables `users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges`. | `supabase db diff` clean.                | 1 h  | 1-3 |
| 2-2    | **Row-Level Security** | Add “minimum safe set” policies for role `authenticated`.             | Playwright: unauth user denied `/nodes`. | 45 m | 2-1 |
| 2-3    | **React-Query setup**  | TanStack Query provider, default stale times.                         | Cache visible in dev-tools.              | 45 m | 1-4 |
| 2-4    | **Hooks**              | `useNodes()`, `useLesson(slug)` reading via RLS.                      | Vitest mocks \+ live fetch succeed.      | 1 h  | 2-3 |

---

## **Phase 3 · Navigation, Settings & Search UX (Day 3\)**

| Ticket | Purpose             | ➜ Steps                                                    | ✅ Checklist                      | ⏱   | ↔  |
| ------ | ------------------- | ---------------------------------------------------------- | --------------------------------- | ---- | --- |
| 3-1    | **Layout shell**    | Navbar, footer, `<Outlet>`, light/dark responsive.         | Home route loads w/out 404\.      | 1 h  | 1-4 |
| 3-2    | **Static routes**   | `/`, `/review`, `/lesson/:slug`, `/settings`, `/glossary`. | Navigation works.                 | 30 m | 3-1 |
| 3-3    | **Command palette** | Shadcn Command (`Ctrl/⌘ K`), dummy data.                   | Opens/closes; returns mock items. | 45 m | 3-2 |

| 3-4 | **Settings shell** | Render `/settings` tabs (Account, Preferences, Notifications, Data). Persist user prefs table. | Tabs load; toggles save. | 1 h | 3-2 |
| 3-5 | **Glossary index** | Build `/glossary` page list, search filter, hover-card component. | Glossary page displays sample terms. | 45 m | 3-2 |
| 3-6 | **Search API & palette** | Supabase RPC search; wire into command palette. | Palette returns live results ≤ 150 ms. | 1 h | 3-5 |

---

## **Phase 4 · Skill-Tree Dashboard (Days 4-5)**

| Ticket | Purpose                 | ➜ Steps                                              | ✅ Checklist            | ⏱   | ↔  |
| ------ | ----------------------- | ---------------------------------------------------- | ----------------------- | ---- | --- |
| 4-1    | **Canvas scaffold**     | `<SkillTreeCanvas>` with React-Flow; static colours. | Shows 10 seeded nodes.  | 2 h  | 2-4 |
| 4-2    | **Unlock util**         | `isUnlocked(node, completedSet)` \+ cluster logic.   | Vitest green.           | 1 h  | 4-1 |
| 4-3    | **Node click nav**      | Click node → `/lesson/:slug`.                        | Lesson renders slug.    | 30 m | 4-2 |
| 4-4    | **Progress drawer**     | Per-branch % bars.                                   | Numbers update on mock. | 1 h  | 4-3 |
| 4-5    | **Dashboard A11y/Perf** | 100 node render ≤ 120 ms, contrast AA.               | Lighthouse ≥ 85 perf.   | 1 h  | 4-4 |

---

## **Phase 5 · Lesson Viewer Pipeline (Days 6-8)**

| Ticket | Purpose                    | ➜ Steps                                        | ✅ Checklist                | ⏱  | ↔  |
| ------ | -------------------------- | ---------------------------------------------- | --------------------------- | --- | --- |
| 5-1    | **Markdown render**        | `react-markdown`, code, image, glossary hover. | Lesson MD renders.          | 1 h | 4-3 |
| 5-2    | **TOC sidebar**            | Generate from AST; live highlight.             | Scroll sync ≤ 5 px drift.   | 2 h | 5-1 |
| 5-3    | **Inline KnowledgeChecks** | MCQ shuffle, scroll-lock until correct.        | State persists reload.      | 3 h | 5-2 |
| 5-4    | **Progress bar stripe**    | 3 px sticky bar gated by completed checks.     | Jest DOM test.              | 1 h | 5-3 |
| 5-5    | **Completion quiz modal**  | ≥ 80 % passes, stores `lesson_completed`.      | Playwright scenario passes. | 3 h | 5-4 |
| 5-6    | **MediaPlayer skin**       | Custom controls, captions, autoplay toggle.    | Axe passes.                 | 2 h | 5-1 |

| 5-7 | **Drag‑and‑drop & Cloze questions** | Implement extra block types with accessible fallback. | Playwright DnD & Cloze tests pass. | 1 h 30 m | 5-3 |
| 5-8 | **Keyboard shortcuts layer** | Add `N`, `P`, `K`, `Q`, `?` hotkeys & help modal. | Axe + Jest shortcut tests pass. | 45 m | 5-1 |

---

## **Phase 6 · Spaced-Repetition & Badges (Days 9-10)**

| Ticket | Purpose              | ➜ Steps                                        | ✅ Checklist            | ⏱  | ↔  |
| ------ | -------------------- | ---------------------------------------------- | ----------------------- | --- | --- |
| 6-1    | **FSRS core**        | Port algorithm; persist `srs_state`.           | Unit schedule test.     | 2 h | 5-5 |
| 6-2    | **Review screen UI** | Flip animation, hotkeys 1-4, confetti summary. | Playwright hotkey test. | 4 h | 6-1 |
| 6-3    | **Badge engine**     | Edge cron awards streak/node/branch badges.    | Rows in `user_badges`.  | 2 h | 6-2 |

| 6-4 | **Review slider & streak counter** | Add review‑intensity slider and daily streak logic. | Slider persists; streak badge ticks. | 1 h | 6-2 |
| 6-5 | **Email digest & toggles** | Daily reviews‑due email via Postmark; user toggles. | Scheduled job logs; opt‑out works. | 1 h | 3-4, 6-2 |

---

## **Phase 7 · Tutor Messaging & Instructor Analytics (Days 11-12)**

| Ticket | Purpose                | ➜ Steps                                 | ✅ Checklist                | ⏱  | ↔  |
| ------ | ---------------------- | --------------------------------------- | --------------------------- | --- | --- |
| 7-1    | **Ask-Tutor threads**  | `/ask` button, thread list, reply form. | Msg appears for tutor user. | 2 h | 1-3 |
| 7-2    | **Learner analytics**  | Node grid, attempt chart.               | Queries ≤ 500 ms.           | 2 h | 5-5 |
| 7-3    | **Aggregate heat-map** | SQL view \+ d3 heatmap; cron refresh.   | Cron job logs success.      | 2 h | 7-2 |

## | 7-4 | **CSV/Excel data export** | Instructor download of pseudonymised progress data. | Downloaded file hashes verified. | 45 m | 7-2 |

## **Phase 8 · Observability & Monitoring (Day 13\)**

| Ticket | Purpose                | ➜ Steps                      | ✅ Checklist                 | ⏱  | ↔  |
| ------ | ---------------------- | ---------------------------- | ---------------------------- | --- | --- |
| 8-1    | **Error tracking**     | Sentry FE/BE; release tags.  | Events visible in dashboard. | 1 h | 1-4 |
| 8-2    | **Structured logs**    | Pino JSON logs → CloudWatch. | Log entry visible.           | 1 h | 8-1 |
| 8-3    | **Grafana dashboards** | Uptime, p95 latency, CPU.    | Dashboard shared link live.  | 1 h | 8-2 |

## | 8-4 | **Media optimisation pipeline** | FFmpeg compress step in CI, upload size checks. | ≥95 % videos ≤ 50 MB; CI passes. | 1 h | 1-4 |

## **Phase 9 · Polish, QA & Compliance (Days 14-15)**

| Ticket | Purpose                       | ➜ Steps                                          | ✅ Checklist      | ⏱  | ↔        |
| ------ | ----------------------------- | ------------------------------------------------ | ----------------- | --- | --------- |
| 9-1    | **Axe \+ Lighthouse budgets** | ≥ 90 a11y, ≥ 75 perf.                            | CI budgets pass.  | 2 h | 6-3 & 7-3 |
| 9-2    | **Keyboard audit**            | Playwright tab-flow script.                      | No focus traps.   | 1 h | 9-1       |
| 9-3    | **Error & empty states**      | 404, offline banner, 429 toast, no-due confetti. | Manual QA passes. | 2 h | 9-1       |

## | 9-4 | **Data purge script** | Cron job purges inactive >4 y accounts; on‑demand delete. | Dry‑run logs rows; manual test passes. | 1 h | 2-1 |

## **Phase 10 · Pilot Beta (Day 16\)**

| Ticket | Purpose              | ➜ Steps                                         | ✅ Checklist                | ⏱  | ↔   |
| ------ | -------------------- | ----------------------------------------------- | --------------------------- | --- | ---- |
| 10-1   | **Seed data**        | Insert 5 lessons \+ nodes.                      | Canvas shows 5 start nodes. | 1 h | 5-5  |
| 10-2   | **Feedback capture** | Enable Sentry Session Replay; link Google Form. | Events visible.             | 1 h | 10-1 |
| 10-3   | **Triage fixes**     | Label `beta-fix`, close critical issues.        | All P0 bugs closed.         | 2 h | 10-2 |

---

## **Phase 11 · Launch Readiness & GA (Day 17\)**

| Ticket | Purpose              | ➜ Steps                                    | ✅ Checklist                | ⏱   | ↔   |
| ------ | -------------------- | ------------------------------------------ | --------------------------- | ---- | ---- |
| 11-1   | **DNS \+ SSL**       | Point `app.paramindlms.com`, enable HTTPS. | Browser green lock.         | 30 m | 8-3  |
| 11-2   | **Legal docs**       | Replace `/privacy`, `/terms` stubs.        | Links 200 OK.               | 30 m | 11-1 |
| 11-3   | **Robots & sitemap** | Lessons `noindex`; marketing allow.        | Verified via robots tester. | 30 m | 11-2 |
| 11-4   | **Tag & deploy**     | Git tag `v1.0.0`; merge to `main`.         | Supabase prod shows banner. | 30 m | 11-3 |

---

## **Phase 12 · Post-Launch Support (Days 18-45)**

- Rapid-patch window (v1.0.x).

- Weekly Sentry & Grafana review.

- Monthly backup restore drill (report in Slack & Wiki) .

---

## **Cross-Cutting “Fool-Proof” Safeguards**

- **Pre-commit**: ESLint, Prettier, Tailwind-lint, Markdown-lint via Lefthook .

- **CI pipeline**: lint → test → build → Axe → Jest ≥ 70 % → Playwright → Lighthouse budgets .

- **Performance budgets**: FCP ≤ 1.8 s, TTI ≤ 2.5 s, tree render ≤ 120 ms/100 nodes .

- **Security**: Auth cookies SameSite Strict, 100 req/min API rate-limit; on 429 show cool-off toast .

- **Backups**: Nightly automated \+ monthly restore drill.

- **Accessibility**: WCAG 2.2 AA target, drag-and-drop keyboard fallback .

---

## **Dependency & Sequencing Check**

- **Auth & Supabase client (1-2, 1-3)** precede any network fetch.

- **Data hooks (2-4)** power Skill-Tree (4-1).

- **Lesson Viewer (Phase 5\)** relies on routing from 4-3.

- **FSRS (6-1)** requires `lesson_completed` flag from 5-5.

- **Analytics (7-2 →)** depends on attempt logging in 5-5.

- **Polish budgets (9-1)** wait until UI stable.

- **Beta seed (10-1)** only after Lesson pipeline complete.

Graph is topologically sorted; no ticket lists a dependency that appears later.

---

## **Release Readiness Definition**

- Phases 0-11 merged & CI green.

- Manual smoke test on macOS Safari \+ Windows Chrome: Lesson → Review → Chat flows.

- Backups \< 24 h old; Sentry error rate \< 1 % in staging.

- Legal, privacy, and robots.txt verified.

---

### **✅ Discrepancy Sweep**

This consolidated roadmap:

- **Keeps granular tickets** from the 2-week plan for agent efficiency, **adds** longer-term ops & compliance from the comprehensive brief (monitoring, backups, legal, privacy).

- Removes duplicate tasks (e.g., CI baseline, Axe audits) by merging them into single tickets.

- Inserts missing items found in one plan only—structured logging, Grafana, keyboard audit, rate-limit UX, image optimisation, backup drills, and post-launch cadence.

- Preserves strict dependency ordering of the faster plan while ensuring nothing from the broader brief is left out.

- Results in a **complete, fool-proof path** from blank repo to GA and maintenance, without overlap or omissions.

_End of roadmap_
