import { test, expect } from '@playwright/test';

test.describe('Navigation Visibility', () => {
  test('hamburger menu visibility on desktop vs mobile', async ({ page }) => {
    await page.goto('/');

    // Desktop viewport - hamburger should be hidden
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.locator('button[aria-label="Open menu"]')).toBeHidden();

    // Mobile viewport - hamburger should be visible
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();
  });

  test('no hamburger on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    // Only ThemeToggle & avatar icons expected
    await expect(page.locator('button[aria-label="Open menu"]')).toHaveCount(0);
  });

  test('links have gap', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const dashboard = page.locator('nav a[href="/"]');
    const reviews = page.locator('nav a[href="/review"]');
    
    // Wait for elements to be visible
    await expect(dashboard).toBeVisible();
    await expect(reviews).toBeVisible();
    
    const dashBox = await dashboard.boundingBox();
    const revBox = await reviews.boundingBox();
    
    // Ensure bounding boxes are not null
    expect(dashBox).not.toBeNull();
    expect(revBox).not.toBeNull();
    
    if (dashBox && revBox) {
      expect(revBox.x - dashBox.x - dashBox.width).toBeGreaterThanOrEqual(8); // ≥8px gap
    }
  });

  test('desktop navigation links visibility', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    // Desktop navigation should be visible
    await expect(page.locator('nav a[href="/"]')).toBeVisible();
    await expect(page.locator('nav a[href="/review"]')).toBeVisible();
    await expect(page.locator('a[href="/ask"]')).toBeVisible();
  });

  test('mobile navigation links hidden', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    // Desktop navigation should be hidden on mobile
    await expect(page.locator('nav a[href="/"]')).toBeHidden();
    await expect(page.locator('nav a[href="/review"]')).toBeHidden();
    
    // Mobile menu button should be visible
    await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();
  });
}); 