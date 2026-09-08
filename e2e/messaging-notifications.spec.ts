import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Messaging System & Real-Time Notifications Hub", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Creator chats in conversation and checks notification popover", async ({ page, context }) => {
    // ── 1. LOG IN AS CREATOR ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("creator@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. NOTIFICATIONS BELL POPOVER ──
    const notifBtn = page.locator('button[aria-label="Notifications"]').first();
    await expect(notifBtn).toBeVisible({ timeout: 10_000 });
    await notifBtn.click();

    // Verify popover shows
    await expect(page.getByRole("heading", { name: /Notifications/i }).first()).toBeVisible({ timeout: 5_000 });

    // Click bell again or outside to close
    await notifBtn.click();

    // ── 3. CHAT WORKSPACE & REAL-TIME SENDING ──
    await page.goto(`${BASE_URL}/app/messages`, { waitUntil: "networkidle" });

    // Chat input in bottom pane
    const messageInput = page.locator('input[placeholder*="Press Enter to send"]').first();
    if (await messageInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      const testMsg = `Review completed for 4K B-roll footage ${Date.now()}`;
      await messageInput.fill(testMsg);

      const sendBtn = page.locator('button[title="Send message"]').first();
      await expect(sendBtn).toBeEnabled({ timeout: 5_000 });
      await sendBtn.click();

      // Verify the sent message appears in the chat thread
      await expect(page.locator(`text="${testMsg}"`).first()).toBeVisible({ timeout: 5_000 });
    }
  });

  test("Brand checks chat workspace and notifications popover", async ({ page, context }) => {
    // ── 1. LOG IN AS BRAND ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. NOTIFICATIONS POPOVER ──
    const notifBtn = page.locator('button[aria-label="Notifications"]').first();
    await expect(notifBtn).toBeVisible({ timeout: 10_000 });
    await notifBtn.click();
    await expect(page.getByRole("heading", { name: /Notifications/i }).first()).toBeVisible({ timeout: 5_000 });
    await notifBtn.click();

    // ── 3. MESSAGES PAGE ──
    await page.goto(`${BASE_URL}/app/messages`, { waitUntil: "networkidle" });
    await expect(page.locator('input[placeholder*="Search"], input[placeholder*="Filter"]').first()).toBeVisible({ timeout: 10_000 });
  });
});
