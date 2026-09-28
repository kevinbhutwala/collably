import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { subscriptionService } from "@/server/services/subscription.service";
import { verifySessionToken } from "@/server/auth/crypto";

export const dynamic = "force-dynamic";

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

    let user = userRepo.findById(payload.userId);
    if (!user && payload.email) {
      user = userRepo.findByEmail(payload.email);
    }
    if (!user && payload.userId) {
      user = await userRepo.findByIdAsync(payload.userId);
    }
    if (!user && payload.email) {
      user = await userRepo.findByEmailAsync(payload.email);
    }
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const nowIso = new Date().toISOString();
    userRepo.updateUser(user.id, {
      lastActiveAt: nowIso,
    });

    let creatorProfile =
      user.role === "creator" || user.role === "agency_admin" || user.role === "super_admin"
        ? (creatorRepo.getByUserId(user.id) || creatorRepo.getById(user.id))
        : null;

    if (user.role === "creator" && !creatorProfile) {
      const cleanHandle = (user.name || "creator").toLowerCase().replace(/[^a-zA-Z0-9_]/g, "");
      creatorProfile = creatorRepo.createCreator({
        userId: user.id,
        email: user.email,
        fullName: user.name || "Content Creator",
        handle: cleanHandle,
        headline: "Digital Storyteller & Content Creator",
        bio: "Curating high-impact branded storytelling and authentic content partnerships.",
        avatarUrl: user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        location: user.country === "IN" ? "Mumbai, India" : "New York, USA",
        languages: ["English"],
        primaryCategory: "Lifestyle & Travel",
        secondaryCategories: ["Technology & AI"],
        verified: false,
        featured: false,
        tier: "Nano",
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers: 0,
        avgEngagementRate: 0,
        startingPrice: user.country === "IN" ? 5000 : 250,
        currency: user.country === "IN" ? "INR" : "USD",
        availableForHire: true,
        profileCompleteness: 50,
        qualityScore: 80,
        socialAccounts: [],
        rateCards: [],
        audience: {
          topCountries: [
            { country: user.country === "IN" ? "India" : "United States", percentage: 75 },
            { country: "United Kingdom", percentage: 15 },
            { country: "Canada", percentage: 10 },
          ],
          ageDistribution: [
            { range: "18-24", percentage: 40 },
            { range: "25-34", percentage: 50 },
            { range: "35-44", percentage: 10 },
          ],
          genderSplit: [
            { gender: "Female", percentage: 50 },
            { gender: "Male", percentage: 50 },
          ],
          interests: ["Lifestyle", "Technology", "Fashion", "Wellness"],
        },
      });
    }

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
        lastLoginAt: user.lastLoginAt,
        lastActiveAt: nowIso,
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

