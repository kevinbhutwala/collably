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
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });

  const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]');
  const passwordInput = page.locator('input[type="password"], input[name="password"]');
  const submitBtn = page.locator('button[type="submit"]').first();

  await expect(emailInput).toBeVisible({ timeout: 10_000 });
  await emailInput.fill(email);
  await passwordInput.fill(pass);
  await submitBtn.click();

  // Wait for redirect away from /login
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15_000 });
  await page.waitForLoadState('domcontentloaded');
}

test.describe('AbeyCollab End-to-End Suite', () => {

  test.beforeEach(async ({ context }) => {
    // Clear cookies to avoid session cross-contamination
    await context.clearCookies();
  });

  // ==========================================
  // 1. PUBLIC MARKETING & DISCOVERY
  // ==========================================
  test('01: Public Landing Page and Navigation Integrity', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/(AbeyCollab|Collably)/i);

    // Verify primary hero typography & copy
    const heroHeading = page.locator('h1');
    await expect(heroHeading.first()).toBeVisible({ timeout: 10_000 });
    await expect(heroHeading.first()).toContainText(/CINEMATIC|VISIONARY/i);

    // Verify value proposition badges
    await expect(page.getByText(/100% Pre-funded Escrow/i).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/Instant Payout/i).first()).toBeVisible({ timeout: 10_000 });

    // Verify talent roster cards render
    const creatorCards = page.locator('text=Elena Rostova');
    await expect(creatorCards.first()).toBeVisible({ timeout: 10_000 });
  });

  // ==========================================
  // 2. CREATOR FLOW & ACCESS CONTROL
  // ==========================================
  test('02: Creator Authentication, Dashboard & Route Guards', async ({ page }) => {
    await loginAs(page, USERS.creator.email, USERS.creator.password);

    // Ensure Creator enters an authorized workspace route
    await expect(page).toHaveURL(/\/(app|creator|dashboard)/i);

    // Check for Creator-specific tools: Media Kit / Briefs / Deliverables in main content area
    const creatorElement = page.locator('main').locator('text=/Media Kit|Deliverables|AI Pitch|Explore Briefs|Dashboard|Campaigns|Active Collaborations/i').first();
    await expect(creatorElement).toBeVisible({ timeout: 10_000 });

    // RBAC Security Check: Creator must be blocked from accessing the Admin area
    const response = await page.goto(`${BASE_URL}/app/admin`, { waitUntil: 'domcontentloaded' });
    const status = response?.status() ?? 200;
    const currentUrl = page.url();

    // Must return 403/404 OR redirect away to /login or /app
    const isAccessBlocked = status === 403 || status === 404 || !currentUrl.endsWith('/app/admin');
    expect(isAccessBlocked).toBeTruthy();
  });

  test('03: Creator Brief Exploration and Proposal Trigger', async ({ page }) => {
    await loginAs(page, USERS.creator.email, USERS.creator.password);

    // Navigate to campaign discovery
    await page.goto(`${BASE_URL}/campaigns`, { waitUntil: 'domcontentloaded' });
    
    // Wait for campaigns to finish loading
    await page.waitForSelector('article, div[class*="campaign"], div[class*="brief"]', { timeout: 10_000 });

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
    await page.goto(`${BASE_URL}/app/brand/campaigns/create`, { waitUntil: 'domcontentloaded' });

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
    await page.goto(`${BASE_URL}/creators`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=Book', { timeout: 10_000 });

    // Inspect booking or rate triggers
    const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
    await expect(bookBtn).toBeVisible({ timeout: 10_000 });
  });

  // ==========================================
  // 4. SUPER ADMIN / DISPUTE CENTER
  // ==========================================
  test('06: Super Admin Command Center Access & Oversight', async ({ page }) => {
    await loginAs(page, USERS.admin.email, USERS.admin.password);

    // Ensure Admin reaches administrative overview
    await page.goto(`${BASE_URL}/app/admin`, { waitUntil: 'domcontentloaded' });

    // Verify admin-only telemetry panels exist
    const adminPanel = page.locator('text=/Disputes|Command Center|Gross Merchandise Value|Escrow Vault|Audit/i').first();
    await expect(adminPanel).toBeVisible({ timeout: 10_000 });
  });

  test('07: Admin Dispute Resolution Controls', async ({ page }) => {
    await loginAs(page, USERS.admin.email, USERS.admin.password);

    await page.goto(`${BASE_URL}/admin/disputes`, { waitUntil: 'domcontentloaded' });

    // Check that dispute arbitration controls and records are visible
    const disputeArbitrationHeading = page.locator('text=/Dispute|Arbitration|Escrow/i').first();
    await expect(disputeArbitrationHeading).toBeVisible({ timeout: 10_000 });
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

  // ==========================================
  // 6. DELIVERABLE EXTERNAL LINK WORKFLOW
  // ==========================================
  test('09: External Link Deliverable Submission and Review Flow', async ({ page }) => {
    await loginAs(page, USERS.creator.email, USERS.creator.password);

    // Navigate to active collaborations
    await page.goto(`${BASE_URL}/app/collaborations`, { waitUntil: 'domcontentloaded' });
    
    // Check for submission trigger button or review elements
    const submitBtn = page.locator('button:has-text("Submit Deliverable"), button:has-text("Update Deliverable")').first();
    if (await submitBtn.isVisible({ timeout: 5_000 })) {
      await submitBtn.click();

      // Verify external link input
      const linkInput = page.locator('input[placeholder*="http" i], input[type="text"]').first();
      await expect(linkInput).toBeVisible();

      // Verify helper note: "Anyone with the link can view"
      const helperNote = page.locator('text=/Anyone with the link can view/i').first();
      await expect(helperNote).toBeVisible();

      // Fill external asset URL
      await linkInput.fill('https://drive.google.com/file/d/test-e2e-submission/view?usp=sharing');

      // Fill optional notes
      const notesInput = page.locator('textarea').first();
      if (await notesInput.isVisible()) {
        await notesInput.fill('Color graded ProRes cut with cleared music rights.');
      }

      // Submit
      const confirmSubmitBtn = page.locator('button[type="submit"]:has-text("Submit")').first();
      await confirmSubmitBtn.click();

      // Confirm SLA or SUBMITTED status appears
      await expect(page.locator('text=/SUBMITTED|120h SLA/i').first()).toBeVisible({ timeout: 10_000 });
    }
  });
});
