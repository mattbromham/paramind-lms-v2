# ✅ QA Prompt — Ticket 1‑4 “CI Baseline”

_Paramind LMS · Phase 1 · Continuous‑Integration Foundation_

---

## 1 · Mission

You are the **TESTING agent**.  
Your objective is to **certify** that ticket **1‑4 CI Baseline** delivered by the BUILD agent:

- A) **Fully satisfies every acceptance criterion** defined in the roadmap and Build prompt.
- B) Introduces **no regressions** to the existing codebase, hooks, or GitHub settings.
- C) Is **ready for merge** to `dev`, enabling the next ticket to begin immediately.

Produce a concise **PASS/FAIL verdict** for each test case plus a short final “Ready / Blocked” decision.

---

## 2 · Preconditions

1. You have a local clone of the `paramind‑lms` repo with the Build PR checked out.
2. `pnpm`, Node 20+, Git 2.40+, and Docker (optional) are installed.
3. You possess maintainer‑level access to the GitHub repository settings to view branch‑protection rules and workflow run details.

---

## 3 · Acceptance Criteria (source of truth)

| ID     | Area                  | Done when                                                                                                               |
| ------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| AC‑1   | **Lint**              | `pnpm lint` exits 0, shows **no** error **and** no warning.                                                             |
| AC‑2   | **Unit tests**        | `pnpm test` (Vitest) exits 0 with green summary.                                                                        |
| AC‑3   | **Build**             | `pnpm build` completes a Vite production build **without warnings**.                                                    |
| AC‑4   | **Accessibility**     | `pnpm ci:axe` reports **0 critical** & **0 serious** violations on `dist/index.html`.                                   |
| AC‑5   | **GitHub Action**     | A single file `.github/workflows/ci.yml` runs the four stages **sequentially** and fails fast.                          |
| AC‑6   | **PR Integration**    | Opening a PR targeting `dev` automatically triggers the workflow and it must be green before merge is allowed.          |
| AC‑7   | **Branch Protection** | `dev` branch rule **requires** the “CI” workflow check to pass.                                                         |
| AC‑8   | **Idempotence**       | Manually re‑running the workflow with “Re‑run jobs” **succeeds repeatedly** without cache corruption or orphaned ports. |
| AC‑9   | **Regression Guard**  | Existing Lefthook pre‑commit pipeline still passes locally (`pnpm lefthook run pre‑commit`).                            |
| AC‑10  | **Performance**       | Total CI runtime ≤ **15 minutes** on `ubuntu‑latest`.                                                                   |

Use this table to structure your test log.

---

## 4 · Test Plan

### 4.1 Positive (“Happy Path”) Validation

| Step | Action                                      | Expected Result                               | Criteria           |
| ---- | ------------------------------------------- | --------------------------------------------- | ------------------ |
| P‑1  | Push **no‑change** commit to the PR branch. | GitHub creates a new workflow run.            | AC‑5, AC‑6         |
| P‑2  | Wait for workflow completion.               | All four job steps show ✅; runtime < 15 min. | AC‑1 → AC‑4, AC‑10 |
| P‑3  | Click “Re‑run jobs”.                        | Second run passes green.                      | AC‑8               |
| P‑4  | Attempt to merge PR.                        | GitHub allows merge (status check satisfied). | AC‑6, AC‑7         |

### 4.2 Negative / Failure‑Mode Injection

Inject exactly one fault at a time, commit, push, and observe CI failure **at the correct stage**. Then revert the change.

| Step | Fault to inject                                        | Expected failing stage                        |
| ---- | ------------------------------------------------------ | --------------------------------------------- |
| N‑1  | Introduce an ESLint rule violation (e.g., unused var). | **Lint** step fails fast.                     |
| N‑2  | Change a unit test expectation so it fails.            | **Unit tests** fail; later steps **skipped**. |
| N‑3  | Break the `build` (e.g., invalid import path).         | **Build** step fails.                         |
| N‑4  | Add `<img>` without `alt` to landing page.             | **Accessibility** step fails with Axe error.  |

The workflow **MUST** stop at the first failing stage; subsequent steps must not run.

### 4.3 Branch‑Protection Check

1. In GitHub ▸ Settings ▸ Branches, open the rule for `dev`.
2. Confirm “**Require status checks to pass**” is enabled and includes the **CI** workflow.

### 4.4 Local Regression Check

```bash
pnpm lefthook run pre-commit
```

Expect exit 0.

---

## 5 · Reporting Protocol

1. Fill the AC table in §3 with **PASS/FAIL**.
2. Provide ⏱ runtime metrics (first run).
3. Attach artifact links or screenshots for any failure.
4. Conclude with either:

```
### QA Verdict
✅ Ready to merge   or   ❌ Blocked – see failures above
```

---

## 6 · Handoff

- If **Ready**, label the PR `qa‑approved` and ping the Release Manager.
- If **Blocked**, assign the PR back to the BUILD agent with bug details tied to the failing AC‑IDs.

---

## 7 · References

- Build prompt for ticket 1‑4 (lint‑test‑build‑axe pipeline).
- Roadmap v1.2 tickets table (CI baseline).
- Brand Style Blueprint § Accessibility AA.

---

_End of QA prompt_
