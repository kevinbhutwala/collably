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
      const creatorCurrency = (currency as any) || (location?.toLowerCase().includes("india") ? "INR" : "USD");
      const basePrice = startingPrice
        ? parseInt(startingPrice)
        : creatorCurrency === "INR"
        ? 5000
        : 250;

      // Build rate cards based on connected platforms
      const rateCards: RateCardItem[] = [];
      const now = Date.now();

      accounts.forEach((acc, idx) => {
        if (acc.platform === "youtube") {
          rateCards.push({
            id: `rc-${now}-${idx}`,
            deliverableType: "YouTube 60s Integration",
            title: "Dedicated 60s YouTube Integration / Segment",
            description: "High-retention 60-second mid-roll sponsor integration with clickable link in top pinned comment.",
            basePrice: Math.round(basePrice * 1.5),
            currency: creatorCurrency,
            turnaroundDays: 7,
            revisionsIncluded: 2,
          });
        } else if (acc.platform === "instagram") {
          rateCards.push({
            id: `rc-${now}-${idx}`,
            deliverableType: "Instagram Reel",
            title: "Dedicated Reel & Story Link Set",
            description: "High-aesthetic 9:16 vertical Reel plus 3-frame story sequence with direct swipe link.",
            basePrice: basePrice,
            currency: creatorCurrency,
            turnaroundDays: 5,
            revisionsIncluded: 2,
          });
        } else if (acc.platform === "tiktok") {
          rateCards.push({
            id: `rc-${now}-${idx}`,
            deliverableType: "TikTok Video",
            title: "Native TikTok Brand Storytelling",
            description: "Viral format UGC-style TikTok video optimized for high watch time and comment engagement.",
            basePrice: Math.round(basePrice * 0.9),
            currency: creatorCurrency,
            turnaroundDays: 4,
            revisionsIncluded: 2,
          });
        } else if (acc.platform === "x") {
          rateCards.push({
            id: `rc-${now}-${idx}`,
            deliverableType: "X (Twitter) Thread",
            title: "Deep-Dive Sponsored X Thread",
            description: "Analytical 5-post thread with trackable link and brand quote reposts.",
            basePrice: Math.round(basePrice * 0.6),
            currency: creatorCurrency,
            turnaroundDays: 3,
            revisionsIncluded: 1,
          });
        }
      });

      if (rateCards.length === 0) {
        rateCards.push({
          id: `rc-${now}-default`,
          deliverableType: "YouTube Dedicated Video",
          title: "Dedicated Sponsored Partnership",
          description: "High-impact sponsored content with guaranteed delivery.",
          basePrice: basePrice,
          currency: creatorCurrency,
          turnaroundDays: 5,
          revisionsIncluded: 2,
        });
      }

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
        languages: ["English"],
        primaryCategory: category || "Content Creator",
        secondaryCategories: [],
        verified: false,
        featured: false,
        tier,
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers,
        avgEngagementRate,
        startingPrice: basePrice || 0,
        currency: creatorCurrency,
        availableForHire: true,
        profileCompleteness: Math.min(100, (bio ? 20 : 0) + (newUser.avatarUrl ? 20 : 0) + accounts.length * 20),
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
