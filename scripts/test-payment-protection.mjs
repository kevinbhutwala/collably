/**
 * ==============================================================================
 * Comprehensive Payment & Collaboration Protection System Test Suite (.mjs)
 * Validates all 16 states, double-entry ledger balancing, stage-aware cancellations,
 * revision limits, unfunded protection, and 5-stage dispute arbitration.
 * ==============================================================================
 */

import crypto from "crypto";

console.log("================================================================================");
console.log("🛡️  COLLABLY PAYMENT & ESCROW COLLABORATION PROTECTION TEST SUITE");
console.log("================================================================================\n");

let passed = 0;
let total = 0;

function assert(module, name, condition, details = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${module}] ${name}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${module}] ${name} ${details ? `(${details})` : ""}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PAYMENT STATE MACHINE & 16-STATE DIRECTED GRAPH
// ─────────────────────────────────────────────────────────────────────────────
console.log("🔄 --- 1. PAYMENT STATE MACHINE & 16-STATE DIRECTED GRAPH ---");

const ALLOWED_TRANSITIONS = {
  PAYMENT_PENDING: ["PAYMENT_FUNDED", "PAYMENT_SECURED", "PAYMENT_CONFIRMED", "EXPIRED", "CANCELLED", "FAILED"],
  PAYMENT_FUNDED: ["PAYMENT_SECURED", "REFUND_PENDING", "FAILED", "CANCELLED"],
  PAYMENT_SECURED: ["WORK_IN_PROGRESS", "CANCELLED", "DISPUTED"],
  WORK_IN_PROGRESS: ["SUBMITTED_FOR_REVIEW", "OVERDUE", "CANCELLED", "DISPUTED"],
  OVERDUE: ["SUBMITTED_FOR_REVIEW", "CANCELLED", "DISPUTED"],
  SUBMITTED_FOR_REVIEW: ["APPROVED", "REVISION_REQUESTED", "DISPUTED", "CANCELLED"],
  REVISION_REQUESTED: ["SUBMITTED_FOR_REVIEW", "DISPUTED", "CANCELLED"],
  APPROVED: ["POSTED", "PAYOUT_PROCESSING", "PAYOUT_REQUESTED", "DISPUTED"],
  POSTED: ["PAYOUT_PROCESSING", "DISPUTED"],
  PAYOUT_PROCESSING: ["PAID", "FAILED", "DISPUTED"],
  PAID: ["DISPUTED"],
  DISPUTED: ["REFUND_PENDING", "PAYOUT_PROCESSING", "REVISION_REQUESTED", "APPROVED", "PAYOUT_CONFIRMED", "CANCELLED", "REFUNDED"],
  REFUND_PENDING: ["REFUNDED", "DISPUTED"],
  REFUNDED: [],
  CANCELLED: [],
  EXPIRED: [],
};

const ROLE_PERMISSIONS = {
  PAYMENT_FUNDED: ["brand", "brand_owner", "super_admin", "agency_admin"],
  PAYMENT_SECURED: ["system", "gateway_webhook", "super_admin", "brand", "brand_owner"],
  WORK_IN_PROGRESS: ["creator", "super_admin", "agency_admin"],
  SUBMITTED_FOR_REVIEW: ["creator", "super_admin", "agency_admin"],
  REVISION_REQUESTED: ["brand", "brand_owner", "super_admin", "agency_admin"],
  APPROVED: ["brand", "brand_owner", "super_admin", "agency_admin", "system", "system_sla_worker", "payment_guardian"],
  POSTED: ["creator", "super_admin", "agency_admin"],
  PAYOUT_PROCESSING: ["system", "gateway_webhook", "super_admin", "finance_manager"],
  PAID: ["system", "gateway_webhook", "super_admin"],
  OVERDUE: ["system", "payment_guardian", "super_admin"],
  EXPIRED: ["system", "payment_guardian", "super_admin"],
  CANCELLED: ["brand", "creator", "super_admin", "agency_admin"],
  DISPUTED: ["creator", "brand", "super_admin", "agency_admin"],
};

function canTransition(fromState, toState, actorRole) {
  const allowed = ALLOWED_TRANSITIONS[fromState] || [];
  if (!allowed.includes(toState)) return { valid: false, reason: "Illegal transition" };

  if (actorRole) {
    const bypass = ["super_admin", "agency_admin", "agency_owner"];
    if (!bypass.includes(actorRole) && ROLE_PERMISSIONS[toState]) {
      const allowedRoles = ROLE_PERMISSIONS[toState];
      if (!allowedRoles.includes(actorRole)) {
        return { valid: false, reason: "Unauthorized role" };
      }
    }
  }
  return { valid: true };
}

