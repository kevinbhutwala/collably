import { NextRequest, NextResponse } from "next/server";
import { brandRepo } from "@/server/repositories/brand.repo";

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
