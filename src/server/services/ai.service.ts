import { CreatorProfile, Campaign, CreatorCategory, DeliverableType } from "@/core/types";
import { calculateCreatorCampaignMatch, MatchBreakdown } from "@/core/utils/match";
import { db } from "../db/database";

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

export class AIService {
  private apiKey: string = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || "";

  /**
   * Deterministic matching with 6-variable score breakdown
   */
  async computeMatchScore(creator: CreatorProfile, campaign: Campaign): Promise<MatchBreakdown> {
    return calculateCreatorCampaignMatch(creator, campaign);
  }

  /**
   * Generate Campaign Brief using LLM or structured template engine
   */
  async generateCampaignBrief(prompt: string, categoryPreference?: CreatorCategory): Promise<AIGeneratedBrief> {
    if (this.apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content: `You are an elite influencer marketing strategist. Output a JSON campaign brief matching this schema:
{
  "title": string,
  "tagline": string,
  "description": string,
  "category": string,
  "suggestedBudget": { "total": number, "perCreator": number },
  "recommendedDeliverables": [{ "type": string, "count": number, "guidelines": string }],
  "targetCreatorCriteria": { "minFollowers": number, "minEngagementRate": number, "platforms": string[], "tones": string[] },
  "creativeAngles": string[]
}`,
              },
              { role: "user", content: `Create a campaign brief for: "${prompt}". Preference: ${categoryPreference || "General"}` },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.choices[0].message.content);

          // Track usage
          db.updateState((s) => {
            s.aiUsage = s.aiUsage || [];
            s.aiUsage.push({
              id: `ai-${Date.now()}`,
              feature: "campaign_brief",
              model: "gpt-4o-mini",
              tokens: data.usage?.total_tokens || 350,
              estimatedCost: 0.0005,
              createdAt: new Date().toISOString(),
            });
          });

          return content as AIGeneratedBrief;
        }
      } catch (err) {
        console.warn("LLM API call failed, falling back to deterministic brief generator:", err);
      }
    }

    // Heuristic structured fallback
    return {
      title: `${categoryPreference || "High-Impact"} Creator Showcase`,
      tagline: `Accelerate brand reach with top-tier narrative storytelling.`,
      description: `Campaign Objective: Highlight the unique differentiator for ${prompt}. Creators will demonstrate authentic integration with compelling hooks.`,
      category: categoryPreference || "Technology & AI",
      suggestedBudget: { total: 40000, perCreator: 3500 },
      recommendedDeliverables: [
        {
          type: "YouTube 60s Integration",
          count: 1,
          guidelines: "Dedicated live screen capture with pinned link in top comment.",
        },
        {
          type: "Instagram Reel",
          count: 2,
          guidelines: "High-retention demonstration highlighting key problem/solution hook.",
        },
      ],
      targetCreatorCriteria: {
        minFollowers: 25000,
        minEngagementRate: 3.8,
        platforms: ["youtube", "instagram"],
        tones: ["Authentic", "Educational", "High-Signal"],
      },
      creativeAngles: [
        "The 5-Minute Transformation Challenge",
        "Why Modern Creators Are Switching to This Tool",
        "Behind the Scenes with Full Workflow Breakdown",
      ],
    };
  }

  /**
   * Generate Creator Pitch using LLM or structured template engine
   */
  async generateCreatorPitch(creator: CreatorProfile, campaign: Campaign): Promise<AIGeneratedPitch> {
    const estimatedReach = Math.round(creator.totalFollowers * 0.35);
    const rateRecommendation = Math.min(campaign.budget.perCreatorBudget, creator.startingPrice * 1.2);

    return {
      headline: `High-Retention ${campaign.category} Storytelling for ${campaign.brand.companyName}`,
      fullPitch: `Hey ${campaign.brand.companyName} team,\n\nI’ve followed your product milestones closely and my audience of ${Math.round(
        creator.totalFollowers / 1000
      )}k+ enthusiasts loves high-signal breakdowns. For the "${campaign.title}" initiative, I will create a tailored, high-converting showcase highlighting your core differentiator with authentic workflow demonstrations.\n\nMy typical audience engagement rate sits at ${creator.avgEngagementRate}% (well above platform average), ensuring maximum qualified attention and tangible conversions.`,
      suggestedDeliverables: campaign.deliverables.map((d) => `${d.count}x ${d.type}`),
      estimatedReach,
      rateRecommendation,
      keyHooks: [
        `"The one tool I wish I discovered before building my latest stack..."`,
        `"Why 90% of creators get this wrong (and how ${campaign.brand.companyName} fixes it)"`,
        `"Watch what happens when we benchmark this live..."`,
      ],
    };
  }
}

export const aiService = new AIService();
