# Phase‑2.5 Audit “Super‑Prompt” for TESTING agent

Paste the entire content below into **Cursor → TESTING agent chat** and hit Enter.  
The agent will create issues, run the audits, merge artefacts into `/docs/audit-P2.md`, and open a “Phase‑2.5 Audit ✔” PR automatically.

---

````text
### ROLE
You are the TESTING agent for Paramind LMS.
You have repository write access and can call GitHub’s REST API via Cursor’s tooling.

### GOAL
Run the Phase‑2.5 comprehensive audit automatically, producing:
• Six labelled issues (`audit`) with detailed checklists.
• A CI run for each issue that uploads its artefact.
• A merged markdown report `/docs/audit-P2.md` once all issues are green.

### STEPS

1. **Define the six audit blueprints** (A‑1 … A‑6) as below.
   For each blueprint:
   * `title`: use the value in **Title**.
   * `labels`: `audit`, the specific `agent:*` label, and `phase:2.5`.
   * `body`: use the markdown in **Body**.
   * `assignees`: leave blank (the specialised agent will self‑assign on label).

| ID | Title | Body identifier | Extra |
|----|-------|-----------------|-------|
| **A‑1** | `Audit A‑1: Codebase health (STATIC‑SCAN)` | BODY‑A1 | |
| **A‑2** | `Audit A‑2: Test & coverage (TEST‑COVER)` | BODY‑A2 | |
| **A‑3** | `Audit A‑3: Data & RLS (SCHEMA‑AUDIT)` | BODY‑A3 | |
| **A‑4** | `Audit A‑4: CI / perf / a11y (CI‑LITE)` | BODY‑A4 | |
| **A‑5** | `Audit A‑5: Brand & UX (VISUAL‑BOT)` | BODY‑A5 | |
| **A‑6** | `Audit A‑6: Risk & parking lot (RISK‑LOG)` | BODY‑A6 | |

2. **Create all six issues** programmatically.
   Use the GitHub Issues API or Cursor command `/create-issue` loop.

3. **Trigger the audit workflow**
   The repo already contains `.github/workflows/audit.yml` that listens for the `audit` label and spawns the correct matrix job. Creating the issues in step 2 starts CI automatically.

4. **Monitor progress**
   Poll each issue every 2 minutes. When the assigned agent comments `STATUS: green | amber | red`, record it.

5. **Fail fast**
   * If any audit ends `STATUS: red`, comment on the PR “Phase‑2.5 audit FAILED – see {Issue URL}” and stop.
   * If all six are `green`, continue.

6. **Merge artefacts into report**
   * Download each artefact from the workflow run (`code-scan.json`, `coverage-summary.md`, …).
   * Concatenate into the template:

     ```
     # Phase-2.5 Comprehensive Audit (Phase‑2 hand‑off)

     ## 1 · Summary
     | Audit | Status |
     |-------|--------|
     | A‑1   | ✅ |
     ...

     ## 2 · Codebase health
     (embed code-scan.json)

     … repeat for the other five …
     ```

   * Commit as `/docs/audit-P2.md` on branch `phase-2.5-audit`.

7. **Open PR**
   Title: `Phase-2.5 Audit ✔ – unblock Phase 3`.
   Set branch protection so Phase‑3 PRs require this branch merged.

8. **Notify**
   Comment in this conversation: “Audit complete – PR ready.”

### BODIES
Below are the full markdown bodies for each audit issue. **Copy verbatim.**

---

#### BODY‑A1
```markdown
## 🎯 Objective
Run static analysis to guarantee the codebase is clean before Phase 3.

## 🔰 Inputs
* Branch / commit: `dev`
* Commands
  ```bash
  pnpm lint
  pnpm tsc --noEmit
  pnpm ts-prune
````

## ✅ Definition of Done

- [ ] ESLint & Prettier exit 0
- [ ] TypeScript shows 0 errors
- [ ] `ts-prune` reports 0 dead exports
- [ ] Upload **code-scan.json** artefact

