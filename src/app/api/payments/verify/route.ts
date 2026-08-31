import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import { z } from "zod";

const verifyPaymentSchema = z.object({
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
  signature: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifyPaymentSchema.parse(body);

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
