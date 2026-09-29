"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { campaignService } from "@/services/campaign.service";
import { applicationService } from "@/services/application.service";
import { Campaign } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { SafeImage } from "@/components/ui/SafeImage";
import { MatchScoreBadge } from "@/components/ai/MatchScoreBadge";
import { AICreatorPitchModal } from "@/components/ai/AICreatorPitchModal";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { getCurrencySymbol } from "@/core/utils/currency";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import { CategoryBadge, TitleIcon, DeliverableBadge } from "@/components/ui/TitleIconBadge";

import {
  ShieldCheck,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { PreflightEligibilityAudit } from "@/components/marketplace/PreflightEligibilityAudit";

import { checkCreatorProfileStatus } from "@/core/utils/profileCompleteness";

interface CampaignDetailClientProps {
  campaignId: string;
  initialCampaign?: Campaign | null;
}

export function CampaignDetailClient({
  campaignId,
  initialCampaign = null,
}: CampaignDetailClientProps) {
  const { currency: displayCurrency, convertAndFormat } = useGlobalCurrency();
  const { currentCreator, role } = useAuthStore();
  const { addToast } = useUIStore();

  const profileStatus = checkCreatorProfileStatus(currentCreator);
  const cannotApplyDueToProfile = role === "creator" && !profileStatus.canApplyToCampaigns;
  const isProfileIncomplete = cannotApplyDueToProfile;

  const [campaign, setCampaign] = useState<Campaign | null>(initialCampaign);
  const [loading, setLoading] = useState(!initialCampaign);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAiPitchOpen, setIsAiPitchOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-flight Eligibility Audit State
  const [eligibilityReport, setEligibilityReport] = useState<any>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // Application form
  const [proposedFee, setProposedFee] = useState<number>(
    initialCampaign?.budget?.perCreatorBudget || 3500
  );
  const [pitch, setPitch] = useState<string>("");
  const [sampleLink, setSampleLink] = useState<string>("");

  const checkEligibility = async (overrideFee?: number) => {
    if (!campaign) return;
    setIsAuditing(true);
    try {
      const res = await fetch("/api/marketplace/verify-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direction: "creator_to_campaign",
          campaignId: campaign.id,
          creatorId: currentCreator?.id,
          proposedFee: overrideFee !== undefined ? overrideFee : proposedFee,
        }),
      });
      const data = await res.json();
      if (data?.report) {
        setEligibilityReport(data.report);
      }
    } catch (e) {
      console.error("Eligibility check error:", e);
    } finally {
      setIsAuditing(false);
    }
  };

  useEffect(() => {
    if (isApplyModalOpen && campaign) {
      checkEligibility();
    }
  }, [isApplyModalOpen, campaign?.id]);

  useEffect(() => {
    if (!campaign) {
      const fetch = async () => {
        setLoading(true);
        let data = await campaignService.getCampaignById(campaignId);
        if (typeof window !== "undefined") {
          try {
            const cached = localStorage.getItem(`campaign_${campaignId}`);
            if (cached) {
              const parsed = JSON.parse(cached);
              if (parsed.id === campaignId) {
                data = { ...(data || {}), ...parsed };
              }
            }
          } catch {}
        }
        setCampaign(data || null);
        if (data) setProposedFee(data.budget?.perCreatorBudget || 2500);
        setLoading(false);
      };
      fetch();
    }
  }, [campaignId, campaign]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;

    if (cannotApplyDueToProfile) {
      addToast({
        type: "error",
        title: "Profile Incomplete & Unconfirmed",
        message:
          profileStatus.summary ||
          "Please complete your creator details and verify connected social channels in your profile before applying.",
      });
      return;
    }

    if (eligibilityReport && !eligibilityReport.eligible) {
      addToast({
        type: "error",
        title: "Requirements Not Met",
        message: "Please resolve the critical blockers highlighted in your pre-flight audit.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const appPayload = {
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        brandId: campaign.brandId || campaign.brand?.id || "brand-partner",
        brandName: campaign.brand?.companyName || "Brand Partner",
        creatorId: currentCreator?.id || "creator-partner",
        proposedFee,
        currency: campaign.budget?.currency || "INR",
        pitch,
        portfolioSamples: sampleLink ? [sampleLink] : [],
      };

      const newApp = await applicationService.applyToCampaign(appPayload);

      if (typeof window !== "undefined") {
        try {
          const existingRaw = localStorage.getItem("valence_client_applications");
          const existing = existingRaw ? JSON.parse(existingRaw) : [];
          const savedApp = newApp || {
            id: `app-${Date.now()}`,
            ...appPayload,
            status: "pending",
            createdAt: new Date().toISOString(),
          };
          existing.unshift(savedApp);
          localStorage.setItem("valence_client_applications", JSON.stringify(existing));
        } catch {}
      }

      setIsApplyModalOpen(false);
      addToast({
        type: "success",
        title: "Proposal Submitted",
        message: "The sponsor brand has been notified with your creative pitch!",
      });
    } catch (err: any) {
      if (err.report) {
        setEligibilityReport(err.report);
      }
      addToast({
        type: "error",
        title: "Application Blocked",
        message: err.message || "Failed to submit proposal due to eligibility requirements",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center bg-[#FAFAFC] dark:bg-[#07070B] text-[#0B0A14] dark:text-[#F4F4F8] min-h-screen flex items-center justify-center">
        <CreativeLoader
          size="lg"
          label="Loading Campaign Brief"
          subtext="Decrypting deliverables and escrow allocations..."
        />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#FAFAFC] dark:bg-[#07070B] text-[#0B0A14] dark:text-[#F4F4F8] min-h-screen">
        <h2 className="text-2xl font-bold font-display text-[#0B0A14] dark:text-white">Campaign brief not found</h2>
        <Link href="/campaigns">
          <button className="px-6 py-2.5 rounded-full bg-white dark:bg-[#14141E] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0B0A14] dark:text-white hover:bg-[#F5F5F9] dark:hover:bg-[#1C1C28] cursor-pointer">
            Back to Campaigns
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-12 lg:py-16 bg-[#FAFAFC] dark:bg-[#07070B] text-[#0B0A14] dark:text-[#F4F4F8] min-h-screen">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Campaign Master Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 overflow-hidden shadow-xs">
          {/* Banner Hero */}
          <div className="relative min-h-[300px] sm:h-80 w-full bg-[#F5F5F9] dark:bg-[#181824] flex flex-col justify-between">
            <SafeImage
              src={campaign.coverImage}
              alt={campaign.title}
              fallbackType="campaign"
              fallbackName={campaign.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <CategoryBadge category={campaign.category} size="sm" showIcon={true} />

              <div className="flex items-center gap-2">
                <MatchScoreBadge score={94} size="md" />
              </div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white/90 dark:bg-[#181824]/90 border border-white dark:border-white/20 shrink-0 shadow-xs backdrop-blur-md">
                  <SafeImage
                    src={campaign.brand.logoUrl}
                    alt={campaign.brand.companyName}
                    fallbackType="brand"
                    fallbackName={campaign.brand.companyName}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md inline-flex items-center justify-center border border-white/25 text-white shrink-0">
                      <TitleIcon title={campaign.title} category={campaign.category} className="w-4 h-4 text-white" />
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display drop-shadow-xs">
                      {campaign.title}
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 font-mono drop-shadow-xs mt-1">
                    By {campaign.brand.companyName} • {campaign.brand.industry}
                  </p>
                </div>
              </div>

              <div className="font-mono text-right shrink-0">
                <span className="text-xs text-white/80 block drop-shadow-xs">Creator Budget</span>
                <span className="text-2xl font-extrabold text-white flex items-center gap-1.5 drop-shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {formatCurrency(campaign.budget.perCreatorBudget, campaign.budget?.currency)}
                </span>
                {campaign.budget?.currency && campaign.budget.currency.toUpperCase() !== displayCurrency.toUpperCase() && (
                  <span className="text-xs text-primary font-semibold block mt-0.5 drop-shadow-xs">
                    {convertAndFormat(campaign.budget.perCreatorBudget, campaign.budget.currency)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Incomplete Profile Alert for Creators */}
          {cannotApplyDueToProfile && (
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-b border-amber-500/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-amber-900 dark:text-amber-200 font-display">
                      {profileStatus.headline} ({profileStatus.score}% Complete)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold uppercase">
                      Pitching Locked
                    </span>
                  </div>
                  <p className="text-amber-800/80 dark:text-amber-300/80 mt-0.5 font-sans leading-relaxed">
                    {profileStatus.unverifiedSocials.length > 0
                      ? `Your connected channels (${profileStatus.unverifiedSocials.map((s) => `${s.platform.toUpperCase()} @${s.handle}`).join(", ")}) must be verified before you can apply to campaigns.`
                      : "You cannot apply to campaigns until your profile details (bio, rates, category, avatar) are completed and channels are connected."}
                  </p>
                </div>
              </div>
              <Link
                href="/app/profile"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:from-accent hover:to-primary text-white font-extrabold text-xs transition-colors shrink-0 shadow-xs border border-black/10 cursor-pointer"
              >
                <span>Complete Profile First</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Quick Action Bar */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/8 dark:border-white/10 bg-white dark:bg-[#12121A]">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#6A6A78] dark:text-[#9A9AA8] font-mono">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0B0A14] dark:text-accent" />
                <span>
                  {campaign.acceptedCount}/{campaign.maxCreators} Creators Accepted
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0B0A14] dark:text-accent" />
                <span>Content Due: {campaign.timeline.contentSubmissionDeadline}</span>
              </div>
            </div>

            {cannotApplyDueToProfile ? (
              <Link href="/app/profile" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                >
                  <Lock className="w-4 h-4" />
                  <span>First: Complete Profile to Apply</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:from-accent hover:to-primary text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_14px_rgba(var(--theme-primary-rgb),0.4)] border border-black/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pitch Creative Angle &amp; Apply</span>
                <ArrowRight className="w-4 h-4 text-[#0B0A14]" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Section: Brief Description & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Brief Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B0A14] dark:text-white font-display">Campaign Brief &amp; Direction</h2>
              <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#9A9AA8] leading-relaxed whitespace-pre-line font-sans font-medium">
                {campaign.description}
              </p>

              <div className="pt-4 border-t border-black/8 dark:border-white/10">
                <h3 className="text-sm font-bold text-[#0B0A14] dark:text-white mb-3 font-display">Required Deliverables</h3>
                <div className="space-y-3">
                  {campaign.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/5 dark:border-white/10 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DeliverableBadge type={del.type} />
                          <span className="text-xs font-mono font-bold text-[#0B0A14] dark:text-white uppercase">
                            × {del.count}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-white dark:bg-[#202030] border border-black/8 dark:border-white/10 text-[#6A6A78] dark:text-[#9A9AA8] text-[10px] font-mono font-bold">
                          Max {del.maxRevisions} Revisions
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA8] font-sans">{del.guidelines}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Requirements & Escrow terms */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#0B0A14] dark:text-white uppercase tracking-wider font-mono">
                Creator Criteria
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#6A6A78] dark:text-[#8E8EA4]">
                  <span>Min Followers:</span>
                  <span className="font-bold text-[#0B0A14] dark:text-white">{formatNumber(campaign.creatorRequirements.minFollowers)}</span>
                </div>
                <div className="flex justify-between text-[#6A6A78] dark:text-[#8E8EA4]">
                  <span>Min Engagement:</span>
                  <span className="font-bold text-[#0B0A14] dark:text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {campaign.creatorRequirements.minEngagementRate}%
                  </span>
                </div>
                <div className="flex justify-between text-[#6A6A78] dark:text-[#8E8EA4]">
                  <span>Target Geographies:</span>
                  <span className="font-bold text-[#0B0A14] dark:text-white">{campaign.targetAudience.locations.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#F8F8FC] dark:bg-[#14141E] border border-black/8 dark:border-white/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0B0A14] dark:text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">Pre-Funded Escrow Pool</h4>
                <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA8] mt-1 leading-relaxed font-sans font-medium">
                  The brand has deposited 100% of this campaign budget in escrow. Funds are guaranteed upon milestone approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Pitch Modal with Pre-Flight Verification */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Submit Campaign Proposal"
        description={`Pitch your angle to ${campaign.brand.companyName}`}
        maxWidth="2xl"
      >
        <div className="space-y-6">
          {cannotApplyDueToProfile && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 font-display">
                  Profile Details Required Before Pitching
                </h4>
                <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                  {profileStatus.summary} Until all required fields are filled and added social accounts are authenticated, you cannot apply to campaigns.
                </p>
                <Link
                  href="/app/profile"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 hover:underline pt-1"
                >
                  <span>Complete Profile &amp; Verify Channels</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          <PreflightEligibilityAudit
            report={eligibilityReport}
            isLoading={isAuditing}
            onRefresh={() => checkEligibility()}
          />

          <form onSubmit={handleApply} className="space-y-4 text-[#0B0A14] dark:text-[#F4F4F8] pt-2 border-t border-black/8 dark:border-white/10">
            <div>
              <Input
                label={`Proposed Fee (${getCurrencySymbol(campaign.budget?.currency || "INR")} ${campaign.budget?.currency || "INR"})`}
                type="number"
                value={proposedFee}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setProposedFee(val);
                }}
                onBlur={() => checkEligibility(proposedFee)}
                required
                disabled={cannotApplyDueToProfile}
              />
              {campaign.budget?.currency && campaign.budget.currency.toUpperCase() !== displayCurrency.toUpperCase() && proposedFee > 0 && (
                <p className="text-[11px] text-[#7A7A8A] dark:text-[#A0A0B4] font-mono mt-1">
                  Display equivalent: {convertAndFormat(proposedFee, campaign.budget.currency)}
                </p>
              )}
            </div>

            <Textarea
              label="Your Creative Angle & Pitch"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="Explain how you will showcase the product, your hook idea, and why your audience will convert..."
              rows={4}
              required
              disabled={cannotApplyDueToProfile}
            />

            <Input
              label="Sample Work / Previous Sponsorship Link"
              value={sampleLink}
              onChange={(e) => setSampleLink(e.target.value)}
              placeholder="e.g. https://youtube.com/watch?v=... or portfolio URL"
              required
              disabled={cannotApplyDueToProfile}
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isAuditing || cannotApplyDueToProfile || (eligibilityReport && !eligibilityReport.eligible)}
                className={`w-full py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  cannotApplyDueToProfile
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 cursor-not-allowed"
                    : eligibilityReport && !eligibilityReport.eligible
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:from-accent hover:to-primary text-white shadow-[0_4px_14px_rgba(var(--theme-primary-rgb),0.4)] border border-black/10 active:scale-98 cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  "Submitting Application..."
                ) : cannotApplyDueToProfile ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>First Complete Profile to Unlock Pitching</span>
                  </>
                ) : eligibilityReport && !eligibilityReport.eligible ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Complete Profile Requirements Above to Apply</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0B0A14]" />
                    <span>Submit Verified Application {eligibilityReport?.score ? `(${eligibilityReport.score}% Fit)` : ""}</span>
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
