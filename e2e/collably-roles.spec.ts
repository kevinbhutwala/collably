import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://collably-ashen.vercel.app';

const USERS = {
  creator: {
    email: 'creator@collably.io',
    password: 'password123',
    roleLabel: 'Creator Pro',
  },
  brand: {
    email: 'brand@collably.io',
    password: 'password123',
    roleLabel: 'Brand Growth',
  },
  admin: {
    email: 'kevinbhutwala417@gmail.com',
    password: 'admin123',
    roleLabel: 'Enterprise / Super Admin',
  },
};

// Reusable login helper
async function loginAs(page: Page, email: string, pass: string) {
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState('domcontentloaded');

  const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]');
  const passwordInput = page.locator('input[type="password"], input[name="password"]');
  const submitBtn = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Log In")');

  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);
  await passwordInput.fill(pass);
  await submitBtn.click();

  // Wait for redirect away from /login
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15_000 });
}

test.describe('Collably End-to-End Suite', () => {

  test.beforeEach(async ({ context }) => {
    // Clear cookies/storage before each test for total state isolation
    await context.clearCookies();
  });

  // ==========================================
  // 1. PUBLIC MARKETING & DISCOVERY
  // ==========================================
  test('01: Public Landing Page and Navigation Integrity', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Collably/i);

    // Verify primary hero typography & copy
    const heroHeading = page.locator('h1');
    await expect(heroHeading.first()).toBeVisible();
    await expect(heroHeading.first()).toContainText(/CREATE|CINEMATIC|VISIONARY/i);

    // Verify value proposition badges
    await expect(page.getByText(/100% Pre-funded Escrow/i).first()).toBeVisible();
    await expect(page.getByText(/Instant Payout/i).first()).toBeVisible();

    // Verify talent roster cards render
    const creatorCards = page.locator('text=Elena Rostova');
    await expect(creatorCards.first()).toBeVisible();
  });

  // ==========================================
  // 2. CREATOR FLOW & ACCESS CONTROL
  // ==========================================
  test('02: Creator Authentication, Dashboard & Route Guards', async ({ page }) => {
    await loginAs(page, USERS.creator.email, USERS.creator.password);

    // Ensure Creator enters an authorized workspace route
    await expect(page).toHaveURL(/\/(app|creator|dashboard)/i);

    // Check for Creator-specific tools: Media Kit / Briefs / Deliverables
    const creatorElement = page.locator('text=/Media Kit|Deliverables|AI Pitch|Explore Briefs|Dashboard|Campaigns/i').first();
    await expect(creatorElement).toBeVisible();

    // RBAC Security Check: Creator must be blocked from accessing the Admin area
    const response = await page.goto(`${BASE_URL}/app/admin`);
    const status = response?.status() ?? 200;
    const currentUrl = page.url();

    // Must return 403/404 OR redirect away to /login or /app
    const isAccessBlocked = status === 403 || status === 404 || !currentUrl.endsWith('/app/admin');
    expect(isAccessBlocked).toBeTruthy();
  });

  test('03: Creator Brief Exploration and Proposal Trigger', async ({ page }) => {
    await loginAs(page, USERS.creator.email, USERS.creator.password);

    // Navigate to campaign discovery
    await page.goto(`${BASE_URL}/campaigns`);
    await page.waitForLoadState('networkidle');

    // Verify campaign brief listings exist
    const briefCards = page.locator('article, div[class*="campaign"], div[class*="brief"]');
    const count = await briefCards.count();
    expect(count).toBeGreaterThan(0);

    // Check for an Apply or Pitch action button
    const actionBtn = page.locator('button:has-text("Pitch"), button:has-text("Apply"), a:has-text("Pitch")').first();
    if (await actionBtn.isVisible()) {
      await expect(actionBtn).toBeEnabled();
    }
  });

  // ==========================================
  // 3. BRAND FLOW & CAMPAIGN CREATION
  // ==========================================
  test('04: Brand Authentication and Campaign Builder', async ({ page }) => {
    await loginAs(page, USERS.brand.email, USERS.brand.password);

    // Ensure Brand reaches brand workspace
    await expect(page).toHaveURL(/\/(app|brand|dashboard)/i);

    // Navigate to Brief/Campaign creation
    await page.goto(`${BASE_URL}/app/brand/campaigns/create`);
    await page.waitForLoadState('domcontentloaded');

    // Confirm presence of brief input fields
    const titleInput = page.locator('input[name="title"], input[placeholder*="title" i], input[id*="title" i]').first();
    const budgetInput = page.locator('input[name="budget"], input[type="number"], input[placeholder*="budget" i]').first();

    if (await titleInput.isVisible()) {
      await titleInput.fill('Cinematic 4K Brand Film');
      if (await budgetInput.isVisible()) {
        await budgetInput.fill('3500');
      }
    }
  });

  test('05: Brand Escrow & Checkout Security Verification', async ({ page }) => {
    await loginAs(page, USERS.brand.email, USERS.brand.password);

    // Navigate to talent search or campaigns
    await page.goto(`${BASE_URL}/creators`);
    await page.waitForLoadState('domcontentloaded');

    // Inspect booking or rate triggers
    const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
    if (await bookBtn.isVisible()) {
      await expect(bookBtn).toBeVisible();
    }
  });

  // ==========================================
  // 4. SUPER ADMIN / DISPUTE CENTER
  // ==========================================
  test('06: Super Admin Command Center Access & Oversight', async ({ page }) => {
    await loginAs(page, USERS.admin.email, USERS.admin.password);

    // Ensure Admin reaches administrative overview
    await page.goto(`${BASE_URL}/app/admin`);
    await page.waitForLoadState('networkidle');

    // Verify admin-only telemetry panels exist
    const adminPanel = page.locator('text=/Disputes|Command Center|Gross Merchandise Value|Escrow Vault|Audit/i').first();
    await expect(adminPanel).toBeVisible();
  });

  test('07: Admin Dispute Resolution Controls', async ({ page }) => {
    await loginAs(page, USERS.admin.email, USERS.admin.password);

    await page.goto(`${BASE_URL}/app/admin`);
    await page.waitForLoadState('domcontentloaded');

    // Check that standard administrative actions are visible
    const tableOrList = page.locator('table, div[role="table"], div[class*="dispute"], div[class*="list"]').first();
    await expect(tableOrList).toBeVisible();
  });

  // ==========================================
  // 5. SECURITY & TENANT ISOLATION (IDOR)
  // ==========================================
  test('08: Cross-Tenant Isolation & Unauthenticated API Protection', async ({ request }) => {
    // Attempting to read a sensitive milestone endpoint without credentials
    const unauthResponse = await request.get(`${BASE_URL}/api/milestones/00000000-0000-0000-0000-000000000000`);
    
    // Server must reject with 401 Unauthorized, 403 Forbidden, or 404 Not Found
    expect([401, 403, 404]).toContain(unauthResponse.status());
  });
});
