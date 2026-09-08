import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("SEO, Metadata & Structured Data Validation", () => {
  test("1. Homepage (/): Title, Meta Description, Canonical, OG & FAQPage JSON-LD", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

    // Title & Description
    await expect(page).toHaveTitle(/AbeyCollab/i);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toContain("creator");
    expect(description?.length).toBeGreaterThan(50);

    // Canonical Tag
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/localhost|abeycollab/i);

    // OpenGraph & Twitter tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toContain("AbeyCollab");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toBeTruthy();

    // FAQPage JSON-LD Structured Data
    const faqSchemaScript = page.locator('script#homepage-faq-schema[type="application/ld+json"]');
    await expect(faqSchemaScript).toBeAttached();
    const faqContent = await faqSchemaScript.textContent();
    const parsedFaq = JSON.parse(faqContent || "{}");
    expect(parsedFaq["@type"]).toBe("FAQPage");
    expect(parsedFaq.mainEntity?.length).toBeGreaterThanOrEqual(4);
  });

  test("2. Creators Directory (/creators): Title, Meta, and CollectionPage Schema", async ({ page }) => {
    await page.goto(`${BASE_URL}/creators`, { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/Verified Creator Talent Directory/i);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toContain("creators");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/creators");

    const schemaScript = page.locator('script#creators-directory-schema[type="application/ld+json"]');
    await expect(schemaScript).toBeAttached();
    const rawContent = await schemaScript.textContent();
    const parsed = JSON.parse(rawContent || "[]");
    const collection = Array.isArray(parsed) ? parsed.find((s: any) => s["@type"] === "CollectionPage") : parsed;
    expect(collection?.["@type"]).toBe("CollectionPage");
  });

  test("3. Dynamic Creator Profile (/creators/[id]): Dynamic Metadata & Person Schema", async ({ page }) => {
    await page.goto(`${BASE_URL}/creators/creator-demo`, { waitUntil: "domcontentloaded" });

    // Dynamic Title should contain creator's name or handle
    const pageTitle = await page.title();
    expect(pageTitle).toMatch(/Creator Media Kit|AbeyCollab/i);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/creators/creator-demo");

    // Person / ProfilePage Schema
    const schemaScript = page.locator('script[id^="creator-schema-"][type="application/ld+json"]');
    await expect(schemaScript.first()).toBeAttached();
    const parsed = JSON.parse((await schemaScript.first().textContent()) || "[]");
    const profilePage = Array.isArray(parsed) ? parsed.find((s: any) => s["@type"] === "ProfilePage") : parsed;
    expect(profilePage?.["@type"]).toBe("ProfilePage");
    expect(profilePage?.mainEntity?.["@type"]).toBe("Person");
  });

  test("4. Campaigns Directory (/campaigns): Title, Meta, and CollectionPage Schema", async ({ page }) => {
    await page.goto(`${BASE_URL}/campaigns`, { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/Active Creator Campaigns & Brand Briefs/i);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toContain("briefs");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/campaigns");

    const schemaScript = page.locator('script#campaigns-directory-schema[type="application/ld+json"]');
    await expect(schemaScript).toBeAttached();
    const parsed = JSON.parse((await schemaScript.textContent()) || "[]");
    const collection = Array.isArray(parsed) ? parsed.find((s: any) => s["@type"] === "CollectionPage") : parsed;
    expect(collection?.["@type"]).toBe("CollectionPage");
  });

  test("5. Dynamic Campaign Brief (/campaigns/[id]): Dynamic Title & Breadcrumb Schema", async ({ page }) => {
    await page.goto(`${BASE_URL}/campaigns/camp-1`, { waitUntil: "domcontentloaded" });

    const pageTitle = await page.title();
    expect(pageTitle).toMatch(/Campaign Brief|AbeyCollab/i);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/campaigns/camp-1");

    const schemaScript = page.locator('script[id^="campaign-schema-"][type="application/ld+json"]');
    await expect(schemaScript.first()).toBeAttached();
    const parsed = JSON.parse((await schemaScript.first().textContent()) || "[]");
    const schemas = Array.isArray(parsed) ? parsed : [parsed];
    const hasBreadcrumb = schemas.some((s: any) => s["@type"] === "BreadcrumbList");
    expect(hasBreadcrumb).toBe(true);
    const hasJobPosting = schemas.some((s: any) => s["@type"] === "JobPosting");
    expect(hasJobPosting).toBe(true);
  });

  test("6. Marketing Pages (/for-brands, /pricing, /case-studies, /contact): Metadata & Canonicals", async ({ page }) => {
    // For Brands
    await page.goto(`${BASE_URL}/for-brands`, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Creator Marketing for High-Growth Brands/i);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain("/for-brands");

    // Pricing
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Pricing & Plans/i);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain("/pricing");

    // Case Studies
    await page.goto(`${BASE_URL}/case-studies`, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Creator Campaign Case Studies & Brand ROI Results/i);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain("/case-studies");

    // Contact
    await page.goto(`${BASE_URL}/contact`, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Contact Partnerships & Support/i);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain("/contact");
  });

  test("7. Crawlability: robots.txt & sitemap.xml endpoints return 200", async ({ page }) => {
    const robotsRes = await page.goto(`${BASE_URL}/robots.txt`);
    expect(robotsRes?.status()).toBe(200);
    const robotsText = await robotsRes?.text();
    expect(robotsText?.toLowerCase()).toContain("user-agent:");
    expect(robotsText).toContain("Disallow: /app/");
    expect(robotsText).toContain("Disallow: /admin/");
    expect(robotsText).toContain("sitemap.xml");

    const sitemapRes = await page.goto(`${BASE_URL}/sitemap.xml`);
    expect(sitemapRes?.status()).toBe(200);
    const sitemapText = await sitemapRes?.text();
    expect(sitemapText).toContain("<urlset");
    expect(sitemapText).toContain("/creators");
    expect(sitemapText).toContain("/campaigns");
  });
});
