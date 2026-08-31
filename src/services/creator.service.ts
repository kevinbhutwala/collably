import { CreatorProfile, CreatorFilterParams } from "@/core/types";

class CreatorService {
  async getCreators(filters?: CreatorFilterParams): Promise<CreatorProfile[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.set("category", filters.category);
      if (filters?.platform) params.set("platform", filters.platform);
      if (filters?.searchQuery) params.set("searchQuery", filters.searchQuery);

      const url = `/api/creators${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch creators");
      return await res.json();
    } catch {
      // Fallback
      return [];
    }
  }

  async getCreatorById(id: string): Promise<CreatorProfile | undefined> {
    try {
      const res = await fetch(`/api/creators/${id}`, { cache: "no-store" });
      if (!res.ok) return undefined;
      return await res.json();
    } catch {
      return undefined;
    }
  }
}

export const creatorService = new CreatorService();
