import { CampaignApplication, ApplicationStatus } from "../core/types";

class ApplicationService {
  async getApplications(role?: "creator" | "brand", entityId?: string): Promise<CampaignApplication[]> {
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
    return [];
  }

  async applyToCampaign(data: {
    campaignId: string;
    creatorId: string;
    proposedFee: number;
    pitch: string;
    portfolioSamples?: string[];
  }): Promise<CampaignApplication> {
    const res = await fetch("/api/campaigns/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaignId: data.campaignId,
        creatorId: data.creatorId,
        proposedFee: data.proposedFee,
        pitch: data.pitch,
        sampleLinks: data.portfolioSamples || [],
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to submit application");
    }

    return res.json();
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<CampaignApplication> {
    const res = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to update application status");
    }

    const data = await res.json();
    return data.application;
  }
}

export const applicationService = new ApplicationService();
