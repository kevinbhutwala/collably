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
  Sparkles,
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
      <div className="py-32 text-center bg-white min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="py-32 text-center space-y-4 bg-white min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900">Creator profile not found</h2>
        <Link href="/creators">
          <Button variant="secondary" size="md">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Profile Master Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-card space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-slate-200 bg-slate-100 shrink-0 shadow-md">
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
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {creator.fullName}
                  </h1>
                  {creator.verified && (
                    <CheckCircle2 className="w-6 h-6 fill-sky-500 text-white shrink-0" />
                  )}
                  <Badge variant="glow" size="md">
                    {creator.primaryCategory}
                  </Badge>
                </div>

                <p className="text-sm font-mono text-slate-500">
                  @{creator.handle} • {creator.location}
                </p>

                <p className="text-base text-slate-800 font-semibold max-w-2xl pt-1">
                  {creator.headline}
                </p>

                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {creator.bio}
                </p>
              </div>
            </div>

            {/* CTA Box */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link href="/app/brand/campaigns/create" className="w-full">
                <Button variant="accent" size="lg" className="w-full" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Invite to Campaign
                </Button>
              </Link>
              <Link href="/app/messages" className="w-full">
                <Button variant="outline" size="md" className="w-full" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Direct Message
                </Button>
              </Link>
            </div>
          </div>

          {/* Core Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-center font-mono">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Total Audience</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {formatNumber(creator.totalFollowers || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Engagement</p>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                {creator.avgEngagementRate}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Creator Rating</p>
              <p className="text-2xl font-extrabold text-amber-600 mt-1 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {creator.rating}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Completed Gigs</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {creator.completedCampaignsCount || 0}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Rate Cards & Audience Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Rate Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Standard Rate Cards & Formats</h2>
            <div className="space-y-4">
              {(creator.rateCards || []).map((rc) => (
                <div
                  key={rc.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-brand-accent uppercase">
                        {rc.deliverableType?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">{rc.title}</h3>
                    <p className="text-xs text-slate-600">{rc.description}</p>
                    <p className="text-[11px] text-slate-500 font-mono pt-1">
                      Turnaround: {rc.turnaroundDays} Days • Includes {rc.revisionsIncluded} Revision Rounds
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-xl font-extrabold text-emerald-600 font-mono">
                      {formatCurrency(rc.basePrice)}
                    </span>
                    <Link href="/app/brand/campaigns/create">
                      <Button variant="secondary" size="sm">
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
            <h2 className="text-2xl font-extrabold text-slate-900">Audience Geography & Age</h2>
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
              {/* Countries */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 font-mono mb-3">
                  Top Geographies
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  {(creator.audience?.topCountries || []).map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-800">
                      <span className="font-sans font-medium">{c.country}</span>
                      <span className="font-bold text-emerald-600">{c.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase text-slate-500 font-mono mb-3">
                  Age Distribution
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  {(creator.audience?.ageDistribution || []).map((a, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-800">
                      <span className="font-sans font-medium">{a.range} years</span>
                      <span className="font-bold text-sky-600">{a.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Social Channels */}
              {creator.socialAccounts && creator.socialAccounts.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase text-slate-500 font-mono mb-3">
                    Connected Channels
                  </h4>
                  <div className="space-y-2.5">
                    {creator.socialAccounts.map((sa) => (
                      <a
                        key={sa.id}
                        href={sa.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-xs group-hover:scale-105 transition-transform">
                            <SocialIcon platform={sa.platform} size={15} colored />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 capitalize flex items-center gap-1">
                              {sa.platform}
                              <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">@{sa.handle}</span>
                          </div>
                        </div>
                        <div className="text-right font-mono text-[11px]">
                          <span className="font-extrabold text-slate-900 block">{formatNumber(sa.followers)}</span>
                          <span className="text-emerald-600 font-semibold">{sa.engagementRate}% ER</span>
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
