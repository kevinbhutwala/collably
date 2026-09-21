import { CreatorProfile } from "@/core/types";
import { MOCK_CREATORS } from "@/mock/creators.mock";

export interface EnrichedCreator extends CreatorProfile {
  matchScore?: number;
  matchReasons?: string[];
  subscores?: {
    audienceAlignment: number;
    engagementQuality: number;
    budgetMatch: number;
    brandSafety: number;
  };
}

export type CentralCreator = EnrichedCreator;

export const CENTRAL_CREATORS: EnrichedCreator[] = MOCK_CREATORS.map((c, idx) => ({
  ...c,
  matchScore: 95 + (idx % 5),
  matchReasons: [
    `Key regional influencer in ${c.region || c.location} with ${(c.totalFollowers / 1000000).toFixed(1)}M verified audience`,
    `Consistent ${c.avgEngagementRate}% Instagram engagement with prime demographic alignment`,
    `High quality score of ${c.qualityScore}/100 across ${c.primaryCategory} deliverables`,
  ],
  subscores: {
    audienceAlignment: 96 + (idx % 4),
    engagementQuality: 95 + (idx % 5),
    budgetMatch: 94 + (idx % 6),
    brandSafety: 98 + (idx % 2),
  },
}));
