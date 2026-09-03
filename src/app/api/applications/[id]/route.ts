import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { applicationService } from "@/server/services/application.service";
import { SecurityService } from "@/server/services/security.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const application = campaignRepo.findApplicationById(params.id);
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json(application);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch application" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !["accepted", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    if (status === "accepted") {
      // Use applicationService to accept and generate collaboration
      const result = await applicationService.acceptApplication(
        params.id,
        session.userId,
        session.role
      );
      return NextResponse.json({ success: true, ...result });
    } else {
      const updated = campaignRepo.updateApplicationStatus(params.id, status);
      if (!updated) {
        return NextResponse.json({ error: "Application not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, application: updated });
    }
  } catch (err: any) {
    console.error("Application update error:", err);
    return NextResponse.json({ error: err.message || "Failed to update application" }, { status: 400 });
  }
}
