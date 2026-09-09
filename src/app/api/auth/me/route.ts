import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { subscriptionService } from "@/server/services/subscription.service";
import { verifySessionToken } from "@/server/auth/crypto";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("abeycollab_session")?.value ||
      req.cookies.get("collably_session")?.value ||
      req.cookies.get("valence_session")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const user = userRepo.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const creatorProfile = user.role === "creator" ? creatorRepo.getByUserId(user.id) : null;
    const brandProfile = user.role === "brand" ? brandRepo.getByUserId(user.id) : null;
    const subscription = await subscriptionService.getUserSubscription(user.id, user.role);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        verified: user.verified,
        preferredCurrency: user.preferredCurrency || user.preferred_currency || (user.country === "IN" ? "INR" : "USD"),
        preferred_currency: user.preferred_currency || user.preferredCurrency || (user.country === "IN" ? "INR" : "USD"),
        country: user.country || "US",
      },
      creatorProfile,
      brandProfile,
      subscription,
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token =
      req.cookies.get("abeycollab_session")?.value ||
      req.cookies.get("collably_session")?.value ||
      req.cookies.get("valence_session")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { preferredCurrency, preferred_currency, country } = body;

    const { getDefaultCurrencyForCountry } = await import("@/core/utils/currency");
    const rawCurrency = (preferredCurrency || preferred_currency)?.toUpperCase();
    if (rawCurrency && !["INR", "USD", "GBP", "AED"].includes(rawCurrency)) {
      return NextResponse.json(
        { error: "Invalid currency. Supported currencies: INR, USD, AED, GBP" },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (rawCurrency) {
      updates.preferredCurrency = rawCurrency;
      updates.preferred_currency = rawCurrency;
    }
    if (country) {
      updates.country = country;
      if (!rawCurrency) {
        const detected = getDefaultCurrencyForCountry(country);
        updates.preferredCurrency = detected;
        updates.preferred_currency = detected;
      }
    }

    const updated = userRepo.updateUser(payload.userId, updates);

    return NextResponse.json({
      success: true,
      user: updated ? {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        avatarUrl: updated.avatarUrl,
        verified: updated.verified,
        preferredCurrency: updated.preferredCurrency || updated.preferred_currency || "USD",
        preferred_currency: updated.preferred_currency || updated.preferredCurrency || "USD",
        country: updated.country,
      } : null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

