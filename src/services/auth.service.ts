import { User, CreatorProfile, BrandProfile, SocialAccount } from "@/core/types";

export interface AuthResponse {
  success?: boolean;
  authenticated?: boolean;
  user?: User;
  creatorProfile?: CreatorProfile | null;
  brandProfile?: BrandProfile | null;
  token?: string;
  error?: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  role: "creator" | "brand";
  handle?: string;
  companyName?: string;
  category?: string;
  primaryCategory?: string;
  industry?: string;
  location?: string;
  bio?: string;
  startingPrice?: number;
  socialAccounts?: SocialAccount[];
  youtubeHandle?: string;
  youtubeSubscribers?: number;
  instagramHandle?: string;
  instagramFollowers?: number;
  tiktokHandle?: string;
  tiktokFollowers?: number;
  xHandle?: string;
  xFollowers?: number;
  linkedinHandle?: string;
  linkedinFollowers?: number;
}

export interface CreatorRegisterParams {
  fullName: string;
  email: string;
  password: string;
  handle: string;
  location?: string;
  primaryCategory?: string;
  startingPrice?: number;
  bio?: string;
  youtubeHandle?: string;
  youtubeSubscribers?: number;
  instagramHandle?: string;
  instagramFollowers?: number;
  tiktokHandle?: string;
  tiktokFollowers?: number;
  xHandle?: string;
  xFollowers?: number;
  linkedinHandle?: string;
  linkedinFollowers?: number;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data;
  }

  async register(params: RegisterParams): Promise<AuthResponse> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    return data;
  }

  async registerCreator(params: CreatorRegisterParams): Promise<AuthResponse> {
    return this.register({
      name: params.fullName,
      email: params.email,
      password: params.password,
      role: "creator",
      handle: params.handle,
      location: params.location,
      category: params.primaryCategory,
      primaryCategory: params.primaryCategory,
      startingPrice: params.startingPrice,
      bio: params.bio,
      youtubeHandle: params.youtubeHandle,
      youtubeSubscribers: params.youtubeSubscribers,
      instagramHandle: params.instagramHandle,
      instagramFollowers: params.instagramFollowers,
      tiktokHandle: params.tiktokHandle,
      tiktokFollowers: params.tiktokFollowers,
      xHandle: params.xHandle,
      xFollowers: params.xFollowers,
      linkedinHandle: params.linkedinHandle,
      linkedinFollowers: params.linkedinFollowers,
    });
  }

  async getSession(): Promise<AuthResponse> {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (!res.ok) return { authenticated: false };
      return await res.json();
    } catch {
      return { authenticated: false };
    }
  }

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }
}

export const authService = new AuthService();
