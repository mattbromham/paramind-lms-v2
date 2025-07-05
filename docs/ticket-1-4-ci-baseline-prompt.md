# 🚧 Ticket 1-4 – CI Baseline

_Paramind LMS · Phase 1 · Environment & CI/CD Skeleton_

> **Goal:** Establish the first end-to-end GitHub Actions workflow that blocks every pull-request until **lint → unit-tests → production build → basic accessibility scan** all pass with a green tick. This will become the foundation for the richer pipeline specified later in the roadmap.fileciteturn0file0

---

## 0 · Context & Prerequisites

| Item                                                    | Status / Pointer                           |
| ------------------------------------------------------- | ------------------------------------------ |
| Vite + React + TS repo scaffold                         | ✅ (ticket 1-1)                            |
| Tailwind, ESLint/Prettier, Vitest                       | ✅ (ticket 1-1)                            |
| Supabase client + Auth provider wired                   | ✅ (tickets 1-2, 1-3)                      |
| Branch protection rule _require status checks_ on `dev` | ✅ (already configured in GitHub settings) |

All above are already on `dev`, so you can assume they exist locally. No migration or schema access is required for this ticket.

---

## 1 · High-Level Acceptance Criteria (Definition of Done)

| Area               | Pass condition                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Lint**           | `pnpm lint` exits 0, prints no error nor warning.                                                                    |
| **Unit tests**     | `pnpm test` runs Vitest and exits 0.                                                                                 |
| **Build**          | `pnpm build` completes a Vite production build without warnings.                                                     |
| **Axe scan**       | A CLI scan of the compiled **dummy landing page** (`dist/index.html`) reports **0 critical & 0 serious** violations. |
| **GitHub Action**  | A single YAML workflow named **ci.yml** runs all four stages in the above order, failing fast on the first error.    |
| **PR integration** | Opening a PR to `dev` automatically triggers the workflow and must go green before merge.                            |
| **No regressions** | Existing hooks (Lefthook pre-commit) remain untouched and still pass locally.                                        |

---

## 2 · Detailed Implementation Tasks

> **✔ Tip:** keep each job completely **idempotent**—rerunning the Action from the UI must succeed without manual cleanup.

1. **Create a branch**

   ```bash
   git checkout -b ticket/1-4-ci-baseline
   ```

2. **Add dev-dependencies**

   ```bash
   pnpm add -D @axe-core/cli serve
   ```

   _`serve` is a thin zero-config HTTP server that we’ll use to expose `dist/` to Axe._

3. **Expose CI scripts in `package.json`**

   ```jsonc
   {
     "scripts": {
       "lint": "eslint \"src/**/*.{ts,tsx}\" --max-warnings=0",
       "test": "vitest run",
       "build": "vite build",
       "ci:axe": "serve -s dist -l 4173 & npx axe http://localhost:4173 --exit --timeout 10000",
     },
   }
   ```

   _The Axe CLI exits non-zero on any violation ≥ serious._ If you hit flaky startup timing, wrap the two commands in `wait-on`.

4. **Add `.github/workflows/ci.yml`**

   ```yaml
   name: CI

   on:
     pull_request:
       branches: [dev]

   jobs:
     build-test:
       name: Lint ➜ Test ➜ Build ➜ Axe
       runs-on: ubuntu-latest
       timeout-minutes: 15
       steps:
         - uses: actions/checkout@v4

         - name: Use Node 20.x
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: pnpm

         - name: Install pnpm
           uses: pnpm/action-setup@v3
           with:
             version: 9
             run_install: true

         - name: Lint
           run: pnpm lint

         - name: Unit tests
           run: pnpm test -- --coverage=false

         - name: Build
           run: pnpm build

         - name: Accessibility (Axe CLI)
           run: pnpm ci:axe
   ```

   _Design notes_
   - Jobs run on a **single** runner to share the pnpm store cache.
   - Later tickets can split lint/test/build/playwright into a matrix, but v1 keeps it linear for speed.
   - `timeout-minutes` hard-fails hung builds.

5. **Create a dummy landing page**  
   Ticket 1-1 already generates `index.html`. No extra work needed; Axe will crawl that.

6. **Commit, push, and open PR**

   ```bash
   git add .
   git commit -m "feat(ci): add baseline GitHub Action (lint-test-build-axe)"
   git push -u origin ticket/1-4-ci-baseline
   ```

7. **Verify the workflow**
   - Ensure the check named “CI / Lint ➜ Test ➜ Build ➜ Axe” appears and goes green.
   - Intentionally break a rule (e.g., add a `<img>` without `alt`) to confirm Axe fails the PR.

8. **Submit for review**  
   When all four steps pass, mark the PR as ready. A maintainer merges to `dev`.

---

## 3 · Extensibility Notes (future-proof)

- The roadmap expands the pipeline to **Playwright e2e, Lighthouse budgets, structured logs, and Sentry release tagging**. Lay out the job so **new steps can slot in as additional `run` commands or separate jobs** without rewiring caches.fileciteturn0file1
- Follow the brand’s AA contrast requirement from the blueprint—Axe enforces this automatically for links and interactive components.fileciteturn0file2

---

## 4 · Deliverables Checklist (copy into PR description)

- [ ] `.github/workflows/ci.yml` committed
- [ ] `pnpm lint` clean locally
- [ ] `pnpm test` clean locally
- [ ] `pnpm build` succeeds
- [ ] Axe CLI reports 0 critical/serious issues on `dist/index.html`
- [ ] PR shows single green “CI” check

_End of prompt_
