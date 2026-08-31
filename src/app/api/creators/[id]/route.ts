import { NextRequest, NextResponse } from "next/server";
import { creatorRepo } from "@/server/repositories/creator.repo";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const creator = creatorRepo.getById(params.id);
    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }
    return NextResponse.json(creator);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
