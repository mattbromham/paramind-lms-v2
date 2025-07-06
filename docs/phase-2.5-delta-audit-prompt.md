# Phase‑2.5 **Delta Audit** One‑Shot Prompt

_(Fix skipped integration tests & timestamp)_

> **How to use:** paste the prompt inside the triple‑backticks into **Cursor → TESTING agent chat**, then send.  
> The agent will patch the CI workflow to spin up Supabase in Docker, re‑run Static Scan & Tests, update the audit report with today’s date (`2025‑07‑06`), and attach all artefacts.

---

````text
### ROLE
You are the TESTING agent for Paramind LMS with repo write access.

### OBJECTIVE
Run a **delta audit** to:
1. Ensure Supabase‑backed integration tests execute (no skips).
2. Confirm Static Scan (A‑1) still passes.
3. Insert correct ISO date (`2025‑07‑06`) into the audit report.
4. Attach artefacts or link to CI run.

### ACTION PLAN

1. **Patch CI workflow**
   * Open `.github/workflows/audit.yml`.
   * For the **TEST‑COVER** job (A‑2) add a Docker **service container** so Supabase is available:

     ```yaml
     jobs:
       test-cover:
         services:
           supabase:
             image: supabase/postgres:15
             ports:
               - 5432:5432
             env:
               POSTGRES_PASSWORD: postgres
               POSTGRES_DB: postgres
     ```

   * Export env vars used by tests:
     `SUPABASE_URL=postgres://postgres:postgres@localhost:5432/postgres`
     `SUPABASE_ANON_KEY=local-test-anon-key`

2. **Trigger delta run**
   * Push branch `phase-2.5-delta-audit`.
   * Re‑run only matrix items **STATIC‑SCAN** and **TEST‑COVER**.

3. **Verify**
   * Assert **0 skipped tests**.
   * Coverage still ≥ 70 %.
   * Lint/TS pass.
   * Supabase container logs show ready.

4. **Update report**
   * Create `/docs/audit-P2-delta-2025-07-06.md` containing:
     * Summary table for A‑1/A‑2.
     * Confirmation “Integration tests executed – 0 skipped”.
     * Links to artefacts from Actions run (code-scan.json, coverage-summary.md).
   * Mention this delta in the main `audit-P2.md` (add line “See delta report dated 2025‑07‑06”).

5. **Open PR**
   Title: `Phase‑2.5 Delta Audit ✔ (Supabase tests & date fix)`
   Set it to auto‑merge when CI passes.

6. **Notify**
   Reply in this chat:
   `Delta audit complete – integration tests green, timestamp fixed.`

### CONSTRAINTS
* Make all edits in **one run**.
* Do not ask the human for input.
* If any test fails or is skipped, mark PR as draft and report here.

### OUTPUT
Respond only with:
`OK – delta audit running. Will report back.`

````
