import { test, expect } from '@playwright/test';

const ADMIN_AUTH = {
  email: 'kevinbhutwala417@gmail.com',
  password: 'admin123',
};

test.describe('QA AUDIT 05: Super Admin Command Center, Dispute Court & Governance', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', ADMIN_AUTH.email);
    await page.fill('input[type="password"]', ADMIN_AUTH.password);
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
  });

  test('5.1 Admin Command Center & Real-time Platform Metrics', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('domcontentloaded');

    // Verify key command center metrics
    await expect(page.locator('body')).toContainText(/Command Center|Platform|Escrow|Volume|Active/i);
    const metricCards = page.locator('div:has-text("Volume"), div:has-text("Escrow"), div:has-text("Campaigns")');
    expect(await metricCards.count()).toBeGreaterThanOrEqual(1);
  });

  test('5.2 Admin Dispute Arbitration Court', async ({ page }) => {
    await page.goto('/admin/disputes');
    await page.waitForLoadState('domcontentloaded');

    // Verify arbitration court interface
    await expect(page.locator('body')).toContainText(/Dispute|Arbitration|Resolution|Court|Case/i);
  });

  test('5.3 Admin Algorithm Weights & Anti-Gaming Controls', async ({ page }) => {
    await page.goto('/admin/settings');
    await page.waitForLoadState('domcontentloaded');

    // Verify algorithm controls
    await expect(page.locator('body')).toContainText(/Algorithm|Weights|Anti-Gaming|Controls|Settings/i);

    // Verify sliders or numerical inputs exist
    const controlInputs = page.locator('input[type="range"], input[type="number"]');
    expect(await controlInputs.count()).toBeGreaterThanOrEqual(1);
  });

  test('5.4 Admin Creator Moderation & Verification Roster', async ({ page }) => {
    await page.goto('/admin/creators');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Creators|Verified|Moderation|Status|Tier/i);
  });

  test('5.5 Admin Financial Reports & Immutable Ledger', async ({ page }) => {
    await page.goto('/admin/reports');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('body')).toContainText(/Reports|Financial|Ledger|Commission|Escrow/i);
  });
});
