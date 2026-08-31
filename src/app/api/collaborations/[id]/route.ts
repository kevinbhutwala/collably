import { NextRequest, NextResponse } from "next/server";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

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
    const body = await req.json();
    const { action, deliverableId, mediaUrls, captionText, creatorNotes } = body;

    if (action === "submit") {
      const updatedDel = collaborationRepo.submitDeliverableDraft(params.id, deliverableId, {
        mediaUrls,
        captionText,
        creatorNotes,
      });

      auditRepo.logEvent({
        actorId: "user-creator",
        actorName: "Creator",
        actorRole: "creator",
        action: "DELIVERABLE_SUBMITTED",
        entityType: "Deliverable",
        entityId: deliverableId,
        entityName: `Deliverable draft for collab ${params.id}`,
      });

      return NextResponse.json({ success: true, deliverable: updatedDel });
    }

    if (action === "approve") {
      const ok = collaborationRepo.approveDeliverable(params.id, deliverableId);

      auditRepo.logEvent({
        actorId: "user-brand",
        actorName: "Brand",
        actorRole: "brand",
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
