import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

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
    // Strict authentication and role check (must be admin or finance manager)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }
    const adminRoles = ["super_admin", "agency_admin", "agency_owner", "finance_manager"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden: Admin privileges required to release payouts" }, { status: 403 });
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
