import React from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function CreatorCard({ creator }: { creator: CreatorProfile }) {
  return (
    <div className="group rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-[#0A0A0E] relative overflow-hidden select-none">
      <div>
        {/* Top Info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-black/10 bg-[#F5F5F9] shrink-0 shadow-xs">
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
                <h3 className="font-bold text-base text-[#0A0A0E] group-hover:text-[#A37F00] transition-colors font-display">
                  {creator.fullName}
                </h3>
                {creator.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#FFD21F] shrink-0 fill-[#0A0A0E]" />
                )}
              </div>
              <p className="text-xs text-[#7A7A8A] font-mono">@{creator.handle}</p>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-[#0A0A0E] font-mono text-[10px] font-bold uppercase tracking-wider">
            {creator.primaryCategory}
          </span>
        </div>

        {/* Tagline & Bio */}
        <p className="text-xs text-[#0A0A0E] font-bold line-clamp-1 mb-1 font-sans">
          {creator.headline}
        </p>
        <p className="text-xs text-[#5A5A68] line-clamp-2 leading-relaxed mb-3 font-sans font-normal">
          {creator.bio}
        </p>

        {/* Social Platforms Row */}
        {creator.socialAccounts && creator.socialAccounts.length > 0 && (
          <div className="flex items-center gap-2 mb-3.5 pt-1">
            {creator.socialAccounts.map((sa) => (
              <span
                key={sa.id}
                title={`${sa.platform.toUpperCase()}: ${formatNumber(sa.followers)} followers`}
                className="p-1.5 rounded-xl bg-black/5 border border-black/5 text-[#5A5A68] hover:text-[#0A0A0E] transition-colors"
              >
                <SocialIcon platform={sa.platform} className="w-3.5 h-3.5" />
              </span>
            ))}
          </div>
        )}

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-black/8 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Followers</span>
            <span className="font-extrabold text-[#0A0A0E] text-sm numeric-tabular">
              {formatNumber(creator.totalFollowers)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Engagement</span>
            <span className="font-extrabold text-[#0A0A0E] text-sm numeric-tabular">
              {creator.avgEngagementRate}% ER
            </span>
          </div>
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="mt-4 pt-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#7A7A8A] uppercase font-mono font-bold block">Starting at</span>
          <span className="text-sm font-extrabold text-[#0A0A0E] font-mono numeric-tabular">
            {formatCurrency(creator.startingPrice)}
          </span>
        </div>

        <Link href={`/creators/${creator.id}`}>
          <button className="px-4 py-2 rounded-full bg-black/5 hover:bg-gradient-to-r hover:from-[#FFD21F] hover:to-[#FFC700] hover:text-[#0A0A0E] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 border border-black/5">
            <span>Media Kit</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
    </div>
  );
}
