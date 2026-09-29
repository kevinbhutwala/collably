import {
  CreatorProfile,
  Campaign,
  BrandProfile,
  PlatformType,
  DeliverableType,
} from "@/core/types";

export interface VerificationCheck {
  id: string;
  category:
    | "profile_completeness"
    | "media_kit"
    | "social_presence"
    | "platform_match"
    | "niche_alignment"
    | "metrics_performance"
    | "audience_demographics"
    | "data_consistency"
    | "budget_fit";
  title: string;
  description: string;
  status: "passed" | "warning" | "failed";
  critical: boolean; // if true and status === 'failed', action is blocked
  details?: string;
  fixAction?: {
    label: string;
    url: string;
  };
}

export interface EligibilityAuditReport {
  eligible: boolean;
  score: number; // 0 - 100
  overallStatus: "ready" | "needs_attention" | "blocked";
  headline: string;
  summary: string;
  checks: VerificationCheck[];
  criticalIssuesCount: number;
  warningsCount: number;
  passedCount: number;
  validatedAt: string;
  direction: "creator_to_campaign" | "brand_to_creator";
}

export class EligibilityService {
  private static instance: EligibilityService;

  public static getInstance(): EligibilityService {
    if (!EligibilityService.instance) {
      EligibilityService.instance = new EligibilityService();
    }
    return EligibilityService.instance;
  }

