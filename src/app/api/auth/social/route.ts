import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, email, name, avatarUrl, role, handle, companyName } = body;

    if (!provider || !["google", "apple", "github"].includes(provider)) {
      return NextResponse.json(
        { error: "Valid social provider ('google', 'apple', 'github') is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Verified email address is required" },
        { status: 400 }
      );
    }

    const result = await authService.socialAuth({
      provider,
      email,
      name: name || `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      avatarUrl,
      role: role === "brand" ? "brand" : "creator",
      handle,
      companyName,
    });

    const response = NextResponse.json({
      success: true,
      user: result.user,
      creatorProfile: result.creatorProfile,
      brandProfile: result.brandProfile,
      token: result.token,
      isNewUser: result.isNewUser,
      redirectUrl: result.user.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard",
    });

    // Set secure HTTP-only cookie
    response.cookies.set("collably_session", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Social Auth API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to authenticate with social provider" },
      { status: 500 }
    );
  }
}
