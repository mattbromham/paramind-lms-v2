# Paramind LMS · Ticket 2‑4 Implementation Prompt (PLANNING → BUILD)

> **Goal:** Implement React Query data‑fetching hooks `useNodes()` and `useLesson(slug)` that read data via Supabase Row‑Level Security. All prior tickets (1‑1 → 2‑3) are merged and green.

---

## 1 · Context & Starting Point

- **Repo**: monorepo scaffolding from ticket 1‑1. Uses **Vite + React 18 + TypeScript**.
- **Styling**: Tailwind CSS; shadcn/ui components.
- **Data client**: `src/lib/supabase.ts` exports a typed Supabase JS v2 client (`createBrowserClient`) and is SSR‑safe.
- **Auth**: `<SessionContextProvider>` wraps `<App />`; user session is accessible via hooks created previously.
- **State/query layer**: TanStack Query provider added in ticket 2‑3 with sensible defaults:
  ```tsx
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <App />
  </QueryClientProvider>
  ```
- **DB schema**: tables `nodes`, `lessons` exist. Expected minimal columns:

  ```sql
  create table public.nodes (
    id uuid primary key,
    slug text unique not null,
    title text not null,
    cluster text,
    unlocked boolean generated always as (is_unlocked_by_user(id, auth.uid())) stored
  );

  create table public.lessons (
    id uuid primary key,
    slug text unique not null,
    title text not null,
    body markdown not null,
    node_id uuid references public.nodes(id),
    updated_at timestamptz default now()
  );
  ```

  Row‑Level Security allows `SELECT` for `role authenticated`.

- **Testing**: Vitest + jsdom + `@testing-library/react`. Supabase client is mocked in tests from ticket 2‑3.

---

## 2 · Objectives

1. **Create reusable hooks**

   | Hook              | Query key          | Returns                                      | Notes                                                  |
   | ----------------- | ------------------ | -------------------------------------------- | ------------------------------------------------------ |
   | `useNodes()`      | `['nodes']`        | `{ data: Node[] \| undefined, ... }`         | Only unlocked nodes for current user (via RLS)         |
   | `useLesson(slug)` | `['lesson', slug]` | `{ data: Lesson \| null \| undefined, ... }` | Fetch by `slug`; include related node row (`nodes(*)`) |

2. **Error & loading state exposure**
   - Expose `isLoading`, `isError`, `error`, `refetch`, etc.
   - If Supabase returns RLS denial (`error.code === '42501'`), transform to `Error('Access denied')`.

3. **Type safety**
   - Re‑use generated Supabase types (`src/types/supabase.ts`).
   - Export `type Node` and `type Lesson` derived from those for consumers.

4. **Cache/staleness**
   - `useNodes` → `staleTime: 5 * 60_000`.
   - `useLesson` → `staleTime: 60_000`.

5. **Tests**
   - 100 % branch coverage.
   - Mock paths: success, RLS‑denied, network error.
   - Integration test hitting local Supabase dev service in CI.

6. **Docs & DX**
   - JSDoc for each hook.
   - Update `README.md` Data Hooks section.
   - Ensure `pnpm lint` clean.

---

## 3 · Acceptance Checklist (mirrors roadmap ✅)

- [ ] Vitest mocks **and** live fetch succeed (`pnpm test`).
- [ ] `pnpm build` passes with zero TypeScript errors.
- [ ] CI workflow remains green.
- [ ] No ESLint warnings in `src/hooks/**`.
- [ ] Hooks appear in React Query Devtools with correct keys.
- [ ] Hooks refetch & clear data on `supabase.auth.signOut()`.

---

## 4 · Implementation Notes

- **Supabase query**

  ```ts
  const { data, error } = await supabase
    .from('lessons')
    .select('*, nodes(*)')
    .eq('slug', slug)
    .single();
  ```

  Prefer `.throwOnError()` for brevity.

- **Dependency injection**

  ```ts
  export function useNodes(client = supabase) {
    /* ... */
  }
  ```

- **Error normalisation**
  Create `src/lib/normalizeSupabaseError.ts`. Unit‑test thoroughly.

- **SSR safe**
  No `window` access during initial render.

- **File structure**

  ```
  src/
    hooks/
      useNodes.ts
      useLesson.ts
    lib/
      normalizeSupabaseError.ts
    types/
      supabase.ts
  ```

- **Commit message**
  `feat(hooks): add useNodes and useLesson with tests`

---

## 5 · Non‑Goals

- No UI components or route wiring.
- No mutations.
- No pagination.

---

## 6 · Estimated Effort

| Task                | Time     |
| ------------------- | -------- |
| Coding & unit tests | 35 min   |
| Integration fetch   | 10 min   |
| Coverage polish     | 10 min   |
| Docs & lint         | 5 min    |
| **Total**           | **~1 h** |

---

## 7 · Deliverable

A single PR to `dev` containing:

1. `src/hooks/useNodes.ts`, `src/hooks/useLesson.ts`
2. Tests under `src/hooks/__tests__/`
3. Updated `README.md`
4. Passing CI & unchanged coverage badge

<details>
<summary>Sample usage</summary>

```tsx
import { useNodes, useLesson } from '@/hooks';

export function LessonPage({ slug }: { slug: string }) {
  const { data: lesson, isLoading, isError } = useLesson(slug);

  if (isLoading) return <Spinner />;
  if (isError || !lesson) return <ErrorState />;

  return <LessonRenderer lesson={lesson} />;
}
```

</details>

---

**Build impeccably; this implementation is the foundation for downstream tickets.**