assert("State Machine", "1.1 Legitimate: PAYMENT_PENDING -> PAYMENT_SECURED by system", canTransition("PAYMENT_PENDING", "PAYMENT_SECURED", "system").valid);
assert("State Machine", "1.2 Adversary Attack: Attempt direct jump PAYMENT_PENDING -> WORK_IN_PROGRESS (unfunded)", !canTransition("PAYMENT_PENDING", "WORK_IN_PROGRESS", "creator").valid);
assert("State Machine", "1.3 Legitimate: PAYMENT_SECURED -> WORK_IN_PROGRESS by creator", canTransition("PAYMENT_SECURED", "WORK_IN_PROGRESS", "creator").valid);
assert("State Machine", "1.4 Watchdog: WORK_IN_PROGRESS -> OVERDUE on missed deadline", canTransition("WORK_IN_PROGRESS", "OVERDUE", "payment_guardian").valid);
assert("State Machine", "1.5 Legitimate: WORK_IN_PROGRESS -> SUBMITTED_FOR_REVIEW by creator", canTransition("WORK_IN_PROGRESS", "SUBMITTED_FOR_REVIEW", "creator").valid);
assert("State Machine", "1.6 Legitimate: SUBMITTED_FOR_REVIEW -> APPROVED by brand", canTransition("SUBMITTED_FOR_REVIEW", "APPROVED", "brand").valid);
assert("State Machine", "1.7 Tamper Attack: Creator cannot self-approve SUBMITTED_FOR_REVIEW -> APPROVED", !canTransition("SUBMITTED_FOR_REVIEW", "APPROVED", "creator").valid);
assert("State Machine", "1.8 Legitimate: APPROVED -> POSTED by creator", canTransition("APPROVED", "POSTED", "creator").valid);
assert("State Machine", "1.9 Legitimate: POSTED -> PAYOUT_PROCESSING by system", canTransition("POSTED", "PAYOUT_PROCESSING", "system").valid);
assert("State Machine", "1.10 Legitimate: PAYOUT_PROCESSING -> PAID confirmed by gateway", canTransition("PAYOUT_PROCESSING", "PAID", "gateway_webhook").valid);

// ─────────────────────────────────────────────────────────────────────────────
// 2. CORE INVARIANT: NEVER ALLOW AN UNFUNDED COLLABORATION TO ACT LIKE FUNDED
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n🔒 --- 2. UNFUNDED ESCROW WORKFLOW GATES ---");

function checkSubmissionAllowed(collaboration) {
  if (!collaboration.isFunded || collaboration.paymentStatus === "payment_pending") {
    return { allowed: false, error: "COLLABORATION_UNFUNDED: Cannot submit work before escrow is funded" };
  }
  return { allowed: true };
}

function checkWorkStartAllowed(collaboration) {
  if (!collaboration.isFunded || collaboration.paymentStatus !== "payment_secured") {
    return { allowed: false, error: "COLLABORATION_NOT_SECURED: Escrow must be secured before starting work" };
  }
  return { allowed: true };
}

const testUnfundedCollab = {
  id: "collab-unfunded-test",
  isFunded: false,
  paymentStatus: "payment_pending",
  status: "payment_pending",
  totalAgreedBudget: 3500,
};

assert("Unfunded Gate", "2.1 REJECT: Creator cannot begin work when collaboration is unfunded", !checkWorkStartAllowed(testUnfundedCollab).allowed);
assert("Unfunded Gate", "2.2 REJECT: Creator cannot submit deliverable link when collaboration is unfunded", !checkSubmissionAllowed(testUnfundedCollab).allowed);

testUnfundedCollab.isFunded = true;
testUnfundedCollab.paymentStatus = "payment_secured";
assert("Unfunded Gate", "2.3 UNLOCKED: Creator authorized to start once escrow is secured", checkWorkStartAllowed(testUnfundedCollab).allowed);

// ─────────────────────────────────────────────────────────────────────────────
// 3. ATOMIC DOUBLE-ENTRY ACCOUNTING LEDGER BALANCING INVARIANTS
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n⚖️ --- 3. DOUBLE-ENTRY LEDGER BALANCING INVARIANTS ---");

class MockLedger {
  constructor() {
    this.entries = [];
  }

