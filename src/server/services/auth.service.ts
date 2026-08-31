import { userRepo } from "../repositories/user.repo";
import { creatorRepo } from "../repositories/creator.repo";
import { brandRepo } from "../repositories/brand.repo";
import { hashPassword, verifyPassword, createSessionToken } from "../auth/crypto";
import { User, UserRole } from "@/core/types";

export class AuthService {
  async login(email: string, password: string):Promise<{ user: User; token: string }> {
    const userEntity = await userRepo.findByEmail(email);
    if (!userEntity) {
      throw new Error("Invalid email or password");
    }

    const isMatch = verifyPassword(password, userEntity.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = createSessionToken({
      userId: userEntity.id,
      email: userEntity.email,
      role: userEntity.role,
    });

    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      role: userEntity.role,
      avatarUrl: userEntity.avatarUrl,
      verified: userEntity.verified,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };

    return { user, token };
  }

  async register(params: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    companyName?: string;
    handle?: string;
  }): Promise<{ user: User; token: string }> {
    const existing = await userRepo.findByEmail(params.email);
    if (existing) {
      throw new Error("An account with this email address already exists");
    }

    const passwordHash = hashPassword(params.password);
    const userEntity = await userRepo.createUser({
      name: params.name,
      email: params.email,
      passwordHash,
      role: params.role,
      verified: false,
    });

    // Create associated profile based on role
    if (params.role === "creator") {
      const handle = params.handle || params.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      await creatorRepo.createCreator({
        userId: userEntity.id,
        fullName: params.name,
        handle: handle || `creator_${Date.now()}`,
        headline: "Digital Creator & Storyteller",
        bio: "Passionate creator ready for brand collaborations.",
        avatarUrl: userEntity.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
        location: "Worldwide",
        languages: ["English"],
        primaryCategory: "Technology & AI",
        secondaryCategories: [],
        verified: false,
        featured: false,
        tier: "Micro",
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers: 10000,
        avgEngagementRate: 3.5,
        startingPrice: 500,
        availableForHire: true,
        socialAccounts: [],
        audience: {
          topCountries: [{ country: "United States", percentage: 45 }],
          ageDistribution: [{ range: "25-34", percentage: 55 }],
          genderSplit: [{ gender: "Female", percentage: 50 }],
          interests: ["Tech", "Lifestyle"],
        },
        rateCards: [],
      });
    } else if (params.role === "brand" || params.role === "brand_owner") {
      await brandRepo.createBrand({
        userId: userEntity.id,
        companyName: params.companyName || params.name,
        industry: "Technology",
        headline: "Innovative Brand",
        description: "We collaborate with top creators to build impactful brand campaigns.",
        logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
        websiteUrl: "https://example.com",
        location: "San Francisco, CA",
        companySize: "11-50",
        verified: false,
        activeCampaignsCount: 0,
        totalSpent: 0,
        socialHandles: {},
      });
    }

    const token = createSessionToken({
      userId: userEntity.id,
      email: userEntity.email,
      role: userEntity.role,
    });

    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      role: userEntity.role,
      avatarUrl: userEntity.avatarUrl,
      verified: userEntity.verified,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };

    return { user, token };
  }
}

export const authService = new AuthService();
