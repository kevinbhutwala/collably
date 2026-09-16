import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const campaign = campaignRepo.getById(params.id);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }
    return NextResponse.json(campaign);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const campaign = campaignRepo.getById(params.id);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    const isOwner = campaign.brand?.userId === session.userId;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden: You cannot modify another brand's campaign" }, { status: 403 });
    }

    const body = await req.json();
    const updated = campaignRepo.updateCampaign(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
    }

    // If status changed, log audit event
    if (body.status && body.status !== campaign.status) {
      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: `CAMPAIGN_STATUS_${body.status.toUpperCase()}`,
        entityType: "Campaign",
        entityId: params.id,
        entityName: updated.title,
        metadata: {
          previousStatus: campaign.status,
          newStatus: body.status,
        },
      });
    }

    return NextResponse.json({ success: true, campaign: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update campaign" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const campaign = campaignRepo.getById(params.id);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    const isOwner = campaign.brand?.userId === session.userId;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden: You cannot delete this campaign" }, { status: 403 });
    }

    const updated = campaignRepo.updateCampaign(params.id, { status: "archived" as any });
    return NextResponse.json({ success: true, campaign: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete campaign" }, { status: 500 });
  }
}
