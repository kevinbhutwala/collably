import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import { SecurityService } from "@/server/services/security.service";
import { brandRepo } from "@/server/repositories/brand.repo";
import { z } from "zod";

const createOrderSchema = z.object({
  brandId: z.string().min(1),
  campaignId: z.string().optional(),
  collaborationId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default("INR"),
});

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Authentication required to create a payment order" }, { status: 401 });
    }
    if (!SecurityService.hasPermission(session.role, "payment.create")) {
      return NextResponse.json({ error: "Only brand accounts can create payment orders" }, { status: 403 });
    }
    // Rate limit payment creation (10 requests per minute)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { allowed } = SecurityService.checkRateLimit(`pay_order:${ip}`, 10, 60);
    if (!allowed) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = createOrderSchema.parse(body);
    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    const ownedBrand = brandRepo.getByUserId(session.userId);
    if (!isAdmin && ownedBrand?.id !== parsed.brandId) {
      return NextResponse.json({ error: "Cannot create payment orders for another brand" }, { status: 403 });
    }

    const payment = await paymentService.createCampaignOrder({
      brandId: parsed.brandId,
      campaignId: parsed.campaignId,
      collaborationId: parsed.collaborationId,
      amount: parsed.amount,
      currency: parsed.currency,
    });

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error("Create payment order error:", error);
    return NextResponse.json({ error: error.message || "Failed to create payment order" }, { status: 400 });
  }
}
