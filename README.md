# Paramind LMS v2

A visual, prerequisite-aware learning management system for Australian
paramedicine students.

## 📋 Prerequisites

- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0

## 🚀 Quick Start (60 seconds)

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Setup environment variables**

   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Note**: Sign in with Google requires adding `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` to `.env.local`

3. **Start development server**

   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:5173`

4. **Run tests**

   ```bash
   pnpm test
   ```

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query for server state
- **Database**: Supabase (PostgreSQL + Row-Level Security)
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier
- **Pre-commit**: Lefthook
- **Auth**: Supabase Auth with Google OAuth

## 🔗 Data Hooks

The application uses TanStack Query for server state management with custom
hooks for data fetching:

### `useNodes()`

Fetches all nodes accessible to the current user via Row-Level Security.

```tsx
import { useNodes } from '@/hooks';

function NodesList() {
  const { data: nodes, isLoading, isError } = useNodes();

  if (isLoading) return <div>Loading nodes...</div>;
  if (isError) return <div>Error loading nodes</div>;

  return (
    <ul>
      {nodes?.map((node) => (
        <li key={node.id}>{node.title}</li>
      ))}
    </ul>
  );
}
```

**Features:**

- Automatic caching with 5-minute stale time
- Type-safe with generated Supabase types
- RLS error handling with user-friendly messages
- Dependency injection support for testing

### `useLesson(slug)`

Fetches a lesson by slug with related node data.

```tsx
import { useLesson } from '@/hooks';

function LessonPage({ slug }: { slug: string }) {
  const { data: lesson, isLoading, isError } = useLesson(slug);

  if (isLoading) return <div>Loading lesson...</div>;
  if (isError || !lesson) return <div>Lesson not found</div>;

  return (
    <article>
      <h1>{lesson.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: lesson.content_md }} />
      {lesson.nodes && (
        <aside>
          <h2>Related Node</h2>
          <p>{lesson.nodes.title}</p>
        </aside>
      )}
    </article>
  );
}
```

**Features:**

- Automatic caching with 1-minute stale time
- Includes related node data via JOIN
- Conditional fetching (only when slug is provided)
- Type-safe with `LessonWithNode` type

### Types

```tsx
import type { Node, Lesson, LessonWithNode } from '@/hooks';

// Node type derived from Supabase schema
type Node = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  lesson_id: string | null;
  cluster_slug: string | null;
  created_at: string | null;
  updated_at: string | null;
};

// Lesson type derived from Supabase schema
type Lesson = {
  id: string;
  slug: string;
  title: string;
  content_md: string | null;
  duration_estimate_min: number | null;
  last_updated: string | null;
  created_at: string | null;
  updated_at: string | null;
};

// Lesson with related node data
type LessonWithNode = Lesson & {
  nodes: Node | null;
};
```

### Error Handling

All hooks automatically normalize Supabase errors:

- **RLS Denial (42501)**: Transformed to "Access denied"
- **Other DB Errors**: Use original error message
- **Auth Errors**: Use original error message with fallback
- **Unknown Errors**: Generic "An unexpected error occurred"

## 🎨 Brand Themes

- **Night Study** (default dark theme)
- **Day Study** (light theme)

Brand fonts: Cormorant Garamond (headings) + Inter (body)

### Theme Tokens

Design system uses CSS custom properties for consistent theming:

| Token      | CSS Variable     | Tailwind Class   | Purpose          |
| ---------- | ---------------- | ---------------- | ---------------- |
| Background | `--pm-bg`        | `bg-bg`          | Main background  |
| Surface    | `--pm-surface`   | `bg-surface`     | Card backgrounds |
| Primary    | `--pm-primary`   | `bg-primary`     | Primary brand    |
| Secondary  | `--pm-secondary` | `bg-secondary`   | Secondary brand  |
| Border     | `--pm-border`    | `border-border`  | Border colors    |
| Text High  | `--pm-text-high` | `text-text-high` | High contrast    |
| Text Low   | `--pm-text-low`  | `text-text-low`  | Lower contrast   |

**Theme Switching**: Press `Shift+D` to toggle between Night/Day themes
(temporary shortcut for QA).
