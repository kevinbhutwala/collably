import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Campaign Lifecycle & Creator Pitch Application Flow", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Brand creates brief, Creator applies with pitch, Brand accepts into active escrow collaboration", async ({ page, context }) => {
    const campaignTitle = `AI Studio Hardware Series ${Date.now()}`;

    // ── 1. LOG IN AS BRAND ──
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 2. CREATE CAMPAIGN BRIEF ──
    await page.goto(`${BASE_URL}/app/brand/campaigns/create`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Campaign Overview/i }).first()).toBeVisible({ timeout: 10_000 });

    // Step 1: Basics
    await page.locator('input[placeholder*="AI-Powered Sprint"]').fill(campaignTitle);
    await page.locator('input[placeholder*="Engineering speed"]').fill("Cinematic 4K creator teardown");
    await page.locator('textarea[placeholder*="Detail key product"]').fill("Comprehensive workflow walkthrough for pro audio and AI developers.");

    // Advance through Wizard Steps
    for (let i = 0; i < 6; i++) {
      const nextBtn = page.getByRole("button", { name: /Continue to Step/i });
      await expect(nextBtn).toBeVisible({ timeout: 5_000 });
      await nextBtn.click();
      await page.waitForTimeout(400);
    }

    // Step 7: Review & Publish
    const publishBtn = page.getByRole("button", { name: /Launch Brief & Pre-Authorize Escrow/i });
    await expect(publishBtn).toBeVisible({ timeout: 5_000 });

    const [createResponse] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/campaigns") && res.request().method() === "POST"),
      publishBtn.click(),
    ]);
    expect(createResponse.status()).toBe(201);
    const createdCampaign = await createResponse.json();

    // Verify redirected to public campaign detail
    await page.waitForURL((url) => url.pathname.includes(`/campaigns/${createdCampaign.id}`), { timeout: 15_000 });
    await expect(page.getByRole("heading", { name: /AI Studio Hardware Series/i }).first()).toBeVisible({ timeout: 10_000 });

    // ── 3. LOG OUT ──
    await context.clearCookies();
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });

    // ── 4. LOG IN AS CREATOR ──
    await page.locator('input[type="email"], input[name="email"]').fill("creator@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    // ── 5. CREATOR APPLIES TO CAMPAIGN ──
    await page.goto(`${BASE_URL}/campaigns/${createdCampaign.id}`, { waitUntil: "networkidle" });
    const applyBtn = page.getByRole("button", { name: /Pitch Creative Angle & Apply|Apply/i }).first();
    await expect(applyBtn).toBeVisible({ timeout: 10_000 });
    await applyBtn.click();

    // Fill application pitch in modal
    const pitchModal = page.locator('div[role="dialog"]');
    await expect(pitchModal).toBeVisible({ timeout: 5_000 });

    const pitchTextarea = pitchModal.locator('textarea');
    await pitchTextarea.fill("I will produce a full 60-second in-depth integration showing actual workstation render benchmarks.");

    const [applyResponse] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/campaigns/apply") && res.request().method() === "POST"),
      pitchModal.getByRole("button", { name: /Submit Application|Submit Proposal/i }).click(),
    ]);
    expect(applyResponse.status()).toBe(201);
    await expect(page.locator("text=/Proposal Submitted/i").first()).toBeVisible({ timeout: 5_000 });

    // Verify application appears in Creator's applications list
    await page.goto(`${BASE_URL}/app/applications`, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toContainText(/AI Studio Hardware Series/i);

    // ── 6. LOG IN AS BRAND & ACCEPT PROPOSAL ──
    await context.clearCookies();
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.locator('input[type="email"], input[name="email"]').fill("brand@abeycollab.io");
    await page.locator('input[type="password"], input[name="password"]').fill("password123");
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 15_000 });

    await page.goto(`${BASE_URL}/app/applications`, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toContainText(/AI Studio Hardware Series/i);

    // Find the campaign application and accept proposal
    const acceptBtn = page.getByRole("button", { name: /Accept Proposal/i }).first();
    await expect(acceptBtn).toBeVisible({ timeout: 5_000 });

    const [acceptResponse] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/applications/") && res.request().method() === "PATCH"),
      acceptBtn.click(),
    ]);
    expect(acceptResponse.status()).toBe(200);

    // Verify workspace button appears
    await expect(page.locator("text=/accepted/i").first()).toBeVisible({ timeout: 5_000 });
    const workspaceBtn = page.getByRole("button", { name: /Open Workspace/i }).first();
    await expect(workspaceBtn).toBeVisible({ timeout: 5_000 });
  });
});
