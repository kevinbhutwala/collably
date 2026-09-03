import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get("campaignId") || undefined;
    const status = searchParams.get("status") || undefined;

    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    let applications = campaignRepo.getApplications(campaignId);

    if (!isAdmin) {
      if (session.role === "creator") {
        const creator = creatorRepo.getByUserId(session.userId);
        if (!creator) return NextResponse.json([]);
        applications = applications.filter((a) => a.creatorId === creator.id);
      } else if (session.role === "brand" || session.role === "brand_owner" || session.role === "brand_manager") {
        const brand = brandRepo.getByUserId(session.userId);
        if (!brand) return NextResponse.json([]);
        applications = applications.filter((a) => a.brandId === brand.id);
      }
    }

    if (status) {
      applications = applications.filter((a) => a.status === status);
    }

    return NextResponse.json(applications);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch applications" }, { status: 500 });
  }
}
