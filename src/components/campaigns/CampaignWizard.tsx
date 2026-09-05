"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { aiService } from "@/services/ai.service";
import { campaignService } from "@/services/campaign.service";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { CATEGORIES } from "@/core/constants";
import { CreatorCategory, DeliverableType } from "@/core/types";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Wand2,
  ShieldCheck,
  Globe,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/core/utils/formatters";

const GEOGRAPHY_OPTIONS = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "United Arab Emirates",
  "Brazil",
  "Spain",
  "Italy",
  "Netherlands",
  "Global / Worldwide",
];

const AGE_BRACKET_OPTIONS = [
  "13-17 (Gen Z Early)",
  "18-24 (Gen Z Core)",
  "25-34 (Millennials Prime)",
  "35-44 (Mid-Career)",
  "45-54 (Gen X)",
  "55+ (Seniors & Boomers)",
  "All Age Demographics",
];

const PLATFORM_OPTIONS = [
  { label: "YouTube (Dedicated & Integrations)", value: "youtube" },
  { label: "Instagram (Reels & Stories)", value: "instagram" },
  { label: "TikTok (Short-Form Viral)", value: "tiktok" },
  { label: "X / Twitter (Threads & Product Demos)", value: "twitter" },
  { label: "LinkedIn (B2B Thought Leadership)", value: "linkedin" },
  { label: "Twitch (Live Streams & Overlays)", value: "twitch" },
];

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
    targetAgeRanges: ["18-24 (Gen Z Core)", "25-34 (Millennials Prime)"],
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
    if (!aiPrompt.trim()) {
      addToast({
        type: "error",
        title: "Prompt Required",
        message: "Please describe your product or campaign goal to generate a brief.",
      });
      return;
    }

    setIsAiGenerating(true);
    try {
      const generated = await aiService.generateCampaignBrief({
        productName: aiPrompt,
        industry: formData.category,
        budget: formData.totalBudget,
        targetAudience: "Tech Enthusiasts & Developers",
        goals: ["Brand Awareness", "Conversions"],
      });

      setFormData((prev) => ({
        ...prev,
        title: generated.title || prev.title,
        tagline: generated.tagline || prev.tagline,
        description: generated.description || prev.description,
      }));

      addToast({
        type: "success",
        title: "AI Brief Generated",
        message: "Brief title, tagline, and creative guidelines have been pre-filled.",
      });
    } catch {
      addToast({
        type: "error",
        title: "Generation Failed",
        message: "Could not generate brief with AI. Please fill in manually.",
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const created = await campaignService.createCampaign({
        brandId: currentBrand?.id || "brand-1",
        brandName: currentBrand?.companyName || "Linear Dynamics",
        brandLogo: currentBrand?.logoUrl || "",
        title: formData.title || "Untitled Campaign",
        tagline: formData.tagline || "Creator Collaboration Brief",
        description: formData.description || "Detailed brief guidelines.",
        category: formData.category,
        coverImage: formData.coverImage,
        targetAudience: {
          locations: formData.targetCountries,
          ageRanges: formData.targetAgeRanges,
          gender: "All",
          interests: ["Tech", "Productivity"],
        },
        creatorRequirements: {
          minFollowers: formData.minFollowers,
          minEngagementRate: formData.minEngagementRate,
          platforms: formData.platforms as any,
          languages: ["English"],
          preferredTiers: ["Mid-Tier", "Macro"],
        },
        deliverables: formData.deliverables,
        budget: {
          totalBudget: formData.totalBudget,
          perCreatorBudget: formData.perCreatorBudget,
          currency: "USD",
          paymentTerms: "100_escrow_on_approval",
        },
        timeline: {
          applicationDeadline: formData.applicationDeadline,
          startDate: "2026-09-15",
          contentSubmissionDeadline: formData.contentSubmissionDeadline,
          campaignEndDate: formData.campaignLiveDate,
        },
        maxCreators: formData.maxCreators,
      });

      addToast({
        type: "success",
        title: "Campaign Brief Published",
        message: "Escrow deposit pre-authorized. Creators can now apply.",
      });

      router.push(`/campaigns/${created.id}`);
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Publish Failed",
        message: err.message || "Failed to publish campaign brief.",
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
    <div className="max-w-4xl mx-auto space-y-8 text-[#0A0A0E]">
      {/* Wizard Step Indicator */}
      <div className="p-6 rounded-3xl bg-white border border-black/8 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pb-2">
          {stepsMeta.map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isCompleted
                      ? "bg-black text-white"
                      : isCurrent
                      ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs"
                      : "bg-[#F8F8FC] text-[#6A6A78] border border-black/5"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD21F]" /> : s.num}
                </div>
                <span
                  className={`text-xs font-semibold font-display ${
                    isCurrent ? "text-[#0A0A0E] font-bold" : "text-[#6A6A78]"
                  }`}
                >
                  {s.title}
                </span>
                {s.num < 7 && <span className="text-black/20 ml-2">/</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/8 shadow-xs space-y-8 text-[#0A0A0E]">
        {/* STEP 1: BASICS */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">Campaign Overview &amp; Basics</h2>
              <p className="text-xs text-[#5A5A68] mt-1 font-sans font-medium">
                Enter your campaign title and category, or use the AI Assistant to generate a complete brief.
              </p>
            </div>

            {/* AI Assistant Quick Tool */}
            <div className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-3">
              <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-xs font-mono">
                <Wand2 className="w-4 h-4 text-[#0A0A0E]" />
                <span>AI Brief Generator</span>
              </div>
              <p className="text-xs text-[#5A5A68] font-sans">
                Describe what product or feature you are launching in plain English:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Launching our new high-speed developer terminal for engineering teams..."
                  className="flex-1 bg-white border border-black/10 rounded-full px-4 py-2 text-xs text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] shadow-xs"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAiGenerate}
                  isLoading={isAiGenerating}
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#0A0A0E]" />}
                  className="rounded-full"
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

              <div className="space-y-1.5 text-left font-sans">
                <label className="text-xs font-semibold text-[#0A0A0E]">Category &amp; Niche</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CreatorCategory })}
                  className="w-full bg-[#F8F8FC] border border-black/10 rounded-xl px-3.5 py-2.5 text-xs text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F] shadow-xs"
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
              <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">Target Audience Demographics</h2>
              <p className="text-xs text-[#5A5A68] mt-1 font-sans font-medium">
                Select target geographies and demographic brackets from the dropdown options below.
              </p>
            </div>

            <div className="space-y-5">
              <MultiSelectDropdown
                label="Target Geographies"
                placeholder="Select target countries or search..."
                options={GEOGRAPHY_OPTIONS}
                selectedValues={formData.targetCountries}
                onChange={(vals) => setFormData({ ...formData, targetCountries: vals })}
                icon={<Globe className="w-4 h-4" />}
                hint="Choose one or multiple countries where you want the creator's audience concentrated."
              />

              <MultiSelectDropdown
                label="Target Age Brackets"
                placeholder="Select target audience age brackets..."
                options={AGE_BRACKET_OPTIONS}
                selectedValues={formData.targetAgeRanges}
                onChange={(vals) => setFormData({ ...formData, targetAgeRanges: vals })}
                icon={<Users className="w-4 h-4" />}
                hint="Choose which audience age demographics are most valuable for this campaign."
              />
            </div>
          </div>
        )}

        {/* STEP 3: CREATOR CRITERIA */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">Creator Eligibility Criteria</h2>
              <p className="text-xs text-[#5A5A68] mt-1 font-sans font-medium">
                Set minimum reach, platform channels, and engagement benchmarks.
              </p>
            </div>

            <div className="space-y-5">
              <MultiSelectDropdown
                label="Target Social Platforms"
                placeholder="Select allowed platforms..."
                options={PLATFORM_OPTIONS}
                selectedValues={formData.platforms}
                onChange={(vals) => setFormData({ ...formData, platforms: vals })}
                hint="Only creators with verified audience telemetry on these channels can apply."
              />

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
          </div>
        )}

        {/* STEP 4: DELIVERABLES */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">Required Deliverable Formats</h2>
              <p className="text-xs text-[#5A5A68] mt-1 font-sans font-medium">
                Specify video assets, formats, and revision allowances.
              </p>
            </div>

            <div className="space-y-4">
              {formData.deliverables.map((del, i) => (
                <div key={del.id} className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#0A0A0E] uppercase">
                      Deliverable #{i + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-black/8 text-[#0A0A0E] font-mono text-[10px] font-bold">
                      {del.type.replace(/_/g, ' ')}
                    </span>
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
              <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">Budget &amp; Escrow Terms</h2>
              <p className="text-xs text-[#5A5A68] mt-1 font-sans font-medium">
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

            <div className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/5 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#0A0A0E] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#0A0A0E] font-display">100% Escrow Protection</h4>
                <p className="text-xs text-[#5A5A68] font-sans font-medium">
                  Your funds are held securely by AbeyCollab and only released when deliverables meet your satisfaction.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: TIMELINE */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">Milestone Deadlines &amp; Cohort Size</h2>
              <p className="text-xs text-[#5A5A68] mt-1 font-sans font-medium">
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
              <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">Final Review &amp; Launch Brief</h2>
              <p className="text-xs text-[#5A5A68] mt-1 font-sans font-medium">
                Verify your brief summary before broadcasting to verified creators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A7A8A] font-mono">TITLE</span>
                <span className="text-sm font-bold text-[#0A0A0E] font-display">{formData.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A7A8A] font-mono">TOTAL ESCROW POOL</span>
                <span className="text-sm font-extrabold font-mono text-[#0A0A0E]">{formatCurrency(formData.totalBudget)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A7A8A] font-mono">TARGET COHORT</span>
                <span className="text-sm font-bold text-[#0A0A0E] font-sans">{formData.maxCreators} Creators</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A7A8A] font-mono">CONTENT DUE</span>
                <span className="text-sm font-bold text-[#0A0A0E] font-sans">{formData.contentSubmissionDeadline}</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="pt-6 border-t border-black/8 flex items-center justify-between">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="rounded-full"
          >
            Previous
          </Button>

          {step < 7 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep((s) => Math.min(7, s + 1))}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#0A0A0E]" />}
              className="rounded-full"
            >
              Continue to Step {step + 1}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handlePublish}
              isLoading={isPublishing}
              rightIcon={<CheckCircle2 className="w-5 h-5 text-[#0A0A0E]" />}
              className="rounded-full"
            >
              Launch Brief &amp; Pre-Authorize Escrow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
