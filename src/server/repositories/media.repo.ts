import { db } from "../db/database";
import { MediaAssetEntity } from "../db/schema";

export class MediaRepository {
  async createMediaAsset(data: Omit<MediaAssetEntity, "id" | "createdAt" | "updatedAt">): Promise<MediaAssetEntity> {
    const id = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const asset: MediaAssetEntity = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    db.updateState((s) => {
      s.mediaAssets = s.mediaAssets || [];
      s.mediaAssets.unshift(asset);
    });
    return asset;
  }

  async getMediaById(id: string): Promise<MediaAssetEntity | null> {
    const state = db.getState();
    return (state.mediaAssets || []).find((m) => m.id === id) || null;
  }

  async getMediaByOwner(ownerId: string): Promise<MediaAssetEntity[]> {
    const state = db.getState();
    return (state.mediaAssets || []).filter((m) => m.ownerId === ownerId);
  }

  async updateMediaStatus(id: string, status: MediaAssetEntity["status"]): Promise<MediaAssetEntity | null> {
    let updated: MediaAssetEntity | null = null;
    db.updateState((s) => {
      s.mediaAssets = s.mediaAssets || [];
      const idx = s.mediaAssets.findIndex((m) => m.id === id);
      if (idx !== -1) {
        s.mediaAssets[idx].status = status;
        s.mediaAssets[idx].updatedAt = new Date().toISOString();
        updated = s.mediaAssets[idx];
      }
    });
    return updated;
  }
}

export const mediaRepo = new MediaRepository();
