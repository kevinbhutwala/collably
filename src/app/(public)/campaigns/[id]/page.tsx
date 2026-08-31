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
  ArrowUpRight,
} from "lucide-react";

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params.id as string;
  const { currentCreator, role } = useAuthStore();
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
      await applicationService.submitApplication({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        brandId: campaign.brand.id,
        brandName: campaign.brand.companyName,
        brandLogo: campaign.brand.logoUrl,
        creatorId: currentCreator?.id || "creator-1",
        proposedFee,
        pitch: pitch || "Excited to collaborate! My audience in AI & Tech matches your core customer persona perfectly.",
        estimatedReach: currentCreator?.totalFollowers || 485000,
        sampleLinks: [sampleLink],
      });

      addToast({
        type: "success",
        title: "Proposal Submitted",
        message: "Your application has been delivered to the brand marketing team.",
      });
      setIsApplyModalOpen(false);
    } catch (e) {
      addToast({
        type: "error",
        title: "Application Failed",
        message: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center bg-white min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="py-32 text-center space-y-4 bg-white min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900">Campaign brief not found</h2>
        <Link href="/campaigns">
          <Button variant="secondary" size="md">
            Back to Campaigns
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Campaign Master Card */}
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-card">
          {/* Banner Hero */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-100">
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
              <Badge variant="glow" size="md">
                {campaign.category}
              </Badge>

              <div className="flex items-center gap-2">
                <MatchScoreBadge score={94} size="md" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white border-2 border-white/80 shrink-0 shadow-sm">
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
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {campaign.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono">
                    By {campaign.brand.companyName} • {campaign.brand.industry}
                  </p>
                </div>
              </div>

              <div className="font-mono text-right shrink-0">
                <span className="text-xs text-slate-300 block">Creator Budget</span>
                <span className="text-2xl font-extrabold text-emerald-400">
                  {formatCurrency(campaign.budget.perCreatorBudget)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-6 text-xs text-slate-600 font-mono">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span>
                  {campaign.acceptedCount}/{campaign.maxCreators} Creators Accepted
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Content Due: {campaign.timeline.contentSubmissionDeadline}</span>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              onClick={() => setIsApplyModalOpen(true)}
              rightIcon={<ArrowUpRight className="w-5 h-5" />}
              className="shadow-md shadow-brand-accent/20"
            >
              Pitch Creative Angle & Apply
            </Button>
          </div>
        </div>

        {/* 2-Column Section: Brief Description & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Brief Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Campaign Brief & Direction</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {campaign.description}
              </p>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Required Deliverables</h3>
                <div className="space-y-3">
                  {campaign.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-brand-accent uppercase">
                          {del.count}x {del.type}
                        </span>
                        <Badge variant="outline" size="sm">Max {del.maxRevisions} Revisions</Badge>
                      </div>
                      <p className="text-xs text-slate-600">{del.guidelines}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Requirements & Escrow terms */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Creator Criteria
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Min Followers:</span>
                  <span className="font-bold text-slate-900">{formatNumber(campaign.creatorRequirements.minFollowers)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Min Engagement:</span>
                  <span className="font-bold text-emerald-600">{campaign.creatorRequirements.minEngagementRate}%</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Target Geographies:</span>
                  <span className="font-bold text-slate-900">{campaign.targetAudience.locations.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">Pre-Funded Escrow Pool</h4>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
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
        <form onSubmit={handleApply} className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs">
            <span className="text-slate-700">Need inspiration for your pitch?</span>
            <Button
              type="button"
              variant="accent"
              size="sm"
              onClick={() => setIsAiPitchOpen(true)}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
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
              variant="accent"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              className="w-full"
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
