import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { createSessionToken } from "@/server/auth/crypto";
import { CreatorProfile, BrandProfile, RateCardItem, SocialAccount } from "@/core/types";
import { buildSocialAccountsFromInput, calculateTotalFollowers, calculateAvgEngagementRate, getCreatorTier } from "@/core/utils/social";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  role: z.enum(["creator", "brand"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      role,
      handle,
      companyName,
      contactName,
      category,
      primaryCategory,
      industry,
      location,
      websiteUrl,
      companySize,
      monthlyBudget,
      bio,
      startingPrice,
      currency,
      socialAccounts: inputSocialAccounts,
      gender,
      avatarUrl,
      logoUrl,
      youtubeHandle,
      youtubeSubscribers,
      instagramHandle,
      instagramFollowers,
      tiktokHandle,
      tiktokFollowers,
      xHandle,
      xFollowers,
      linkedinHandle,
      linkedinFollowers,
    } = body;

    const credentials = registrationSchema.parse({
      name: (role === "brand" ? (contactName || name || companyName) : name)?.trim(),
      email: email?.trim(),
      password,
      role,
    });

    const resolvedAvatar = role === "brand" ? (logoUrl || avatarUrl) : avatarUrl;

    const newUser = await userRepo.createUserAsync({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,
      avatarUrl: resolvedAvatar || undefined,
      gender: gender || undefined,
    });

    let creatorProfile: CreatorProfile | null = null;
    let brandProfile: BrandProfile | null = null;

    if (role === "creator") {
      const cleanHandle = (handle || name.toLowerCase().replace(/\s+/g, "")).replace("@", "");
      
      // Build social accounts from either array or specific input fields
      let accounts: SocialAccount[] = [];
      if (Array.isArray(inputSocialAccounts) && inputSocialAccounts.length > 0) {
        accounts = inputSocialAccounts;
      } else {
        accounts = buildSocialAccountsFromInput({
          youtubeHandle,
          youtubeSubscribers,
          instagramHandle,
          instagramFollowers,
          tiktokHandle,
          tiktokFollowers,
          xHandle: xHandle ? xHandle.replace("@", "") : undefined,
          xFollowers,
          linkedinHandle,
          linkedinFollowers,
        });
      }

      // Real user accounts: only include what the creator explicitly provided
      const totalFollowers = calculateTotalFollowers(accounts);
      const avgEngagementRate = accounts.length > 0 ? calculateAvgEngagementRate(accounts) : 0;
      const tier = getCreatorTier(totalFollowers);
      const creatorCurrency = "INR";
      const basePrice = startingPrice ? parseInt(startingPrice) : 0;

      // Rate cards are empty unless the creator explicitly defines packages
      const rateCards: RateCardItem[] = [];

      creatorProfile = {
        id: `creator-${Date.now()}`,
        userId: newUser.id,
        email: newUser.email,
        fullName: name,
        handle: cleanHandle,
        headline: "",
        bio: bio || "",
        gender: (gender as any) || undefined,
        avatarUrl: newUser.avatarUrl || "",
        coverImageUrl: "",
        location: location || "",
        languages: [],
        primaryCategory: category || "",
        secondaryCategories: [],
        verified: false,
        featured: false,
        tier,
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers,
        avgEngagementRate,
        startingPrice: basePrice,
        currency: creatorCurrency,
        availableForHire: true,
        profileCompleteness: 0,
        qualityScore: 80,
        socialAccounts: accounts,
        audience: {
          topCountries: [],
          ageDistribution: [],
          genderSplit: [],
          interests: [],
        },
        rateCards,
      };
      if (creatorProfile) {
        creatorRepo.createOrUpdate(creatorProfile);
      }
    } else if (role === "brand") {
      const cName = companyName || name;
      brandProfile = {
        id: `brand-${Date.now()}`,
        userId: newUser.id,
        email: newUser.email,
        companyName: cName,
        industry: industry || "",
        headline: "",
        description: "",
        logoUrl: logoUrl || newUser.avatarUrl || "",
        coverImageUrl: "",
        websiteUrl: websiteUrl || "",
        location: location || "",
        companySize: companySize || "",
        verified: false,
        activeCampaignsCount: 0,
        totalSpent: 0,
        socialHandles: {},
        createdAt: new Date().toISOString(),
      };
      if (brandProfile) {
        brandRepo.createOrUpdate(brandProfile);
      }
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

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    };
    response.cookies.set("abeycollab_session", token, cookieOptions);
    response.cookies.set("collably_session", token, cookieOptions);

    return response;
  } catch (err: any) {
    console.error("Register API error:", err);
    if (err instanceof z.ZodError) {
      const firstIssue = err.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message || "Invalid registration information" },
        { status: 400 }
      );
    }
    const message = err.message || "Registration failed";
    const status = message.toLowerCase().includes("already exists") ? 409 : 400;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
