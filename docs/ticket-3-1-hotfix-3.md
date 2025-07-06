
# 🛠️ BUILD‑Agent Prompt — **Hot‑Fix 3‑1‑3**  
> **Paramind LMS** · Phase 3 · _Final navigation polish_  
> Objective: **Correct navbar spacing & remove stray desktop hamburger** so Ticket 3‑1 can finally be closed.

---

## 📸 Current Symptoms (see attached screenshot)

1. **Compressed link text** — “DashboardReviews” shows no gap; dot bullet appears between logo and links.  
2. **Stray hamburger / monitor icons** still visible on desktop, even after 3‑1‑2. Creates clutter & fails spec.

These are cosmetic but highly visible; fixing now prevents endless churn.

---

## 🔍 Root Causes To Address

| ID | Cause | Source |
|----|-------|--------|
| **NAV‑GAP** | `<ul>` default `list-style: disc` adds bullet & links lack `gap-*` classes | `Navbar.tsx` |
| **HAM‑DESK** | Extra mobile‑menu button rendered OR `lg:hidden` mis‑applied | `Navbar.tsx`, possibly `MobileMenu.tsx` |

---

## 🔧 Implementation Tasks

### 1 · Tidy Links Container

*File: `src/components/Navbar/Navbar.tsx`*

```diff
- <ul className="flex">
+ <ul
+   className="flex items-center gap-4 lg:gap-6 list-none p-0 m-0"
+ >
```

* This simultaneously:  
  * removes bullet (`list-none`)  
  * adds horizontal spacing (`gap‑4` desktop; smaller if desired)  

### 2 · Ensure Ask‑Tutor Button Alignment

```diff
- <Button ... className="...">
+ <Button ... className="ml-6 lg:ml-8">
```

*(Or wrap links + button in `flex items-center gap-6` and drop manual margin.)*

### 3 · Remove / Hide Extra Hamburger

1. **Check render logic**: only _one_ `Menu` icon should exist **inside** a container with `lg:hidden`.  
2. Wrap that button container:

```tsx
<div className="flex items-center gap-2 lg:hidden">
  {/* ThemeToggle + mobile menu trigger */}
</div>
```

3. Delete any duplicate `<button aria-label="Open menu">` outside that wrapper.

### 4 · Strengthen Playwright Assertions

*File: `e2e/navigation.spec.ts`*

```ts
test('no hamburger on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  // Only ThemeToggle & avatar icons expected
  await expect(page.locator('button[aria-label="Open menu"]')).toHaveCount(0);
});

test('links have gap', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const dashboard = page.locator('nav', { hasText: 'Dashboard' }).locator('text=Dashboard');
  const reviews   = page.locator('nav', { hasText: 'Reviews' }).locator('text=Reviews');
  const dashBox   = await dashboard.boundingBox();
  const revBox    = await reviews.boundingBox();
  expect(revBox.x - dashBox.x - dashBox.width).toBeGreaterThanOrEqual(8); // ≥8px gap
});
```

### 5 · Unit Test Adjustment

Add assertion that links container has `gap-4` class:

```ts
expect(screen.getByRole('navigation')).toHaveClass(/gap-4/);
```

### 6 · Run & Verify

```bash
pnpm lint
pnpm test        # Vitest
pnpm playwright test
pnpm build
```

Manual sanity:

* 1280 px: links spaced, bullet gone, **no hamburger**  
* 375 px: hamburger visible, desktop links hidden.

---

## ✅ Acceptance Criteria

1. Navbar shows “Dashboard” and “Reviews” separated by ≥ 8 px; no leading bullet.  
2. No hamburger icon on desktop viewport (≥ 1024 px).  
3. Hamburger appears & works on mobile (< 1024 px).  
4. Updated unit + Playwright tests pass in CI.  
5. No design‑token violations; Lighthouse & Axe unchanged.

---

## ⏱ Estimate

| Task | Time |
|------|------|
| CSS tweaks | 3 m |
| Remove duplicate hamburger | 3 m |
| Test updates | 7 m |
| CI & PR | 5 m |

_Total: **~18 minutes**._

---

“**One last polish – ship it and let Ticket 3‑2 begin.**”
