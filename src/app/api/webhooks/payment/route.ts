import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    // In production, webhook secret and signature are strictly mandatory
    if (process.env.NODE_ENV === "production" && !webhookSecret) {
      return NextResponse.json({ error: "Webhook secret is not configured on server" }, { status: 500 });
    }

    if (webhookSecret) {
      if (!signature) {
        return NextResponse.json({ error: "Missing x-razorpay-signature header" }, { status: 401 });
      }
      const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
      const sigBuf = Buffer.from(signature, "utf-8");
      const expBuf = Buffer.from(expected, "utf-8");
      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        return NextResponse.json({ error: "Invalid cryptographic webhook signature" }, { status: 401 });
      }
    } else {
      console.warn("⚠️ RAZORPAY_WEBHOOK_SECRET not set; running in local development mode.");
    }

    const event = JSON.parse(rawBody);
    const eventId = event.id || event.event_id || req.headers.get("x-razorpay-event-id");

    if (!eventId) {
      return NextResponse.json({ error: "Missing required webhook event identifier" }, { status: 400 });
    }

    const eventType = event.event || "payment.captured";
    const result = await paymentService.processWebhookEvent("razorpay", eventId, eventType, event.payload || event);

    return NextResponse.json({ received: true, duplicate: Boolean(result.duplicate), eventId });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}
