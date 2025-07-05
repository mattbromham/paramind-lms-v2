### QA Ticket 1-2 · Supabase client verification

**Objective**

Verify that the Supabase client implemented in Ticket 1‑2 meets functional, type‑safety, SSR‑safety, and CI requirements so the project can proceed to Ticket 1‑3.

_Roadmap reference: Phase 1, ticket 1‑2._

---

## 1 · Test matrix

### 1.1 Static analysis

- **Lint** – `pnpm lint` reports 0 errors/warnings.
- **Type check** – `tsc --noEmit` passes with no errors.
- **Unused imports / dead code** – run `pnpm lint:ts-unused-exports` (if configured) or manually inspect `src/lib/supabase.ts`.

### 1.2 Build paths

| Mode | Command                                 | Expected                                                           |
| ---- | --------------------------------------- | ------------------------------------------------------------------ |
| CSR  | `pnpm build`                            | Completes without warnings; outputs valid `dist/`.                 |
| SSR  | `vite build --ssr src/entry-server.tsx` | Builds without referencing `window` or other browser‑only globals. |

### 1.3 Runtime tests (Vitest + JSDOM)

Extend `src/lib/__tests__/supabase.spec.ts`:

1. **Singleton vs. factory**

   ```ts
   import { getSupabase } from '@/lib/supabase';

   // node env
   const a = getSupabase();
   const b = getSupabase();
   expect(a).not.toBe(b);

   // jsdom env (set via test block or file)
   const c = getSupabase();
   const d = getSupabase();
   expect(c).toBe(d);
   ```

2. **Env guard**

   ```ts
   const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = process.env;
   delete process.env.VITE_SUPABASE_URL;
   expect(() => require('@/lib/supabase')).toThrow('Missing Supabase env vars');
   process.env.VITE_SUPABASE_URL = VITE_SUPABASE_URL;
   process.env.VITE_SUPABASE_ANON_KEY = VITE_SUPABASE_ANON_KEY;
   ```

3. **Type inference smoke test**
   ```ts
   // compile‑time only
   import { getSupabase } from '@/lib/supabase';
   const supa = getSupabase();
   type _Check = Parameters<typeof supa.from>[0]; // should resolve without any `any`
   ```

### 1.4 E2E smoke (optional)

If Playwright is configured:

- Add dummy route/component that calls `getSupabase()` on both server and client.
- Ensure page renders with no runtime errors in console or server log.

---

## 2 · Acceptance criteria ✅

| Area             | Pass condition                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **CI**           | All workflows green on PR.                                                                                      |
| **Static**       | Lint + type check pass.                                                                                         |
| **Builds**       | CSR & SSR builds succeed with 0 warnings.                                                                       |
| **Tests**        | Vitest suite passes, covering singleton/factory and env‑guard logic (≥95 % coverage for `src/lib/supabase.ts`). |
| **Docs**         | `.env.local.example` lists both Supabase vars.                                                                  |
| **Security**     | No secrets committed; env vars required.                                                                        |
| **Code quality** | No TODOs or console logs remain.                                                                                |

---

## 3 · Definition of Done

- All acceptance criteria met and merged to **dev**.
- QA comment summarises results and links coverage report.
- Ticket status switched to **Verified**, unblocking Ticket 1‑3.

---

## 4 · Resources

- Supabase JS v2 docs – <https://supabase.com/docs/reference/javascript>
- Vite SSR build guide – <https://vitejs.dev/guide/ssr.html>
- Internal env‑var spec – see project brief.

---
