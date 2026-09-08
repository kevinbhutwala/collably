import { test, expect, Page } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const CREDS = {
  creator: {
    email: "creator@abeycollab.io",
    fallbackEmail: "creator@collably.io",
    password: "password123",
    role: "creator",
  },
  brand: {
    email: "brand@abeycollab.io",
    fallbackEmail: "brand@collably.io",
    password: "password123",
    role: "brand",
  },
  admin: {
    email: "kevinbhutwala417@gmail.com",
    password: "admin123",
    role: "agency_admin",
  },
};

async function performLogin(page: Page, email: string, pass: string) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]');
  const passwordInput = page.locator('input[type="password"], input[name="password"]');
  const submitBtn = page.locator('button[type="submit"]').first();

  await expect(emailInput).toBeVisible({ timeout: 10_000 });
  await emailInput.fill(email);
  await passwordInput.fill(pass);
  await submitBtn.click();

  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });
  await page.waitForLoadState("domcontentloaded");
}

test.describe("Strict Authentication & Automated Testing of All 3 User Credentials", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  // -------------------------------------------------------------
  // 1. CREATOR CREDENTIALS TEST
  // -------------------------------------------------------------
  test("1. Creator Credential: Login, Market Pulse, and Route Guard Check", async ({ page }) => {
    // Attempt login with creator credentials
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);

    // Verify successful entry to creator dashboard
    await expect(page).toHaveURL(/\/(app|dashboard)/i);

    // Verify Creator Market Pulse widget with Opportunity Score
    const pulseHeader = page.locator("text=/Opportunity & Market Demand|Opportunity Score|Personalized Market Pulse|Sponsorship Demand|Opportunities/i").first();
    await expect(pulseHeader).toBeVisible({ timeout: 10_000 });

    // Strict RBAC check: Creator must NOT be permitted in /admin area
    const adminResponse = await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: "domcontentloaded" });
    const status = adminResponse?.status() ?? 200;
    const currentUrl = page.url();

    const isAccessBlocked = status === 403 || status === 404 || !currentUrl.includes("/admin/settings");
    expect(isAccessBlocked).toBeTruthy();

    console.log("✅ Creator Credential validated.");
  });

  // -------------------------------------------------------------
  // 2. BRAND CREDENTIALS TEST
  // -------------------------------------------------------------
  test("2. Brand Credential: Login, Market Intelligence, and Talent Discovery", async ({ page }) => {
    // Attempt login with brand credentials
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);

    // Verify successful entry to brand dashboard
    await expect(page).toHaveURL(/\/(app|dashboard)/i);

    // Verify Brand Market Intelligence widget is rendered
    const intelHeader = page.locator("text=/Market Intelligence|Rate Benchmarks|Pricing Index|Market Insights|Pricing Guide|Creator Rates/i").first();
    await expect(intelHeader).toBeVisible({ timeout: 10_000 });

    // Navigate to Brand Creator Discovery workspace
    await page.goto(`${BASE_URL}/app/brand/creators`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Discover Verified Creators|Discover Creators/i })).toBeVisible();

    // Switch to Natural Language Match search
    const matchTab = page.locator("button", { hasText: "Natural Language Brief Match" });
    await expect(matchTab).toBeVisible();
    await matchTab.click();

    // Verify Match Prompt Box exists
    await expect(page.locator("input[placeholder*='Fitness creator from Mumbai' i]")).toBeVisible({ timeout: 8_000 });
  });

  // -------------------------------------------------------------
  // 3. SUPER ADMIN CREDENTIALS TEST
  // -------------------------------------------------------------
  test("3. Super Admin Credential: Login, Algorithm Control Center & Anti-Gaming Governance", async ({ page }) => {
    // Attempt login with Super Admin credentials
    await performLogin(page, CREDS.admin.email, CREDS.admin.password);

    // Navigate to Admin Settings
    await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: "networkidle" });

    // Verify Admin Global Platform Configuration header
    await expect(page.getByRole("heading", { name: /Marketplace Intelligence & Platform Settings/i })).toBeVisible({ timeout: 10_000 });

    // Verify Creator Trending Algorithm Weights sliders
    await expect(page.locator("text=Creator Trending Formula Weights")).toBeVisible();


    // Verify Rising Creator Criteria & Badge Thresholds
    await expect(page.locator("text=Rising Creator Heuristics & Reputation Thresholds")).toBeVisible();

    // Verify Anti-Gaming Security feed
    await expect(page.locator("text=Anti-Gaming Security & Throttling Feed")).toBeVisible();

    // Test Save Configuration button
    const saveBtn = page.locator("button", { hasText: "Save Configuration" });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    // Verify success toast appears
    await expect(page.locator("text=Platform & Algorithm Config Saved")).toBeVisible({ timeout: 6_000 });
  });
});
