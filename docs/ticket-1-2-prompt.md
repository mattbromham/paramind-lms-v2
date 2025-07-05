### Ticket 1-2 · Supabase client (Phase 1)

**Goal**

Create a **typed, SSR-safe Supabase client** and expose it app-wide. This unblocks all data-layer tickets and must compile cleanly under CI.

_Roadmap reference: Phase 1, ticket 1-2 (⏱ 30 min)._ fileciteturn0file0

---

## 1 · Scope of Work

1. **Install / update deps**

   ```bash
   pnpm add @supabase/supabase-js
   ```

2. **Environment variables**

   _Use the names already defined in `.env.local.example`_ fileciteturn0file1

   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

   _Do **not** hard-code fallbacks; throw early if missing._

3. **Typed client factory**
   - Path: `src/lib/supabase.ts`
   - Use `createClient<Database>()`, where `Database` comes from the generated file:
     ```bash
     supabase gen types typescript --local > src/types/supabase.ts
     ```
   - Provide a **singleton in the browser** and a **per-call factory on the server** to avoid cross-request bleed:

     ```ts
     import { createClient, SupabaseClient } from '@supabase/supabase-js';
     import type { Database } from '@/types/supabase';

     const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
     const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

     if (!SUPABASE_URL || !SUPABASE_ANON) {
       throw new Error('Missing Supabase env vars');
     }

     let browserClient: SupabaseClient<Database> | null = null;

     /** Call in components – returns the right client for the current environment */
     export const getSupabase = (): SupabaseClient<Database> => {
       if (typeof window === 'undefined') {
         // SSR/request scope
         return createClient<Database>(SUPABASE_URL, SUPABASE_ANON, {
           auth: { persistSession: false },
         });
       }
       // Browser singleton
       if (!browserClient) {
         browserClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON);
       }
       return browserClient;
     };
     ```

4. **Wire-up**
   - In `src/main.tsx` (or the top-level entry created in ticket 1-1) import `getSupabase()` once at module scope to ensure the client is tree-shaken in builds but initialised eagerly:

     ```ts
     import { getSupabase } from '@/lib/supabase';
     getSupabase();
     ```

   - No UI changes required yet.

5. **Type-check & build**

   ```bash
   pnpm lint && pnpm test && pnpm build
   ```

   CI **must** stay green (Vitest + ESLint + Prettier hooks already active from ticket 1-1).

---

## 2 · Acceptance Criteria ✅

| Check           | Pass condition                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Build**       | `pnpm build` (Vite) completes with 0 errors/warnings.                                                                                                                                             |
| **Typing**      | `tsc --noEmit` passes; `supabase` instance is `SupabaseClient<Database>`.                                                                                                                         |
| **SSR-safe**    | Running `vite build --ssr src/entry-server.tsx` (if present) compiles without referencing `window`.                                                                                               |
| **Import test** | A Vitest spec (`src/lib/__tests__/supabase.spec.ts`) asserts that two consecutive `getSupabase()` calls in Node return _different_ objects (server mode) while JSDOM returns the _same_ instance. |
| **Env guard**   | Deleting one of the env vars causes the test to throw the configured Error.                                                                                                                       |

---

## 3 · Definition of Done

- All acceptance criteria above met.
- No ESLint or Prettier violations.
- `.env.local.example` contains both Supabase vars and is committed.
- `.gitignore` lists `.env.local`.

---

## 4 · Reference links

- Supabase JS v2 docs – https://supabase.com/docs/reference/javascript
- Best-practice singleton pattern – https://supabase.com/docs/guides/getting-started/tutorials/with-react#single-page-applications-spa
- Internal brief: env var naming & generated types. fileciteturn0file1

---

> \*\*No further tickets may begin until this one is merged to `dev` with a green CI.
