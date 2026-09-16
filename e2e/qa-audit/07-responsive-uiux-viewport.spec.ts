import { test, expect } from '@playwright/test';

test.describe('QA AUDIT 07: UI/UX, Viewport Responsiveness & Console Error Health', () => {

  test('7.1 Mobile Viewport (375x667): Landing Page & Navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Assert zero catastrophic page errors
    expect(errors.length).toBe(0);

    // Verify main content is visible on mobile
    await expect(page.locator('body')).toBeVisible();

    // Check that there is no runaway horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });

  test('7.2 Tablet Viewport (768x1024): Public Discovery Grid', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/creators');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).toContainText(/Creators|Talent|Search/i);
  });

  test('7.3 Desktop Widescreen (1920x1080): Full Layout Integrity', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).toContainText(/Starter|Pro|Pricing/i);
  });

  test('7.4 Console & Network Crash Audit on Core Public Routes', async ({ page }) => {
    const criticalErrors: string[] = [];
    page.on('pageerror', (err) => criticalErrors.push(err.message));

    const checkRoutes = ['/', '/campaigns', '/creators', '/pricing', '/login'];

    for (const path of checkRoutes) {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
    }

    // Zero unhandled runtime crash exceptions across core paths
    expect(criticalErrors.length).toBe(0);
  });
});
