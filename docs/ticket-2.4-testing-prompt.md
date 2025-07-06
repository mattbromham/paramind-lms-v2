# Paramind LMS · Ticket 2‑4 Verification Prompt (PLANNING → TESTING)

> **Mission:** Prove, with automated tests and lightweight manual checks, that ticket 2‑4 (“Data‑fetching hooks — `useNodes`, `useLesson`”) is fully implemented, robust, and unblocks ticket 3‑1 work.

---

## 1 · Scope of Testing

| Layer           | What to verify                                                                      | Why                                                |
| --------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Unit**        | Logic inside each hook, error normalisation, cache keys, staleTime                  | Fast feedback and edge‑case coverage               |
| **Integration** | Hooks executing against live local Supabase dev service with RLS enabled            | Confirms wiring, SQL filters, and auth propagation |
| **Contract**    | Generated Supabase types vs. actual DB schema                                       | Prevents runtime shape drift                       |
| **E2E smoke**   | Hooks working inside a minimal sample component rendered with React Testing Library | Detects provider / context regressions             |

---

## 2 · Acceptance Criteria (from roadmap v1.2 & prompt)

1. `useNodes()` and `useLesson(slug)` **exist** in `src/hooks/` and **export** typed return objects.
2. `useNodes` → query key `['nodes']`; `useLesson` → `['lesson', slug]`.
3. Supabase RLS denies locked rows — hook must NOT return them.
4. Error code **`42501`** is normalised to `Error('Access denied')`.
5. `staleTime` values exactly match spec (5 min / 1 min).
6. Hooks are **SSR‑safe** (no `window` in first render).
7. Query cache is cleared on `supabase.auth.signOut()`.
8. Lint, TypeScript, unit, integration, and coverage gates all pass (`pnpm test`, `pnpm lint`, `pnpm type‑check`, `pnpm build`).
9. Branch coverage ≥ **100 %** for new files (enforced via Vitest threshold).
10. Hooks appear in React Query Devtools with correct keys when running `pnpm dev`.

---

## 3 · Deliverables from TESTING agent

- `src/hooks/__tests__/` additional (or updated) **unit + integration** test files.
- `tests/contract/schema-sync.test.ts` checking Supabase types vs. DB introspection (use `postgrest-js`).
- `tests/e2e/lesson-page.test.tsx` minimal component smoke test.
- **CI updates** in `.github/workflows/ci.yml` if required (e.g., start Supabase service before tests).
- A **test‑report.md** summarising results, coverage, and any found defects.
- **Defect tickets** (Jira/Epics) for anything blocking ticket 3‑1.

---

## 4 · Recommended Test Strategy

### 4.1 Unit

- Use **Vitest** with `vi.mock('@/lib/supabase')`.
- Table‑drive success, RLS‑denied, and network error paths.
- Assert:
  - Return types (`Node[]`, `Lesson`) via `expectTypeOf`.
  - Query keys via `queryClient.getQueryCache().find(...)`.
  - `staleTime` via hook options (inspect internal query).

### 4.2 Integration (local Supabase)

1. Spin up dev stack: `pnpm supabase start`.
2. Seed DB with:
   ```sql
   insert into nodes(id, slug, title, cluster)
   values (gen_random_uuid(), 'intro', 'Intro', 'core');
   ```
3. Create two users: `tester@example.com` and `locked@example.com`.
4. From test, sign in via `supabase.auth.signInWithPassword`.
5. Verify:
   - `tester` sees `intro` node.
   - `locked` receives empty list (`[]`).
6. For `useLesson('intro-lesson')` expect embedded node relation.

### 4.3 Contract

Use `supabase gen types typescript --local` and compare hash to committed types.

### 4.4 E2E Smoke

Render:

```tsx
<AppProviders>
  <LessonPage slug="intro-lesson" />
</AppProviders>
```

Assert lesson title visible after fetch.

---

## 5 · Tooling & Conventions

- **Testing Library**: use `renderHook` from `@testing-library/react`.
- **Mock Service Worker (msw)** for network error simulation.
- Keep tests deterministic — wrap async with `await waitFor(…)`.
- Coverage: add to `vitest.config.ts`
  ```ts
  coverage: { 100: true, exclude: ['**/*.d.ts'] }
  ```
- Enforce with CI job `vitest-coverage`.

---

## 6 · Manual Verification Checklist

1. Run `pnpm dev`, open **React Query Devtools**:
   - Confirm keys and stale status timers tick down.
2. Trigger sign‑out:
   - Ensure hooks refetch and data is cleared.
3. Inspect browser **Network tab**:
   - Single request per hook within `staleTime`.

---

## 7 · Exit Criteria & Handoff

- All automated tests pass in CI, coverage badge unchanged or improved.
- Manual checklist items validated locally.
- No **P1/P2** defects open against ticket 2‑4.
- Ready flag set in Jira; ticket 3‑1 may start.

---

## 8 · Estimated Effort

| Activity          | Time       |
| ----------------- | ---------- |
| Unit tests        | 30 min     |
| Integration setup | 20 min     |
| Contract & smoke  | 15 min     |
| CI tweaking       | 10 min     |
| Reporting         | 10 min     |
| **Total**         | **~1.5 h** |

---

**Deliver a bullet‑proof test suite so that downstream feature work begins on rock‑solid foundations.**
