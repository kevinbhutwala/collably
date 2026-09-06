import { chromium } from "playwright";

async function main() {
  console.log("🚀 Executing second payment using Netbanking (HDFC Bank)...");
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

  console.log("👆 Selecting Netbanking...");
  const nbOption = frame.getByTestId("Netbanking").or(frame.getByText("Netbanking", { exact: true })).first();
  await nbOption.click();
  await page.waitForTimeout(1500);

  console.log("🏛️ Selecting HDFC Bank...");
  const hdfc = frame.locator('text="HDFC Bank", text="HDFC", [data-testid*="HDFC"]').first();
  await hdfc.click();
  await page.waitForTimeout(1000);

  console.log("💰 Clicking Pay button...");
  const payButton = frame.locator('button:has-text("Pay"), button[type="submit"]').first();
  const popupPromise = context.waitForEvent("page", { timeout: 20000 }).catch(() => null);
  await payButton.click();

  const popup = await popupPromise;
  if (popup) {
    console.log("🎉 Bank Simulator tab opened at:", popup.url());
    await popup.waitForLoadState("domcontentloaded");
    await popup.waitForTimeout(2000);

    const successBtn = popup.locator('button:has-text("Success"), input[value="Success"], button.success').first();
    await successBtn.waitFor({ state: "visible", timeout: 15000 });
    await successBtn.click();
    console.log("✅ Clicked Success in bank simulator!");
  } else {
    console.log("Checking frame for success button...");
    const frameSuccess = frame.locator('button:has-text("Success"), input[value="Success"]').first();
    if (await frameSuccess.isVisible({ timeout: 5000 }).catch(() => false)) {
      await frameSuccess.click();
      console.log("✅ Clicked Success in frame!");
    }
  }

  await page.waitForTimeout(6000);
  await page.screenshot({ path: "scratch/netbanking-complete.png", fullPage: true });
  console.log("📸 Saved scratch/netbanking-complete.png");
  await browser.close();
}

main().catch(console.error);
