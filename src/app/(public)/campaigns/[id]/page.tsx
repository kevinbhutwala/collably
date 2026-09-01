"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { campaignService } from "@/services/campaign.service";
import { applicationService } from "@/services/application.service";
import { Campaign } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { SafeImage } from "@/components/ui/SafeImage";
import { MatchScoreBadge } from "@/components/ai/MatchScoreBadge";
import { AICreatorPitchModal } from "@/components/ai/AICreatorPitchModal";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import {
  ShieldCheck,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params.id as string;
  const { currentCreator } = useAuthStore();
  const { addToast } = useUIStore();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAiPitchOpen, setIsAiPitchOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Application form
  const [proposedFee, setProposedFee] = useState<number>(3500);
  const [pitch, setPitch] = useState<string>("");
  const [sampleLink, setSampleLink] = useState<string>("https://youtube.com/@elenatech/videos");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await campaignService.getCampaignById(campaignId);
      setCampaign(data || null);
      if (data) setProposedFee(data.budget.perCreatorBudget);
      setLoading(false);
    };
    fetch();
  }, [campaignId]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;
    setIsSubmitting(true);

    try {
      await applicationService.applyToCampaign({
        campaignId: campaign.id,
        creatorId: currentCreator?.id || "creator-1",
        proposedFee,
        pitch,
        portfolioSamples: [sampleLink],
      });

      setIsApplyModalOpen(false);
      addToast({
        type: "success",
        title: "Application Pitched",
        message: "The sponsor team has been notified of your customized pitch.",
      });
    } catch {
      addToast({
        type: "error",
        title: "Pitch Failed",
        message: "Failed to submit proposal. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center bg-[#FAFAF8] text-[#111111] min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-[#111111] border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#FAFAF8] text-[#111111] min-h-screen">
        <h2 className="text-2xl font-bold text-[#111111] font-display">Campaign brief not found</h2>
        <Link href="/campaigns">
          <Button variant="secondary" size="md" className="rounded-[9px]">
            Back to Campaigns
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAF8] text-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Campaign Master Card */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] overflow-hidden shadow-xs">
          {/* Banner Hero */}
          <div className="relative h-64 sm:h-80 w-full bg-[#FAFAF8]">
            <SafeImage
              src={campaign.coverImage}
              alt={campaign.title}
              fallbackType="campaign"
              fallbackName={campaign.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="px-3 py-1 rounded-md bg-[#FFFFFF] text-[#111111] border border-[#E7E7E4] text-xs font-mono font-bold shadow-xs">
                {campaign.category}
              </span>

              <div className="flex items-center gap-2">
                <MatchScoreBadge score={94} size="md" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#E7E7E4] shrink-0 shadow-xs">
                  <SafeImage
                    src={campaign.brand.logoUrl}
                    alt={campaign.brand.companyName}
                    fallbackType="brand"
                    fallbackName={campaign.brand.companyName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight font-display">
                    {campaign.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#FAFAF8]/80 font-mono">
                    By {campaign.brand.companyName} • {campaign.brand.industry}
                  </p>
                </div>
              </div>

              <div className="font-mono text-right shrink-0">
                <span className="text-xs text-[#FAFAF8]/80 block">Creator Budget</span>
                <span className="text-2xl font-extrabold text-[#FFFFFF] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
                  {formatCurrency(campaign.budget.perCreatorBudget)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E7E4] bg-[#FFFFFF]">
            <div className="flex items-center gap-6 text-xs text-[#6B6B6B] font-mono">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#111111]" />
                <span>
                  {campaign.acceptedCount}/{campaign.maxCreators} Creators Accepted
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#111111]" />
                <span>Content Due: {campaign.timeline.contentSubmissionDeadline}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsApplyModalOpen(true)}
              rightIcon={<ArrowRight className="w-5 h-5 text-[#B7FF3C]" />}
              className="rounded-[9px]"
            >
              Pitch Creative Angle &amp; Apply
            </Button>
          </div>
        </div>

        {/* 2-Column Section: Brief Description & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Brief Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#111111] font-display">Campaign Brief &amp; Direction</h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed whitespace-pre-line font-sans font-medium">
                {campaign.description}
              </p>

              <div className="pt-4 border-t border-[#E7E7E4]">
                <h3 className="text-sm font-bold text-[#111111] mb-3 font-display">Required Deliverables</h3>
                <div className="space-y-3">
                  {campaign.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#111111] uppercase">
                          {del.count}x {del.type}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E7E7E4] text-[#6B6B6B] text-[10px] font-mono font-bold">
                          Max {del.maxRevisions} Revisions
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6B6B] font-sans">{del.guidelines}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Requirements & Escrow terms */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">
                Creator Criteria
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Min Followers:</span>
                  <span className="font-bold text-[#111111]">{formatNumber(campaign.creatorRequirements.minFollowers)}</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Min Engagement:</span>
                  <span className="font-bold text-[#111111] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />{campaign.creatorRequirements.minEngagementRate}%</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Target Geographies:</span>
                  <span className="font-bold text-[#111111]">{campaign.targetAudience.locations.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#111111] font-display">Pre-Funded Escrow Pool</h4>
                <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed font-sans font-medium">
                  The brand has deposited 100% of this campaign budget in escrow. Funds are guaranteed upon milestone approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Pitch Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Submit Campaign Proposal"
        description={`Pitch your angle to ${campaign.brand.companyName}`}
        maxWidth="xl"
      >
        <form onSubmit={handleApply} className="space-y-4 text-[#111111]">
          <div className="flex justify-between items-center p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-xs">
            <span className="text-[#6B6B6B] font-sans">Need inspiration for your pitch?</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAiPitchOpen(true)}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#111111]" />}
              className="rounded-[9px]"
            >
              AI Pitch Assistant
            </Button>
          </div>

          <Input
            label="Proposed Fee ($ USD)"
            type="number"
            value={proposedFee}
            onChange={(e) => setProposedFee(parseInt(e.target.value) || 0)}
            required
          />

          <Textarea
            label="Your Creative Angle & Pitch"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder="Explain how you will showcase the product, your hook idea, and why your audience will convert..."
            rows={4}
            required
          />

          <Input
            label="Sample Work / Previous Sponsorship Link"
            value={sampleLink}
            onChange={(e) => setSampleLink(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              className="w-full rounded-[9px]"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>

      {/* AI Pitch Assistant Modal */}
      <AICreatorPitchModal
        isOpen={isAiPitchOpen}
        onClose={() => setIsAiPitchOpen(false)}
        campaignTitle={campaign.title}
        brandName={campaign.brand.companyName}
        onApplyPitch={(pitchText) => setPitch(pitchText)}
      />
    </div>
  );
}
