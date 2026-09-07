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
    if (creatorId) {
      return (state.payouts || []).filter((p) => p.creatorId === creatorId);
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
