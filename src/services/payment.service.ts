import { PayoutRecord } from "../core/types";

class PaymentService {
  async getPayouts(creatorId?: string): Promise<PayoutRecord[]> {
    try {
      const url = creatorId ? `/api/payments/payouts?creatorId=${encodeURIComponent(creatorId)}` : `/api/payments/payouts`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data.payouts || [];
      }
    } catch (err) {
      console.warn("API payout fetch error, checking fallback:", err);
    }
    return [];
  }

  async releaseTranche(payoutId: string): Promise<PayoutRecord> {
    const res = await fetch("/api/payments/payouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payoutId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to release payout");
    }
    const data = await res.json();
    return data.payout;
  }

  async createPaymentOrder(params: {
    brandId: string;
    campaignId?: string;
    collaborationId?: string;
    amount: number;
    currency?: string;
  }) {
    const res = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to create payment order");
    }
    return res.json();
  }

  async verifyPayment(orderId: string, paymentId: string, signature?: string) {
    const res = await fetch("/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, paymentId, signature }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to verify payment");
    }
    return res.json();
  }
}

export const paymentService = new PaymentService();
