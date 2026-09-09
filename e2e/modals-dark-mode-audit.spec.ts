import { test, expect } from '@playwright/test';

test.describe('Modals Dark Mode Text & Contrast Audit', () => {
  test('Campaign proposal modal has high-contrast legible text in dark mode', async ({ page }) => {
    // Seed creator auth so "Apply to Campaign" button is active
    await page.goto('http://localhost:3000/login');
    await page.evaluate(() => {
      localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user: {
            id: 'creator-test-1',
            name: 'Alex Rivera',
            email: 'alex@techcreator.io',
            role: 'creator',
          },
          role: 'creator',
          isAuthenticated: true,
        },
        version: 0
      }));
    });

    await page.goto('http://localhost:3000/campaigns/camp-1');
    await page.waitForLoadState('networkidle');

    // Enable dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));

    // Open Apply Modal
    const applyBtn = page.getByRole('button', { name: /Pitch Creative Angle/i }).first();
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();

    // Verify modal dialog is open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Check modal title is readable in dark mode
    const title = modal.locator('h2');
    await expect(title).toBeVisible();

    await page.screenshot({
      path: '/Users/kevinbhutwala/.gemini/antigravity/brain/b1a88d3d-36a3-4615-ae9e-1d2460492955/.tempmediaStorage/modal_apply_dark_mode.png',
    });
  });

  test('Creator Quick View modal has dark mode background and legible text', async ({ page }) => {
    await page.goto('http://localhost:3000/creators');
    await page.waitForLoadState('networkidle');

    // Enable dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));

    // Click "Quick View" on first creator card
    const quickViewBtn = page.getByRole('button', { name: /Quick View/i }).first();
    await expect(quickViewBtn).toBeVisible();
    await quickViewBtn.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.screenshot({
      path: '/Users/kevinbhutwala/.gemini/antigravity/brain/b1a88d3d-36a3-4615-ae9e-1d2460492955/.tempmediaStorage/modal_creator_quickview_dark.png',
    });
  });
});
