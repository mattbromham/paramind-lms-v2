#### **1 · Objective**

Resolve every blocker called out in the **“Ticket 1-1 Verification Report”** so the branch is green on lint, format, hooks, and branding requirements, ready for the next ticket.

---

#### **2 · Issues to Fix**

| \#  | Problem (from report)                                                                                | Resolution Path                                                                                                                                                                                                                   |
| --- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **ESLint error:** `react-refresh/only-export-components` triggered in `src/components/ui/button.tsx` | Move `buttonVariants` (and any non-component exports) to `src/components/ui/button-variants.ts` and import back. Lint must run with **\--max-warnings 0**.                                                                        |
| 2   | **Prettier format failures** in docs                                                                 | Run `pnpm format` across repo; commit the changes. Consider adding `docs/**` to `lefthook` format stage if missing.                                                                                                               |
| 3   | **Tailwind plugin missing:** `@tailwindcss/typography` not present in `tailwind.config.ts → plugins` | `pnpm add -D @tailwindcss/typography` (already installed? verify) and push the plugin into the `plugins` array. Re-run build.                                                                                                     |
| 4   | **eslint-plugin-tailwindcss not active** → invalid classes undetected                                | Ensure plugin is installed **and** `.eslintrc.cjs` contains `plugins: ['tailwindcss']` and extends `'plugin:tailwindcss/recommended'`. Add rule `tailwindcss/no-custom-classname: 'error'`. Re-run invalid-class regression test. |
| 5   | **Tailwind CLI inaccessible** in Lefthook dry-run                                                    | Replace hook cmd with `pnpm exec tailwindcss --config ./tailwind.config.ts --content "./src/**/*.{ts,tsx}" --dry-run`. Verify exit code 0\.                                                                                       |
| 6   | **Branch naming mismatch** (QA could not find `1-1-repo-bootstrap`)                                  | Create/push the branch **`1-1-repo-bootstrap`** (or retarget PR) so future testing scripts point correctly.                                                                                                                       |
| 7   | **Documentation formatting**                                                                         | After running Prettier, ensure any Markdown lints pass (`markdownlint-cli` in hook).                                                                                                                                              |

---

#### **3 · Step-by-Step Tasks**

**Sync branch**

git checkout \-b 1-1-repo-bootstrap || git switch 1-1-repo-bootstrap  
git merge main

1.
2. **Refactor shadcn button**
   - Create `src/components/ui/button-variants.ts` exporting `buttonVariants`.

   - Update `button.tsx` to import it and **only** export React components.

**Update Tailwind config**

// tailwind.config.ts  
import typography from '@tailwindcss/typography';  
export default {  
 plugins: \[typography, /\* existing plugins \*/\],  
};

3.
4. **Hard-enforce Tailwind CSS linting**
   - Install plugin if absent: `pnpm add -D eslint-plugin-tailwindcss`.

Amend `.eslintrc.cjs`:

extends: \[  
 'plugin:tailwindcss/recommended',  
 // other configs…  
\],  
plugins: \['tailwindcss'\],  
rules: {  
 'tailwindcss/no-custom-classname': 'error',  
 // keep classnames-order if used  
},

-
- Re-run `pnpm lint` – must output **0 errors, 0 warnings**.

**Repair Lefthook** (`.lefthook.yml`):

pre-commit:  
 commands:  
 tailwind:  
 run: pnpm exec tailwindcss \--config ./tailwind.config.ts \--content "./src/\*\*/\*.{ts,tsx}" \--dry-run

5.

**Format everything**

pnpm format  
git add \-A  
git commit \-m "chore: format repo"

6.

**Verify full pipeline locally**

pnpm lint && pnpm test && pnpm exec tailwindcss \--dry-run && git add \-A && git commit \-m "chore: hook pass test"

7.

**Push fixes & update PR**

git push \-u origin 1-1-repo-bootstrap

8.

---

#### **4 · Acceptance Checklist**

- **Branch `1-1-repo-bootstrap` exists** and PR updated.

- `pnpm lint` exits **0** issues (no warnings).

- `pnpm format --check` passes.

- `tailwind.config.ts` lists `@tailwindcss/typography`.

- ESLint flags **invalid Tailwind classes** if inserted.

- `git commit` triggers Lefthook and all stages pass.

- Verification agent re-runs report and marks **Overall Status: ✅ READY TO MERGE**.

---

#### **5 · Hints & Best Practices**

- Keep **one logical commit per fix** (`fix:` or `chore:` types).

- After refactor, regenerate shadcn UI index (`pnpm dlx shadcn-ui@latest link`).

- If Tailwind CLI still fails inside hook on some shells, prepend `NODE_OPTIONS=--no-warnings`.

- Ensure CI still omitted (ticket 1-4).
