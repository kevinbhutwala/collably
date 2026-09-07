"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  Compass,
  Award,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreatorGrowthCenterPage() {
  const { currentCreator, user } = useAuthStore();
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [pulse, setPulse] = useState<any>(null);
  const [overallRank, setOverallRank] = useState(1);
  const [categoryRank, setCategoryRank] = useState(1);
  const [totalCreatorsCount, setTotalCreatorsCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrowthData = async () => {
      setLoading(true);
      try {
        const list = await creatorService.getCreators();
        const all = list || [];
        setTotalCreatorsCount(all.length || 1);

        let target = currentCreator;
        if (!target?.id && all.length > 0) {
          target = all[0];
        }

        if (target?.id) {
          const detailed = await creatorService.getCreatorById(target.id);
          const activeCreator = detailed || target;
          setCreator(activeCreator);

          // 1. Calculate dynamic rank based on engagement and campaign activity
          const sorted = [...all].sort((a, b) => {
            const scoreA = (a.avgEngagementRate || 0) * 10 + (a.completedCampaignsCount || 0) * 5;
            const scoreB = (b.avgEngagementRate || 0) * 10 + (b.completedCampaignsCount || 0) * 5;
            return scoreB - scoreA;
          });
          const oRank = Math.max(1, sorted.findIndex((c) => c.id === activeCreator.id) + 1);
          setOverallRank(oRank);

          const catCreators = sorted.filter(
            (c) => c.primaryCategory === activeCreator.primaryCategory
          );
          const cRank = Math.max(1, catCreators.findIndex((c) => c.id === activeCreator.id) + 1);
          setCategoryRank(cRank);

          // 2. Fetch live Market Pulse for personalized Opportunity Score
          const pulseRes = await fetch(`/api/marketplace/pulse?creatorId=${activeCreator.id}`);
          const pulseJson = await pulseRes.json();
          if (pulseJson.pulse) {
            setPulse(pulseJson.pulse);
          }
        }
      } catch (err) {
        console.error("Growth center fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrowthData();
  }, [currentCreator]);

  // Profile Checklist items derived from actual data
  const hasAvatar = Boolean(creator?.avatarUrl);
  const hasBio = Boolean(creator?.bio && creator.bio.length > 20);
  const hasCategory = Boolean(creator?.primaryCategory);
  const hasPortfolio = Boolean(creator?.portfolio && creator.portfolio.length > 0);
  const hasPricing = Boolean(creator?.startingPrice && creator.startingPrice > 0);
  const hasSocial = Boolean(creator?.socialAccounts && creator.socialAccounts.length > 0);
  const isVerified = Boolean(creator?.verified);

  const checklist = [
    { label: "High-resolution Profile Avatar", done: hasAvatar, boost: "+15%" },
    { label: "Professional Bio & Headline", done: hasBio, boost: "+15%" },
    { label: "Niche & Category Tagging", done: hasCategory, boost: "+10%" },
    { label: "Portfolio Showcase Deliverables", done: hasPortfolio, boost: "+20%" },
    { label: "Transparent Starting Rate Card", done: hasPricing, boost: "+15%" },
    { label: "Connected Verified Social Accounts", done: hasSocial, boost: "+15%" },
    { label: "Platform Identity Verification", done: isVerified, boost: "+10%" },
  ];

  const completedCount = checklist.filter((i) => i.done).length;
  const completenessPercent = Math.round((completedCount / checklist.length) * 100);

  // Dynamic Opportunity Score from pulse
  const opportunityScore = pulse?.opportunityScore ?? (completenessPercent >= 80 ? 88 : 74);
  const opportunityTier = pulse?.opportunityTier ?? (opportunityScore >= 85 ? "High Growth Potential" : "Optimal Market Fit");

  // Dynamic Roadmap Milestones based on real profile telemetry
  const milestones = [
    {
      step: "1",
      title: "Accelerate Inbound Response Rate",
      desc: "Respond to brand inquiries within 2 hours to qualify for the ⚡ Fast Responder badge.",
      gain: "+18% discovery boost",
      status: (creator?.avgEngagementRate || 0) >= 5.0 ? "Completed" : "Ready",
    },
    {
      step: "2",
      title: "Complete Video Showcase Portfolio",
      desc: "Add 2+ past deliverables to unlock frame-accurate review studio previews for prospective brands.",
      gain: "+22% proposal acceptance",
      status: (creator?.portfolio && creator.portfolio.length >= 2) ? "Completed" : (creator?.portfolio?.length === 1 ? "In Progress" : "Pending"),
    },
    {
      step: "3",
      title: "Link Social Telemetry Channel",
      desc: "Authorize YouTube or Instagram metrics to prove real-time engagement authenticity to enterprise sponsors.",
      gain: "+14% trust index",
      status: hasSocial ? "Completed" : "Pending",
    },
    {
      step: "4",
      title: "Maintain 100% On-Time Delivery",
      desc: "Submit all initial milestone drafts on or before scheduled deadline to earn the 🛡️ Reliable Partner badge.",
      gain: "Zero escrow hold delays",
      status: (creator?.completedCampaignsCount || 0) > 0 ? "Active" : "Ready",
    },
    {
      step: "5",
      title: "Collect Verified Brand Reviews",
      desc: "Every completed collaboration automatically prompts a 5-star brand review, boosting your Trending Score.",
      gain: "+25% Trending momentum",
      status: (creator?.rating || 0) >= 4.8 && (creator?.completedCampaignsCount || 0) >= 3 ? "Automated" : "In Progress",
    },
  ];

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[10px] font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
              <Sparkles className="w-3 h-3 text-[#0A0A0E] dark:text-[#FFD21F]" />
              Creator Career Operating System
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="text-[10px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
              Data-Driven Growth Roadmap
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display flex items-center gap-2.5">
            <span>Creator Growth Center</span>
            <span className="text-xl">📈</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] mt-1 max-w-2xl font-sans">
            Personalized algorithmic recommendations, profile audits, and career milestones to maximize your collaboration deal flow and platform ranking.
          </p>
        </div>

        <Link href="/app/profile">
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all shadow-xs flex items-center gap-1.5 border border-black/10 cursor-pointer">
            <span>Edit Profile & Media Kit</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
          </button>
        </Link>
      </div>

      {/* ── Key Metrics Overview ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Completeness */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-mono font-bold text-[#7A7A8A] dark:text-[#8E8EA4] uppercase block">
            Profile Completeness
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
              {completenessPercent}%
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {completenessPercent >= 80 ? "Optimal" : "Needs Action"}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] rounded-full transition-all duration-500"
              style={{ width: `${completenessPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Platform Rank */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-mono font-bold text-[#7A7A8A] dark:text-[#8E8EA4] uppercase block">
            Platform Visibility Ranking
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
              #{categoryRank}
            </span>
            <span className="text-xs font-mono text-[#5A5A68] dark:text-[#8E8EA4]">
              in {creator?.primaryCategory || "Technology"}
            </span>
          </div>
          <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
            Ranked #{overallRank} of {totalCreatorsCount} creators platform-wide
          </p>
        </div>

        {/* Metric 3: Opportunity Score */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-2">
          <span className="text-xs font-mono font-bold text-[#7A7A8A] dark:text-[#8E8EA4] uppercase block">
            Market Opportunity Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#8A6500] dark:text-[#FFD21F] font-display">
              {opportunityScore}<span className="text-lg text-[#7A7A8A]">/100</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#8A6500] dark:text-[#FFD21F]">
              {opportunityTier}
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">
            {pulse?.opportunityRationale || "Real-time calculation based on category demand & deal velocity"}
          </p>
        </div>
      </div>

      {/* ── 2-Column Stage: Profile Audit vs Visibility Roadmap ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Profile Completeness Checklist */}
        <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                Improve Your Profile
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
                Complete missing fields to boost algorithm match score by up to 35%.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
              {completedCount}/{checklist.length} Complete
            </span>
          </div>

          <div className="space-y-3">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs",
                  item.done
                    ? "bg-[#F8FDF9] dark:bg-[#151C18] border-emerald-500/20 text-[#0A0A0E] dark:text-[#D0F0DC]"
                    : "bg-[#FFFDF5] dark:bg-[#1A1A24] border-[#FFD21F]/30 text-[#0A0A0E] dark:text-[#F4F4F8]"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#8A6500] dark:text-[#FFD21F] shrink-0" />
                  )}
                  <span className={cn("font-medium", item.done ? "" : "font-bold")}>
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#7A7A8A] dark:text-[#8E8EA4]">
                    {item.boost}
                  </span>
                  {!item.done && (
                    <Link href="/app/profile">
                      <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-[10px] font-extrabold shadow-2xs border border-black/10">
                        Fix →
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visibility & Career Growth Roadmap */}
        <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                Improve Your Visibility
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
                Priority milestones to climb search rankings and unlock verified badges.
              </p>
            </div>
            <span className="text-xs font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">Roadmap</span>
          </div>

          <div className="space-y-3.5">
            {milestones.map((milestone) => (
              <div
                key={milestone.step}
                className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#1A1A28] border border-black/6 dark:border-white/6 hover:border-[#FFD21F] transition-all flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#FFD21F] to-[#FFE052] text-[#0A0A0E] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs border border-black/10">
                  {milestone.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-[#0A0A0E] dark:text-white">
                      {milestone.title}
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                      {milestone.status} • {milestone.gain}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] mt-1 leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
