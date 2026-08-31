import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const app = campaignRepo.createApplication(body);

    auditRepo.logEvent({
      actorId: body.creator?.userId || "user-c1",
      actorName: body.creator?.fullName || "Creator",
      actorRole: "creator",
      action: "CAMPAIGN_APPLICATION_SUBMITTED",
      entityType: "Campaign",
      entityId: body.campaignId,
      entityName: body.pitch || "Campaign Pitch",
    });

    return NextResponse.json(app, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
