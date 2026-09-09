import { test, expect } from '@playwright/test';

test.describe('AbeyCollab Logo & Brand Visual Audit', () => {
  test('landing page renders updated handshake emblem logo', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');

    // Check that AbeyCollab logo is visible
    const logo = page.locator('header').getByRole('link', { name: /AbeyCollab/i }).first();
    await expect(logo).toBeVisible();

    // Verify emblem image
    const emblem = logo.locator('img[alt="AbeyCollab"]');
    await expect(emblem).toBeVisible();

    // Take landing header screenshot
    await page.screenshot({
      path: '/Users/kevinbhutwala/.gemini/antigravity/brain/b1a88d3d-36a3-4615-ae9e-1d2460492955/.tempmediaStorage/logo_landing_header.png',
      clip: { x: 0, y: 0, width: 1280, height: 180 }
    });

    // Toggle dark mode via classList
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(400);

    // Take dark mode landing header screenshot
    await page.screenshot({
      path: '/Users/kevinbhutwala/.gemini/antigravity/brain/b1a88d3d-36a3-4615-ae9e-1d2460492955/.tempmediaStorage/logo_landing_dark_header.png',
      clip: { x: 0, y: 0, width: 1280, height: 180 }
    });
  });

  test('auth page renders updated handshake logo', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');

    // Header logo in auth layout
    const logo = page.locator('header').getByRole('link', { name: /AbeyCollab/i }).first();
    await expect(logo).toBeVisible();

    await page.screenshot({
      path: '/Users/kevinbhutwala/.gemini/antigravity/brain/b1a88d3d-36a3-4615-ae9e-1d2460492955/.tempmediaStorage/logo_auth_page.png',
      clip: { x: 0, y: 0, width: 1280, height: 260 }
    });
  });

  test('app dashboard header renders updated logo', async ({ page }) => {
    // Seed session in localStorage to access /app/dashboard
    await page.goto('http://localhost:3000/login');
    await page.evaluate(() => {
      localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user: {
            id: 'brand-test-1',
            name: 'Sarah Chen',
            email: 'sarah@aurorabeauty.com',
            role: 'brand',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            company: 'Aurora Beauty',
          },
          role: 'brand',
          isAuthenticated: true,
        },
        version: 0
      }));
    });

    await page.goto('http://localhost:3000/app/dashboard');
    await page.waitForLoadState('networkidle');

    // Dashboard header logo
    const dashboardLogo = page.locator('header').getByRole('link', { name: /AbeyCollab/i }).first();
    await expect(dashboardLogo).toBeVisible();

    await page.screenshot({
      path: '/Users/kevinbhutwala/.gemini/antigravity/brain/b1a88d3d-36a3-4615-ae9e-1d2460492955/.tempmediaStorage/logo_dashboard_header.png',
      clip: { x: 0, y: 0, width: 1280, height: 160 }
    });
  });
});
