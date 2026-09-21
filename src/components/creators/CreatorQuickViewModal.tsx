"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
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
  MessageSquare,
  MapPin,
} from "lucide-react";

export interface CreatorQuickViewData {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  heroImage?: string;
  niche: string;
  category: string;
  reach?: string;
  followersCount?: number;
  engagementRate?: string | number;
  startingPrice?: string | number;
  currency?: string;
  matchScore?: string | number;
  rating?: number;
  bio?: string;
  location?: string;
  tags?: string[];
  sampleDeliverables?: Array<{
    title: string;
    specs: string;
    imageUrl: string;
  }>;
  profileSource?: 'instagram_public' | 'abeycollab_verified' | 'market_benchmark' | 'sample_benchmark';
  isSignedTalent?: boolean;
  cohortBadge?: string;
  turnaroundDays?: number;
  isInstagramVerified?: boolean;
  isAbeyCollabVerified?: boolean;
  isClaimedOnAbeyCollab?: boolean;
  instagramUrl?: string;
  isSampleRate?: boolean;
}

import { SocialIcon } from "@/components/ui/SocialIcons";

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
  const { format } = useGlobalCurrency();

  if (!creator) return null;

  const deliverables = creator.sampleDeliverables || [
    {
      title: "60s Master Product Reel",
      specs: "4K Master Production • Audio Mix",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Carousel / Story Feature Set",
      specs: "Multi-Slide Asset Pack",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const cleanHandle = (creator.handle || "").replace(/^@/, "");
  const igUrl = creator.instagramUrl || `https://www.instagram.com/${cleanHandle}/`;
  const isInstagramSourced = creator.profileSource === "instagram_public" || !creator.isAbeyCollabVerified;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="3xl"
      className="p-0 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row text-[#0A0A0E] dark:text-[#F4F4F8] font-sans select-none max-h-[85vh] overflow-y-auto">
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
            <span className="px-3 py-1 rounded-full bg-black/70 dark:bg-[#14141E]/95 backdrop-blur-md border border-white/20 text-xs font-mono font-bold flex items-center gap-1.5 text-white">
              <SocialIcon platform="instagram" colored={true} size={13} />
              <span>Instagram Profile</span>
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
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold uppercase">
                {creator.category}
              </div>
              {creator.location && (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold">
                  <MapPin className="w-3 h-3 text-[#FFD21F]" />
                  <span>{creator.location.includes("India") ? "🇮🇳" : creator.location.includes("United States") ? "🇺🇸" : "🇦🇪"} {creator.location}</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-2">
              <span>{creator.name}</span>
              <span title="Verified on Instagram">
                <CheckCircle2 className="w-4 h-4 text-[#0095F6] fill-[#0095F6] text-white" />
              </span>
            </h2>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-[#FFD21F] font-mono transition-colors"
              title="Open Instagram profile in new tab"
            >
              <SocialIcon platform="instagram" size={13} />
              <span>@{cleanHandle}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>

        {/* Right: Telemetry, Rate Cards & Direct Booking Action */}
        <div className="md:w-7/12 p-6 sm:p-8 space-y-5 bg-white dark:bg-[#101018] flex flex-col justify-between">
          <div className="space-y-5">
            {/* Telemetry Strip */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#F8F8FC] dark:bg-white/5 border border-black/6 dark:border-white/10 text-left font-mono">
              <div>
                <span className="text-[10px] text-[#7A7A8A] dark:text-[#A0A0B4] uppercase font-bold block">IG Followers</span>
                <span className="text-base sm:text-lg font-black text-[#0A0A0E] dark:text-white font-display">
                  {creator.reach}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A7A8A] dark:text-[#A0A0B4] uppercase font-bold block">Engagement</span>
                <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-display">
                  {typeof creator.engagementRate === "number" ? `${creator.engagementRate}%` : creator.engagementRate}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A7A8A] dark:text-[#A0A0B4] uppercase font-bold block">
                  {creator.isSignedTalent ? "Rate Card" : "Benchmark Rate"}
                </span>
                <span className="text-base sm:text-lg font-black text-[#0A0A0E] dark:text-white font-display" title="Estimated benchmark">
                  <span className="text-xs font-normal text-[#7A7A8A] mr-0.5">Est.</span>
                  {typeof creator.startingPrice === "number" ? format(creator.startingPrice, creator.currency || "USD") : creator.startingPrice}
                </span>
              </div>
            </div>

            {/* Sourcing & Provenance Alert */}
            {isInstagramSourced && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#0A0A0E] dark:text-[#E0E0EC] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <SocialIcon platform="instagram" colored={true} size={13} />
                    <span>Instagram-Sourced Public Profile</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider bg-amber-200/60 dark:bg-amber-950/60 px-2 py-0.5 rounded font-mono font-bold">
                    Unclaimed
                  </span>
                </div>
                <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-normal font-sans">
                  Profile metadata is publicly sourced from Instagram. Deliverables and rates shown are market reference benchmarks for campaign planning purposes.
                </p>
              </div>
            )}

            {/* Bio / Summary */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A8A] dark:text-[#A0A0B4] font-mono">
                Public Instagram Bio
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4A58] dark:text-[#C0C0D0] leading-relaxed font-sans">
                {creator.bio}
              </p>
            </div>

            {/* Production Deliverables Reel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A8A] dark:text-[#A0A0B4] font-mono">
                  {creator.isSignedTalent ? "Verified Deliverable Packages" : "Market Reference Deliverables"}
                </h4>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                  creator.isSignedTalent
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                    : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                }`}>
                  {creator.isSignedTalent ? "Guaranteed 5-Day SLA" : "Market Benchmark"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF9F5] dark:bg-white/5 border border-black/8 dark:border-white/10 hover:border-[#FFD21F] transition-all space-y-1 group cursor-pointer"
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
                    <p className="text-[11px] font-bold text-[#0A0A0E] dark:text-white truncate font-display">{item.title}</p>
                    <p className="text-[9px] text-[#6A6A78] dark:text-[#A0A0B0] font-mono truncate">{item.specs}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmark Disclaimer Notice if not signed */}
            {!creator.isSignedTalent && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                <strong>Market Benchmark Notice:</strong> This profile is an unclaimed public creator reference for pricing benchmarks. Direct instant escrow booking is enabled for signed creators in the <strong>Founding Cohort</strong>.
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-black/8 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-full bg-[#F4F4F8] hover:bg-[#EAEAEF] dark:bg-white/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <SocialIcon platform="instagram" colored={true} size={13} />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <Link
              href={`/creators/${creator.id}`}
              onClick={onClose}
              className="py-2.5 rounded-full bg-white dark:bg-[#1C1C28] hover:bg-[#F8F8FC] dark:hover:bg-[#28283C] border border-black/10 dark:border-white/20 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span className="text-[#0A0A0E] dark:text-white font-bold">Full Media Kit</span>
            </Link>

            {creator.isSignedTalent ? (
              <Link
                href="/app/brand/campaigns/create"
                onClick={onClose}
                className="py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_2px_12px_rgba(255,210,31,0.35)] border border-black/10 cursor-pointer"
              >
                <span>Book Escrow (5d)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
              </Link>
            ) : (
              <Link
                href="/contact"
                onClick={onClose}
                className="py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5 border border-black/10 cursor-pointer"
              >
                <span>Request Representation</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