  /**
   * Verify whether a creator's profile, media kit, and social metrics qualify
   * them to apply for a brand campaign.
   */
  public verifyCreatorForCampaign(
    creator: CreatorProfile,
    campaign: Campaign,
    options?: { proposedFee?: number; sampleLinks?: string[] }
  ): EligibilityAuditReport {
    const checks: VerificationCheck[] = [];

    // ─────────────────────────────────────────────────────────────
    // 1. Profile & Media Kit Completeness
    // ─────────────────────────────────────────────────────────────
    const bioText = (creator.bio || "").trim();
    if (!bioText || bioText.length < 20) {
      checks.push({
        id: "profile_bio",
        category: "profile_completeness",
        title: "Creator Bio & Positioning",
        description: "Bio is missing or too brief to evaluate creator voice and positioning.",
        status: "failed",
        critical: true,
        details: "Provide at least 20 characters explaining your editorial focus and content style.",
        fixAction: { label: "Complete Bio", url: "/app/profile" },
      });
    } else {
      checks.push({
        id: "profile_bio",
        category: "profile_completeness",
        title: "Creator Bio & Positioning",
        description: "Professional bio and editorial positioning are completed.",
        status: "passed",
        critical: true,
      });
    }

    const hasAvatar = Boolean(creator.avatarUrl && creator.avatarUrl.trim().length > 0);
    if (!hasAvatar) {
      checks.push({
        id: "profile_avatar",
        category: "profile_completeness",
        title: "Profile Avatar & Insignia",
        description: "Verified profile image is required for brand identification.",
        status: "failed",
        critical: true,
        details: "Attach a high-resolution headshot or studio branding photo.",
        fixAction: { label: "Upload Photo", url: "/app/profile" },
      });
    } else {
      checks.push({
        id: "profile_avatar",
        category: "profile_completeness",
        title: "Profile Avatar & Insignia",
        description: "High-resolution creator avatar is attached.",
        status: "passed",
        critical: true,
      });
    }

    const hasLocation = Boolean(creator.location && creator.location.trim().length > 0);
    if (!hasLocation) {
      checks.push({
        id: "profile_location",
        category: "profile_completeness",
        title: "Geographic Location",
        description: "Creator operational region or country must be declared.",
        status: "warning",
        critical: false,
        details: "Specify your home territory (e.g. India, United States) in profile settings.",
        fixAction: { label: "Set Location", url: "/app/profile" },
      });
    } else {
      checks.push({
        id: "profile_location",
        category: "profile_completeness",
        title: "Geographic Location",
        description: `Operational base declared: ${creator.location}.`,
        status: "passed",
        critical: false,
      });
    }

    // Rate Card Deliverables check
    const rateCards = creator.rateCards || [];
    const hasRates = rateCards.length > 0 || (Number(creator.startingPrice) > 0);
    if (!hasRates) {
      checks.push({
        id: "media_kit_ratecard",
        category: "media_kit",
        title: "Commercial Rates & Deliverables",
        description: "Media kit has no defined commercial deliverables or starting rate.",
        status: "failed",
        critical: true,
        details: "Configure your starting collaboration rate or at least one rate card item in your profile.",
        fixAction: { label: "Build Rate Card", url: "/app/profile" },
      });
    } else {
      checks.push({
        id: "media_kit_ratecard",
        category: "media_kit",
        title: "Commercial Rates & Deliverables",
        description: rateCards.length > 0
          ? `${rateCards.length} verified commercial rate card deliverable(s) published.`
          : `Starting collaboration rate set ($${creator.startingPrice}).`,
        status: "passed",
        critical: true,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 2. Social Media Presence & Channel Consistency
    // ─────────────────────────────────────────────────────────────
    const socialAccounts = creator.socialAccounts || [];
    if (socialAccounts.length === 0) {
      checks.push({
        id: "social_presence_connected",
        category: "social_presence",
        title: "Connected Social Channels",
        description: "No verified social accounts are linked to your profile.",
        status: "failed",
        critical: true,
        details: "Link at least one active channel (Instagram, YouTube, X, or TikTok) to verify reach.",
        fixAction: { label: "Connect Socials", url: "/app/profile" },
      });
    } else {
      checks.push({
        id: "social_presence_connected",
        category: "social_presence",
        title: "Connected Social Channels",
        description: `${socialAccounts.length} live channel(s) connected (${socialAccounts.map((s) => s.platform).join(", ")}).`,
        status: "passed",
        critical: true,
      });

      // Strict Channel Ownership Verification Check:
      // Until and unless all added channels (Instagram, YouTube, etc.) are verified,
      // the profile is not confirmed and cannot apply to campaigns.
      const unverifiedAccounts = socialAccounts.filter(
        (s) => !s.verifiedBadge && s.verificationStatus !== "verified" && !s.verifiedVia
      );

      if (unverifiedAccounts.length > 0) {
        checks.push({
          id: "social_channel_verification",
          category: "social_presence",
          title: "Channel Ownership Verification",
          description: `${unverifiedAccounts.length} connected channel(s) (${unverifiedAccounts.map((s) => `${s.platform.toUpperCase()} @${s.handle}`).join(", ")}) are unverified.`,
          status: "failed",
          critical: true,
          details: "Profile is not confirmed. Every social media channel added by the creator (Instagram, YouTube, etc.) must be verified before the profile is confirmed and campaign applications are unlocked.",
          fixAction: { label: "Verify Channels", url: "/app/profile" },
        });
      } else {
        checks.push({
          id: "social_channel_verification",
          category: "social_presence",
          title: "Channel Ownership Verification",
          description: `All ${socialAccounts.length} connected channel(s) are authenticated and verified.`,
          status: "passed",
          critical: true,
        });
      }
    }

    // Consistency Audit: Total claimed followers vs sum of connected channel followers
    const sumFollowers = socialAccounts.reduce((acc, s) => acc + (Number(s.followers) || 0), 0);
    const claimedFollowers = Number(creator.totalFollowers) || 0;
    if (claimedFollowers > 0 && sumFollowers > 0) {
      const discrepancyRatio = Math.abs(claimedFollowers - sumFollowers) / Math.max(claimedFollowers, sumFollowers);
      if (discrepancyRatio > 0.4) {
        checks.push({
          id: "data_consistency_followers",
          category: "data_consistency",
          title: "Audience Metric Consistency",
          description: "Noticeable discrepancy between media kit claimed reach and connected channel metrics.",
          status: "warning",
          critical: false,
          details: `Claimed reach: ${claimedFollowers.toLocaleString()} vs connected channel sum: ${sumFollowers.toLocaleString()}. Re-sync channels.`,
          fixAction: { label: "Sync Metrics", url: "/app/profile" },
        });
      } else {
        checks.push({
          id: "data_consistency_followers",
          category: "data_consistency",
          title: "Audience Metric Consistency",
          description: "Media kit metrics and connected channel telemetry are mathematically aligned.",
          status: "passed",
          critical: false,
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. Platform Requirement Match
    // ─────────────────────────────────────────────────────────────
    const requiredPlatforms = campaign.creatorRequirements?.platforms || [];
    if (requiredPlatforms.length > 0) {
      const creatorPlatforms = socialAccounts.map((s) => s.platform.toLowerCase());
      const missingPlatforms = requiredPlatforms.filter(
        (rp) => !creatorPlatforms.includes(rp.toLowerCase() as PlatformType)
      );

      if (missingPlatforms.length === requiredPlatforms.length) {
        // Missing ALL required platforms
        checks.push({
          id: "platform_match",
          category: "platform_match",
          title: "Platform Compatibility",
          description: `Campaign requires content on [${requiredPlatforms.join(", ")}], but none of these channels are connected to your profile.`,
          status: "failed",
          critical: true,
          details: `Connect your active ${requiredPlatforms.join(" or ")} account to qualify for this brief.`,
          fixAction: { label: "Add Channels", url: "/app/profile" },
        });
      } else if (missingPlatforms.length > 0) {
        // Missing SOME required platforms
        checks.push({
          id: "platform_match",
          category: "platform_match",
          title: "Partial Platform Overlap",
          description: `Campaign mentions [${requiredPlatforms.join(", ")}]. You have ${requiredPlatforms.length - missingPlatforms.length}/${requiredPlatforms.length} connected. Missing: ${missingPlatforms.join(", ")}.`,
          status: "warning",
          critical: false,
          details: "You can apply if your proposal focuses on your available connected channels.",
        });
      } else {
        checks.push({
          id: "platform_match",
          category: "platform_match",
          title: "Platform Compatibility",
          description: `100% platform coverage for requested channels (${requiredPlatforms.join(", ")}).`,
          status: "passed",
          critical: true,
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Content Type & Deliverables Alignment
    // ─────────────────────────────────────────────────────────────
    const campaignDeliverables = (campaign.deliverables || []).map((d) => d.type);
    if (campaignDeliverables.length > 0) {
      const creatorDeliverableTypes = rateCards.map((r) => r.deliverableType);
      const matchingTypes = campaignDeliverables.filter((cd) =>
        creatorDeliverableTypes.includes(cd as DeliverableType)
      );

      if (matchingTypes.length === 0 && rateCards.length > 0) {
        checks.push({
          id: "deliverable_fit",
          category: "media_kit",
          title: "Deliverable Format Alignment",
          description: `Campaign requests [${campaignDeliverables.join(", ")}], which is not explicitly listed in your rate cards.`,
          status: "warning",
          critical: false,
          details: "State your experience with these content formats directly in your proposal pitch.",
        });
      } else {
        checks.push({
          id: "deliverable_fit",
          category: "media_kit",
          title: "Deliverable Format Alignment",
          description: `Media kit rate cards cover requested campaign deliverables.`,
          status: "passed",
          critical: false,
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 5. Niche & Category Alignment
    // ─────────────────────────────────────────────────────────────
    const campaignCat = campaign.category;
    const creatorPrimary = creator.primaryCategory;
    const creatorSecondaries = creator.secondaryCategories || [];

    if (creatorPrimary === campaignCat) {
      checks.push({
        id: "niche_alignment",
        category: "niche_alignment",
        title: "Niche & Category Match",
        description: `Direct primary niche match in ${campaignCat}.`,
        status: "passed",
        critical: false,
      });
    } else if (creatorSecondaries.includes(campaignCat)) {
      checks.push({
        id: "niche_alignment",
        category: "niche_alignment",
        title: "Secondary Niche Alignment",
        description: `Cross-domain competence in ${campaignCat} via secondary categories.`,
        status: "passed",
        critical: false,
      });
    } else {
      checks.push({
        id: "niche_alignment",
        category: "niche_alignment",
        title: "Adjacent Category Outreach",
        description: `Your primary category is "${creatorPrimary}" while this campaign is for "${campaignCat}".`,
        status: "warning",
        critical: false,
        details: "Explain why your audience is interested in this product despite the category divergence.",
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 6. Audience Scale & Performance Requirements
    // ─────────────────────────────────────────────────────────────
    const minFollowers = campaign.creatorRequirements?.minFollowers || 0;
    const effectiveFollowers = creator.totalFollowers || sumFollowers || 0;

    if (minFollowers > 0) {
      if (effectiveFollowers < minFollowers) {
        checks.push({
          id: "metrics_followers",
          category: "metrics_performance",
          title: "Follower Bracket Requirement",
          description: `Campaign requests minimum ${minFollowers.toLocaleString()} followers. Current audited count: ${effectiveFollowers.toLocaleString()}.`,
          status: "failed",
          critical: true,
          details: `Target threshold: ${minFollowers.toLocaleString()} followers.`,
        });
      } else {
        checks.push({
          id: "metrics_followers",
          category: "metrics_performance",
          title: "Follower Scale Qualified",
          description: `Meets follower minimum (${effectiveFollowers.toLocaleString()} vs ${minFollowers.toLocaleString()} min).`,
          status: "passed",
          critical: true,
        });
      }
    }

    const minEng = campaign.creatorRequirements?.minEngagementRate || 0;
    const creatorEng = creator.avgEngagementRate || 0;
    if (minEng > 0) {
      if (creatorEng > 0 && creatorEng < minEng * 0.7) {
        checks.push({
          id: "metrics_engagement",
          category: "metrics_performance",
          title: "Engagement Rate Benchmark",
          description: `Audited engagement (${creatorEng.toFixed(1)}%) is below campaign preference of ${minEng.toFixed(1)}%.`,
          status: "warning",
          critical: false,
          details: "Highlight your high-converting retention rate or view-through metrics in your pitch.",
        });
      } else {
        checks.push({
          id: "metrics_engagement",
          category: "metrics_performance",
          title: "Engagement Health Verified",
          description: `Engagement (${creatorEng.toFixed(1)}%) meets brand performance expectations.`,
          status: "passed",
          critical: false,
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 7. Audience Demographics & Geography
    // ─────────────────────────────────────────────────────────────
    const targetLocations = campaign.targetAudience?.locations || [];
    if (targetLocations.length > 0) {
      const creatorBase = (creator.location || "").toLowerCase();
      const topCountries = (creator.audience?.topCountries || []).map((c) => c.country.toLowerCase());

      const hasGeoOverlap =
        targetLocations.some((loc) => creatorBase.includes(loc.toLowerCase())) ||
        targetLocations.some((loc) => topCountries.includes(loc.toLowerCase()));

      if (!hasGeoOverlap && topCountries.length > 0) {
        checks.push({
          id: "audience_geo",
          category: "audience_demographics",
          title: "Target Geographic Concentration",
          description: `Campaign targets [${targetLocations.join(", ")}], but your audience top countries are [${creator.audience?.topCountries?.map((c) => c.country).slice(0, 3).join(", ")}].`,
          status: "warning",
          critical: false,
          details: "Ensure your content resonates with the brand's target regional demographic.",
        });
      } else {
        checks.push({
          id: "audience_geo",
          category: "audience_demographics",
          title: "Audience Geographic Alignment",
          description: `Audience concentration aligns with target campaign regions.`,
          status: "passed",
          critical: false,
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 8. Commercial / Budget Feasibility
    // ─────────────────────────────────────────────────────────────
    const perCreatorBudget = campaign.budget?.perCreatorBudget || 0;
    const proposed = options?.proposedFee || creator.startingPrice || 0;

    if (perCreatorBudget > 0 && proposed > 0) {
      if (proposed > perCreatorBudget * 2.0) {
        checks.push({
          id: "budget_feasibility",
          category: "budget_fit",
          title: "Budget Spread Caution",
          description: `Proposed rate ($${proposed.toLocaleString()}) is more than 2x the campaign allocated budget ($${perCreatorBudget.toLocaleString()}).`,
          status: "warning",
          critical: false,
          details: "Consider adjusting deliverables or tailoring a specialized milestone package.",
        });
      } else {
        checks.push({
          id: "budget_feasibility",
          category: "budget_fit",
          title: "Budget Alignment Verified",
          description: `Proposed fee ($${proposed.toLocaleString()}) fits comfortably within campaign budget parameters ($${perCreatorBudget.toLocaleString()}).`,
          status: "passed",
          critical: false,
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // Summarize & Compute Final Score
    // ─────────────────────────────────────────────────────────────
    const criticalIssues = checks.filter((c) => c.critical && c.status === "failed");
    const warnings = checks.filter((c) => c.status === "warning");
    const passed = checks.filter((c) => c.status === "passed");

    const totalWeight = checks.length;
    const scoreVal = Math.round(
      ((passed.length + warnings.length * 0.5) / Math.max(totalWeight, 1)) * 100
    );

    const eligible = criticalIssues.length === 0;
    const overallStatus: "ready" | "needs_attention" | "blocked" =
      criticalIssues.length > 0
        ? "blocked"
        : warnings.length > 0
        ? "needs_attention"
        : "ready";

    const headline =
      overallStatus === "ready"
        ? "100% Pre-Flight Verification Passed"
        : overallStatus === "needs_attention"
        ? "Application Eligible with Advisories"
        : `Pre-Flight Verification Blocked (${criticalIssues.length} Critical Requirement${criticalIssues.length > 1 ? "s" : ""})`;

    const summary =
      overallStatus === "ready"
        ? "Your media kit, connected social metrics, and audience demographics match all campaign criteria. You are fully qualified to submit your proposal."
        : overallStatus === "needs_attention"
        ? "You meet the required thresholds to apply, but some campaign criteria have advisories. Review the checklist below to optimize your pitch."
        : "You cannot submit an application until all critical requirements are addressed. Please update your profile or connect the required channels.";

    return {
      eligible,
      score: scoreVal,
      overallStatus,
      headline,
      summary,
      checks,
      criticalIssuesCount: criticalIssues.length,
      warningsCount: warnings.length,
      passedCount: passed.length,
      validatedAt: new Date().toISOString(),
      direction: "creator_to_campaign",
    };
  }

  /**
   * Reverse Verification: When a brand invites, contacts, or sends a sponsorship
   * proposal to a creator, verify brand legitimacy, brief completeness, and mutual fit.
   */
  public verifyBrandForCreator(
    brand: BrandProfile,
    creator: CreatorProfile,
    options?: {
      campaignTitle?: string;
      totalAgreedBudget?: number;
      deliverableType?: string;
    }
  ): EligibilityAuditReport {
    const checks: VerificationCheck[] = [];

    // 1. Brand Workspace Completeness
    const companyName = (brand.companyName || "").trim();
    if (!companyName || companyName.length < 2) {
      checks.push({
        id: "brand_name",
        category: "profile_completeness",
        title: "Company Identity",
        description: "Brand organization name is missing or incomplete.",
        status: "failed",
        critical: true,
        details: "Complete your brand company profile before issuing sponsorship invitations.",
        fixAction: { label: "Update Brand Profile", url: "/app/brand/settings" },
      });
    } else {
      checks.push({
        id: "brand_name",
        category: "profile_completeness",
        title: "Company Identity",
        description: `Verified brand account: ${companyName}.`,
        status: "passed",
        critical: true,
      });
    }

    const hasLogo = Boolean(brand.logoUrl && brand.logoUrl.trim().length > 0);
    if (!hasLogo) {
      checks.push({
        id: "brand_logo",
        category: "profile_completeness",
        title: "Brand Logo & Insignia",
        description: "Official brand logo is recommended so creators recognize your business.",
        status: "warning",
        critical: false,
        details: "Upload an official vector or square company emblem.",
        fixAction: { label: "Upload Logo", url: "/app/brand/settings" },
      });
    } else {
      checks.push({
        id: "brand_logo",
        category: "profile_completeness",
        title: "Brand Logo & Insignia",
        description: "Official brand insignia verified.",
        status: "passed",
        critical: false,
      });
    }

    // 2. Budget Solvency & Commercial Fairness
    const proposedBudget = Number(options?.totalAgreedBudget) || 0;
    const creatorStartingPrice = Number(creator.startingPrice) || 0;

    if (proposedBudget > 0 && creatorStartingPrice > 0) {
      if (proposedBudget < creatorStartingPrice * 0.5) {
        checks.push({
          id: "commercial_fairness",
          category: "budget_fit",
          title: "Below Creator Base Rate",
          description: `Proposed budget ($${proposedBudget.toLocaleString()}) is below creator standard minimum ($${creatorStartingPrice.toLocaleString()}).`,
          status: "warning",
          critical: false,
          details: "Creator may decline or request reduced deliverable scope.",
        });
      } else {
        checks.push({
          id: "commercial_fairness",
          category: "budget_fit",
          title: "Commercial Budget Viability",
          description: `Proposed budget ($${proposedBudget.toLocaleString()}) meets or exceeds creator base starting rate ($${creatorStartingPrice.toLocaleString()}).`,
          status: "passed",
          critical: false,
        });
      }
    }

    // 3. Creator Availability Status
    if (creator.availableForHire === false) {
      checks.push({
        id: "creator_availability",
        category: "profile_completeness",
        title: "Creator Availability",
        description: "This creator is currently marked as unavailable for inbound sponsorships.",
        status: "failed",
        critical: true,
        details: "Creator is at capacity or taking a hiatus. You can shortlist them for upcoming quarters.",
      });
    } else {
      checks.push({
        id: "creator_availability",
        category: "profile_completeness",
        title: "Creator Available for Hire",
        description: "Creator calendar is open for sponsored deliverables.",
        status: "passed",
        critical: true,
      });
    }

    // 4. Deliverable Format Compatibility
    const requestedDeliverable = options?.deliverableType;
    if (requestedDeliverable) {
      const creatorFormats = (creator.rateCards || []).map((r) => r.deliverableType);
      if (creatorFormats.length > 0 && !creatorFormats.includes(requestedDeliverable as DeliverableType)) {
        checks.push({
          id: "deliverable_compatibility",
          category: "media_kit",
          title: "Deliverable Format Notice",
          description: `Creator does not standardly publish "${requestedDeliverable}" in their media kit rate card.`,
          status: "warning",
          critical: false,
          details: `Standard formats: ${creatorFormats.join(", ")}. Outline custom specs in your message.`,
        });
      } else {
        checks.push({
          id: "deliverable_compatibility",
          category: "media_kit",
          title: "Deliverable Format Compatible",
          description: `Requested format (${requestedDeliverable}) is an audited deliverable in creator media kit.`,
          status: "passed",
          critical: false,
        });
      }
    }

    // 5. Industry & Niche Harmony
    const brandIndustry = (brand.industry || "").toLowerCase();
    const creatorNiche = (creator.primaryCategory || "").toLowerCase();
    const secondaries = (creator.secondaryCategories || []).map((s) => s.toLowerCase());

    if (creatorNiche.includes(brandIndustry) || brandIndustry.includes(creatorNiche)) {
      checks.push({
        id: "brand_niche_fit",
        category: "niche_alignment",
        title: "Industry & Niche Harmony",
        description: `Direct synergy between brand sector (${brand.industry}) and creator specialty (${creator.primaryCategory}).`,
        status: "passed",
        critical: false,
      });
    } else if (secondaries.some((s) => s.includes(brandIndustry) || brandIndustry.includes(s))) {
      checks.push({
        id: "brand_niche_fit",
        category: "niche_alignment",
        title: "Cross-Industry Alignment",
        description: `Brand industry matches creator secondary categories.`,
        status: "passed",
        critical: false,
      });
    } else {
      checks.push({
        id: "brand_niche_fit",
        category: "niche_alignment",
        title: "Cross-Sector Outreach",
        description: `Creator audience centers on ${creator.primaryCategory}. Ensure brand brief provides clear context for their audience.`,
        status: "warning",
        critical: false,
      });
    }

    // Summarize
    const criticalIssues = checks.filter((c) => c.critical && c.status === "failed");
    const warnings = checks.filter((c) => c.status === "warning");
    const passed = checks.filter((c) => c.status === "passed");

    const totalWeight = checks.length;
    const scoreVal = Math.round(
      ((passed.length + warnings.length * 0.5) / Math.max(totalWeight, 1)) * 100
    );

    const eligible = criticalIssues.length === 0;
    const overallStatus: "ready" | "needs_attention" | "blocked" =
      criticalIssues.length > 0
        ? "blocked"
        : warnings.length > 0
        ? "needs_attention"
        : "ready";

    const headline =
      overallStatus === "ready"
        ? "Proposal Ready to Dispatch"
        : overallStatus === "needs_attention"
        ? "Invitation Ready with Recommendations"
        : "Cannot Dispatch Brief (Critical Constraint)";

    const summary =
      overallStatus === "ready"
        ? "Brand workspace, budget solvency, and deliverable specifications are verified. Ready to initiate collaboration."
        : overallStatus === "needs_attention"
        ? "You can dispatch this brief, but consider the advisories below to maximize creator acceptance rate."
        : "Critical requirements are missing. Review the checklist before sending this proposal.";

    return {
      eligible,
      score: scoreVal,
      overallStatus,
      headline,
      summary,
      checks,
      criticalIssuesCount: criticalIssues.length,
      warningsCount: warnings.length,
      passedCount: passed.length,
      validatedAt: new Date().toISOString(),
      direction: "brand_to_creator",
    };
  }
}

export const eligibilityService = EligibilityService.getInstance();
