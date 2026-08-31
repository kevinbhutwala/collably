import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import { SecurityService } from "@/server/services/security.service";
import crypto from "crypto";
import { z } from "zod";

const verifyPaymentSchema = z.object({
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
  signature: z.string().min(1), // Signature is strictly mandatory
});

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Authentication required to verify payment" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = verifyPaymentSchema.parse(body);

    // Cryptographically verify Razorpay / Gateway signature if secret is present
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (keySecret) {
      const payload = `${parsed.orderId}|${parsed.paymentId}`;
      const expected = crypto.createHmac("sha256", keySecret).update(payload).digest("hex");

      const sigBuf = Buffer.from(parsed.signature, "utf-8");
      const expBuf = Buffer.from(expected, "utf-8");
      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        return NextResponse.json({ error: "Invalid payment signature verification failed" }, { status: 400 });
      }
    } else if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Payment gateway secret not configured" }, { status: 500 });
    }

    const payment = await paymentService.verifyPaymentCapture(
      parsed.orderId,
      parsed.paymentId,
      parsed.signature
    );

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: error.message || "Failed to verify payment" }, { status: 400 });
  }
}
