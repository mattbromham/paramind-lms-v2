#### **1 · Mission**

Confirm that the **Paramind LMS** frontend repository delivered by the Coding agent meets every baseline, lint, hook and brand requirement for ticket **1-1** before it can merge to `dev`. The repo must fulfil the stack/quality gates defined in the roadmap and brief, and expose a clean developer UX.

---

#### **2 · Environment to Spin-Up**

| Tool     | Required version | Notes                                                    |
| -------- | ---------------- | -------------------------------------------------------- |
| **Node** | ≥ 20             | Check `package.json → engines`.                          |
| **pnpm** | ≥ 9              | Use `corepack prepare pnpm@latest --activate` if absent. |
| **Git**  | Any recent 2.x   | Needed for Lefthook hook simulation (local commit).      |

---

#### **3 · Clone & Install**

git clone \<REPO_URL\> paramind-lms  
cd paramind-lms  
git switch 1-1-repo-bootstrap \# branch created by Coding agent  
pnpm install \# expect zero warnings

---

#### **4 · Automated Test Battery**

| Step                 | Command                                                                                         | Expected outcome                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Unit tests**       | `pnpm test`                                                                                     | All tests green; Vitest summary shows **≥1 passing**.                                                                                       |
| **Dev server**       | `pnpm dev` then open [http://localhost:5173](http://localhost:5173/)                            | Page renders **“Paramind LMS bootstrap OK”** heading and a **shadcn `Button`**. No console errors. Fonts load: Cormorant Garamond \+ Inter. |
| **Lint**             | `pnpm lint`                                                                                     | ESLint exits **0 errors, 0 warnings** (Tailwind order plugin active).                                                                       |
| **Format check**     | `pnpm format --check` or `prettier --check .`                                                   | All files compliant.                                                                                                                        |
| **Tailwind dry-run** | `pnpm exec tailwindcss --config ./tailwind.config.ts --content "./src/**/*.{ts,tsx}" --dry-run` | No unknown classes. Brand palette tokens (`--pm-*`) present.                                                                                |
| **Pre-commit hook**  | `git add -A && git commit -m "chore: hook test"`                                                | Lefthook runs ESLint → Prettier → Tailwind → Markdownlint and **passes**.                                                                   |

---

#### **5 · Static Repository Review**

1. **File system hygiene** – No leftovers like `App.css`, `logo.svg`, `.github/workflows`.

2. **`tailwind.config.ts`** – has Night & Day token mapping and `@tailwindcss/typography` plugin.

3. **`src/lib/tokens.css`** – contains the colour custom properties exactly matching blueprint hexes.

4. **`shadcn/ui`** – folder exists with at least `button.tsx`; imports resolve via `@/`.

5. **`package.json`** – scripts (`dev`, `build`, `preview`, `test`, `lint`, `format`, `prepare`). No yarn/npm lockfiles.

6. **README** – 60-second setup section.

---

#### **6 · Regression/Edge Checks**

- Change a class in `App.tsx` to an _invalid_ Tailwind token and re-run lint → should fail (proves plugin wired).

- Amend a `*.ts` file with an unused import → ESLint must fail on commit.

- Temporarily delete a required brand token in `tokens.css` → Tailwind dry-run should warn.

---

#### **7 · Deliverables**

Produce a **Markdown test report** titled **“Ticket 1-1 Verification Report”** with:

- **Pass/Fail summary** – one line.

- For each step above: **Status ✔/❌**, log excerpt (first 10 lines if long), and **suggested fix** if failing.

- **Overall verdict** – “Ready to merge” or “Block merge”.

---

#### **8 · Exit Criteria (blockers)**

The branch **must be blocked** if **any** of the following fail:

- Unit tests, lint, or hook chain returns non-zero.

- Missing brand tokens or fonts.

- Unused scaffold artefacts remain.

- README missing or incorrect.

All other observations may be flagged as **minor** and do not block merge.
