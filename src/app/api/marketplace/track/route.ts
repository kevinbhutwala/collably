import { NextRequest, NextResponse } from "next/server";
import { antiGamingService } from "@/server/services/anti-gaming.service";
import { verifySessionToken } from "@/server/auth/crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, targetId, targetType, metadata } = body;

    if (!eventType || !targetId || !targetType) {
      return NextResponse.json({ error: "Missing required tracking parameters" }, { status: 400 });
    }

    // Try to extract actor identity from auth token
    let actorId: string | undefined;
    let actorRole: "creator" | "brand" | "visitor" | "admin" = "visitor";

    const token =
      req.cookies.get("abeycollab_session")?.value ||
      req.cookies.get("collably_session")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (token) {
      const payload = verifySessionToken(token);
      if (payload?.userId) {
        actorId = payload.userId;
        actorRole = (payload.role as any) || "visitor";
      }
    }

    // Hash client IP or user-agent for session deduplication
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown-ip";
    const userAgent = req.headers.get("user-agent") || "unknown-ua";
    const sessionHash = Buffer.from(`${ip}:${userAgent}`).toString("base64").slice(0, 24);

    const validation = antiGamingService.validateAndRecord({
      eventType,
      actorId,
      actorRole,
      targetId,
      targetType,
      sessionHash,
      metadata,
    });

    return NextResponse.json({
      success: validation.valid,
      rejectedReason: validation.reason,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to record event" }, { status: 500 });
  }
}
