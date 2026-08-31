import { db } from "../db/database";
import { CreatorProfile, CreatorFilterParams, CreatorCategory } from "@/core/types";

export class CreatorRepository {
  getAll(filters?: CreatorFilterParams): CreatorProfile[] {
    let result = [...(db.getState().creators || [])];

    if (!filters) return result;

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.headline.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q) ||
          c.primaryCategory.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      result = result.filter(
        (c) =>
          c.primaryCategory === filters.category ||
          c.secondaryCategories.includes(filters.category as CreatorCategory)
      );
    }

    if (filters.platform && filters.platform !== "all") {
      result = result.filter((c) =>
        c.socialAccounts.some((s) => s.platform === filters.platform)
      );
    }

    return result;
  }

  findAll(filters?: CreatorFilterParams): CreatorProfile[] {
    return this.getAll(filters);
  }

  getById(id: string): CreatorProfile | undefined {
    return (db.getState().creators || []).find((c) => c.id === id);
  }

  findById(id: string): CreatorProfile | null {
    return this.getById(id) || null;
  }

  getByUserId(userId: string): CreatorProfile | undefined {
    return (db.getState().creators || []).find((c) => c.userId === userId);
  }

  findByUserId(userId: string): CreatorProfile | null {
    return this.getByUserId(userId) || null;
  }

  createOrUpdate(profile: CreatorProfile): CreatorProfile {
    db.updateState((state) => {
      state.creators = state.creators || [];
      const index = state.creators.findIndex((c) => c.id === profile.id);
      if (index >= 0) {
        state.creators[index] = profile;
      } else {
        state.creators.unshift(profile);
      }
    });
    return profile;
  }

  createCreator(profile: Omit<CreatorProfile, "id" | "createdAt" | "updatedAt">): CreatorProfile {
    const id = `creator-${Date.now()}`;
    const newProfile: CreatorProfile = {
      ...profile,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return this.createOrUpdate(newProfile);
  }

  updateCreator(id: string, updates: Partial<CreatorProfile>): CreatorProfile | null {
    let updated: CreatorProfile | null = null;
    db.updateState((state) => {
      state.creators = state.creators || [];
      const index = state.creators.findIndex((c) => c.id === id);
      if (index >= 0) {
        state.creators[index] = {
          ...state.creators[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        updated = state.creators[index];
      }
    });
    return updated;
  }
}

export const creatorRepo = new CreatorRepository();
