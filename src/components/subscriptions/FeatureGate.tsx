"use client";

import React from "react";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { useAuthStore } from "@/stores/auth.store";
import { PlanFeatureKey, SubscriptionPlanId } from "@/core/types";
import { LockedFeatureCard } from "./LockedFeatureCard";

interface FeatureGateProps {
  feature: PlanFeatureKey;
  requiredPlanId?: SubscriptionPlanId;
  title?: string;
  description?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
}

export function FeatureGate({
  feature,
  requiredPlanId,
  title,
  description,
  fallback,
  children,
  compact = false,
}: FeatureGateProps) {
  const { hasFeature, subscription } = useSubscriptionStore();
  const { role } = useAuthStore();

  const isAllowed =
    hasFeature(feature) ||
    ["super_admin", "agency_admin", "agency_owner"].includes(role);

  if (isAllowed) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // Determine appropriate required plan based on feature and role
  const resolvedRequiredPlanId: SubscriptionPlanId =
    requiredPlanId ||
    (role === "brand" || role === "brand_owner" ? "brand_growth" : "creator_pro");

  const defaultTitles: Record<PlanFeatureKey, string> = {
    crmPipeline: "Creator Relationship Pipeline & Talent CRM",
    advancedAnalytics: "Audience Demographics & Retention Intelligence",
    aiPitchGenerator: "AI-Powered Pitch Draft Assistant",
    aiCreatorMatching: "Deep AI Match Scoring & Compatibility Telemetry",
    advancedRoiTelemetry: "Campaign Attribution & ROI Telemetry",
    activeCampaigns: "Expand Campaign Brief Limits",
    instantPayouts: "Instant 2-Hour Escrow Payout Rails",
    verifiedBadge: "Gold Verified Pro Creator Checkmark",
    priorityDiscovery: "Priority Recommendation in Brand Discovery",
    multiCreatorManagement: "Multi-Channel Creator Talent Collective",
    customDomain: "White-Labeled Custom Domain & Media Kit",
    creatorShortlists: "Creator Shortlists & Collections",
    teamSeats: "Multi-Seat Team Workspace Collaboration",
    contractCompliance: "Automated Contract & 1099 Tax Compliance",
    dedicatedAccountManager: "Dedicated Account Concierge & VIP SLA",
    apiAccess: "Custom Webhook & REST API Integrations",
    mediaKit: "Creator Media Kit",
    campaignApplications: "Campaign Pitch Limit",
    adminOverride: "System Administrator Access",
  };

  const defaultDescriptions: Record<PlanFeatureKey, string> = {
    crmPipeline:
      "Track influencer outreach, negotiation stages, past campaign spend, and private team evaluation notes.",
    advancedAnalytics:
      "Unlock 30-day view impression retention curves, geographic concentration, and verified age/gender distributions.",
    aiPitchGenerator:
      "Generate high-converting customized pitch proposals tailored to brand campaign briefs using Deep Intelligence.",
    aiCreatorMatching:
      "Evaluate algorithmic fit scores and audience overlap before inviting creators to your campaign roster.",
    advancedRoiTelemetry:
      "Monitor full-funnel impressions, engagement benchmarks, and conversion telemetry across live campaigns.",
    activeCampaigns:
      "Scale beyond your current active campaign quota with unlimited brief publications and talent workflows.",
    instantPayouts:
      "Withdraw milestone funds within 2 hours of brand deliverable approval instead of standard 7-day settlement.",
    verifiedBadge:
      "Stand out in brand search with the coveted Gold Pro Verified badge and boost your pitch acceptance rates.",
    priorityDiscovery:
      "Appear at the top of brand search results and curated creator discovery shortlists.",
    multiCreatorManagement:
      "Manage multiple talent profiles, cross-channel rate cards, and centralized agency escrow splits.",
    customDomain:
      "Host your interactive audited media kit on your own custom domain with custom branding.",
    creatorShortlists:
      "Organize creators into custom lists and share with team stakeholders.",
    teamSeats:
      "Invite your marketing team, campaign managers, and legal reviewers to collaborate.",
    contractCompliance:
      "Generate automated digital contracts, NDAs, and automated 1099 tax generation.",
    dedicatedAccountManager:
      "Get a dedicated talent director and direct Slack / priority escrow support.",
    apiAccess:
      "Integrate Collably data pipelines directly with your internal CRM, ERP, and analytics tools.",
    mediaKit: "Create and publish your audited digital media kit.",
    campaignApplications: "Submit pitches and proposals to live brand campaign briefs.",
    adminOverride: "Full administrative capabilities.",
  };

  return (
    <LockedFeatureCard
      title={title || defaultTitles[feature] || "Premium Feature Locked"}
      description={
        description ||
        defaultDescriptions[feature] ||
        "This feature is not included in your current subscription plan. Upgrade your plan to unlock instant access."
      }
      requiredPlanId={resolvedRequiredPlanId}
      compact={compact}
    />
  );
}
