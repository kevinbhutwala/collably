import { NextRequest } from "next/server";
import { verifySessionToken } from "../auth/crypto";
import { UserRole } from "@/core/types";

// In-memory rate limiting map for sliding window (serverless-compatible fallback)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export class SecurityService {
  /**
   * Enforce rate limiting per IP/Key
   */
  static checkRateLimit(key: string, limit: number, windowSeconds: number): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || entry.expiresAt < now) {
      rateLimitMap.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
      return { allowed: true, remaining: limit - 1 };
    }

    if (entry.count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    entry.count += 1;
    return { allowed: true, remaining: limit - entry.count };
  }

  /**
   * Extract authenticated user session from NextRequest (Cookies or Authorization Bearer)
   */
  static getSession(req: NextRequest): { userId: string; email: string; role: UserRole } | null {
    // 1. Check HTTP-only cookie
    const cookieToken =
      req.cookies.get("collably_session")?.value || req.cookies.get("valence_session")?.value;
    if (cookieToken) {
      const decoded = verifySessionToken(cookieToken);
      if (decoded) return decoded as { userId: string; email: string; role: UserRole };
    }

    // 2. Check Authorization Bearer header
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const bearerToken = authHeader.substring(7);
      const decoded = verifySessionToken(bearerToken);
      if (decoded) return decoded as { userId: string; email: string; role: UserRole };
    }

    return null;
  }

  /**
   * Check RBAC permission for a role
   */
  static hasPermission(role: UserRole, action: string): boolean {
    if (role === "agency_admin" || role === "super_admin" || role === "agency_owner") {
      return true;
    }

    const brandRoles: UserRole[] = ["brand", "brand_owner", "brand_manager", "brand_member"];
    const creatorRoles: UserRole[] = ["creator"];

    if (action.startsWith("campaign.")) {
      return brandRoles.includes(role);
    }
    if (action.startsWith("application.create") || action.startsWith("deliverable.submit")) {
      return creatorRoles.includes(role);
    }
    if (action.startsWith("application.review") || action.startsWith("deliverable.approve")) {
      return brandRoles.includes(role);
    }
    if (action.startsWith("payment.create")) {
      return brandRoles.includes(role);
    }
    if (action.startsWith("payout.view")) {
      return creatorRoles.includes(role) || brandRoles.includes(role);
    }

    // Default deny. New permission names must be explicitly defined above.
    return false;
  }
}
