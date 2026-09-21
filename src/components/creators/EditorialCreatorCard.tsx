"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { CreatorQuickViewData } from "./CreatorQuickViewModal";
import {
  Star,
  CheckCircle2,
  Sparkles,
  Play,
  ArrowRight,
  Heart,
  Eye,
  Video,
  ExternalLink,
} from "lucide-react";
import { formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import { TitleIcon } from "@/components/ui/TitleIconBadge";
import { SocialIcon } from "@/components/ui/SocialIcons";

interface EditorialCreatorCardProps {
  creator: CreatorQuickViewData;
  onQuickView: (creator: CreatorQuickViewData) => void;
  onBookmarkToggle?: (creatorId: string) => void;
  isBookmarked?: boolean;
}

export function EditorialCreatorCard({
  creator,
  onQuickView,
  onBookmarkToggle,
  isBookmarked = false,
}: EditorialCreatorCardProps) {
  const { format } = useGlobalCurrency();
  const [localBookmarked, setLocalBookmarked] = useState(isBookmarked);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalBookmarked(!localBookmarked);
    if (onBookmarkToggle) {
      onBookmarkToggle(creator.id);
    }
  };

  const startingPriceDisplay =
    typeof creator.startingPrice === "number"
      ? format(creator.startingPrice, (creator as any).currency || "USD")
      : creator.startingPrice;

  const cleanHandle = (creator.handle || "").replace(/^@/, "");
  const igUrl = (creator as any).instagramUrl || `https://www.instagram.com/${cleanHandle}/`;
  const isInstagramSourced = (creator as any).profileSource === "instagram_public" || !(creator as any).isAbeyCollabVerified;

  return (
    <InteractiveTiltCard
      maxTilt={8}
      glowColor="rgba(255, 210, 31, 0.28)"
      className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] dark:hover:border-[#FFD21F] shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all p-4 flex flex-col justify-between group select-none font-sans cursor-pointer hover-lift"
    >
      <div className="space-y-4">
        {/* Layered Visual Portrait Container */}
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#0A0A0E]">
          {/* Main Primary Portrait */}
          <SafeImage
            src={creator.avatarUrl || creator.heroImage || "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800"}
            alt={creator.name}
            width={800}
            height={1000}
            className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            {creator.isSignedTalent ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1 border border-emerald-500/40 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Founding Cohort</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-black/70 dark:bg-[#14141E]/95 backdrop-blur-md text-[10px] font-mono font-bold text-white flex items-center gap-1.5 border border-white/20">
                <SocialIcon platform="instagram" colored={true} size={12} />
                <span>Benchmark</span>
              </span>
            )}

            <div className="flex items-center gap-1.5">
              {onBookmarkToggle && (
                <button
                  onClick={handleBookmark}
                  aria-label="Save Creator"
                  className={`p-1.5 rounded-full backdrop-blur-md border transition-all ${
                    localBookmarked
                      ? "bg-[#FFD21F] text-[#0A0A0E] border-[#FFD21F] shadow-sm"
                      : "bg-black/50 text-white/90 border-white/20 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${localBookmarked ? "fill-current" : ""}`} />
                </button>
              )}

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold shadow-sm flex items-center gap-1 ${
                  creator.isSignedTalent
                    ? "bg-[#FFD21F] text-[#0A0A0E]"
                    : "bg-black/60 text-white border border-white/20"
                }`}
                title={creator.isSignedTalent ? "Verified Fixed Deliverable Rate" : "Sample Market Rate Estimate"}
              >
                {!creator.isSignedTalent && <span className="text-[8px] font-normal opacity-75">Est.</span>}
                {startingPriceDisplay}
              </span>
            </div>
          </div>

          {/* Overlapping Floating Thumbnail Reel (Bottom-Right Overlap) */}
          {creator.sampleDeliverables && creator.sampleDeliverables.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(creator);
              }}
              className="absolute bottom-16 right-3 z-20 w-20 sm:w-22 aspect-square rounded-xl overflow-hidden border-2 border-white dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.35)] bg-black group-hover:border-[#FFD21F] transition-colors"
            >
              <SafeImage
                src={creator.sampleDeliverables[0].imageUrl}
                alt={creator.sampleDeliverables[0].title}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white opacity-90" />
              </div>
              <span className="absolute bottom-1 inset-x-1 text-[8px] font-mono font-bold text-white text-center truncate bg-black/70 rounded px-0.5">
                Sample Reel
              </span>
            </motion.div>
          )}

          {/* Bottom Portrait Info */}
          <div className="absolute bottom-3 inset-x-3 z-10 text-white space-y-1 max-w-[68%]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold font-display leading-tight truncate">{creator.name}</h3>
              <span title="Verified Instagram Account" className="inline-flex items-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0095F6] fill-[#0095F6] text-white" />
              </span>
            </div>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-white/80 hover:text-[#FFD21F] transition-colors"
              title={`View @${cleanHandle} on Instagram`}
            >
              <span>@{cleanHandle}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
            <div className="flex items-center gap-1.5 pt-0.5">
              <TitleIcon title={creator.niche} category={creator.category} className="w-3 h-3 text-[#FFD21F] shrink-0 drop-shadow-xs" />
              <p className="text-[11px] text-white/90 font-sans truncate">{creator.niche}</p>
            </div>
          </div>
        </div>

        {/* Tags & Telemetry */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#5A5A68] dark:text-[#8E8EA4]">
            <span className="font-bold text-[#0A0A0E] dark:text-white flex items-center gap-1">
              <span>{creator.reach}</span>
              <span className="text-[10px] font-normal text-[#7A7A8A]">IG reach</span>
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800 text-[10px]">
              {typeof creator.engagementRate === "number" ? `${creator.engagementRate}% ER` : creator.engagementRate}
            </span>
          </div>

          <div className="flex flex-wrap gap-1 font-mono text-[10px]">
            {creator.location && (
              <span className="px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold flex items-center gap-1 bg-[#F4F4F8] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-[#E0E0EC]">
                <span>{creator.location.includes("India") ? "🇮🇳" : creator.location.includes("United States") ? "🇺🇸" : "🇦🇪"}</span>
                <span className="truncate max-w-[130px]">{creator.location}</span>
              </span>
            )}
            {isInstagramSourced && (
              <span className="px-2 py-0.5 rounded-md border text-[10px] flex items-center gap-1 bg-[#F4F4F8] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#4A4A58] dark:text-[#C0C0D4]">
                <SocialIcon platform="instagram" colored={true} size={10} />
                <span>IG Sourced</span>
              </span>
            )}
            {creator.tags && creator.tags.length > 0 && (
              creator.tags.slice(0, 2).map((tag) => {
                const isSpecial =
                  tag.toLowerCase().includes("top creator") ||
                  tag.toLowerCase().includes("elite tier") ||
                  tag.toLowerCase().includes("verified creator") ||
                  tag.toLowerCase().includes("established creator");
                return (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded-md border text-[10px] flex items-center gap-1 transition-colors ${
                      isSpecial
                        ? "bg-[#FFD21F]/15 dark:bg-[#FFD21F]/20 border-[#FFD21F]/30 dark:border-[#FFD21F]/40 text-[#8A6500] dark:text-[#FFD21F] font-bold"
                        : "bg-[#F4F4F8] dark:bg-[#181824] border-black/5 dark:border-white/10 text-[#4A4A58] dark:text-[#C0C0D4]"
                    }`}
                  >
                    <TitleIcon title={tag} category={creator.category} className={`w-2.5 h-2.5 ${isSpecial ? "text-[#8A6500] dark:text-[#FFD21F]" : "text-[#A37F00] dark:text-[#FFD21F]"}`} />
                    <span>{tag}</span>
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer Action Strip */}
      <div className="pt-3 border-t border-black/6 dark:border-white/10 flex items-center justify-between text-xs gap-2">
        <button
          onClick={() => onQuickView(creator)}
          className="px-3 py-1.5 rounded-full bg-[#F4F4F8] hover:bg-[#EAEAEF] dark:bg-[#1C1C28] dark:hover:bg-[#252535] text-[#0A0A0E] dark:text-[#E0E0EC] text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3 h-3 text-[#7A7A8A]" />
          <span>Quick View</span>
        </button>

        <Link
          href={`/creators/${creator.id}`}
          className="px-3.5 py-1.5 rounded-full bg-[#FFD21F] hover:bg-[#FFE052] dark:bg-[#FFD21F] dark:hover:bg-[#FFE052] text-[#0A0A0E] dark:text-[#0A0A0E] font-sans font-bold text-xs transition-colors flex items-center gap-1 border border-black/10 shadow-xs hover-lift"
        >
          <span className="text-[#0A0A0E] dark:text-[#0A0A0E] font-bold">Media Kit</span>
          <ArrowRight className="w-3 h-3 text-[#0A0A0E] dark:text-[#0A0A0E]" />
        </Link>
      </div>
    </InteractiveTiltCard>
  );
}
