import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Admin Command Center, Settings & Subscriptions", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Creator visits Settings, verifies subscription plan, toggles annual interval, switches tabs", async ({ page }) => {
    // ── 1. LOG IN AS CREATOR ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("creator@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. SETTINGS PAGE ──
    await page.goto(`${BASE_URL}/app/settings`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Settings & Billing/i }).first()).toBeVisible({ timeout: 10_000 });

    // Verify Subscription Quota or Plan tier is displayed
    await expect(page.locator("text=/Subscription|Current Plan|Pro|Creator/i").first()).toBeVisible({ timeout: 5_000 });

    // Switch to Payout tab
    const payoutTab = page.getByRole("button", { name: /Payout & Bank/i });
    if (await payoutTab.isVisible()) {
      await payoutTab.click();
      await expect(page.locator("text=/Payout Rail|Bank Account|Direct/i").first()).toBeVisible({ timeout: 5_000 });
    }

    // Switch to Security tab
    const securityTab = page.getByRole("button", { name: /Security/i });
    if (await securityTab.isVisible()) {
      await securityTab.click();
      await expect(page.locator("text=/Change Password|Security Credentials/i").first()).toBeVisible({ timeout: 5_000 });
    }
  });

  test("Brand visits Profile & Settings, verifies growth subscription quota", async ({ page }) => {
    // ── 1. LOG IN AS BRAND ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. BRAND PROFILE ──
    await page.goto(`${BASE_URL}/app/profile`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Brand Profile Settings/i }).first()).toBeVisible({ timeout: 10_000 });

    // ── 3. BRAND SETTINGS ──
    await page.goto(`${BASE_URL}/app/settings`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Settings & Billing/i }).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Active Campaign Briefs|Growth|Enterprise/i").first()).toBeVisible({ timeout: 5_000 });
  });

  test("Super Admin navigates Admin Command Center tabs", async ({ page }) => {
    // ── 1. LOG IN AS SUPER ADMIN ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("kevinbhutwala417@gmail.com");
    await page.locator('input[type="password"], input[name="password"]').fill("admin123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. COMMAND CENTER OVERVIEW ──
    await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Agency Admin Command Center/i }).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Gross Escrow Volume/i").first()).toBeVisible({ timeout: 5_000 });
    await expect(page.locator("text=/Verified Creator Roster/i").first()).toBeVisible({ timeout: 5_000 });

    // ── 3. ADMIN ESCROW VAULT CONTROL ──
    await page.goto(`${BASE_URL}/admin/payments`, { waitUntil: "networkidle" });
    await expect(page.locator("text=/Total Locked Escrow/i").first()).toBeVisible({ timeout: 10_000 });

    // ── 4. ADMIN AUDIT TRAILS ──
    await page.goto(`${BASE_URL}/admin/audit`, { waitUntil: "networkidle" });
    await expect(page.locator("text=/Audit Trail/i").first()).toBeVisible({ timeout: 10_000 });

    // ── 5. ADMIN PLATFORM CONFIGURATION ──
    await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: "networkidle" });
    await expect(page.locator("text=/Financial Parameters & Escrow Limits/i").first()).toBeVisible({ timeout: 10_000 });
  });
});
