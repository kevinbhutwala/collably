import { userRepo } from "../repositories/user.repo";
import { creatorRepo } from "../repositories/creator.repo";
import { brandRepo } from "../repositories/brand.repo";
import { hashPassword, verifyPassword, createSessionToken } from "../auth/crypto";
import { User, UserRole, CreatorProfile, BrandProfile } from "@/core/types";

export interface SocialAuthParams {
  provider: "google" | "apple" | "github";
  email: string;
  name: string;
  avatarUrl?: string;
  role?: UserRole;
  handle?: string;
  companyName?: string;
  providerId?: string;
}

export interface SocialAuthResult {
  user: User;
  token: string;
  creatorProfile: CreatorProfile | null;
  brandProfile: BrandProfile | null;
  isNewUser: boolean;
}

export class AuthService {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
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

  async socialAuth(params: SocialAuthParams): Promise<SocialAuthResult> {
    const normalizedEmail = params.email.toLowerCase().trim();
    let existingUser = await userRepo.findByEmail(normalizedEmail);
    let isNewUser = false;

    if (!existingUser) {
      isNewUser = true;
      const targetRole: UserRole = params.role || "creator";
      const randomSecret = `social_${params.provider}_${Date.now()}`;
      const passwordHash = hashPassword(randomSecret);

      existingUser = await userRepo.createUser({
        name: params.name || `${params.provider} User`,
        email: normalizedEmail,
        passwordHash,
        role: targetRole,
        avatarUrl:
          params.avatarUrl ||
          `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80`,
        verified: true, // Social accounts are email-verified by provider
      });

      // Provision associated profile
      if (targetRole === "creator") {
        const handle =
          params.handle ||
          params.name.toLowerCase().replace(/[^a-z0-9]/g, "") ||
          `creator_${Date.now()}`;
        await creatorRepo.createCreator({
          userId: existingUser.id,
          fullName: params.name || "AbeyCollab Creator",
          handle: handle.startsWith("@") ? handle : `@${handle}`,
          headline: `Verified Creator via ${params.provider}`,
          bio: `Content creator verified via ${params.provider}. Ready for brand collaborations.`,
          avatarUrl:
            existingUser.avatarUrl ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
          coverImageUrl:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
          location: "Worldwide",
          languages: ["English"],
          primaryCategory: "Technology & AI",
          secondaryCategories: [],
          verified: true,
          featured: false,
          tier: "Micro",
          rating: 5.0,
          completedCampaignsCount: 0,
          totalFollowers: 15000,
          avgEngagementRate: 4.2,
          startingPrice: 500,
          availableForHire: true,
          socialAccounts: [],
          audience: {
            topCountries: [{ country: "United States", percentage: 50 }],
            ageDistribution: [{ range: "25-34", percentage: 60 }],
            genderSplit: [{ gender: "Female", percentage: 50 }],
            interests: ["Technology", "Creative Media"],
          },
          rateCards: [],
        });
      } else if (targetRole === "brand" || targetRole === "brand_owner") {
        await brandRepo.createBrand({
          userId: existingUser.id,
          companyName: params.companyName || params.name || "Brand Partner",
          industry: "Technology",
          headline: `Verified Brand via ${params.provider}`,
          description: "We collaborate with top creators to produce authentic video campaigns.",
          logoUrl:
            existingUser.avatarUrl ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
          coverImageUrl:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
          websiteUrl: "https://example.com",
          location: "San Francisco, CA",
          companySize: "11-50",
          verified: true,
          activeCampaignsCount: 0,
          totalSpent: 0,
          socialHandles: {},
        });
      }
    }

    const token = createSessionToken({
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });

    const user: User = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      avatarUrl: existingUser.avatarUrl,
      verified: existingUser.verified,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };

    const creatorProfile =
      existingUser.role === "creator" ? creatorRepo.getByUserId(existingUser.id) || null : null;
    const brandProfile =
      existingUser.role === "brand" || existingUser.role === "brand_owner"
        ? brandRepo.getByUserId(existingUser.id) || null
        : null;

    return {
      user,
      token,
      creatorProfile,
      brandProfile,
      isNewUser,
    };
  }
}

export const authService = new AuthService();
