import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Escrow State Machine, Milestone Deliverables & Creator Earnings", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Brand funds escrow vault and approves milestone deliverable", async ({ page, context }) => {
    // ── 1. LOG IN AS BRAND ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. BRAND WORKSPACE & ESCROW RELEASE ──
    await page.goto(`${BASE_URL}/app/collaborations`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Active Collaborations/i }).first()).toBeVisible({ timeout: 10_000 });

    // Check if unfunded collaboration banner is present and fund it
    const fundBtn = page.getByRole("button", { name: /Fund Escrow Vault/i }).first();
    if (await fundBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      const [fundRes] = await Promise.all([
        page.waitForResponse((res) => res.url().includes("/fund") && res.request().method() === "POST"),
        fundBtn.click(),
      ]);
      expect(fundRes.status()).toBe(200);
      await page.waitForTimeout(500);
    }

    // Review & Approve submitted milestone deliverable
    const reviewBtn = page.getByRole("button", { name: /Review & Approve/i }).first();
    if (await reviewBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await reviewBtn.click();

      // Review modal should open
      const reviewModal = page.locator('div[role="dialog"]');
      await expect(reviewModal).toBeVisible({ timeout: 5_000 });

      // Click Approve & Release Escrow
      const approveBtn = reviewModal.getByRole("button", { name: /Approve & Release Escrow/i });
      await expect(approveBtn).toBeVisible();

      const [approveRes] = await Promise.all([
        page.waitForResponse((res) => res.url().includes("/api/collaborations/") && res.request().method() === "POST"),
        approveBtn.click(),
      ]);
      expect(approveRes.status()).toBe(200);

      // Verify Tranche Released badge appears
      await expect(page.locator("text=/Tranche Released/i").first()).toBeVisible({ timeout: 5_000 });
    }
  });

  test("Creator submits deliverable draft and views earnings balance & withdrawal", async ({ page, context }) => {
    // ── 1. LOG IN AS CREATOR ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("creator@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. CREATOR SUBMITS DELIVERABLE ──
    await page.goto(`${BASE_URL}/app/collaborations`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Active Collaborations/i }).first()).toBeVisible({ timeout: 10_000 });

    const submitLinkBtn = page.getByRole("button", { name: /Submit Deliverable Link|Update Deliverable Link/i }).first();
    if (await submitLinkBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await submitLinkBtn.click();

      const submitModal = page.locator('div[role="dialog"]');
      await expect(submitModal).toBeVisible({ timeout: 5_000 });

      const assetUrlInput = submitModal.locator('input[type="url"], input[placeholder*="http"]');
      await assetUrlInput.fill("https://drive.google.com/file/d/test-deliverable-cut/view");

      const submitBtn = submitModal.getByRole("button", { name: /Submit Deliverable & Start 120h SLA/i });
      await expect(submitBtn).toBeVisible();

      const [subRes] = await Promise.all([
        page.waitForResponse((res) => res.url().includes("/api/milestones/") || res.url().includes("/api/collaborations/")),
        submitBtn.click(),
      ]);
      expect([200, 201]).toContain(subRes.status());
    }

    // ── 3. CREATOR CHECKS EARNINGS ──
    await page.goto(`${BASE_URL}/app/earnings`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Earnings & Payouts/i }).first()).toBeVisible({ timeout: 10_000 });

    // Verify financial metrics are present
    await expect(page.locator("text=/Escrow Secured/i").first()).toBeVisible({ timeout: 5_000 });
    await expect(page.locator("text=/Withdraw Balance/i").first()).toBeVisible({ timeout: 5_000 });

    // Verify withdrawal action triggers toast/notification
    const withdrawBtn = page.getByRole("button", { name: /Withdraw Balance/i });
    await withdrawBtn.click();
    await expect(page.locator("text=/Withdrawal Initiated|No Funds Available/i").first()).toBeVisible({ timeout: 5_000 });
  });

  test("Super Admin views Dispute Arbitration Court", async ({ page, context }) => {
    // ── 1. LOG IN AS SUPER ADMIN ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("kevinbhutwala417@gmail.com");
    await page.locator('input[type="password"], input[name="password"]').fill("admin123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. NAVIGATE TO ADMIN DISPUTES ──
    await page.goto(`${BASE_URL}/admin/disputes`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Dispute Arbitration Court/i }).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/Tribunal & Arbitration Desk/i").first()).toBeVisible({ timeout: 5_000 });
  });
});
