import { ALL_PLANS, CREATOR_PLANS, BRAND_PLANS } from "../src/core/constants/index.ts";
import { subscriptionService } from "../src/server/services/subscription.service.ts";
import { subscriptionRepo } from "../src/server/repositories/subscription.repo.ts";
import { authService } from "../src/server/services/auth.service.ts";
import { userRepo } from "../src/server/repositories/user.repo.ts";
import { brandRepo } from "../src/server/repositories/brand.repo.ts";
import { creatorRepo } from "../src/server/repositories/creator.repo.ts";

console.log("================================================================================");
console.log("💎 COLLABLY SUBSCRIPTION & PLAN-BASED ACCESS CONTROL (PBAC) TEST SUITE");
console.log("================================================================================");

let total = 0;
let passed = 0;
let failed = 0;

function assert(category: string, title: string, condition: boolean, details: string = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${category}] ${title}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${category}] ${title} ${details ? `(${details})` : ""}`);
    failed++;
  }
}

async function runSubscriptionTests() {
  // ---------------------------------------------------------------------------
  // 1. PLAN DEFINITIONS & FEATURE MATRIX INTEGRITY
  // ---------------------------------------------------------------------------
  console.log("\n📦 --- 1. PLAN DEFINITIONS & FEATURE MATRIX ---");
  assert("Catalog", "Creator Starter is free forever ($0/mo)", CREATOR_PLANS.creator_starter.monthlyPrice === 0);
  assert("Catalog", "Creator Starter caps applications at 5/mo", CREATOR_PLANS.creator_starter.features.maxApplicationsPerMonth === 5);
  assert("Catalog", "Creator Pro has unlimited applications (-1)", CREATOR_PLANS.creator_pro.features.maxApplicationsPerMonth === -1);
  assert("Catalog", "Creator Pro has instant 2-hour payouts enabled", CREATOR_PLANS.creator_pro.features.instantPayouts === true);
  assert("Catalog", "Creator Pro has AI pitch generator enabled", CREATOR_PLANS.creator_pro.features.aiPitchGenerator === true);
  assert("Catalog", "Creator Enterprise has multi-creator management", CREATOR_PLANS.creator_enterprise.features.multiCreatorManagement === true);

  assert("Catalog", "Brand Starter caps active campaigns at 2", BRAND_PLANS.brand_starter.features.maxActiveCampaigns === 2);
  assert("Catalog", "Brand Starter has CRM pipeline locked (false)", BRAND_PLANS.brand_starter.features.crmPipeline === false);
  assert("Catalog", "Brand Growth allows 10 active campaigns", BRAND_PLANS.brand_growth.features.maxActiveCampaigns === 10);
  assert("Catalog", "Brand Growth has CRM pipeline unlocked (true)", BRAND_PLANS.brand_growth.features.crmPipeline === true);
  assert("Catalog", "Brand Growth has AI matching unlocked (true)", BRAND_PLANS.brand_growth.features.aiCreatorMatching === true);
  assert("Catalog", "Brand Enterprise allows unlimited campaigns (-1)", BRAND_PLANS.brand_enterprise.features.maxActiveCampaigns === -1);

  // ---------------------------------------------------------------------------
  // 2. AUTHENTICATION & SUBSCRIPTION RESOLUTION FOR ALL 7 ACCOUNTS
  // ---------------------------------------------------------------------------
  console.log("\n🔑 --- 2. AUTHENTICATION & PLAN RESOLUTION FOR ALL 7 ACCOUNTS ---");

  // Account 1: Creator Starter
  const acc1 = await authService.login("starter.creator@collably.io", "password123");
  const sub1 = await subscriptionService.getUserSubscription(acc1.user.id);
  assert("Auth", "Account 1: starter.creator logs in successfully", Boolean(acc1.token && acc1.user.role === "creator"));
  assert("Auth", "Account 1: starter.creator is on 'creator_starter' plan", sub1.planId === "creator_starter");
  assert("Auth", "Account 1: starter.creator status is 'active'", sub1.status === "active");

  // Account 2: Creator Pro
  const acc2 = await authService.login("pro.creator@collably.io", "password123");
  const sub2 = await subscriptionService.getUserSubscription(acc2.user.id);
  assert("Auth", "Account 2: pro.creator logs in successfully", Boolean(acc2.token && acc2.user.role === "creator"));
  assert("Auth", "Account 2: pro.creator is on 'creator_pro' plan", sub2.planId === "creator_pro");
  assert("Auth", "Account 2: pro.creator has advanced analytics flag", sub2.features.advancedAnalytics === true);
  assert("Auth", "Account 2: pro.creator has instant payouts flag", sub2.features.instantPayouts === true);

  // Account 3: Creator Enterprise
  const acc3 = await authService.login("enterprise.creator@collably.io", "password123");
  const sub3 = await subscriptionService.getUserSubscription(acc3.user.id);
  assert("Auth", "Account 3: enterprise.creator logs in successfully", Boolean(acc3.token));
  assert("Auth", "Account 3: enterprise.creator is on 'creator_enterprise' plan", sub3.planId === "creator_enterprise");
  assert("Auth", "Account 3: enterprise.creator has multi-creator management flag", sub3.features.multiCreatorManagement === true);

  // Account 4: Brand Starter
  const acc4 = await authService.login("starter.brand@collably.io", "password123");
  const sub4 = await subscriptionService.getUserSubscription(acc4.user.id);
  assert("Auth", "Account 4: starter.brand logs in successfully", Boolean(acc4.token && acc4.user.role === "brand"));
  assert("Auth", "Account 4: starter.brand is on 'brand_starter' plan", sub4.planId === "brand_starter");
  assert("Auth", "Account 4: starter.brand active campaigns limit is 2", sub4.features.maxActiveCampaigns === 2);

  // Account 5: Brand Growth
  const acc5 = await authService.login("growth.brand@collably.io", "password123");
  const sub5 = await subscriptionService.getUserSubscription(acc5.user.id);
  assert("Auth", "Account 5: growth.brand logs in successfully", Boolean(acc5.token && acc5.user.role === "brand"));
  assert("Auth", "Account 5: growth.brand is on 'brand_growth' plan", sub5.planId === "brand_growth");
  assert("Auth", "Account 5: growth.brand has CRM pipeline unlocked", sub5.features.crmPipeline === true);

  // Account 6: Brand Enterprise
  const acc6 = await authService.login("enterprise.brand@collably.io", "password123");
  const sub6 = await subscriptionService.getUserSubscription(acc6.user.id);
  assert("Auth", "Account 6: enterprise.brand logs in successfully", Boolean(acc6.token));
  assert("Auth", "Account 6: enterprise.brand is on 'brand_enterprise' plan", sub6.planId === "brand_enterprise");
  assert("Auth", "Account 6: enterprise.brand has unlimited active campaigns", sub6.features.maxActiveCampaigns === -1);

  // Account 7: Admin Override
  const acc7 = await authService.login("admin@collably.io", "admin123");
  const sub7 = await subscriptionService.getUserSubscription(acc7.user.id);
  assert("Auth", "Account 7: admin logs in successfully", Boolean(acc7.token && acc7.user.role === "agency_admin"));
  assert("Auth", "Account 7: admin has adminOverride capability", sub7.features.adminOverride === true);

  // ---------------------------------------------------------------------------
  // 3. PBAC FEATURE ACCESS & LOCKING VERIFICATION
  // ---------------------------------------------------------------------------
  console.log("\n🛡️ --- 3. PBAC FEATURE ACCESS & GATING ---");

  // Creator Starter: Locked AI Pitch & Deep Analytics
  const starterAiPitch = await subscriptionService.checkFeatureAccess(acc1.user.id, "aiPitchGenerator");
  const starterAnalytics = await subscriptionService.checkFeatureAccess(acc1.user.id, "advancedAnalytics");
  const starterMediaKit = await subscriptionService.checkFeatureAccess(acc1.user.id, "mediaKit");
  assert("PBAC", "Creator Starter: AI Pitch Generator is LOCKED (false)", starterAiPitch === false);
  assert("PBAC", "Creator Starter: Deep Retention Intel is LOCKED (false)", starterAnalytics === false);
  assert("PBAC", "Creator Starter: Media Kit is UNLOCKED (true)", starterMediaKit === true);

  // Creator Pro: Unlocked AI Pitch & Deep Analytics
  const proAiPitch = await subscriptionService.checkFeatureAccess(acc2.user.id, "aiPitchGenerator");
  const proAnalytics = await subscriptionService.checkFeatureAccess(acc2.user.id, "advancedAnalytics");
  const proInstantPayout = await subscriptionService.checkFeatureAccess(acc2.user.id, "instantPayouts");
  assert("PBAC", "Creator Pro: AI Pitch Generator is UNLOCKED (true)", proAiPitch === true);
  assert("PBAC", "Creator Pro: Deep Retention Intel is UNLOCKED (true)", proAnalytics === true);
  assert("PBAC", "Creator Pro: Instant Payouts is UNLOCKED (true)", proInstantPayout === true);

  // Brand Starter: Locked CRM & Deep ROI Telemetry
  const brandStarterCrm = await subscriptionService.checkFeatureAccess(acc4.user.id, "crmPipeline");
  const brandStarterAiMatch = await subscriptionService.checkFeatureAccess(acc4.user.id, "aiCreatorMatching");
  const brandStarterShortlists = await subscriptionService.checkFeatureAccess(acc4.user.id, "creatorShortlists");
  assert("PBAC", "Brand Starter: CRM Pipeline is LOCKED (false)", brandStarterCrm === false);
  assert("PBAC", "Brand Starter: AI Creator Matching is LOCKED (false)", brandStarterAiMatch === false);
  assert("PBAC", "Brand Starter: Creator Shortlists is UNLOCKED (true)", brandStarterShortlists === true);

  // Brand Growth: Unlocked CRM & AI Matching
  const brandGrowthCrm = await subscriptionService.checkFeatureAccess(acc5.user.id, "crmPipeline");
  const brandGrowthAiMatch = await subscriptionService.checkFeatureAccess(acc5.user.id, "aiCreatorMatching");
  assert("PBAC", "Brand Growth: CRM Pipeline is UNLOCKED (true)", brandGrowthCrm === true);
  assert("PBAC", "Brand Growth: AI Creator Matching is UNLOCKED (true)", brandGrowthAiMatch === true);

  // Admin Override on all features
  const adminCrm = await subscriptionService.checkFeatureAccess(acc7.user.id, "crmPipeline");
  const adminAiPitch = await subscriptionService.checkFeatureAccess(acc7.user.id, "aiPitchGenerator");
  assert("PBAC", "Admin: System override grants CRM access (true)", adminCrm === true);
  assert("PBAC", "Admin: System override grants AI Pitch access (true)", adminAiPitch === true);

  // ---------------------------------------------------------------------------
  // 4. QUOTA LIMITS & OVER-LIMIT REJECTION TESTS
  // ---------------------------------------------------------------------------
  console.log("\n📊 --- 4. NUMERIC QUOTA ENFORCEMENT & HARD STOPS ---");

  // Reset usage for clean test
  subscriptionRepo.updateByUserId(acc1.user.id, {
    planId: "creator_starter",
    features: { ...CREATOR_PLANS.creator_starter.features },
    usage: {
      activeCampaignsCount: 0,
      applicationsThisMonth: 4,
      crmContactsCount: 0,
      aiTokensUsed: 0,
      lastResetDate: new Date().toISOString(),
    },
  });

  const q1 = await subscriptionService.checkApplicationQuota(acc1.user.id);
  assert("Quota", "Creator Starter (4/5 applications): ALLOWED (true)", q1.allowed === true);

  // Increment to 5 (limit reached)
  await subscriptionService.recordUsage(acc1.user.id, "applicationsThisMonth", 1);
  const q2 = await subscriptionService.checkApplicationQuota(acc1.user.id);
  assert("Quota", "Creator Starter (5/5 applications): BLOCKED from applying (false)", q2.allowed === false);

  // Creator Pro unlimited applications
  subscriptionRepo.updateByUserId(acc2.user.id, {
    usage: {
      activeCampaignsCount: 0,
      applicationsThisMonth: 99,
      crmContactsCount: 0,
      aiTokensUsed: 0,
      lastResetDate: new Date().toISOString(),
    },
  });
  const qPro = await subscriptionService.checkApplicationQuota(acc2.user.id);
  assert("Quota", "Creator Pro (99 applications): ALLOWED unlimited (true)", qPro.allowed === true);

  // Brand Starter active campaigns quota enforcement
  const qBrand1 = await subscriptionService.checkCampaignQuota(acc4.user.id, 1);
  assert("Quota", "Brand Starter (1/2 active campaigns): ALLOWED (true)", qBrand1.allowed === true);

  const qBrand2 = await subscriptionService.checkCampaignQuota(acc4.user.id, 2);
  assert("Quota", "Brand Starter (2/2 active campaigns): BLOCKED from creating 3rd (false)", qBrand2.allowed === false);

  // Brand Growth 10 campaign capacity
  const qGrowth = await subscriptionService.checkCampaignQuota(acc5.user.id, 8);
  assert("Quota", "Brand Growth (8/10 active campaigns): ALLOWED (true)", qGrowth.allowed === true);

  // ---------------------------------------------------------------------------
  // 5. LIVE PLAN UPGRADE & DOWNGRADE WORKFLOWS
  // ---------------------------------------------------------------------------
  console.log("\n⚡ --- 5. LIVE PLAN UPGRADE & DOWNGRADE WORKFLOWS ---");

  // Upgrade Creator Starter -> Creator Pro
  const upgradedCreator = await subscriptionService.upgradeOrChangePlan(
    acc1.user.id,
    "creator_pro",
    "annual"
  );
  assert("Upgrade", "Creator Starter upgraded to 'creator_pro'", upgradedCreator.planId === "creator_pro");
  assert("Upgrade", "Annual interval applied ($24*12 = $288)", upgradedCreator.price === 288);
  assert("Upgrade", "AI pitch generator immediately unlocked after upgrade", upgradedCreator.features.aiPitchGenerator === true);

  // Check quota immediately unlocked
  const qUpgraded = await subscriptionService.checkApplicationQuota(acc1.user.id);
  assert("Upgrade", "Application quota immediately becomes UNLIMITED after upgrade", qUpgraded.allowed === true);

  // Upgrade Brand Starter -> Brand Growth
  const upgradedBrand = await subscriptionService.upgradeOrChangePlan(
    acc4.user.id,
    "brand_growth",
    "monthly"
  );
  assert("Upgrade", "Brand Starter upgraded to 'brand_growth'", upgradedBrand.planId === "brand_growth");
  assert("Upgrade", "CRM Pipeline immediately unlocked for brand", upgradedBrand.features.crmPipeline === true);

  // Check campaign capacity expanded to 10
  const qUpgradedBrand = await subscriptionService.checkCampaignQuota(acc4.user.id, 5);
  assert("Upgrade", "Brand can now create up to 10 active briefs (5/10 allowed)", qUpgradedBrand.allowed === true);

  // ---------------------------------------------------------------------------
  // 6. SUBSCRIPTION LIFECYCLE: CANCELLATION & RESUME
  // ---------------------------------------------------------------------------
  console.log("\n🔄 --- 6. SUBSCRIPTION LIFECYCLE: CANCELLATION & RESUME ---");

  // Schedule cancellation at period end
  const cancelledSub = await subscriptionService.cancelSubscription(acc1.user.id, false);
  assert("Lifecycle", "cancelAtPeriodEnd set to true", cancelledSub.cancelAtPeriodEnd === true);
  assert("Lifecycle", "Status updated to 'cancelled'", cancelledSub.status === "cancelled");

  // Resume subscription
  const resumedSub = await subscriptionService.resumeSubscription(acc1.user.id);
  assert("Lifecycle", "Subscription resumed: cancelAtPeriodEnd is false", resumedSub.cancelAtPeriodEnd === false);
  assert("Lifecycle", "Subscription resumed: status restored to 'active'", resumedSub.status === "active");

  // ---------------------------------------------------------------------------
  // 7. CROSS-ROLE TAMPERING & RBAC ADVERSARIAL ATTACKS
  // ---------------------------------------------------------------------------
  console.log("\n⚔️ --- 7. CROSS-ROLE TAMPERING & ATTACK ATTEMPTS ---");

  // Attack 1: Creator attempts to subscribe to a Brand plan
  let creatorBrandAttackFailed = false;
  try {
    await subscriptionService.upgradeOrChangePlan(acc2.user.id, "brand_growth");
  } catch (err: any) {
    creatorBrandAttackFailed = true;
  }
  assert("Security", "REJECT: Creator account cannot subscribe to Brand plan", creatorBrandAttackFailed);

  // Attack 2: Brand attempts to subscribe to a Creator plan
  let brandCreatorAttackFailed = false;
  try {
    await subscriptionService.upgradeOrChangePlan(acc5.user.id, "creator_pro");
  } catch (err: any) {
    brandCreatorAttackFailed = true;
  }
  assert("Security", "REJECT: Brand account cannot subscribe to Creator plan", brandCreatorAttackFailed);

  // Attack 3: Non-existent plan ID
  let invalidPlanFailed = false;
  try {
    await subscriptionService.upgradeOrChangePlan(acc1.user.id, "invalid_super_plan" as any);
  } catch (err: any) {
    invalidPlanFailed = true;
  }
  assert("Security", "REJECT: Non-existent plan ID throws validation error", invalidPlanFailed);

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log("\n================================================================================");
  console.log(`🏁 TEST EXECUTION COMPLETE: ${passed}/${total} PASSED (${failed} FAILED)`);
  console.log("================================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runSubscriptionTests().catch((err) => {
  console.error("Subscription test suite fatal error:", err);
  process.exit(1);
});
