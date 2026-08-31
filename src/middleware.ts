import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
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

  // Token decoding helper for basic role inspection at the edge
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(
        Buffer.from(parts[1], "base64url").toString("utf-8")
      );

      // Check token expiration
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirect", pathname);
        loginUrl.searchParams.set("error", "session_expired");
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("collably_session");
        return response;
      }

      // Restrict /admin routes to administrator roles only
      if (isAdminRoute) {
        const adminRoles = ["super_admin", "agency_admin", "agency_owner"];
        if (!adminRoles.includes(payload.role)) {
          return NextResponse.redirect(new URL("/app/dashboard", req.url));
        }
      }
    }
  } catch (err) {
    // If token is malformed, redirect to login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/:path*",
    "/admin/:path*",
  ],
};
