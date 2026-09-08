import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Brand Creator CRM Pipeline End-to-End Test", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Brand can manage CRM contacts, change pipeline stages, add private notes, and add talent", async ({ page }) => {
    // 1. Log in as Brand
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // 2. Navigate to Creator CRM
    await page.goto(`${BASE_URL}/app/brand/crm`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Creator CRM/i }).first()).toBeVisible({ timeout: 10_000 });

    // 3. Verify stage pills are present
    await expect(page.locator('button:has-text("All")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Outreach Sent")').first()).toBeVisible();

    // 4. Test "Add Creator to Pipeline" Modal
    const addCreatorBtn = page.getByRole("button", { name: /Add Creator to Pipeline/i }).first();
    await expect(addCreatorBtn).toBeVisible();
    await addCreatorBtn.click();

    const addModal = page.locator('div[role="dialog"]');
    await expect(addModal).toBeVisible({ timeout: 5_000 });

    // Select a stage and add note
    const stageSelect = addModal.locator('select').nth(1);
    await stageSelect.selectOption("Negotiating");
    const noteTextarea = addModal.locator('textarea');
    await noteTextarea.fill("Scouted for upcoming Q4 product campaign launch.");

    // Submit
    const [addResponse] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/crm/contacts") && res.request().method() === "POST"),
      addModal.getByRole("button", { name: /Add to Pipeline/i }).click(),
    ]);
    expect(addResponse.status()).toBe(201);

    // Verify success toast
    await expect(page.locator("text=/Creator Added to Pipeline/i").first()).toBeVisible({ timeout: 6_000 });

    // 5. Test Changing Stage on a Contact Card
    const firstCard = page.locator(".rounded-3xl.bg-white.border").first();
    await expect(firstCard).toBeVisible({ timeout: 5_000 });
    const cardStageSelect = firstCard.locator("select");
    
    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/crm/contacts") && res.request().method() === "POST"),
      cardStageSelect.selectOption("Preferred"),
    ]);
    await expect(page.locator("text=/CRM Stage Updated/i").first()).toBeVisible({ timeout: 5_000 });

    // 6. Test Adding Private Note
    const addNoteBtn = firstCard.getByRole("button", { name: /Add Note/i });
    await addNoteBtn.click();

    const noteModal = page.locator('div[role="dialog"]');
    await expect(noteModal).toBeVisible();
    await noteModal.locator("textarea").fill("Negotiation finalized on 2 revisions and 4K footage.");

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/crm/contacts") && res.request().method() === "POST"),
      noteModal.getByRole("button", { name: /Save Internal Note/i }).click(),
    ]);
    await expect(page.locator("text=/Private Note Saved/i").first()).toBeVisible({ timeout: 5_000 });

    // 7. Verify Note renders on card
    await expect(firstCard).toContainText("Negotiation finalized on 2 revisions");

    // 8. Test Removing Contact
    const removeBtn = firstCard.locator('button[title="Remove from CRM"]').first();
    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/crm/contacts") && res.request().method() === "POST"),
      removeBtn.click(),
    ]);
    await expect(page.locator("text=/Contact Removed/i").first()).toBeVisible({ timeout: 5_000 });
  });
});
