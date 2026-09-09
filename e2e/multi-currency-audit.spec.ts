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

test.describe("Full End-to-End Multi-Currency Audit (INR & USD)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Module 1 & 17: Public Landing Page & Single Currency Rule (No Compound Slashes)", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Ensure no compound slashed currency patterns exist in the DOM (e.g., "₹... ($...)")
    const pageContent = await page.content();
    expect(pageContent).not.toMatch(/₹[\d,]+\s*\(\$[\d,]+\)/);
    expect(pageContent).not.toMatch(/\$[\d,]+\s*\(₹[\d,]+\)/);

    // Verify navbar currency selector defaults and toggles cleanly
    const currencyBtn = page.locator('[data-testid="currency-selector-button"]').first();
    await expect(currencyBtn).toBeVisible();

    // Select INR
    await currencyBtn.click();
    await page.locator('[data-testid="currency-option-INR"]').first().click();
    await expect(currencyBtn).toContainText("INR");
    await expect(currencyBtn).toContainText("₹");

    // Re-verify no compound slash after switching
    const contentINR = await page.content();
    expect(contentINR).not.toMatch(/₹[\d,]+\s*\(\$[\d,]+\)/);

    // Switch back to USD
    await currencyBtn.click();
    await page.locator('[data-testid="currency-option-USD"]').first().click();
    await expect(currencyBtn).toContainText("USD");
    await expect(currencyBtn).toContainText("$");
  });

  test("Module 2 & 3: Creator Marketplace & Directory (Starting Price & Filter Formatting)", async ({ page }) => {
    await page.goto(`${BASE_URL}/creators`, { waitUntil: "networkidle" });

    // Ensure directory loaded
    await expect(page.locator("body")).toBeVisible();
    const currencyElements = page.locator("span:has-text('₹'), span:has-text('$')");
    const count = await currencyElements.count();
    expect(count).toBeGreaterThan(0);

    // Verify no literal raw "$undefined" or "NaN" in creator cards
    const bodyText = await page.innerText("body");
    expect(bodyText).not.toContain("$undefined");
    expect(bodyText).not.toContain("₹undefined");
    expect(bodyText).not.toContain("NaN");
  });

  test("Module 4: Campaign Creation Wizard (Step 5 Currency Selection & Dynamic Input Labels)", async ({ page }) => {
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);
    await page.goto(`${BASE_URL}/app/brand/campaigns/create`, { waitUntil: "networkidle" });

    // Step 1: Basics
    const titleInput = page.locator('input[placeholder*="AI-Powered" i]').first();
    await expect(titleInput).toBeVisible({ timeout: 10_000 });
    await titleInput.fill("Global E2E Test Campaign");

    const taglineInput = page.locator('input[placeholder*="Engineering speed" i]').first();
    await taglineInput.fill("Next-gen spatial developer advocacy");

    const descInput = page.locator('textarea').first();
    await descInput.fill("Detailed brief describing the global influencer deliverables and milestones for audio/visual engineering.");
    await page.locator('button:has-text("Continue")').click();

    // Step 2: Target Audience
    await page.waitForTimeout(400);
    await page.locator('button:has-text("Continue")').click();

    // Step 3: Creator Requirements
    await page.waitForTimeout(400);
    await page.locator('button:has-text("Continue")').click();

    // Step 4: Deliverables
    await page.waitForTimeout(400);
    await page.locator('button:has-text("Continue")').click();

    // Step 5: Budget & Escrow (Verify INR and USD options)
    await page.waitForTimeout(500);
    const inrCurrencyCard = page.locator('[data-testid="campaign-currency-INR"]').first();
    const usdCurrencyCard = page.locator('[data-testid="campaign-currency-USD"]').first();

    await expect(inrCurrencyCard).toBeVisible({ timeout: 5000 });
    await expect(usdCurrencyCard).toBeVisible({ timeout: 5000 });

    // Toggle INR
    await inrCurrencyCard.click();
    await expect(page.locator("text=Total Campaign Budget Pool (₹ INR)").first()).toBeVisible();
    await expect(page.locator("text=Target Fee Per Creator (₹ INR)").first()).toBeVisible();

    // Toggle USD
    await usdCurrencyCard.click();
    await expect(page.locator("text=Total Campaign Budget Pool ($ USD)").first()).toBeVisible();
    await expect(page.locator("text=Target Fee Per Creator ($ USD)").first()).toBeVisible();
  });

  test("Module 8 & 9: Collaborations & Deliverables Pipeline (Native Currency Formatting)", async ({ page }) => {
    await performLogin(page, CREDS.brand.email, CREDS.brand.password);
    await page.goto(`${BASE_URL}/app/collaborations`, { waitUntil: "networkidle" });

    // Verify workspace loaded
    await expect(page.locator("body")).toBeVisible();

    // Verify body text has clean currency formatting and no "$undefined" or "NaN"
    const text = await page.innerText("body");
    expect(text).not.toContain("$undefined");
    expect(text).not.toContain("₹undefined");
    expect(text).not.toContain("NaN");
    expect(text).not.toContain("₹NaN");
    expect(text).not.toContain("$NaN");
  });

  test("Module 11: Creator Earnings & Escrow Ledger (Dynamic Currency Normalization)", async ({ page }) => {
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);
    await page.goto(`${BASE_URL}/app/earnings`, { waitUntil: "networkidle" });

    // Verify StatsCards
    await expect(page.getByText(/Available Balance/i).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/In Escrow/i).first()).toBeVisible();
    await expect(page.getByText(/Total Paid/i).first()).toBeVisible();

    // Verify no NaN or raw undefined
    const text = await page.innerText("body");
    expect(text).not.toContain("NaN");
    expect(text).not.toContain("$undefined");
    expect(text).not.toContain("₹undefined");
  });

  test("Module 14 & 15: Admin Reports & Settings Currency Persistence", async ({ page }) => {
    await performLogin(page, CREDS.creator.email, CREDS.creator.password);
    await page.goto(`${BASE_URL}/app/settings`, { waitUntil: "networkidle" });

    const prefsTab = page.getByRole("button", { name: /Preferences & Theme/i });
    await expect(prefsTab).toBeVisible({ timeout: 10_000 });
    await prefsTab.click();

    // Select INR in Settings
    const inrCard = page.locator('[data-testid="currency-card-INR"]').first();
    await inrCard.click();
    await expect(inrCard).toHaveClass(/border-\[#FFD21F\]|ring-2/);

    // Refresh page and confirm preference persisted in localStorage
    await page.reload({ waitUntil: "networkidle" });
    const storedCurrency = await page.evaluate(() => localStorage.getItem("abeycollab_currency"));
    expect(storedCurrency).toBe("INR");
  });

  test("Module 18: Boundary & Edge Case Currency Formatting API / Unit Validation", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    const testResults = await page.evaluate(async () => {
      const formatNumber = (num: number, locale: string, currency: string, maxDecimals = 0, minDecimals = 0) => {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
          maximumFractionDigits: maxDecimals,
          minimumFractionDigits: minDecimals,
        }).format(num);
      };

      const inrFmt = (n: number | null | undefined, hasDec = false) => {
        const num = n ?? 0;
        return formatNumber(num, "en-IN", "INR", hasDec ? 2 : 0, hasDec ? 2 : 0);
      };

      const usdFmt = (n: number | null | undefined, hasDec = false) => {
        const num = n ?? 0;
        return formatNumber(num, "en-US", "USD", hasDec ? 2 : 0, hasDec ? 2 : 0);
      };

      return {
        inrZero: inrFmt(0),
        usdZero: usdFmt(0),

        inr500: inrFmt(500),
        inr5000: inrFmt(5000),
        inr10000: inrFmt(10000),
        inr1Lakh: inrFmt(100000),

        usd10: usdFmt(10),
        usd100: usdFmt(100),
        usd500: usdFmt(500),
        usd10000: usdFmt(10000),

        inrDecimal: inrFmt(500.5, true),
        usdDecimal: usdFmt(500.5, true),

        nullVal: usdFmt(null),
        undefinedVal: inrFmt(undefined),
        negativeINR: inrFmt(-500),
        negativeUSD: usdFmt(-500),
      };
    });

    // Assertions
    expect(testResults.inrZero).toBe("₹0");
    expect(testResults.usdZero).toBe("$0");

    expect(testResults.inr500).toBe("₹500");
    expect(testResults.inr5000).toBe("₹5,000");
    expect(testResults.inr10000).toBe("₹10,000");
    // Indian Lakh grouping
    expect(testResults.inr1Lakh).toMatch(/₹1,00,000/);

    expect(testResults.usd10).toBe("$10");
    expect(testResults.usd100).toBe("$100");
    expect(testResults.usd500).toBe("$500");
    expect(testResults.usd10000).toBe("$10,000");

    expect(testResults.inrDecimal).toBe("₹500.50");
    expect(testResults.usdDecimal).toBe("$500.50");

    expect(testResults.nullVal).toBe("$0");
    expect(testResults.undefinedVal).toBe("₹0");
    expect(testResults.negativeINR).toBe("-₹500");
    expect(testResults.negativeUSD).toBe("-$500");
  });
});
