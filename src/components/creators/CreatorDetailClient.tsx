"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import { TrustIndicatorsBar } from "@/components/marketplace/TrustIndicatorsBar";
import { CategoryBadge, TitleIcon } from "@/components/ui/TitleIconBadge";
import { SaveToShortlistButton } from "@/components/creators/SaveToShortlistButton";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { PreflightEligibilityAudit } from "@/components/marketplace/PreflightEligibilityAudit";
import { collaborationService } from "@/services/collaboration.service";
import {
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  MapPin,
  Sparkles,
  BarChart3,
  Users,
  Zap,
  Clock,
  Star,
  ShieldAlert,
} from "lucide-react";

interface CreatorDetailClientProps {
  creatorId: string;
  initialCreator?: CreatorProfile | null;
}

function buildPlatformUrl(platform: string, handle: string, url?: string) {
  if (url) return url;
  const h = handle.replace(/^@/, "");
  switch (platform) {
    case "instagram": return `https://www.instagram.com/${h}/`;
    case "youtube":   return `https://www.youtube.com/@${h}`;
    case "tiktok":    return `https://www.tiktok.com/@${h}`;
    case "x":         return `https://x.com/${h}`;
    case "linkedin":  return `https://www.linkedin.com/in/${h}`;
    case "threads":   return `https://www.threads.net/@${h}`;
    default:          return "#";
  }
}

