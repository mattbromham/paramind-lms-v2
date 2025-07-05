### **Brand-seed blueprint**

Below is a **starter “visual language kit”**.

---

## **1 · Word-mark**

| Part | Font family suggestion\* | Sample look | Notes |
| ----- | ----- | ----- | ----- |
| **paramind** | `Cormorant Garamond` – Semibold | *paramind* | High-contrast, scholarly serif → signals academic authority. |
| **LMS** | `Inter` – ExtraBold, letter-spaced 0.05 em | **L M S** | Clean geometric sans echoes modern software. |
| \*Both have open-source licenses (OFL / SIL) → hassle-free. |  |  |  |

**Treatment**

* Lower-case “paramind” followed by thin 18 px pipe (`|`) then “LMS”.

* Default lock-up is horizontal; stacked variant for favicon/square.

* Colour: use primary accent (see palette) in dark mode, neutral 900 in light.

---

## **2 · Visual language distilled from the references**

| Axis | Common thread in images | Paramind LMS take |
| ----- | ----- | ----- |
| **Mood** | Calm but high-contrast hero spaces, subtle grain/noise over gradients, occasional photographic backdrop. | Hero & auth screens get gradient cards with 6 % noise overlay; core app stays clean white/grey to keep focus on content. |
| **Colour** | Predominantly deep indigo / emerald on near-black (Oxide, EtherSight) **or** muted sage/light neutrals (Adaline, Momentum). | Dual theme: “Night Study” (default) & “Day Study”. Night → deep indigo \+ violet accent. Day → warm off-white paper \+ eucalyptus accent. |
| **Type** | Oversized headlines with generous leading (Oxide, Adaline). Small UAV body copy. | Use `clamp()`\-based fluid scale: h1 36 → 60 px, body 15 → 18 px. |
| **Cards / Surfaces** | Soft 24 px radii, heavy 32 px inner padding, glassy translucency (first image). | Uni card pattern: 20 px radius, 2 px border (rgba white 8 % dark / grey-200 light). |
| **Iconography** | Thin-stroke mono icons. | Lucide 1.5 px stroke, rounded caps; 18 px default size. |
| **Depth** | Tiny drop-shadows \+ subtle layer blur, rarely hard shadows. | `box-shadow: 0 6px 24px rgba(0,0,0,.12)` darkened for night. |

---

## **3 · Starter palette (night & day)**

| Token | Night (hex) | Day (hex) | Usage |
| ----- | ----- | ----- | ----- |
| `--pm-bg` | `#0E0F17` | `#F5F7F9` | App scaffold |
| `--pm-surface` | `#1B1D29` | `#FFFFFF` | Cards, modals |
| `--pm-primary` | `#736BFE` | `#2E5F5C` | CTAs, focus |
| `--pm-secondary` | `#FFB66E` | `#4B4F74` | Badges, sparing highlights |
| `--pm-border` | `#FFFFFF14` | `#E5E7EB` | Dividers |
| `--pm-text-high` | `#FFFFFFF2` | `#111827` | Headlines |
| `--pm-text-low` | `#FFFFFFAD` | `#374151` | Body / labels |

---

## **4 · PR quality gate plan**

| Gate | Tool | Rule |
| ----- | ----- | ----- |
| Colour lint | `stylelint-plugin-design-tokens` | Only variables from `tokens.ts` allowed. |
| Visual regression | Chromatic snapshot | Changed components need a reviewer tick. |
| Accessibility | Axe CI | New pages must score AA contrast. |


