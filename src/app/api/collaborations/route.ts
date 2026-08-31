import { NextRequest, NextResponse } from "next/server";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || undefined;
    const entityId = searchParams.get("entityId") || undefined;
    const list = collaborationRepo.getAll(role, entityId);
    return NextResponse.json(list);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
