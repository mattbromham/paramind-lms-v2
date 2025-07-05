---
**Role:** implement roadmap **ticket 1-3 – Auth provider** in the Paramind LMS repo.  
 **Status:** tickets 0-1 → 1-2 are merged to `main`; the codebase already contains:  
 • Vite \+ React 18 \+ TypeScript scaffold with Tailwind & shadcn/ui (ticket 1-1)  
 • Typed Supabase client at `src/lib/supabase.ts` and corresponding env vars (ticket 1-2)  
 **Goal:** wrap the whole app in Supabase’s **`<SessionContextProvider>`** and expose fully-functional **Sign-In / Sign-Out** UX that flips when the session changes.  
 **Definition of Done:** loading the app locally shows “Sign in” when logged out, “Sign out” \+ user email when logged in; clicking each button triggers the correct Supabase auth call and Vitest \+ Playwright checks pass.

---

### **0 · Branch & PR hygiene**

1. `git switch -c feat/auth-provider`.

2. Commit granularity: _one_ commit per checklist bullet below.

3. PR title: **feat(auth): ticket 1-3 – Auth provider**.  
   Link the roadmap ticket & include screen-cap GIF in the PR description.

4. Run Lefthook pre-commit (ESLint, Prettier, Tailwind-lint, Markdown-lint) before every push – CI must stay ✨green✨.

---

### **1 · AuthProvider component**

_File: `src/providers/AuthProvider.tsx`_

import { SessionContextProvider } from '@supabase/auth-helpers-react';  
import { supabase } from '@/lib/supabase';

export default function AuthProvider({ children }: React.PropsWithChildren) {  
 return (  
 \<SessionContextProvider supabaseClient={supabase}\>  
 {children}  
 \</SessionContextProvider\>  
 );  
}

_Notes_

- Re-export `useSession` from `@supabase/auth-helpers-react` in the same file for convenient imports.

- This wrapper is tree-shakable and SSR-safe per Supabase docs.

---

### **2 · Wire the provider**

1. **main.tsx** – replace the current `<App />` mount with:

import AuthProvider from '@/providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')\!).render(  
 \<React.StrictMode\>  
 \<AuthProvider\>  
 \<App /\>  
 \</AuthProvider\>  
 \</React.StrictMode\>,  
);

2. Ensure Vite HMR still works (`pnpm dev`).

---

### **3 · Sign-In / Sign-Out UI**

#### **3.1 Minimal Auth modal**

_File: `src/components/SignInDialog.tsx`_

- Use **shadcn/ui Dialog \+ Button** primitives.

- Inside, embed `<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']} />`.

- Accept both **magic-link email** and **Google OAuth** (matches brief §8.7 _Auth flows_) .

- Close dialog on successful sign-in; show toast “Signed in successfully”.

#### **3.2 Navbar buttons**

_File: `src/components/AuthButton.tsx`_

import { useSession } from '@/providers/AuthProvider';  
import { Button } from '@/components/ui/button';

export default function AuthButton() {  
 const { session } \= useSession();

if (session) {  
 return (  
 \<Button  
 variant="ghost"  
 onClick={() \=\> supabase.auth.signOut()}  
 aria-label="Sign out"  
 \>  
 Sign out  
 \</Button\>  
 );  
 }  
 return (  
 \<Button  
 variant="default"  
 className="bg-pm-primary text-white"  
 onClick={() \=\> setOpen(true)}  
 aria-haspopup="dialog"  
 \>  
 Sign in  
 \</Button\>  
 );  
}

- Styling tokens must use the **primary accent colours** (`--pm-primary`) defined in the brand blueprint – Night `#736BFE`, Day `#2E5F5C` .

- Hook this component into the existing Navbar (placeholder div added in ticket 1-1).

---

### **4 · State indicator (optional but recommended)**

Add a tiny `<span className="text-sm text-pm-text-low ml-2">({session.user.email})</span>` beside “Sign out” for confirmation.

---

### **5 · Testing & QA**

#### **5.1 Unit tests (Vitest)**

- `AuthButton.spec.tsx`
  - Mock `supabase.auth.signOut`.

  - Assert that clicking “Sign out” invokes the mock.

  - Snapshot render for logged-out vs logged-in.

#### **5.2 Integration test (Playwright)**

- `auth-flow.spec.ts`
  - Stub Supabase OAuth popup (use `page.route` to intercept).

  - Flow: click “Sign in” → dialog opens → click Google button → assert navbar shows “Sign out”.

#### **5.3 Accessibility check**

- Axe: no critical issues after UI appears (CI already runs Axe, ticket 1-4 will formalise) .

---

### **6 · Docs & DX**

- Update `README.md` quick-start with **“Sign in with Google requires adding `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`”**.

- Add a short “AuthProvider” blurb to Storybook if it exists (optional).

---

### **7 · Acceptance checklist (must all be ✅)**

- App boots with no console warnings.

- Sign-in dialog opens and authenticates via email or Google OAuth.

- Navbar button swaps between “Sign in” and “Sign out” instantly (reacts to `onAuthStateChange`).

- Clicking “Sign out” clears the session and returns to logged-out state.

- Vitest, ESLint, Prettier, and Playwright all pass locally and in CI.

- Axe scan reports **0 critical** and **≤ 5 serious** violations (roadmap AA budget).

- PR reviewed & merged into `dev` in ≤ 1 h agent timebox.

---

### **8 · Out-of-scope / guard-rails**

- **Do not** create protected routes yet – gating starts when Phase 2 hooks land.

- **No** styling overrides beyond brand token use.

- **Do not** touch Supabase RLS or DB schema – that’s ticket 2-1.

---

_Timebox:_ **1 agent-hour** as per roadmap estimate .

Good luck – ship it\! 🚀
