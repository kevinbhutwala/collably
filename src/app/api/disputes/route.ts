import { NextRequest, NextResponse } from "next/server";
import { disputeRepo } from "@/server/repositories/dispute.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

export async function GET() {
  try {
    const disputes = disputeRepo.getDisputes();
    return NextResponse.json(disputes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, adminNotes, ...disputeData } = body;

    if (action === "resolve") {
      const ok = disputeRepo.resolveDispute(id, adminNotes);

      auditRepo.logEvent({
        actorId: "user-admin",
        actorName: "Admin Arbitration",
        actorRole: "agency_admin",
        action: "DISPUTE_ARBITRATED_RESOLVED",
        entityType: "Dispute",
        entityId: id,
        entityName: `Dispute ${id} resolved`,
      });

      return NextResponse.json({ success: ok });
    }

    const newDispute = disputeRepo.fileDispute(disputeData);

    auditRepo.logEvent({
      actorId: disputeData.filedBy === "creator" ? "user-creator" : "user-brand",
      actorName: disputeData.filedBy === "creator" ? disputeData.creatorName : disputeData.brandName,
      actorRole: disputeData.filedBy,
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
