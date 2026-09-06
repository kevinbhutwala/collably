import { chromium } from "playwright";

async function main() {
  console.log("🚀 Launching Chromium browser to execute Razorpay test transaction...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL || "https://abeycollab.vercel.app";
  console.log(`🌐 Navigating to ${baseUrl}/login ...`);
  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });

  // 1. Log in as Brand
  console.log("🔑 Logging in as Brand (brand@abeycollab.io)...");
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');

  await page.waitForURL("**/app/dashboard", { timeout: 15000 });
  console.log("✅ Logged in successfully. Navigating to /app/earnings...");

  // 2. Navigate to Earnings
  await page.goto(`${baseUrl}/app/earnings`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // 3. Find and click "Pay with Razorpay" button
  console.log("💳 Looking for 'Pay with Razorpay' button...");
  const payButton = page.locator('button:has-text("Pay with Razorpay")');
  await payButton.waitFor({ state: "visible", timeout: 10000 });
  console.log("👆 Clicking 'Pay with Razorpay' button...");
  await payButton.click();

  // 4. Wait for Razorpay Checkout iframe
  console.log("⏳ Waiting for Razorpay Checkout iframe to attach...");
  const rzpFrameLocator = page.frameLocator('iframe.razorpay-checkout-frame');
  
  // Wait up to 15s for the modal content inside iframe
  await page.waitForTimeout(4000);

  console.log("🔍 Inspecting Razorpay modal inside frame...");
  
  // Try to find Netbanking or Card options
  const frame = page.frames().find(f => f.url().includes("razorpay.com"));
  if (frame) {
    console.log("✅ Found Razorpay iframe URL:", frame.url());
    
    // Check if phone/contact input is requested first
    const contactInput = frame.locator('input[type="tel"], input[name="contact"], input[placeholder*="Phone"], input[placeholder*="mobile"]');
    if (await contactInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log("📱 Entering contact number...");
      await contactInput.fill("9876543210");
      const proceedBtn = frame.locator('button:has-text("Proceed"), button:has-text("Continue")');
      if (await proceedBtn.isVisible().catch(() => false)) {
        await proceedBtn.click();
        await page.waitForTimeout(2000);
      }
    }

    // Look for Netbanking option
    console.log("🏦 Checking for Netbanking option...");
    const netbankingOption = frame.locator('text="Netbanking", div:has-text("Netbanking")').first();
    if (await netbankingOption.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log("👆 Selecting Netbanking...");
      await netbankingOption.click();
      await page.waitForTimeout(1000);

      // Select any bank e.g. HDFC or SBI
      const hdfcBank = frame.locator('text="HDFC", text="SBI", text="ICICI"').first();
      if (await hdfcBank.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log("🏦 Selecting Bank...");
        await hdfcBank.click();
      }

      // Click Pay
      const submitPay = frame.locator('button[type="submit"], button:has-text("Pay")').first();
      if (await submitPay.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log("💰 Clicking Pay button...");
        
        // Listen for new page/popup (bank simulator)
        const [popup] = await Promise.all([
          context.waitForEvent("page", { timeout: 10000 }).catch(() => [null]),
          submitPay.click()
        ]);

        if (popup) {
          console.log("🎉 Bank simulator popup opened:", popup.url());
          await popup.waitForLoadState("networkidle");
          // Click "Success" button in bank simulator
          const successBtn = popup.locator('button:has-text("Success"), input[value="Success"], a:has-text("Success")').first();
          if (await successBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
            console.log("✅ Clicking 'Success' on Bank Simulator...");
            await successBtn.click();
          }
        }
      }
    } else {
      console.log("⚠️ Netbanking selector not found directly, dumping visible frame text:");
      const bodyText = await frame.locator("body").innerText().catch(() => "N/A");
      console.log(bodyText.substring(0, 300));
    }
  } else {
    console.log("⚠️ Razorpay frame not found in page.frames(). Available frames:", page.frames().map(f => f.url()));
  }

  // Wait for payment completion toast or response
  await page.waitForTimeout(5000);
  const successToast = page.locator('text="Payment Successful"');
  const isSuccess = await successToast.isVisible({ timeout: 5000 }).catch(() => false);
  console.log("🏁 Transaction result:", isSuccess ? "SUCCESSFUL 🎉" : "Pending or manual check needed");

  await page.screenshot({ path: "scratch/razorpay-transaction-result.png", fullPage: true });
  console.log("📸 Saved screenshot to scratch/razorpay-transaction-result.png");

  await browser.close();
}

main().catch(err => {
  console.error("Script error:", err);
  process.exit(1);
});
