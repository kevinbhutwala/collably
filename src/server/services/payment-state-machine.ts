export type PaymentLifecycleState =
  | "PAYMENT_PENDING"
  | "PAYMENT_CONFIRMED"
  | "FUNDS_HELD"
  | "MILESTONE_ACTIVE"
  | "DELIVERABLE_SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "PAYOUT_REQUESTED"
  | "PAYOUT_CONFIRMED"
  | "FAILED"
  | "REFUNDED"
  | "DISPUTED";

export interface StateTransitionContext {
  orderId?: string;
  paymentId?: string;
  milestoneId?: string;
  deliverableId?: string;
  actorId: string;
  actorRole: string;
  reason?: string;
}

export interface TransitionResult {
  success: boolean;
  fromState: PaymentLifecycleState;
  toState: PaymentLifecycleState;
  error?: string;
  timestamp: string;
}

/**
 * Strict Directed Graph of Allowed State Transitions
 */
const ALLOWED_TRANSITIONS: Record<PaymentLifecycleState, PaymentLifecycleState[]> = {
  PAYMENT_PENDING: ["PAYMENT_CONFIRMED", "FAILED"],
  PAYMENT_CONFIRMED: ["FUNDS_HELD", "MILESTONE_ACTIVE", "REFUNDED"],
  FUNDS_HELD: ["MILESTONE_ACTIVE", "REFUNDED", "DISPUTED"],
  MILESTONE_ACTIVE: ["DELIVERABLE_SUBMITTED", "DISPUTED", "REFUNDED"],
  DELIVERABLE_SUBMITTED: ["UNDER_REVIEW", "MILESTONE_ACTIVE", "DISPUTED"],
  UNDER_REVIEW: ["APPROVED", "DELIVERABLE_SUBMITTED", "DISPUTED"],
  APPROVED: ["PAYOUT_REQUESTED", "DISPUTED"],
  PAYOUT_REQUESTED: ["PAYOUT_CONFIRMED", "FAILED", "DISPUTED"],
  PAYOUT_CONFIRMED: ["DISPUTED"], // Can only move to dispute post-settlement
  FAILED: ["PAYMENT_PENDING"], // Can retry failed payments
  REFUNDED: [], // Terminal state
  DISPUTED: ["REFUNDED", "APPROVED", "PAYOUT_CONFIRMED"], // Resolved by admin arbitration
};

/**
 * Role-Based Transition Permission Rules
 */
const ROLE_PERMISSIONS: Partial<Record<PaymentLifecycleState, string[]>> = {
  PAYMENT_CONFIRMED: ["system", "gateway_webhook"],
  APPROVED: ["brand", "brand_owner", "brand_manager", "super_admin", "agency_admin"],
  PAYOUT_REQUESTED: ["creator", "super_admin", "agency_admin", "finance_manager"],
  PAYOUT_CONFIRMED: ["system", "gateway_webhook", "super_admin", "finance_manager"],
  REFUNDED: ["super_admin", "agency_admin", "finance_manager"],
  DISPUTED: ["creator", "brand", "brand_owner", "super_admin", "agency_admin"],
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

    if (actorRole && ROLE_PERMISSIONS[targetState]) {
      const allowedRoles = ROLE_PERMISSIONS[targetState]!;
      if (!allowedRoles.includes(actorRole)) {
        return {
          valid: false,
          reason: `Actor with role "${actorRole}" is not authorized to transition state to "${targetState}". Required roles: [${allowedRoles.join(", ")}]`,
        };
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
