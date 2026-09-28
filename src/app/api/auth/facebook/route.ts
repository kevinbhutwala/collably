import { NextRequest, NextResponse } from "next/server";
import { metaOAuthService } from "@/server/services/meta-oauth.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = (searchParams.get("mode") as "login" | "register" | "connect_instagram") || "login";
    const role = (searchParams.get("role") as "creator" | "brand") || "creator";
    const redirectTarget = searchParams.get("redirect") || "";

    const requestHost = req.headers.get("host") || undefined;

    const authUrl = metaOAuthService.generateAuthUrl({
      mode,
      role,
      redirectTarget,
      requestHost,
    });

    return NextResponse.redirect(authUrl);
  } catch (err: any) {
    console.error("Failed to initiate Meta OAuth:", err);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(err.message || "Failed to start Meta sign-in")}`, req.url)
    );
  }
}
