import { chromium } from "playwright";

async function completeTransaction(paymentMethod = "Netbanking") {
  console.log(`\n💳 Executing Razorpay test transaction with method: ${paymentMethod}...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL || "https://abeycollab.vercel.app";
  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });

  // Log in as Brand
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');

  await page.waitForURL("**/app/dashboard", { timeout: 15000 });
  await page.goto(`${baseUrl}/app/earnings`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Click "Pay with Razorpay"
  const payButton = page.locator('button:has-text("Pay with Razorpay")');
  await payButton.waitFor({ state: "visible" });
  await payButton.click();

  // Wait for Razorpay frame
  await page.waitForTimeout(4000);
  const frame = page.frames().find(f => f.url().includes("razorpay.com"));
  if (!frame) {
    throw new Error("Razorpay frame not found");
  }
  console.log("✅ Attached to Razorpay Checkout iframe");

  // If Netbanking
  if (paymentMethod === "Netbanking") {
    console.log("🔍 Clicking 'Netbanking' option...");
    // In Razorpay v2, search for element with text Netbanking
    const nbBtn = frame.getByText("Netbanking", { exact: true });
    await nbBtn.waitFor({ state: "visible", timeout: 10000 });
    await nbBtn.click();
    await page.waitForTimeout(1500);

    // Look for bank buttons e.g. HDFC, ICICI, SBI
    console.log("🏦 Selecting test bank...");
    const bankOption = frame.locator('text="HDFC Bank", text="SBI", text="ICICI Bank", [data-testid*="bank"]').first();
    await bankOption.waitFor({ state: "visible", timeout: 10000 });
    await bankOption.click();
    await page.waitForTimeout(1000);

    // Click "Pay Now" / "Pay ₹500"
    console.log("💰 Clicking Pay button...");
    const payNowBtn = frame.locator('button:has-text("Pay"), button[type="submit"]').first();
    
    // In Razorpay test mode, clicking Pay with Netbanking opens a bank simulator window/tab
    const [popup] = await Promise.all([
      context.waitForEvent("page", { timeout: 15000 }).catch(() => null),
      payNowBtn.click()
    ]);

    if (popup) {
      console.log("🏦 Bank simulator opened at:", popup.url());
      await popup.waitForLoadState("networkidle");
      // Find Success button
      const successBtn = popup.locator('button:has-text("Success"), input[value="Success"], button:has-text("SUCCESS"), a:has-text("Success")').first();
      await successBtn.waitFor({ state: "visible", timeout: 10000 });
      console.log("👆 Clicking 'Success' on Bank Simulator...");
      await successBtn.click();
      console.log("✅ Bank simulator completed!");
    } else {
      console.log("ℹ️ Simulator opened inside iframe or redirect, checking frame...");
      const frameSuccessBtn = frame.locator('button:has-text("Success"), input[value="Success"]').first();
      if (await frameSuccessBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await frameSuccessBtn.click();
      }
    }
  }

  // Wait for verification call and toast
  console.log("⏳ Awaiting payment verification and platform recording...");
  await page.waitForTimeout(6000);

  const successToast = page.locator('text="Payment Successful"');
  const toastFound = await successToast.isVisible({ timeout: 5000 }).catch(() => false);
  console.log("🏁 Result:", toastFound ? "✅ TRANSACTION SUCCESSFUL & VERIFIED!" : "⚠️ Check screenshot");

  await page.screenshot({ path: `scratch/transaction-${paymentMethod}.png`, fullPage: true });
  await browser.close();

  return toastFound;
}

async function run() {
  await completeTransaction("Netbanking");
}

run().catch(console.error);
