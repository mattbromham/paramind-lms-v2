# ✅ **AI BUILD Ticket 2-1 Prompt**

**Scope** | Core DB migrations (`users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges`)  
**Branch** | `feature/2-1-db-migrations` (base = `dev`)  
**Time-box** | ≈ 1 h (road-map estimate)  
**Prereqs** | Tickets 1-1 → 1-3 are merged; Supabase CLI is configured & `pgcrypto` enabled.

---

## 1 · Platform context (why we’re doing this)

Paramind LMS is a desktop-first React + Supabase learning platform that lets paramedicine students grow through a **skill-tree dashboard**, rich markdown lessons and FSRS-powered spaced-repetitionfileciteturn1file3.  
Phase 2 kicks off the data layer: we need the foundational tables that everything else will reference (analytics, SR cards, badges, etc.).

---

## 2 · Deliverables (definition of done)

| #   | Deliverable                                                                                 | Must-have criteria                                                                        |
| --- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1   | **Supabase migration file** at `supabase/migrations/<timestamp>_core_schema.sql`            | ✔ Applies cleanly with `supabase db reset`.<br>✔ Includes **UP** and **DOWN** sections. |
| 2   | **Six tables** exactly named `users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges`. | Schemas match §3.                                                                         |
| 3   | **RLS toggled ON** for every table (leave policies to ticket 2-2).                          | `SELECT`/`INSERT` blocked for anon role.                                                  |
| 4   | **Zero drift**: `supabase db diff` returns empty after migration.                           |                                                                                           |
| 5   | **CI passes** (lint ➜ test ➜ build).                                                        | No new warnings.                                                                          |

---

## 3 · Schema specification

> All primary keys are `uuid DEFAULT gen_random_uuid()`.  
> Use `timestamptz` for temporal fields; `created_at`/`updated_at` default `NOW()` and `updated_at` auto-updates via trigger (add once, reuse).  
> Naming: snake-case, singular table names, all lowercase.

### 3.1 `users`

| column         | type        | constraints                                               |
| -------------- | ----------- | --------------------------------------------------------- |
| `id`           | uuid        | PK                                                        |
| `auth_id`      | uuid        | **UNIQUE**, `REFERENCES auth.users(id) ON DELETE CASCADE` |
| `display_name` | text        | NOT NULL, CHECK (length BETWEEN 3 AND 60)                 |
| `role`         | text        | DEFAULT 'learner', CHECK (IN ('learner','tutor','admin')) |
| `preferences`  | jsonb       | DEFAULT '{}'                                              |
| `created_at`   | timestamptz | DEFAULT NOW()                                             |
| `updated_at`   | timestamptz |                                                           |

### 3.2 `lessons`

| column                    | type        | constraints                                                                               |
| ------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `id`                      | uuid        | PK                                                                                        |
| `slug`                    | text        | **UNIQUE**, NOT NULL, max 60 chars (kebab-case; see API slug policy)fileciteturn1file4 |
| `title`                   | text        | NOT NULL                                                                                  |
| `duration_estimate_min`   | int         | CHECK (>0)                                                                                |
| `content_md`              | text        |                                                                                           |
| `last_updated`            | timestamptz | DEFAULT NOW()                                                                             |
| `created_at` `updated_at` | timestamptz |                                                                                           |

### 3.3 `nodes`

| column                    | type                            | constraints                                                     |
| ------------------------- | ------------------------------- | --------------------------------------------------------------- |
| `id`                      | uuid                            | PK                                                              |
| `slug`                    | text                            | **UNIQUE**, NOT NULL                                            |
| `title`                   | text                            | NOT NULL                                                        |
| `description`             | text                            |                                                                 |
| `lesson_id`               | uuid                            | **UNIQUE**, `REFERENCES lessons(id) ON DELETE CASCADE` (1-to-1) |
| `cluster_slug`            | text                            | NULLABLE (for future cluster visual grouping)                   |
| `created_at` `updated_at` | timestamptz                     |                                                                 |
| **indexes**               | (`cluster_slug`), (`lesson_id`) |

### 3.4 `attempts`

