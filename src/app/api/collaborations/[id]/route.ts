import { NextRequest, NextResponse } from "next/server";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collab = collaborationRepo.getById(params.id);
    if (!collab) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }
    return NextResponse.json(collab);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Enforce authenticated session
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const collab = collaborationRepo.getById(params.id);
    if (!collab) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }

    const body = await req.json();
    const { action, deliverableId, mediaUrls, captionText, creatorNotes } = body;

    if (action === "submit") {
      // Must be creator or admin
      if (session.role !== "creator" && session.role !== "super_admin" && session.role !== "agency_admin") {
        return NextResponse.json({ error: "Forbidden: Only creators can submit deliverable drafts" }, { status: 403 });
      }

      const updatedDel = collaborationRepo.submitDeliverableDraft(params.id, deliverableId, {
        mediaUrls,
        captionText,
        creatorNotes,
      });

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "DELIVERABLE_SUBMITTED",
        entityType: "Deliverable",
        entityId: deliverableId,
        entityName: `Deliverable draft for collab ${params.id}`,
      });

      return NextResponse.json({ success: true, deliverable: updatedDel });
    }

    if (action === "approve") {
      // Must be brand or admin
      const isBrandRole = ["brand", "brand_owner", "brand_manager", "super_admin", "agency_admin"].includes(session.role);
      if (!isBrandRole) {
        return NextResponse.json({ error: "Forbidden: Only sponsoring brand can approve deliverables" }, { status: 403 });
      }

      const ok = collaborationRepo.approveDeliverable(params.id, deliverableId);

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "DELIVERABLE_APPROVED_TRANCHE_RELEASED",
        entityType: "Deliverable",
        entityId: deliverableId,
        entityName: `Deliverable approved for collab ${params.id}`,
      });

      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
