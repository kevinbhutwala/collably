"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import {
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Video,
  Play,
  ArrowRight,
  TrendingUp,
  Heart,
  ExternalLink,
  Users,
  Film,
  Camera,
} from "lucide-react";

export interface CreatorQuickViewData {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  heroImage?: string;
  niche: string;
  category: string;
  reach: string;
  followersCount?: number;
  engagementRate: string | number;
  startingPrice: string | number;
  matchScore: string | number;
  rating?: number;
  bio?: string;
  location?: string;
  tags?: string[];
  sampleDeliverables?: Array<{
    title: string;
    specs: string;
    imageUrl: string;
  }>;
}

interface CreatorQuickViewModalProps {
  creator: CreatorQuickViewData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookmarkToggle?: (id: string) => void;
  isBookmarked?: boolean;
}

export function CreatorQuickViewModal({
  creator,
  isOpen,
  onClose,
  onBookmarkToggle,
  isBookmarked = false,
}: CreatorQuickViewModalProps) {
  const [selectedMediaIdx, setSelectedMediaIdx] = useState(0);

  if (!creator) return null;

  const deliverables = creator.sampleDeliverables || [
    {
      title: "4K Master Product Reel",
      specs: "RED V-Raptor 8K • 60fps",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "60s Dedicated Mid-roll Integration",
      specs: "Sony FX3 • S-Log3 ProRes",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="3xl"
      className="p-0 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row text-[#0A0A0E] font-sans select-none max-h-[85vh] overflow-y-auto">
        {/* Left: High-Fashion Visual & Media Showcase */}
        <div className="md:w-5/12 bg-[#0A0A0E] relative min-h-[320px] md:min-h-full flex flex-col justify-between p-6 text-white overflow-hidden">
          <SafeImage
            src={creator.heroImage || creator.avatarUrl}
            alt={creator.name}
            width={600}
            height={800}
            className="absolute inset-0 w-full h-full object-cover filter contrast-105 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              <span>{creator.matchScore}% Match Affinity</span>
            </span>

            {onBookmarkToggle && (
              <button
                onClick={() => onBookmarkToggle(creator.id)}
                className={`p-2 rounded-full backdrop-blur-md border transition-colors ${
                  isBookmarked
                    ? "bg-[#FFD21F] text-[#0A0A0E] border-[#FFD21F]"
                    : "bg-black/50 text-white border-white/20 hover:bg-white/20"
                }`}
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </button>
            )}
          </div>

          {/* Bottom Portrait Info */}
          <div className="relative z-10 space-y-2 pt-24">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold uppercase">
              {creator.category}
            </div>
            <h2 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-2">
              <span>{creator.name}</span>
              <CheckCircle2 className="w-4 h-4 text-[#087F5B]" />
            </h2>
            <p className="text-xs text-white/80 font-mono">{creator.handle}</p>
          </div>
        </div>

        {/* Right: Telemetry, Rate Cards & Direct Booking Action */}
        <div className="md:w-7/12 p-6 sm:p-8 space-y-6 bg-white flex flex-col justify-between">
          <div className="space-y-6">
            {/* Telemetry Strip */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/6 text-left font-mono">
              <div>
                <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Verified Reach</span>
                <span className="text-base sm:text-lg font-black text-[#0A0A0E] font-display">
                  {creator.reach}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Engagement</span>
                <span className="text-base sm:text-lg font-black text-emerald-600 font-display">
                  {typeof creator.engagementRate === "number" ? `${creator.engagementRate}%` : creator.engagementRate}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Starting Rate</span>
                <span className="text-base sm:text-lg font-black text-[#0A0A0E] font-display">
                  {typeof creator.startingPrice === "number" ? formatCurrency(creator.startingPrice) : creator.startingPrice}
                </span>
              </div>
            </div>

            {/* Bio / Summary */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A8A] font-mono">
                Creator Overview &amp; Niche
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4A58] leading-relaxed font-sans">
                {creator.bio ||
                  `Specialized in ${creator.niche}. Delivering studio-grade 4K cinematic integrations, authentic product storytelling, and high-converting commercial rights.`}
              </p>
            </div>

            {/* Production Deliverables Reel */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A8A] font-mono flex items-center justify-between">
                <span>Verified Deliverable Cuts</span>
                <span className="text-[10px] text-[#087F5B] font-bold">100% Escrow Protected</span>
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF9F5] border border-black/8 hover:border-[#FFD21F] transition-all space-y-1 group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                      <SafeImage
                        src={item.imageUrl}
                        alt={item.title}
                        width={300}
                        height={180}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white opacity-80" />
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-[#0A0A0E] truncate font-display">{item.title}</p>
                    <p className="text-[9px] text-[#6A6A78] font-mono truncate">{item.specs}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment / Production Tags */}
            {creator.tags && creator.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {creator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-[#F4F4F8] border border-black/6 text-[10px] font-mono font-medium text-[#4A4A58]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-black/8 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/creators/${creator.id}`}
              onClick={onClose}
              className="w-full sm:w-1/2 py-3 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5 shadow-xs hover-lift"
            >
              <span>Full Media Kit</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#7A7A8A]" />
            </Link>

            <Link
              href="/app/brand/campaigns/create"
              onClick={onClose}
              className="w-full sm:w-1/2 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_2px_12px_rgba(255,210,31,0.35)] border border-black/10 hover-lift"
            >
              <span>Book via Escrow</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
