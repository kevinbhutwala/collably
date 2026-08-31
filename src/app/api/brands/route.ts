import { NextRequest, NextResponse } from "next/server";
import { brandRepo } from "@/server/repositories/brand.repo";

export async function GET() {
  try {
    const brands = brandRepo.getAll();
    return NextResponse.json(brands);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
