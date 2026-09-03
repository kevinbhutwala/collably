import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { createSessionToken } from "@/server/auth/crypto";
import { CreatorProfile, BrandProfile, RateCardItem, SocialAccount } from "@/core/types";
import { buildSocialAccountsFromInput, calculateTotalFollowers, calculateAvgEngagementRate, getCreatorTier } from "@/core/utils/social";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
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
      category,
      industry,
      location,
      bio,
      startingPrice,
      socialAccounts: inputSocialAccounts,
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

    const credentials = registrationSchema.parse({ name, email, password, role });

    const newUser = userRepo.createUser({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,
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
          xHandle: xHandle || cleanHandle,
          xFollowers,
          linkedinHandle,
          linkedinFollowers,
        });
      }

      // If no accounts were provided at all, fallback to a default account based on their handle
      if (accounts.length === 0) {
        accounts = [
          {
            id: `sa-${Date.now()}-x`,
            platform: "x",
            handle: cleanHandle,
            url: `https://x.com/${cleanHandle}`,
            followers: 15000,
            engagementRate: 4.8,
            avgViews: 8000,
            verifiedBadge: false,
          },
        ];
      }

      const totalFollowers = calculateTotalFollowers(accounts);
      const avgEngagementRate = calculateAvgEngagementRate(accounts);
      const tier = getCreatorTier(totalFollowers);
      const basePrice = startingPrice ? parseInt(startingPrice) : Math.max(500, Math.round(totalFollowers * 0.05));

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
          turnaroundDays: 5,
          revisionsIncluded: 2,
        });
      }

      creatorProfile = {
        id: `creator-${Date.now()}`,
        userId: newUser.id,
        fullName: name,
        handle: cleanHandle,
        headline: `${category || "Technology"} Creator & Digital Storyteller`,
        bio: bio || `Creating high-impact sponsored campaigns and organic content for premier brand partners.`,
        avatarUrl: newUser.avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80`,
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        location: location || "United States",
        languages: ["English"],
        primaryCategory: category || "Technology & AI",
        secondaryCategories: ["Design & Creative"],
        verified: false,
        featured: false,
        tier,
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers,
        avgEngagementRate,
        startingPrice: basePrice,
        availableForHire: true,
        profileCompleteness: Math.min(100, 60 + accounts.length * 10),
        qualityScore: 85,
        socialAccounts: accounts,
        audience: {
          topCountries: [
            { country: "United States", percentage: 65 },
            { country: "United Kingdom", percentage: 20 },
            { country: "Canada", percentage: 15 },
          ],
          ageDistribution: [
            { range: "18-24", percentage: 30 },
            { range: "25-34", percentage: 55 },
            { range: "35-44", percentage: 15 },
          ],
          genderSplit: [
            { gender: "Male", percentage: 55 },
            { gender: "Female", percentage: 45 },
          ],
          interests: [category || "Technology", "Digital Products", "Lifestyle"],
        },
        rateCards,
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
        description: `Verified enterprise brand on Collably sponsoring creator partnerships.`,
        logoUrl: newUser.avatarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        websiteUrl: "https://collably.io",
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
