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

    const nowIso = new Date().toISOString();
    userRepo.updateUser(userEntity.id, {
      lastLoginAt: nowIso,
      lastActiveAt: nowIso,
    });

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
    instagramHandle?: string;
    youtubeHandle?: string;
    socialAccounts?: any[];
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
      const initialSocialAccounts: any[] = [];

      if (params.instagramHandle) {
        const cleanIg = params.instagramHandle.trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/$/, "");
        if (cleanIg) {
          initialSocialAccounts.push({
            id: `sa_ig_${Date.now()}`,
            platform: "instagram",
            handle: `@${cleanIg}`,
            followers: 0,
            engagementRate: 0,
            verifiedBadge: false,
            verificationStatus: "unverified",
            url: `https://instagram.com/${cleanIg}`,
          });
        }
      }

      if (params.youtubeHandle) {
        const cleanYt = params.youtubeHandle.trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?youtube\.com\/(@|c\/)?/i, "").replace(/\/$/, "");
        if (cleanYt) {
          initialSocialAccounts.push({
            id: `sa_yt_${Date.now() + 1}`,
            platform: "youtube",
            handle: `@${cleanYt}`,
            followers: 0,
            engagementRate: 0,
            verifiedBadge: false,
            verificationStatus: "unverified",
            url: `https://youtube.com/@${cleanYt}`,
          });
        }
      }

      await creatorRepo.createCreator({
        userId: userEntity.id,
        fullName: params.name,
        handle: handle || `creator_${Date.now()}`,
        headline: "",
        bio: "",
        avatarUrl: userEntity.avatarUrl || "",
        coverImageUrl: "",
        location: "",
        languages: [],
        primaryCategory: (params as any).primaryCategory || "Content Creator",
        secondaryCategories: [],
        verified: false,
        featured: false,
        tier: "Rising",
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers: 0,
        avgEngagementRate: 0,
        startingPrice: 0,
        availableForHire: true,
        socialAccounts: initialSocialAccounts.length > 0 ? initialSocialAccounts : (params.socialAccounts || []),
        audience: {
          topCountries: [],
          ageDistribution: [],
          genderSplit: [],
          interests: [],
        },
        rateCards: [],
      });
    } else if (params.role === "brand" || params.role === "brand_owner") {
      await brandRepo.createBrand({
        userId: userEntity.id,
        companyName: params.companyName || params.name,
        industry: "",
        headline: "",
        description: "",
        logoUrl: userEntity.avatarUrl || "",
        coverImageUrl: "",
        websiteUrl: "",
        location: "",
        companySize: "",
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
        avatarUrl: params.avatarUrl || "",
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
          headline: "",
          bio: "",
          avatarUrl: existingUser.avatarUrl || "",
          coverImageUrl: "",
          location: "",
          languages: [],
          primaryCategory: "Content Creator",
          secondaryCategories: [],
          verified: false,
          featured: false,
          tier: "Rising",
          rating: 5.0,
          completedCampaignsCount: 0,
          totalFollowers: 0,
          avgEngagementRate: 0,
          startingPrice: 0,
          availableForHire: true,
          socialAccounts: [],
          audience: {
            topCountries: [],
            ageDistribution: [],
            genderSplit: [],
            interests: [],
          },
          rateCards: [],
        });
      } else if (targetRole === "brand" || targetRole === "brand_owner") {
        await brandRepo.createBrand({
          userId: existingUser.id,
          companyName: params.companyName || params.name || "Brand Partner",
          industry: "",
          headline: "",
          description: "",
          logoUrl: existingUser.avatarUrl || "",
          coverImageUrl: "",
          websiteUrl: "",
          location: "",
          companySize: "",
          verified: true,
          activeCampaignsCount: 0,
          totalSpent: 0,
          socialHandles: {},
        });
      }
    }

    const nowIso = new Date().toISOString();
    userRepo.updateUser(existingUser.id, {
      lastLoginAt: nowIso,
      lastActiveAt: nowIso,
    });

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
