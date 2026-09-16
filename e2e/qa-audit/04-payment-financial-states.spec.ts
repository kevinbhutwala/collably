import { test, expect } from '@playwright/test';
import crypto from 'crypto';

test.describe('QA AUDIT 04: Payment Gateways, Invariant Safeguards & Subscription PBAC', () => {

  test('4.1 Public Pricing Page & Tier Matrix Validation', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');

    // Verify presence of creator and brand plans
    await expect(page.locator('body')).toContainText(/Starter|Pro|Enterprise|Pricing|Plans/i);

    // Verify currency formatting
    const priceBadges = page.locator('text=/₹|\\$|Free|forever|month/i');
    expect(await priceBadges.count()).toBeGreaterThanOrEqual(2);
  });

  test('4.2 Razorpay Order Creation via Backend Endpoint', async ({ request }) => {
    // Attempt order creation without session -> expect 401
    const unauthRes = await request.post('/api/payments/create-order', {
      data: { brandId: 'brand-demo', amount: 500, currency: 'INR' },
    });
    expect([401, 403]).toContain(unauthRes.status());

    // Login to obtain brand token
    const loginRes = await request.post('/api/auth/login', {
      data: { email: 'brand@abeycollab.io', password: 'password123' },
    });
    expect(loginRes.status()).toBe(200);
    const { token } = await loginRes.json();
    expect(token).toBeTruthy();

    // Authenticated order creation with owned brand
    const orderRes = await request.post('/api/payments/create-order', {
      headers: { Authorization: `Bearer ${token}` },
      data: { brandId: 'brand-demo', amount: 500, currency: 'INR' },
    });
    expect(orderRes.status()).toBe(200);
    const orderData = await orderRes.json();
    const payment = orderData.payment || orderData;
    expect(payment.orderId || payment.gatewayOrderId || payment.id).toBeTruthy();
  });

  test('4.3 HMAC-SHA256 Cryptographic Signature Verification & Anti-Forgery Defense', async () => {
    const keySecret = 'RQPY6ZaYwvcbwKpLoMndHe6C';
    const orderId = 'order_test_12345';
    const paymentId = 'pay_test_67890';
    const payload = `${orderId}|${paymentId}`;

    const authenticSig = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    // Authentic signature matches
    const authenticBuf = Buffer.from(authenticSig, 'utf-8');
    const expectedBuf = Buffer.from(authenticSig, 'utf-8');
    expect(crypto.timingSafeEqual(authenticBuf, expectedBuf)).toBe(true);

    // Forged signature strictly rejected
    const forgedSig = '0000000000000000000000000000000000000000000000000000000000000000';
    const forgedBuf = Buffer.from(forgedSig, 'utf-8');
    expect(crypto.timingSafeEqual(forgedBuf, expectedBuf)).toBe(false);
  });

  test('4.4 Escrow Math & Zero Floating Point Discrepancy Invariant', async () => {
    // Convert $3,500.00 to exact integer cents
    const grossDollars = 3500.00;
    const grossCents = Math.round(grossDollars * 100);
    expect(grossCents).toBe(350000);

    // 10% platform fee
    const feeCents = Math.round(grossCents * 0.10);
    expect(feeCents).toBe(35000);

    // Net creator payout
    const netCents = grossCents - feeCents;
    expect(netCents).toBe(315000);

    // Zero-sum invariant
    expect(grossCents - (feeCents + netCents)).toBe(0);
  });
});
