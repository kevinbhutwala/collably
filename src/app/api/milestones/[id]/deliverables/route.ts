import { NextRequest, NextResponse } from "next/server";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { SecurityService } from "@/server/services/security.service";
import { auditRepo } from "@/server/repositories/audit.repo";
import { z } from "zod";

const deliverableSubmissionSchema = z.object({
  assetUrl: z
    .string({ required_error: "assetUrl is required" })
    .url("Invalid URL format")
    .refine((url) => url.startsWith("https://"), {
      message: "assetUrl must start with https://",
    }),
  notes: z.string().optional(),
});

export async function POST(
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

    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    const creator = creatorRepo.getByUserId(session.userId);

    const isAuthorizedCreator =
      Boolean(creator && (collaboration.creatorId === creator.id || collaboration.creator?.userId === session.userId));

    if (!isAdmin && !isAuthorizedCreator) {
      return NextResponse.json(
        { error: "Forbidden: Only assigned creator or admin can submit deliverables" },
        { status: 403 }
      );
    }

    if (collaboration.status === "cancelled") {
      return NextResponse.json(
        { error: "Cannot submit deliverables to a cancelled collaboration" },
        { status: 400 }
      );
    }

    if (!collaboration.isFunded || collaboration.paymentStatus === "payment_pending") {
      return NextResponse.json(
        { error: "COLLABORATION_UNFUNDED: Cannot submit deliverables before escrow is funded by brand." },
        { status: 400 }
      );
    }

    if (deliverable.status === "draft") {
      return NextResponse.json(
        { error: "Cannot submit deliverables while milestone is in DRAFT status. Must be pre-funded first." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parseResult = deliverableSubmissionSchema.safeParse(body);
    if (!parseResult.success) {
      const issue = parseResult.error.issues[0]?.message || "Invalid submission payload";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const { assetUrl, notes } = parseResult.data;

    // Prevent overwriting if currently submitted and locked (unless allowResubmit is specified)
    if (deliverable.status === "submitted" && !body.allowResubmit) {
      return NextResponse.json(
        { error: "Deliverable is currently SUBMITTED and locked for review." },
        { status: 423 }
      );
    }

    const updated = collaborationRepo.submitDeliverableDraft(
      collaboration.id,
      deliverable.id,
      {
        assetUrl,
        notes,
        mediaUrls: [assetUrl],
        creatorNotes: notes,
      }
    );

    auditRepo.logEvent({
      actorId: session.userId,
      actorName: session.email,
      actorRole: session.role,
      action: "DELIVERABLE_SUBMITTED",
      entityType: "Deliverable",
      entityId: deliverable.id,
      entityName: `Deliverable external submission for collab ${collaboration.id}`,
    });

    return NextResponse.json({
      success: true,
      milestone: updated,
      status: "SUBMITTED",
      submittedAt: updated?.submittedAt || new Date().toISOString(),
      slaDeadline: updated?.slaDeadline,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to submit deliverable" },
      { status: 500 }
    );
  }
}
