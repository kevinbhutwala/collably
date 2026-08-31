"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { aiService } from "@/services/ai.service";
import { campaignService } from "@/services/campaign.service";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES, PLATFORMS } from "@/core/constants";
import { CreatorCategory, DeliverableType } from "@/core/types";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Wand2,
  ShieldCheck,
  Plus,
  Trash2,
  DollarSign,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/core/utils/formatters";

export function CampaignWizard() {
  const router = useRouter();
  const { currentBrand } = useAuthStore();
  const { addToast } = useUIStore();

  const [step, setStep] = useState(1);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    category: "Technology & AI" as CreatorCategory,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    targetCountries: ["United States", "United Kingdom"],
    targetAgeRanges: ["18-24", "25-34"],
    minFollowers: 25000,
    minEngagementRate: 3.5,
    platforms: ["youtube", "instagram"],
    deliverables: [
      { id: "del-1", type: "YouTube 60s Integration" as DeliverableType, count: 1, guidelines: "60-second integrated sponsorship segment highlighting workflow speeds", specifications: ["4K 60fps", "Clear Audio", "Pinned Link in Comments"], maxRevisions: 2 },
    ],
    totalBudget: 15000,
    perCreatorBudget: 3000,
    escrowDepositPercentage: 100,
    applicationDeadline: "2026-09-15",
    contentSubmissionDeadline: "2026-09-30",
    campaignLiveDate: "2026-10-05",
    maxCreators: 5,
  });

  const [aiPrompt, setAiPrompt] = useState("");

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsAiGenerating(true);
    try {
      const generated = await aiService.generateCampaignBrief(aiPrompt, formData.category);
      setFormData((prev) => ({
        ...prev,
        title: generated.title,
        tagline: generated.tagline,
        description: generated.description,
        totalBudget: generated.suggestedBudget.total,
        perCreatorBudget: generated.suggestedBudget.perCreator,
        deliverables: generated.recommendedDeliverables.map((d, i) => ({
          id: `del-${i + 1}`,
          type: d.type,
          count: d.count,
          guidelines: d.guidelines,
          specifications: ["4K 60fps", "Pinned Link in Comments"],
          maxRevisions: 2,
        })),
      }));
      addToast({
        type: "success",
        title: "AI Brief Generated",
        message: "Your campaign brief and deliverables have been structured by AI.",
      });
    } catch (e) {
      addToast({
        type: "error",
        title: "Generation Failed",
        message: "Please enter more details in your AI prompt.",
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await campaignService.createCampaign({
        ...formData,
        brandId: currentBrand?.id || "brand-1",
      });
      addToast({
        type: "success",
        title: "Campaign Launched with Escrow",
        message: "Your campaign brief is now live and accepting applications!",
      });
      router.push("/app/brand/campaigns");
    } catch (e) {
      addToast({
        type: "error",
        title: "Failed to publish",
        message: "Please verify all required fields.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const stepsMeta = [
    { num: 1, title: "Basics" },
    { num: 2, title: "Audience" },
    { num: 3, title: "Criteria" },
    { num: 4, title: "Deliverables" },
    { num: 5, title: "Budget & Escrow" },
    { num: 6, title: "Timeline" },
    { num: 7, title: "Review" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Step Indicator */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pb-2">
          {stepsMeta.map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                      ? "bg-brand-accent text-white shadow-md shadow-brand-accent/20"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isCurrent ? "text-slate-900 font-bold" : "text-slate-500"
                  }`}
                >
                  {s.title}
                </span>
                {s.num < 7 && <span className="text-slate-200 ml-2">/</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-card space-y-8">
        {/* STEP 1: BASICS */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Campaign Overview & Basics</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your campaign title and category, or use the AI Assistant to generate a complete brief.
              </p>
            </div>

            {/* AI Assistant Quick Tool */}
            <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-3">
              <div className="flex items-center gap-2 text-brand-accent font-bold text-xs">
                <Wand2 className="w-4 h-4" />
                <span>AI Brief Generator</span>
              </div>
              <p className="text-xs text-slate-600">
                Describe what product or feature you are launching in plain English:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Launching our new high-speed developer terminal for engineering teams..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-sm"
                />
                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleAiGenerate}
                  isLoading={isAiGenerating}
                  leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                >
                  Generate Brief
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Campaign Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AI-Powered Sprint Workflows Launch"
                required
              />

              <Input
                label="Tagline / Short Summary"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Engineering speed and focus for modern software teams"
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Category & Niche</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CreatorCategory })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400 shadow-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <Textarea
                label="Comprehensive Brief & Creative Direction"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detail key product talking points, core benefits, visual do's and don'ts..."
                rows={5}
              />
            </div>
          </div>
        )}

        {/* STEP 2: AUDIENCE DEMOGRAPHICS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Target Audience Demographics</h2>
              <p className="text-xs text-slate-500 mt-1">
                Specify who your campaign is designed to reach.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Target Geographies (Comma-separated)"
                value={formData.targetCountries.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetCountries: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />

              <Input
                label="Target Age Brackets (Comma-separated)"
                value={formData.targetAgeRanges.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetAgeRanges: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>
          </div>
        )}

        {/* STEP 3: CREATOR CRITERIA */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Creator Eligibility Criteria</h2>
              <p className="text-xs text-slate-500 mt-1">
                Set minimum reach and engagement benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Minimum Total Follower Reach"
                type="number"
                value={formData.minFollowers}
                onChange={(e) => setFormData({ ...formData, minFollowers: parseInt(e.target.value) || 0 })}
              />

              <Input
                label="Minimum Engagement Rate (%)"
                type="number"
                step="0.1"
                value={formData.minEngagementRate}
                onChange={(e) => setFormData({ ...formData, minEngagementRate: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        )}

        {/* STEP 4: DELIVERABLES */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Required Deliverable Formats</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Specify video assets, formats, and revision allowances.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {formData.deliverables.map((del, i) => (
                <div key={del.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-accent uppercase">
                      Deliverable #{i + 1}
                    </span>
                    <Badge variant="glow" size="sm">{del.type.replace(/_/g, ' ')}</Badge>
                  </div>

                  <Input
                    label="Specific Creative Guidelines"
                    value={del.guidelines}
                    onChange={(e) => {
                      const updated = [...formData.deliverables];
                      updated[i].guidelines = e.target.value;
                      setFormData({ ...formData, deliverables: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: BUDGET & ESCROW */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Budget & Escrow Terms</h2>
              <p className="text-xs text-slate-500 mt-1">
                Configure your total pool and per-creator payout caps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Total Campaign Budget Pool ($ USD)"
                type="number"
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: parseInt(e.target.value) || 0 })}
              />

              <Input
                label="Target Fee Per Creator ($ USD)"
                type="number"
                value={formData.perCreatorBudget}
                onChange={(e) => setFormData({ ...formData, perCreatorBudget: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">100% Escrow Protection</h4>
                <p className="text-xs text-emerald-700">
                  Your funds are held securely by NEXUS and only released when deliverables meet your satisfaction.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: TIMELINE */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Milestone Deadlines & Cohort Size</h2>
              <p className="text-xs text-slate-500 mt-1">
                Set key dates for creator applications, draft submission, and live publication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Applications Close"
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
              />

              <Input
                label="Content Draft Due"
                type="date"
                value={formData.contentSubmissionDeadline}
                onChange={(e) => setFormData({ ...formData, contentSubmissionDeadline: e.target.value })}
              />

              <Input
                label="Campaign Go-Live"
                type="date"
                value={formData.campaignLiveDate}
                onChange={(e) => setFormData({ ...formData, campaignLiveDate: e.target.value })}
              />
            </div>

            <Input
              label="Maximum Creators in Cohort"
              type="number"
              value={formData.maxCreators}
              onChange={(e) => setFormData({ ...formData, maxCreators: parseInt(e.target.value) || 1 })}
            />
          </div>
        )}

        {/* STEP 7: REVIEW & PRE-AUTH */}
        {step === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Final Review & Launch Brief</h2>
              <p className="text-xs text-slate-500 mt-1">
                Verify your brief summary before broadcasting to verified creators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono">TITLE</span>
                <span className="text-sm font-bold text-slate-900">{formData.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono">TOTAL ESCROW POOL</span>
                <span className="text-sm font-bold font-mono text-emerald-600">{formatCurrency(formData.totalBudget)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono">TARGET COHORT</span>
                <span className="text-sm font-bold text-slate-900">{formData.maxCreators} Creators</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono">CONTENT DUE</span>
                <span className="text-sm font-bold text-slate-900">{formData.contentSubmissionDeadline}</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <Button
            variant="outline"
            size="md"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          {step < 7 ? (
            <Button
              variant="accent"
              size="md"
              onClick={() => setStep((s) => Math.min(7, s + 1))}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Step {step + 1}
            </Button>
          ) : (
            <Button
              variant="accent"
              size="lg"
              onClick={handlePublish}
              isLoading={isPublishing}
              rightIcon={<CheckCircle2 className="w-5 h-5" />}
              className="shadow-xl shadow-brand-accent/25"
            >
              Launch Brief & Pre-Authorize Escrow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
