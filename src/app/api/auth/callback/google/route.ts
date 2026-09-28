import { NextRequest, NextResponse } from "next/server";
import { googleOAuthService } from "@/server/services/google-oauth.service";
import { authService } from "@/server/services/auth.service";
import { SecurityService } from "@/server/services/security.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const stateEncoded = searchParams.get("state");
  const errorParam = searchParams.get("error");

  if (errorParam) {
    console.error("Google OAuth error from provider:", errorParam);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorParam)}`, req.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=Authorization+code+missing+from+Google", req.url)
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

    // 1. Exchange authorization code for Google access token
    const { accessToken } = await googleOAuthService.exchangeCode(code, requestHost);

    // 2. Fetch authenticated Google profile info
    const googleUser = await googleOAuthService.getUserInfo(accessToken);

    // 3. Check for linked YouTube Channel & Real-time Stats
    const youtubeStats = await googleOAuthService.getYouTubeChannel(accessToken);

    // 4. Handle "Connect YouTube Channel" mode for already authenticated creators
    const existingSession = SecurityService.getSession(req);

    if (statePayload.mode === "connect_youtube" && existingSession) {
      if (youtubeStats) {
        await googleOAuthService.syncYouTubeToCreator(existingSession.userId, youtubeStats);
        return NextResponse.redirect(
          new URL(
            `/app/profile?youtube_connected=true&channel=${encodeURIComponent(youtubeStats.title)}&subscribers=${youtubeStats.subscriberCount}`,
            req.url
          )
        );
      } else {
        return NextResponse.redirect(
          new URL("/app/profile?youtube_error=No+active+YouTube+channel+found+on+this+Google+account", req.url)
        );
      }
    }

    // 5. Standard Google Login or Sign-up
    const authResult = await authService.socialAuth({
      provider: "google",
      email: googleUser.email,
      name: googleUser.name,
      avatarUrl: googleUser.picture,
      role: statePayload.role,
    });

    // 6. If user is a creator and has a YouTube channel, automatically verify & sync
    if (authResult.user.role === "creator" && youtubeStats) {
      await googleOAuthService.syncYouTubeToCreator(authResult.user.id, youtubeStats);
    }

    // 7. Determine Destination URL
    const destination =
      authResult.user.role === "brand"
        ? "/app/brand/campaigns"
        : statePayload.redirect || "/app/dashboard";

    const response = NextResponse.redirect(new URL(destination, req.url));

    // 8. Set HTTP-only Authentication Session Cookies
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
    console.error("Google OAuth callback processing error:", err);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(err.message || "Failed to complete Google sign-in")}`, req.url)
    );
  }
}
