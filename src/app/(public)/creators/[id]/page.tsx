"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import {
  CheckCircle2,
  Star,
  ArrowRight,
  MessageSquare,
  ExternalLink,
  Sparkles,
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
      <div className="py-32 text-center bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-[#FFD21F] border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
        <h2 className="text-2xl font-bold font-display">Creator profile not found</h2>
        <Link href="/creators">
          <button className="px-6 py-2.5 rounded-full bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] hover:bg-[#F5F5F9]">
            Back to Directory
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Profile Master Card */}
        <div className="rounded-3xl bg-white border border-black/8 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-black/8 bg-[#F5F5F9] shrink-0 shadow-xs">
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
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
                    {creator.fullName}
                  </h1>
                  {creator.verified && (
                    <CheckCircle2 className="w-6 h-6 text-[#FFD21F] shrink-0 fill-[#0A0A0E]" />
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] font-mono text-xs font-bold uppercase tracking-wider">
                    {creator.primaryCategory}
                  </span>
                </div>

                <p className="text-sm font-mono text-[#6A6A78]">
                  @{creator.handle} • {creator.location}
                </p>

                {/* Editorial Pull Quote */}
                <p className="text-xl sm:text-2xl text-[#0A0A0E] font-serif italic max-w-2xl pt-1 leading-snug">
                  &ldquo;{creator.headline}&rdquo;
                </p>

                <p className="text-sm text-[#5A5A68] max-w-2xl leading-relaxed font-sans font-normal pt-1">
                  {creator.bio}
                </p>

                {/* Social Channel Links */}
                <div className="flex items-center gap-2 pt-2">
                  {creator.socialAccounts.map((sa) => (
                    <a
                      key={sa.id}
                      href={sa.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#F8F8FC] border border-black/5 text-[#5A5A68] hover:text-[#0A0A0E] transition-all hover:scale-105"
                      title={`${sa.platform}: ${formatNumber(sa.followers)} followers`}
                    >
                      <SocialIcon platform={sa.platform} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Pricing & Contact CTA */}
            <div className="p-6 rounded-3xl bg-[#F8F8FC] border border-black/8 font-mono space-y-4 shrink-0 w-full md:w-72">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#7A7A8A]">Base Sponsorship</span>
                <span className="text-2xl font-black text-[#0A0A0E]">
                  {formatCurrency(creator.startingPrice)}
                </span>
              </div>

              <div className="space-y-2 text-xs border-y border-black/8 py-3">
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Status</span>
                  <span className="font-bold text-emerald-700">Available for Hire</span>
                </div>
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Avg Turnaround</span>
                  <span className="font-bold text-[#0A0A0E]">4 - 7 Business Days</span>
                </div>
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Past Campaigns</span>
                  <span className="font-bold text-[#0A0A0E]">{creator.completedCampaignsCount} Completed</span>
                </div>
              </div>

              <Link href="/app/brand/campaigns/create" className="block">
                <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2">
                  <span>Send Campaign Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 2-Column: Rate Card & Portfolio Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Rate Card & Deliverables */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#0A0A0E] font-display">Rate Card &amp; Sponsorship Options</h2>
              <div className="space-y-4">
                {creator.rateCards.map((rate) => (
                  <div
                    key={rate.id}
                    className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-sm text-[#0A0A0E] font-sans">{rate.title || rate.deliverableType}</h3>
                      <p className="text-xs text-[#5A5A68] mt-0.5">{rate.description}</p>
                      <span className="text-[10px] font-mono text-[#7A7A8A] block mt-1">
                        Turnaround: {rate.turnaroundDays} days • Max {rate.revisionsIncluded || 2} revisions
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-extrabold text-[#0A0A0E] font-mono block">
                        {formatCurrency(rate.basePrice || (rate as any).price || 500)}
                      </span>
                      <span className="text-[10px] font-mono text-[#7A7A8A]">per asset</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Audited Demographics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#0A0A0E] font-display">Audience Telemetry &amp; Geo</h2>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-[11px] text-[#7A7A8A] uppercase font-bold block mb-2">Top Geographies</span>
                  <div className="space-y-2">
                    {creator.audience.topCountries.map((geo) => (
                      <div key={geo.country} className="space-y-1">
                        <div className="flex justify-between text-[#0A0A0E]">
                          <span>{geo.country}</span>
                          <span className="font-bold">{geo.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-black/5 overflow-hidden">
                          <div
                            className="h-full bg-[#FFD21F] rounded-full"
                            style={{ width: `${geo.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/8">
                  <span className="text-[11px] text-[#7A7A8A] uppercase font-bold block mb-2">Gender Breakdown</span>
                  <div className="grid grid-cols-2 gap-2">
                    {creator.audience.genderSplit.map((g) => (
                      <div key={g.gender} className="p-3 rounded-xl bg-[#F8F8FC] border border-black/5 text-center">
                        <span className="text-[10px] text-[#7A7A8A] uppercase block">{g.gender}</span>
                        <span className="text-sm font-black text-[#0A0A0E]">{g.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
