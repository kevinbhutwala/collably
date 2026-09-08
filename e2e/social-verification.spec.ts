import { test, expect, Page } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const CREDS = {
  creator: {
    email: "creator@abeycollab.io",
    password: "password123",
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

test.describe("Social Media Kit: Account Verification & Clickable External Profiles", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Complete Flow: Add channel, error handling, verify ownership, check verified badge, and test clickable links", async ({ page }) => {
    // 1. Log in as Creator
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);

    // 2. Navigate to Media Kit & Profile settings
    await page.goto(`${BASE_URL}/app/profile`, { waitUntil: "networkidle" });
    await expect(page.getByRole("main").getByRole("heading", { name: /Media Kit & Profile/i })).toBeVisible({ timeout: 10_000 });

    // Ensure Connected Social Channels section exists
    await expect(page.locator("main").locator("text=Connected Social Channels").first()).toBeVisible();

    // 3. Test Invalid Link / Platform Mismatch Error Handling
    const addChannelBtn = page.locator("button:has-text('Add Channel')").first();
    await addChannelBtn.click();

    // The modal should open
    await expect(page.locator("h3:has-text('Add Social Channel')").first()).toBeVisible();

    // Select YouTube, but enter an Instagram link
    const platformSelect = page.locator("select").first();
    await platformSelect.selectOption("youtube");
    const handleInput = page.locator("input[placeholder*='techcreator']").first();
    await handleInput.fill("https://instagram.com/techcreator");
    const modalAddBtn = page.locator("button:has-text('Add Channel')").nth(1);
    await modalAddBtn.click();

    // Verify error toast appears warning about platform mismatch
    await expect(page.locator("text=/You entered a INSTAGRAM link, but selected YOUTUBE/i").first()).toBeVisible({ timeout: 5000 });

    // 4. Add a Valid Channel
    const uniqueHandle = `verify_tester_${Date.now().toString().slice(-4)}`;
    await platformSelect.selectOption("x");
    await handleInput.fill(`@${uniqueHandle}`);
    await modalAddBtn.click();

    // Verify Account Ownership Modal should automatically open
    await expect(page.locator("h3:has-text('Verify Account Ownership')").first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(`text=@${uniqueHandle}`).first()).toBeVisible();
    await expect(page.locator("text=Your Verification Code").first()).toBeVisible();

    // Test profile link in modal has correct target and href
    const modalProfileLink = page.locator("a:has-text('Open Profile')").first();
    await expect(modalProfileLink).toHaveAttribute("target", "_blank");
    await expect(modalProfileLink).toHaveAttribute("href", `https://x.com/${uniqueHandle}`);

    // Click "Verify Ownership Now"
    const verifyNowBtn = page.locator("button:has-text('Verify Ownership Now')").first();
    await verifyNowBtn.click();

    // Verify success toast
    await expect(page.locator("text=Account Verified!").first()).toBeVisible({ timeout: 10_000 });

    // 5. Verify the account card now shows "Verified" badge and clickable external link
    const channelCard = page.locator(`div:has-text('@${uniqueHandle}')`).last();
    await expect(channelCard).toBeVisible();

    // Check for Verified badge inside channel card
    const verifiedBadge = channelCard.locator("span:has-text('Verified')").first();
    await expect(verifiedBadge).toBeVisible();

    // Verify profile link in the card is clickable and points to external URL
    const externalLink = channelCard.locator(`a[href="https://x.com/${uniqueHandle}"]`).first();
    await expect(externalLink).toBeVisible();
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");

    // 6. Test Duplicate Account Rejection within Profile
    await addChannelBtn.click();
    await platformSelect.selectOption("x");
    await handleInput.fill(uniqueHandle);
    await modalAddBtn.click();

    // Should display duplicate error toast
    await expect(page.locator("text=/Already Added|already added/i").first()).toBeVisible({ timeout: 5000 });

    // Close the add modal
    await page.locator("button:has-text('Cancel')").first().click();

    // 7. Verify Public Creator Profile displays the clickable link and verified badge
    await page.goto(`${BASE_URL}/creators/creator-demo`, { waitUntil: "networkidle" });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10_000 });

    const publicSocialLink = page.locator(`a[href="https://x.com/${uniqueHandle}"]`).first();
    await expect(publicSocialLink).toBeVisible();
    await expect(publicSocialLink).toHaveAttribute("target", "_blank");
    await expect(publicSocialLink.locator("text=Verified").first()).toBeVisible();
  });

  test("Mobile Viewport: Verification flow and responsive link interactions", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);

    await page.goto(`${BASE_URL}/app/profile`, { waitUntil: "networkidle" });
    await expect(page.locator("text=Connected Social Channels").first()).toBeVisible({ timeout: 10_000 });

    const addChannelBtn = page.locator("button:has-text('Add Channel')").first();
    await addChannelBtn.click();

    const handleInput = page.locator("input[placeholder*='techcreator']").first();
    const uniqueHandle = `mob_${Date.now().toString().slice(-4)}`;
    await handleInput.fill(uniqueHandle);
    const modalAddBtn = page.locator("button:has-text('Add Channel')").nth(1);
    await modalAddBtn.click();

    // Verify modal is responsive and buttons are visible
    const verifyModal = page.locator("h3:has-text('Verify Account Ownership')").first();
    await expect(verifyModal).toBeVisible({ timeout: 5000 });

    const verifyBtn = page.locator("button:has-text('Verify Ownership Now')").first();
    await expect(verifyBtn).toBeVisible();
    await verifyBtn.click();

    // Check verified status
    await expect(page.locator("text=Account Verified!").first()).toBeVisible({ timeout: 10_000 });

    // Verify channel card on mobile shows verified badge and clickable link
    const channelCard = page.locator(`div:has-text('@${uniqueHandle}')`).last();
    await expect(channelCard).toBeVisible();
    await expect(channelCard.locator("span:has-text('Verified')").first()).toBeVisible();
    const link = channelCard.locator(`a[href*="${uniqueHandle}"]`).first();
    await expect(link).toHaveAttribute("target", "_blank");
  });
});
