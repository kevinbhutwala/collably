import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await page.goto("https://abeycollab.vercel.app/login", { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 25000 });

  await page.goto("https://abeycollab.vercel.app/app/earnings", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const payBtn = page.locator('button:has-text("Pay with Razorpay")');
  await payBtn.click();
  await page.waitForTimeout(4000);

  const frame = page.frames().find(f => f.url().includes("razorpay.com"));
  if (frame) {
    // Click on Cards
    const cardOption = frame.getByText("Cards", { exact: true });
    if (await cardOption.isVisible()) {
      await cardOption.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: "scratch/cards-screen.png", fullPage: true });
      console.log("Saved scratch/cards-screen.png");
    }
  }

  await browser.close();
}

main().catch(console.error);
