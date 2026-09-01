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
    <div className="group rounded-3xl bg-[#120c16] border border-white/10 hover:border-[hsl(327,100%,50%)]/40 p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-white relative overflow-hidden">
      <div>
        {/* Top Info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.05] shrink-0 shadow-sm">
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
                <h3 className="font-bold text-base text-white group-hover:text-[hsl(327,100%,55%)] transition-colors font-display">
                  {creator.fullName}
                </h3>
                {creator.verified && (
                  <CheckCircle2 className="w-4 h-4 fill-sky-400 text-[#0a070a] shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">@{creator.handle}</p>
            </div>
          </div>

          <Badge variant="glow" size="sm">
            {creator.primaryCategory}
          </Badge>
        </div>

        {/* Tagline & Bio */}
        <p className="text-xs text-slate-200 font-semibold line-clamp-1 mb-1 font-sans">
          {creator.headline}
        </p>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3 font-sans">
          {creator.bio}
        </p>

        {/* Social Platforms Row */}
        {creator.socialAccounts && creator.socialAccounts.length > 0 && (
          <div className="flex items-center gap-2 mb-3.5 pt-1">
            {creator.socialAccounts.map((sa) => (
              <span
                key={sa.id}
                title={`${sa.platform.toUpperCase()}: ${formatNumber(sa.followers)} followers`}
                className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <SocialIcon platform={sa.platform} size={13} colored />
              </span>
            ))}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center mb-4 font-mono">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Reach</p>
            <p className="text-xs font-extrabold text-white">
              {formatNumber(creator.totalFollowers)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Engagement</p>
            <p className="text-xs font-extrabold text-emerald-400">
              {creator.avgEngagementRate}%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Rating</p>
            <p className="text-xs font-extrabold text-amber-400 flex items-center justify-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {creator.rating}
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase block font-mono">Starting From</span>
          <span className="text-sm font-bold text-white font-mono">
            {formatCurrency(creator.startingPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/creators/${creator.id}`}>
            <Button variant="secondary" size="sm" className="rounded-full">
              Media Kit
            </Button>
          </Link>
          <Link href="/app/brand/campaigns/create">
            <Button variant="primary" size="sm" className="rounded-full">
              Invite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
