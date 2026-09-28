import { NextRequest, NextResponse } from "next/server";
import { collaborationProtectionService } from "@/server/services/collaboration-protection.service";
import { SecurityService } from "@/server/services/security.service";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Active session required" }, { status: 401 });
    }

    const collab = collaborationRepo.getById(params.id);
    if (!collab) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }

    const adminRoles = ["super_admin", "agency_admin", "agency_owner", "moderator", "admin", "finance_manager"];
    const isAdmin = adminRoles.includes(session.role);
    const creator = creatorRepo.getByUserId(session.userId);
    const brand = brandRepo.getByUserId(session.userId);

    const isAuthorizedCreator =
      Boolean(creator && (collab.creatorId === creator.id || collab.creator?.userId === session.userId)) ||
      collab.creatorId === session.userId;
    const isAuthorizedBrand =
      Boolean(brand && (collab.brandId === brand.id || collab.brand?.userId === session.userId)) ||
      collab.brandId === session.userId;

    if (!isAdmin && !isAuthorizedCreator && !isAuthorizedBrand) {
      return NextResponse.json(
        { error: "Forbidden: You are not authorized to cancel this collaboration" },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const reason = body?.reason || "Administrative arbitration / cancellation requested";

    const result = await collaborationProtectionService.cancelCollaboration({
      collaborationId: params.id,
      actorUserId: session.userId,
      actorRole: session.role as any,
      reason,
    });

    return NextResponse.json({
      success: true,
      status: "CANCELLED",
      stage: result.stage,
      refundAmountDollars: result.refundAmountDollars,
      killFeeAmountDollars: result.killFeeAmountDollars,
      currency: result.collaboration.currency || "INR",
      transactionId: result.transactionId,
      collaboration: result.collaboration,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to cancel collaboration" },
      { status: 400 }
    );
  }
}
