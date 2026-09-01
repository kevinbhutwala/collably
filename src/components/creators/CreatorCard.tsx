import React from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function CreatorCard({ creator }: { creator: CreatorProfile }) {
  return (
    <div className="group rounded-3xl bg-[#101018] border border-white/10 hover:border-[#FFD21F]/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-white relative overflow-hidden select-none">
      <div>
        {/* Top Info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/15 bg-white/5 shrink-0 shadow-xs">
              <SafeImage
                src={creator.avatarUrl}
                alt={creator.fullName}
                fallbackType="creator"
                fallbackName={creator.fullName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-white group-hover:text-[#FFD21F] transition-colors font-display">
                  {creator.fullName}
                </h3>
                {creator.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#FFD21F] shrink-0" />
                )}
              </div>
              <p className="text-xs text-white/50 font-mono">@{creator.handle}</p>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/80 font-mono text-[10px] font-bold uppercase tracking-wider">
            {creator.primaryCategory}
          </span>
        </div>

        {/* Tagline & Bio */}
        <p className="text-xs text-white/90 font-semibold line-clamp-1 mb-1 font-sans">
          {creator.headline}
        </p>
        <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-3 font-sans font-normal">
          {creator.bio}
        </p>

        {/* Social Platforms Row */}
        {creator.socialAccounts && creator.socialAccounts.length > 0 && (
          <div className="flex items-center gap-2 mb-3.5 pt-1">
            {creator.socialAccounts.map((sa) => (
              <span
                key={sa.id}
                title={`${sa.platform.toUpperCase()}: ${formatNumber(sa.followers)} followers`}
                className="p-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/60 hover:text-white transition-colors"
              >
                <SocialIcon platform={sa.platform} className="w-3.5 h-3.5" />
              </span>
            ))}
          </div>
        )}

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 font-mono text-xs">
          <div>
            <span className="text-[10px] text-white/40 uppercase font-bold block">Followers</span>
            <span className="font-extrabold text-white text-sm numeric-tabular">
              {formatNumber(creator.totalFollowers)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-white/40 uppercase font-bold block">Engagement</span>
            <span className="font-extrabold text-[#FFD21F] text-sm numeric-tabular">
              {creator.avgEngagementRate}% ER
            </span>
          </div>
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="mt-4 pt-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-white/40 uppercase font-mono font-bold block">Starting at</span>
          <span className="text-sm font-extrabold text-white font-mono numeric-tabular">
            {formatCurrency(creator.startingPrice)}
          </span>
        </div>

        <Link href={`/creators/${creator.id}`}>
          <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#FFD21F] hover:to-[#FFC700] hover:text-[#0A0A0E] text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-white/15">
            <span>Media Kit</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
    </div>
  );
}
