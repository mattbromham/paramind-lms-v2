# ✅ **QA Ticket 2‑1 Verification Prompt**

**Scope** | End‑to‑end verification of _Core DB migrations_ (`users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges`) implemented in ticket 2‑1  
**Branch/Env** | `dev` branch with latest `main` merged. Use local Supabase instance spun up via `supabase start`.  
**Time‑box** | ≈ 1½ h (road‑map estimate)  
**Prereqs** | Supabase CLI & Docker running; `supabase/config.toml` unchanged; `.env` contains `SUPABASE_DB_URL`.

---

## 1 · Objectives

1. **Migration integrity** – the SQL file applies cleanly on a fresh DB and rolls back without residue.
2. **Schema fidelity** – every table, column, type, constraint, index, trigger and extension exactly matches the spec in Build prompt §3‑6.
3. **Security readiness** – RLS is enabled (no policies yet) so that the _anon_ role cannot `SELECT`/`INSERT`.
4. **Operational soundness** – zero drift after re‑diff; CI remains green.
5. **Future readiness** – schema state is a solid base for ticket 2‑2 (RLS policies).

---

## 2 · Deliverables (Definition of Done)

|  #  | Deliverable                                                          | Acceptance criteria                                                      |
| --- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
|  1  | **Automated test suite** `tests/db/core-schema.test.ts` (Vitest)     | ✔ All assertions pass locally & in CI.<br>✔ Covers cases listed in §3. |
|  2  | **Manual SQL checklist** in `docs/qa/2-1-core-schema.sql` (optional) | Allows quick psql spot‑checks.                                           |
|  3  | **QA report comment** on the PR                                      | Summarises results, links to test run, lists any action items.           |

---

## 3 · Test matrix & sample assertions

|  Aspect                 | Check                                                                                  | Suggested query / code                                             |
| ----------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Extension**           | `pgcrypto` exists                                                                      | `SELECT extname FROM pg_extension WHERE extname='pgcrypto';`       |
| **Function**            | `_core_timestamps` present & language = plpgsql                                        | `SELECT proname FROM pg_proc WHERE proname='_core_timestamps';`    |
| **Tables**              | `users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges` exist                    | `SELECT table_name FROM information_schema.tables …`               |
| **Columns**             | Exact column list & data types per spec                                                | Use `information_schema.columns` and deep‑compare arrays.          |
| **PKs**                 | Each table has single UUID PK w/ `gen_random_uuid()` default                           | Inspect `pg_constraint`, `pg_attrdef`.                             |
| **Foreign keys**        | FKs & cascading rules present                                                          | Query `information_schema.table_constraints` + `key_column_usage`. |
| **Uniqueness & checks** | Unique constraints (`slug`, `auth_id`, etc.) & CHECKs (score, role, length)            | Try positive & negative inserts.                                   |
| **Triggers**            | BEFORE UPDATE trigger on each table invoking `_core_timestamps`                        | `SELECT tgname FROM pg_trigger WHERE tgrelid = 'users'::regclass;` |
| **Indexes**             | Composite / single‑column indexes created                                              | `SELECT indexname FROM pg_indexes …`                               |
| **RLS toggled**         | `relrowsecurity = true` and **no policies** (`pg_policies`)                            | `SELECT relrowsecurity FROM pg_class …`                            |
| **RLS enforcement**     | As _anon_ role:<br>• `SELECT 1 FROM users LIMIT 1;` ⇒ **ERROR**<br>• Same for `INSERT` | Use `SET ROLE authenticator; SET SESSION AUTHORIZATION anon;`      |
| **Migration up→down**   | `supabase db reset` then `supabase db diff` ⇒ _No changes detected_                    | Shell exec from tests.                                             |
| **Rollback**            | Run `DOWN` block then confirm tables are gone                                          | `SELECT table_name …` returns 0 rows.                              |
| **CI smoke**            | `pnpm lint`, `pnpm test`, `pnpm build` all pass                                        | Already in GitHub Actions; test job must run.                      |

---

### Negative data tests

| Case                                    | Expected                                                    |
| --------------------------------------- | ----------------------------------------------------------- |
| Insert `lessons` with `slug` > 60 chars | **Fails** (`VALUE TOO LONG` or CHECK)                       |
| Insert `attempts` with `score=1.5`      | **Fails** (CHECK)                                           |
| Insert `users` with duplicate `auth_id` | **Fails** (UNIQUE)                                          |
| Delete a `lesson` referenced by `nodes` | Cascades and deletes node; downstream FK tests should pass. |

---

## 4 · Implementation guide

1. **Spin up isolated DB**

   ```bash
   supabase stop || true
   supabase start -x studio
   supabase db reset
   ```

2. **Run migration under test**

   ```bash
   supabase db reset --linked
   ```

3. **Write Vitest suite**
   - Use `pg` driver (`@supabase/postgres-js` or `pg`) and env `SUPABASE_DB_URL`.
   - Wrap DDL/DML checks in `await db.query(...)`.
   - Provide helper `getTable(name)` returning column meta for DRY assertions.

4. **Role switching utility**

   ```ts
   async function asRole(role: 'authenticated' | 'anon', cb) { … }
   ```

5. **Drift check** – exec `supabase db diff --use-pg-diff-sync` inside test and assert empty stdout.

6. **Rollback test** – execute `supabase db reset --down` or run DOWN SQL manually, then assert tables gone.

7. **Add to CI** – Update `.github/workflows/ci.yml` matrix to include `pnpm test --filter "@db"`.

---

## 5 · Reporting

- Post a PR comment formatted as:

  ```
  ### QA Result for Ticket 2‑1
  ✅ 28/28 checks passed
  🔍 Drift: none
  🛡️ RLS: enabled, no policies
  🕒 Duration: 1m 23s
  ```

- If **any** check fails, label PR with `qa-fail` and assign back to Build engineer.

---

## 6 · Out of scope

- Writing or enabling actual RLS policies (covered in ticket 2‑2).
- Seed data, views, or non‑core tables.
- Performance benchmarks.

---

### 🚀 **Green means go**

When all tests are passing and the report is posted, move ticket 2‑1 to **Done** and unblock ticket 2‑2.
