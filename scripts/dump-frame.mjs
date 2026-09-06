import { chromium } from "playwright";
import fs from "fs";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL || "https://abeycollab.vercel.app";
  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', "brand@abeycollab.io");
  await page.fill('input[type="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 25000 });

  await page.goto(`${baseUrl}/app/earnings`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const payBtn = page.locator('button:has-text("Pay with Razorpay")');
  await payBtn.click();
  await page.waitForTimeout(5000);

  const frame = page.frames().find(f => f.url().includes("razorpay.com"));
  if (frame) {
    const html = await frame.content();
    fs.writeFileSync("scratch/razorpay-frame.html", html);
    console.log("Saved frame HTML to scratch/razorpay-frame.html, length:", html.length);
  }

  await browser.close();
}

main().catch(console.error);
