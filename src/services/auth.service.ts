import { User, CreatorProfile, BrandProfile } from "@/core/types";

export interface AuthResponse {
  success?: boolean;
  authenticated?: boolean;
  user?: User;
  creatorProfile?: CreatorProfile | null;
  brandProfile?: BrandProfile | null;
  token?: string;
  error?: string;
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

  async register(params: {
    name: string;
    email: string;
    password: string;
    role: "creator" | "brand";
    handle?: string;
    companyName?: string;
    category?: string;
    industry?: string;
  }): Promise<AuthResponse> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    return data;
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
