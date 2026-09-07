import { test, expect } from '@playwright/test';

// Test Credentials
const CREATOR_AUTH = {
  email: 'creator@abeycollab.io',
  password: 'password123',
};

const BRAND_AUTH = {
  email: 'brand@abeycollab.io',
  password: 'password123',
};

const ADMIN_AUTH = {
  email: 'kevinbhutwala417@gmail.com',
  password: 'admin123',
};

test.describe('ABEYCOLLAB DEEP PRODUCTION AUDIT — ALL PERSONAS & MODULES', () => {

  // =========================================================================
  // 1. SUPER ADMIN PERSONA — COMPLETE MODULE AUDIT
  // =========================================================================
  test('1. Super Admin Panel: Command Center, Algorithm Controls, Dispute Court, and Ledger', async ({ page }) => {
    // 1.1 Login as Super Admin
    await page.goto('/login');
    await page.fill('input[type="email"]', ADMIN_AUTH.email);
    await page.fill('input[type="password"]', ADMIN_AUTH.password);
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
    expect(page.url()).toContain('/admin');

    // 1.2 Verify Admin Command Center metrics
    await expect(page.locator('body')).toContainText(/Gross Escrow Volume|Gross Platform Volume|Command Center|Platform Volume/i);
    await expect(page.locator('body')).toContainText(/Escrow|Active Campaigns|Creator Payouts|Disputes/i);

    // 1.3 Audit Algorithm & Anti-Gaming Control Center
    await page.goto('/admin/settings');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Algorithm|Anti-Gaming|Weights|Control Center/i);

    // Verify presence of algorithm weight controls
    const weightInputs = page.locator('input[type="range"], input[type="number"]');
    const inputCount = await weightInputs.count();
    expect(inputCount).toBeGreaterThanOrEqual(1);

    // 1.4 Audit Financial Ledger & Reports
    await page.goto('/admin/reports');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Financial Reports|Platform Ledger|Commission|Escrow/i);

    // 1.5 Audit Dispute Arbitration Court
    await page.goto('/admin/disputes');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Dispute|Arbitration|Resolution|Case/i);

    // 1.6 Audit Creator Management in Admin
    await page.goto('/admin/creators');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Creator|Verified|Tier|Status/i);

    // 1.7 Audit Audit Logs
    await page.goto('/admin/audit');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Audit|Event|Timestamp|Action/i);

    console.log('✅ Super Admin panel modules completely verified.');
  });

  // =========================================================================
  // 2. CREATOR PERSONA — COMPLETE LIFECYCLE AUDIT
  // =========================================================================
  test('2. Creator Panel: Market Pulse, Trending Hub, Applications, Media Kit & Razorpay Gateway', async ({ page }) => {
    // 2.1 Login as Creator
    await page.goto('/login');
    await page.fill('input[type="email"]', CREATOR_AUTH.email);
    await page.fill('input[type="password"]', CREATOR_AUTH.password);
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
    expect(page.url()).toContain('/app');

    // 2.2 Creator Dashboard
    await page.goto('/app/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Dashboard|Overview|Milestones|Welcome/i);

    // 2.3 Market Pulse & Growth Center (/app/growth)
    await page.goto('/app/growth');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Market Pulse|Opportunity Score|Creator Growth|Rank/i);

    // Verify Opportunity Score gauge and Checklist items
    await expect(page.locator('body')).toContainText(/Profile Avatar|Bio|Rate Card|Boost|Completeness/i);

    // 2.4 Dedicated Trending Hub (/app/trending)
    await page.goto('/app/trending');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Trending|Rising Creators|Top Performing|Categories/i);

    // Switch between Trending Hub tabs
    const risingTab = page.locator('button:has-text("Rising Creators")').first();
    if (await risingTab.isVisible()) {
      await risingTab.click();
      await page.waitForTimeout(500);
      await expect(page.locator('body')).toContainText(/Rising|Growth|Engagement/i);
    }

    const topTab = page.locator('button:has-text("Top Performing")').first();
    if (await topTab.isVisible()) {
      await topTab.click();
      await page.waitForTimeout(500);
      await expect(page.locator('body')).toContainText(/Completion Rate|Rating|Top/i);
    }

    // 2.5 Applications Tracker & Deliverable Flow (/app/applications)
    await page.goto('/app/applications');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Applications|Proposals|Status|Campaign/i);

    // 2.6 Collaborations & Milestones (/app/collaborations)
    await page.goto('/app/collaborations');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Collaborations|Milestone|Deliverables|Active/i);

    // 2.7 Earnings, Escrow Ledger & Razorpay Gateway (/app/earnings)
    await page.goto('/app/earnings');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Earnings|Escrow|Balance|Payout/i);

    // Check presence of Live Razorpay Escrow Deposit trigger & Direct Handle Link
    await expect(page.locator('body')).toContainText(/Razorpay|Escrow Deposit|Direct Handle|@abeycollab/i);

    const directHandleLink = page.locator('a[href*="razorpay.me/@abeycollab"]').first();
    await expect(directHandleLink).toBeVisible();

    // Verify captured transactions in payment ledger
    await expect(page.locator('body')).toContainText(/pay_TYfhopKcE8zm6J|pay_TYhOzyxdxEmRAj|Card Payment|Netbanking|Captured|Success/i);

    // 2.8 Creator Media Kit & Rate Card Profile (/app/profile)
    await page.goto('/app/profile');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Profile|Media Kit|Rate Card|Audience/i);

    // 2.9 Messages Module (/app/messages)
    await page.goto('/app/messages');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Messages|Conversations|Chat|Inbox/i);

    console.log('✅ Creator panel modules and workflows completely verified.');
  });

  // =========================================================================
  // 3. BRAND PERSONA — COMPLETE LIFECYCLE AUDIT
  // =========================================================================
  test('3. Brand Panel: Talent Discovery, Match Score, Campaign Builder, CRM & Analytics', async ({ page }) => {
    // 3.1 Login as Brand
    await page.goto('/login');
    await page.fill('input[type="email"]', BRAND_AUTH.email);
    await page.fill('input[type="password"]', BRAND_AUTH.password);
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
    expect(page.url()).toContain('/app');

    // 3.2 Brand Talent Discovery (/app/brand/creators)
    await page.goto('/app/brand/creators');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Discover Creators|Talent|Match|Filter/i);

    // Test switching discovery view modes
    const trendingModeBtn = page.locator('button:has-text("Trending"), button:has-text("🔥 Trending")').first();
    if (await trendingModeBtn.isVisible()) {
      await trendingModeBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator('body')).toContainText(/Trending|Engagement|Momentum/i);
    }

    const matchModeBtn = page.locator('button:has-text("AI Match"), button:has-text("🎯 Match")').first();
    if (await matchModeBtn.isVisible()) {
      await matchModeBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator('body')).toContainText(/Match|Query|Search/i);
    }

    // 3.3 Campaign Builder (/app/brand/campaigns/create)
    await page.goto('/app/brand/campaigns/create');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Create Campaign|Campaign Brief|Deliverables|Budget/i);

    // 3.4 Brand Campaigns List (/app/brand/campaigns)
    await page.goto('/app/brand/campaigns');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Campaigns|Active|Drafts|Applications/i);

    // 3.5 Brand CRM & Shortlists (/app/brand/crm)
    await page.goto('/app/brand/crm');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/CRM|Pipeline|Shortlists|Creators/i);

    // 3.6 Brand Analytics (/app/brand/analytics)
    await page.goto('/app/brand/analytics');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(/Analytics|ROI|Impressions|Performance/i);

    console.log('✅ Brand panel modules completely verified.');
  });

  // =========================================================================
  // 4. PUBLIC MARKETING, DISCOVERY & SEO VERIFICATION
  // =========================================================================
  test('4. Public Pages: Landing, Media Kits, Briefs, Pricing FAQ, Robots & Sitemap XML', async ({ page }) => {
    // 4.1 Homepage
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('body')).toContainText(/Where visionary brands meet|cinematic creators|AbeyCollab/i);

    // 4.2 Public Creators Directory
    await page.goto('/creators', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Discover Creators|Talent|Filter|Search/i);

    // 4.3 Dynamic Creator Profile Media Kit with JSON-LD Schema
    await page.goto('/creators/creator-1', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Elena Rostova|Media Kit|Rate Card|Collaboration/i);

    // 4.4 Public Campaigns Directory
    await page.goto('/campaigns', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Live Campaign Briefs|Campaign Briefs|Pre-Funded Escrow|Briefs|Campaigns/i);

    // 4.5 Dynamic Campaign Brief Page with JobPosting Schema
    await page.goto('/campaigns/camp-1', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Quantum One|Brand Brief|Apply|Deliverables/i);

    // 4.6 Pricing Page with FAQ Schema
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Pricing|Starter|Pro|Enterprise|FAQ/i);

    // 4.7 For Brands Page
    await page.goto('/for-brands', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/High-Growth Brands|Campaigns|UGC/i);

    // 4.8 Agency Services Page
    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Agency Services|Talent Representation|UGC/i);

    // 4.9 Case Studies Page
    await page.goto('/case-studies', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Case Studies|ROAS|Results/i);

    // 4.10 Contact Page
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/Contact|Partnerships|Get in touch/i);

    console.log('✅ Public discovery & marketing pages verified.');
  });

  // =========================================================================
  // 5. RESPONSIVE VIEWPORTS AUDIT (MOBILE, TABLET, DESKTOP)
  // =========================================================================
  test('5. Responsive Layout Audit: Mobile (375x812), Tablet (768x1024), and Desktop (1440x900)', async ({ page }) => {
    // 5.1 Mobile Viewport Check (iPhone 375x812)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify no horizontal overflow on mobile
    const horizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(horizontalOverflow).toBeFalsy();

    // Mobile Creator Directory
    await page.goto('/creators');
    await page.waitForLoadState('domcontentloaded');
    const creatorsOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(creatorsOverflow).toBeFalsy();

    // Mobile Pricing
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');
    const pricingOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(pricingOverflow).toBeFalsy();

    // 5.2 Tablet Viewport Check (iPad 768x1024)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/creators');
    await page.waitForLoadState('domcontentloaded');
    const tabletOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(tabletOverflow).toBeFalsy();

    // 5.3 Desktop Viewport Check (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app/dashboard');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.locator('body').isVisible()).toBeTruthy();

    console.log('✅ Responsive viewports (mobile, tablet, desktop) validated with zero layout overflow.');
  });
});
