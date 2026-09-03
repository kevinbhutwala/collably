import { NextRequest, NextResponse } from "next/server";
import { disputeRepo } from "@/server/repositories/dispute.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";

import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const disputes = disputeRepo.getDisputes();
    // Non-admins only see disputes they are part of
    const adminRoles = ["super_admin", "agency_admin", "agency_owner", "moderator"];
    if (adminRoles.includes(session.role)) {
      return NextResponse.json(disputes);
    }

    const creator = creatorRepo.getByUserId(session.userId);
    const brand = brandRepo.getByUserId(session.userId);

    const userDisputes = disputes.filter(
      (d) =>
        d.filedByUserId === session.userId ||
        d.creatorUserId === session.userId ||
        d.brandUserId === session.userId ||
        (creator && d.creatorName === creator.fullName) ||
        (brand && d.brandName === brand.companyName)
    );
    return NextResponse.json(userDisputes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const body = await req.json();
    const { action, id, adminNotes, ...disputeData } = body;

    if (action === "resolve") {
      // Must be authorized admin
      const adminRoles = ["super_admin", "agency_admin", "agency_owner", "moderator"];
      if (!adminRoles.includes(session.role)) {
        return NextResponse.json({ error: "Forbidden: Only administrators can resolve disputes" }, { status: 403 });
      }

      const ok = disputeRepo.resolveDispute(id, adminNotes);

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "DISPUTE_ARBITRATED_RESOLVED",
        entityType: "Dispute",
        entityId: id,
        entityName: `Dispute ${id} resolved by ${session.email}`,
      });

      return NextResponse.json({ success: ok });
    }

    const newDispute = disputeRepo.fileDispute({
      ...disputeData,
      filedBy: session.role === "creator" ? "creator" : "brand",
    });

    auditRepo.logEvent({
      actorId: session.userId,
      actorName: session.email,
      actorRole: session.role,
      action: "ESCROW_DISPUTE_FILED",
      entityType: "Dispute",
      entityId: newDispute.id,
      entityName: newDispute.campaignTitle,
      metadata: { amount: newDispute.amountInDispute },
    });

    return NextResponse.json(newDispute, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
