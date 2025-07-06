# 🚧 **Ticket 2-2 – Row-Level Security Baseline**

> **Scope:** Add “minimum safe set” row-level-security (RLS) policies for the six core tables created in **Ticket 2-1** (`users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges`) so that **only the Supabase role `authenticated` may read or write rows that belong to them**, and **`anon` is locked out**.  
> _Downstream dependency:_ none – this finishes Phase 2’s data-layer hardening.

---

## 1 · Objectives

| #     | Requirement                                                                                                                                | Success signal                                  |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| **1** | RLS **ON** and default `REVOKE` for all six tables.                                                                                        | `supabase db diff` shows no unprotected tables. |
| **2** | Policies follow the **“minimum safe set”**: `SELECT` always; `INSERT/UPDATE` only when learner-owned; **never `DELETE`** from client code. | Manual psql tests succeed/deny as expected.     |
| **3** | **Unauthenticated** requests to `/nodes` (or any RPC touching these tables) **fail** with HTTP 401.                                        | New Playwright e2e spec passes.                 |
| **4** | Existing unit tests & CI pipeline stay ✨ green.                                                                                           | GitHub Action shows ✅.                         |

---

## 2 · Policy Matrix

| Table        | Enabled Roles & Operations                    | `USING` / `WITH CHECK` clause |
| ------------ | --------------------------------------------- | ----------------------------- |
| **users**    | `authenticated`: `SELECT`, `UPDATE`           | `id = auth.uid()`             |
| **nodes**    | `authenticated`: `SELECT` (read-only)         | `true`                        |
| **lessons**  | `authenticated`: `SELECT` (read-only)         | `true`                        |
| **attempts** | `authenticated`: `SELECT`, `INSERT`           | `user_id = auth.uid()`        |
| **sr_cards** | `authenticated`: `SELECT`, `INSERT`, `UPDATE` | `user_id = auth.uid()`        |
| **badges**   | `authenticated`: `SELECT`                     | `user_id = auth.uid()`        |

> **Notes**
>
> - `anon` role remains fully revoked.
> - `UPDATE` on content tables (`nodes`, `lessons`) is intentionally omitted pending an instructor-only service role.
> - Prefer **row ownership checks** (`user_id = auth.uid()`) rather than relying on schema-wide grants.

---

## 3 · Implementation Steps

1. **Branch:** `feature/2-2-rls`.
2. **SQL migration** (`supabase/migrations/20250706T000000_rls.sql`):

   ```sql
   -- Enable RLS and revoke open privileges
   ALTER TABLE public.users     ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.nodes     ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.lessons   ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.attempts  ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.sr_cards  ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.badges    ENABLE ROW LEVEL SECURITY;

   -- USERS
   CREATE POLICY "users_select_own"  ON public.users
     FOR SELECT USING ( id = auth.uid() );
   CREATE POLICY "users_update_own"  ON public.users
     FOR UPDATE USING ( id = auth.uid() )
               WITH CHECK ( id = auth.uid() );

   -- NODES
   CREATE POLICY "nodes_read" ON public.nodes
     FOR SELECT USING ( auth.role() = 'authenticated' );

   -- LESSONS
   CREATE POLICY "lessons_read" ON public.lessons
     FOR SELECT USING ( auth.role() = 'authenticated' );

   -- ATTEMPTS
   CREATE POLICY "attempts_owner_read"  ON public.attempts
     FOR SELECT USING ( user_id = auth.uid() );
   CREATE POLICY "attempts_owner_write" ON public.attempts
     FOR INSERT WITH CHECK ( user_id = auth.uid() );

   -- SR_CARDS
   CREATE POLICY "sr_cards_owner_read"   ON public.sr_cards
     FOR SELECT USING ( user_id = auth.uid() );
   CREATE POLICY "sr_cards_owner_insert" ON public.sr_cards
     FOR INSERT WITH CHECK ( user_id = auth.uid() );
   CREATE POLICY "sr_cards_owner_update" ON public.sr_cards
     FOR UPDATE USING ( user_id = auth.uid() )
               WITH CHECK ( user_id = auth.uid() );

   -- BADGES
   CREATE POLICY "badges_owner_read" ON public.badges
     FOR SELECT USING ( user_id = auth.uid() );
   ```

3. **Type-generation refresh**

   ```bash
   supabase gen types typescript --local > src/types/supabase.ts
   ```

4. **Playwright e2e** (`tests/auth/rls.spec.ts`):
   - Launch app with **no session** → visit `/nodes` → expect redirect to `/sign-in` **or** 401 toast.
   - Repeat signed-in flow → expect **200** and visible node list.

5. **CI hooks**
   - Ensure migration runs in Postgres service for Jest & Playwright.
   - Add simple **psql smoke script** in workflow: query `SELECT * FROM nodes LIMIT 1;` as `anon` role → expect `permission denied`.

---

## 4 · Acceptance Checklist (copy to PR description)

- [ ] Migration file added & committed.
- [ ] Local `pnpm dev` + `pnpm test` + `pnpm playwright test` all pass.
- [ ] GitHub Action green (build → Axe → Jest → Playwright → Lighthouse).
- [ ] Manual console check:
  ```sql
  set role anon;
  select count(*) from nodes; -- ERROR
  ```
- [ ] Docs updated (`docs/security/rls.md`).

---

## 5 · Tips & Pitfalls

- **No silent leaks:** Always `REVOKE ALL ON … FROM anon, authenticated` before policies to prevent privilege creep.
- **`auth.role()`** vs `auth.uid()`: use `auth.role()` only when ownership is irrelevant (global read).
- **Future instructor role:** leave content‐table mutations for later service role to avoid premature privilege.
- **Supabase Studio ≠ prod:** test via psql or CLI; Studio bypasses some policy paths.
- **Time-boxed:** stay within the **45 min** agent budget – use copy-paste templates above.

---

⏱ **Estimated agent build time:** ~45 productive minutes.

_Good luck – ship it!_ 🚀
