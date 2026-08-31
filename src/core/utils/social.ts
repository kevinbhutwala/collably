import { SocialAccount, PlatformType, CreatorTier } from "@/core/types";

export function formatPlatformUrl(platform: PlatformType, handle: string): string {
  const clean = handle.trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?/, "");
  
  switch (platform) {
    case "youtube":
      if (clean.startsWith("youtube.com/")) return `https://${clean}`;
      return `https://youtube.com/@${clean}`;
    case "instagram":
      if (clean.startsWith("instagram.com/")) return `https://${clean}`;
      return `https://instagram.com/${clean}`;
    case "tiktok":
      if (clean.startsWith("tiktok.com/")) return `https://${clean}`;
      return `https://tiktok.com/@${clean}`;
    case "x":
      if (clean.startsWith("x.com/") || clean.startsWith("twitter.com/")) return `https://${clean}`;
      return `https://x.com/${clean}`;
    case "linkedin":
      if (clean.startsWith("linkedin.com/")) return `https://${clean}`;
      return `https://linkedin.com/in/${clean}`;
    case "threads":
      if (clean.startsWith("threads.net/")) return `https://${clean}`;
      return `https://threads.net/@${clean}`;
    default:
      return `https://${clean}`;
  }
}

export function cleanPlatformHandle(handle: string): string {
  return handle
    .trim()
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?(youtube\.com\/(@)?|instagram\.com\/|tiktok\.com\/(@)?|x\.com\/|twitter\.com\/|linkedin\.com\/in\/|threads\.net\/(@)?)/, "")
    .replace(/\/$/, "");
}

export function calculateTotalFollowers(socialAccounts: SocialAccount[]): number {
  if (!socialAccounts || socialAccounts.length === 0) return 0;
  return socialAccounts.reduce((sum, acc) => sum + (acc.followers || 0), 0);
}

export function calculateAvgEngagementRate(socialAccounts: SocialAccount[]): number {
  if (!socialAccounts || socialAccounts.length === 0) return 4.5;
  const validRates = socialAccounts.filter((a) => (a.engagementRate || 0) > 0);
  if (validRates.length === 0) return 4.5;
  const sum = validRates.reduce((acc, curr) => acc + curr.engagementRate, 0);
  return parseFloat((sum / validRates.length).toFixed(1));
}

export function getCreatorTier(totalFollowers: number): CreatorTier {
  if (totalFollowers >= 1000000) return "Elite";
  if (totalFollowers >= 500000) return "Macro";
  if (totalFollowers >= 100000) return "Mid-Tier";
  if (totalFollowers >= 50000) return "Rising";
  if (totalFollowers >= 10000) return "Micro";
  return "Nano";
}

export function buildSocialAccountsFromInput(params: {
  youtubeHandle?: string;
  youtubeSubscribers?: number;
  instagramHandle?: string;
  instagramFollowers?: number;
  tiktokHandle?: string;
  tiktokFollowers?: number;
  xHandle?: string;
  xFollowers?: number;
  linkedinHandle?: string;
  linkedinFollowers?: number;
}): SocialAccount[] {
  const accounts: SocialAccount[] = [];
  const now = Date.now();

  if (params.youtubeHandle && params.youtubeHandle.trim()) {
    const handle = cleanPlatformHandle(params.youtubeHandle);
    const subs = params.youtubeSubscribers || 25000;
    accounts.push({
      id: `sa-${now}-yt`,
      platform: "youtube",
      handle,
      url: formatPlatformUrl("youtube", handle),
      followers: subs,
      engagementRate: 5.8,
      avgViews: Math.round(subs * 0.35),
      verifiedBadge: subs >= 100000,
    });
  }

  if (params.instagramHandle && params.instagramHandle.trim()) {
    const handle = cleanPlatformHandle(params.instagramHandle);
    const followers = params.instagramFollowers || 20000;
    accounts.push({
      id: `sa-${now}-ig`,
      platform: "instagram",
      handle,
      url: formatPlatformUrl("instagram", handle),
      followers,
      engagementRate: 4.6,
      avgViews: Math.round(followers * 0.25),
      verifiedBadge: followers >= 50000,
    });
  }

  if (params.tiktokHandle && params.tiktokHandle.trim()) {
    const handle = cleanPlatformHandle(params.tiktokHandle);
    const followers = params.tiktokFollowers || 35000;
    accounts.push({
      id: `sa-${now}-tt`,
      platform: "tiktok",
      handle,
      url: formatPlatformUrl("tiktok", handle),
      followers,
      engagementRate: 7.2,
      avgViews: Math.round(followers * 0.8),
      verifiedBadge: followers >= 100000,
    });
  }

  if (params.xHandle && params.xHandle.trim()) {
    const handle = cleanPlatformHandle(params.xHandle);
    const followers = params.xFollowers || 15000;
    accounts.push({
      id: `sa-${now}-x`,
      platform: "x",
      handle,
      url: formatPlatformUrl("x", handle),
      followers,
      engagementRate: 3.8,
      avgViews: Math.round(followers * 0.5),
      verifiedBadge: followers >= 25000,
    });
  }

  if (params.linkedinHandle && params.linkedinHandle.trim()) {
    const handle = cleanPlatformHandle(params.linkedinHandle);
    const followers = params.linkedinFollowers || 8000;
    accounts.push({
      id: `sa-${now}-li`,
      platform: "linkedin",
      handle,
      url: formatPlatformUrl("linkedin", handle),
      followers,
      engagementRate: 4.2,
      avgViews: Math.round(followers * 0.3),
      verifiedBadge: false,
    });
  }

  return accounts;
}
