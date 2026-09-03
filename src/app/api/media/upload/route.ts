import { NextRequest, NextResponse } from "next/server";
import { mediaService } from "@/server/services/media.service";
import { SecurityService } from "@/server/services/security.service";
import { z } from "zod";

const mediaUploadInitSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
  fileSize: z.number().positive(),
  bucket: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Authentication required to upload media" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = mediaUploadInitSchema.parse(body);

    const signature = await mediaService.generateUploadSignature({
      ownerId: session.userId,
      fileName: parsed.fileName,
      mimeType: parsed.mimeType,
      fileSize: parsed.fileSize,
      bucket: parsed.bucket,
    });

    return NextResponse.json({ success: true, ...signature });
  } catch (error: any) {
    console.error("Media upload init error:", error);
    return NextResponse.json({ error: error.message || "Failed to initialize media upload" }, { status: 400 });
  }
}
