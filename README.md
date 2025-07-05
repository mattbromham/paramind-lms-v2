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
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier
- **Pre-commit**: Lefthook
- **Auth**: Supabase Auth with Google OAuth

## 🎨 Brand Themes

- **Night Study** (default dark theme)
- **Day Study** (light theme)

Brand fonts: Cormorant Garamond (headings) + Inter (body)
