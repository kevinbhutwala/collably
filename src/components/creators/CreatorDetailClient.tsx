"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import { TrustIndicatorsBar } from "@/components/marketplace/TrustIndicatorsBar";
import { CategoryBadge, TitleIcon } from "@/components/ui/TitleIconBadge";
import { SaveToShortlistButton } from "@/components/creators/SaveToShortlistButton";
import {
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

interface CreatorDetailClientProps {
  creatorId: string;
  initialCreator?: CreatorProfile | null;
}

export function CreatorDetailClient({
  creatorId,
  initialCreator = null,
}: CreatorDetailClientProps) {
  const { format } = useGlobalCurrency();
  const [creator, setCreator] = useState<CreatorProfile | null>(initialCreator);
  const [loading, setLoading] = useState(!initialCreator);

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      try {
        const data = await creatorService.getCreatorById(creatorId);
        if (data && isMounted) {
          setCreator(data);
        }
      } catch {
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    if (creatorId) {
      fetchLatest();
    }
    return () => {
      isMounted = false;
    };
  }, [creatorId]);

  if (loading) {
    return (
      <div className="py-32 text-center bg-[#FAFAFC] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] min-h-screen flex items-center justify-center">
        <CreativeLoader
          size="lg"
          label="Loading Creator Media Kit"
          subtext="Fetching verified metrics, rate cards, and 4K showcase reels..."
        />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#FAFAFC] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] min-h-screen">
        <h2 className="text-2xl font-bold font-display text-[#0A0A0E] dark:text-white">Creator profile not found</h2>
        <Link href="/creators">
          <button className="px-6 py-2.5 rounded-full bg-white dark:bg-[#14141E] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white hover:bg-[#F5F5F9] dark:hover:bg-[#1C1C28] cursor-pointer">
            Back to Directory
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-white dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Profile Master Card */}
        <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-black/8 dark:border-white/10 bg-[#F5F5F9] dark:bg-neutral-800 shrink-0 shadow-xs">
                <SafeImage
                  src={creator.avatarUrl}
                  alt={creator.fullName}
                  fallbackType="creator"
                  fallbackName={creator.fullName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
                    {creator.fullName}
                  </h1>
                  {creator.isInstagramVerified && (
                    <span title="Verified on Instagram" className="inline-flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-[#0095F6] fill-[#0095F6] text-white shrink-0" />
                    </span>
                  )}
                  {creator.verified && (
                    <span title="AbeyCollab Verified Member" className="inline-flex items-center">
                      <CheckCircle2 className="w-6 h-6 text-[#FFD21F] shrink-0 fill-[#0A0A0E]" />
                    </span>
                  )}
                  <CategoryBadge category={creator.primaryCategory} size="sm" showIcon={true} />
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                  <a
                    href={creator.instagramUrl || `https://www.instagram.com/${(creator.handle || "").replace(/^@/, "")}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E] dark:text-white hover:text-[#FFD21F] transition-colors"
                    title="View verified Instagram profile"
                  >
                    <SocialIcon platform="instagram" colored={true} size={14} />
                    <span>@{creator.handle.replace(/^@/, "")}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#0A0A0E] dark:text-white">
                    <span>{creator.countryFlag || (creator.location.includes("India") ? "🇮🇳" : creator.location.includes("United States") ? "🇺🇸" : "🇦🇪")}</span>
                    <span>{creator.location}</span>
                  </span>
                  {creator.profileSource === "instagram_public" && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                      Instagram Public Profile
                    </span>
                  )}
                </div>

                {/* Editorial Pull Quote */}
                <p className="text-xl sm:text-2xl text-[#0A0A0E] dark:text-[#E0E0EC] font-serif italic max-w-2xl pt-1 leading-snug">
                  &ldquo;{creator.headline}&rdquo;
                </p>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7A8A] dark:text-[#A0A0B0] font-bold block">
                    Public Instagram Bio
                  </span>
                  <p className="text-sm text-[#5A5A68] dark:text-[#A0A0B0] max-w-2xl leading-relaxed font-sans font-normal">
                    {creator.bio}
                  </p>
                </div>

                {/* Sourcing & Claiming Notice */}
                {creator.profileSource === "instagram_public" && (
                  <div className="p-3.5 rounded-2xl bg-[#F8F8FC] dark:bg-white/5 border border-black/8 dark:border-white/10 max-w-2xl space-y-1 font-sans">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0A0A0E] dark:text-white">
                      <span className="flex items-center gap-1.5">
                        <SocialIcon platform="instagram" colored={true} size={13} />
                        <span>Public Discovery Profile (Unclaimed)</span>
                      </span>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        Instagram Sourced
                      </span>
                    </div>
                    <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B0] leading-relaxed">
                      Public profile metadata is indexed from Instagram. Are you @{creator.handle.replace(/^@/, "")}?{" "}
                      <Link href="/creator/register" className="text-[#0A0A0E] dark:text-[#FFD21F] font-bold underline hover:opacity-80">
                        Claim this profile
                      </Link>{" "}
                      to set direct rate cards and connect your verified account.
                    </p>
                  </div>
                )}

                {/* Trust Indicators Bar */}
                <div className="pt-2">
                  <TrustIndicatorsBar type="creator" id={creator.id} />
                </div>

                {/* Social Channel Links */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {(creator.socialAccounts || []).map((sa) => {
                    const isVerified = sa.verifiedBadge || sa.verificationStatus === "verified";
                    return (
                      <a
                        key={sa.id}
                        href={sa.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F8FC] dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white transition-all hover:scale-102 hover:shadow-xs group text-xs font-mono"
                        title={`${sa.platform.toUpperCase()}: @${sa.handle} (${formatNumber(sa.followers)} followers)${isVerified ? " • Verified Channel" : ""}`}
                      >
                        <SocialIcon platform={sa.platform} className="w-3.5 h-3.5 shrink-0 text-[#5A5A68] dark:text-[#8E8EA4] group-hover:text-[#0A0A0E] dark:group-hover:text-white" />
                        <span className="font-bold text-xs">@{sa.handle}</span>
                        {isVerified && (
                          <span
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[10px] font-bold"
                            title="Verified Channel Ownership"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                            <span>Verified</span>
                          </span>
                        )}
                        <ExternalLink className="w-2.5 h-2.5 text-[#8A8A9A] dark:text-[#7A7A8A] group-hover:text-[#0A0A0E] dark:group-hover:text-white transition-colors shrink-0 opacity-70 group-hover:opacity-100" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Pricing & Contact CTA */}
            <div className="p-6 rounded-3xl bg-[#F8F8FC] dark:bg-[#161622] border border-black/8 dark:border-white/10 font-mono space-y-4 shrink-0 w-full md:w-72">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4]">Base Sponsorship</span>
                <span className="text-2xl font-black text-[#0A0A0E] dark:text-white">
                  {format(creator.startingPrice, (creator as any).currency || "USD")}
                </span>
              </div>

              <div className="space-y-2 text-xs border-y border-black/8 dark:border-white/10 py-3">
                <div className="flex justify-between text-[#6A6A78] dark:text-[#8E8EA4]">
                  <span>Status</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Available for Hire</span>
                </div>
                <div className="flex justify-between text-[#6A6A78] dark:text-[#8E8EA4]">
                  <span>Avg Turnaround</span>
                  <span className="font-bold text-[#0A0A0E] dark:text-white">4 - 7 Business Days</span>
                </div>
                <div className="flex justify-between text-[#6A6A78] dark:text-[#8E8EA4]">
                  <span>Past Campaigns</span>
                  <span className="font-bold text-[#0A0A0E] dark:text-white">{creator.completedCampaignsCount} Completed</span>
                </div>
              </div>

              <Link href="/app/brand/campaigns/create" className="block">
                <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 cursor-pointer">
                  <span>Send Campaign Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>

              <Link
                href={`/app/messages?recipientId=${creator.userId || creator.id}&recipientName=${encodeURIComponent(creator.fullName)}`}
                className="block"
              >
                <button className="w-full py-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-[#F0F0F4] dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-white" />
                  <span>Direct Message</span>
                </button>
              </Link>

              <SaveToShortlistButton creator={creator} />
            </div>
          </div>
        </div>

        {/* 2-Column: Rate Card & Portfolio Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Rate Card & Deliverables */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-bold text-[#0A0A0E] dark:text-white font-display">
                    Deliverables &amp; Rate Benchmarks
                  </h2>
                  <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans mt-0.5">
                    Benchmark estimates based on verified reach. Final quotes are confirmed upon campaign brief review.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#8A6500] dark:text-[#FFD21F] text-[10px] font-mono font-bold">
                  {creator.isSignedTalent ? "Verified Rate Card" : "Market Benchmark"}
                </span>
              </div>
              <div className="space-y-4">
                {(creator.rateCards || []).map((rate) => (
                  <div
                    key={rate.id}
                    className="p-5 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/5 dark:border-white/5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 border border-black/8 dark:border-white/10 flex items-center justify-center text-[#A37F00] dark:text-[#FFD21F] shrink-0 shadow-2xs">
                        <TitleIcon title={rate.title || rate.deliverableType} category={creator.primaryCategory} className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="font-bold text-sm text-[#0A0A0E] dark:text-white font-sans">{rate.title || rate.deliverableType}</h3>
                        <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B0] mt-0.5">{rate.description}</p>
                        <span className="text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4] block mt-1">
                          Estimated Turnaround: {rate.turnaroundDays} days • Max {rate.revisionsIncluded || 2} revisions
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-extrabold text-[#0A0A0E] dark:text-white font-mono block">
                        <span className="text-xs font-normal text-[#7A7A8A] mr-1">Est.</span>
                        {format(rate.basePrice || (rate as any).price || 500, (rate as any).currency || (creator as any).currency || "USD")}
                      </span>
                      <span className="text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">per deliverable</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Audited Demographics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#0A0A0E] dark:text-white font-display">Audience Telemetry &amp; Geo</h2>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold block mb-2">Top Geographies</span>
                  <div className="space-y-2">
                    {(creator.audience?.topCountries || []).map((geo) => (
                      <div key={geo.country} className="space-y-1">
                        <div className="flex justify-between text-[#0A0A0E] dark:text-white">
                          <span>{geo.country}</span>
                          <span className="font-bold">{geo.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-[#FFD21F] rounded-full"
                            style={{ width: `${geo.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/8 dark:border-white/10">
                  <span className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold block mb-2">Gender Breakdown</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(creator.audience?.genderSplit || []).map((g) => (
                      <div key={g.gender} className="p-3 rounded-xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/5 dark:border-white/5 text-center">
                        <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase block">{g.gender}</span>
                        <span className="text-sm font-black text-[#0A0A0E] dark:text-white">{g.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance & Rights Attribution Footer */}
        <div className="p-6 rounded-3xl bg-[#F8F8FC] dark:bg-[#12121A] border border-black/6 dark:border-white/10 text-xs text-[#6A6A78] dark:text-[#8E8EA4] space-y-2 font-sans">
          <div className="flex items-center gap-2 font-mono font-bold text-[#0A0A0E] dark:text-white text-xs">
            <SocialIcon platform="instagram" colored={true} size={15} />
            <span>Public Instagram Data Attribution &amp; Rights Notice</span>
          </div>
          <p className="leading-relaxed">
            All Instagram usernames (@{(creator.handle || "").replace(/^@/, "")}), public profile photographs, follower statistics, and bios are sourced from publicly available Instagram accounts for identification and creator discovery purposes. All trademarks, photos, and creative works remain the property of their respective creators and are not represented as AbeyCollab-owned assets. Sourced creators have not verified or claimed an AbeyCollab partner agreement unless explicitly marked with the AbeyCollab Verified badge.
          </p>
        </div>
      </div>
    </div>
  );
}
