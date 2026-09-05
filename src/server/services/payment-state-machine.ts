export type PaymentLifecycleState =
  | "PAYMENT_PENDING"
  | "PAYMENT_FUNDED"
  | "PAYMENT_SECURED"
  | "WORK_IN_PROGRESS"
  | "SUBMITTED_FOR_REVIEW"
  | "REVISION_REQUESTED"
  | "APPROVED"
  | "POSTED"
  | "PAYOUT_PROCESSING"
  | "PAID"
  | "DISPUTED"
  | "REFUND_PENDING"
  | "REFUNDED"
  | "CANCELLED"
  | "EXPIRED"
  | "OVERDUE"
  // Legacy milestone aliases for 100% backward test compatibility:
  | "PAYMENT_CONFIRMED"
  | "FUNDS_HELD"
  | "MILESTONE_ACTIVE"
  | "DELIVERABLE_SUBMITTED"
  | "UNDER_REVIEW"
  | "PAYOUT_REQUESTED"
  | "PAYOUT_CONFIRMED"
  | "FAILED";

export interface StateTransitionContext {
  orderId?: string;
  paymentId?: string;
  milestoneId?: string;
  deliverableId?: string;
  collaborationId?: string;
  actorId: string;
  actorRole: string;
  reason?: string;
  metadata?: Record<string, any>;
}

export interface TransitionResult {
  success: boolean;
  fromState: PaymentLifecycleState;
  toState: PaymentLifecycleState;
  error?: string;
  timestamp: string;
}

/**
 * Strict Directed Graph of Allowed State Transitions (16 Full Lifecycle States + Legacy Aliases)
 */
const ALLOWED_TRANSITIONS: Record<PaymentLifecycleState, PaymentLifecycleState[]> = {
  // 1. Brand created collaboration, awaiting escrow funding
  PAYMENT_PENDING: [
    "PAYMENT_FUNDED",
    "PAYMENT_SECURED",
    "PAYMENT_CONFIRMED", // legacy
    "EXPIRED",
    "CANCELLED",
    "FAILED",
  ],

  // 2. Brand deposited funds into gateway
  PAYMENT_FUNDED: ["PAYMENT_SECURED", "REFUND_PENDING", "FAILED", "CANCELLED"],

  // 3. Funds verified & locked in escrow vault (Creator unblocked to work)
  PAYMENT_SECURED: ["WORK_IN_PROGRESS", "CANCELLED", "DISPUTED"],

  // 4. Creator actively creating content
  WORK_IN_PROGRESS: [
    "SUBMITTED_FOR_REVIEW",
    "OVERDUE",
    "CANCELLED",
    "DISPUTED",
  ],

  // 5. Deadline breached without deliverable submission
  OVERDUE: [
    "SUBMITTED_FOR_REVIEW", // Late submission within grace period
    "CANCELLED",           // Brand cancellation with 100% refund
    "DISPUTED",
  ],

  // 6. Creator submitted deliverable link (Starts 120h SLA review clock)
  SUBMITTED_FOR_REVIEW: [
    "APPROVED",
    "REVISION_REQUESTED",
    "DISPUTED",
    "CANCELLED",
  ],

  // 7. Brand requested in-scope revisions (Within max revisions)
  REVISION_REQUESTED: [
    "SUBMITTED_FOR_REVIEW",
    "DISPUTED",
    "CANCELLED",
  ],

  // 8. Deliverable approved by Brand or SLA auto-approval
  APPROVED: [
    "POSTED",
    "PAYOUT_PROCESSING",
    "PAYOUT_REQUESTED", // legacy
    "DISPUTED",
  ],

  // 9. Proof of public post submitted and verified
  POSTED: [
    "PAYOUT_PROCESSING",
    "DISPUTED",
  ],

  // 10. Escrow release initiated to creator wallet/bank
  PAYOUT_PROCESSING: [
    "PAID",
    "FAILED",
    "DISPUTED",
  ],

  // 11. Net funds settled with creator
  PAID: ["DISPUTED"],

  // 12. Frozen in arbitration
  DISPUTED: [
    "REFUND_PENDING",
    "PAYOUT_PROCESSING",
    "REVISION_REQUESTED",
    "APPROVED",
    "PAYOUT_CONFIRMED",
    "CANCELLED",
    "REFUNDED",
  ],

  // 13. Brand refund processing
  REFUND_PENDING: ["REFUNDED", "DISPUTED"],

  // Terminal states
  REFUNDED: [],
  CANCELLED: [],
  EXPIRED: [],

  // Legacy compatibility states
  PAYMENT_CONFIRMED: ["FUNDS_HELD", "MILESTONE_ACTIVE", "PAYMENT_SECURED", "REFUNDED"],
  FUNDS_HELD: ["MILESTONE_ACTIVE", "WORK_IN_PROGRESS", "REFUNDED", "DISPUTED"],
  MILESTONE_ACTIVE: ["DELIVERABLE_SUBMITTED", "SUBMITTED_FOR_REVIEW", "DISPUTED", "REFUNDED"],
  DELIVERABLE_SUBMITTED: ["UNDER_REVIEW", "MILESTONE_ACTIVE", "APPROVED", "DISPUTED"],
  UNDER_REVIEW: ["APPROVED", "DELIVERABLE_SUBMITTED", "DISPUTED", "REVISION_REQUESTED"],
  PAYOUT_REQUESTED: ["PAYOUT_CONFIRMED", "PAID", "FAILED", "DISPUTED"],
  PAYOUT_CONFIRMED: ["PAID", "DISPUTED"],
  FAILED: ["PAYMENT_PENDING"],
};

