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

    const body = await req.json();
    const reason = body.reason || "Mutual agreement / cancellation requested";

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
