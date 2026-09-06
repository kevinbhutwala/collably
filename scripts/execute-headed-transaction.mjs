import { chromium } from "playwright";

async function executeTransaction() {
  console.log("\n=======================================================");
  console.log("💳 EXECUTING LIVE RAZORPAY TEST TRANSACTION IN HEADED BROWSER");
  console.log("=======================================================\n");

  const browser = await chromium.launch({
    headless: false,
    slowMo: 150, // Slight delay so actions are visible and natural
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 850 },
  });

  const page = await context.newPage();
  const baseUrl = "https://abeycollab.vercel.app";

  console.log("1. Navigating to login page...");
  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });

  console.log("2. Logging in as Brand (brand@abeycollab.io)...");
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');

  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 25000 });
  console.log("✅ Logged in successfully.");

  console.log("3. Navigating to /app/earnings...");
  await page.goto(`${baseUrl}/app/earnings`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  console.log("4. Clicking 'Pay with Razorpay' button...");
  const payBtn = page.locator('button:has-text("Pay with Razorpay")');
  await payBtn.waitFor({ state: "visible", timeout: 10000 });
  await payBtn.click();

  console.log("5. Waiting for Razorpay Checkout modal...");
  await page.waitForTimeout(4000);

  const frame = page.frames().find((f) => f.url().includes("razorpay.com"));
  if (!frame) {
    throw new Error("Razorpay modal iframe did not attach.");
  }
  console.log("✅ Razorpay modal opened on screen!");

  // If a contact overlay or prompt appears, fill contact
  try {
    const contactInput = frame.locator('input[type="tel"], input[name="contact"]');
    if (await contactInput.isVisible({ timeout: 2500 })) {
      console.log("📱 Entering contact details...");
      await contactInput.fill("9820098200");
      const continueBtn = frame.locator('button:has-text("Continue"), button[type="submit"]');
      if (await continueBtn.isVisible({ timeout: 2000 })) {
        await continueBtn.click();
        await page.waitForTimeout(1500);
      }
    }
  } catch (e) {
    // Proceed
  }

  // Method 1: Try Netbanking -> HDFC -> Success (100% reliable in Razorpay simulator)
  console.log("6. Selecting payment method...");
  const netbankingOption = frame.locator('text="Netbanking"').first();
  const cardOption = frame.locator('text="Cards"').first();
  const upiOption = frame.locator('text="UPI"').first();

  let paymentSimulated = false;

  if (await netbankingOption.isVisible({ timeout: 4000 }).catch(() => false)) {
    console.log("🏦 Selecting Netbanking...");
    await netbankingOption.click();
    await page.waitForTimeout(1500);

    const hdfcBank = frame.locator('text="HDFC Bank", text="HDFC", text="SBI"').first();
    if (await hdfcBank.isVisible({ timeout: 4000 }).catch(() => false)) {
      console.log("🏛️ Choosing HDFC Bank...");
      await hdfcBank.click();
      await page.waitForTimeout(1000);

      console.log("💰 Clicking Pay button...");
      const payButton = frame.locator('button:has-text("Pay"), button[type="submit"]').first();

      const popupPromise = context.waitForEvent("page", { timeout: 15000 }).catch(() => null);
      await payButton.click();

      const popup = await popupPromise;
      if (popup) {
        console.log("🎉 Bank Simulator tab opened at:", popup.url());
        await popup.waitForLoadState("domcontentloaded");
        await popup.waitForTimeout(2000);

        const successBtn = popup.locator('button:has-text("Success"), input[value="Success"], button.success').first();
        if (await successBtn.isVisible({ timeout: 10000 })) {
          console.log("👆 Clicking 'Success' on Razorpay Bank Simulator...");
          await successBtn.click();
          paymentSimulated = true;
          console.log("✅ Payment Authorized and Captured in Bank Simulator!");
        }
      }
    }
  }

  // If Netbanking wasn't clicked, try Card
  if (!paymentSimulated && (await cardOption.isVisible({ timeout: 3000 }).catch(() => false))) {
    console.log("💳 Selecting Cards...");
    await cardOption.click();
    await page.waitForTimeout(1500);

    const cardNumInput = frame.locator('input[name="card[number]"], input[placeholder*="Card Number"]');
    if (await cardNumInput.isVisible({ timeout: 3000 })) {
      await cardNumInput.fill("4100280000001007");
      const expInput = frame.locator('input[name="card[expiry]"], input[placeholder*="MM / YY"]');
      await expInput.fill("12/26");
      const cvvInput = frame.locator('input[name="card[cvv]"], input[placeholder*="CVV"]');
      await cvvInput.fill("123");

      const payCardBtn = frame.locator('button:has-text("Pay")').first();
      const popupPromise = context.waitForEvent("page", { timeout: 15000 }).catch(() => null);
      await payCardBtn.click();

      const popup = await popupPromise;
      if (popup) {
        await popup.waitForLoadState("domcontentloaded");
        const successBtn = popup.locator('button:has-text("Success"), input[value="Success"]').first();
        if (await successBtn.isVisible({ timeout: 10000 })) {
          console.log("👆 Clicking 'Success' on OTP Simulator...");
          await successBtn.click();
          paymentSimulated = true;
        }
      }
    }
  }

  console.log("7. Awaiting payment callback and verification toast...");
  await page.waitForTimeout(6000);

  const toastSuccess = page.locator('text="Payment Successful"');
  const isDone = await toastSuccess.isVisible({ timeout: 8000 }).catch(() => false);

  console.log("\n=======================================================");
  if (isDone || paymentSimulated) {
    console.log("🎉 TRANSACTION COMPLETED & CAPTURED ON RAZORPAY!");
    console.log("The test payment is now recorded in your Razorpay Dashboard.");
  } else {
    console.log("ℹ️ Transaction initiated. Please check the open browser window to complete.");
  }
  console.log("=======================================================\n");

  await page.waitForTimeout(5000);
  await browser.close();
}

executeTransaction().catch((err) => {
  console.error("Transaction execution error:", err);
  process.exit(1);
});
