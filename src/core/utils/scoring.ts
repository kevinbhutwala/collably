import { CreatorProfile } from "../types";

export interface ProfileScoreBreakdown {
  totalScore: number;
  grade: "Strong Profile" | "Verified Creator" | "Top Creator" | "Needs Attention";
  sections: {
    name: string;
    score: number;
    maxScore: number;
    completed: boolean;
    recommendation?: string;
  }[];
  missingItems: {
    id: string;
    label: string;
    points: number;
    actionUrl: string;
  }[];
}

export function calculateProfileCompleteness(creator: CreatorProfile): ProfileScoreBreakdown {
  const missingItems = [];
  const sections = [];

  // Section 1: Basic Identity & Bio (25 pts)
  let basicScore = 0;
  if (creator.fullName && creator.handle) basicScore += 5;
  if (creator.avatarUrl) basicScore += 10;
  else missingItems.push({ id: "avatar", label: "Upload high-res profile avatar", points: 10, actionUrl: "/app/profile" });

  if (creator.bio && creator.bio.length > 40) basicScore += 5;
  else missingItems.push({ id: "bio", label: "Add detailed bio narrative", points: 5, actionUrl: "/app/profile" });

  if (creator.headline) basicScore += 5;
  sections.push({
    name: "Identity & Media Kit",
    score: basicScore,
    maxScore: 25,
    completed: basicScore >= 20,
    recommendation: basicScore < 20 ? "Add your creator headline & profile avatar" : undefined,
  });

  // Section 2: Social Account Sync (25 pts)
  let socialScore = 0;
  if (creator.socialAccounts && creator.socialAccounts.length > 0) {
    socialScore += Math.min(25, creator.socialAccounts.length * 10);
  }
  if (socialScore < 20) {
    missingItems.push({ id: "social", label: "Connect YouTube or Instagram channel", points: 15, actionUrl: "/app/profile" });
  }
  sections.push({
    name: "Social Channels",
    score: socialScore,
    maxScore: 25,
    completed: socialScore >= 20,
    recommendation: socialScore < 20 ? "Connect at least 2 verified social accounts" : undefined,
  });

  // Section 3: Rate Cards & Pricing (25 pts)
  let pricingScore = 0;
  if (creator.startingPrice > 0) pricingScore += 10;
  if (creator.rateCards && creator.rateCards.length > 0) {
    pricingScore += Math.min(15, creator.rateCards.length * 5);
  }
  if (pricingScore < 20) {
    missingItems.push({ id: "rates", label: "Add standard rate cards & turnaround times", points: 15, actionUrl: "/app/profile" });
  }
  sections.push({
    name: "Rate Cards & Formats",
    score: pricingScore,
    maxScore: 25,
    completed: pricingScore >= 20,
    recommendation: pricingScore < 20 ? "Define at least 2 deliverable rate cards" : undefined,
  });

  // Section 4: Verified Audience Demographics (25 pts)
  let audienceScore = 0;
  if (creator.audience?.topCountries?.length > 0) audienceScore += 10;
  if (creator.audience?.ageDistribution?.length > 0) audienceScore += 10;
  if (creator.verified) audienceScore += 5;
  if (audienceScore < 20) {
    missingItems.push({ id: "audience", label: "Sync verified audience geography", points: 10, actionUrl: "/app/analytics" });
  }
  sections.push({
    name: "Audience Intel & Verification",
    score: audienceScore,
    maxScore: 25,
    completed: audienceScore >= 20,
  });

  const totalScore = basicScore + socialScore + pricingScore + audienceScore;

  let grade: ProfileScoreBreakdown["grade"] = "Needs Attention";
  if (totalScore >= 90 && creator.verified) grade = "Top Creator";
  else if (totalScore >= 80) grade = "Verified Creator";
  else if (totalScore >= 60) grade = "Strong Profile";

  return {
    totalScore,
    grade,
    sections,
    missingItems,
  };
}
