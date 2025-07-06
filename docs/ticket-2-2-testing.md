# ✅ **QA Plan – Ticket 2‑2 Row‑Level Security Verification**

> **Goal:** Thoroughly validate the new “minimum safe set” Row‑Level Security (RLS) policies (Ticket 2‑2) and confirm the codebase is stable enough to begin **Ticket 2‑3 – React‑Query setup**.

---

## 1 · Scope

| In                                                                                                                           | Out                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| • Six core tables: `users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges`<br>• Supabase roles `anon`, `authenticated` | • Instructor/service role (future)<br>• Any front‑end mutation for `nodes` / `lessons` |

---

## 2 · Acceptance Criteria

| #      | Requirement                                                                                                                | Validation Method                                            |
| ------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **A1** | RLS **enabled** + `REVOKE ALL` for every in‑scope table.                                                                   | Psql introspection script (`pg_policies`, `relrowsecurity`). |
| **A2** | Policy behaviour matches matrix in §3 for **both roles**.                                                                  | Automated integration tests (Vitest) + manual psql session.  |
| **A3** | **Unauthenticated** browser access to `/nodes`, any public RPC or REST path touching protected tables returns **401/403**. | Playwright e2e.                                              |
| **A4** | All pre‑existing unit, integration & e2e tests are still green.                                                            | GitHub Actions run on PR branch.                             |
| **A5** | Migration file timestamped **20250706** is present and idempotent on clean DB.                                             | `supabase db reset` → `supabase db push` twice without diff. |
| **A6** | Security scan shows **0 high‑severity** issues.                                                                            | `npm run trivy`, `npm run snyk:test`.                        |
| **A7** | Docs updated (`docs/security/rls.md`) & CHANGELOG line added.                                                              | Manual review.                                               |

---

## 3 · Policy Behaviour Matrix

| Table        | Role          | SELECT       | INSERT   | UPDATE       | DELETE |
| ------------ | ------------- | ------------ | -------- | ------------ | ------ |
| **users**    | authenticated | ✅ _own row_ | —        | ✅ _own row_ | —      |
|              | anon          | ⛔           | ⛔       | ⛔           | ⛔     |
| **nodes**    | authenticated | ✅           | —        | —            | —      |
|              | anon          | ⛔           | ⛔       | ⛔           | ⛔     |
| **lessons**  | authenticated | ✅           | —        | —            | —      |
|              | anon          | ⛔           | ⛔       | ⛔           | ⛔     |
| **attempts** | authenticated | ✅ _own_     | ✅ _own_ | —            | —      |
|              | anon          | ⛔           | ⛔       | ⛔           | ⛔     |
| **sr_cards** | authenticated | ✅ _own_     | ✅ _own_ | ✅ _own_     | —      |
|              | anon          | ⛔           | ⛔       | ⛔           | ⛔     |
| **badges**   | authenticated | ✅ _own_     | —        | —            | —      |
|              | anon          | ⛔           | ⛔       | ⛔           | ⛔     |

Use this matrix to generate both positive and negative test cases.

---

## 4 · Test Suite Components

### 4.1 Integration (Vitest + Supabase)

- `tests/db/rls.integration.test.ts`
  1. **Setup** – Spin up Supabase container seeded with baseline migration.
  2. **Seed** – Three dummy users (`u1`, `u2`, `anon`).
  3. **Assertions** – For each table/operation/role pair in §3:
     - Expect **success** for ✅ paths and **`PostgRESTError`** for ⛔ paths.
  4. **Teardown** – Container down.

### 4.2 End‑to‑End (Playwright)

- **Unauth Flow** – Visit `/nodes` without cookies → expect redirect to `/sign-in` or 401 toast.
- **Auth Flow** – Log in via Supabase magic link helper; ensure node list renders with HTTP 200.
- **API Probe** – `await request.get('/rest/v1/lessons')` as `anon` → expect 401.

### 4.3 Static & Security

- **Migration Lint** – `npm run supa:check` (sqitch diff).
- **Trivy** container scan.
- **ESLint** + **Prettier** unchanged.

### 4.4 Regression Pack

Run full Jest and Playwright suites from tickets **1‑1 → 2‑1**.

---

## 5 · Tooling & Env

| Resource     | Version  |
| ------------ | -------- |
| Node         | 20 LTS   |
| Supabase CLI | ^1.157.0 |
| Postgres     | 15       |
| pnpm         | 9.x      |
| Vitest       | ^1.5     |
| Playwright   | ^1.45    |

**Commands**

```bash
pnpm install
supabase db reset --include-types
pnpm supa:migrate  # wrapper around supabase db push
pnpm test          # Vitest
pnpm playwright test
npm run trivy
```

---

## 6 · Failure Diagnostics

| Symptom                                                               | Likely Cause                                  | Quick Fix                            |
| --------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------ |
| `permission denied for table …` during auth flow                      | Missing `USING` clause on read policy         | Update migration & regenerate types. |
| Authenticated update fails with `new row violates row‑level security` | `WITH CHECK` predicate mismatches `USING`     | Align both clauses.                  |
| CI passes locally but fails in GitHub                                 | Forgot to commit migration/timestamp mismatch | Add file, push, re‑run.              |

---

## 7 · Exit Criteria (Gate to Ticket 2‑3)

- [ ] All criteria in §2 satisfied.
- [ ] Regression pack clean.
- [ ] QA TAG v2.2 pushed & annotated.
- [ ] PR approved by QA lead.
- [ ] Issue **2‑3** unlocked.

---

## 8 · Deliverables

1. **Test report**: markdown summary + Playwright screenshots.
2. **Coverage delta**: `coverage/` artefact uploaded.
3. **QA tag**: `v2.2-qa-pass`.

---

⏱ **Estimated QA time:** ~2 agent‑hours end‑to‑end.

_Happy testing!_ 🛠️