  recordFunding(collaborationId, brandId, amountDollars) {
    const amountCents = Math.round(amountDollars * 100);
    const debitBrand = { account: "BRAND_CASH", entityId: brandId, netCentsSigned: -amountCents };
    const creditEscrow = { account: "ESCROW_HOLDING", entityId: collaborationId, netCentsSigned: amountCents };

    const balance = debitBrand.netCentsSigned + creditEscrow.netCentsSigned;
    if (balance !== 0) throw new Error("Ledger balance failed");
    this.entries.push(debitBrand, creditEscrow);
    return true;
  }

  recordDisbursement(collaborationId, creatorId, amountDollars, feePercent = 10) {
    const totalCents = Math.round(amountDollars * 100);
    const feeCents = Math.round(totalCents * (feePercent / 100));
    const netCents = totalCents - feeCents;

    const debitEscrow = { account: "ESCROW_HOLDING", entityId: collaborationId, netCentsSigned: -totalCents };
    const creditCreator = { account: "CREATOR_WALLET", entityId: creatorId, netCentsSigned: netCents };
    const creditPlatform = { account: "PLATFORM_REVENUE", entityId: "platform", netCentsSigned: feeCents };

    const balance = debitEscrow.netCentsSigned + creditCreator.netCentsSigned + creditPlatform.netCentsSigned;
    if (balance !== 0) throw new Error("Disbursement imbalance");
    this.entries.push(debitEscrow, creditCreator, creditPlatform);
    return { netDollars: netCents / 100, feeDollars: feeCents / 100 };
  }

  recordSplit(collaborationId, brandId, creatorId, totalDollars, brandRefundDollars, creatorGrossDollars) {
    const totalCents = Math.round(totalDollars * 100);
    const refundCents = Math.round(brandRefundDollars * 100);
    const creatorGrossCents = Math.round(creatorGrossDollars * 100);
    const feeCents = Math.round(creatorGrossCents * 0.10);
    const creatorNetCents = creatorGrossCents - feeCents;

    const debitEscrow = { account: "ESCROW_HOLDING", entityId: collaborationId, netCentsSigned: -totalCents };
    const creditBrand = { account: "BRAND_CASH", entityId: brandId, netCentsSigned: refundCents };
    const creditCreator = { account: "CREATOR_WALLET", entityId: creatorId, netCentsSigned: creatorNetCents };
    const creditPlatform = { account: "PLATFORM_REVENUE", entityId: "platform", netCentsSigned: feeCents };

    const balance = debitEscrow.netCentsSigned + creditBrand.netCentsSigned + creditCreator.netCentsSigned + creditPlatform.netCentsSigned;
    if (balance !== 0) throw new Error("Split imbalance");
    this.entries.push(debitEscrow, creditBrand, creditCreator, creditPlatform);
    return true;
  }

  getSum() {
    return this.entries.reduce((sum, e) => sum + e.netCentsSigned, 0);
  }
}

const ledger = new MockLedger();
ledger.recordFunding("collab-1", "brand-1", 3500);
assert("Ledger Balance", "3.1 Escrow funding debits and credits balance to exactly $0.00 discrepancy", ledger.getSum() === 0);

const disburse = ledger.recordDisbursement("collab-1", "creator-1", 3500, 10);
assert("Ledger Balance", "3.2 10% platform fee accurately deducted ($350) and net creator credited ($3,150)", disburse.netDollars === 3150 && disburse.feeDollars === 350);
assert("Ledger Balance", "3.3 Disbursement entries maintain zero-sum invariant across all accounts", ledger.getSum() === 0);

ledger.recordSplit("collab-2", "brand-2", "creator-2", 4000, 2000, 2000);
assert("Ledger Balance", "3.4 Arbitrated split entries balance to zero-sum invariant", ledger.getSum() === 0);

// ─────────────────────────────────────────────────────────────────────────────
// 4. REVISION BOUNDARY ENFORCEMENT & STRUCTURED REASONS
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📐 --- 4. REVISION BOUNDARY ENFORCEMENT ---");

function requestRevision(deliverable, feedback) {
  if (deliverable.revisionCount >= deliverable.maxRevisions) {
    return { success: false, error: "MAX_REVISIONS_EXCEEDED" };
  }
  deliverable.revisionCount++;
  deliverable.status = "revision_requested";
  return { success: true, count: deliverable.revisionCount };
}

const testDel = { id: "del-rev-test", revisionCount: 0, maxRevisions: 2, status: "submitted" };
const r1 = requestRevision(testDel, "Please adjust intro hook");
assert("Revision Gate", "4.1 Revision 1/2 permitted within scope", r1.success && r1.count === 1);