export function CreatorDetailClient({
  creatorId,
  initialCreator = null,
}: CreatorDetailClientProps) {
  const router = useRouter();
  const { format } = useGlobalCurrency();
  const { currentBrand } = useAuthStore();
  const { addToast } = useUIStore();

  const [creator, setCreator] = useState<CreatorProfile | null>(initialCreator);
  const [loading, setLoading] = useState(!initialCreator);

  // Direct Campaign Proposal & Reverse Verification Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState("Direct Sponsorship Collaboration");
  const [deliverableType, setDeliverableType] = useState("Short-Form Video (Reels / Shorts)");
  const [offeredBudget, setOfferedBudget] = useState<number>(initialCreator?.startingPrice || 2500);
  const [briefNotes, setBriefNotes] = useState("");
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);

  // Reverse Preflight Eligibility Audit State
  const [brandEligibilityReport, setBrandEligibilityReport] = useState<any>(null);
  const [isAuditingBrand, setIsAuditingBrand] = useState(false);

  const checkBrandEligibility = async (customBudget?: number, customDeliv?: string) => {
    if (!creator) return;
    setIsAuditingBrand(true);
    try {
      const res = await fetch("/api/marketplace/verify-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direction: "brand_to_creator",
          creatorId: creator.id,
          brandId: currentBrand?.id,
          totalAgreedBudget: customBudget !== undefined ? customBudget : offeredBudget,
          deliverableType: customDeliv || deliverableType,
          campaignTitle,
        }),
      });
      const data = await res.json();
      if (data?.report) {
        setBrandEligibilityReport(data.report);
      }
    } catch (err) {
      console.error("Brand eligibility audit error:", err);
    } finally {
      setIsAuditingBrand(false);
    }
  };

  useEffect(() => {
    if (isInviteModalOpen && creator) {
      if (creator.startingPrice && offeredBudget === 2500 && creator.startingPrice !== 2500) {
        setOfferedBudget(creator.startingPrice);
      }
      checkBrandEligibility();
    }
  }, [isInviteModalOpen, creator?.id]);

  const handleSendProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creator) return;

    if (brandEligibilityReport && !brandEligibilityReport.eligible) {
      addToast({
        type: "error",
        title: "Requirements Not Met",
        message: "Please address the critical compatibility requirements highlighted above.",
      });
      return;
    }

    setIsSubmittingProposal(true);
    try {
      const res = await collaborationService.createCollaboration({
        creatorId: creator.id,
        brandId: currentBrand?.id,
        campaignTitle,
        totalAgreedBudget: offeredBudget,
        deliverableType,
        notes: briefNotes,
      });

      addToast({
        type: "success",
        title: "Proposal Sent & Escrow Initialized",
        message: `Your campaign brief has been routed to ${creator.fullName}!`,
      });
      setIsInviteModalOpen(false);

      if (res?.collaboration?.id) {
        router.push(`/app/collaborations/${res.collaboration.id}`);
      } else {
        router.push("/app/collaborations");
      }
    } catch (err: any) {
      if (err.report) {
        setBrandEligibilityReport(err.report);
      }
      addToast({
        type: "error",
        title: "Proposal Blocked",
        message: err.message || "Failed to submit proposal due to eligibility requirements",
      });
    } finally {
      setIsSubmittingProposal(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      try {
        const data = await creatorService.getCreatorById(creatorId);
        if (data && isMounted) setCreator(data);
      } catch {}
      finally { if (isMounted) setLoading(false); }
    };
    if (creatorId) fetchLatest();
    return () => { isMounted = false; };
  }, [creatorId]);

  if (loading) {
    return (
      <div className="py-32 min-h-screen flex items-center justify-center bg-[#FAFAFC] dark:bg-[#07070B]">
        <CreativeLoader size="lg" label="Loading Creator Media Kit" subtext="Fetching verified metrics, rate cards, and 4K showcase reels..." />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="py-32 text-center space-y-4 min-h-screen bg-[#FAFAFC] dark:bg-[#07070B]">
        <h2 className="text-2xl font-bold text-[#0A0A0E] dark:text-white">Creator not found</h2>
        <Link href="/creators">
          <button className="px-6 py-2.5 rounded-full bg-white dark:bg-[#14141E] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white hover:opacity-80 cursor-pointer">
            ← Back to Directory
          </button>
        </Link>
      </div>
    );
  }

  const igHandle = (creator.handle || "").replace(/^@/, "");
  const igUrl = creator.instagramUrl || `https://www.instagram.com/${igHandle}/`;

  // Top social stats
  const totalFollowers = (creator.socialAccounts || []).reduce((s, a) => s + (a.followers || 0), 0);
  const avgEngagement = creator.avgEngagementRate || 0;

  return (
    <div className="min-h-screen bg-[#F7F7FA] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8]">

      {/* ── CINEMATIC HERO BAND ── */}
      <div className="relative overflow-hidden bg-[#0A0A0E] dark:bg-[#050508]">
        {/* Background grain + gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#0A0A0E] to-[#0F0F1A]" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
        {/* Yellow accent glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FFD21F]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FFD21F]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-12">

            {/* Avatar + identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 flex-1">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-2 ring-[#FFD21F]/40 shadow-2xl">
                  <SafeImage
                    src={creator.avatarUrl}
                    alt={creator.fullName}
                    fallbackType="creator"
                    fallbackName={creator.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                {creator.verified && (
                  <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FFD21F] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#0A0A0E]">
                    <CheckCircle2 className="w-4 h-4 text-[#0A0A0E]" />
                  </span>
                )}
              </div>

              {/* Name + meta */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={creator.primaryCategory} size="sm" showIcon={true} />
                  {creator.profileSource === "instagram_public" && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold font-mono">
                      Public Discovery
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display leading-none">
                  {creator.fullName}
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold font-mono transition-all backdrop-blur-sm"
                  >
                    <SocialIcon platform="instagram" colored={true} size={13} />
                    @{igHandle}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-white/60 text-xs font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    {creator.countryFlag || (creator.location?.includes("India") ? "🇮🇳" : "🌍")} {creator.location}
                  </span>
                  {creator.isInstagramVerified && (
                    <span className="inline-flex items-center gap-1 text-[#0095F6] text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-[#0095F6] text-white" /> IG Verified
                    </span>
                  )}
                </div>

                {/* Pull quote */}
                {creator.headline ? (
                  <p className="text-white/80 font-serif italic text-lg sm:text-xl max-w-xl leading-snug">
                    &ldquo;{creator.headline}&rdquo;
                  </p>
                ) : null}
              </div>
            </div>

            {/* Hero Stats strip */}
            <div className="flex flex-row lg:flex-col gap-3 lg:gap-2 shrink-0 flex-wrap">
              {[
                { icon: Users, label: "Total Reach", value: formatNumber(totalFollowers || (creator as any).followersCount || 0) },
                { icon: BarChart3, label: "Engagement", value: `${avgEngagement.toFixed(1)}%` },
                { icon: Star, label: "Campaigns Done", value: `${creator.completedCampaignsCount}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/8 border border-white/12 backdrop-blur-sm min-w-[140px]">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD21F]/15 border border-[#FFD21F]/25 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#FFD21F]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 font-mono uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-black text-white font-mono">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* 3-col top row: Bio | Social Channels | CTA card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Bio + Trust + Claim notice */}
          <div className="lg:col-span-8 space-y-5">

            {/* Bio card */}
            <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD21F]" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7A8A] dark:text-[#A0A0B0] font-bold">
                  Creator Bio
                </span>
              </div>
              {creator.bio ? (
                <p className="text-sm text-[#3A3A48] dark:text-[#C0C0D0] leading-relaxed font-sans whitespace-pre-line">
                  {creator.bio}
                </p>
              ) : (
                <p className="text-sm text-[#8A8A9A] dark:text-[#6A6A78] italic font-sans">
                  This creator has not written an editorial bio yet.
                </p>
              )}

              {/* Trust bar */}
              <TrustIndicatorsBar type="creator" id={creator.id} />
            </div>

            {/* Social channels */}
            {(creator.socialAccounts || []).length > 0 && (
              <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#FFD21F]" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7A8A] dark:text-[#A0A0B0] font-bold">
                    Connected Channels
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(creator.socialAccounts || []).map((sa) => {
                    const isVerified = sa.verifiedBadge || sa.verificationStatus === "verified";
                    const cleanHandle = sa.handle.replace(/^@/, "");
                    const platformUrl = buildPlatformUrl(sa.platform, cleanHandle, sa.url);
                    return (
                      <a
                        key={sa.id}
                        href={platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-4 rounded-xl bg-[#F8F8FC] dark:bg-[#181826] hover:bg-[#F0F0F8] dark:hover:bg-[#1E1E2E] border border-black/6 dark:border-white/8 transition-all hover:shadow-sm hover:-translate-y-0.5"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/10 border border-black/8 dark:border-white/10 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                          <SocialIcon platform={sa.platform} colored={true} size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#0A0A0E] dark:text-white font-mono truncate">
                              @{cleanHandle}
                            </span>
                            {isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
                            {formatNumber(sa.followers)} followers
                            {sa.engagementRate ? ` · ${sa.engagementRate.toFixed(1)}% ER` : ""}
                          </p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C0C0CC] group-hover:text-[#0A0A0E] dark:group-hover:text-white transition-colors shrink-0" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Claim notice */}
            {creator.profileSource === "instagram_public" && (
              <div className="rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 p-5 flex gap-4">
                <SocialIcon platform="instagram" colored={true} size={20} />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-900 dark:text-amber-300 font-mono">Public Discovery Profile — Unclaimed</p>
                  <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                    Are you @{igHandle}?{" "}
                    <Link href="/register?role=creator" className="font-bold underline hover:opacity-80">
                      Claim this profile
                    </Link>{" "}
                    to connect your verified account and set your own rate cards.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky CTA card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 overflow-hidden shadow-lg">
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700]" />

              <div className="p-6 space-y-5">
                {/* Price */}
                <div>
                  <p className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] font-mono uppercase tracking-wider">Base Sponsorship</p>
                  <p className="text-3xl font-black text-[#0A0A0E] dark:text-white font-mono mt-0.5">
                    {format(creator.startingPrice, (creator as any).currency || "INR")}
                  </p>
                </div>

                {/* Status grid */}
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { icon: Zap, label: "Status", value: "Available for Hire", color: "text-emerald-600 dark:text-emerald-400" },
                    { icon: Clock, label: "Avg Turnaround", value: "4–7 Business Days", color: "text-[#0A0A0E] dark:text-white" },
                    { icon: Star, label: "Past Campaigns", value: `${creator.completedCampaignsCount} Completed`, color: "text-[#0A0A0E] dark:text-white" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F8FC] dark:bg-[#181826]">
                      <div className="flex items-center gap-2 text-[#7A7A8A] dark:text-[#8E8EA4]">
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono">{label}</span>
                      </div>
                      <span className={`text-xs font-bold font-mono ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-2.5 pt-1">
                  <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,210,31,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Send Campaign Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/app/messages?recipientId=${creator.userId || creator.id}&recipientName=${encodeURIComponent(creator.fullName)}`}
                    className="block"
                  >
                    <button className="w-full py-3 rounded-xl bg-[#F8F8FC] dark:bg-white/5 hover:bg-[#EEEEF4] dark:hover:bg-white/10 border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      <span>Direct Message</span>
                    </button>
                  </Link>

                  <SaveToShortlistButton creator={creator} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RATE CARD + AUDIENCE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Rate card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-black/6 dark:border-white/8 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#0A0A0E] dark:text-white font-display">Deliverables & Rate Benchmarks</h2>
                  <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-sans mt-0.5">
                    Final quotes confirmed on campaign brief review.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-bold">
                  {creator.isSignedTalent ? "✓ Verified Rate Card" : "Market Benchmark"}
                </span>
              </div>

              <div className="p-4 space-y-3">
                {(creator.rateCards || []).map((rate, i) => (
                  <div
                    key={rate.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F8F8FC] dark:bg-[#181826] hover:bg-[#F2F2F8] dark:hover:bg-[#1E1E2E] border border-transparent hover:border-[#FFD21F]/20 transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD21F]/20 to-[#FFD21F]/5 border border-[#FFD21F]/25 flex items-center justify-center text-[#A37F00] dark:text-[#FFD21F] shrink-0">
                        <TitleIcon title={rate.title || rate.deliverableType} category={creator.primaryCategory} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-[#0A0A0E] dark:text-white">{rate.title || rate.deliverableType}</h3>
                        <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B0] mt-0.5">{rate.description}</p>
                        <span className="text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4] block mt-1">
                          {rate.turnaroundDays}d delivery · {rate.revisionsIncluded || 2} revisions
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-0 border-black/5 dark:border-white/5">
                      <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] font-mono block">Est. rate</span>
                      <span className="text-lg font-black text-[#0A0A0E] dark:text-white font-mono">
                        {format(rate.basePrice || (rate as any).price || 500, (rate as any).currency || (creator as any).currency || "INR")}
                      </span>
                      <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">per deliverable</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audience telemetry */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 overflow-hidden h-full">
              <div className="px-6 pt-6 pb-4 border-b border-black/6 dark:border-white/8">
                <h2 className="text-lg font-bold text-[#0A0A0E] dark:text-white font-display">Audience Telemetry</h2>
                <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] mt-0.5">Geo distribution & demographics</p>
              </div>

              <div className="p-5 space-y-6">
                {/* Top Geos */}
                <div className="space-y-3">
                  <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold font-mono tracking-wider block">Top Geographies</span>
                  {(creator.audience?.topCountries || []).map((geo) => (
                    <div key={geo.country} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#0A0A0E] dark:text-white font-bold">{geo.country}</span>
                        <span className="text-[#7A7A8A] dark:text-[#8E8EA4]">{geo.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFC700] transition-all"
                          style={{ width: `${geo.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gender split */}
                {(creator.audience?.genderSplit || []).length > 0 && (
                  <div className="pt-4 border-t border-black/6 dark:border-white/8 space-y-3">
                    <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold font-mono tracking-wider block">Gender Breakdown</span>
                    <div className="grid grid-cols-2 gap-2">
                      {(creator.audience?.genderSplit || []).map((g) => (
                        <div key={g.gender} className="p-4 rounded-xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/5 dark:border-white/5 text-center">
                          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-mono block">{g.gender}</span>
                          <span className="text-2xl font-black text-[#0A0A0E] dark:text-white mt-1 block">{g.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Age distribution */}
                {(creator.audience?.ageDistribution || []).length > 0 && (
                  <div className="pt-4 border-t border-black/6 dark:border-white/8 space-y-3">
                    <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold font-mono tracking-wider block">Age Distribution</span>
                    {(creator.audience?.ageDistribution || []).map((a) => (
                      <div key={a.range} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#0A0A0E] dark:text-white">{a.range}</span>
                          <span className="text-[#7A7A8A] dark:text-[#8E8EA4]">{a.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#A0C4FF] to-[#6B9FFF]"
                            style={{ width: `${a.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── ATTRIBUTION FOOTER ── */}
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/6 dark:border-white/8 p-5 flex gap-3">
          <SocialIcon platform="instagram" colored={true} size={16} />
          <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] leading-relaxed font-sans">
            Instagram usernames (@{igHandle}), photographs, follower statistics, and bios are sourced from publicly available Instagram accounts for discovery purposes. All creative works remain the property of their respective creators.
            {" "}<Link href="/register?role=creator" className="text-[#0A0A0E] dark:text-[#FFD21F] font-bold underline hover:opacity-80">Claim this profile</Link> to manage your listing.
          </p>
        </div>

      </div>

      {/* Reverse Pre-Flight Verification & Direct Proposal Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title={`Send Campaign Proposal to ${creator.fullName}`}
        description="Verify brand-creator compatibility, deliverable requirements, and escrow funding terms."
        maxWidth="2xl"
      >
        <div className="space-y-6">
          <PreflightEligibilityAudit
            report={brandEligibilityReport}
            isLoading={isAuditingBrand}
            onRefresh={() => checkBrandEligibility()}
            actionLabel="Send Brief"
          />

          <form onSubmit={handleSendProposal} className="space-y-4 text-[#0A0A0E] dark:text-[#F4F4F8] pt-2 border-t border-black/8 dark:border-white/10">
            <div>
              <Input
                label="Campaign / Project Title"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                placeholder="e.g. Summer Launch Campaign & Reel Showcase"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#5A5A68] dark:text-[#A0A0B0] uppercase mb-1.5">
                  Deliverable Format
                </label>
                <select
                  value={deliverableType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDeliverableType(val);
                    checkBrandEligibility(offeredBudget, val);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#14141E] border border-black/10 dark:border-white/10 text-xs font-mono font-medium text-[#0A0A0E] dark:text-white focus:outline-hidden focus:border-[#FFD21F]"
                >
                  <option value="Short-Form Video (Reels / Shorts)">Short-Form Video (Reels / Shorts)</option>
                  <option value="Dedicated YouTube Video">Dedicated YouTube Video</option>
                  <option value="Instagram Carousel & Story Set">Instagram Carousel &amp; Story Set</option>
                  <option value="TikTok Series">TikTok Series</option>
                  <option value="UGC Video Package">UGC Video Package</option>
                </select>
              </div>

              <div>
                <Input
                  label="Agreed Budget (₹ INR)"
                  type="number"
                  value={offeredBudget}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setOfferedBudget(val);
                  }}
                  onBlur={() => checkBrandEligibility(offeredBudget, deliverableType)}
                  required
                />
                {creator.startingPrice && offeredBudget < creator.startingPrice && (
                  <p className="text-[11px] text-amber-500 font-mono mt-1">
                    Note: Creator base benchmark is ₹{creator.startingPrice.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>

            <Textarea
              label="Deliverable Guidelines & Talking Points"
              value={briefNotes}
              onChange={(e) => setBriefNotes(e.target.value)}
              placeholder="Outline specific objectives, messaging requirements, dos & don'ts, and shipping details..."
              rows={4}
              required
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmittingProposal || isAuditingBrand || (brandEligibilityReport && !brandEligibilityReport.eligible)}
                className={`w-full py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  brandEligibilityReport && !brandEligibilityReport.eligible
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 active:scale-98 cursor-pointer"
                }`}
              >
                {isSubmittingProposal ? (
                  "Sending Proposal & Creating Escrow..."
                ) : brandEligibilityReport && !brandEligibilityReport.eligible ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Resolve Requirements Above to Send Brief</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0A0A0E]" />
                    <span>Confirm &amp; Send Campaign Brief {brandEligibilityReport?.score ? `(${brandEligibilityReport.score}% Fit)` : ""}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
