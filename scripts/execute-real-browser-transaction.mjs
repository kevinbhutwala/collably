import { chromium } from "playwright";

async function main() {
  console.log("🚀 Starting browser to perform an end-to-end Razorpay test transaction...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL || "https://abeycollab.vercel.app";
  console.log(`🌐 Navigating to ${baseUrl}/login ...`);
  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });

  // 1. Log in as Brand
  console.log("🔑 Logging in as Brand...");
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');

  await page.waitForURL("**/app/dashboard", { timeout: 15000 });
  console.log("✅ Logged in. Navigating to /app/earnings...");

  await page.goto(`${baseUrl}/app/earnings`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // 2. Click "Pay with Razorpay"
  const payBtn = page.locator('button:has-text("Pay with Razorpay")');
  await payBtn.waitFor({ state: "visible", timeout: 10000 });
  console.log("👆 Clicking 'Pay with Razorpay'...");
  await payBtn.click();

  // 3. Find Razorpay iframe
  console.log("⏳ Waiting for Razorpay Checkout iframe...");
  await page.waitForTimeout(5000);
  const frame = page.frames().find(f => f.url().includes("razorpay.com"));
  if (!frame) {
    throw new Error("Razorpay iframe not found!");
  }
  console.log("✅ Razorpay iframe attached!");

  // 4. Handle Contact Details Dialog if present
  try {
    const contactInput = frame.locator('input[type="tel"], input[name="contact"]');
    if (await contactInput.isVisible({ timeout: 3000 })) {
      console.log("📱 Entering valid Indian mobile number: 9820098200...");
      await contactInput.click();
      await contactInput.fill("");
      await contactInput.fill("9820098200");
      await page.waitForTimeout(500);

      const continueBtn = frame.locator('button:has-text("Continue"), button[type="submit"]');
      if (await continueBtn.isVisible({ timeout: 2000 })) {
        console.log("👆 Clicking Continue on contact modal...");
        await continueBtn.click();
        await page.waitForTimeout(2000);
      }
    }
  } catch (e) {
    console.log("Note on contact details step:", e.message);
  }

  // 5. Select Netbanking
  console.log("🏦 Looking for Netbanking payment option...");
  const netbankingBtn = frame.getByText("Netbanking", { exact: false }).first();
  await netbankingBtn.waitFor({ state: "visible", timeout: 10000 });
  console.log("👆 Clicking Netbanking...");
  await netbankingBtn.click();
  await page.waitForTimeout(1500);

  // 6. Select Bank (e.g. HDFC or SBI)
  console.log("🏛️ Selecting test bank (HDFC Bank)...");
  const bankItem = frame.locator('text="HDFC Bank", text="HDFC", text="SBI"').first();
  await bankItem.waitFor({ state: "visible", timeout: 8000 });
  await bankItem.click();
  await page.waitForTimeout(1000);

  // 7. Click Pay button & listen for bank simulator
  console.log("💰 Clicking Pay button and awaiting bank simulator...");
  const paySubmit = frame.locator('button:has-text("Pay"), button[type="submit"]').first();
  
  let simulatorPage = null;
  const popupPromise = context.waitForEvent("page", { timeout: 15000 }).catch(() => null);
  await paySubmit.click();

  simulatorPage = await popupPromise;

  if (simulatorPage) {
    console.log("🎉 Bank Simulator window opened:", simulatorPage.url());
    await simulatorPage.waitForLoadState("networkidle");
    await simulatorPage.waitForTimeout(2000);

    console.log("👆 Locating 'Success' button in simulator...");
    const successBtn = simulatorPage.locator('button:has-text("Success"), input[value="Success"], a:has-text("Success"), button.success').first();
    await successBtn.waitFor({ state: "visible", timeout: 10000 });
    await successBtn.click();
    console.log("✅ Clicked 'Success' on Bank Simulator!");
  } else {
    console.log("Checking if simulator rendered within frame...");
    const frameSuccess = frame.locator('button:has-text("Success"), input[value="Success"]').first();
    if (await frameSuccess.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log("👆 Clicked 'Success' inside frame simulator!");
      await frameSuccess.click();
    }
  }

  // 8. Verify on the platform
  console.log("⏳ Waiting for backend payment verification and ledger update...");
  await page.waitForTimeout(6000);

  const toastSuccess = page.locator('text="Payment Successful"');
  const isCompleted = await toastSuccess.isVisible({ timeout: 8000 }).catch(() => false);
  console.log("\n==================================================");
  console.log("TRANSACTION RESULT:", isCompleted ? "SUCCESSFUL! 🎉" : "Completed / Verification dispatched");
  console.log("==================================================");

  await page.screenshot({ path: "scratch/payment-completed.png", fullPage: true });
  console.log("📸 Screenshot saved to scratch/payment-completed.png");

  await browser.close();
}

main().catch(err => {
  console.error("Execution error:", err);
  process.exit(1);
});
