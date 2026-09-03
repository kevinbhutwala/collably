import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Collably Dark Mode & Text Contrast Verification Suite', () => {

  test('01: Landing Page Dark Mode Toggle & Typography Visibility', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Find theme toggle button (first instance for desktop/mobile)
    const themeToggle = page.locator('button[aria-label*="Toggle theme"], button[title*="Switch to"]').first();
    await expect(themeToggle).toBeVisible({ timeout: 5000 });

    // Click to switch to dark mode
    await themeToggle.click();

    // Verify dark class is applied to html
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);

    // Verify heading text color in dark mode is light and clearly readable
    const heading = page.locator('h1').first();
    const headingColor = await heading.evaluate((el) => window.getComputedStyle(el).color);
    
    // Parse RGB to verify luminance is high (not black/dark)
    const match = headingColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    expect(match).not.toBeNull();
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      const luminance = (r + g + b) / 3;
      // Luminance must be bright (> 150)
      expect(luminance).toBeGreaterThan(150);
    }

    // Verify solar yellow button has dark text for contrast
    const solarButton = page.locator('button:has-text("Get Started")').first();
    if (await solarButton.count() > 0) {
      const btnColor = await solarButton.evaluate((el) => window.getComputedStyle(el).color);
      const btnMatch = btnColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (btnMatch) {
        const btnLuminance = (parseInt(btnMatch[1]) + parseInt(btnMatch[2]) + parseInt(btnMatch[3])) / 3;
        // Button text should be dark for high contrast against solar yellow
        expect(btnLuminance).toBeLessThan(80);
      }
    }
  });

  test('02: Authentication Form Visibility in Dark Mode', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('domcontentloaded');

    // Force dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('collably_theme', 'dark');
    });

    // Check heading
    const heading = page.locator('h1, h2').first();
    const headingColor = await heading.evaluate((el) => window.getComputedStyle(el).color);
    const match = headingColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const luminance = (parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3])) / 3;
      expect(luminance).toBeGreaterThan(150);
    }

    // Check input background and text color
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    if (await emailInput.count() > 0) {
      const inputColor = await emailInput.evaluate((el) => window.getComputedStyle(el).color);
      const inputBg = await emailInput.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      
      const textMatch = inputColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      const bgMatch = inputBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

      if (textMatch && bgMatch) {
        const textLum = (parseInt(textMatch[1]) + parseInt(textMatch[2]) + parseInt(textMatch[3])) / 3;
        const bgLum = (parseInt(bgMatch[1]) + parseInt(bgMatch[2]) + parseInt(bgMatch[3])) / 3;
        
        // Text must be brighter than background
        expect(textLum).toBeGreaterThan(bgLum + 50);
      }
    }
  });

  test('03: Messages Module Visibility & Theme in Dark Mode', async ({ page }) => {
    // Log in as creator
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"], input[name="email"]', 'creator@collably.io');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*(\/app|\/dashboard).*/, { timeout: 10000 });

    // Navigate to messages
    await page.goto(`${BASE_URL}/app/messages`);
    await page.waitForLoadState('domcontentloaded');

    // Toggle dark mode via Navbar button
    const navbarToggle = page.locator('button[aria-label*="Toggle theme"], button[title*="Switch to"]').first();
    await navbarToggle.click();

    // Verify dark class
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);

    // Verify channel list title is readable
    const title = page.locator('h2, h3').first();
    const titleColor = await title.evaluate((el) => window.getComputedStyle(el).color);
    const titleMatch = titleColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (titleMatch) {
      const lum = (parseInt(titleMatch[1]) + parseInt(titleMatch[2]) + parseInt(titleMatch[3])) / 3;
      expect(lum).toBeGreaterThan(150);
    }
  });

  test('04: Settings Appearance Tab & Theme Selector', async ({ page }) => {
    // Log in as creator
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"], input[name="email"]', 'creator@collably.io');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*(\/app|\/dashboard).*/, { timeout: 10000 });

    // Navigate to settings
    await page.goto(`${BASE_URL}/app/settings`);
    await page.waitForLoadState('domcontentloaded');

    // Click Appearance & Theme tab
    const appearanceTab = page.locator('button:has-text("Appearance"), button:has-text("Theme")').first();
    await expect(appearanceTab).toBeVisible({ timeout: 5000 });
    await appearanceTab.click();

    // Verify Light and Dark theme selector cards are rendered
    await expect(page.locator('text=Pure White & Solar')).toBeVisible();
    await expect(page.locator('text=Carbon Dark & Editorial')).toBeVisible();

    // Select Dark Theme
    await page.locator('text=Carbon Dark & Editorial').click();

    // Verify document has class 'dark'
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);
  });
});
