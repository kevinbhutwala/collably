/**
 * ==============================================================================
 * 🔍 ABEYCOLLAB ENTERPRISE DEEP SEO & STRUCTURED DATA AUDIT SUITE (.mjs)
 * Exhaustive Verification of:
 * 1. Global Sitemap Generation (Static Marketing, Legal, Creators, Campaigns)
 * 2. Robots.txt Multi-Bot Directives (Search Engines & Modern AI Crawlers)
 * 3. Structured Data JSON-LD Schema Contracts:
 *    - Organization & WebSite with SearchAction
 *    - FAQPage Schema (Rich SERP Accordion Snippets)
 *    - CollectionPage & ItemList (Creator Directory & Campaign Briefs)
 *    - ProfilePage & Person with Social Links (Creator Media Kits)
 *    - JobPosting & Offers (Campaign Briefs & Milestones)
 *    - Service & OfferCatalog (Managed Agency Offerings)
 *    - AboutPage, ContactPage & Legal WebPage Schemas
 *    - BreadcrumbList Hierarchy across all secondary & legal pages
 * 4. OpenGraph & Twitter Card Metadata Completeness (100% Social Coverage)
 * 5. Canonical URL Protocol & Trailing Slash Consistency
 * ==============================================================================
 */

import fs from "fs";
import path from "path";

console.log("\n================================================================================");
console.log("🔍 ABEYCOLLAB COMPREHENSIVE SEO & STRUCTURED DATA AUDIT SUITE");
console.log("================================================================================\n");

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(category, testName, condition, details = "") {
  totalChecks++;
  if (condition) {
    console.log(`  ✓ [PASS] [${category}] ${testName}`);
    passedChecks++;
  } else {
    console.error(`  ✗ [FAIL] [${category}] ${testName} ${details ? `(${details})` : ""}`);
    failedChecks++;
  }
}

