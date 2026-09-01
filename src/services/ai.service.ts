import { CreatorProfile, Campaign, CreatorCategory, DeliverableType } from "../core/types";
import { MatchBreakdown } from "../core/utils/match";

export interface AIGeneratedBrief {
  title: string;
  tagline: string;
  description: string;
  category: CreatorCategory;
  suggestedBudget: {
    total: number;
    perCreator: number;
  };
  recommendedDeliverables: {
    type: DeliverableType;
    count: number;
    guidelines: string;
  }[];
  targetCreatorCriteria: {
    minFollowers: number;
    minEngagementRate: number;
    platforms: string[];
    tones: string[];
  };
  creativeAngles: string[];
}

export interface AIGeneratedPitch {
  headline: string;
  fullPitch: string;
  suggestedDeliverables: string[];
  estimatedReach: number;
  rateRecommendation: number;
  keyHooks: string[];
}

export interface GenerateBriefInput {
  productName: string;
  industry?: CreatorCategory;
  budget?: number;
  targetAudience?: string;
  goals?: string[];
}

class AIService {
  async computeMatchScore(creator: CreatorProfile, campaign: Campaign): Promise<MatchBreakdown> {
    try {
      const res = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId: creator.id, campaignId: campaign.id }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.match;
      }
    } catch (e) {
      console.warn("AI match API request failed, calculating locally:", e);
    }
    const { calculateCreatorCampaignMatch } = await import("../core/utils/match");
    return calculateCreatorCampaignMatch(creator, campaign);
  }

  async generateCampaignBrief(
    promptOrInput: string | GenerateBriefInput,
    categoryPreference?: CreatorCategory
  ): Promise<AIGeneratedBrief> {
    let prompt = "";
    let category = categoryPreference;

    if (typeof promptOrInput === "string") {
      prompt = promptOrInput;
    } else {
      prompt = `Product: ${promptOrInput.productName}. Target Audience: ${promptOrInput.targetAudience || "General"}. Goals: ${(promptOrInput.goals || []).join(", ")}. Budget: $${promptOrInput.budget || 5000}`;
      category = promptOrInput.industry || category;
    }

    const res = await fetch("/api/ai/brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, category }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to generate campaign brief");
    }
    const data = await res.json();
    return data.brief;
  }

  async generateCreatorPitch(creator: CreatorProfile, campaign: Campaign): Promise<AIGeneratedPitch> {
    const res = await fetch("/api/ai/pitch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creatorId: creator.id, campaignId: campaign.id }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to generate creator pitch");
    }
    const data = await res.json();
    return data.pitch;
  }
}

export const aiService = new AIService();
