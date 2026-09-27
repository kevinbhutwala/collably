import { User, CreatorProfile, BrandProfile, SocialAccount, SubscriptionEntity } from "@/core/types";

export interface AuthResponse {
  success?: boolean;
  authenticated?: boolean;
  user?: User;
  creatorProfile?: CreatorProfile | null;
  brandProfile?: BrandProfile | null;
  subscription?: SubscriptionEntity | null;
  token?: string;
  error?: string;
  isNewUser?: boolean;
  redirectUrl?: string;
}


export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  role: "creator" | "brand";
  handle?: string;
  companyName?: string;
  contactName?: string;
  category?: string;
  primaryCategory?: string;
  industry?: string;
  location?: string;
  websiteUrl?: string;
  companySize?: string;
  monthlyBudget?: string;
  bio?: string;
  startingPrice?: number;
  currency?: string;
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
  gender?: "male" | "female" | "other" | string;
  avatarUrl?: string;
}

export interface CreatorRegisterParams {
  fullName: string;
  email: string;
  password: string;
  handle: string;
  location?: string;
  primaryCategory?: string;
  startingPrice?: number;
  currency?: string;
  bio?: string;
  gender?: "male" | "female" | "other" | string;
  avatarUrl?: string;
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

export interface SocialAuthClientParams {
  provider: "google" | "apple" | "github";
  email: string;
  name: string;
  avatarUrl?: string;
  role?: "creator" | "brand";
  handle?: string;
  companyName?: string;
}

const TOKEN_KEY = "abeycollab_session_token";

class AuthService {
  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY) || localStorage.getItem("collably_session_token");
    } catch {
      return null;
    }
  }

  saveToken(token?: string) {
    if (typeof window === "undefined" || !token) return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem("collably_session_token", token);
    } catch {
      // Ignore
    }
  }

  clearToken() {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("collably_session_token");
    } catch {
      // Ignore
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    if (data.token) {
      this.saveToken(data.token);
    }
    return data;
  }

  async register(params: RegisterParams): Promise<AuthResponse> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...params,
        email: params.email.trim(),
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    if (data.token) {
      this.saveToken(data.token);
    }
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
      currency: params.currency,
      bio: params.bio,
      gender: params.gender,
      avatarUrl: params.avatarUrl,
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

  async socialAuth(params: SocialAuthClientParams): Promise<AuthResponse> {
    const res = await fetch("/api/auth/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Social authentication failed");
    if (data.token) {
      this.saveToken(data.token);
    }
    return data;
  }

  async getSession(): Promise<AuthResponse> {
    try {
      const token = this.getStoredToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch("/api/auth/me", {
        headers,
        cache: "no-store",
        credentials: "include",
      });
      if (!res.ok) return { authenticated: false };
      const data = await res.json();
      if (!data.authenticated && token) {
        this.clearToken();
      }
      return data;
    } catch {
      return { authenticated: false };
    }
  }

  async logout(): Promise<void> {
    this.clearToken();
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      // Ignore
    }
  }
}

export const authService = new AuthService();