## 📦 Deliverable

Comment **`STATUS: green | amber | red`** and attach artefact.

````

#### BODY‑A2
```markdown
## 🎯 Objective
Execute the full automated test suite and generate coverage metrics.

## 🔰 Inputs
* Branch / commit: `dev`
* Commands
  ```bash
  pnpm test --run
  pnpm vitest run --coverage
````

## ✅ Definition of Done

- [ ] All existing tests pass (exit code 0)
- [ ] **Line coverage ≥ 70 %** overall
- [ ] Any coverage gaps annotated in report
- [ ] Upload **coverage-summary.md** artefact

## 📦 Deliverable

Comment **`STATUS: green | amber | red`** and attach artefact.

````

#### BODY‑A3
```markdown
## 🎯 Objective
Validate database schema, migrations, and Row Level Security policies.

## 🔰 Inputs
* Supabase project URL + anon key from repo secrets
* Commands
  ```bash
  supabase db dump --file current.sql
  supabase db diff --from current.sql
  node scripts/check-rls.mjs
````

## ✅ Definition of Done

- [ ] `supabase db diff` outputs **no differences**
- [ ] ERD matches Technical Brief (no missing tables/columns)
- [ ] RLS tests: unauthenticated access denied; authenticated access behaves per policy
- [ ] Upload **schema-report.md** artefact

## 📦 Deliverable

Comment **`STATUS: green | amber | red`** and attach artefact.

````

#### BODY‑A4
```markdown
## 🎯 Objective
Ensure build performance, accessibility and bundle size meet early budgets.

## 🔰 Inputs
* Branch / commit: `dev`
* Commands
  ```bash
  pnpm build
  npx lighthouse-ci dist/index.html --output html
  node scripts/run-axe.mjs
````

## ✅ Definition of Done

- [ ] Lighthouse **Performance ≥ 75**, **Accessibility ≥ 90**
- [ ] Axe: 0 critical, ≤ 5 serious issues
- [ ] Final bundle (gzipped) < 250 kB
- [ ] Upload **ci-snapshot.html** artefact

## 📦 Deliverable

Comment **`STATUS: green | amber | red`** and attach artefact.

````

#### BODY‑A5
```markdown
## 🎯 Objective
Detect visual and brand‑consistency regressions across the component library.

## 🔰 Inputs
* Storybook build + Chromatic snapshot
* Commands
  ```bash
  npm run chromatic --exit-zero-on-changes
  node scripts/contrast-check.mjs
````

## ✅ Definition of Done

- [ ] UI tokens only referenced from `tokens.ts`
- [ ] All text elements pass WCAG AA contrast
- [ ] Word‑mark renders correctly in login & navbar shots
- [ ] Upload **visual-diff.pdf** artefact

## 📦 Deliverable

Comment **`STATUS: green | amber | red`** and attach artefact.

````

#### BODY‑A6
```markdown
## 🎯 Objective
Extract every open question or risk item from roadmap/brief and map to future phases.

## 🔰 Inputs
* `docs/paramind-lms-roadmap-v1.2.md`
* `docs/paramind_lms_comprehensive_design_technical_brief_v_0.md`
* Commands
  ```bash
  node scripts/extract-open-questions.mjs
````

## ✅ Definition of Done

- [ ] CSV lists **all open questions** with category, source line, phase where decision needed
- [ ] Items with **no upcoming ticket** flagged `UNSCHEDULED`
- [ ] Upload **risk-log.csv** artefact

## 📦 Deliverable

Comment **`STATUS: green | amber | red`** and attach artefact.

```

### CONSTRAINTS
* Do not ask the human for further input.
* All six issues must be created during one run.
* Use ISO dates in the report (`2025-07-06`).

### OUTPUT
Respond only with:
```

OK – six audit issues created, CI running. I will report status updates here.

```

```

---

Save this in your knowledge base or keep it handy whenever you need to re‑run the Phase‑2.5 audit.