/**
 * Role-Based Transition Authorization Rules
 */
const ROLE_PERMISSIONS: Partial<Record<PaymentLifecycleState, string[]>> = {
  PAYMENT_FUNDED: ["brand", "brand_owner", "brand_manager", "super_admin", "agency_admin"],
  PAYMENT_SECURED: ["system", "gateway_webhook", "super_admin", "agency_admin", "brand", "brand_owner"],
  PAYMENT_CONFIRMED: ["system", "gateway_webhook", "super_admin", "agency_admin"],
  WORK_IN_PROGRESS: ["creator", "super_admin", "agency_admin"],
  SUBMITTED_FOR_REVIEW: ["creator", "super_admin", "agency_admin"],
  DELIVERABLE_SUBMITTED: ["creator", "super_admin", "agency_admin"],
  REVISION_REQUESTED: ["brand", "brand_owner", "brand_manager", "super_admin", "agency_admin"],
  UNDER_REVIEW: ["brand", "brand_owner", "brand_manager", "super_admin", "agency_admin", "system"],
  APPROVED: [
    "brand",
    "brand_owner",
    "brand_manager",
    "super_admin",
    "agency_admin",
    "system",
    "system_sla_worker",
    "payment_guardian",
  ],
  POSTED: ["creator", "super_admin", "agency_admin"],
  PAYOUT_PROCESSING: [
    "system",
    "gateway_webhook",
    "super_admin",
    "agency_admin",
    "finance_manager",
    "brand",
    "creator",
  ],
  PAYOUT_REQUESTED: ["creator", "super_admin", "agency_admin", "finance_manager"],
  PAYOUT_CONFIRMED: ["system", "gateway_webhook", "super_admin", "finance_manager"],
  PAID: ["system", "gateway_webhook", "super_admin", "finance_manager"],
  OVERDUE: ["system", "payment_guardian", "super_admin", "agency_admin"],
  EXPIRED: ["system", "payment_guardian", "super_admin", "agency_admin"],
  CANCELLED: ["brand", "brand_owner", "brand_manager", "creator", "super_admin", "agency_admin"],
  REFUND_PENDING: ["super_admin", "agency_admin", "finance_manager", "system"],
  REFUNDED: ["super_admin", "agency_admin", "finance_manager", "system", "gateway_webhook"],
  DISPUTED: ["creator", "brand", "brand_owner", "super_admin", "agency_admin"],
  FAILED: ["system", "gateway_webhook", "super_admin"],
};

export class PaymentStateMachine {
  /**
   * Validate whether a state transition is legal
   */
  static canTransition(
    currentState: PaymentLifecycleState,
    targetState: PaymentLifecycleState,
    actorRole?: string
  ): { valid: boolean; reason?: string } {
    const allowed = ALLOWED_TRANSITIONS[currentState] || [];
    if (!allowed.includes(targetState)) {
      return {
        valid: false,
        reason: `Illegal state transition from "${currentState}" to "${targetState}". Allowed transitions: [${allowed.join(", ")}]`,
      };
    }

    if (actorRole) {
      // Super admins and agency owners bypass role restrictions
      const bypassRoles = ["super_admin", "agency_owner", "agency_admin"];
      if (!bypassRoles.includes(actorRole) && ROLE_PERMISSIONS[targetState]) {
        const allowedRoles = ROLE_PERMISSIONS[targetState]!;
        if (!allowedRoles.includes(actorRole)) {
          return {
            valid: false,
            reason: `Actor with role "${actorRole}" is not authorized to transition state to "${targetState}". Required roles: [${allowedRoles.join(", ")}]`,
          };
        }
      }
    }

    return { valid: true };
  }

  /**
   * Execute state transition with validation and audit trail
   */
  static transition(
    currentState: PaymentLifecycleState,
    targetState: PaymentLifecycleState,
    context: StateTransitionContext
  ): TransitionResult {
    const check = this.canTransition(currentState, targetState, context.actorRole);
    if (!check.valid) {
      return {
        success: false,
        fromState: currentState,
        toState: targetState,
        error: check.reason,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      fromState: currentState,
      toState: targetState,
      timestamp: new Date().toISOString(),
    };
  }
}
