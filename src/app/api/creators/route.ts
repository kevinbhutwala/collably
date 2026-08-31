import { NextRequest, NextResponse } from "next/server";
import { creatorRepo } from "@/server/repositories/creator.repo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const platform = searchParams.get("platform") as any || undefined;
    const searchQuery = searchParams.get("searchQuery") || undefined;

    const creators = creatorRepo.getAll({
      category,
      platform,
      searchQuery,
    });

    return NextResponse.json(creators);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
