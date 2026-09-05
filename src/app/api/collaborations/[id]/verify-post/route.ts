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

    const isCreatorOrAdmin =
      ["creator", "super_admin", "agency_admin"].includes(session.role);

    if (!isCreatorOrAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Only assigned creator or admin can submit live post verification" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { postUrl, platform, screenshotUrl, metrics, notes } = body;

    if (!postUrl) {
      return NextResponse.json({ error: "postUrl is required" }, { status: 400 });
    }

    const result = await collaborationProtectionService.submitAndVerifyPostProof({
      collaborationId: params.id,
      creatorUserId: session.userId,
      postUrl,
      platform,
      screenshotUrl,
      metrics,
      notes,
    });

    return NextResponse.json({
      success: true,
      status: "POSTED",
      proof: result.proof,
      collaboration: result.collaboration,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to verify posting proof" },
      { status: 400 }
    );
  }
}
