"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import {
  CheckCircle2,
  Star,
  ArrowRight,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

export default function CreatorDetailPage() {
  const params = useParams();
  const creatorId = (params?.id as string) || "creator-1";
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await creatorService.getCreatorById(creatorId);
      setCreator(data || null);
      setLoading(false);
    };
    if (creatorId) {
      fetch();
    }
  }, [creatorId]);

  if (loading) {
    return (
      <div className="py-32 text-center bg-[#FAFAF8] text-[#111111] min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-[#111111] border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#FAFAF8] text-[#111111] min-h-screen">
        <h2 className="text-2xl font-bold text-[#111111] font-display">Creator profile not found</h2>
        <Link href="/creators">
          <Button variant="secondary" size="md" className="rounded-[9px]">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAF8] text-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Profile Master Card */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-[#E7E7E4] bg-[#FAFAF8] shrink-0 shadow-xs">
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
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
                    {creator.fullName}
                  </h1>
                  {creator.verified && (
                    <CheckCircle2 className="w-6 h-6 text-[#111111] shrink-0" />
                  )}
                  <span className="px-2.5 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-xs font-bold">
                    {creator.primaryCategory}
                  </span>
                </div>

                <p className="text-sm font-mono text-[#6B6B6B]">
                  @{creator.handle} • {creator.location}
                </p>

                <p className="text-base text-[#111111] font-semibold max-w-2xl pt-1 font-sans">
                  {creator.headline}
                </p>

                <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed font-sans font-medium">
                  {creator.bio}
                </p>
              </div>
            </div>

            {/* CTA Box */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link href="/app/brand/campaigns/create" className="w-full">
                <Button variant="primary" size="lg" className="w-full rounded-[9px]" rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}>
                  Invite to Campaign
                </Button>
              </Link>
              <Link href="/app/messages" className="w-full">
                <Button variant="secondary" size="md" className="w-full rounded-[9px]" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Direct Message
                </Button>
              </Link>
            </div>
          </div>

          {/* Core Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-center font-mono">
            <div>
              <p className="text-xs text-[#6B6B6B] uppercase font-semibold">Total Audience</p>
              <p className="text-2xl font-extrabold text-[#111111] mt-1">
                {formatNumber(creator.totalFollowers || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] uppercase font-semibold">Engagement</p>
              <p className="text-2xl font-extrabold text-[#111111] mt-1 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
                {creator.avgEngagementRate}%
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] uppercase font-semibold">Creator Rating</p>
              <p className="text-2xl font-extrabold text-[#111111] mt-1 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-[#111111] text-[#111111]" />
                {creator.rating}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] uppercase font-semibold">Completed Gigs</p>
              <p className="text-2xl font-extrabold text-[#111111] mt-1">
                {creator.completedCampaignsCount || 0}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Rate Cards & Audience Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Rate Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#111111] font-display">Standard Rate Cards &amp; Formats</h2>
            <div className="space-y-4">
              {(creator.rateCards || []).map((rc) => (
                <div
                  key={rc.id}
                  className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#111111] uppercase">
                        {rc.deliverableType?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#111111] font-display">{rc.title}</h3>
                    <p className="text-xs text-[#6B6B6B] font-sans font-medium">{rc.description}</p>
                    <p className="text-[11px] text-[#6B6B6B] font-mono pt-1">
                      Turnaround: {rc.turnaroundDays} Days • Includes {rc.revisionsIncluded} Revision Rounds
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-xl font-extrabold text-[#111111] font-mono">
                      {formatCurrency(rc.basePrice)}
                    </span>
                    <Link href="/app/brand/campaigns/create">
                      <Button variant="secondary" size="sm" className="rounded-[9px]">
                        Book Format
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demographics & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#111111] font-display">Audience Geography &amp; Age</h2>
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
              {/* Countries */}
              <div>
                <h4 className="text-xs font-bold uppercase text-[#6B6B6B] font-mono mb-3">
                  Top Geographies
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  {(creator.audience?.topCountries || []).map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-[#6B6B6B]">
                      <span className="font-sans font-medium text-[#111111]">{c.country}</span>
                      <span className="font-bold text-[#111111]">{c.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div className="pt-4 border-t border-[#E7E7E4]">
                <h4 className="text-xs font-bold uppercase text-[#6B6B6B] font-mono mb-3">
                  Age Distribution
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  {(creator.audience?.ageDistribution || []).map((a, i) => (
                    <div key={i} className="flex justify-between items-center text-[#6B6B6B]">
                      <span className="font-sans font-medium text-[#111111]">{a.range} years</span>
                      <span className="font-bold text-[#111111]">{a.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Social Channels */}
              {creator.socialAccounts && creator.socialAccounts.length > 0 && (
                <div className="pt-4 border-t border-[#E7E7E4]">
                  <h4 className="text-xs font-bold uppercase text-[#6B6B6B] font-mono mb-3">
                    Connected Channels
                  </h4>
                  <div className="space-y-2.5">
                    {creator.socialAccounts.map((sa) => (
                      <a
                        key={sa.id}
                        href={sa.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] transition-colors flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs group-hover:scale-105 transition-transform">
                            <SocialIcon platform={sa.platform} size={15} colored />
                          </div>
                          <div>
                            <span className="font-bold text-[#111111] capitalize flex items-center gap-1 font-display">
                              {sa.platform}
                              <ExternalLink className="w-3 h-3 text-[#6B6B6B] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-[10px] text-[#6B6B6B] font-mono">@{sa.handle}</span>
                          </div>
                        </div>
                        <div className="text-right font-mono text-[11px]">
                          <span className="font-extrabold text-[#111111] block">{formatNumber(sa.followers)}</span>
                          <span className="text-[#111111] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                            {sa.engagementRate}% ER
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
