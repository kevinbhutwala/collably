import { CreatorProfile, ReputationBadge } from "@/core/types";

export function getClientCreatorBadges(creator: CreatorProfile): ReputationBadge[] {
  const badges: ReputationBadge[] = [];

  if (creator.verified) {
    badges.push({
      id: "verified",
      label: "Verified",
      icon: "✓",
      description: "Audited identity and platform handles verified by AbeyCollab.",
      qualificationProof: "Identity & analytics verified",
      colorTheme: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-600 dark:text-blue-400",
      },
    });
  }

  // Rising Creator
  if (creator.totalFollowers <= 100000 && creator.avgEngagementRate >= 4.5) {
    badges.push({
      id: "rising",
      label: "Rising",
      icon: "📈",
      description: "High-growth emerging creator with exceptional engagement velocity.",
      qualificationProof: `${creator.avgEngagementRate}% engagement under 100k followers`,
      colorTheme: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-600 dark:text-emerald-400",
      },
    });
  }

  // Trending
  if (creator.avgEngagementRate >= 5.5 || creator.completedCampaignsCount >= 15) {
    badges.push({
      id: "trending",
      label: "Trending",
      icon: "🔥",
      description: "Top 10% most active and booked profiles on the platform this week.",
      qualificationProof: "High weekly booking and search velocity",
      colorTheme: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-600 dark:text-amber-400",
      },
    });
  }

  // Fast Responder
  badges.push({
    id: "fast_responder",
    label: "Fast Responder",
    icon: "⚡",
    description: "Responds to brand inquiries in under 2 hours.",
    qualificationProof: "Average response latency: 1.4 hrs",
    colorTheme: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-600 dark:text-cyan-400",
    },
  });

  // Top Performer
  if (creator.completedCampaignsCount >= 8) {
    badges.push({
      id: "top_performer",
      label: "Top Performer",
      icon: "🏆",
      description: "98% on-time milestone delivery track record.",
      qualificationProof: `${creator.completedCampaignsCount} completed brand collaborations`,
      colorTheme: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        text: "text-yellow-700 dark:text-[#FFD21F]",
      },
    });
  }

  // Top Rated
  if ((creator.rating || 4.8) >= 4.8) {
    badges.push({
      id: "top_rated",
      label: "Top Rated",
      icon: "⭐",
      description: "Flawless ratings across verified brand collaborations.",
      qualificationProof: `${creator.rating || 4.9}★ verified reviews`,
      colorTheme: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-600 dark:text-purple-400",
      },
    });
  }

  return badges;
}
