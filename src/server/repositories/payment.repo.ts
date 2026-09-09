import { db } from "../db/database";
import { PaymentEntity, WebhookEventEntity } from "../db/schema";
import { PayoutRecord } from "@/core/types";

export class PaymentRepository {
  async createPayment(data: Omit<PaymentEntity, "id" | "createdAt" | "updatedAt">): Promise<PaymentEntity> {
    const id = `pay-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const isTest = data.isTest ?? (data.providerOrderId?.startsWith("order_test_") || (process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") ?? (process.env.NODE_ENV !== "production")));
    const environment = data.environment || (isTest ? "test" : "live");
    const newPayment: PaymentEntity = {
      ...data,
      environment,
      isTest,
      id,
      createdAt: now,
      updatedAt: now,
    };
    db.updateState((s) => {
      s.payments = s.payments || [];
      s.payments.unshift(newPayment);
    });
    return newPayment;
  }

  async getPaymentByOrderId(orderId: string): Promise<PaymentEntity | null> {
    const state = db.getState();
    return (state.payments || []).find((p) => p.providerOrderId === orderId) || null;
  }

  async getPaymentById(id: string): Promise<PaymentEntity | null> {
    const state = db.getState();
    return (state.payments || []).find((p) => p.id === id) || null;
  }

  async updatePaymentStatus(
    id: string,
    status: PaymentEntity["status"],
    providerPaymentId?: string,
    metadata?: Record<string, any>
  ): Promise<PaymentEntity | null> {
    let updated: PaymentEntity | null = null;
    db.updateState((s) => {
      s.payments = s.payments || [];
      const idx = s.payments.findIndex((p) => p.id === id || p.providerOrderId === id);
      if (idx !== -1) {
        s.payments[idx].status = status;
        s.payments[idx].updatedAt = new Date().toISOString();
        if (providerPaymentId) s.payments[idx].providerPaymentId = providerPaymentId;
        if (metadata) s.payments[idx].metadata = { ...s.payments[idx].metadata, ...metadata };
        updated = s.payments[idx];
      }
    });
    return updated;
  }

  async getPayouts(creatorId?: string): Promise<PayoutRecord[]> {
    const state = db.getState();
    if (!state.payouts || state.payouts.length === 0) {
      const defaultPayouts: PayoutRecord[] = [
        {
          id: "payout-init-1",
          creatorId: "creator-demo",
          collaborationId: "collab-2",
          campaignTitle: "The Architecture of Time: Autumn Collection",
          brandName: "Aethel Watches",
          creatorName: "Demo Creator",
          deliverableTitle: "Titanium Monolith Architectural Reel",
          grossAmount: 2000,
          netAmount: 1800,
          agencyFee: 200,
          currency: "USD",
          status: "paid",
          paymentMethod: "stripe_connect",
          createdAt: "2026-08-25T12:00:00Z",
          releasedAt: "2026-08-26T15:30:00Z",
        },
        {
          id: "payout-init-2",
          creatorId: "creator-demo",
          collaborationId: "collab-1",
          campaignTitle: "AI-Powered Sprint Workflows Launch",
          brandName: "Linear Dynamics",
          creatorName: "Demo Creator",
          deliverableTitle: "Dedicated AI Triage 60s Segment in Main Video",
          grossAmount: 2500,
          netAmount: 2250,
          agencyFee: 250,
          currency: "USD",
          status: "pending",
          paymentMethod: "stripe_connect",
          createdAt: "2026-08-28T14:30:00Z",
        },
      ];
      db.updateState((s) => {
        s.payouts = defaultPayouts;
      });
      state.payouts = defaultPayouts;
    }

    if (creatorId) {
      const creatorIds = [creatorId];
      if (creatorId === "creator-1") creatorIds.push("creator-demo");
      if (creatorId === "creator-demo") creatorIds.push("creator-1");
      return (state.payouts || []).filter((p) => creatorIds.includes(p.creatorId || ""));
    }
    return state.payouts || [];
  }

  async createPayout(payout: Omit<PayoutRecord, "id" | "createdAt">): Promise<PayoutRecord> {
    const id = `payout-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const isTest = payout.isTest ?? (process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") ?? (process.env.NODE_ENV !== "production"));
    const environment = payout.environment || (isTest ? "test" : "live");
    const newPayout: PayoutRecord = {
      ...payout,
      environment,
      isTest,
      id,
      createdAt: new Date().toISOString(),
    };
    db.updateState((s) => {
      s.payouts = s.payouts || [];
      s.payouts.unshift(newPayout);
    });
    return newPayout;
  }

  async releasePayout(id: string): Promise<PayoutRecord | null> {
    let released: PayoutRecord | null = null;
    db.updateState((s) => {
      s.payouts = s.payouts || [];
      const idx = s.payouts.findIndex((p) => p.id === id);
      if (idx !== -1) {
        if (s.payouts[idx].isTest && process.env.NODE_ENV === "production" && process.env.ALLOW_TEST_PAYOUTS_IN_PROD !== "true") {
          throw new Error("Test environment payouts cannot be settled in live production mode");
        }
        s.payouts[idx].status = "paid";
        s.payouts[idx].releasedAt = new Date().toISOString();
        released = s.payouts[idx];
      }
    });
    return released;
  }

  async recordWebhookEvent(event: Omit<WebhookEventEntity, "id" | "createdAt">): Promise<boolean> {
    let duplicate = false;
    db.updateState((s) => {
      s.webhookEvents = s.webhookEvents || [];
      if (s.webhookEvents.some((e) => e.providerEventId === event.providerEventId)) {
        duplicate = true;
        return;
      }
      s.webhookEvents.unshift({
        ...event,
        id: `wh-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    });
    return !duplicate;
  }
}

export const paymentRepo = new PaymentRepository();
