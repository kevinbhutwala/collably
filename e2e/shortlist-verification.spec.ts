import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Brand Talent Shortlisting & Saved Creators End-to-End Test", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("1. Save to Shortlist on Creator Card persists and reflects in Brand Shortlists", async ({ page }) => {
    // 1. Log in as Brand
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    const submitBtn = page.locator('button[type="submit"]').first();

    await emailInput.fill("brand@abeycollab.io");
    await passwordInput.fill("password123");
    await submitBtn.click();

    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // 2. Navigate to Brand Creator Discovery
    await page.goto(`${BASE_URL}/app/brand/creators`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Discover Verified Creators|Discover Creators/i }).first()).toBeVisible({ timeout: 10_000 });

    // 3. Find the first creator card
    const firstCreatorCard = page.locator(".group.rounded-3xl").first();
    await expect(firstCreatorCard).toBeVisible({ timeout: 10_000 });
    const creatorName = await firstCreatorCard.locator("h3").textContent();
    expect(creatorName).toBeTruthy();

    // 4. Click the bookmark / save button to ensure it is saved
    const bookmarkBtn = firstCreatorCard.locator('button[title*="Shortlist"]').first();
    await expect(bookmarkBtn).toBeVisible();
    const isAlreadySaved = await firstCreatorCard.locator('button[title="Saved in Shortlist"]').isVisible();
    if (isAlreadySaved) {
      await bookmarkBtn.click();
      await page.waitForTimeout(500);
    }
    await bookmarkBtn.click();

    // 5. Verify Toast feedback
    const toast = page.locator("text=/Saved to Shortlist|Added to/i").first();
    await expect(toast).toBeVisible({ timeout: 6_000 });

    // 6. Verify button state updated to saved
    await expect(firstCreatorCard.locator('button[title="Saved in Shortlist"]')).toBeVisible();

    // 7. Navigate to Brand Shortlists page
    await page.goto(`${BASE_URL}/app/brand/shortlists`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Creator Shortlists/i }).first()).toBeVisible({ timeout: 10_000 });

    // 8. Verify the shortlisted creator is present in the shortlist table
    const tableOrList = page.locator("body");
    await expect(tableOrList).toContainText(creatorName!.trim());

    // 9. Remove creator from shortlist using trash button
    const removeBtn = page.locator('button[title="Remove from shortlist"]').first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      const removedToast = page.locator("text=/Removed from Shortlist/i").first();
      await expect(removedToast).toBeVisible({ timeout: 5_000 });
    }
  });

  test("2. Save to Shortlist from Creator Media Kit Profile persists on reload", async ({ page }) => {
    // 1. Log in as Brand
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // 2. Navigate to specific creator profile (Elena Rostova / creator-1)
    await page.goto(`${BASE_URL}/creators/creator-1`, { waitUntil: "networkidle" });
    const profileSaveBtn = page.locator('button:has-text("Shortlist")').first();
    await expect(profileSaveBtn).toBeVisible({ timeout: 10_000 });

    const isSavedAlready = await page.locator('button:has-text("Saved to Shortlist")').first().isVisible();
    if (isSavedAlready) {
      await profileSaveBtn.click();
      await page.waitForTimeout(500);
    }

    // 3. Click save to shortlist
    await profileSaveBtn.click();

    // 4. Verify text changes to Saved
    await expect(page.locator('button:has-text("Saved to Shortlist")').first()).toBeVisible({ timeout: 5_000 });

    // 5. Reload page to verify local & remote persistence
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.locator('button:has-text("Saved to Shortlist")').first()).toBeVisible({ timeout: 10_000 });

    // 6. Check shortlist page
    await page.goto(`${BASE_URL}/app/brand/shortlists`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Creator Shortlists/i }).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("body")).toContainText("Elena Rostova");
  });
});
