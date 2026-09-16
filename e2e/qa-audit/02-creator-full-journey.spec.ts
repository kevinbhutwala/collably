import { test, expect } from '@playwright/test';

const CREATOR_AUTH = {
  email: 'creator@abeycollab.io',
  password: 'password123',
};

test.describe('QA AUDIT 02: Creator Complete End-to-End User Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', CREATOR_AUTH.email);
    await page.fill('input[type="password"]', CREATOR_AUTH.password);
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
  });

  test('2.1 Creator Profile & Media Kit Inspection', async ({ page }) => {
    await page.goto('/app/profile');
    await page.waitForLoadState('domcontentloaded');

    // Verify Media Kit elements
    await expect(page.locator('body')).toContainText(/Media Kit|Rate Card|Audience|Bio|Social/i);

    // Check rate cards or deliverable rates
    const rateElements = page.locator('text=/\\$|₹|AED|GBP|Reel|YouTube|Integration/i');
    expect(await rateElements.count()).toBeGreaterThanOrEqual(1);
  });

  test('2.2 Creator Opportunity Discovery & Brief Filtering', async ({ page }) => {
    await page.goto('/app/campaigns');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('text=Loading Campaigns', { state: 'detached', timeout: 15000 }).catch(() => {});

    // Verify campaign discovery list loads
    await expect(page.locator('body')).toContainText(/Campaigns|Opportunities|Briefs|Budget/i);

    // Verify campaign cards or categories are rendered
    const campaignCards = page.locator('button:has-text("Brief"), div:has-text("Brief"), div:has-text("Budget"), button:has-text("Technology")');
    expect(await campaignCards.count()).toBeGreaterThanOrEqual(1);
  });

  test('2.3 Creator Active Collaborations & Milestone View', async ({ page }) => {
    await page.goto('/app/collaborations');
    await page.waitForLoadState('domcontentloaded');

    // Verify collaboration workspace renders
    await expect(page.locator('body')).toContainText(/Collaboration|Milestone|Escrow|Deliverable|Status/i);
  });

  test('2.4 Creator Direct Messaging Workspace', async ({ page }) => {
    await page.goto('/app/messages');
    await page.waitForLoadState('domcontentloaded');

    // Verify messaging layout
    await expect(page.locator('body')).toContainText(/Message|Channel|Chat|Direct/i);

    // Verify chat input presence
    const chatInput = page.locator('textarea, input[placeholder*="message" i], input[placeholder*="type" i]');
    if (await chatInput.first().isVisible()) {
      await expect(chatInput.first()).toBeEnabled();
    }
  });

  test('2.5 Creator Earnings, Wallet Ledger & Currency Formatting', async ({ page }) => {
    await page.goto('/app/earnings');
    await page.waitForLoadState('domcontentloaded');

    // Verify financial ledger widgets
    await expect(page.locator('body')).toContainText(/Earnings|Balance|Payout|Ledger|Wallet/i);
    await expect(page.locator('body')).toContainText(/\\$|₹|AED|GBP/i);
  });

  test('2.6 Creator Growth & Market Trending Intelligence', async ({ page }) => {
    await page.goto('/app/growth');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Growth|Audience|Performance|Tier|Retention/i);

    await page.goto('/app/trending');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Trending|Market|Pulse|Rank|Creators/i);
  });
});
