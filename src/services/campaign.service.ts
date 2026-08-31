import { Campaign, CampaignFilterParams, CampaignApplication } from "@/core/types";

class CampaignService {
  async getCampaigns(filters?: CampaignFilterParams): Promise<Campaign[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.set("category", filters.category);
      if (filters?.status) params.set("status", filters.status);
      if (filters?.searchQuery) params.set("searchQuery", filters.searchQuery);

      const url = `/api/campaigns${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      return await res.json();
    } catch {
      return [];
    }
  }

  async getCampaignById(id: string): Promise<Campaign | undefined> {
    try {
      const res = await fetch(`/api/campaigns/${id}`, { cache: "no-store" });
      if (!res.ok) return undefined;
      return await res.json();
    } catch {
      return undefined;
    }
  }

  async createCampaign(campaign: Partial<Campaign> & Record<string, any>): Promise<Campaign> {
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaign),
    });
    if (!res.ok) throw new Error("Failed to create campaign");
    return await res.json();
  }

  async applyToCampaign(application: CampaignApplication): Promise<CampaignApplication> {
    const res = await fetch("/api/campaigns/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });
    if (!res.ok) throw new Error("Failed to submit application");
    return await res.json();
  }
}

export const campaignService = new CampaignService();
