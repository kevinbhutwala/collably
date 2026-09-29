"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { calculateProfileCompleteness } from "@/core/utils/scoring";
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Lock,
  ShieldCheck,
  Video,
} from "lucide-react";

export function ProfileCompletionBanner({ creator: customCreator }: { creator?: any } = {}) {
  const { role, currentCreator } = useAuthStore();

  if (role !== "creator") return null;

  const creator = customCreator || currentCreator || {
    id: "temp",
    userId: "temp",
    fullName: "",
    handle: "",
    headline: "",
    bio: "",
    avatarUrl: "",
    coverImageUrl: "",
    location: "",
    languages: [],
    primaryCategory: "",
    secondaryCategories: [],
    verified: false,
    featured: false,
    tier: "Rising",
    rating: 5.0,
    completedCampaignsCount: 0,
    totalFollowers: 0,
    avgEngagementRate: 0,
    startingPrice: 0,
    availableForHire: true,
    socialAccounts: [],
    rateCards: [],
    portfolio: [],
    audience: { topCountries: [], ageDistribution: [], genderSplit: [], interests: [] },
  };

  const hasBio = Boolean(creator.bio && creator.bio.trim().length > 10);
  const hasHeadline = Boolean(creator.headline && creator.headline.trim().length > 3);
  const hasAvatar = Boolean(creator.avatarUrl && creator.avatarUrl.trim().length > 0);
  const hasRates = Boolean(creator.startingPrice && creator.startingPrice > 0);
  const hasSocials = Boolean(creator.socialAccounts && creator.socialAccounts.length > 0);
  const unverifiedSocials = (creator.socialAccounts || []).filter(
    (s: any) => !s.verifiedBadge && s.verificationStatus !== "verified" && !s.verifiedVia
  );
  const allSocialsVerified = hasSocials && unverifiedSocials.length === 0;

  const checklist = [
    {
      id: "account",
      label: "Account Created",
      done: true,
      href: "/app/profile",
    },
    {
      id: "bio",
      label: "Headline & Bio",
      done: hasBio && hasHeadline,
      href: "/app/profile",
    },
    {
      id: "rates",
      label: "Starting Rate",
      done: hasRates,
      href: "/app/profile",
    },
    {
      id: "socials",
      label: "Connect Channels",
      done: hasSocials,
      href: "/app/profile",
    },
    {
      id: "verification",
      label:
        unverifiedSocials.length > 0
          ? `Verify Channels (${unverifiedSocials.length} Unverified)`
          : "Channel Ownership Verified",
      done: allSocialsVerified,
      href: "/app/profile",
    },
  ];

  const completedCount = checklist.filter((item) => item.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);
  const isConfirmed = progressPercent === 100 && allSocialsVerified;

  // If 100% complete and all socials verified, do not show banner
  if (isConfirmed) return null;

  const isBlockedByUnverified = hasSocials && !allSocialsVerified;

  return (
    <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/15 dark:via-amber-500/5 dark:to-transparent border border-amber-500/30 dark:border-amber-500/25 p-5 sm:p-6 shadow-sm relative overflow-hidden text-[#0A0A0E] dark:text-white transition-all">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Left Side: Header & Progress */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>
                {isBlockedByUnverified
                  ? "Profile Unconfirmed • Channels Unverified"
                  : "Profile Incomplete • Applications Locked"}
              </span>
            </span>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
              {progressPercent}% Complete
            </span>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0A0A0E] dark:text-white tracking-tight font-display flex items-center gap-2">
              <span>
                {isBlockedByUnverified
                  ? "Verify your connected social channels to confirm your profile"
                  : "Complete your creator profile to unlock brand deals"}
              </span>
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            </h2>
            <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-1 font-sans">
              {isBlockedByUnverified
                ? `You have connected social channels (${unverifiedSocials.map((s: any) => s.platform).join(", ")}) that are not verified. Until and unless all added channels are verified, your profile cannot be confirmed and campaign applications remain locked.`
                : "Brands review your verified channel statistics, rates, and bio before approving collaborations. Finish your profile setup to start applying."}
            </p>
          </div>

          {/* Checklist Items */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {checklist.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all border ${
                  item.done
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                    : "bg-white/80 dark:bg-[#161622] border-black/10 dark:border-white/10 text-[#6A6A78] dark:text-[#A0A0B4] hover:border-[#FFD21F]/60 hover:text-[#0A0A0E] dark:hover:text-white shadow-2xs"
                }`}
              >
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Direct Action Button */}
        <div className="shrink-0 flex items-center">
          <Link href="/app/profile" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.35)] border border-black/10 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Complete Profile Now</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
