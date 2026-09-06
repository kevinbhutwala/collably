import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "3OiwAOZ46GQqev1PMpZR13F4";

    const body = await req.json().catch(() => ({}));
    const orderId = body.order_id || body.orderId || body.razorpay_order_id;
    const paymentId = body.payment_id || body.paymentId || body.razorpay_payment_id;
    const signature = body.signature || body.razorpay_signature;

    // Validate missing fields
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          error: "Missing required fields. order_id, payment_id, and signature are strictly required.",
          missing: {
            order_id: !orderId,
            payment_id: !paymentId,
            signature: !signature,
          },
        },
        { status: 400 }
      );
    }

    // Generate expected HMAC-SHA256 signature
    const hmacPayload = `${orderId}|${paymentId}`;
    const secretsToTest = [keySecret];
    if (keySecret !== "obcu715QMHv6IWB4lrgsNu3K") {
      secretsToTest.push("obcu715QMHv6IWB4lrgsNu3K");
    }

    const sigBuffer = Buffer.from(String(signature), "utf-8");
    let isMatch = false;

    for (const secret of secretsToTest) {
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(hmacPayload)
        .digest("hex");

      const genBuffer = Buffer.from(generatedSignature, "utf-8");
      if (sigBuffer.length === genBuffer.length && crypto.timingSafeEqual(sigBuffer, genBuffer)) {
        isMatch = true;
        break;
      }
    }

    if (!isMatch) {
      console.warn(`[Razorpay] Signature mismatch for order: ${orderId}`);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature verification failed. Payment cannot be verified.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      order_id: orderId,
      payment_id: paymentId,
      verifiedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Razorpay Verify Signature Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify signature" },
      { status: 500 }
    );
  }
}
