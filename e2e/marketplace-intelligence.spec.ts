import { test, expect, Page } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function loginAs(page: Page, email: string, pass: string) {
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

test.describe("AbeyCollab Marketplace Intelligence & Algorithm Hub", () => {
  test("1. Public Creator Directory switches seamlessly between Trending, Match, and Leaderboards", async ({ page }) => {
    await page.goto(`${BASE_URL}/creators`, { waitUntil: "networkidle" });

    // Verify title and page loaded
    await expect(page.locator("h1")).toContainText(/Discover Verified Creators/i, { timeout: 12_000 });

    // 1.1 Switch to Trending Hub
    const trendingTab = page.locator("button", { hasText: "Trending Hub" });
    await expect(trendingTab).toBeVisible();
    await trendingTab.click();

    // Verify Trending Showcase appears
    await expect(page.locator("h2", { hasText: "Marketplace Trending Hub" })).toBeVisible({ timeout: 8_000 });
    await expect(page.locator("button", { hasText: "Trending Now" })).toBeVisible();

    // 1.2 Switch to AI Brief Match
    const matchTab = page.locator("button", { hasText: "AI Brief Match" });
    await expect(matchTab).toBeVisible();
    await matchTab.click();

    // Verify Natural Language search input
    await expect(page.locator("input[placeholder*='Fitness creator from Mumbai' i]")).toBeVisible({ timeout: 8_000 });

    // Click a sample prompt
    const promptBtn = page.locator("button", { hasText: /Fitness creator from Mumbai/i }).first();
    if (await promptBtn.isVisible()) {
      await promptBtn.click();
      await page.waitForTimeout(1000);
      await expect(page.locator("text=Extracted Campaign Parameters").first()).toBeVisible({ timeout: 10_000 });
    }


    // 1.3 Switch to Leaderboards
    const leaderboardTab = page.locator("button", { hasText: "Leaderboards" });
    await expect(leaderboardTab).toBeVisible();
    await leaderboardTab.click();

    // Verify Leaderboards table
    await expect(page.locator("h2", { hasText: "Creator Marketplace Leaderboards" })).toBeVisible({ timeout: 8_000 });
    await expect(page.locator("table")).toBeVisible();
  });

  test("2. Admin Settings displays live Algorithm and Anti-Gaming Control Center", async ({ page }) => {
    // Log in as Super Admin
    await loginAs(page, "kevinbhutwala417@gmail.com", "admin123");

    // Navigate to Admin Settings
    await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: "networkidle" });

    // Verify Algorithm Control sections
    await expect(page.locator("h1", { hasText: "Marketplace Intelligence & Platform Settings" })).toBeVisible({ timeout: 8_000 });
    await expect(page.locator("text=Creator Trending Formula Weights")).toBeVisible();
    await expect(page.locator("text=Rising Creator Heuristics & Reputation Thresholds")).toBeVisible();
    await expect(page.locator("text=Anti-Gaming Security & Throttling Feed")).toBeVisible();
  });
});
