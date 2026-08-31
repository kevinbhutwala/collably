import { Campaign, CreatorProfile } from "../types";

export interface MatchBreakdown {
  overallScore: number;
  nicheMatch: number;
  audienceMatch: number;
  engagementMatch: number;
  budgetMatch: number;
  insights: string[];
}

export function calculateCreatorCampaignMatch(
  creator: CreatorProfile,
  campaign: Campaign
): MatchBreakdown {
  const insights: string[] = [];

  // 1. Category / Niche (35%)
  let nicheScore = 60;
  if (creator.primaryCategory === campaign.category) {
    nicheScore = 98;
    insights.push(`Primary category matches campaign niche: ${campaign.category}`);
  } else if (creator.secondaryCategories.includes(campaign.category)) {
    nicheScore = 84;
    insights.push(`Secondary category matches campaign niche: ${campaign.category}`);
  } else {
    insights.push(`Cross-niche opportunity in ${campaign.category}`);
  }

  // 2. Engagement Rate (25%)
  let engagementScore = 70;
  const minEng = campaign.creatorRequirements.minEngagementRate;
  if (creator.avgEngagementRate >= minEng * 1.5) {
    engagementScore = 99;
    insights.push(`High engagement (${creator.avgEngagementRate}% vs ${minEng}% required)`);
  } else if (creator.avgEngagementRate >= minEng) {
    engagementScore = 90;
    insights.push(`Meets engagement threshold (${creator.avgEngagementRate}%)`);
  } else {
    engagementScore = 65;
    insights.push(`Engagement slightly below target (${creator.avgEngagementRate}%)`);
  }

  // 3. Platform & Reach Match (20%)
  let audienceScore = 75;
  const creatorPlatforms = creator.socialAccounts.map((s) => s.platform);
  const platformOverlap = campaign.creatorRequirements.platforms.filter((p) =>
    creatorPlatforms.includes(p)
  );
  if (platformOverlap.length > 0) {
    audienceScore = 95;
    insights.push(`Active on required platforms: ${platformOverlap.join(', ')}`);
  }

  // 4. Budget Compatibility (20%)
  let budgetScore = 80;
  if (campaign.budget.perCreatorBudget >= creator.startingPrice) {
    budgetScore = 96;
    insights.push(`Budget aligns well with creator's starting rate ($${creator.startingPrice})`);
  } else {
    budgetScore = 70;
    insights.push(`Rate negotiation might be needed`);
  }

  const overallScore = Math.round(
    nicheScore * 0.35 + engagementScore * 0.25 + audienceScore * 0.2 + budgetScore * 0.2
  );

  return {
    overallScore: Math.min(99, Math.max(50, overallScore)),
    nicheMatch: nicheScore,
    audienceMatch: audienceScore,
    engagementMatch: engagementScore,
    budgetMatch: budgetScore,
    insights,
  };
}
