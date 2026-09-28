import { NextRequest, NextResponse } from "next/server";
import { googleOAuthService } from "@/server/services/google-oauth.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = (searchParams.get("mode") as "login" | "register" | "connect_youtube") || "login";
    const role = (searchParams.get("role") as "creator" | "brand") || "creator";
    const redirectTarget = searchParams.get("redirect") || "";

    const requestHost = req.headers.get("host") || undefined;

    const authUrl = googleOAuthService.generateAuthUrl({
      mode,
      role,
      redirectTarget,
      requestHost,
    });

    return NextResponse.redirect(authUrl);
  } catch (err: any) {
    console.error("Failed to initiate Google OAuth:", err);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(err.message || "Failed to start Google sign-in")}`, req.url)
    );
  }
}
