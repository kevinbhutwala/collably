import { BrandProfile } from "@/core/types";

class BrandService {
  async getBrands(): Promise<BrandProfile[]> {
    try {
      const res = await fetch("/api/brands", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch brands");
      return await res.json();
    } catch {
      return [];
    }
  }

  async getBrandById(id: string): Promise<BrandProfile | undefined> {
    try {
      const res = await fetch(`/api/brands/${id}`, { cache: "no-store" });
      if (!res.ok) return undefined;
      return await res.json();
    } catch {
      return undefined;
    }
  }
}

export const brandService = new BrandService();
