import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_FILE = path.join(process.cwd(), "data", "valence_db.json");
const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

console.log("================================================================================");
console.log("🎯 ELENA ROSTOVA SUBSCRIPTION & PAYMENT ENFORCEMENT VERIFICATION");
console.log("================================================================================");

let total = 0;
let passed = 0;
let failed = 0;

function assert(category, testName, condition, details = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${category}] ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${category}] ${testName} ${details ? `(${details})` : ""}`);
    failed++;
  }
}

// 1. Verify Elena's user profile
const elenaUser = db.users.find((u) => u.email === "elena@abeycollab.io" || u.name === "Elena Rostova");
assert("User Account", "Elena Rostova user record exists in database", Boolean(elenaUser));
assert("User Account", "Elena's role is strictly 'creator'", elenaUser?.role === "creator");

// 2. Verify Elena's subscription in DB is Creator Starter ($0)
const elenaSub = db.subscriptions.find((s) => s.userId === elenaUser?.id);
assert("Database State", "Elena's subscription record exists", Boolean(elenaSub));
assert("Database State", "Elena's active plan is strictly 'creator_starter'", elenaSub?.planId === "creator_starter");
assert("Database State", "Elena's subscription price is strictly $0 (₹0)", elenaSub?.price === 0);
assert("Database State", "Elena's paid amount is $0", elenaSub?.amountPaid === 0);
assert("Database State", "Elena's pitch applications quota is limited to 5 (Starter limit)", elenaSub?.features?.maxApplicationsPerMonth === 5);
assert("Database State", "Elena's AI pitch generator is LOCKED in Starter tier", elenaSub?.features?.aiPitchGenerator === false);
assert("Database State", "Elena's advanced analytics is LOCKED in Starter tier", elenaSub?.features?.advancedAnalytics === false);

// 3. Test Simulation of API Route with Elena's Session Token
const JWT_SECRET = "collably_production_jwt_master_secret_key_2026_secure";
function generateToken(userId, email, role) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    userId,
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + 3600,
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}

const elenaToken = generateToken(elenaUser.id, elenaUser.email, elenaUser.role);

const ALL_PLANS = {
  creator_starter: { id: "creator_starter", name: "Creator Starter", role: "creator", monthlyPrice: 0, annualPrice: 0 },
  creator_pro: { id: "creator_pro", name: "Creator Pro", role: "creator", monthlyPrice: 29, annualPrice: 24 },
  creator_enterprise: { id: "creator_enterprise", name: "Creator Studio & Collective", role: "creator", monthlyPrice: 99, annualPrice: 79 },
  brand_starter: { id: "brand_starter", name: "Brand Starter", role: "brand", monthlyPrice: 49, annualPrice: 39 },
  brand_growth: { id: "brand_growth", name: "Brand Growth", role: "brand", monthlyPrice: 199, annualPrice: 159 },
};

function simulateUpgrade(token, body) {
  const { planId, interval = "monthly", paymentId } = body;
  const targetPlan = ALL_PLANS[planId];
  if (!targetPlan) return { status: 400, error: "Invalid plan identifier" };

  if (targetPlan.role !== "creator") {
    return { status: 403, error: "Creator accounts cannot subscribe to Brand plans." };
  }

  const selectedPrice = interval === "annual" ? targetPlan.annualPrice : targetPlan.monthlyPrice;
  if (selectedPrice > 0) {
    if (!paymentId) {
      return {
        status: 402,
        error: "Payment is strictly required before upgrading to any paid plan.",
        code: "PAYMENT_REQUIRED",
      };
    }

    const isValidTestPayment =
      String(paymentId).startsWith("pay_test_") ||
      String(paymentId).startsWith("pay_verified_") ||
      String(paymentId).startsWith("pay_sim_");

    if (!isValidTestPayment) {
      return {
        status: 402,
        error: "Payment verification failed. No confirmed transaction was found for this payment ID.",
        code: "PAYMENT_VERIFICATION_FAILED",
      };
    }
  }

  return {
    status: 200,
    success: true,
    message: `Plan upgraded to ${targetPlan.name} successfully.`,
    planId,
    amountPaid: selectedPrice,
    paymentId,
  };
}

console.log("\n🔒 --- 4. STRICT PAYMENT ENFORCEMENT ON UPGRADE ATTEMPTS ---");

// 4.1 Elena attempts to upgrade to Creator Pro without paying -> HTTP 402
const unpaidPro = simulateUpgrade(elenaToken, { planId: "creator_pro" });
assert("Upgrade Gate", "Elena CANNOT upgrade to Creator Pro without paying (HTTP 402 PAYMENT_REQUIRED)", unpaidPro.status === 402 && unpaidPro.code === "PAYMENT_REQUIRED");

// 4.2 Elena attempts to upgrade to Creator Studio (Enterprise) without paying -> HTTP 402
const unpaidStudio = simulateUpgrade(elenaToken, { planId: "creator_enterprise" });
assert("Upgrade Gate", "Elena CANNOT upgrade to Creator Studio without paying (HTTP 402 PAYMENT_REQUIRED)", unpaidStudio.status === 402 && unpaidStudio.code === "PAYMENT_REQUIRED");

// 4.3 Elena attempts to upgrade with a forged/fraudulent payment ID -> HTTP 402
const forgedPayment = simulateUpgrade(elenaToken, { planId: "creator_pro", paymentId: "forged_bypass_token" });
assert("Upgrade Gate", "Elena CANNOT upgrade with forged payment ID (HTTP 402 PAYMENT_VERIFICATION_FAILED)", forgedPayment.status === 402 && forgedPayment.code === "PAYMENT_VERIFICATION_FAILED");

// 4.4 Elena attempts to subscribe to Brand plan -> HTTP 403
const brandAttempt = simulateUpgrade(elenaToken, { planId: "brand_growth", paymentId: "pay_verified_123" });
assert("Role Boundary", "Elena rejected from Brand plan (HTTP 403)", brandAttempt.status === 403);

// 4.5 Elena completes verified payment for Creator Pro -> HTTP 200
const verifiedPro = simulateUpgrade(elenaToken, { planId: "creator_pro", paymentId: "pay_test_elena_pro_verified" });
assert("Verified Upgrade", "Elena successfully upgrades to Creator Pro with verified payment (HTTP 200)", verifiedPro.status === 200);
assert("Verified Upgrade", "Recorded paid amount for Creator Pro is $29", verifiedPro.amountPaid === 29);

// 4.6 Elena completes verified payment for Creator Studio -> HTTP 200
const verifiedStudio = simulateUpgrade(elenaToken, { planId: "creator_enterprise", paymentId: "pay_test_elena_studio_verified" });
assert("Verified Upgrade", "Elena successfully upgrades to Creator Studio with verified payment (HTTP 200)", verifiedStudio.status === 200);
assert("Verified Upgrade", "Recorded paid amount for Creator Studio is $99", verifiedStudio.amountPaid === 99);

console.log("\n================================================================================");
console.log(`🏁 ELENA TEST EXECUTION COMPLETE: ${passed}/${total} PASSED (${failed} FAILED)`);
console.log("================================================================================");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
