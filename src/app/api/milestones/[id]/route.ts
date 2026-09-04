import { NextRequest, NextResponse } from "next/server";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Active session required" },
        { status: 401 }
      );
    }

    const milestoneRecord = collaborationRepo.findDeliverableById(params.id);
    if (!milestoneRecord) {
      return NextResponse.json(
        { error: "Milestone not found" },
        { status: 404 }
      );
    }

    const { collaboration, deliverable } = milestoneRecord;

    // Horizontal Tenant Isolation (IDOR Check)
    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    const creator = creatorRepo.getByUserId(session.userId);
    const brand = brandRepo.getByUserId(session.userId);

    const isAuthorizedCreator =
      Boolean(creator && (collaboration.creatorId === creator.id || collaboration.creator?.userId === session.userId));
    const isAuthorizedBrand =
      Boolean(brand && (collaboration.brandId === brand.id || collaboration.brand?.userId === session.userId));

    if (!isAdmin && !isAuthorizedCreator && !isAuthorizedBrand) {
      return NextResponse.json(
        { error: "Forbidden: Access denied to foreign milestone records" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      milestone: deliverable,
      collaborationId: collaboration.id,
      campaignTitle: collaboration.campaignTitle,
      escrowStatus: collaboration.escrowStatus,
      status: deliverable.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch milestone" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Active session required" },
        { status: 401 }
      );
    }

    const milestoneRecord = collaborationRepo.findDeliverableById(params.id);
    if (!milestoneRecord) {
      return NextResponse.json(
        { error: "Milestone not found" },
        { status: 404 }
      );
    }

    const { collaboration, deliverable } = milestoneRecord;

    // Horizontal Tenant Isolation (IDOR Check)
    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    const creator = creatorRepo.getByUserId(session.userId);
    const brand = brandRepo.getByUserId(session.userId);

    const isAuthorizedCreator =
      Boolean(creator && (collaboration.creatorId === creator.id || collaboration.creator?.userId === session.userId));
    const isAuthorizedBrand =
      Boolean(brand && (collaboration.brandId === brand.id || collaboration.brand?.userId === session.userId));

    if (!isAdmin && !isAuthorizedCreator && !isAuthorizedBrand) {
      return NextResponse.json(
        { error: "Forbidden: You cannot modify a foreign milestone" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Enforce Phase 2 State Transition Rule: Cannot submit deliverables if milestone is still in DRAFT
    if (body.action === "submit" || body.mediaUrls || body.assetUrl) {
      if (collaboration.status === "cancelled") {
        return NextResponse.json(
          { error: "Cannot submit deliverables to a cancelled collaboration" },
          { status: 400 }
        );
      }
      if (deliverable.status === "draft") {
        return NextResponse.json(
          { error: "Cannot submit deliverables while milestone is in DRAFT status. Must be pre-funded first." },
          { status: 400 }
        );
      }
      // Milestone Status Lock: If already submitted and locked, prevent replacement unless revision requested
      if (deliverable.status === "submitted" && !body.allowResubmit) {
        return NextResponse.json(
          { error: "Deliverable is currently SUBMITTED and locked for review." },
          { status: 423 }
        );
      }

      const assetUrl = body.assetUrl || (body.mediaUrls && body.mediaUrls[0]) || "";
      if (assetUrl && !assetUrl.startsWith("https://")) {
        return NextResponse.json(
          { error: "Deliverable link must start with https://" },
          { status: 400 }
        );
      }

      const updated = collaborationRepo.submitDeliverableDraft(
        collaboration.id,
        deliverable.id,
        {
          assetUrl,
          notes: body.notes !== undefined ? body.notes : body.creatorNotes,
          mediaUrls: assetUrl ? [assetUrl] : body.mediaUrls || [],
          captionText: body.captionText || "",
          creatorNotes: body.notes !== undefined ? body.notes : body.creatorNotes,
        }
      );
      return NextResponse.json({
        success: true,
        milestone: updated,
        status: "SUBMITTED",
        submittedAt: updated?.submittedAt,
        slaDeadline: updated?.slaDeadline,
      });
    }

    // Role-based status transitions
    if (body.status) {
      if (body.status === "approved" && !isAuthorizedBrand && !isAdmin) {
        return NextResponse.json(
          { error: "Forbidden: Only brands or admins can approve deliverables" },
          { status: 403 }
        );
      }

      const updatedCollab = collaborationRepo.updateDeliverableStatus(
        collaboration.id,
        deliverable.id,
        body.status
      );
      return NextResponse.json({
        success: true,
        status: body.status,
        collaboration: updatedCollab,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update milestone" },
      { status: 400 }
    );
  }
}
