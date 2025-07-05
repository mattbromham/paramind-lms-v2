---

**COPY-PASTE PROMPT FOR AI BUILD AGENT**

**Ticket ID:** **1-3a – Design-Token Hardening**  
 **Context:** tickets 1-1 → 1-3 are merged (**Auth flow now works**). Before the UI grows, we must lock-in the brand design tokens so every subsequent component “speaks the same language.”  
 **Up-next dependency:** ticket 1-4 (CI baseline) will wire Axe/Chromatic/Lighthouse; it must inherit these tokens.

---

### **0 · Branch & PR hygiene**

1. `git switch -c feat/design-tokens`.

2. One commit per checklist bullet (section 1-4 below).

3. PR title **feat(style): ticket 1-3a – brand token hardening**; attach screenshot of both themes.

4. Lefthook pre-commit must stay green (ESLint, Prettier, Tailwind-lint, Markdown-lint).

---

### **1 · Declare CSS variables**

*File: `src/styles/tokens.css` (imported in `main.tsx`)*

/\* Night Study – default \*/  
:root {  
  \--pm-bg:        14 15 23;  
  \--pm-surface:   27 29 41;  
  \--pm-primary:  115 107 254;   /\* \#736BFE \*/  
  \--pm-secondary: 255 182 110;  
  \--pm-border:    255 255 255 / .08;  
  \--pm-text-high: 255 255 255 / .95;  
  \--pm-text-low:  255 255 255 / .68;  
}

/\* Day Study theme toggle \*/  
\[data-theme='day'\] {  
  \--pm-bg:        245 247 249;  
  \--pm-surface:   255 255 255;  
  \--pm-primary:   46  95  92;   /\* \#2E5F5C \*/  
  \--pm-secondary:  75  79 116;  
  \--pm-border:     229 231 235;  
  \--pm-text-high:  17  24  39;  
  \--pm-text-low:   55  65  81;  
}

RGB values come directly from the **starter palette** in the Brand-seed blueprint .

---

### **2 · Extend Tailwind config**

*File: `tailwind.config.ts`*

import type { Config } from 'tailwindcss';

const withOpacity \=  
  (variable: string) \=\>  
  ({ opacityValue }: { opacityValue?: string }) \=\>  
    opacityValue \!== undefined  
      ? \`rgb(var(${variable}) / ${opacityValue})\`  
      : \`rgb(var(${variable}))\`;

export default {  
  content: \['./index.html', './src/\*\*/\*.{ts,tsx,mdx}'\],  
  theme: {  
    extend: {  
      colors: {  
        bg:        withOpacity('--pm-bg'),  
        surface:   withOpacity('--pm-surface'),  
        primary:   withOpacity('--pm-primary'),  
        secondary: withOpacity('--pm-secondary'),  
        border:    withOpacity('--pm-border'),  
        text: {  
          high: withOpacity('--pm-text-high'),  
          low:  withOpacity('--pm-text-low'),  
        },  
      },  
      borderRadius: { card: '20px' },           // matches 20 px radius spec :contentReference\[oaicite:6\]{index=6}  
      boxShadow: { card: '0 6px 24px rgba(0,0,0,.12)' },  
      fontFamily: {  
        display: \['Cormorant Garamond', 'serif'\],  
        body:    \['Inter', 'ui-sans-serif', 'system-ui'\],  
      },  
    },  
  },  
  plugins: \[\],  
} satisfies Config;

---

### **3 · Map to shadcn/ui variant helpers**

*File: `src/lib/theme.ts`*

export const buttonVariants \= {  
  primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary',  
  ghost:   'text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary',  
};

All future shadcn components must consume `buttonVariants`.

---

### **4 · Lint & CI guardrails**

1. **Add `stylelint-config-standard` \+ `stylelint-plugin-design-tokens`.**  
    *Rule:* `design-tokens/tokens { preset: "./src/styles/tokens.css" }` so only the tokens above pass lint .

2. Script `"lint:css": "stylelint \"src/**/*.{css,tsx}\""`; hook it into Lefthook \+ CI.

---

### **5 · Minimal dark/day toggle utility (for QA only)**

Add React hook `useTheme()` that toggles `data-theme="day"` on `<html>`; expose with a temporary keyboard shortcut `Shift+D` so testers can flip themes until the proper Preferences page (ticket 3-4).

---

### **6 · Storybook \+ Chromatic baseline**

1. If Storybook already exists from ticket 1-1, create **“Design Tokens”** page that shows:

   * Background swatches

   * Primary vs secondary buttons

   * Card surface with text‐high / text-low samples

2. Publish to Chromatic so future visual regression picks up the palette (PR quality-gate plan) .

---

### **7 · Tests**

*Vitest* – `tokens.spec.ts`

import config from '../../tailwind.config';  
import resolveConfig from 'tailwindcss/resolveConfig';

it('exposes primary colour', () \=\> {  
  const full \= resolveConfig(config);  
  expect(full.theme.colors.primary.DEFAULT).toBeDefined();  
});

---

### **8 · Docs**

*README.md* – add **“Theme tokens”** section with a table linking token → CSS variable → Tailwind alias.

---

### **9 · Definition-of-Done (all must be ✅)**

* `pnpm dev` shows identical UI but colours compile from CSS vars (check DevTools).

* `Shift+D` toggles day/night; Auth button swaps from `#736BFE` to `#2E5F5C`.

* `pnpm lint:css` passes (no hard-coded hex).

* Unit test above passes; overall Jest line-coverage still ≥ 70 %.

* Storybook “Design Tokens” page visible; Chromatic snapshot uploaded.

* Axe run shows **0 contrast violations** on both themes.

* PR merged into `dev` within the 45 min time-box.

---

### **10 · Out-of-scope**

* No bespoke component redesigns yet (that’s Phase 9 polish).

* No automatic OS-pref theme sync (Preferences page will own that).

* No removal of placeholder styles outside palette/linkage work.
