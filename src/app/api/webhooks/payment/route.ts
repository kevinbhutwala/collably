import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    // If secret is set, verify cryptographic signature
    if (webhookSecret) {
      const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
      if (signature !== expected) {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventId = event.event_id || event.id || `evt_${Date.now()}`;
    const eventType = event.event || "payment.captured";

    const result = await paymentService.processWebhookEvent("razorpay", eventId, eventType, event.payload || event);

    return NextResponse.json({ received: true, duplicate: result.duplicate });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}