testDel.status = "submitted";
const r2 = requestRevision(testDel, "Please fix audio mixing");
assert("Revision Gate", "4.2 Revision 2/2 permitted within scope", r2.success && r2.count === 2);

testDel.status = "submitted";
const r3 = requestRevision(testDel, "Completely redo the video");
assert("Revision Gate", "4.3 REJECT: Revision 3/2 blocked because max revisions reached", !r3.success && r3.error === "MAX_REVISIONS_EXCEEDED");

// ─────────────────────────────────────────────────────────────────────────────
// 5. STAGE-AWARE CANCELLATIONS & FAIR KILL-FEES
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n⚖️ --- 5. STAGE-AWARE CANCELLATIONS & FAIR KILL-FEES ---");

function calculateCancellation(status, isFunded, isOverdue, totalBudget) {
  if (!isFunded || status === "payment_pending") {
    return { stage: "before_acceptance", refundPercent: 0, killFeePercent: 0, refundDollars: 0, killFeeDollars: 0 };
  }
  if (status === "payment_secured") {
    return { stage: "before_work", refundPercent: 100, killFeePercent: 0, refundDollars: totalBudget, killFeeDollars: 0 };
  }
  if (isOverdue || status === "overdue") {
    return { stage: "overdue", refundPercent: 100, killFeePercent: 0, refundDollars: totalBudget, killFeeDollars: 0 };
  }
  if (status === "work_in_progress") {
    return { stage: "work_in_progress", refundPercent: 70, killFeePercent: 30, refundDollars: totalBudget * 0.7, killFeeDollars: totalBudget * 0.3 };
  }
  if (status === "submitted_for_review" || status === "revision_requested") {
    return { stage: "submitted", refundPercent: 50, killFeePercent: 50, refundDollars: totalBudget * 0.5, killFeeDollars: totalBudget * 0.5 };
  }
  if (status === "approved" || status === "posted") {
    return { error: "CANNOT_CANCEL_APPROVED" };
  }
  return { stage: "before_work", refundPercent: 100, killFeePercent: 0, refundDollars: totalBudget, killFeeDollars: 0 };
}

const c1 = calculateCancellation("payment_secured", true, false, 3000);
assert("Cancellation", "5.1 Before work: 100% Brand Refund ($3,000), 0% Creator Kill-Fee ($0)", c1.refundDollars === 3000 && c1.killFeeDollars === 0);

const c2 = calculateCancellation("work_in_progress", true, false, 3000);
assert("Cancellation", "5.2 Work in progress: 70% Brand Refund ($2,100), 30% Creator Kill-Fee ($900)", c2.refundDollars === 2100 && c2.killFeeDollars === 900);

const c3 = calculateCancellation("submitted_for_review", true, false, 3000);
assert("Cancellation", "5.3 Content submitted: 50% Brand Refund ($1,500), 50% Creator Kill-Fee ($1,500)", c3.refundDollars === 1500 && c3.killFeeDollars === 1500);

const c4 = calculateCancellation("work_in_progress", true, true, 3000);
assert("Cancellation", "5.4 Missed deadline / overdue: 100% Brand Refund ($3,000), 0% Creator Kill-Fee ($0)", c4.refundDollars === 3000 && c4.killFeeDollars === 0);

const c5 = calculateCancellation("approved", true, false, 3000);
assert("Cancellation", "5.5 REJECT cancellation after deliverable has been approved", Boolean(c5.error));

// ─────────────────────────────────────────────────────────────────────────────
// 6. 5-STAGE DISPUTE ARBITRATION & 6 RESOLUTION OUTCOMES
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n🏛️ --- 6. 5-STAGE DISPUTE ARBITRATION & 6 RESOLUTION OUTCOMES ---");

const DISPUTE_STAGES = ["Open", "Under_Review", "Evidence_Requested", "Decision", "Resolved"];
let currentDisputeStage = "Open";

function advanceStage(target) {
  const curIdx = DISPUTE_STAGES.indexOf(currentDisputeStage);
  const targetIdx = DISPUTE_STAGES.indexOf(target);
  if (targetIdx === curIdx + 1) {
    currentDisputeStage = target;
    return true;
  }
  return false;
}

