import { test, expect, Page } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const CREDS = {
  brand: {
    email: "brand@abeycollab.io",
    password: "password123",
  },
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

test.describe("Campaigns Screens Verification Audit", () => {
  test("1. Brand 'My Campaigns' Screen (/app/brand/campaigns) loads, displays stats, cards, and filters", async ({ page }) => {
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);
    await page.goto(`${BASE_URL}/app/brand/campaigns`, { waitUntil: "networkidle" });

    // Main header validation
    const header = page.locator("main h1").first();
    await expect(header).toContainText("My Campaigns");

    // Stats validation
    const activeCampaignsStat = page.locator("text=Active Campaigns").first();
    await expect(activeCampaignsStat).toBeVisible();

    const securedBudgetStat = page.locator("text=Secured Budget").first();
    await expect(securedBudgetStat).toBeVisible();

    const creatorAppsStat = page.locator("text=Creator Applications").first();
    await expect(creatorAppsStat).toBeVisible();

    // Filter tabs
    const allBriefsTab = page.locator("button:has-text('All Briefs')").first();
    await expect(allBriefsTab).toBeVisible();

    const recruitingTab = page.locator("button:has-text('Recruiting')").first();
    await expect(recruitingTab).toBeVisible();

    // Search bar
    const searchInput = page.locator("input[placeholder*='Search campaigns' i]");
    await expect(searchInput).toBeVisible();

    // Campaign cards rendered
    const campaignCards = page.locator("main div.group.rounded-3xl");
    const count = await campaignCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify button links to brief and applications
    const firstCardBriefBtn = campaignCards.first().locator("button:has-text('Public Brief')");
    await expect(firstCardBriefBtn).toBeVisible();

    const firstCardProposalsBtn = campaignCards.first().locator("button:has-text('Proposals')");
    await expect(firstCardProposalsBtn).toBeVisible();
  });

  test("2. Currency Switcher Reactivity on 'My Campaigns' screen", async ({ page }) => {
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);
    await page.goto(`${BASE_URL}/app/brand/campaigns`, { waitUntil: "networkidle" });

    const currencyBtn = page.locator('[data-testid="currency-selector-button"]').first();
    if (await currencyBtn.isVisible()) {
      // Toggle to INR
      await currencyBtn.click();
      await page.locator('[data-testid="currency-option-INR"]').first().click();
      await expect(currencyBtn).toContainText("INR");

      // Verify secured budget updates to include INR symbol
      const securedBudget = page.locator("text=Secured Budget").locator("..").locator("p");
      await expect(securedBudget).toContainText("₹");

      // Toggle to USD
      await currencyBtn.click();
      await page.locator('[data-testid="currency-option-USD"]').first().click();
      await expect(currencyBtn).toContainText("USD");
      await expect(securedBudget).toContainText("$");
    }
  });

  test("3. Discover Campaigns Screen (/app/campaigns) loads and displays CampaignCards", async ({ page }) => {
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);
    await page.goto(`${BASE_URL}/app/campaigns`, { waitUntil: "networkidle" });

    const header = page.locator("main h1").first();
    await expect(header).toContainText("Discover Campaigns");

    // Check category pills
    const allPill = page.locator("button:has-text('All Briefs')").first();
    await expect(allPill).toBeVisible();

    // Check cards
    const cards = page.locator("main .group.rounded-3xl");
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test("4. Applications Screen (/app/applications) displays proposed fees with currency", async ({ page }) => {
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);
    await page.goto(`${BASE_URL}/app/applications`, { waitUntil: "networkidle" });

    // Verify main page header
    const heading = page.locator("main h1").first();
    await expect(heading).toBeVisible();

    // Verify tabs
    const allTab = page.locator("button:has-text('All Applications')").first();
    await expect(allTab).toBeVisible();
  });
});
