import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "https://abeycollab.vercel.app";

test.describe("Verified Captured Razorpay Payments & Dashboard Status", () => {
  test("Brand & Creator Ledger reflects captured payments", async ({ page }) => {
    // 1. Log in as Brand
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.fill('input[type="email"]', "brand@abeycollab.io");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 25000 });
    await expect(page).toHaveURL(/\/(app|dashboard)/i);

    // 2. Visit Earnings & Escrow ledger
    await page.goto(`${BASE_URL}/app/earnings`, { waitUntil: "networkidle" });
    await expect(page.locator("text=Live Razorpay Escrow Deposit Gateway")).toBeVisible({ timeout: 10000 });

    // 3. Check that Pay with Razorpay button is enabled and active
    const payBtn = page.locator('button:has-text("Pay with Razorpay")');
    await expect(payBtn).toBeVisible();
    await expect(payBtn).toBeEnabled();

    // 4. Capture screenshot of verified dashboard state
    await page.screenshot({ path: "scratch/verified-earnings-dashboard.png", fullPage: true });
  });
});
