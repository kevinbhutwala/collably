import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/server/services/ai.service";
import { SecurityService } from "@/server/services/security.service";
import { z } from "zod";

const generateBriefSchema = z.object({
  prompt: z.string().min(3),
  category: z.any().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { allowed } = SecurityService.checkRateLimit(`ai_brief:${ip}`, 15, 60);
    if (!allowed) {
      return NextResponse.json({ error: "AI rate limit reached. Please wait a moment." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = generateBriefSchema.parse(body);

    const brief = await aiService.generateCampaignBrief(parsed.prompt, parsed.category);
    return NextResponse.json({ brief });
  } catch (error: any) {
    console.error("AI Brief generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI brief" }, { status: 400 });
  }
}
