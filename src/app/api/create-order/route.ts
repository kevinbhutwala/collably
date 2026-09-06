import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay credentials missing in environment");
      return NextResponse.json(
        { error: "Payment gateway not configured. Missing API credentials." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { amount, currency = "INR", receipt, notes } = body;

    // Validate amount
    const parsedAmount = Math.round(Number(amount));
    if (!parsedAmount || isNaN(parsedAmount)) {
      return NextResponse.json(
        { error: "Invalid amount. Must be a valid integer." },
        { status: 400 }
      );
    }

    // Minimum 100 paise (1 INR / 100 subunits)
    if (parsedAmount < 100) {
      return NextResponse.json(
        { error: "Minimum order amount is 100 paise (₹1.00)." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const orderReceipt = receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const order = await razorpay.orders.create({
      amount: parsedAmount,
      currency: (currency || "INR").toUpperCase(),
      receipt: orderReceipt,
      notes: notes || {},
    });

    return NextResponse.json({
      success: true,
      order_id: order.id,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error("Razorpay Create Order Error:", error);
    const status = error.statusCode || (error.error?.code === "BAD_REQUEST_ERROR" ? 400 : 500);
    return NextResponse.json(
      { error: error.error?.description || error.message || "Failed to create Razorpay order" },
      { status }
    );
  }
}