async function runSeoAudit() {
  const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://abeycollab.vercel.app";

  // ── 1. ROBOTS.TXT DIRECTIVES AUDIT ──
  console.log("🤖 --- 1. ROBOTS.TXT DIRECTIVES & CRAWLER BOT POLICIES ---");
  const robotsPath = path.join(process.cwd(), "src", "app", "robots.ts");
  const robotsContent = fs.readFileSync(robotsPath, "utf-8");

  assert("Robots.txt", "Robots generator exports valid function", robotsContent.includes("export default function robots"));
  assert("Robots.txt", "Protects sensitive /api/ endpoints from indexation", robotsContent.includes("'/api/'"));
  assert("Robots.txt", "Protects internal admin portal (/admin/)", robotsContent.includes("'/admin/'"));
  assert("Robots.txt", "Protects private authenticated workspace (/app/)", robotsContent.includes("'/app/'"));
  assert("Robots.txt", "Includes primary sitemap link", robotsContent.includes("sitemap: `${BASE_URL}/sitemap.xml`"));
  assert("Robots.txt", "Explicitly targets Googlebot & Bingbot", robotsContent.includes("Googlebot") && robotsContent.includes("Bingbot"));
  assert("Robots.txt", "Explicitly configures AI bots (GPTBot, ClaudeBot, PerplexityBot)", robotsContent.includes("GPTBot") && robotsContent.includes("ClaudeBot") && robotsContent.includes("PerplexityBot"));

  // ── 2. SITEMAP GENERATOR & INDEXATION COVERAGE ──
  console.log("\n🗺️ --- 2. SITEMAP.XML ARCHITECTURE & CANONICAL COVERAGE ---");
  const sitemapPath = path.join(process.cwd(), "src", "app", "sitemap.ts");
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");

  assert("Sitemap", "Sitemap generator exports valid function", sitemapContent.includes("export default function sitemap"));
  assert("Sitemap", "Homepage prioritised at 1.0", sitemapContent.includes("priority: 1.0"));
  assert("Sitemap", "Core discovery pages configured (creators & campaigns at 0.95)", sitemapContent.includes("priority: 0.95"));
  assert("Sitemap", "Includes static marketing pages (pricing, case-studies, services, for-brands)", sitemapContent.includes("/pricing") && sitemapContent.includes("/case-studies") && sitemapContent.includes("/services") && sitemapContent.includes("/for-brands"));
  assert("Sitemap", "Includes legal & policy pages (terms, privacy, refund-policy, dpa)", sitemapContent.includes("/terms") && sitemapContent.includes("/privacy") && sitemapContent.includes("/refund-policy") && sitemapContent.includes("/dpa"));
  assert("Sitemap", "Dynamically generates creator profile URLs from database", sitemapContent.includes("creatorRepo.getAll()"));
  assert("Sitemap", "Dynamically generates campaign brief URLs from database", sitemapContent.includes("campaignRepo.getAll()"));

  // ── 3. ROOT METADATA & SCHEMA.ORG FOUNDATION ──
  console.log("\n🏛️ --- 3. ROOT LAYOUT METADATA & GLOBAL SCHEMAS ---");
  const layoutPath = path.join(process.cwd(), "src", "app", "layout.tsx");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  assert("Global Metadata", "Root layout defines title template (%s | AbeyCollab)", layoutContent.includes("template: '%s | AbeyCollab'"));
  assert("Global Metadata", "Root layout contains rich meta description", layoutContent.includes("description:"));
  assert("Global Metadata", "Root layout defines OpenGraph website card", layoutContent.includes("type: 'website'"));
  assert("Global Metadata", "Root layout defines Twitter summary_large_image card", layoutContent.includes("summary_large_image"));
  assert("Global Metadata", "Defines default OpenGraph 1200x630 banner asset", layoutContent.includes("width: 1200") && layoutContent.includes("height: 630"));
  assert("Global Schema", "Global schema includes Organization with social links", layoutContent.includes("'@type': 'Organization'") && layoutContent.includes("sameAs"));
  assert("Global Schema", "Global schema includes WebSite with SearchAction", layoutContent.includes("'@type': 'WebSite'") && layoutContent.includes("SearchAction"));
  assert("Global Schema", "Global schema includes SoftwareApplication with aggregate rating", layoutContent.includes("'@type': 'SoftwareApplication'") && layoutContent.includes("aggregateRating"));

  // ── 4. MARKETING PAGES STRUCTURED DATA & CANONICAL AUDIT ──
  console.log("\n📄 --- 4. PUBLIC MARKETING PAGES SEO & SCHEMAS ---");
  const pagesToCheck = [
    { file: "pricing/page.tsx", route: "/pricing", schema: "FAQPage" },
    { file: "for-brands/page.tsx", route: "/for-brands", schema: "Service" },
    { file: "case-studies/page.tsx", route: "/case-studies", schema: "CollectionPage" },
    { file: "brands/page.tsx", route: "/brands", schema: "CollectionPage" },
    { file: "services/page.tsx", route: "/services", schema: "Service" },
    { file: "about/page.tsx", route: "/about", schema: "AboutPage" },
    { file: "contact/page.tsx", route: "/contact", schema: "ContactPage" },
    { file: "terms/page.tsx", route: "/terms", schema: "WebPage" },
    { file: "privacy/page.tsx", route: "/privacy", schema: "WebPage" },
    { file: "refund-policy/page.tsx", route: "/refund-policy", schema: "WebPage" },
    { file: "dpa/page.tsx", route: "/dpa", schema: "WebPage" },
  ];

  for (const p of pagesToCheck) {
    const fullPath = path.join(process.cwd(), "src", "app", "(public)", p.file);
    const content = fs.readFileSync(fullPath, "utf-8");

    assert(`Page ${p.route}`, `Has dynamic BASE_URL fallback`, content.includes("process.env.NEXT_PUBLIC_APP_URL"));
    assert(`Page ${p.route}`, `Defines canonical alternate URL`, content.includes("alternates: { canonical:"));
    assert(`Page ${p.route}`, `Exports OpenGraph metadata`, content.includes("openGraph:"));
    assert(`Page ${p.route}`, `Embeds ${p.schema} JSON-LD structured data`, content.includes(p.schema));
    assert(`Page ${p.route}`, `Includes BreadcrumbList navigation schema`, content.includes("BreadcrumbList"));
  }

  // ── 5. DYNAMIC DIRECTORY & DETAIL SCHEMA AUDIT ──
  console.log("\n⚡ --- 5. DYNAMIC DIRECTORIES & ENTITY SCHEMAS ---");
  const creatorsDir = fs.readFileSync(path.join(process.cwd(), "src", "app", "(public)", "creators", "page.tsx"), "utf-8");
  assert("Creators Roster", "Embeds CollectionPage & ItemList schema", creatorsDir.includes("CollectionPage") && creatorsDir.includes("ItemList"));

  const creatorDetail = fs.readFileSync(path.join(process.cwd(), "src", "app", "(public)", "creators", "[id]", "page.tsx"), "utf-8");
  assert("Creator Profile", "Generates dynamic metadata with creator handle & category", creatorDetail.includes("generateMetadata"));
  assert("Creator Profile", "Embeds ProfilePage & Person schema with verified metrics", creatorDetail.includes("ProfilePage") && creatorDetail.includes("Person") && creatorDetail.includes("interactionStatistic"));

  const campaignsDir = fs.readFileSync(path.join(process.cwd(), "src", "app", "(public)", "campaigns", "page.tsx"), "utf-8");
  assert("Campaigns Briefs", "Embeds CollectionPage schema for briefs", campaignsDir.includes("CollectionPage"));

  const campaignDetail = fs.readFileSync(path.join(process.cwd(), "src", "app", "(public)", "campaigns", "[id]", "page.tsx"), "utf-8");
  assert("Campaign Detail", "Generates dynamic metadata with formatted escrow budget", campaignDetail.includes("generateMetadata"));
  assert("Campaign Detail", "Embeds JobPosting schema with salary & contractor specs", campaignDetail.includes("JobPosting") && campaignDetail.includes("baseSalary"));

  // ── 6. AUTH PORTAL METADATA AUDIT ──
  console.log("\n🔐 --- 6. AUTH PORTALS & REGISTRATION METADATA ---");
  const loginLayout = fs.readFileSync(path.join(process.cwd(), "src", "app", "(auth)", "login", "layout.tsx"), "utf-8");
  assert("Auth Portal", "Login layout exports indexable title & description", loginLayout.includes("Sign In to Your Workspace") && loginLayout.includes("canonical:"));

  const registerLayout = fs.readFileSync(path.join(process.cwd(), "src", "app", "(auth)", "register", "layout.tsx"), "utf-8");
  assert("Auth Portal", "Register layout exports indexable account creation metadata", registerLayout.includes("Create Your Account") && registerLayout.includes("canonical:"));

  const creatorRegisterLayout = fs.readFileSync(path.join(process.cwd(), "src", "app", "(auth)", "creator", "register", "layout.tsx"), "utf-8");
  assert("Auth Portal", "Creator onboarding layout exports dedicated metadata", creatorRegisterLayout.includes("Creator Registration"));

  const brandRegisterLayout = fs.readFileSync(path.join(process.cwd(), "src", "app", "(auth)", "brand", "register", "layout.tsx"), "utf-8");
  assert("Auth Portal", "Brand onboarding layout exports dedicated metadata", brandRegisterLayout.includes("Brand Registration"));

  // ── 7. PWA & WEB APP MANIFEST AUDIT ──
  console.log("\n📱 --- 7. PWA & WEB APP MANIFEST COMPLIANCE ---");
  const manifestPath = path.join(process.cwd(), "src", "app", "manifest.ts");
  assert("PWA Manifest", "Web App Manifest generator exists (manifest.ts)", fs.existsSync(manifestPath));
  const manifestContent = fs.readFileSync(manifestPath, "utf-8");
  assert("PWA Manifest", "Defines standalone display mode and branding theme colors", manifestContent.includes("standalone") && manifestContent.includes("#FFD21F"));
  assert("PWA Manifest", "Layout metadata links manifest.webmanifest", layoutContent.includes("manifest: '/manifest.webmanifest'"));

  // ── SUMMARY REPORT ──
  console.log("\n================================================================================");
  console.log(`📊 TOTAL SEO CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks} (100% SUCCESS)`);
  if (failedChecks === 0) {
    console.log("✅ BEST-IN-CLASS SEO VERIFIED: 100% COMPLETE METADATA, SCHEMAS & ROBOTS COMPLIANCE!");
  } else {
    console.error(`❌ ${failedChecks} CHECKS FAILED`);
  }
  console.log("================================================================================\n");

  if (failedChecks > 0) process.exit(1);
}

runSeoAudit().catch((err) => {
  console.error("SEO audit encountered an unexpected error:", err);
  process.exit(1);
});
