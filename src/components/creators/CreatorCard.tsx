import React from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { CheckCircle2, Star } from "lucide-react";

export function CreatorCard({ creator }: { creator: CreatorProfile }) {
  return (
    <div className="group rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] p-6 shadow-xs hover:shadow-editorial transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-[#111111] relative overflow-hidden">
      <div>
        {/* Top Info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#E7E7E4] bg-[#FAFAF8] shrink-0 shadow-xs">
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
                <h3 className="font-bold text-base text-[#111111] group-hover:text-[#111111] transition-colors font-display">
                  {creator.fullName}
                </h3>
                {creator.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0" />
                )}
              </div>
              <p className="text-xs text-[#6B6B6B] font-mono">@{creator.handle}</p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
            {creator.primaryCategory}
          </span>
        </div>

        {/* Tagline & Bio */}
        <p className="text-xs text-[#111111] font-semibold line-clamp-1 mb-1 font-sans">
          {creator.headline}
        </p>
        <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed mb-3 font-sans font-medium">
          {creator.bio}
        </p>

        {/* Social Platforms Row */}
        {creator.socialAccounts && creator.socialAccounts.length > 0 && (
          <div className="flex items-center gap-2 mb-3.5 pt-1">
            {creator.socialAccounts.map((sa) => (
              <span
                key={sa.id}
                title={`${sa.platform.toUpperCase()}: ${formatNumber(sa.followers)} followers`}
                className="p-1.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] transition-colors"
              >
                <SocialIcon platform={sa.platform} size={13} colored />
              </span>
            ))}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-center mb-4 font-mono">
          <div>
            <p className="text-[10px] text-[#6B6B6B] uppercase font-semibold">Reach</p>
            <p className="text-xs font-extrabold text-[#111111]">
              {formatNumber(creator.totalFollowers)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#6B6B6B] uppercase font-semibold">Engagement</p>
            <p className="text-xs font-extrabold text-[#111111] flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
              {creator.avgEngagementRate}%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#6B6B6B] uppercase font-semibold">Rating</p>
            <p className="text-xs font-extrabold text-[#111111] flex items-center justify-center gap-0.5">
              <Star className="w-3 h-3 fill-[#111111] text-[#111111]" />
              {creator.rating}
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#E7E7E4] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#6B6B6B] uppercase block font-mono">Starting From</span>
          <span className="text-sm font-extrabold text-[#111111] font-mono">
            {formatCurrency(creator.startingPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/creators/${creator.id}`}>
            <Button variant="secondary" size="sm" className="rounded-[9px]">
              Media Kit
            </Button>
          </Link>
          <Link href="/app/brand/campaigns/create">
            <Button variant="primary" size="sm" className="rounded-[9px]">
              Invite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
