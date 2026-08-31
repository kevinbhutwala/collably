import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get("creatorId") || undefined;
    const payouts = await paymentService.getPayouts(creatorId);
    return NextResponse.json({ payouts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch payouts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (session && !SecurityService.hasPermission(session.role, "payment.manage")) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 403 });
    }

    const body = await req.json();
    if (!body.payoutId) {
      return NextResponse.json({ error: "payoutId is required" }, { status: 400 });
    }

    const payout = await paymentService.releasePayout(body.payoutId);
    return NextResponse.json({ success: true, payout });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to release payout" }, { status: 400 });
  }
}