| column                    | type                                   | constraints                                |
| ------------------------- | -------------------------------------- | ------------------------------------------ |
| `id`                      | uuid                                   | PK                                         |
| `user_id`                 | uuid                                   | `REFERENCES users(id) ON DELETE CASCADE`   |
| `lesson_id`               | uuid                                   | `REFERENCES lessons(id) ON DELETE CASCADE` |
| `score`                   | numeric(5,2)                           | CHECK (score BETWEEN 0 AND 1)              |
| `passed`                  | boolean                                | GENERATED ALWAYS AS (score >= 0.80) STORED |
| `completed_at`            | timestamptz                            | DEFAULT NOW()                              |
| `created_at` `updated_at` | timestamptz                            |                                            |
| **indexes**               | (`user_id`,`lesson_id`), (`lesson_id`) |

_(Every attempt is logged; UI will later surface best score onlyfileciteturn1file10)._

### 3.5 `sr_cards`

| column                    | type                              | constraints                              |
| ------------------------- | --------------------------------- | ---------------------------------------- |
| `id`                      | uuid                              | PK                                       |
| `user_id`                 | uuid                              | `REFERENCES users(id) ON DELETE CASCADE` |
| `node_id`                 | uuid                              | `REFERENCES nodes(id) ON DELETE CASCADE` |
| `front` `back`            | text                              | NOT NULL                                 |
| `ease`                    | float4                            | DEFAULT 2.5                              |
| `stability`               | float4                            | DEFAULT 0                                |
| `due_at`                  | timestamptz                       |                                          |
| `suspended`               | boolean                           | DEFAULT FALSE                            |
| `created_at` `updated_at` | timestamptz                       |                                          |
| **indexes**               | (`user_id`,`due_at`), (`node_id`) |

### 3.6 `badges`

| column                    | type        | constraints          |
| ------------------------- | ----------- | -------------------- |
| `id`                      | uuid        | PK                   |
| `slug`                    | text        | **UNIQUE**, NOT NULL |
| `name`                    | text        | NOT NULL             |
| `description`             | text        |                      |
| `icon`                    | text        |                      |
| `created_at` `updated_at` | timestamptz |                      |

---

## 4 · Triggers & helpers

```sql
-- Shared trigger for automatic updated_at
CREATE OR REPLACE FUNCTION _core_timestamps() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;
```

Add `BEFORE UPDATE ON <each_table>` triggers pointing to `_core_timestamps`.

---

## 5 · RLS toggles (no policies yet)

```sql
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;
```

Do this for every new table so ticket 2-2 can add policies.

---

## 6 · Migration skeleton (UP only shown)

```sql
-- Enable extension once (no-op if exists)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;
  -- users
  CREATE TABLE users (...);
  CREATE TRIGGER ...;

  -- lessons
  CREATE TABLE lessons (...);
  CREATE TRIGGER ...;

  -- nodes
  CREATE TABLE nodes (...);
  CREATE TRIGGER ...;

  -- attempts
  CREATE TABLE attempts (...);
  CREATE TRIGGER ...;

  -- sr_cards
  CREATE TABLE sr_cards (...);
  CREATE TRIGGER ...;

  -- badges
  CREATE TABLE badges (...);
  CREATE TRIGGER ...;
COMMIT;
```

Provide corresponding `DROP TABLE ... CASCADE;` in the **DOWN** block (reverse order).

---

## 7 · Implementation steps

1. **Generate migration:**  
   `supabase migration new core_schema`
2. Fill SQL per §3-6 & §4.
3. `supabase db reset && supabase db diff` ➜ should print _No changes detected_.
4. `pnpm test` (Vitest) & `pnpm lint` must stay green.
5. Push PR; CI pipeline already runs Axe/Lighthouse budgets & Playwright smoke.

---

## 8 · Out of scope / explicit non-goals

- **RLS policies** (handled in ticket 2-2).
- Seed data, views, or RPCs.
- Any Prisma/ORM artefacts (project is raw SQL).
- Non-core tables (glossary, user_badges, etc.).

---

## 9 · Reference docs

- Road-map phase 2 descriptionfileciteturn1file1
- Technical brief §8.2 data-model listfileciteturn1file3
- Slug & content rules §8.10 API conventionsfileciteturn1file4
- Attempt logging requirement §3 (Lesson content)fileciteturn1file10

---

### 🚀 **Ship it!**

When all acceptance criteria are met and CI is green, assign ticket 2-1 to **Review** column.
