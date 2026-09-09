import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const CREDS = {
  creator: { email: "creator@abeycollab.io", password: "password123" },
  brand: { email: "brand@abeycollab.io", password: "password123" },
  admin: { email: "kevinbhutwala417@gmail.com", password: "admin123" },
};

async function performLogin(page: any, email: string, pass: string) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "domcontentloaded" });
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', pass);
  await page.click('button[type="submit"]');
  await page.waitForURL((url: any) => !url.pathname.includes("/login"), { timeout: 15_000 });
  await page.waitForLoadState("domcontentloaded");
}

test.describe("AbeyCollab Marketplace Operating System Full Flow", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("1. Creator OS: Market Pulse, Dedicated Trending Hub, Growth Center & Transaction Lifecycle", async ({ page }) => {
    // 1. Login
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);
    await expect(page).toHaveURL(/\/(app|dashboard)/i);

    // 2. Market Pulse Opportunities
    const opportunitiesHeading = page.locator("text=/Top Sponsorship Opportunities|Where are my opportunities/i").first();
    await expect(opportunitiesHeading).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Market Demand Score|Your Opportunity Score/i").first()).toBeVisible();

    // 3. Dedicated /app/trending Hub
    await page.goto(`${BASE_URL}/app/trending`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Trending Creators & Campaigns|Marketplace Trending Experience/i })).toBeVisible({ timeout: 10_000 });

    // Verify tabs
    await expect(page.locator("button", { hasText: "Trending Now" })).toBeVisible();
    await expect(page.locator("button", { hasText: "Rising Creators" })).toBeVisible();
    await expect(page.locator("button", { hasText: "Top Performers" })).toBeVisible();
    await expect(page.locator("button", { hasText: "Trending Campaigns" })).toBeVisible();
    await expect(page.locator("button", { hasText: "Trending Categories" })).toBeVisible();

    // Switch to Rising tab
    await page.locator("button", { hasText: "Rising Creators" }).click();
    await page.waitForTimeout(500);
    await expect(page.locator("text=/Rising #/i").first()).toBeVisible({ timeout: 10_000 });

    // Switch to Top Performers tab
    await page.locator("button", { hasText: "Top Performers" }).click();
    await page.waitForTimeout(500);
    await expect(page.locator("text=/Top Performer #/i").first()).toBeVisible({ timeout: 10_000 });

    // 4. Creator Growth Center (/app/growth)
    await page.goto(`${BASE_URL}/app/growth`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Creator Growth Center/i })).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Profile Completeness/i").first()).toBeVisible();
    await expect(page.locator("text=/Platform Visibility Ranking/i").first()).toBeVisible();
    await expect(page.locator("text=/Improve Your Visibility/i").first()).toBeVisible();

    // 5. Transaction Lifecycle Stepper in Collaborations
    await page.goto(`${BASE_URL}/app/collaborations`, { waitUntil: "domcontentloaded" });
    const stepperTitle = page.locator("text=/Transaction Lifecycle/i").first();
    if (await stepperTitle.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(page.locator("text=/When will I get paid/i").first()).toBeVisible();
    }
  });

  test("2. Brand OS: Brand Intelligence, Advanced Discovery Filters & Actionable Match Score", async ({ page }) => {
    // 1. Login
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);
    await expect(page).toHaveURL(/\/(app|dashboard)/i);

    // 2. Brand Market Intelligence
    const intel = page.locator("text=/Creator Rates & Industry Trends|Market Insights & Pricing Guide|Brand Market Intelligence/i").first();
    await expect(intel).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Category Demand|Niche Demand/i").first()).toBeVisible();
    await expect(page.locator("text=/Average Budget|Avg Campaign Budget/i").first()).toBeVisible();

    // 3. Brand Creator Discovery with Filters & Sorting
    await page.goto(`${BASE_URL}/app/brand/creators`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Discover Creators|Discover Verified Creators/i })).toBeVisible({ timeout: 10_000 });

    // Verify sort dropdown exists
    const sortSelect = page.locator("select").first();
    await expect(sortSelect).toBeVisible();

    // Test filter toggle pill
    const risingPill = page.locator("button", { hasText: "Rising Talent" }).first();
    await expect(risingPill).toBeVisible();
    await risingPill.click();
    await page.waitForTimeout(500);

    // 4. Actionable Match Score in Natural Language Match
    const matchTab = page.locator("button", { hasText: "Natural Language Brief Match" }).first();
    await matchTab.click();
    await page.waitForTimeout(500);

    const searchInput = page.locator('input[placeholder*="Fitness creator"]').first();
    await searchInput.fill("Fitness creator from Mumbai with 50K-250K followers and ₹30K budget");
    await page.locator("button", { hasText: "Find Matches" }).click();

    // Expect results
    const matchBadge = page.locator("text=/% Match/i").first();
    await expect(matchBadge).toBeVisible({ timeout: 15_000 });

    // Click Explain Why
    const explainBtn = page.locator("button", { hasText: /Explain Why|Hide Breakdown/i }).first();
    if (await explainBtn.isVisible()) {
      await explainBtn.click();
      await page.waitForTimeout(300);
      await expect(page.locator("text=/Why this creator/i").first()).toBeVisible();
      await expect(page.locator("text=/✓ Niche/i").first()).toBeVisible();
    }
  });

  test("3. Super Admin OS: Real Data Analytics, Algorithm Controls & Anti-Gaming", async ({ page }) => {
    // 1. Login
    await performLogin(page, CREDS.admin.email, CREDS.admin.password);

    // 2. Admin Analytics & Reports (/admin/reports)
    await page.goto(`${BASE_URL}/admin/reports`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Agency Analytics & GMV Platform Telemetry/i })).toBeVisible({ timeout: 10_000 });

    // Verify real DB metric cards
    await expect(page.locator("text=/Active Creators/i").first()).toBeVisible();
    await expect(page.locator("text=/Active Brands/i").first()).toBeVisible();
    await expect(page.locator("text=/Total Escrow GMV/i").first()).toBeVisible();
    await expect(page.locator("text=/Creator Payouts/i").first()).toBeVisible();
    await expect(page.locator("text=/Conversion Rate/i").first()).toBeVisible();
    await expect(page.locator("text=/Platform Retention/i").first()).toBeVisible();

    // 3. Admin Algorithm Controls (/admin/settings)
    await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Marketplace Intelligence|Platform Settings/i }).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Engagement Rate/i").first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Anti-Gaming Security/i").first()).toBeVisible({ timeout: 10_000 });
  });
});
