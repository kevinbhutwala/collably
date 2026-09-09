import { NextRequest, NextResponse } from "next/server";
import { creatorRepo } from "@/server/repositories/creator.repo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const platform = searchParams.get("platform") as any || undefined;
    const searchQuery = searchParams.get("searchQuery") || undefined;
    const minRate = searchParams.get("minRate") ? parseFloat(searchParams.get("minRate")!) : undefined;
    const maxRate = searchParams.get("maxRate") ? parseFloat(searchParams.get("maxRate")!) : undefined;
    const filterCurrency = searchParams.get("filterCurrency") || searchParams.get("currency") || undefined;
    const sortBy = searchParams.get("sortBy") || undefined;
    const minFollowers = searchParams.get("minFollowers") ? parseInt(searchParams.get("minFollowers")!) : undefined;
    const maxFollowers = searchParams.get("maxFollowers") ? parseInt(searchParams.get("maxFollowers")!) : undefined;
    const minEngagement = searchParams.get("minEngagement") ? parseFloat(searchParams.get("minEngagement")!) : undefined;
    const verifiedOnly = searchParams.get("verifiedOnly") === "true";

    const creators = creatorRepo.getAll({
      category,
      platform,
      searchQuery,
      minRate,
      maxRate,
      filterCurrency,
      sortBy,
      minFollowers,
      maxFollowers,
      minEngagement,
      verifiedOnly,
    });

    return NextResponse.json(creators);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
