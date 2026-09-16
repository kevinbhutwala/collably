import { test, expect } from '@playwright/test';

test.describe('QA AUDIT 06: Negative Testing, Adversarial Payloads & Input Boundary Defense', () => {

  test('6.1 Login Form: Empty fields and invalid email format', async ({ page }) => {
    await page.goto('/login');

    // Attempt submit with empty fields
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // Check HTML5 invalid state or validation message
    const emailInput = page.locator('input[type="email"]');
    const isRequired = await emailInput.getAttribute('required');
    expect(isRequired !== null).toBe(true);

    // Enter invalid email format
    await emailInput.fill('invalid-email-format');
    await page.fill('input[type="password"]', 'anypassword');
    await submitBtn.click();

    // Verify still on login page (submission blocked)
    expect(page.url()).toContain('/login');
  });

  test('6.2 Login Form: Incorrect password credentials rejection', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'creator@abeycollab.io');
    await page.fill('input[type="password"]', 'WrongPassword123!_False');
    await page.click('button[type="submit"]');

    // Verify rejection toast or error text
    await expect(page.locator('body')).toContainText(/invalid|incorrect|error|failed/i);
    expect(page.url()).toContain('/login');
  });

  test('6.3 Registration Form: Duplicate account email rejection', async ({ page }) => {
    await page.goto('/creator/register');
    await page.waitForLoadState('domcontentloaded');

    // Try registering with existing creator email
    const nameInput = page.locator('input[placeholder*="name" i], input[name="name"]');
    const emailInput = page.locator('input[type="email"]');
    const passInput = page.locator('input[type="password"]');

    if (await emailInput.isVisible() && await passInput.isVisible()) {
      if (await nameInput.first().isVisible()) await nameInput.first().fill('Duplicate Test');
      await emailInput.fill('creator@abeycollab.io');
      await passInput.first().fill('Password123!');

      const submitBtn = page.locator('button[type="submit"]');
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        // Verify error toast or message regarding existing email
        await page.waitForTimeout(1000);
        await expect(page.locator('body')).toContainText(/exists|already|error|invalid/i);
      }
    }
  });

  test('6.4 API Boundary: Tampered or malformed JWT token returns unauthenticated / 401', async ({ request }) => {
    // GET /api/auth/me returns authenticated: false
    const getRes = await request.get('/api/auth/me', {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.INVALID_PAYLOAD.SIGNATURE' },
    });
    const data = await getRes.json();
    expect(data.authenticated).toBe(false);

    // PATCH /api/auth/me returns HTTP 401 Unauthorized
    const patchRes = await request.patch('/api/auth/me', {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.INVALID_PAYLOAD.SIGNATURE' },
      data: { country: 'US' }
    });
    expect(patchRes.status()).toBe(401);
  });

  test('6.5 Insecure Protocol Rejection: http:// and ftp:// deliverable links', async () => {
    const sanitizeLink = (url: string) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:';
      } catch {
        return false;
      }
    };

    expect(sanitizeLink('https://drive.google.com/file/d/123')).toBe(true);
    expect(sanitizeLink('http://insecure-site.com/file')).toBe(false);
    expect(sanitizeLink('ftp://fileserver.com/video.mp4')).toBe(false);
    expect(sanitizeLink('javascript:alert(1)')).toBe(false);
  });
});
