import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { createSessionToken } from "@/server/auth/crypto";
import { CreatorProfile, BrandProfile } from "@/core/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role, handle, companyName, category, industry } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required" },
        { status: 400 }
      );
    }

    const newUser = userRepo.createUser({
      name,
      email,
      password,
      role,
    });

    let creatorProfile: CreatorProfile | null = null;
    let brandProfile: BrandProfile | null = null;

    if (role === "creator") {
      const cleanHandle = (handle || name.toLowerCase().replace(/\s+/g, "")).replace("@", "");
      creatorProfile = {
        id: `creator-${Date.now()}`,
        userId: newUser.id,
        fullName: name,
        handle: cleanHandle,
        headline: `${category || "Technology"} Content Creator & Digital Storyteller`,
        bio: `Creating high-impact sponsored campaigns and organic content for top tier brand partners.`,
        avatarUrl: newUser.avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80`,
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        location: "United States",
        languages: ["English"],
        primaryCategory: category || "Technology & AI",
        secondaryCategories: ["Design & Creative"],
        verified: false,
        featured: false,
        tier: "Rising",
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers: 15000,
        avgEngagementRate: 5.2,
        startingPrice: 500,
        availableForHire: true,
        profileCompleteness: 75,
        qualityScore: 80,
        socialAccounts: [
          {
            id: `sa-${Date.now()}-x`,
            platform: "x",
            handle: cleanHandle,
            url: `https://x.com/${cleanHandle}`,
            followers: 15000,
            engagementRate: 5.2,
            avgViews: 8500,
            verifiedBadge: false,
          },
        ],
        audience: {
          topCountries: [
            { country: "United States", percentage: 65 },
            { country: "United Kingdom", percentage: 20 },
          ],
          ageDistribution: [
            { range: "18-24", percentage: 35 },
            { range: "25-34", percentage: 55 },
          ],
          genderSplit: [
            { gender: "Male", percentage: 60 },
            { gender: "Female", percentage: 40 },
          ],
          interests: ["Technology", "Creative Tools", "Software"],
        },
        rateCards: [
          {
            id: `rc-${Date.now()}`,
            deliverableType: "X (Twitter) Thread",
            title: "Dedicated Sponsored Post / Thread",
            description: "High engagement sponsored thread with trackable link.",
            basePrice: 500,
            turnaroundDays: 5,
            revisionsIncluded: 2,
          },
        ],
      };
      creatorRepo.createOrUpdate(creatorProfile);
    } else if (role === "brand") {
      const cName = companyName || name;
      brandProfile = {
        id: `brand-${Date.now()}`,
        userId: newUser.id,
        companyName: cName,
        industry: industry || "Technology & AI",
        headline: `${cName} Official Brand Workspace`,
        description: `Verified enterprise brand on VALENCE OS sponsoring creator partnerships.`,
        logoUrl: newUser.avatarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        websiteUrl: "https://valence.io",
        location: "San Francisco, CA",
        companySize: "10-50",
        verified: true,
        activeCampaignsCount: 0,
        totalSpent: 0,
        socialHandles: {},
        createdAt: new Date().toISOString(),
      };
      brandRepo.createOrUpdate(brandProfile);
    }

    const token = createSessionToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
        verified: newUser.verified,
      },
      creatorProfile,
      brandProfile,
      token,
    });

    response.cookies.set("collably_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Register API error:", err);
    return NextResponse.json(
      { error: err.message || "Registration failed" },
      { status: 400 }
    );
  }
}
