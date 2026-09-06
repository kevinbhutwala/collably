import { chromium } from "playwright";

async function main() {
  console.log("🚀 Launching browser to complete test card payment on Razorpay...");
  const browser = await chromium.launch({
    headless: false, // Visible window so simulator popup handles properly
    slowMo: 100,
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  const page = await context.newPage();

  console.log("1. Navigating to login...");
  await page.goto("https://abeycollab.vercel.app/login", { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  console.log("✅ Logged in successfully.");

  console.log("2. Navigating to /app/earnings...");
  await page.goto("https://abeycollab.vercel.app/app/earnings", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  console.log("3. Clicking 'Pay with Razorpay'...");
  const payBtn = page.locator('button:has-text("Pay with Razorpay")');
  await payBtn.click();
  await page.waitForTimeout(4000);

  const frame = page.frames().find((f) => f.url().includes("razorpay.com"));
  if (!frame) {
    throw new Error("Razorpay modal iframe not found.");
  }
  console.log("✅ Attached to Razorpay modal.");

  console.log("4. Selecting 'Cards'...");
  const cardsOption = frame.getByText("Cards", { exact: true });
  await cardsOption.click();
  await page.waitForTimeout(1000);

  console.log("5. Entering test card details (4100 2800 0000 1007, 12/26, 123)...");
  const cardInput = frame.locator('input[placeholder*="Card Number"], input[name="card[number]"]');
  await cardInput.click();
  await cardInput.fill("4100280000001007");
  await page.waitForTimeout(500);

  const expInput = frame.locator('input[placeholder*="MM / YY"], input[name="card[expiry]"]');
  await expInput.click();
  await expInput.fill("1226");
  await page.waitForTimeout(500);

  const cvvInput = frame.locator('input[placeholder*="CVV"], input[name="card[cvv]"]');
  await cvvInput.click();
  await cvvInput.fill("123");
  await page.waitForTimeout(500);

  console.log("6. Clicking Continue / Pay button...");
  const continueBtn = frame.locator('button:has-text("Continue"), button:has-text("Pay")').first();
  await continueBtn.click();
  await page.waitForTimeout(2000);

  // Check for "Save your card as per RBI guidelines?" prompt
  const maybeLaterBtn = frame.locator('button:has-text("Maybe later"), button:has-text("Pay without saving")').first();
  if (await maybeLaterBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log("👆 Clicking 'Maybe later' on RBI card save prompt...");
    const popupPromise = context.waitForEvent("page", { timeout: 20000 }).catch(() => null);
    await maybeLaterBtn.click();

    console.log("⏳ Awaiting 3D Secure / OTP Simulator tab...");
    const popup = await popupPromise;
    if (popup) {
      console.log("🎉 Bank Simulator / OTP popup opened at:", popup.url());
      await popup.waitForLoadState("domcontentloaded");
      await popup.waitForTimeout(2000);

      const successBtn = popup.locator('button:has-text("Success"), input[value="Success"], button.success').first();
      await successBtn.waitFor({ state: "visible", timeout: 15000 });
      console.log("👆 Clicking 'Success' on OTP Simulator...");
      await successBtn.click();
      console.log("✅ Clicked Success in bank simulator!");
    } else {
      console.log("Checking if simulator loaded inside frame...");
      const frameSuccess = frame.locator('button:has-text("Success"), input[value="Success"]').first();
      if (await frameSuccess.isVisible({ timeout: 5000 }).catch(() => false)) {
        await frameSuccess.click();
        console.log("✅ Clicked Success in frame simulator!");
      }
    }
  }

  console.log("7. Waiting for payment capture and verification...");
  await page.waitForTimeout(8000);

  await page.screenshot({ path: "scratch/card-payment-complete.png", fullPage: true });
  console.log("📸 Saved scratch/card-payment-complete.png");

  await browser.close();
}

main().catch((err) => {
  console.error("Payment error:", err);
  process.exit(1);
});
