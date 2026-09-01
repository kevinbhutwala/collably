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
  ArrowUpRight,
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
      <div className="py-32 text-center bg-[#0a070a] text-white min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-[hsl(327,100%,50%)] border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#0a070a] text-white min-h-screen">
        <h2 className="text-2xl font-bold text-white font-display">Creator profile not found</h2>
        <Link href="/creators">
          <Button variant="secondary" size="md" className="rounded-full">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#0a070a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Profile Master Card */}
        <div className="rounded-3xl bg-[#120c16] border border-white/10 p-8 sm:p-12 shadow-card space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-pink-500/30 bg-white/[0.05] shrink-0 shadow-md">
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
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                    {creator.fullName}
                  </h1>
                  {creator.verified && (
                    <CheckCircle2 className="w-6 h-6 fill-sky-400 text-[#0a070a] shrink-0" />
                  )}
                  <Badge variant="glow" size="md">
                    {creator.primaryCategory}
                  </Badge>
                </div>

                <p className="text-sm font-mono text-slate-400">
                  @{creator.handle} • {creator.location}
                </p>

                <p className="text-base text-pink-200 font-semibold max-w-2xl pt-1 font-sans">
                  {creator.headline}
                </p>

                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
                  {creator.bio}
                </p>
              </div>
            </div>

            {/* CTA Box */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link href="/app/brand/campaigns/create" className="w-full">
                <Button variant="primary" size="lg" className="w-full rounded-full font-display font-bold" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Invite to Campaign
                </Button>
              </Link>
              <Link href="/app/messages" className="w-full">
                <Button variant="outline" size="md" className="w-full rounded-full font-display" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Direct Message
                </Button>
              </Link>
            </div>
          </div>

          {/* Core Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-center font-mono">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Total Audience</p>
              <p className="text-2xl font-extrabold text-white mt-1">
                {formatNumber(creator.totalFollowers || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Engagement</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                {creator.avgEngagementRate}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Creator Rating</p>
              <p className="text-2xl font-extrabold text-gold mt-1 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {creator.rating}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Completed Gigs</p>
              <p className="text-2xl font-extrabold text-white mt-1">
                {creator.completedCampaignsCount || 0}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Rate Cards & Audience Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Rate Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-extrabold text-white font-display">Standard Rate Cards &amp; Formats</h2>
            <div className="space-y-4">
              {(creator.rateCards || []).map((rc) => (
                <div
                  key={rc.id}
                  className="p-6 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 transition-all shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[hsl(327,100%,55%)] uppercase">
                        {rc.deliverableType?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white font-display">{rc.title}</h3>
                    <p className="text-xs text-slate-300 font-sans">{rc.description}</p>
                    <p className="text-[11px] text-slate-400 font-mono pt-1">
                      Turnaround: {rc.turnaroundDays} Days • Includes {rc.revisionsIncluded} Revision Rounds
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">
                      {formatCurrency(rc.basePrice)}
                    </span>
                    <Link href="/app/brand/campaigns/create">
                      <Button variant="secondary" size="sm" className="rounded-full font-display">
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
            <h2 className="text-2xl font-extrabold text-white font-display">Audience Geography &amp; Age</h2>
            <div className="p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6">
              {/* Countries */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 font-mono mb-3">
                  Top Geographies
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  {(creator.audience?.topCountries || []).map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-300">
                      <span className="font-sans font-medium text-white">{c.country}</span>
                      <span className="font-bold text-emerald-400">{c.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase text-slate-400 font-mono mb-3">
                  Age Distribution
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  {(creator.audience?.ageDistribution || []).map((a, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-300">
                      <span className="font-sans font-medium text-white">{a.range} years</span>
                      <span className="font-bold text-pink-400">{a.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Social Channels */}
              {creator.socialAccounts && creator.socialAccounts.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs font-bold uppercase text-slate-400 font-mono mb-3">
                    Connected Channels
                  </h4>
                  <div className="space-y-2.5">
                    {creator.socialAccounts.map((sa) => (
                      <a
                        key={sa.id}
                        href={sa.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-white/10 border border-white/10 shadow-xs group-hover:scale-105 transition-transform">
                            <SocialIcon platform={sa.platform} size={15} colored />
                          </div>
                          <div>
                            <span className="font-bold text-white capitalize flex items-center gap-1 font-display">
                              {sa.platform}
                              <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">@{sa.handle}</span>
                          </div>
                        </div>
                        <div className="text-right font-mono text-[11px]">
                          <span className="font-extrabold text-white block">{formatNumber(sa.followers)}</span>
                          <span className="text-emerald-400 font-semibold">{sa.engagementRate}% ER</span>
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
