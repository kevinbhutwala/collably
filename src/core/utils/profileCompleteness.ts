import { CreatorProfile, SocialAccount } from "../types";

export interface ProfileCompletenessRequirement {
  id: string;
  label: string;
  category: "identity" | "positioning" | "commercial" | "social" | "verification";
  done: boolean;
  hint: string;
  href?: string;
}

export interface ProfileStatusResult {
  isComplete: boolean;
  isConfirmed: boolean;
  canApplyToCampaigns: boolean;
  score: number;
  completedCount: number;
  totalRequirements: number;
  missingRequirements: string[];
  unverifiedSocials: SocialAccount[];
  checks: ProfileCompletenessRequirement[];
  headline: string;
  summary: string;
}

/**
 * Single authoritative validator for Creator profile completeness and verification status.
 * Until and unless all required fields are filled AND all connected social channels are verified,
 * a creator cannot apply for campaigns.
 */
export function checkCreatorProfileStatus(
  creator: CreatorProfile | null | undefined
): ProfileStatusResult {
  if (!creator) {
    return {
      isComplete: false,
      isConfirmed: false,
      canApplyToCampaigns: false,
      score: 0,
      completedCount: 0,
      totalRequirements: 7,
      missingRequirements: [
        "Creator headline",
        "Editorial bio (minimum 20 characters)",
        "Niche category",
        "Commercial starting rate (₹)",
        "Profile avatar",
        "Connected social channels (Instagram, YouTube, etc.)",
        "Channel ownership verification",
      ],
      unverifiedSocials: [],
      checks: [
        { id: "headline", label: "Headline", category: "positioning", done: false, hint: "Add a headline (min 5 chars)", href: "/app/profile" },
        { id: "bio", label: "Editorial Bio", category: "positioning", done: false, hint: "Add your bio (min 20 chars)", href: "/app/profile" },
        { id: "category", label: "Niche Category", category: "positioning", done: false, hint: "Select your primary niche", href: "/app/profile" },
        { id: "rates", label: "Starting Rate", category: "commercial", done: false, hint: "Set your base commercial rate in ₹", href: "/app/profile" },
        { id: "avatar", label: "Profile Avatar", category: "identity", done: false, hint: "Upload a high-res photo", href: "/app/profile" },
        { id: "socials", label: "Connect Channels", category: "social", done: false, hint: "Link Instagram, YouTube, etc.", href: "/app/profile" },
        { id: "socials_verified", label: "Verify Channels", category: "verification", done: false, hint: "Authenticate channel ownership", href: "/app/profile" },
      ],
      headline: "Profile Incomplete",
      summary: "Please create and complete your creator profile to unlock campaign applications.",
    };
  }

  const hasHeadline = Boolean(creator.headline && creator.headline.trim().length >= 5);
  const hasBio = Boolean(creator.bio && creator.bio.trim().length >= 20);
  const hasCategory = Boolean(creator.primaryCategory && creator.primaryCategory.trim().length > 0);
  const hasRates = Boolean(
    (creator.startingPrice && Number(creator.startingPrice) > 0) ||
    (creator.rateCards && creator.rateCards.length > 0)
  );
  const hasAvatar = Boolean(creator.avatarUrl && creator.avatarUrl.trim().length > 0);

  const socials = creator.socialAccounts || [];
  const hasSocials = socials.length > 0;
  const unverifiedSocials = socials.filter(
    (s) => !s.verifiedBadge && s.verificationStatus !== "verified" && !s.verifiedVia
  );
  const allSocialsVerified = hasSocials && unverifiedSocials.length === 0;

  const checks: ProfileCompletenessRequirement[] = [
    {
      id: "headline",
      label: "Headline",
      category: "positioning",
      done: hasHeadline,
      hint: "Add a headline describing your style (min 5 characters)",
      href: "/app/profile",
    },
    {
      id: "bio",
      label: "Editorial Bio",
      category: "positioning",
      done: hasBio,
      hint: "Add detailed creator bio narrative (min 20 characters)",
      href: "/app/profile",
    },
    {
      id: "category",
      label: "Niche Category",
      category: "positioning",
      done: hasCategory,
      hint: "Declare your primary content category",
      href: "/app/profile",
    },
    {
      id: "rates",
      label: "Commercial Starting Rate",
      category: "commercial",
      done: hasRates,
      hint: "Set base commercial collaboration fee (₹ INR)",
      href: "/app/profile",
    },
    {
      id: "avatar",
      label: "Profile Avatar",
      category: "identity",
      done: hasAvatar,
      hint: "Upload a high-resolution profile portrait",
      href: "/app/profile",
    },
    {
      id: "socials",
      label: "Connected Channels",
      category: "social",
      done: hasSocials,
      hint: "Connect at least one active channel (Instagram, YouTube, etc.)",
      href: "/app/profile",
    },
    {
      id: "socials_verified",
      label: unverifiedSocials.length > 0
        ? `Channel Verification (${unverifiedSocials.length} Unverified)`
        : "Channel Ownership Verified",
      category: "verification",
      done: allSocialsVerified,
      hint: unverifiedSocials.length > 0
        ? `Authenticate ownership of: ${unverifiedSocials.map((s) => `${s.platform.toUpperCase()} @${s.handle}`).join(", ")}`
        : "All connected channels are verified",
      href: "/app/profile",
    },
  ];

  const completedCount = checks.filter((c) => c.done).length;
  const score = Math.round((completedCount / checks.length) * 100);

  const missingRequirements: string[] = [];
  if (!hasHeadline) missingRequirements.push("Headline (minimum 5 characters)");
  if (!hasBio) missingRequirements.push("Editorial bio (minimum 20 characters)");
  if (!hasCategory) missingRequirements.push("Primary niche category");
  if (!hasRates) missingRequirements.push("Commercial starting rate or rate card in ₹ INR");
  if (!hasAvatar) missingRequirements.push("Profile avatar photo");
  if (!hasSocials) missingRequirements.push("Connect at least one social channel (Instagram, YouTube, etc.)");
  if (hasSocials && !allSocialsVerified) {
    missingRequirements.push(
      `Verify channel ownership for: ${unverifiedSocials.map((s) => `${s.platform} (@${s.handle})`).join(", ")}`
    );
  }

  // Strictly enforced: Profile is confirmed ONLY when score === 100% AND all social channels are verified
  const isComplete = completedCount === checks.length && allSocialsVerified;
  const isConfirmed = isComplete;
  const canApplyToCampaigns = isComplete;

  let headlineText = "Profile Ready & Confirmed";
  let summaryText = "Your profile is complete and verified. You can apply for all open brand campaigns.";

  if (!isComplete) {
    if (hasSocials && !allSocialsVerified) {
      headlineText = "Profile Unconfirmed • Channels Unverified";
      summaryText = `You have ${unverifiedSocials.length} unverified channel(s). Until all channels are verified, your profile cannot be confirmed and campaign applications are locked.`;
    } else {
      headlineText = "Profile Incomplete • Applications Locked";
      summaryText = `Complete your creator details and verify connected channels (${completedCount}/${checks.length} completed) to unlock campaign pitches.`;
    }
  }

  return {
    isComplete,
    isConfirmed,
    canApplyToCampaigns,
    score,
    completedCount,
    totalRequirements: checks.length,
    missingRequirements,
    unverifiedSocials,
    checks,
    headline: headlineText,
    summary: summaryText,
  };
}
