"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

import {
  ShieldCheck,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
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
        title: "Proposal Submitted",
        message: "The sponsor brand has been notified with your creative pitch!",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Application Failed",
        message: err.message || "Failed to submit proposal",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center bg-[#FAFAFC] text-[#0A0A0E] min-h-screen flex items-center justify-center">
        <CreativeLoader size="lg" label="Loading Campaign Brief" subtext="Decrypting deliverables and escrow allocations..." />
      </div>
    );
  }


  if (!campaign) {
    return (
      <div className="py-32 text-center space-y-4 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
        <h2 className="text-2xl font-bold font-display">Campaign brief not found</h2>
        <Link href="/campaigns">
          <button className="px-6 py-2.5 rounded-full bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] hover:bg-[#F5F5F9]">
            Back to Campaigns
          </button>
        </Link>
      </div>
    );
  }

  const briefJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: campaign.title,
    description: campaign.description || campaign.tagline,
    datePosted: campaign.timeline?.startDate || new Date().toISOString(),
    validThrough: campaign.timeline?.applicationDeadline || campaign.timeline?.campaignEndDate,
    employmentType: "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: campaign.brand?.companyName || "AbeyCollab Brand Partner",
      sameAs: "https://abeycollab.vercel.app",
      logo: campaign.brand?.logoUrl,
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: campaign.budget?.currency || "USD",
      value: {
        "@type": "QuantitativeValue",
        value: campaign.budget?.perCreatorBudget || campaign.budget?.totalBudget || 0,
        unitText: "PROJECT",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(briefJsonLd) }}
      />
      <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Campaign Master Card */}
          <div className="rounded-3xl bg-white border border-black/8 overflow-hidden shadow-xs">
          {/* Banner Hero */}
          <div className="relative h-64 sm:h-80 w-full bg-[#F5F5F9]">
            <SafeImage
              src={campaign.coverImage}
              alt={campaign.title}
              fallbackType="campaign"
              fallbackName={campaign.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white text-[#0A0A0E] border border-black/10 text-xs font-mono font-bold shadow-xs">
                {campaign.category}
              </span>

              <div className="flex items-center gap-2">
                <MatchScoreBadge score={94} size="md" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white/90 border border-white shrink-0 shadow-xs backdrop-blur-md">
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
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display drop-shadow-xs">
                    {campaign.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/80 font-mono drop-shadow-xs">
                    By {campaign.brand.companyName} • {campaign.brand.industry}
                  </p>
                </div>
              </div>

              <div className="font-mono text-right shrink-0">
                <span className="text-xs text-white/80 block drop-shadow-xs">Creator Budget</span>
                <span className="text-2xl font-extrabold text-white flex items-center gap-1.5 drop-shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
                  {formatCurrency(campaign.budget.perCreatorBudget)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/8 bg-white">
            <div className="flex items-center gap-6 text-xs text-[#6A6A78] font-mono">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0A0A0E]" />
                <span>
                  {campaign.acceptedCount}/{campaign.maxCreators} Creators Accepted
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0A0A0E]" />
                <span>Content Due: {campaign.timeline.contentSubmissionDeadline}</span>
              </div>
            </div>

            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 flex items-center gap-2"
            >
              <span>Pitch Creative Angle &amp; Apply</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
            </button>
          </div>
        </div>

        {/* 2-Column Section: Brief Description & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Brief Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#0A0A0E] font-display">Campaign Brief &amp; Direction</h2>
              <p className="text-sm text-[#5A5A68] leading-relaxed whitespace-pre-line font-sans font-medium">
                {campaign.description}
              </p>

              <div className="pt-4 border-t border-black/8">
                <h3 className="text-sm font-bold text-[#0A0A0E] mb-3 font-display">Required Deliverables</h3>
                <div className="space-y-3">
                  {campaign.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#0A0A0E] uppercase">
                          {del.count}x {del.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-black/8 text-[#6A6A78] text-[10px] font-mono font-bold">
                          Max {del.maxRevisions} Revisions
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5A68] font-sans">{del.guidelines}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Requirements & Escrow terms */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#0A0A0E] uppercase tracking-wider font-mono">
                Creator Criteria
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Min Followers:</span>
                  <span className="font-bold text-[#0A0A0E]">{formatNumber(campaign.creatorRequirements.minFollowers)}</span>
                </div>
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Min Engagement:</span>
                  <span className="font-bold text-[#0A0A0E] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
                    {campaign.creatorRequirements.minEngagementRate}%
                  </span>
                </div>
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Target Geographies:</span>
                  <span className="font-bold text-[#0A0A0E]">{campaign.targetAudience.locations.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8F8FC] border border-black/8 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0A0A0E] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#0A0A0E] font-display">Pre-Funded Escrow Pool</h4>
                <p className="text-xs text-[#5A5A68] mt-1 leading-relaxed font-sans font-medium">
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
        <form onSubmit={handleApply} className="space-y-4 text-[#0A0A0E]">
          <div className="flex justify-between items-center p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 text-xs">
            <span className="text-[#6A6A78] font-sans">Need inspiration for your pitch?</span>
            <button
              type="button"
              onClick={() => setIsAiPitchOpen(true)}
              className="px-3 py-1.5 rounded-full bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] hover:bg-black/5 flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              <span>AI Pitch Assistant</span>
            </button>
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
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
    </>
  );
}
