import { PaymentStateMachine } from "../src/server/services/payment-state-machine";

export function runPaymentStateMachineTests(): { total: number; passed: number; failed: number } {
  console.log("\n📦 --- TEST SUITE: Payment State Machine & Lifecycle Rules ---");
  let passed = 0;
  let total = 0;

  function assert(name: string, condition: boolean, details?: string) {
    total++;
    if (condition) {
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${name} ${details ? `(${details})` : ""}`);
    }
  }

  // 1. Successful payment initiation to confirmation
  const t1 = PaymentStateMachine.transition("PAYMENT_PENDING", "PAYMENT_CONFIRMED", {
    actorId: "gateway",
    actorRole: "system",
  });
  assert("1. PAYMENT_PENDING -> PAYMENT_CONFIRMED by system", t1.success);

  // 2. Failed payment transition
  const t2 = PaymentStateMachine.transition("PAYMENT_PENDING", "FAILED", {
    actorId: "gateway",
    actorRole: "system",
  });
  assert("2. PAYMENT_PENDING -> FAILED by system on card decline", t2.success);

  // 3. Reject invalid skip from PENDING directly to APPROVED
  const t3 = PaymentStateMachine.transition("PAYMENT_PENDING", "APPROVED", {
    actorId: "attacker",
    actorRole: "creator",
  });
  assert("3. REJECT invalid skip: PAYMENT_PENDING -> APPROVED", !t3.success);

  // 4. Milestone activation from confirmed payment
  const t4 = PaymentStateMachine.transition("PAYMENT_CONFIRMED", "MILESTONE_ACTIVE", {
    actorId: "brand-1",
    actorRole: "brand",
  });
  assert("4. PAYMENT_CONFIRMED -> MILESTONE_ACTIVE", t4.success);

  // 5. Deliverable submission
  const t5 = PaymentStateMachine.transition("MILESTONE_ACTIVE", "DELIVERABLE_SUBMITTED", {
    actorId: "creator-1",
    actorRole: "creator",
  });
  assert("5. MILESTONE_ACTIVE -> DELIVERABLE_SUBMITTED", t5.success);

  // 6. Under review transition
  const t6 = PaymentStateMachine.transition("DELIVERABLE_SUBMITTED", "UNDER_REVIEW", {
    actorId: "brand-1",
    actorRole: "brand",
  });
  assert("6. DELIVERABLE_SUBMITTED -> UNDER_REVIEW", t6.success);

  // 7. Deliverable approval by authorized brand
  const t7 = PaymentStateMachine.transition("UNDER_REVIEW", "APPROVED", {
    actorId: "brand-1",
    actorRole: "brand",
  });
  assert("7. UNDER_REVIEW -> APPROVED by authorized brand", t7.success);

  // 8. Creator cannot approve their own deliverable
  const t8 = PaymentStateMachine.transition("UNDER_REVIEW", "APPROVED", {
    actorId: "creator-1",
    actorRole: "creator",
  });
  assert("8. REJECT deliverable approval by unauthorized creator", !t8.success);

  // 9. Payout request and confirmation
  const t9 = PaymentStateMachine.transition("APPROVED", "PAYOUT_REQUESTED", {
    actorId: "creator-1",
    actorRole: "creator",
  });
  assert("9. APPROVED -> PAYOUT_REQUESTED by creator", t9.success);

  const t10 = PaymentStateMachine.transition("PAYOUT_REQUESTED", "PAYOUT_CONFIRMED", {
    actorId: "gateway",
    actorRole: "system",
  });
  assert("10. PAYOUT_REQUESTED -> PAYOUT_CONFIRMED by gateway", t10.success);

  return { total, passed, failed: total - passed };
}
