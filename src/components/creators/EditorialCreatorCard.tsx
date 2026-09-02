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
} from "lucide-react";
import { formatCurrency } from "@/core/utils/formatters";

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
      ? formatCurrency(creator.startingPrice)
      : creator.startingPrice;

  return (
    <InteractiveTiltCard
      maxTilt={8}
      glowColor="rgba(255, 210, 31, 0.28)"
      className="rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all p-4 flex flex-col justify-between group select-none font-sans cursor-pointer hover-lift"
    >
      <div className="space-y-4">
        {/* Layered Visual Portrait Container */}
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#0A0A0E]">
          {/* Main Primary Portrait */}
          <SafeImage
            src={creator.avatarUrl || creator.heroImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"}
            alt={creator.name}
            width={800}
            height={1000}
            className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white flex items-center gap-1 border border-white/15">
              <Sparkles className="w-3 h-3 text-[#FFD21F] fill-[#FFD21F]" />
              <span>{creator.matchScore}% AI Match</span>
            </span>

            <div className="flex items-center gap-1.5">
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

              <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold shadow-sm">
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
              className="absolute bottom-16 right-3 z-20 w-20 sm:w-22 aspect-square rounded-xl overflow-hidden border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] bg-black group-hover:border-[#FFD21F] transition-colors"
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
                4K Reel
              </span>
            </motion.div>
          )}

          {/* Bottom Portrait Info */}
          <div className="absolute bottom-3 inset-x-3 z-10 text-white space-y-0.5 max-w-[65%]">
            <div className="flex items-center gap-1">
              <h3 className="text-base font-bold font-display">{creator.name}</h3>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
            </div>
            <p className="text-[11px] text-white/80 font-sans truncate">{creator.niche}</p>
          </div>
        </div>

        {/* Tags & Telemetry */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#5A5A68]">
            <span className="font-bold text-[#0A0A0E]">{creator.reach} Reach</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 text-[10px]">
              {typeof creator.engagementRate === "number" ? `${creator.engagementRate}% ER` : creator.engagementRate}
            </span>
          </div>

          {creator.tags && creator.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 font-mono text-[10px] text-[#4A4A58]">
              {creator.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#F4F4F8] border border-black/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Action Strip */}
      <div className="pt-3 border-t border-black/6 flex items-center justify-between text-xs gap-2">
        <button
          onClick={() => onQuickView(creator)}
          className="px-3 py-1.5 rounded-full bg-[#F4F4F8] hover:bg-[#EAEAEF] text-[#0A0A0E] text-[11px] font-bold transition-colors flex items-center gap-1"
        >
          <Eye className="w-3 h-3 text-[#7A7A8A]" />
          <span>Quick View</span>
        </button>

        <Link
          href={`/creators/${creator.id}`}
          className="px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-[#FFD21F] text-[#0A0A0E] font-sans font-bold text-xs transition-colors flex items-center gap-1 border border-black/8 hover-lift"
        >
          <span>Book</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </InteractiveTiltCard>
  );
}
