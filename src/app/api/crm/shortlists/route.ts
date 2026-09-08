import { NextRequest, NextResponse } from "next/server";
import { crmRepo } from "@/server/repositories/crm.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { verifySessionToken } from "@/server/auth/crypto";

function resolveBrandId(req: NextRequest, queryBrandId?: string): string {
  if (queryBrandId && queryBrandId !== "undefined") return queryBrandId;
  const token =
    req.cookies.get("abeycollab_session")?.value ||
    req.cookies.get("collably_session")?.value;
  if (token) {
    const session = verifySessionToken(token);
    if (session) {
      const brand = brandRepo.getByUserId(session.userId);
      if (brand) return brand.id;
    }
  }
  return "brand-demo";
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryBrandId = searchParams.get("brandId") || undefined;
    const brandId = resolveBrandId(req, queryBrandId);
    const lists = crmRepo.getShortlists(brandId);
    return NextResponse.json(lists);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, shortlistId, creator, creatorId, brandId: bodyBrandId, name, description } = body;
    const brandId = resolveBrandId(req, bodyBrandId);

    if (action === "toggleSave" || action === "toggleCreator") {
      if (!creator && !creatorId) {
        return NextResponse.json({ error: "creator or creatorId is required" }, { status: 400 });
      }
      const targetCreator = creator || { id: creatorId };
      const result = crmRepo.toggleCreatorInShortlist(shortlistId, targetCreator, brandId);
      return NextResponse.json({ success: true, ...result });
    }

    if (action === "addCreator") {
      if (!creator) {
        return NextResponse.json({ error: "creator object is required" }, { status: 400 });
      }
      const ok = crmRepo.addCreatorToShortlist(shortlistId, creator);
      return NextResponse.json({ success: ok });
    }

    if (action === "removeCreator") {
      const cId = creatorId || creator?.id;
      if (!cId) {
        return NextResponse.json({ error: "creatorId is required" }, { status: 400 });
      }
      const ok = crmRepo.removeCreatorFromShortlist(shortlistId, cId);
      return NextResponse.json({ success: ok });
    }

    const newSl = crmRepo.createShortlist(brandId, name || "New Shortlist", description || "");
    return NextResponse.json(newSl, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shortlistId = searchParams.get("shortlistId");
    const creatorId = searchParams.get("creatorId");

    if (shortlistId && creatorId) {
      const ok = crmRepo.removeCreatorFromShortlist(shortlistId, creatorId);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: "shortlistId and creatorId required" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
