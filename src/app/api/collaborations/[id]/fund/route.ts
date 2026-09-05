import { NextRequest, NextResponse } from "next/server";
import { collaborationProtectionService } from "@/server/services/collaboration-protection.service";
import { SecurityService } from "@/server/services/security.service";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";

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

    const isBrandOrAdmin =
      ["brand", "brand_owner", "brand_manager", "super_admin", "agency_admin"].includes(session.role);

    if (!isBrandOrAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Only the sponsoring brand or platform administrator can fund escrow" },
        { status: 403 }
      );
    }

    const result = await collaborationProtectionService.fundCollaborationEscrow({
      collaborationId: params.id,
      brandUserId: session.userId,
      actorRole: session.role,
    });

    return NextResponse.json({
      success: true,
      status: "PAYMENT_SECURED",
      message: "Escrow funds locked securely. Creator is now authorized to begin production.",
      transactionId: result.transactionId,
      collaboration: result.collaboration,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fund collaboration escrow" },
      { status: 400 }
    );
  }
}
