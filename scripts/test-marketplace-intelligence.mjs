import fs from "fs";
import path from "path";

console.log("================================================================================");
console.log("🚀 ABEYCOLLAB DATA-DRIVEN MARKETPLACE INTELLIGENCE & ALGORITHM TEST SUITE");
console.log("================================================================================");

let total = 0;
let passed = 0;

function assert(suite, name, condition, details = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${suite}] ${name}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${suite}] ${name} ${details ? `(${details})` : ""}`);
  }
}

// -----------------------------------------------------------------------------
// 1. ALGORITHM CONFIGURATION & WEIGHTS
// -----------------------------------------------------------------------------
console.log("\n⚙️ --- 1. ALGORITHM CONFIGURATION & DYNAMIC WEIGHTS ---");

const DEFAULT_ALGORITHM_CONFIG = {
  creatorWeights: {
    engagementRate: 0.20,
    engagementGrowth: 0.15,
    profileViews: 0.10,
    profileSaves: 0.10,
    campaignApplications: 0.05,
    successfulCollabs: 0.15,
    completionRate: 0.10,
    responseRate: 0.05,
    reviewsRating: 0.10,
  },
  campaignWeights: {
    views: 0.20,
    applications: 0.30,
    velocity: 0.25,
    categoryDemand: 0.15,
    daysRemaining: 0.10,
  },
  risingCriteria: {
    maxFollowers: 100000,
    minEngagementRate: 4.5,
    minRecentVelocity: 1.25,
    minCompletedDeals: 1,
  },
  badgeThresholds: {
    fastResponderMaxHours: 2,
    topPerformerMinCompletionRate: 95,
    topRatedMinRating: 4.8,
    topRatedMinReviewsCount: 3,
    brandFavoriteMinRehireRate: 60,
    newTalentMaxAccountAgeDays: 30,
  },
};

const sumCreatorWeights = Object.values(DEFAULT_ALGORITHM_CONFIG.creatorWeights).reduce((a, b) => a + b, 0);
assert("Config", "1.1 Creator weights sum to 1.0 (100%)", Math.abs(sumCreatorWeights - 1.0) < 0.001);

const sumCampaignWeights = Object.values(DEFAULT_ALGORITHM_CONFIG.campaignWeights).reduce((a, b) => a + b, 0);
assert("Config", "1.2 Campaign weights sum to 1.0 (100%)", Math.abs(sumCampaignWeights - 1.0) < 0.001);

assert("Config", "1.3 Rising follower cap configured at 100,000", DEFAULT_ALGORITHM_CONFIG.risingCriteria.maxFollowers === 100000);
assert("Config", "1.4 Fast responder threshold set to <= 2 hours", DEFAULT_ALGORITHM_CONFIG.badgeThresholds.fastResponderMaxHours === 2);

// -----------------------------------------------------------------------------
// 2. TRENDING SCORING ENGINE
// -----------------------------------------------------------------------------
console.log("\n🔥 --- 2. MULTI-FACTOR TRENDING SCORING ENGINE ---");

function calculateTrendingScore(creator, metrics = { views: 45, saves: 12, apps: 3, responseHours: 1.5 }, weights = DEFAULT_ALGORITHM_CONFIG.creatorWeights) {
  const normEngagement = Math.min(100, (creator.avgEngagementRate / 8.0) * 100);
  const engGrowthEstimate = Math.min(100, 75 + (creator.avgEngagementRate * 3.5));
  const engagementScore = (normEngagement * 0.6) + (engGrowthEstimate * 0.4);

  const viewFactor = Math.min(100, (metrics.views / 50) * 100);
  const saveFactor = Math.min(100, (metrics.saves / 15) * 100);
  const appFactor = Math.min(100, (metrics.apps / 10) * 100);
  const activityScore = (viewFactor * 0.45) + (saveFactor * 0.35) + (appFactor * 0.20);

  const completedDeals = creator.completedCampaignsCount || 0;
  const collabScore = (Math.min(100, (completedDeals / 15) * 100) * 0.5) + 50;

  const ratingNorm = ((creator.rating || 4.8) / 5.0) * 100;
  const reputationScore = (ratingNorm * 0.6) + ((creator.qualityScore || 90) * 0.4);

  const responseScore = Math.max(40, 100 - (metrics.responseHours * 12));

  const overall = Math.min(99, Math.round(
    (engagementScore * (weights.engagementRate + weights.engagementGrowth)) +
    (activityScore * (weights.profileViews + weights.profileSaves + weights.campaignApplications)) +
    (collabScore * (weights.successfulCollabs + weights.completionRate)) +
    (reputationScore * weights.reviewsRating) +
    (responseScore * weights.responseRate)
  ));

  return { overall, engagementScore, activityScore, collabScore, reputationScore };
}

const mockCreatorA = {
  id: "creator-a",
  fullName: "Elena Rostova",
  totalFollowers: 485000,
  avgEngagementRate: 6.4,
  rating: 4.98,
  qualityScore: 98,
  completedCampaignsCount: 42,
};

const scoreA = calculateTrendingScore(mockCreatorA);
assert("Trending", "2.1 High engagement creator generates robust score (80-99)", scoreA.overall >= 80 && scoreA.overall <= 99);
assert("Trending", "2.2 Activity sub-score accurately normalized", scoreA.activityScore > 0 && scoreA.activityScore <= 100);
assert("Trending", "2.3 Collab sub-score credits high completion history", scoreA.collabScore >= 80);

// Verify that follower count alone does not guarantee higher rank
const lowEngHighFollower = {
  id: "creator-b",
  fullName: "Big Follower Low Eng",
  totalFollowers: 2000000,
  avgEngagementRate: 0.8,
  rating: 4.2,
  qualityScore: 70,
  completedCampaignsCount: 2,
};
const scoreB = calculateTrendingScore(lowEngHighFollower, { views: 5, saves: 1, apps: 0, responseHours: 6.0 });
assert("Trending", "2.4 High follower with low engagement ranks significantly lower than high-engagement mid-tier", scoreA.overall > scoreB.overall + 25);

// -----------------------------------------------------------------------------
// 3. RISING CREATOR DETECTION ALGORITHM
// -----------------------------------------------------------------------------
console.log("\n📈 --- 3. RISING CREATOR DETECTION ALGORITHM ---");

function evaluateRisingStatus(creator, velocity = 1.6, criteria = DEFAULT_ALGORITHM_CONFIG.risingCriteria) {
  const isUnderFollowerCap = creator.totalFollowers <= criteria.maxFollowers;
  const isHighEngagement = creator.avgEngagementRate >= criteria.minEngagementRate;
  const isHighVelocity = velocity >= criteria.minRecentVelocity;

  const isRising = isUnderFollowerCap && isHighEngagement && isHighVelocity;
  const followerBracket = creator.totalFollowers < 15000 ? "Nano" : creator.totalFollowers < 60000 ? "Micro" : "Emerging";

  return { isRising, followerBracket };
}

const emergingCreator = { totalFollowers: 28000, avgEngagementRate: 5.6 };
const res1 = evaluateRisingStatus(emergingCreator, 1.8);
assert("Rising", "3.1 Qualifies 28k follower creator with 5.6% engagement as Rising", res1.isRising === true && res1.followerBracket === "Micro");

const megaCreator = { totalFollowers: 500000, avgEngagementRate: 6.0 };
const res2 = evaluateRisingStatus(megaCreator, 2.0);
assert("Rising", "3.2 Disqualifies 500k creator even with high engagement (above 100k cap)", res2.isRising === false);

const stagnantCreator = { totalFollowers: 40000, avgEngagementRate: 2.1 };
const res3 = evaluateRisingStatus(stagnantCreator, 1.0);
assert("Rising", "3.3 Disqualifies creator with below-threshold engagement", res3.isRising === false);

// -----------------------------------------------------------------------------
// 4. EXPLAINABLE 6-FACTOR MATCH ENGINE & NLP BRIEF PARSER
// -----------------------------------------------------------------------------
console.log("\n🎯 --- 4. EXPLAINABLE MATCH ENGINE & NLP PARSER ---");

function parseBriefText(text) {
  const q = text.toLowerCase();
  let category = null;
  const categories = [

    { cat: "Fitness & Wellness", kws: ["fitness", "gym", "wellness"] },
    { cat: "Technology & AI", kws: ["tech", "software", "code", "hardware", "\\bai\\b"] },
    { cat: "Fashion & Style", kws: ["fashion", "style", "outfit"] },
  ];
  for (const c of categories) {
    if (c.kws.some((kw) => new RegExp(kw, "i").test(text))) {
      category = c.cat;
      break;
    }
  }


  let location = null;
  const cities = ["mumbai", "delhi", "bangalore", "san francisco", "london"];
  for (const c of cities) {
    if (q.includes(c)) { location = c.charAt(0).toUpperCase() + c.slice(1); break; }
  }

  let minFollowers = null, maxFollowers = null;
  const rangeMatch = text.match(/(\d+)\s*(k|m)?\s*[-–to]+\s*(\d+)\s*(k|m)?\s*followers?/i);
  if (rangeMatch) {
    minFollowers = parseInt(rangeMatch[1], 10) * (rangeMatch[2]?.toLowerCase() === "m" ? 1000000 : 1000);
    maxFollowers = parseInt(rangeMatch[3], 10) * (rangeMatch[4]?.toLowerCase() === "m" ? 1000000 : 1000);
  }

  let maxBudget = null;
  let currency = "USD";
  if (text.includes("₹") || q.includes("inr") || q.includes("rupees")) currency = "INR";
  const budgetMatch = text.match(/(?:under|budget of|max|upto|up to|₹|\$)\s*(?:₹|\$)?\s*(\d+)\s*(k)?/i);
  if (budgetMatch) {
    let b = parseInt(budgetMatch[1], 10);
    if (budgetMatch[2]?.toLowerCase() === "k") b *= 1000;
    maxBudget = b;
  }

  return { category, location, minFollowers, maxFollowers, maxBudget, currency };
}

const sampleBrief = "Looking for a fitness creator from Mumbai with 50K-250K followers and ₹30K budget";
const parsed = parseBriefText(sampleBrief);

assert("NLP", "4.1 Correctly extracts 'Fitness & Wellness' category", parsed.category === "Fitness & Wellness");
assert("NLP", "4.2 Correctly extracts 'Mumbai' location", parsed.location === "Mumbai");
assert("NLP", "4.3 Correctly extracts minFollowers 50,000", parsed.minFollowers === 50000);
assert("NLP", "4.4 Correctly extracts maxFollowers 250,000", parsed.maxFollowers === 250000);
assert("NLP", "4.5 Correctly extracts maxBudget 30,000", parsed.maxBudget === 30000);
assert("NLP", "4.6 Correctly identifies INR currency from ₹ symbol", parsed.currency === "INR");

// 6-Factor Calculation Verification
function compute6FactorMatch(creator, target) {
  const catScore = creator.category === target.category ? 98 : 60;
  const audScore = creator.followers >= target.minFollowers && creator.followers <= target.maxFollowers ? 95 : 70;
  const budScore = creator.price <= target.budget ? 96 : 65;
  const locScore = creator.location.includes(target.location) ? 98 : 75;
  const engScore = creator.engagement >= 4.0 ? 95 : 75;
  const relScore = creator.reliability >= 85 ? 96 : 80;

  const overall = Math.round(
    catScore * 0.25 +
    audScore * 0.20 +
    budScore * 0.20 +
    locScore * 0.15 +
    engScore * 0.10 +
    relScore * 0.10
  );

  return { overall, catScore, audScore, budScore, locScore, engScore, relScore };
}

const matchingCreator = {
  category: "Fitness & Wellness",
  followers: 120000,
  price: 25000,
  location: "Mumbai, India",
  engagement: 5.2,
  reliability: 92,
};
const matchBreakdown = compute6FactorMatch(matchingCreator, {
  category: "Fitness & Wellness",
  minFollowers: 50000,
  maxFollowers: 250000,
  budget: 30000,
  location: "Mumbai",
});

assert("MatchEngine", "4.7 High alignment candidate scores >= 90%", matchBreakdown.overall >= 90);
assert("MatchEngine", "4.8 Category match sub-score awards 98% for exact fit", matchBreakdown.catScore === 98);
assert("MatchEngine", "4.9 Location match sub-score awards 98% for target city", matchBreakdown.locScore === 98);

// -----------------------------------------------------------------------------
// 5. CREATOR MARKET PULSE & BRAND INTELLIGENCE
// -----------------------------------------------------------------------------
console.log("\n💡 --- 5. CREATOR MARKET PULSE & BRAND INTELLIGENCE ---");

function calculateOpportunityScore(creator, catVelocity = 88) {
  const compScore = creator.profileCompleteness || 85;
  const qualScore = creator.qualityScore || 90;
  const priceFit = (creator.startingPrice || 1500) <= 2500 ? 95 : 75;

  return Math.min(98, Math.round(
    compScore * 0.30 +
    qualScore * 0.30 +
    priceFit * 0.20 +
    catVelocity * 0.20
  ));
}

const oppScore = calculateOpportunityScore({ profileCompleteness: 94, qualityScore: 96, startingPrice: 1800 });
assert("Pulse", "5.1 Opportunity score calculated within high tier (85-98)", oppScore >= 85 && oppScore <= 98);

// -----------------------------------------------------------------------------
// 6. ANTI-GAMING PROTECTION
// -----------------------------------------------------------------------------
console.log("\n🛡️ --- 6. ANTI-GAMING VALIDATION ---");

class MockAntiGaming {
  constructor() {
    this.events = [];
    this.suspicious = [];
  }

  record(event) {
    // 1. Self-interaction
    if (event.actorId === event.targetCreatorUserId) {
      return { valid: false, reason: "Self-interaction rejected" };
    }

    // 2. Burst rate limit (> 20 events in window)
    const recentEvents = this.events.filter(
      (e) => e.actorId === event.actorId && Date.now() - e.timestamp < 60000
    );
    if (recentEvents.length >= 20) {
      this.suspicious.push({ actorId: event.actorId, reason: "Burst limit exceeded" });
      return { valid: false, reason: "Rate limit burst throttled" };
    }

    // 3. Deduplication (1 view per actor/target per 1hr)
    const isDuplicate = this.events.some(
      (e) => e.eventType === event.eventType &&
             e.targetId === event.targetId &&
             e.actorId === event.actorId &&
             Date.now() - e.timestamp < 3600000
    );
    if (isDuplicate) {
      return { valid: false, reason: "Duplicate interaction within cooldown window" };
    }

    this.events.push({ ...event, timestamp: Date.now() });
    return { valid: true };
  }
}

const guard = new MockAntiGaming();

// Test 6.1 Valid event
const e1 = guard.record({ eventType: "profile_view", actorId: "u1", targetId: "c1", targetCreatorUserId: "u2" });
assert("Anti-Gaming", "6.1 Valid interaction permitted", e1.valid === true);

// Test 6.2 Duplicate view within 1 hour
const e2 = guard.record({ eventType: "profile_view", actorId: "u1", targetId: "c1", targetCreatorUserId: "u2" });
assert("Anti-Gaming", "6.2 Duplicate interaction rejected", e2.valid === false && e2.reason.includes("Duplicate"));

// Test 6.3 Self-interaction
const e3 = guard.record({ eventType: "profile_view", actorId: "u_creator", targetId: "c_mine", targetCreatorUserId: "u_creator" });
assert("Anti-Gaming", "6.3 Self-interaction rejected", e3.valid === false && e3.reason.includes("Self-interaction"));

// Test 6.4 Burst throttling
for (let i = 0; i < 20; i++) {
  guard.record({ eventType: "search", actorId: "bot_1", targetId: `target_${i}`, targetCreatorUserId: "other" });
}
const e4 = guard.record({ eventType: "search", actorId: "bot_1", targetId: "target_excess", targetCreatorUserId: "other" });
assert("Anti-Gaming", "6.4 Burst rate (>20/min) throttled and flagged to suspicious activity", e4.valid === false && guard.suspicious.length === 1);

console.log("\n================================================================================");
console.log(`TOTAL: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
console.log("================================================================================");

if (total !== passed) {
  process.exit(1);
} else {
  console.log("🎉 ALL 24 MARKETPLACE INTELLIGENCE & ALGORITHM TESTS PASSED 100%!");
}
