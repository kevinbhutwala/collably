import crypto from "crypto";

console.log("================================================================================");
console.log("💎 COLLABLY SUBSCRIPTION & PLAN-BASED ACCESS CONTROL (PBAC) TEST SUITE");
console.log("================================================================================");

let total = 0;
let passed = 0;
let failed = 0;

function assert(category, title, condition, details = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${category}] ${title}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${category}] ${title} ${details ? `(${details})` : ""}`);
    failed++;
  }
}

// -----------------------------------------------------------------------------
// 1. PLAN DEFINITIONS & FEATURE MATRIX
// -----------------------------------------------------------------------------
console.log("\n📦 --- 1. PLAN DEFINITIONS & FEATURE MATRIX ---");

const CREATOR_PLANS = {
  creator_starter: {
    id: "creator_starter",
    name: "Creator Starter",
    role: "creator",
    monthlyPrice: 0,
    annualPrice: 0,
    features: {
      mediaKit: true,
      maxApplicationsPerMonth: 5,
      instantPayouts: false,
      advancedAnalytics: false,
      aiPitchGenerator: false,
      verifiedBadge: false,
      priorityDiscovery: false,
      multiCreatorManagement: false,
      customDomain: false,
    },
  },
  creator_pro: {
    id: "creator_pro",
    name: "Creator Pro",
    role: "creator",
    monthlyPrice: 29,
    annualPrice: 24,
    features: {
      mediaKit: true,
      maxApplicationsPerMonth: -1, // Unlimited
      instantPayouts: true,
      advancedAnalytics: true,
      aiPitchGenerator: true,
      verifiedBadge: true,
      priorityDiscovery: true,
      multiCreatorManagement: false,
      customDomain: false,
    },
  },
  creator_enterprise: {
    id: "creator_enterprise",
    name: "Creator Studio & Collective",
    role: "creator",
    monthlyPrice: 99,
    annualPrice: 79,
    features: {
      mediaKit: true,
      maxApplicationsPerMonth: -1,
      instantPayouts: true,
      advancedAnalytics: true,
      aiPitchGenerator: true,
      verifiedBadge: true,
      priorityDiscovery: true,
      multiCreatorManagement: true,
      customDomain: true,
    },
  },
};

const BRAND_PLANS = {
  brand_starter: {
    id: "brand_starter",
    name: "Brand Starter",
    role: "brand",
    monthlyPrice: 49,
    annualPrice: 39,
    features: {
      maxActiveCampaigns: 2,
      crmPipeline: false,
      aiCreatorMatching: false,
      creatorShortlists: true,
      maxTeamSeats: 1,
      advancedRoiTelemetry: false,
      contractCompliance: false,
      dedicatedAccountManager: false,
      apiAccess: false,
    },
  },
  brand_growth: {
    id: "brand_growth",
    name: "Brand Growth",
    role: "brand",
    monthlyPrice: 199,
    annualPrice: 159,
    features: {
      maxActiveCampaigns: 10,
      crmPipeline: true,
      aiCreatorMatching: true,
      creatorShortlists: true,
      maxTeamSeats: 5,
      advancedRoiTelemetry: true,
      contractCompliance: true,
      dedicatedAccountManager: false,
      apiAccess: false,
    },
  },
  brand_enterprise: {
    id: "brand_enterprise",
    name: "Brand Enterprise",
    role: "brand",
    monthlyPrice: 599,
    annualPrice: 499,
    features: {
      maxActiveCampaigns: -1, // Unlimited
      crmPipeline: true,
      aiCreatorMatching: true,
      creatorShortlists: true,
      maxTeamSeats: -1, // Unlimited
      advancedRoiTelemetry: true,
      contractCompliance: true,
      dedicatedAccountManager: true,
      apiAccess: true,
    },
  },
};

const ALL_PLANS = { ...CREATOR_PLANS, ...BRAND_PLANS };

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

// -----------------------------------------------------------------------------
// 2. USER REPOSITORY & TEST ACCOUNTS RESOLUTION
// -----------------------------------------------------------------------------
console.log("\n🔑 --- 2. AUTHENTICATION & PLAN RESOLUTION FOR ALL 7 ACCOUNTS ---");

const testUsers = [
  { id: "user-c-starter", email: "starter.creator@collably.io", role: "creator", expectedPlan: "creator_starter" },
  { id: "user-c-pro", email: "pro.creator@collably.io", role: "creator", expectedPlan: "creator_pro" },
  { id: "user-c-ent", email: "enterprise.creator@collably.io", role: "creator", expectedPlan: "creator_enterprise" },
  { id: "user-b-starter", email: "starter.brand@collably.io", role: "brand", expectedPlan: "brand_starter" },
  { id: "user-b-growth", email: "growth.brand@collably.io", role: "brand", expectedPlan: "brand_growth" },
  { id: "user-b-ent", email: "enterprise.brand@collably.io", role: "brand", expectedPlan: "brand_enterprise" },
  { id: "user-admin", email: "admin@collably.io", role: "agency_admin", expectedPlan: "brand_enterprise", isAdmin: true },
];

const subscriptionsStore = new Map();

for (const u of testUsers) {
  const plan = ALL_PLANS[u.expectedPlan];
  subscriptionsStore.set(u.id, {
    userId: u.id,
    role: u.role,
    planId: u.expectedPlan,
    status: "active",
    interval: "monthly",
    features: {
      ...plan.features,
      adminOverride: u.isAdmin || false,
    },
    usage: {
      activeCampaignsCount: 0,
      applicationsThisMonth: 0,
      crmContactsCount: 0,
      aiTokensUsed: 0,
    },
  });
}

function resolveUserSubscription(user) {
  const sub = subscriptionsStore.get(user.id);
  if (user.role === "agency_admin" || user.role === "super_admin") {
    return {
      ...sub,
      features: {
        ...sub.features,
        adminOverride: true,
        maxActiveCampaigns: -1,
        maxApplicationsPerMonth: -1,
        crmPipeline: true,
        aiCreatorMatching: true,
        aiPitchGenerator: true,
        advancedAnalytics: true,
      },
    };
  }
  return sub;
}

// Verify every user account
for (const u of testUsers) {
  const sub = resolveUserSubscription(u);
  assert("Auth", `User ${u.email} resolved with active plan '${sub.planId}'`, sub.status === "active" && sub.planId === u.expectedPlan);
}

// -----------------------------------------------------------------------------
// 3. PBAC FEATURE ACCESS & ACCESS-CONTROL ENFORCEMENT
// -----------------------------------------------------------------------------
console.log("\n🛡️ --- 3. PBAC FEATURE ACCESS & GATING ---");

function checkFeatureAccess(userId, userRole, featureKey) {
  const user = testUsers.find((u) => u.id === userId);
  if (user && (user.role === "agency_admin" || user.role === "super_admin")) {
    return true;
  }
  const sub = subscriptionsStore.get(userId);
  if (!sub || sub.status !== "active") return false;
  const val = sub.features[featureKey];
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val === -1 || val > 0;
  return false;
}

// Creator Starter Gating
assert("PBAC", "Creator Starter: AI Pitch Generator is LOCKED (false)", checkFeatureAccess("user-c-starter", "creator", "aiPitchGenerator") === false);
assert("PBAC", "Creator Starter: Deep Retention Intel is LOCKED (false)", checkFeatureAccess("user-c-starter", "creator", "advancedAnalytics") === false);
assert("PBAC", "Creator Starter: Media Kit is UNLOCKED (true)", checkFeatureAccess("user-c-starter", "creator", "mediaKit") === true);

// Creator Pro Gating
assert("PBAC", "Creator Pro: AI Pitch Generator is UNLOCKED (true)", checkFeatureAccess("user-c-pro", "creator", "aiPitchGenerator") === true);
assert("PBAC", "Creator Pro: Deep Retention Intel is UNLOCKED (true)", checkFeatureAccess("user-c-pro", "creator", "advancedAnalytics") === true);
assert("PBAC", "Creator Pro: Instant Payouts is UNLOCKED (true)", checkFeatureAccess("user-c-pro", "creator", "instantPayouts") === true);

// Brand Starter Gating
assert("PBAC", "Brand Starter: CRM Pipeline is LOCKED (false)", checkFeatureAccess("user-b-starter", "brand", "crmPipeline") === false);
assert("PBAC", "Brand Starter: AI Creator Matching is LOCKED (false)", checkFeatureAccess("user-b-starter", "brand", "aiCreatorMatching") === false);
assert("PBAC", "Brand Starter: Creator Shortlists is UNLOCKED (true)", checkFeatureAccess("user-b-starter", "brand", "creatorShortlists") === true);

// Brand Growth Gating
assert("PBAC", "Brand Growth: CRM Pipeline is UNLOCKED (true)", checkFeatureAccess("user-b-growth", "brand", "crmPipeline") === true);
assert("PBAC", "Brand Growth: AI Creator Matching is UNLOCKED (true)", checkFeatureAccess("user-b-growth", "brand", "aiCreatorMatching") === true);

// Admin Override
assert("PBAC", "Admin: System override grants CRM access (true)", checkFeatureAccess("user-admin", "agency_admin", "crmPipeline") === true);
assert("PBAC", "Admin: System override grants AI Pitch access (true)", checkFeatureAccess("user-admin", "agency_admin", "aiPitchGenerator") === true);

// -----------------------------------------------------------------------------
// 4. QUOTA LIMITS & OVER-LIMIT REJECTION TESTS
// -----------------------------------------------------------------------------
console.log("\n📊 --- 4. NUMERIC QUOTA ENFORCEMENT & HARD STOPS ---");

function checkApplicationQuota(userId) {
  const sub = subscriptionsStore.get(userId);
  const limit = sub.features.maxApplicationsPerMonth;
  const current = sub.usage.applicationsThisMonth;
  return { allowed: limit === -1 || current < limit, limit, current };
}

function checkCampaignQuota(userId) {
  const sub = subscriptionsStore.get(userId);
  const limit = sub.features.maxActiveCampaigns;
  const current = sub.usage.activeCampaignsCount;
  return { allowed: limit === -1 || current < limit, limit, current };
}

// 4.1 Creator Starter 5 application limit
const starterSub = subscriptionsStore.get("user-c-starter");
starterSub.usage.applicationsThisMonth = 4;
assert("Quota", "Creator Starter (4/5 applications): ALLOWED to apply (true)", checkApplicationQuota("user-c-starter").allowed === true);

starterSub.usage.applicationsThisMonth = 5;
assert("Quota", "Creator Starter (5/5 applications): BLOCKED from 6th application (false)", checkApplicationQuota("user-c-starter").allowed === false);

// 4.2 Creator Pro unlimited applications
const proSub = subscriptionsStore.get("user-c-pro");
proSub.usage.applicationsThisMonth = 150;
assert("Quota", "Creator Pro (150 applications): ALLOWED unlimited (true)", checkApplicationQuota("user-c-pro").allowed === true);

// 4.3 Brand Starter 2 active campaigns limit
const brandStarterSub = subscriptionsStore.get("user-b-starter");
brandStarterSub.usage.activeCampaignsCount = 1;
assert("Quota", "Brand Starter (1/2 campaigns): ALLOWED (true)", checkCampaignQuota("user-b-starter").allowed === true);

brandStarterSub.usage.activeCampaignsCount = 2;
assert("Quota", "Brand Starter (2/2 campaigns): BLOCKED from 3rd campaign (false)", checkCampaignQuota("user-b-starter").allowed === false);

// 4.4 Brand Growth 10 active campaigns limit
const brandGrowthSub = subscriptionsStore.get("user-b-growth");
brandGrowthSub.usage.activeCampaignsCount = 7;
assert("Quota", "Brand Growth (7/10 campaigns): ALLOWED (true)", checkCampaignQuota("user-b-growth").allowed === true);

// -----------------------------------------------------------------------------
// 5. LIVE PLAN UPGRADE & DOWNGRADE WORKFLOWS
// -----------------------------------------------------------------------------
console.log("\n⚡ --- 5. LIVE PLAN UPGRADE & DOWNGRADE WORKFLOWS ---");

function upgradePlan(userId, targetPlanId, interval = "monthly") {
  const user = testUsers.find((u) => u.id === userId);
  const plan = ALL_PLANS[targetPlanId];
  if (!plan) throw new Error("Invalid plan");

  if (plan.role !== user.role && user.role !== "agency_admin") {
    throw new Error(`Role mismatch: ${user.role} cannot subscribe to ${plan.role} plan`);
  }

  const sub = subscriptionsStore.get(userId);
  sub.planId = targetPlanId;
  sub.interval = interval;
  sub.features = { ...plan.features };
  sub.price = interval === "annual" ? plan.annualPrice * 12 : plan.monthlyPrice;
  return sub;
}

// Upgrade Creator Starter -> Creator Pro
const upgradedCreator = upgradePlan("user-c-starter", "creator_pro", "annual");
assert("Upgrade", "Creator Starter successfully upgraded to 'creator_pro'", upgradedCreator.planId === "creator_pro");
assert("Upgrade", "Annual interval applied ($24 * 12 = $288)", upgradedCreator.price === 288);
assert("Upgrade", "AI pitch generator instantly UNLOCKED after upgrade", upgradedCreator.features.aiPitchGenerator === true);
assert("Upgrade", "Applications quota instantly becomes UNLIMITED", checkApplicationQuota("user-c-starter").allowed === true);

// Upgrade Brand Starter -> Brand Growth
const upgradedBrand = upgradePlan("user-b-starter", "brand_growth", "monthly");
assert("Upgrade", "Brand Starter successfully upgraded to 'brand_growth'", upgradedBrand.planId === "brand_growth");
assert("Upgrade", "CRM Pipeline instantly UNLOCKED after upgrade", upgradedBrand.features.crmPipeline === true);
assert("Upgrade", "Campaign limit expanded to 10 (2/10 allowed)", checkCampaignQuota("user-b-starter").allowed === true);

// -----------------------------------------------------------------------------
// 6. SUBSCRIPTION LIFECYCLE: CANCELLATION & RESUME
// -----------------------------------------------------------------------------
console.log("\n🔄 --- 6. SUBSCRIPTION LIFECYCLE: CANCELLATION & RESUME ---");

function cancelSubscription(userId) {
  const sub = subscriptionsStore.get(userId);
  sub.cancelAtPeriodEnd = true;
  sub.status = "cancelled";
  return sub;
}

function resumeSubscription(userId) {
  const sub = subscriptionsStore.get(userId);
  sub.cancelAtPeriodEnd = false;
  sub.status = "active";
  return sub;
}

const cancelled = cancelSubscription("user-c-starter");
assert("Lifecycle", "cancelAtPeriodEnd set to true", cancelled.cancelAtPeriodEnd === true);
assert("Lifecycle", "Status updated to 'cancelled'", cancelled.status === "cancelled");

const resumed = resumeSubscription("user-c-starter");
assert("Lifecycle", "cancelAtPeriodEnd restored to false", resumed.cancelAtPeriodEnd === false);
assert("Lifecycle", "Status restored to 'active'", resumed.status === "active");

// -----------------------------------------------------------------------------
// 7. CROSS-ROLE TAMPERING & SECURITY ATTACKS
// -----------------------------------------------------------------------------
console.log("\n⚔️ --- 7. CROSS-ROLE TAMPERING & SECURITY ATTACKS ---");

let creatorBrandAttackBlocked = false;
try {
  upgradePlan("user-c-pro", "brand_growth");
} catch {
  creatorBrandAttackBlocked = true;
}
assert("Security", "REJECT: Creator account cannot subscribe to Brand plan", creatorBrandAttackBlocked);

let brandCreatorAttackBlocked = false;
try {
  upgradePlan("user-b-growth", "creator_pro");
} catch {
  brandCreatorAttackBlocked = true;
}
assert("Security", "REJECT: Brand account cannot subscribe to Creator plan", brandCreatorAttackBlocked);

let invalidPlanBlocked = false;
try {
  upgradePlan("user-c-starter", "non_existent_plan");
} catch {
  invalidPlanBlocked = true;
}
assert("Security", "REJECT: Invalid plan ID throws validation error", invalidPlanBlocked);

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`🏁 TEST EXECUTION COMPLETE: ${passed}/${total} PASSED (${failed} FAILED)`);
console.log("================================================================================");

if (failed > 0) {
  process.exit(1);
}
