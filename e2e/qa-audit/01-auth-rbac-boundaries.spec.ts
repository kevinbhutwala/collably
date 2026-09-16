import { test, expect } from '@playwright/test';

const CREATOR_USER = {
  email: 'creator@abeycollab.io',
  password: 'password123',
  expectedUrlSubstr: '/app/dashboard',
};

const BRAND_USER = {
  email: 'brand@abeycollab.io',
  password: 'password123',
  expectedUrlSubstr: '/app',
};

const ADMIN_USER = {
  email: 'kevinbhutwala417@gmail.com',
  password: 'admin123',
  expectedUrlSubstr: '/admin',
};

test.describe('QA AUDIT 01: Authentication, Session Persistence & RBAC Route Isolation', () => {

  test('1.1 Unauthenticated visitor is redirected away from protected routes', async ({ page }) => {
    await page.goto('/app/dashboard');
    await expect(page).toHaveURL(/\/login/);
    expect(page.url()).toContain('redirect');

    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);

    await page.goto('/app/brand/campaigns');
    await expect(page).toHaveURL(/\/login/);
  });

  test('1.2 Creator authentication, session persistence and logout', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', CREATOR_USER.email);
    await page.fill('input[type="password"]', CREATOR_USER.password);
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
    expect(page.url()).toContain(CREATOR_USER.expectedUrlSubstr);

    // Verify session persistence across page reload
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/app/dashboard');

    // Verify creator dashboard widgets
    await expect(page.locator('body')).toContainText(/Creator|Dashboard|Earnings|Active|Campaigns|Opportunities/i);

    // Test logout
    const logoutBtn = page.locator('button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout")');
    if (await logoutBtn.first().isVisible()) {
      await logoutBtn.first().click();
      await page.waitForURL(/\/login|\/$/, { timeout: 10000 });
    }
  });

  test('1.3 Brand authentication and brand workspace access', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', BRAND_USER.email);
    await page.fill('input[type="password"]', BRAND_USER.password);
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
    expect(page.url()).toContain('/app');

    // Brand accesses brand campaigns
    await page.goto('/app/brand/campaigns');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/app/brand/campaigns');
    await expect(page.locator('body')).toContainText(/Campaign|Create|Brief|Brand/i);
  });

  test('1.4 Super Admin authentication and command center access', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', ADMIN_USER.email);
    await page.fill('input[type="password"]', ADMIN_USER.password);
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
    expect(page.url()).toContain(ADMIN_USER.expectedUrlSubstr);

    await expect(page.locator('body')).toContainText(/Command Center|Admin|Escrow|Platform|Volume/i);
  });

  test('1.5 Tenant Isolation & RBAC: Creator cannot access Brand workspace or Admin panel', async ({ page }) => {
    // Login as creator
    await page.goto('/login');
    await page.fill('input[type="email"]', CREATOR_USER.email);
    await page.fill('input[type="password"]', CREATOR_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });

    // Attempt to access Admin command center -> Must be blocked
    await page.goto('/admin');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).not.toContain('/admin');
    expect(page.url()).toMatch(/dashboard|admin_required/);

    // Attempt to access Brand campaign creation -> Must be blocked
    await page.goto('/app/brand/campaigns/create');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).not.toContain('/app/brand/campaigns/create');
    expect(page.url()).toMatch(/dashboard|brand_access_denied/);
  });

  test('1.6 Tenant Isolation & RBAC: Brand cannot access Admin panel', async ({ page }) => {
    // Login as brand
    await page.goto('/login');
    await page.fill('input[type="email"]', BRAND_USER.email);
    await page.fill('input[type="password"]', BRAND_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });

    // Attempt to access Admin command center -> Must be blocked
    await page.goto('/admin');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).not.toContain('/admin');
    expect(page.url()).toMatch(/dashboard|admin_required/);
  });
});