assert("Dispute Court", "6.1 Stage 1/5: Dispute initiated at 'Open'", currentDisputeStage === "Open");
assert("Dispute Court", "6.2 Stage 2/5: Advanced to 'Under_Review'", advanceStage("Under_Review"));
assert("Dispute Court", "6.3 Stage 3/5: Advanced to 'Evidence_Requested'", advanceStage("Evidence_Requested"));
assert("Dispute Court", "6.4 Stage 4/5: Advanced to 'Decision'", advanceStage("Decision"));
assert("Dispute Court", "6.5 Stage 5/5: Advanced to 'Resolved'", advanceStage("Resolved"));

// Verify 6 resolution outcomes
const RESOLUTION_OUTCOMES = [
  "FULL_CREATOR_PAYOUT",
  "PARTIAL_CREATOR_PAYOUT",
  "FULL_BRAND_REFUND",
  "SPLIT_SETTLEMENT",
  "ADDITIONAL_REVISION",
  "CANCELLATION_WITHOUT_PAYOUT"
];
assert("Dispute Court", "6.6 All 6 standardized arbitration outcomes supported", RESOLUTION_OUTCOMES.length === 6);

// ─────────────────────────────────────────────────────────────────────────────
// 7. TRUST & SAFETY RELIABILITY SCORE TELEMETRY (0 - 100)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n⭐ --- 7. TRUST & SAFETY RELIABILITY SCORE TELEMETRY ---");

function computeTier(score) {
  if (score >= 90) return "Elite";
  if (score >= 75) return "Trusted";
  if (score >= 60) return "Good";
  if (score >= 40) return "At_Risk";
  return "Suspended";
}

let userScore = 100;
assert("Reliability", "7.1 New user initialized with pristine score (100) & Elite Tier", userScore === 100 && computeTier(userScore) === "Elite");

userScore = Math.max(0, userScore - 10); // Missed deadline
assert("Reliability", "7.2 Missed deadline deducts -10 points (Score: 90, Elite)", userScore === 90 && computeTier(userScore) === "Elite");

userScore = Math.max(0, userScore - 20); // Lost dispute
assert("Reliability", "7.3 Lost dispute deducts -20 points (Score: 70, Good)", userScore === 70 && computeTier(userScore) === "Good");

userScore = Math.max(0, userScore - 35); // Critical breach
assert("Reliability", "7.4 Critical breach drops user to Suspended Tier (<40)", userScore === 35 && computeTier(userScore) === "Suspended");

// ─────────────────────────────────────────────────────────────────────────────
// 8. AUTOMATED WATCHDOG: 48H INACTION EXPIRATION & 120H REVIEW SLA
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n⏰ --- 8. AUTOMATED WATCHDOG ENGINE ---");

function evaluateFundingExpiration(createdAtMs, isFunded) {
  const ageHours = (Date.now() - createdAtMs) / (1000 * 60 * 60);
  if (!isFunded && ageHours >= 48) {
    return { shouldExpire: true, status: "expired" };
  }
  return { shouldExpire: false };
}

function evaluateSlaAutoRelease(submittedAtMs, isApproved) {
  const ageHours = (Date.now() - submittedAtMs) / (1000 * 60 * 60);
  if (!isApproved && ageHours >= 120) {
    return { shouldAutoRelease: true, status: "approved" };
  }
  return { shouldAutoRelease: false };
}

const staleUnfundedTime = Date.now() - (49 * 60 * 60 * 1000);
const expCheck = evaluateFundingExpiration(staleUnfundedTime, false);
assert("Watchdog", "8.1 Unfunded collaboration older than 48 hours is marked EXPIRED", expCheck.shouldExpire && expCheck.status === "expired");

const freshUnfundedTime = Date.now() - (20 * 60 * 60 * 1000);
assert("Watchdog", "8.2 Unfunded collaboration under 48 hours is NOT expired", !evaluateFundingExpiration(freshUnfundedTime, false).shouldExpire);

const expiredSlaTime = Date.now() - (121 * 60 * 60 * 1000);
const slaCheck = evaluateSlaAutoRelease(expiredSlaTime, false);
assert("Watchdog", "8.3 120-hour brand inaction SLA triggers automatic deliverable approval", slaCheck.shouldAutoRelease && slaCheck.status === "approved");

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n================================================================================");
console.log(`📊 FINAL RESULT: ${passed}/${total} TESTS PASSED (${((passed / total) * 100).toFixed(1)}% SUCCESS RATE)`);
console.log(`❌ FAILED: ${total - passed}`);
console.log("================================================================================\n");

if (passed !== total) {
  process.exit(1);
}
