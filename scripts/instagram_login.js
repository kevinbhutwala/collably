const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const USERNAME = 'abeycollab';
const PASSWORD = process.env.INSTA_PASSWORD || 'Kevin@44';
const SESSION_FILE = path.join(__dirname, '../data/instagram_session.json');
const SCREENSHOT_PATH = path.join(__dirname, '../public/instagram_login_status.png');

async function loginInstagram() {
  console.log('[*] Launching Chromium browser on desktop (headful mode)...');
  const browser = await chromium.launch({
    headless: false, // Open real browser window on macOS desktop
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  try {
    console.log('[*] Navigating to Instagram login page...');
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle', timeout: 30000 });

    // Handle cookie consent if it appears
    try {
      const cookieButton = await page.$('button:has-text("Allow all cookies"), button:has-text("Decline optional cookies"), button:has-text("Only allow essential cookies")');
      if (cookieButton) {
        console.log('[*] Dismissing cookie consent dialog...');
        await cookieButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {}

    console.log('[*] Filling login credentials for @' + USERNAME + '...');
    const usernameInput = await page.waitForSelector('input[name="username"], input[type="text"], input[aria-label*="username" i], input[aria-label*="email" i]', { timeout: 15000 });
    await usernameInput.fill(USERNAME);
    await page.waitForTimeout(600);

    const passwordInput = await page.waitForSelector('input[name="password"], input[type="password"]', { timeout: 10000 });
    await passwordInput.fill(PASSWORD);
    await page.waitForTimeout(600);

    console.log('[*] Submitting login form (pressing Enter)...');
    await passwordInput.press('Enter');

    console.log('[*] Waiting for navigation and page load (up to 60 seconds)...');
    
    // Poll until logged in or timeout
    let loggedIn = false;
    for (let i = 0; i < 30; i++) {
      await page.waitForTimeout(2000);
      try {
        const url = page.url();
        console.log(`[*] [${i+1}/30] Current URL:`, url);

        if (url.includes('instagram.com') && !url.includes('/accounts/login/') && !url.includes('/auth_platform/recaptcha/') && !url.includes('/challenge/')) {
          // Check if feed or save login prompt is visible
          console.log('[+] Login SUCCESS! Detected feed/authenticated URL:', url);
          loggedIn = true;
          await page.waitForTimeout(3000);
          await context.storageState({ path: SESSION_FILE });
          console.log('[+] Session cookies saved to:', SESSION_FILE);
          break;
        } else if (url.includes('/recaptcha/')) {
          console.log('[!] reCAPTCHA challenge detected on screen.');
        } else if (url.includes('/two_factor') || url.includes('/challenge/')) {
          console.log('[!] 2FA / Security check detected on screen.');
        }
      } catch (err) {
        // Ignore navigation transient errors
      }
    }

    await page.screenshot({ path: SCREENSHOT_PATH });
    console.log('[+] Status screenshot saved to:', SCREENSHOT_PATH);

  } catch (error) {
    console.error('[!] Error during Instagram login:', error.message);
    try {
      await page.screenshot({ path: SCREENSHOT_PATH });
    } catch (e) {}
  } finally {
    await browser.close();
  }
}

loginInstagram();
