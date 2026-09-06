import { chromium } from "playwright";

async function main() {
  console.log("🚀 Running second transaction using Test UPI (test@razorpay)...");
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  const page = await context.newPage();

  await page.goto("https://abeycollab.vercel.app/login", { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  await page.goto("https://abeycollab.vercel.app/app/earnings", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const payBtn = page.locator('button:has-text("Pay with Razorpay")');
  await payBtn.click();
  await page.waitForTimeout(4000);

  const frame = page.frames().find((f) => f.url().includes("razorpay.com"));
  if (!frame) throw new Error("Frame not found");

  console.log("👆 Selecting UPI option...");
  const upiOption = frame.getByTestId("UPI").first();
  await upiOption.click();
  await page.waitForTimeout(1500);

  console.log("📱 Entering UPI ID test@razorpay...");
  const upiInput = frame.locator('input[placeholder*="UPI ID"], input[placeholder*="Google Pay"], input[name="vpa"]');
  if (await upiInput.isVisible({ timeout: 4000 })) {
    await upiInput.click();
    await upiInput.fill("test@razorpay");
    await page.waitForTimeout(500);

    const payNow = frame.locator('button:has-text("Pay Now"), button:has-text("Pay")').first();
    await payNow.click();
    console.log("💰 Clicked Pay with UPI!");
    await page.waitForTimeout(6000);
  }

  await page.screenshot({ path: "scratch/upi-payment-complete.png", fullPage: true });
  console.log("📸 Saved scratch/upi-payment-complete.png");
  await browser.close();
}

main().catch(console.error);
