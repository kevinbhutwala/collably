import { NextRequest, NextResponse } from "next/server";
import { metaOAuthService } from "@/server/services/meta-oauth.service";
import { authService } from "@/server/services/auth.service";
import { SecurityService } from "@/server/services/security.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const stateEncoded = searchParams.get("state");
  const errorParam = searchParams.get("error_message") || searchParams.get("error");

  if (errorParam) {
    console.error("Meta OAuth error from provider:", errorParam);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorParam)}`, req.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=Authorization+code+missing+from+Meta", req.url)
    );
  }

  try {
    let statePayload = {
      mode: "login",
      role: "creator" as "creator" | "brand",
      redirect: "/app/dashboard",
    };

    if (stateEncoded) {
      try {
        statePayload = JSON.parse(Buffer.from(stateEncoded, "base64url").toString("utf8"));
      } catch (err) {
        console.warn("Could not decode OAuth state payload:", err);
      }
    }

    const requestHost = req.headers.get("host") || undefined;

    // 1. Exchange authorization code for Meta User Access Token
    const { accessToken } = await metaOAuthService.exchangeCode(code, requestHost);

    // 2. Fetch authenticated Meta / Instagram profile info
    const metaUser = await metaOAuthService.getUserInfo(accessToken);

    // 3. Handle "Connect Instagram Account" mode for authenticated creators
    const existingSession = SecurityService.getSession(req);

    if (statePayload.mode === "connect_instagram" && existingSession) {
      await metaOAuthService.syncInstagramToCreator(existingSession.userId, metaUser);
      return NextResponse.redirect(
        new URL(
          `/app/profile?instagram_connected=true&account=${encodeURIComponent(metaUser.name)}`,
          req.url
        )
      );
    }

    // 4. Standard Meta / Instagram Login or Sign-up
    const authResult = await authService.socialAuth({
      provider: "apple" as any, // Social fallback maps cleanly
      email: metaUser.email || `${metaUser.id}@meta.abeycollab.internal`,
      name: metaUser.name,
      avatarUrl: metaUser.pictureUrl,
      role: statePayload.role,
    });

    // 5. If user is a creator, automatically link verified Instagram identity
    if (authResult.user.role === "creator") {
      await metaOAuthService.syncInstagramToCreator(authResult.user.id, metaUser);
    }

    // 6. Determine Destination URL
    const destination =
      authResult.user.role === "brand"
        ? "/app/brand/campaigns"
        : statePayload.redirect || "/app/dashboard";

    const response = NextResponse.redirect(new URL(destination, req.url));

    // 7. Set HTTP-only Authentication Session Cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    };

    response.cookies.set("abeycollab_session", authResult.token, cookieOptions);
    response.cookies.set("collably_session", authResult.token, cookieOptions);

    return response;
  } catch (err: any) {
    console.error("Meta OAuth callback processing error:", err);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(err.message || "Failed to complete Meta sign-in")}`, req.url)
    );
  }
}
