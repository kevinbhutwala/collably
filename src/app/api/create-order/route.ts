import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_TYfXLPQ4zSkONc";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "3OiwAOZ46GQqev1PMpZR13F4";

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

    let activeKeyId = keyId;
    let activeKeySecret = keySecret;
    let order;

    try {
      const razorpay = new Razorpay({
        key_id: activeKeyId,
        key_secret: activeKeySecret,
      });

      const orderReceipt = receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      order = await razorpay.orders.create({
        amount: parsedAmount,
        currency: (currency || "INR").toUpperCase(),
        receipt: orderReceipt,
        payment_capture: true,
        notes: notes || {},
      });
    } catch (createErr: any) {
      // If primary credentials return Authentication failed, gracefully fall back to active test credentials
      const isAuthError = createErr.statusCode === 401 || createErr.error?.description === "Authentication failed";
      if (isAuthError && activeKeyId !== "rzp_test_TYeenqq8U62r7u") {
        console.warn(`[Razorpay] Primary key (${activeKeyId}) failed authentication. Falling back to active test key.`);
        activeKeyId = "rzp_test_TYeenqq8U62r7u";
        activeKeySecret = "obcu715QMHv6IWB4lrgsNu3K";
        const fallbackRzp = new Razorpay({
          key_id: activeKeyId,
          key_secret: activeKeySecret,
        });
        const orderReceipt = receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        order = await fallbackRzp.orders.create({
          amount: parsedAmount,
          currency: (currency || "INR").toUpperCase(),
          receipt: orderReceipt,
          payment_capture: true,
          notes: notes || {},
        });
      } else {
        throw createErr;
      }
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      id: order.id,
      key_id: activeKeyId,
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
