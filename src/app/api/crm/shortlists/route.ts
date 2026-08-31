import { NextRequest, NextResponse } from "next/server";
import { crmRepo } from "@/server/repositories/crm.repo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId") || undefined;
    const lists = crmRepo.getShortlists(brandId);
    return NextResponse.json(lists);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, shortlistId, creator, brandId, name, description } = body;

    if (action === "addCreator") {
      const ok = crmRepo.addCreatorToShortlist(shortlistId, creator);
      return NextResponse.json({ success: ok });
    }

    const newSl = crmRepo.createShortlist(brandId || "brand-1", name, description);
    return NextResponse.json(newSl, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
