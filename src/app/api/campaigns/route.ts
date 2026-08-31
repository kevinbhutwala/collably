import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { Campaign } from "@/core/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") as any || undefined;
    const searchQuery = searchParams.get("searchQuery") || undefined;

    const campaigns = campaignRepo.getAll({
      category,
      status,
      searchQuery,
    });

    return NextResponse.json(campaigns);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCampaign = campaignRepo.createCampaign(body);

    // Record audit event
    auditRepo.logEvent({
      actorId: body.brand?.userId || "user-b1",
      actorName: body.brand?.companyName || "Brand",
      actorRole: "brand",
      action: "CAMPAIGN_CREATED",
      entityType: "Campaign",
      entityId: newCampaign.id,
      entityName: newCampaign.title,
      metadata: { budget: newCampaign.budget.totalBudget },
    });

    return NextResponse.json(newCampaign, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
