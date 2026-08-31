import { mediaRepo } from "../repositories/media.repo";
import { getSupabaseAdmin, isSupabaseConfigured } from "../db/supabase";
import { MediaAssetEntity } from "../db/schema";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500MB max for high-res video assets

export class MediaService {
  async generateUploadSignature(params: {
    ownerId: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    bucket?: string;
  }): Promise<{ uploadUrl: string; storagePath: string; mediaAsset: MediaAssetEntity }> {
    if (!ALLOWED_MIME_TYPES.includes(params.mimeType)) {
      throw new Error(`Unsupported file type "${params.mimeType}". Allowed: MP4, MOV, WebM, JPEG, PNG, WebP, PDF.`);
    }

    if (params.fileSize > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File size (${Math.round(params.fileSize / (1024 * 1024))}MB) exceeds maximum limit of 500MB.`);
    }

    const bucket = params.bucket || (params.mimeType.startsWith("video/") ? "content-submissions" : "portfolio");
    const ext = params.fileName.split(".").pop() || "bin";
    const uniqueFileName = `${Date.now()}_${crypto.randomBytes(6).toString("hex")}.${ext}`;
    const storagePath = `${params.ownerId}/${uniqueFileName}`;

    let uploadUrl = `/api/media/upload?path=${encodeURIComponent(storagePath)}&bucket=${bucket}`;

    if (isSupabaseConfigured) {
      const supabase = getSupabaseAdmin()!;
      try {
        const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(storagePath);
        if (data?.signedUrl) {
          uploadUrl = data.signedUrl;
        }
      } catch (err) {
        console.warn("Could not generate Supabase signed URL, using direct endpoint fallback:", err);
      }
    }

    const mediaAsset = await mediaRepo.createMediaAsset({
      ownerId: params.ownerId,
      bucket,
      storagePath,
      fileName: params.fileName,
      mimeType: params.mimeType,
      fileSize: params.fileSize,
      status: "ready",
    });

    return {
      uploadUrl,
      storagePath,
      mediaAsset,
    };
  }

  async getSignedDownloadUrl(storagePath: string, bucket: string = "content-submissions"): Promise<string> {
    if (isSupabaseConfigured) {
      const supabase = getSupabaseAdmin()!;
      try {
        const { data } = await supabase.storage.from(bucket).createSignedUrl(storagePath, 3600); // 1 hour expiration
        if (data?.signedUrl) {
          return data.signedUrl;
        }
      } catch (err) {
        console.warn("Failed to create Supabase signed download URL:", err);
      }
    }
    return `/api/media/download?path=${encodeURIComponent(storagePath)}&bucket=${bucket}`;
  }
}

export const mediaService = new MediaService();
