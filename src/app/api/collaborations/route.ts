import { NextRequest, NextResponse } from "next/server";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { verifySessionToken } from "@/server/auth/crypto";
import { db } from "@/server/db/database";
import { Collaboration } from "@/core/types";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      creatorId,
      brandId: inputBrandId,
      campaignTitle = "Direct Sponsorship Proposal",
      totalAgreedBudget = 2500,
      notes = "",
      deliverableType = "Short-Form Video (Reels / Shorts)",
    } = body;

    if (!creatorId) {
      return NextResponse.json({ error: "Missing creatorId" }, { status: 400 });
    }

    const state = db.getState();
    const creator = state.creators.find((c) => c.id === creatorId || c.userId === creatorId);
    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }

    // Determine brand identity from session or input
    let brandId = inputBrandId;
    const token =
      req.cookies.get("abeycollab_session")?.value ||
      req.cookies.get("collably_session")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (token) {
      const payload = verifySessionToken(token);
      if (payload?.userId) {
        const userBrand = state.brands.find((b) => b.userId === payload.userId || b.id === payload.userId);
        if (userBrand) brandId = userBrand.id;
      }
    }

    const brand = (brandId && state.brands.find((b) => b.id === brandId)) || state.brands[0];
    const budgetNum = Number(totalAgreedBudget) || 2000;
    const now = new Date();
    const deadline = new Date(now.getTime() + 14 * 86400000);

    const newCollabData: Omit<Collaboration, "id" | "createdAt" | "updatedAt"> = {
      campaignId: `camp-direct-${Date.now()}`,
      campaignTitle,
      brandId: brand.id,
      brand,
      creatorId: creator.id,
      creator,
      totalAgreedBudget: budgetNum,
      escrowStatus: "pending_deposit",
      status: "active",
      paymentStatus: "payment_pending",
      isFunded: false,
      startDate: now.toISOString(),
      finalDeadline: deadline.toISOString(),
      postingDeadline: deadline.toISOString(),
      deliverables: [
        {
          id: `del-${Date.now()}-1`,
          type: (deliverableType as any) || "Short-Form Video (Reels / Shorts)",
          title: `${campaignTitle} - Primary Deliverable`,
          status: "assigned",
          dueDate: deadline.toISOString(),
          payoutAmount: budgetNum,
          revisionCount: 0,
          maxRevisions: 2,
          notes,
          submissions: [],
        },
      ],
      negotiationHistory: notes
        ? [
            {
              id: `offer-${Date.now()}`,
              senderRole: "brand",
              senderName: brand.companyName,
              amount: budgetNum,
              deliverableTerms: deliverableType,
              notes,
              status: "offered",
              createdAt: now.toISOString(),
            },
          ]
        : [],
    };

    const collaboration = collaborationRepo.createCollaboration(newCollabData);

    return NextResponse.json({
      success: true,
      collaboration,
    });
  } catch (err: any) {
    console.error("Failed to create collaboration:", err);
    return NextResponse.json({ error: err.message || "Failed to create collaboration" }, { status: 500 });
  }
}
