import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { createSessionToken } from "@/server/auth/crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = userRepo.verifyCredentials(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const creatorProfile = user.role === "creator" ? creatorRepo.getByUserId(user.id) : null;
    const brandProfile = user.role === "brand" ? brandRepo.getByUserId(user.id) : null;

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        verified: user.verified,
      },
      creatorProfile,
      brandProfile,
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set("collably_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
