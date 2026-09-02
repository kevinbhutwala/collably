import { NextResponse } from "next/server";
import { CREATOR_PLANS, BRAND_PLANS, ALL_PLANS } from "@/core/constants";

export async function GET() {
  return NextResponse.json({
    creatorPlans: Object.values(CREATOR_PLANS),
    brandPlans: Object.values(BRAND_PLANS),
    allPlans: ALL_PLANS,
  });
}
