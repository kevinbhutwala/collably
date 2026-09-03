import { NextRequest, NextResponse } from "next/server";
import { paymentRepo } from "@/server/repositories/payment.repo";
import { ledgerService } from "@/server/services/ledger.service";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    const eventId = event.id || event.event_id || `evt_${Date.now()}`;
    const eventType = event.type || event.event || "payment_intent.succeeded";

    // 1. Idempotency Check: Prevent duplicate ledger executions on replay
    const isNew = await paymentRepo.recordWebhookEvent({
      provider: "stripe",
      providerEventId: eventId,
      eventType,
      payload: event.data?.object || event.payload || event,
      status: "processed",
    });

    if (!isNew) {
      return NextResponse.json({
        received: true,
        status: "duplicate_ignored",
        eventId,
      });
    }

    // 2. Execute Ledger Credit on payment_intent.succeeded
    if (eventType === "payment_intent.succeeded") {
      const paymentIntent = event.data?.object || event;
      const metadata = paymentIntent.metadata || {};
      const milestoneId = metadata.milestoneId || paymentIntent.milestone_id || `deliv-${Date.now()}`;
      const collaborationId = metadata.collaborationId || paymentIntent.collaboration_id || "collab-default";
      const brandId = metadata.brandId || paymentIntent.brand_id || "brand-default";
      const amountDollars = paymentIntent.amount ? paymentIntent.amount / 100 : Number(metadata.amount || 3500);

      // Execute double-entry ledger fund
      await ledgerService.fundMilestoneEscrow({
        milestoneId,
        collaborationId,
        brandId,
        amountDollars,
        currency: paymentIntent.currency?.toUpperCase() || "USD",
      });

      // Update milestone status to FUNDED
      const milestoneRecord = collaborationRepo.findDeliverableById(milestoneId);
      if (milestoneRecord) {
        collaborationRepo.updateDeliverableStatus(
          milestoneRecord.collaboration.id,
          milestoneId,
          "assigned" // funded and active
        );
      }
    }

    return NextResponse.json({
      received: true,
      status: "processed",
      eventId,
    });
  } catch (error: any) {
    console.error("Stripe Webhook processing error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
