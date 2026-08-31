import { campaignRepo } from "../repositories/campaign.repo";
import { Campaign, CampaignFilterParams, CampaignStatus } from "@/core/types";

const VALID_TRANSITIONS: Record<CampaignStatus, CampaignStatus[]> = {
  draft: ["in_review", "active", "cancelled"],
  in_review: ["active", "draft", "cancelled"],
  active: ["applications_open", "creators_selected", "paused", "completed", "cancelled", "archived"],
  applications_open: ["creators_selected", "paused", "completed", "cancelled"],
  creators_selected: ["in_production", "completed", "cancelled"],
  in_production: ["completed", "cancelled"],
  completed: ["archived"],
  paused: ["active", "applications_open", "cancelled"],
  archived: [],
  cancelled: [],
};

export class CampaignService {
  async getCampaigns(filters: CampaignFilterParams = {}): Promise<Campaign[]> {
    return campaignRepo.findAll(filters);
  }

  async getCampaignById(id: string): Promise<Campaign | null> {
    return campaignRepo.findById(id);
  }

  async createCampaign(data: Omit<Campaign, "id" | "slug" | "createdAt" | "updatedAt" | "applicantsCount" | "acceptedCount">): Promise<Campaign> {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + `-${Date.now().toString(36)}`;

    return campaignRepo.createCampaign({
      ...data,
      slug,
      status: data.status || "active",
      applicantsCount: 0,
      acceptedCount: 0,
    });
  }

  async updateCampaignStatus(campaignId: string, newStatus: CampaignStatus): Promise<Campaign> {
    const campaign = await campaignRepo.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const currentStatus = campaign.status;
    const allowedTransitions = VALID_TRANSITIONS[currentStatus] || [];

    if (!allowedTransitions.includes(newStatus) && newStatus !== currentStatus) {
      throw new Error(`Invalid campaign state transition from "${currentStatus}" to "${newStatus}"`);
    }

    const updated = await campaignRepo.updateCampaign(campaignId, { status: newStatus });
    if (!updated) {
      throw new Error("Failed to update campaign status");
    }
    return updated;
  }
}

export const campaignService = new CampaignService();
