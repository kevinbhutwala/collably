import { CreatorProfile, CreatorFilterParams } from "@/core/types";

class CreatorService {
  async getCreators(filters?: CreatorFilterParams): Promise<CreatorProfile[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.set("category", filters.category);
      if (filters?.platform) params.set("platform", filters.platform);
      if (filters?.region) params.set("region", filters.region);
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
    if (!id) return undefined;
    try {
      const res = await fetch(`/api/creators/${encodeURIComponent(id)}`, { cache: "no-store" });
      if (res.ok) {
        return await res.json();
      }
      // Fallback: search all creators if direct ID lookup fails
      const all = await this.getCreators();
      const clean = decodeURIComponent(id).replace(/^@+/, "").toLowerCase().trim();
      return all.find(
        (c) =>
          c.id === id ||
          c.id.toLowerCase() === clean ||
          c.userId === id ||
          c.userId?.toLowerCase() === clean ||
          c.handle.replace(/^@+/, "").toLowerCase() === clean ||
          (c as any).slug?.toLowerCase() === clean ||
          c.email?.toLowerCase() === clean
      );
    } catch {
      return undefined;
    }
  }
}

export const creatorService = new CreatorService();
