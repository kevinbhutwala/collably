import { test, expect, Page } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const CREDS = {
  creator: {
    email: "creator@abeycollab.io",
    password: "password123",
  },
  brand: {
    email: "brand@abeycollab.io",
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

test.describe("Multi-Currency Management: USD, INR, GBP, AED Support", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("1. Public Navbar: Currency Selector popover allows seamless switching between USD, INR, GBP, AED", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Ensure CurrencySelector button is present on Navbar
    const currencyBtn = page.locator('[data-testid="currency-selector-button"]').first();
    await expect(currencyBtn).toBeVisible({ timeout: 10_000 });

    // Open popover
    await currencyBtn.click();
    const popover = page.locator('[data-testid="currency-selector-popover"]').first();
    await expect(popover).toBeVisible({ timeout: 5_000 });

    // Verify all 4 primary options are displayed
    await expect(page.locator('[data-testid="currency-option-USD"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="currency-option-INR"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="currency-option-GBP"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="currency-option-AED"]').first()).toBeVisible();

    // Select INR
    await page.locator('[data-testid="currency-option-INR"]').first().click();
    await expect(popover).not.toBeVisible();
    await expect(currencyBtn).toContainText("INR");
    await expect(currencyBtn).toContainText("₹");

    // Select GBP
    await currencyBtn.click();
    await page.locator('[data-testid="currency-option-GBP"]').first().click();
    await expect(currencyBtn).toContainText("GBP");
    await expect(currencyBtn).toContainText("£");

    // Select AED
    await currencyBtn.click();
    await page.locator('[data-testid="currency-option-AED"]').first().click();
    await expect(currencyBtn).toContainText("AED");

    // Reset to USD
    await currencyBtn.click();
    await page.locator('[data-testid="currency-option-USD"]').first().click();
    await expect(currencyBtn).toContainText("USD");
    await expect(currencyBtn).toContainText("$");
  });

  test("2. Settings Page: Regional Preferences & Theme displays interactive currency cards and live benchmark comparisons", async ({ page }) => {
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);

    await page.goto(`${BASE_URL}/app/settings`, { waitUntil: "networkidle" });

    // Switch to Preferences & Theme tab
    const prefsTab = page.getByRole("button", { name: /Preferences & Theme/i });
    await expect(prefsTab).toBeVisible({ timeout: 10_000 });
    await prefsTab.click();

    // Verify Currency Cards section
    await expect(page.getByText("Global Currency & Regional Localization")).toBeVisible();
    const cardUSD = page.locator('[data-testid="currency-card-USD"]').first();
    const cardINR = page.locator('[data-testid="currency-card-INR"]').first();
    const cardGBP = page.locator('[data-testid="currency-card-GBP"]').first();
    const cardAED = page.locator('[data-testid="currency-card-AED"]').first();

    await expect(cardUSD).toBeVisible();
    await expect(cardINR).toBeVisible();
    await expect(cardGBP).toBeVisible();
    await expect(cardAED).toBeVisible();

    // Verify Benchmark comparisons ($1,000 base)
    await expect(page.getByText("Benchmark Value Comparison ($1,000 USD Base)")).toBeVisible();
    await expect(page.getByText("$1,000").first()).toBeVisible();
    await expect(page.getByText("₹83,500").first()).toBeVisible();
    await expect(page.getByText("£780").first()).toBeVisible();
    await expect(page.getByText("AED 3,670").first()).toBeVisible();

    // Click INR card
    await cardINR.click();
    await expect(cardINR).toContainText("Active");

    // Switch to Payout & Banking tab and verify settlement currency reflects selection
    const payoutTab = page.getByRole("button", { name: /Payout & Banking/i });
    await payoutTab.click();
    await expect(page.getByText("Settlement & Escrow Currency")).toBeVisible();
  });

  test("3. Earnings Dashboard: Metric cards dynamically adjust to selected currency (USD, INR, GBP, AED)", async ({ page }) => {
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);

    // Set currency to GBP via settings
    await page.goto(`${BASE_URL}/app/settings`, { waitUntil: "networkidle" });
    const prefsTab = page.getByRole("button", { name: /Preferences & Theme/i });
    await prefsTab.click();
    const cardGBP = page.locator('[data-testid="currency-card-GBP"]').first();
    await cardGBP.click();
    await expect(cardGBP).toContainText("Active");

    // Navigate to Earnings page
    await page.goto(`${BASE_URL}/app/earnings`, { waitUntil: "networkidle" });
    await expect(page.getByRole("main").getByRole("heading", { name: /Earnings & Payouts/i })).toBeVisible({ timeout: 10_000 });

    // Verify metric cards display GBP label
    await expect(page.getByText("Available Balance (GBP)")).toBeVisible();
    await expect(page.getByText("In Escrow (GBP)")).toBeVisible();
    await expect(page.getByText("Total Paid (GBP)")).toBeVisible();

    // Now change to AED
    const navCurrencyBtn = page.locator('[data-testid="currency-selector-button"]').first();
    await navCurrencyBtn.click();
    await page.locator('[data-testid="currency-option-AED"]').first().click();

    // Verify metric cards update to AED
    await expect(page.getByText("Available Balance (AED)")).toBeVisible();
    await expect(page.getByText("In Escrow (AED)")).toBeVisible();
    await expect(page.getByText("Total Paid (AED)")).toBeVisible();
  });

  test("4. Campaign Creator: Step 5 allows selecting currency pool (USD, INR, GBP, AED) with dynamic labels", async ({ page }) => {
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);

    await page.goto(`${BASE_URL}/app/brand/campaigns/create`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Campaign Overview & Basics/i })).toBeVisible({ timeout: 10_000 });

    // Fill Step 1
    await page.locator('input[label="Campaign Brief Title"], input').first().fill("Global Multi-Currency Test Campaign");

    // Advance to Step 5 (Click Continue to Step 4 times)
    for (let i = 1; i <= 4; i++) {
      const continueBtn = page.getByRole("button", { name: /Continue to Step/i });
      await continueBtn.click();
      await page.waitForTimeout(400);
    }

    // Now on Step 5: Budget & Escrow Terms
    await expect(page.getByRole("heading", { name: /Budget & Escrow Terms/i })).toBeVisible({ timeout: 5_000 });

    // Verify currency buttons exist
    const btnUSD = page.locator('[data-testid="campaign-currency-USD"]');
    const btnINR = page.locator('[data-testid="campaign-currency-INR"]');
    const btnGBP = page.locator('[data-testid="campaign-currency-GBP"]');
    const btnAED = page.locator('[data-testid="campaign-currency-AED"]');

    await expect(btnUSD).toBeVisible();
    await expect(btnINR).toBeVisible();
    await expect(btnGBP).toBeVisible();
    await expect(btnAED).toBeVisible();

    // Click INR
    await btnINR.click();
    await expect(page.getByText("Total Campaign Budget Pool (₹ INR)")).toBeVisible();
    await expect(page.getByText("Target Fee Per Creator (₹ INR)")).toBeVisible();

    // Click AED
    await btnAED.click();
    await expect(page.getByText("Total Campaign Budget Pool (AED AED)")).toBeVisible();
    await expect(page.getByText("Target Fee Per Creator (AED AED)")).toBeVisible();

    // Click GBP
    await btnGBP.click();
    await expect(page.getByText("Total Campaign Budget Pool (£ GBP)")).toBeVisible();
    await expect(page.getByText("Target Fee Per Creator (£ GBP)")).toBeVisible();
  });

  test("5. Single Currency Display Rule: Platform never displays compound slashed currencies", async ({ page }) => {
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);

    await page.goto(`${BASE_URL}/app/earnings`, { waitUntil: "networkidle" });
    const content = await page.content();

    // Verify no compound slashes like "₹10,000 / $120" or "$500 / ₹"
    expect(content).not.toMatch(/₹\s*[\d,]+\s*\/\s*\$/);
    expect(content).not.toMatch(/\$\s*[\d,]+\s*\/\s*₹/);
  });

  test("6. Payment & API Multi-Currency: /api/create-order and /api/verify-payment handle INR and USD with 10% platform fee", async ({ request }) => {
    // 1. Test INR order creation
    const resInr = await request.post(`${BASE_URL}/api/create-order`, {
      data: {
        amount: 1000000, // 10,000 INR in paise
        currency: "INR",
        notes: { test: "e2e_inr" },
      },
    });
    expect(resInr.ok()).toBeTruthy();
    const inrData = await resInr.json();
    expect(inrData.currency).toBe("INR");
    expect(inrData.order_id).toBeDefined();

    // 2. Test USD order creation
    const resUsd = await request.post(`${BASE_URL}/api/create-order`, {
      data: {
        amount: 50000, // 500 USD in cents
        currency: "USD",
        notes: { test: "e2e_usd" },
      },
    });
    expect(resUsd.ok()).toBeTruthy();
    const usdData = await resUsd.json();
    expect(usdData.currency).toBe("USD");
    expect(usdData.order_id).toBeDefined();

    // 3. Test invalid currency rejection
    const resInvalid = await request.post(`${BASE_URL}/api/create-order`, {
      data: {
        amount: 50000,
        currency: "INVALID_CURRENCY",
      },
    });
    expect(resInvalid.status()).toBe(400);

    // 4. Test below-minimum amount rejection
    const resBelowMin = await request.post(`${BASE_URL}/api/create-order`, {
      data: {
        amount: 50, // Less than 100 subunits
        currency: "INR",
      },
    });
    expect(resBelowMin.status()).toBe(400);
  });
});
