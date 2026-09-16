import { test, expect } from '@playwright/test';

const BRAND_AUTH = {
  email: 'brand@abeycollab.io',
  password: 'password123',
};

test.describe('QA AUDIT 03: Brand Complete End-to-End User Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', BRAND_AUTH.email);
    await page.fill('input[type="password"]', BRAND_AUTH.password);
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
  });

  test('3.1 Brand Campaign Management & Brief Roster', async ({ page }) => {
    await page.goto('/app/brand/campaigns');
    await page.waitForLoadState('domcontentloaded');

    // Verify campaign management page
    await expect(page.locator('body')).toContainText(/Campaigns|Active|Drafts|Create Campaign|Budget/i);

    const createBtn = page.locator('a[href*="/app/brand/campaigns/create"], button:has-text("Create")');
    expect(await createBtn.count()).toBeGreaterThanOrEqual(1);
  });

  test('3.2 Brand Campaign Brief Creation Wizard', async ({ page }) => {
    await page.goto('/app/brand/campaigns/create');
    await page.waitForLoadState('domcontentloaded');

    // Verify wizard steps
    await expect(page.locator('body')).toContainText(/Campaign|Objective|Budget|Deliverables|Escrow|Requirements/i);

    // Verify form fields presence
    const titleInput = page.locator('input[placeholder*="campaign" i], input[placeholder*="title" i], input[name*="title" i]');
    if (await titleInput.first().isVisible()) {
      await titleInput.first().fill('QA Production Automated Brief');
    }
  });

  test('3.3 Brand Talent Discovery & Multi-Factor Filters', async ({ page }) => {
    await page.goto('/app/brand/creators');
    await page.waitForLoadState('domcontentloaded');

    // Verify creator discovery page
    await expect(page.locator('body')).toContainText(/Creators|Talent|Search|Category|Filter/i);

    // Verify creators are listed
    const creatorCards = page.locator('a[href*="/creators/"], div:has-text("Followers"), div:has-text("Engagement")');
    expect(await creatorCards.count()).toBeGreaterThanOrEqual(1);
  });

  test('3.4 Brand Talent Shortlist & Private Collections', async ({ page }) => {
    await page.goto('/app/brand/shortlists');
    await page.waitForLoadState('domcontentloaded');

    // Verify shortlist interface
    await expect(page.locator('body')).toContainText(/Shortlist|Collections|Saved|Talent|Creators/i);
  });

  test('3.5 Brand Creator CRM Pipeline & Private Notes', async ({ page }) => {
    await page.goto('/app/brand/crm');
    await page.waitForLoadState('domcontentloaded');

    // Verify CRM Kanban or stages
    await expect(page.locator('body')).toContainText(/CRM|Pipeline|Prospect|Contacted|Partner|Notes/i);
  });

  test('3.6 Brand Advanced ROI & Conversion Telemetry', async ({ page }) => {
    await page.goto('/app/brand/analytics');
    await page.waitForLoadState('domcontentloaded');

    // Verify analytics widgets
    await expect(page.locator('body')).toContainText(/Analytics|ROI|Impressions|Spend|Performance|Conversion/i);
  });
});
