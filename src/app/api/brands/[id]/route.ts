import { NextRequest, NextResponse } from "next/server";
import { brandRepo } from "@/server/repositories/brand.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const brand = brandRepo.getById(params.id);
    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json(brand);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const brand = brandRepo.getById(params.id);
    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(session.role);
    if (!isAdmin && brand.userId !== session.userId) {
      return NextResponse.json({ error: "Forbidden: Cannot edit another brand profile" }, { status: 403 });
    }

    const body = await req.json();
    const updated = brandRepo.updateBrand(params.id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update brand profile" }, { status: 400 });
  }
}
