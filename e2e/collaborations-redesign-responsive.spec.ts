import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Redesigned Collaborations & Deals: Responsiveness & Usability", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Desktop Viewport (1280px): Executive Metrics, Search, Filters, and Accordion", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Login as brand
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // Navigate to Collaborations workspace
    await page.goto(`${BASE_URL}/app/collaborations`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Active Collaborations/i }).first()).toBeVisible({ timeout: 10_000 });

    // Verify Executive Summary Metric Cards
    await expect(page.getByText("Active Deals").first()).toBeVisible();
    await expect(page.getByText("Needs Action").first()).toBeVisible();
    await expect(page.getByText("Protected in Escrow").first()).toBeVisible();
    await expect(page.getByText("Completed Deals").first()).toBeVisible();

    // Verify Filter Tabs
    const allTab = page.getByRole("button", { name: /All Deals/i });
    const needsActionTab = page.getByRole("button", { name: /Needs Action/i });
    const inProgressTab = page.getByRole("button", { name: /In Progress/i });
    const completedTab = page.getByRole("button", { name: /Completed/i });

    await expect(allTab).toBeVisible();
    await expect(needsActionTab).toBeVisible();
    await expect(inProgressTab).toBeVisible();
    await expect(completedTab).toBeVisible();

    // Verify Search Box works
    const searchInput = page.getByPlaceholder(/Search projects or partners/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill("NonExistentDealXYZ999");
    await page.waitForTimeout(400);
    await expect(page.getByText(/No Deals Found/i)).toBeVisible();

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(400);

    // Verify Accordion Expand / Collapse
    const collapseBtn = page.getByRole("button", { name: /Collapse|Open Workspace/i }).first();
    if (await collapseBtn.isVisible()) {
      const initialText = await collapseBtn.innerText();
      await collapseBtn.click();
      await page.waitForTimeout(300);
      const afterClickText = await collapseBtn.innerText();
      expect(afterClickText).not.toBe(initialText);
      // Click again to reopen
      await collapseBtn.click();
      await page.waitForTimeout(300);
    }
  });

  test("Mobile Viewport (375px - iPhone): No Horizontal Scroll and Clean Responsive Stepper", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    // Login as creator
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("creator@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // Visit Collaborations workspace
    await page.goto(`${BASE_URL}/app/collaborations`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Active Collaborations/i }).first()).toBeVisible({ timeout: 10_000 });

    // Check no root horizontal overflow on 375px mobile viewport
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify mobile milestone tracker is visible
    await expect(page.getByText(/Project Milestone Tracker/i).first()).toBeVisible();
    await expect(page.getByText(/Step \d of 5/i).first()).toBeVisible();

    // Verify creator payment clarity callout is visible
    await expect(page.getByText(/When will I get paid\?/i).first()).toBeVisible();

    // Verify partner info is rendered
    await expect(page.getByText(/Partner:/i).first()).toBeVisible();

    // Verify sub-tabs wrap properly and can be tapped
    const deliverablesTab = page.getByRole("button", { name: /Deliverables/i }).first();
    await expect(deliverablesTab).toBeVisible();
    await deliverablesTab.click();
  });
});
