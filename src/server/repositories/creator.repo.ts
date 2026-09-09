import { db } from "../db/database";
import { CreatorProfile, CreatorFilterParams, CreatorCategory } from "@/core/types";
import { exchangeRateService } from "../services/exchange-rate.service";

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

    if (filters.minFollowers !== undefined) {
      result = result.filter((c) => (c.totalFollowers || 0) >= filters.minFollowers!);
    }

    if (filters.maxFollowers !== undefined) {
      result = result.filter((c) => (c.totalFollowers || 0) <= filters.maxFollowers!);
    }

    if (filters.minEngagement !== undefined) {
      result = result.filter((c) => (c.avgEngagementRate || 0) >= filters.minEngagement!);
    }

    if (filters.verifiedOnly) {
      result = result.filter((c) => c.verified);
    }

    // Currency-Normalized Rate Filtering
    if (filters.minRate !== undefined || filters.maxRate !== undefined) {
      const targetCurrency = filters.filterCurrency || "USD";
      result = result.filter((c) => {
        const creatorRate = c.startingPrice || 0;
        const creatorCurrency = (c as any).currency || "USD";
        const normalizedRate = exchangeRateService.convertCurrencySync(
          creatorRate,
          creatorCurrency,
          targetCurrency
        );

        if (filters.minRate !== undefined && normalizedRate < filters.minRate) {
          return false;
        }
        if (filters.maxRate !== undefined && normalizedRate > filters.maxRate) {
          return false;
        }
        return true;
      });
    }

    // Currency-Normalized Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === "rate_asc" || filters.sortBy === "rate_desc") {
          const rateA = exchangeRateService.convertCurrencySync(
            a.startingPrice || 0,
            (a as any).currency || "USD",
            "USD"
          );
          const rateB = exchangeRateService.convertCurrencySync(
            b.startingPrice || 0,
            (b as any).currency || "USD",
            "USD"
          );
          return filters.sortBy === "rate_asc" ? rateA - rateB : rateB - rateA;
        }
        if (filters.sortBy === "followers_desc") {
          return (b.totalFollowers || 0) - (a.totalFollowers || 0);
        }
        if (filters.sortBy === "rating_desc") {
          return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
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
