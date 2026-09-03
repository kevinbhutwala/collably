import { NextRequest, NextResponse } from "next/server";

const devSecret = "collably_local_development_secret_only";

function decodeBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

async function verifyEdgeSession(token: string): Promise<{ role: string; exp?: number } | null> {
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) return null;
    const secret = process.env.AUTH_SECRET || (process.env.NODE_ENV !== "production" ? devSecret : "");
    if (!secret) return null;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      decodeBase64Url(signature) as unknown as BufferSource,
      new TextEncoder().encode(`${header}.${payload}`)
    );
    if (!valid) return null;
    const decoded = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload)));
    if (!decoded.role || (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000))) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define route classifications
  const isAppRoute = pathname.startsWith("/app");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAppRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // Extract session token from cookie or Authorization header
  const token =
    req.cookies.get("collably_session")?.value ||
    req.cookies.get("valence_session")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  // If no token exists on protected routes, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifyEdgeSession(token);
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    loginUrl.searchParams.set("error", "session_expired");
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("collably_session");
    return response;
  }

  const isAppAdmin = pathname.startsWith("/app/admin");
  if (isAdminRoute || isAppAdmin) {
    const adminRoles = ["super_admin", "agency_admin", "agency_owner"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.redirect(new URL("/app/dashboard?error=admin_required", req.url));
    }
    if (isAppAdmin) {
      const canonicalAdminUrl = new URL(pathname.replace(/^\/app\/admin/, "/admin"), req.url);
      return NextResponse.redirect(canonicalAdminUrl);
    }
  }

  // Enforce Tenant Isolation: Creators cannot access Brand workspace routes
  const isBrandRoute = pathname.startsWith("/app/brand");
  if (isBrandRoute) {
    const brandRoles = [
      "brand",
      "brand_owner",
      "brand_manager",
      "brand_member",
      "super_admin",
      "agency_admin",
      "agency_owner",
    ];
    if (!brandRoles.includes(session.role)) {
      return NextResponse.redirect(new URL("/app/dashboard?error=brand_access_denied", req.url));
    }
  }

  const response = NextResponse.next();
  // Zero cached brand/admin data leaked in network payloads
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

export const config = {
  matcher: [
    "/app/:path*",
    "/admin/:path*",
  ],
};
