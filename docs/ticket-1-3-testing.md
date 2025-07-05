---

**COPY-PASTE PROMPT FOR AI TESTING AGENT**

**Role:** act as the dedicated **TESTING agent** for Paramind LMS.  
 **Scope:** *verify that roadmap **ticket 1-3 – Auth provider*** is fully, correctly and safely implemented on branch **`feat/auth-provider`** before we advance to ticket 1-4.  
 **Context:** tickets 1-1 and 1-2 are already merged into `main`; branch under test adds Supabase `<SessionContextProvider>`, Sign-In/Sign-Out UI and all related code. Ticket definition & acceptance line-item are in the roadmap .

---

### **0 · Environment & Setup**

1. **Check out** `feat/auth-provider` and run `pnpm install`.

2. Copy `.env.local.example` ➜ `.env.local`; insert Supabase **staging** project creds (URL \+ anon key) that point at the redacted QA project.

3. Start local dev (`pnpm dev`) and confirm Vite console shows **no** errors or Tailwind warnings.

**Browser matrix:** Chrome 114 (Linux, macOS, Windows), Firefox ESR, WebKit (via Playwright) as per testing matrix .

---

### **1 · Automated Test Battery**

#### **1.1 Unit \+ Component (Vitest)**

- Run `pnpm test --coverage`.

- Ensure new tests for `AuthButton`, `SignInDialog` render both logged-in and logged-out states and mock `supabase.auth` calls.

- **Coverage ≥ 70 % lines** per CI policy ; fail build if below target.

#### **1.2 E2E (Sign-in flow, Playwright)**

| Step                                               | Expected                                                 |
| -------------------------------------------------- | -------------------------------------------------------- |
| Launch `/` while **unauth**                        | “Sign in” button visible                                 |
| Click “Sign in” → dialog                           | Supabase Auth component renders email \+ Google options  |
| Submit magic-link email (use `test+e2e@nomail.io`) | Dialog closes; navbar flips to “Sign out (test+e2e@...)” |
| Reload page                                        | Session persists; still logged-in                        |
| Click “Sign out”                                   | Session clears; “Sign in” returns                        |

Stub external OAuth popup with `page.route('https://*.google.com/*', route => route.fulfill({status: 200, body: '{}'}))` to keep tests headless/offline.

#### **1.3 Accessibility (Axe)**

- Run `pnpm axe-ci` (already wired in GitHub Action from ticket 1-1).

- Assert **0 critical / ≤ 5 serious** violations – global target .

- Specifically verify colour contrast of primary CTA against brand palette (`--pm-primary`) tokens .

#### **1.4 Visual Regression (Chromatic)**

- Execute `pnpm chromatic --exit-once-uploaded`.

- Review new snapshots (`AuthButton`, `SignInDialog`, navbar variants).

- Mark diffs as expected _only_ if brand colours, radii and type scale match blueprint spec .

#### **1.5 Performance /Lighthouse (smoke)**

- Run `pnpm lhci autorun --collect.numberOfRuns=3 --url=http://localhost:5173/` **logged-out**.

- Check that new bundle keeps **FCP ≤ 1.8 s** and **TTI ≤ 2.5 s** (budget table) .

---

### **2 · Manual QA Checklist**

| Area                | Verification                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Theme toggle**    | In dev-tools simulate `prefers-color-scheme: dark` & light; buttons adopt correct palette tokens (`#736BFE / #2E5F5C`). |
| **Keyboard & ARIA** | Tab focus order: “Sign in” → dialog traps focus until closed; ESC closes; screen-reader announces dialog title.         |
| **Cookie security** | After login inspect `supabase-auth-token`; flags `Secure + SameSite=Strict + HttpOnly` per brief .                      |
| **Rate-limit UX**   | Simulate 429 via `supabase.auth.signOut()` stub reject \-\> toast shows “Too many actions” cooldown (spec) .            |
| **Responsive**      | Shrink viewport to 600 px; auth dialog remains usable (scrollable body if needed) .                                     |
| **Brand**           | Button radius \= `rounded-lg` (\~20 px), font sizes obey fluid scale, Lucide icon stroke \= 1.5 px .                    |

---

### **3 · Regression Sweeps**

1. **Smoke-navigate** to all existing routes (`/review`, `/settings`, etc.); ensure no 404/console errors (tickets 3-x stubs) .

2. Run Jest snapshot on existing components to ensure the provider wrapper hasn’t changed output unintentionally.

---

### **4 · CI Gate & Reporting**

- Push a commit **only with test/QA resources** (`*.spec.tsx`, Playwright scripts, Chromatic stories) to branch `feat/auth-provider-tests`.

- Confirm GitHub Action pipeline `lint → test → build → Axe dummy page` passes unchanged (ticket 1-4 will extend Axe run) .

- Create PR **“test(auth): coverage for ticket 1-3”** targeting `feat/auth-provider`.

- Attach:
  - Vitest coverage HTML artefact

  - Playwright video or HAR for sign-in flow

  - Axe JSON report

  - Lighthouse-CI summary HTML

- Comment any **blocking defects** with inline suggestions; label PR `needs-fix` until all resolved.

---

### **5 · Exit / Definition-of-Done**

All below must be **✅** before ticket 1-3 is accepted:

- Unit, e2e, Axe, Lighthouse, Chromatic **all green**.

- Coverage ≥ 70 %.

- No regression on build size or performance budgets.

- Cross-browser smoke OK.

- Manual checklist passed & evidence attached.

- Branch approved & merged to `dev`.

---

### **6 · Out-of-Scope (do not test)**

- Protected routes/gating (will arrive with Phase 2 RLS).

- Any DB schema/RLS workshops.

- Full keyboard-audit script (that is ticket 9-2).

- Lighthouse PWA audits.

---

_Good luck—keep the build green and the pixels perfect\!_
