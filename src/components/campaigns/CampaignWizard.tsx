"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { aiService } from "@/services/ai.service";
import { campaignService } from "@/services/campaign.service";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CATEGORIES } from "@/core/constants";
import { CreatorCategory, DeliverableType, Campaign } from "@/core/types";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Wand2,
  ShieldCheck,
  Globe,
  Users,
  Layers,
  Plus,
  Trash2,
  Building2,
  Calendar,
  DollarSign,
  Check,
  Lock,
  Clapperboard,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Info,
} from "lucide-react";
import { formatCurrency } from "@/core/utils/formatters";
import {
  PRIMARY_CURRENCY_LIST,
  getCurrencySymbol,
  SupportedCurrency,
} from "@/core/utils/currency";

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

const PRESET_COVERS = [
  {
    name: "Clean Nutrition & Fitness",
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Streetwear & Fashion",
    url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Studio Minimal Dark",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Tech & Productivity",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Vibrant Creator Neon",
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
  },
];

const DELIVERABLE_TYPE_OPTIONS: { label: string; value: DeliverableType; defaultSpecs: string[] }[] = [
  { label: "YouTube 60s Integration", value: "YouTube 60s Integration", defaultSpecs: ["4K 60fps", "Pinned Top Link", "60s Sponsor Segment"] },
  { label: "YouTube Dedicated Video", value: "YouTube Dedicated Video", defaultSpecs: ["4K 60fps", "8-12 Min Length", "Description Link"] },
  { label: "Instagram Reel", value: "Instagram Reel", defaultSpecs: ["9:16 Vertical", "Co-Author Tag", "Audio Sync"] },
  { label: "TikTok Video", value: "TikTok Video", defaultSpecs: ["9:16 Vertical", "Link in Bio", "Brand Hashtag"] },
  { label: "X (Twitter) Thread", value: "X (Twitter) Thread", defaultSpecs: ["5-Post Thread", "Visual Cards", "Product Demo GIF"] },
  { label: "Instagram Story Set (3x)", value: "Instagram Story Set (3x)", defaultSpecs: ["3 Linked Stories", "Swipe-up / Sticker Link"] },
  { label: "UGC Video Ad", value: "UGC Video Ad", defaultSpecs: ["Raw 4K Footage", "3 Hook Variations", "Paid Ad Usage Rights"] },
];

const CURRENCY_PRESETS: Record<string, { total: number[]; perCreator: number[] }> = {
  INR: {
    total: [50000, 150000, 350000, 1000000],
    perCreator: [10000, 25000, 50000, 100000],
  },
  USD: {
    total: [2500, 7500, 15000, 50000],
    perCreator: [500, 1500, 3000, 5000],
  },
  EUR: {
    total: [2500, 7500, 15000, 50000],
    perCreator: [500, 1500, 3000, 5000],
  },
  GBP: {
    total: [2000, 6000, 12000, 40000],
    perCreator: [400, 1200, 2500, 4000],
  },
  AED: {
    total: [10000, 30000, 60000, 200000],
    perCreator: [2000, 5000, 10000, 20000],
  },
};

export function CampaignWizard() {
  const router = useRouter();
  const { currentBrand } = useAuthStore();
  const { addToast, selectedCurrency } = useUIStore();
  const { getQuota, openUpgradeModal, currentPlan } = useSubscriptionStore();
  const campaignQuota = getQuota("activeCampaigns");

  const [step, setStep] = useState(1);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showAiCard, setShowAiCard] = useState(true);
  const [aiPrompt, setAiPrompt] = useState("");
  const [previewTab, setPreviewTab] = useState<"card" | "specs">("card");

  // Form state initialized with authentic defaults
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    category: (currentBrand?.industry || "Fitness & Health Nutrition") as CreatorCategory,
    coverImage: PRESET_COVERS[0].url,
    targetCountries: ["India", "United States"],
    targetAgeRanges: ["18-24 (Gen Z Core)", "25-34 (Millennials Prime)"],
    minFollowers: 25000,
    minEngagementRate: 3.5,
    platforms: ["youtube", "instagram"],
    deliverables: [
      {
        id: "del-1",
        type: "YouTube 60s Integration" as DeliverableType,
        count: 1,
        guidelines: "60-second integrated sponsorship segment highlighting authentic product benefits.",
        specifications: ["4K 60fps", "Clear Audio", "Pinned Link in Comments"],
        maxRevisions: 2,
      },
    ],
    currency: (selectedCurrency === "INR" ? "INR" : "USD") as SupportedCurrency,
    totalBudget: selectedCurrency === "INR" ? 350000 : 15000,
    perCreatorBudget: selectedCurrency === "INR" ? 50000 : 3000,
    escrowDepositPercentage: 100,
    applicationDeadline: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
    contentSubmissionDeadline: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    campaignLiveDate: new Date(Date.now() + 45 * 86400000).toISOString().split("T")[0],
    maxCreators: 5,
  });

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
        targetAudience: formData.targetAgeRanges.join(", "),
        goals: ["Brand Awareness", "Conversions", "Authentic Narrative"],
      });

      setFormData((prev) => ({
        ...prev,
        title: generated.title || prev.title,
        tagline: generated.tagline || prev.tagline,
        description: generated.description || prev.description,
        category: (generated.category as CreatorCategory) || prev.category,
      }));

      addToast({
        type: "success",
        title: "AI Brief Generated",
        message: "Brief title, tagline, and creative guidelines have been pre-filled.",
      });
    } catch {
      // Deterministic graceful fallback
      setFormData((prev) => ({
        ...prev,
        title: `${aiPrompt.trim()} Creator Spotlight`,
        tagline: `Accelerate reach and engagement for ${aiPrompt.trim()} with top-tier narrative storytelling.`,
        description: `Campaign Objective: Highlight the unique differentiator for ${aiPrompt.trim()}.\n\nCreative Guidelines:\n• Showcase real-world unboxing and product application.\n• Emphasize transparency, quality ingredients, and performance.\n• Maintain creator's authentic tone; do not sound like a generic script.`,
      }));
      addToast({
        type: "success",
        title: "Brief Pre-filled",
        message: "Structured guidelines drafted for your campaign brief.",
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAddDeliverable = (type: DeliverableType) => {
    const option = DELIVERABLE_TYPE_OPTIONS.find((o) => o.value === type);
    const newDeliverable = {
      id: `del-${Date.now()}`,
      type,
      count: 1,
      guidelines: `Authentic ${type} delivery showcasing product integration with pinned tracking link.`,
      specifications: option ? [...option.defaultSpecs] : ["HD / 4K Resolution"],
      maxRevisions: 2,
    };
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, newDeliverable],
    }));
  };

  const handleRemoveDeliverable = (id: string) => {
    if (formData.deliverables.length <= 1) {
      addToast({
        type: "warning",
        title: "Minimum Required",
        message: "A campaign brief must have at least one required deliverable.",
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((d) => d.id !== id),
    }));
  };

  const handlePublish = async () => {
    if (!campaignQuota.allowed) {
      addToast({
        type: "error",
        title: "Active Campaign Limit Reached",
        message: `Your ${currentPlan?.name || "current tier"} allows up to ${campaignQuota.limit} active briefs. Upgrade your workspace plan to publish more briefs.`,
      });
      openUpgradeModal("brand_growth");
      return;
    }

    if (!formData.title.trim()) {
      setStep(1);
      addToast({
        type: "error",
        title: "Title Required",
        message: "Please enter a campaign brief title before publishing.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const created = await campaignService.createCampaign({
        brandId: currentBrand?.id || "brand-1",
        brandName: currentBrand?.companyName || "The Whole Truth Foods",
        brandLogo: currentBrand?.logoUrl || "/brands/whole-truth.svg",
        title: formData.title,
        tagline: formData.tagline || "Verified Creator Partnership Brief",
        description: formData.description || "Detailed creative direction and asset guidelines.",
        category: formData.category,
        coverImage: formData.coverImage,
        targetAudience: {
          locations: formData.targetCountries,
          ageRanges: formData.targetAgeRanges,
          gender: "All",
          interests: ["Fitness", "Health", "Lifestyle"],
        },
        creatorRequirements: {
          minFollowers: formData.minFollowers,
          minEngagementRate: formData.minEngagementRate,
          platforms: formData.platforms as any,
          languages: ["English", "Hindi"],
          preferredTiers: ["Mid-Tier", "Macro"],
        },
        deliverables: formData.deliverables,
        budget: {
          totalBudget: formData.totalBudget,
          perCreatorBudget: formData.perCreatorBudget,
          currency: formData.currency,
          paymentTerms: "100_escrow_on_approval",
        },
        timeline: {
          applicationDeadline: formData.applicationDeadline,
          startDate: new Date().toISOString().split("T")[0],
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

      if (typeof window !== "undefined" && created) {
        try {
          localStorage.setItem(`campaign_${created.id}`, JSON.stringify(created));
          localStorage.setItem("last_created_campaign", JSON.stringify(created));
        } catch {}
      }

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
    { num: 1, title: "Basics", icon: Sparkles },
    { num: 2, title: "Audience", icon: Globe },
    { num: 3, title: "Criteria", icon: Users },
    { num: 4, title: "Deliverables", icon: Clapperboard },
    { num: 5, title: "Budget & Escrow", icon: DollarSign },
    { num: 6, title: "Timeline", icon: Calendar },
    { num: 7, title: "Review & Launch", icon: CheckCircle2 },
  ];

  const presets = CURRENCY_PRESETS[formData.currency] || CURRENCY_PRESETS.USD;
  const estimatedSlots = Math.max(1, Math.floor(formData.totalBudget / (formData.perCreatorBudget || 1)));

  // Constructed Preview Campaign for Step 7
  const previewCampaign: Campaign = {
    id: "preview-brief",
    brandId: currentBrand?.id || "brand-1",
    brand: (currentBrand || {
      id: "brand-1",
      companyName: "The Whole Truth Foods",
      verified: true,
      logoUrl: "/brands/whole-truth.svg",
      industry: formData.category,
      location: "Mumbai, India",
      companySize: "51-200",
      tier: "tier_1",
      totalSpent: 350000,
      activeCampaignsCount: 2,
      createdAt: new Date().toISOString(),
    }) as any,
    title: formData.title || "The Whole Truth: Zero-Sugar Dark Chocolate Launch",
    tagline: formData.tagline || "Clean-label transparency meets uncompromising taste.",
    description: formData.description || "Detailed creative guidelines...",
    category: formData.category,
    coverImage: formData.coverImage,
    targetAudience: {
      locations: formData.targetCountries,
      ageRanges: formData.targetAgeRanges,
      gender: "All",
      interests: ["Fitness", "Nutrition", "Lifestyle"],
    },
    creatorRequirements: {
      minFollowers: formData.minFollowers,
      minEngagementRate: formData.minEngagementRate,
      platforms: formData.platforms as any,
      languages: ["English"],
      preferredTiers: ["Mid-Tier"],
    },
    deliverables: formData.deliverables,
    budget: {
      totalBudget: formData.totalBudget,
      perCreatorBudget: formData.perCreatorBudget,
      currency: formData.currency,
      paymentTerms: "100_escrow_on_approval",
    },
    timeline: {
      applicationDeadline: formData.applicationDeadline,
      startDate: new Date().toISOString().split("T")[0],
      contentSubmissionDeadline: formData.contentSubmissionDeadline,
      campaignEndDate: formData.campaignLiveDate,
    },
    maxCreators: formData.maxCreators,
    acceptedCount: 0,
    applicantsCount: 0,
    featured: true,
    slug: "preview-brief",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] pb-28 sm:pb-12">
      {/* ── 1. Studio Header & Brand Identification ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD21F] to-[#FFE052] p-0.5 shrink-0 shadow-xs flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#161622] flex items-center justify-center overflow-hidden">
              {currentBrand?.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentBrand.logoUrl}
                  alt={currentBrand.companyName}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <Building2 className="w-5 h-5 text-[#0A0A0E] dark:text-[#FFD21F]" />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8A7000] dark:text-[#FFD21F] bg-[#FFD21F]/15 px-2 py-0.5 rounded-full">
                Sponsorship Brief Studio
              </span>
              <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                • 100% Escrow Collateralized
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-[#0A0A0E] dark:text-white font-display">
              Post a Campaign Brief
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-[11px] text-[#5A5A68] dark:text-[#9A9AA6] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Brief Quota: {campaignQuota.current}/{campaignQuota.limit}</span>
          </div>
        </div>
      </div>

      {/* Plan Quota Alert if at limit */}
      {!campaignQuota.allowed && (
        <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#1A1A28] border-2 border-[#FFD21F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFD21F]" />
              <span>Active Campaign Brief Limit Reached ({campaignQuota.current}/{campaignQuota.limit} briefs)</span>
            </h4>
            <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4]">
              Your {currentPlan?.name || "current plan"} allows up to {campaignQuota.limit} active campaigns. Upgrade to Brand Growth to publish more.
            </p>
          </div>
          <button
            onClick={() => openUpgradeModal("brand_growth")}
            className="px-4 py-2 rounded-full bg-[#FFD21F] hover:bg-[#FFE052] text-[#0A0A0E] text-xs font-bold font-mono transition-all shadow-xs shrink-0 self-start sm:self-center cursor-pointer"
          >
            Upgrade Plan
          </button>
        </div>
      )}

      {/* ── 2. Responsive Step Navigation Bar ── */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-3">
        {/* Mobile Header: Step X of 7 + Progress Bar */}
        <div className="block sm:hidden space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center text-[11px] font-black font-mono">
                {step}
              </span>
              <span>Step {step} of 7: {stepsMeta[step - 1].title}</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {Math.round((step / 7) * 100)}% Complete
            </span>
          </div>

          {/* Progress track */}
          <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] rounded-full transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>

          {/* Touch-Friendly Step Chips on Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
            {stepsMeta.map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(s.num)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                    isCurrent
                      ? "bg-[#FFD21F] text-[#0A0A0E] shadow-2xs font-black"
                      : isCompleted
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-black/5 dark:bg-white/5 text-neutral-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : s.num}
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tablet & Desktop Horizontal Interactive Stepper */}
        <div className="hidden sm:flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
          {stepsMeta.map((s, idx) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            const Icon = s.icon;

            return (
              <React.Fragment key={s.num}>
                <button
                  type="button"
                  onClick={() => setStep(s.num)}
                  className={`flex items-center gap-2 p-2 rounded-xl transition-all cursor-pointer group shrink-0 ${
                    isCurrent
                      ? "bg-black/5 dark:bg-white/5"
                      : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      isCompleted
                        ? "bg-emerald-500 text-white shadow-2xs"
                        : isCurrent
                        ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-black ring-2 ring-[#FFD21F]/30"
                        : "bg-black/5 dark:bg-white/10 text-neutral-400 group-hover:text-neutral-600"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <div className="text-left">
                    <span
                      className={`text-xs block font-bold font-display leading-tight ${
                        isCurrent
                          ? "text-[#0A0A0E] dark:text-white"
                          : isCompleted
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-neutral-400"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                </button>

                {idx < stepsMeta.length - 1 && (
                  <div className="w-4 h-px bg-black/10 dark:bg-white/10 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── 3. Main Form Canvas ── */}
      <div className="p-5 sm:p-7 md:p-8 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8]">
        {/* STEP 1: BASICS & CREATIVE BRIEF */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7000] dark:text-[#FFD21F] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Step 1: Campaign Overview &amp; Basics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display mt-1">
                Tell Creators What You&apos;re Building
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Set the foundational identity, category, creative direction, and campaign artwork.
              </p>
            </div>

            {/* AI Brief Co-Pilot Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FFFDF5] via-white to-[#FFFBE8] dark:from-[#181824] dark:via-[#161622] dark:to-[#1A1828] border border-[#FFD21F]/40 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center shrink-0">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-1.5">
                      <span>AI Brief Co-Pilot</span>
                      <span className="text-[10px] font-mono uppercase bg-[#FFD21F]/20 text-[#8A7000] dark:text-[#FFD21F] px-1.5 py-0.2 rounded font-extrabold">
                        Instant Draft
                      </span>
                    </h3>
                    <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                      Describe your product or goal in plain words, and our LLM will compose your full brief.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAiCard(!showAiCard)}
                  className="text-xs font-mono text-neutral-400 hover:text-[#0A0A0E] dark:hover:text-white cursor-pointer"
                >
                  {showAiCard ? "Hide" : "Show"}
                </button>
              </div>

              {showAiCard && (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g. Clean-label Whey Protein launch targeting gym enthusiasts..."
                      className="flex-1 bg-white dark:bg-[#12121A] border border-black/12 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAiGenerate();
                        }
                      }}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAiGenerate}
                      isLoading={isAiGenerating}
                      leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#0A0A0E]" />}
                      className="rounded-xl font-bold cursor-pointer shrink-0"
                    >
                      Generate Brief with AI
                    </Button>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">Try prompt:</span>
                    {[
                      "The Whole Truth Protein Isolate",
                      "Snitch Streetwear Oversized Drop",
                      "Developer AI Workflow Tool",
                      "Organic Skincare Morning Routine",
                    ].map((promptText) => (
                      <button
                        key={promptText}
                        type="button"
                        onClick={() => setAiPrompt(promptText)}
                        className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#FFD21F]/20 text-neutral-600 dark:text-neutral-300 text-[10px] whitespace-nowrap cursor-pointer transition-colors border border-black/5 dark:border-white/5"
                      >
                        {promptText}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Campaign Title & Tagline */}
            <div className="space-y-4">
              <Input
                label="Campaign Brief Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. The Whole Truth: 100% Clean Whey Isolate Showcase"
                required
              />

              <Input
                label="Tagline / Short Summary"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Uncompromising transparency in sports nutrition for high performers"
                required
              />

              {/* Category Dropdown */}
              <div className="space-y-1.5 text-left font-sans">
                <label className="text-xs font-semibold text-[#0A0A0E] dark:text-[#EAEAEF]">
                  Industry Niche &amp; Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CreatorCategory })}
                  className="w-full bg-[#F8F8FC] dark:bg-[#161622] border border-black/10 dark:border-white/12 rounded-xl px-3.5 py-2.5 text-xs text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] shadow-xs cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="dark:bg-[#161622] dark:text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cover Artwork Preset Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#0A0A0E] dark:text-[#EAEAEF]">
                    Cover Artwork &amp; Banner
                  </label>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Displays in Creator Feed
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_COVERS.map((preset) => {
                    const isSelected = formData.coverImage === preset.url;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                        className={`group relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#FFD21F] ring-2 ring-[#FFD21F]/30 scale-[1.02]"
                            : "border-black/10 dark:border-white/10 hover:border-black/30"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 p-1.5 flex flex-col justify-end text-left">
                          <span className="text-[9px] font-bold text-white line-clamp-1">
                            {preset.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Creative Direction */}
              <Textarea
                label="Comprehensive Brief & Creative Direction"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detail key talking points, core product differentiators, visual do's and don'ts, tracking links..."
                rows={5}
              />
            </div>
          </div>
        )}

        {/* STEP 2: AUDIENCE DEMOGRAPHICS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7000] dark:text-[#FFD21F] font-mono">
                <Globe className="w-3.5 h-3.5" />
                <span>Step 2: Audience &amp; Demographics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display mt-1">
                Where Is Your Customer Base?
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Our algorithm scores applicant creators based on verified audience concentration in these territories.
              </p>
            </div>

            <div className="space-y-5">
              {/* Quick Country Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0A0A0E] dark:text-white">Quick Add Geographies</span>
                  <span className="text-[10px] font-mono text-neutral-400">Tap to toggle</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "🇮🇳 India", name: "India" },
                    { label: "🇺🇸 United States", name: "United States" },
                    { label: "🇬🇧 United Kingdom", name: "United Kingdom" },
                    { label: "🇨🇦 Canada", name: "Canada" },
                    { label: "🇦🇪 UAE", name: "United Arab Emirates" },
                    { label: "🌐 Global", name: "Global / Worldwide" },
                  ].map((geo) => {
                    const isSelected = formData.targetCountries.includes(geo.name);
                    return (
                      <button
                        key={geo.name}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              targetCountries: formData.targetCountries.filter((c) => c !== geo.name),
                            });
                          } else {
                            setFormData({
                              ...formData,
                              targetCountries: [...formData.targetCountries, geo.name],
                            });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-[#FFD21F] text-[#0A0A0E] border-black/15 shadow-2xs font-bold"
                            : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-black/8 dark:border-white/10 hover:border-black/20"
                        }`}
                      >
                        {geo.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <MultiSelectDropdown
                label="Target Geographies (Detailed List)"
                placeholder="Select target countries or search..."
                options={GEOGRAPHY_OPTIONS}
                selectedValues={formData.targetCountries}
                onChange={(vals) => setFormData({ ...formData, targetCountries: vals })}
                icon={<Globe className="w-4 h-4" />}
                hint="Creators with >= 40% followers in selected regions receive match preference."
              />

              <MultiSelectDropdown
                label="Target Age Brackets"
                placeholder="Select target audience age brackets..."
                options={AGE_BRACKET_OPTIONS}
                selectedValues={formData.targetAgeRanges}
                onChange={(vals) => setFormData({ ...formData, targetAgeRanges: vals })}
                icon={<Users className="w-4 h-4" />}
                hint="Choose which audience demographics are most relevant for this brief."
              />
            </div>
          </div>
        )}

        {/* STEP 3: CREATOR CRITERIA */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7000] dark:text-[#FFD21F] font-mono">
                <Users className="w-3.5 h-3.5" />
                <span>Step 3: Creator Eligibility Benchmarks</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display mt-1">
                Creator Requirements &amp; Channels
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Set minimum reach thresholds and acceptable publishing platforms.
              </p>
            </div>

            <div className="space-y-5">
              {/* Platform Selector Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#0A0A0E] dark:text-white">
                  Eligible Social Platforms
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PLATFORM_OPTIONS.map((plat) => {
                    const isSelected = formData.platforms.includes(plat.value);
                    return (
                      <button
                        key={plat.value}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            if (formData.platforms.length > 1) {
                              setFormData({
                                ...formData,
                                platforms: formData.platforms.filter((p) => p !== plat.value),
                              });
                            }
                          } else {
                            setFormData({
                              ...formData,
                              platforms: [...formData.platforms, plat.value],
                            });
                          }
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[#FFFDF5] dark:bg-[#1E1C12] border-[#FFD21F] shadow-2xs font-bold"
                            : "bg-[#F8F8FC] dark:bg-[#161622] border-black/8 dark:border-white/10 text-neutral-500"
                        }`}
                      >
                        <span className="text-xs font-bold text-[#0A0A0E] dark:text-white capitalize">
                          {plat.value}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Follower Presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0A0A0E] dark:text-white">
                    Minimum Follower Reach Presets
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Currently: {formData.minFollowers.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: "10K+ (Nano Tier)", val: 10000 },
                    { label: "25K+ (Micro Tier)", val: 25000 },
                    { label: "100K+ (Mid Tier)", val: 100000 },
                    { label: "500K+ (Macro Tier)", val: 500000 },
                  ].map((tier) => (
                    <button
                      key={tier.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, minFollowers: tier.val })}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                        formData.minFollowers === tier.val
                          ? "bg-[#FFD21F] text-[#0A0A0E] border-black/15 shadow-2xs"
                          : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-black/8 dark:border-white/10"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Minimum Follower Count (Custom)"
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
                  hint="Platform average is ~2.2%. 3.5%+ ensures high organic resonance."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DYNAMIC DELIVERABLES BUILDER */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7000] dark:text-[#FFD21F] font-mono">
                  <Clapperboard className="w-3.5 h-3.5" />
                  <span>Step 4: Required Deliverables</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display mt-1">
                  Build Required Content Formats
                </h2>
                <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                  Specify video assets, revisions, and production requirements.
                </p>
              </div>

              {/* Quick Add Deliverable Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 hidden sm:inline">Add format:</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddDeliverable(e.target.value as DeliverableType);
                      e.target.value = "";
                    }
                  }}
                  defaultValue=""
                  className="px-3 py-2 rounded-xl bg-[#FFD21F] text-[#0A0A0E] text-xs font-bold font-mono border border-black/15 shadow-xs cursor-pointer focus:outline-none"
                >
                  <option value="" disabled>+ Add Deliverable</option>
                  {DELIVERABLE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="space-y-3">
              {formData.deliverables.map((del, i) => (
                <div
                  key={del.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/8 dark:border-white/10 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 text-xs font-mono font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                        {del.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#FFD21F]/15 text-[#8A7000] dark:text-[#FFD21F]">
                        {del.count}x Assets
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(del.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Remove deliverable"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5 text-left font-sans">
                      <label className="text-[11px] font-semibold text-[#5A5A68] dark:text-[#9A9AA6]">
                        Deliverable Type
                      </label>
                      <select
                        value={del.type}
                        onChange={(e) => {
                          const updated = [...formData.deliverables];
                          updated[i].type = e.target.value as DeliverableType;
                          setFormData({ ...formData, deliverables: updated });
                        }}
                        className="w-full bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F]"
                      >
                        {DELIVERABLE_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left font-sans">
                      <label className="text-[11px] font-semibold text-[#5A5A68] dark:text-[#9A9AA6]">
                        Revisions Permitted
                      </label>
                      <select
                        value={del.maxRevisions}
                        onChange={(e) => {
                          const updated = [...formData.deliverables];
                          updated[i].maxRevisions = parseInt(e.target.value) || 2;
                          setFormData({ ...formData, deliverables: updated });
                        }}
                        className="w-full bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F]"
                      >
                        <option value={1}>1 Round of Revisions</option>
                        <option value={2}>2 Rounds of Revisions (Recommended)</option>
                        <option value={3}>3 Rounds of Revisions</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Specific Creative & Technical Guidelines"
                    value={del.guidelines}
                    onChange={(e) => {
                      const updated = [...formData.deliverables];
                      updated[i].guidelines = e.target.value;
                      setFormData({ ...formData, deliverables: updated });
                    }}
                    placeholder="e.g. 60-second video demo showing performance speed..."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: BUDGET & ESCROW VAULT */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7000] dark:text-[#FFD21F] font-mono">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Step 5: Budget &amp; Escrow Vault</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display mt-1">
                Capital Allocation &amp; Escrow Security
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Every rupee/dollar is protected in smart escrow and released only upon your milestone approval.
              </p>
            </div>

            {/* Currency Selector Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0A0A0E] dark:text-white block">
                Settlement Currency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRIMARY_CURRENCY_LIST.map((curr) => {
                  const isSelected = formData.currency === curr.code;
                  return (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => {
                        const newPresets = CURRENCY_PRESETS[curr.code] || CURRENCY_PRESETS.USD;
                        setFormData({
                          ...formData,
                          currency: curr.code,
                          totalBudget: newPresets.total[2] || 15000,
                          perCreatorBudget: newPresets.perCreator[2] || 3000,
                        });
                      }}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#FFD21F] bg-[#FFFDF5] dark:bg-[#201F15] shadow-xs font-bold ring-2 ring-[#FFD21F]/20"
                          : "border-black/8 dark:border-white/10 bg-white dark:bg-[#181824] text-neutral-500"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{curr.flag}</span>
                        <span className="text-xs text-[#0A0A0E] dark:text-white font-bold">{curr.code}</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-[#0A0A0E] dark:text-white bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
                        {curr.symbol}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Presets for Current Currency */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#0A0A0E] dark:text-white block">
                Quick Budget Pool Presets ({formData.currency})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {presets.total.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFormData({ ...formData, totalBudget: amt })}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                      formData.totalBudget === amt
                        ? "bg-[#FFD21F] text-[#0A0A0E] border-black/15 shadow-2xs"
                        : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-black/8 dark:border-white/10"
                    }`}
                  >
                    {formatCurrency(amt, formData.currency)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={`Total Campaign Pool (${getCurrencySymbol(formData.currency)} ${formData.currency})`}
                type="number"
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: parseInt(e.target.value) || 0 })}
              />

              <Input
                label={`Offer Fee Per Creator (${getCurrencySymbol(formData.currency)} ${formData.currency})`}
                type="number"
                value={formData.perCreatorBudget}
                onChange={(e) => setFormData({ ...formData, perCreatorBudget: parseInt(e.target.value) || 0 })}
              />
            </div>

            {/* Escrow Guarantee Infobox */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                    100% Guaranteed Escrow Protection
                  </h4>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4]">
                    Estimated Cohort: <span className="font-bold font-mono text-[#0A0A0E] dark:text-white">~{estimatedSlots} creators</span> • Zero brand commission • 120-hour automatic dispute shield.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-md self-start sm:self-center shrink-0">
                Tier-1 Security
              </span>
            </div>
          </div>
        )}

        {/* STEP 6: TIMELINE & COHORT SIZE */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7000] dark:text-[#FFD21F] font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Step 6: Production Timeline</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display mt-1">
                Milestone Deadlines &amp; Cohort Capacity
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Set application closing, draft submission deadlines, and maximum creator slots.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Applications Close"
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                hint="Recruitment phase ends"
              />

              <Input
                label="Content Draft Due"
                type="date"
                value={formData.contentSubmissionDeadline}
                onChange={(e) => setFormData({ ...formData, contentSubmissionDeadline: e.target.value })}
                hint="Creators submit first review"
              />

              <Input
                label="Campaign Go-Live"
                type="date"
                value={formData.campaignLiveDate}
                onChange={(e) => setFormData({ ...formData, campaignLiveDate: e.target.value })}
                hint="Public publication date"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/8 dark:border-white/10 flex items-center justify-between gap-4">
              <div>
                <label className="text-xs font-bold text-[#0A0A0E] dark:text-white block font-display">
                  Maximum Creators in Cohort
                </label>
                <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                  Total creators accepted into this collaboration brief.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, maxCreators: Math.max(1, formData.maxCreators - 1) })}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-black text-sm">
                  {formData.maxCreators}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, maxCreators: formData.maxCreators + 1 })}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & LAUNCH BRIEF */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7000] dark:text-[#FFD21F] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step 7: Final Review &amp; Pre-Authorization</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display mt-1">
                  Ready to Launch to Creators?
                </h2>
                <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                  Verify your brief parameters below. Once launched, creators in our verified talent pool can apply immediately.
                </p>
              </div>

              {/* View Switcher: Card Preview vs Specs */}
              <div className="flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setPreviewTab("card")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                    previewTab === "card"
                      ? "bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white shadow-2xs"
                      : "text-neutral-500"
                  }`}
                >
                  Marketplace Card
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab("specs")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                    previewTab === "specs"
                      ? "bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white shadow-2xs"
                      : "text-neutral-500"
                  }`}
                >
                  Brief Specs
                </button>
              </div>
            </div>

            {previewTab === "card" ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5A5A68] dark:text-[#9A9AA6]">
                  <span className="font-mono text-[11px] uppercase tracking-wider">
                    Live Marketplace Card Preview (How creators see this brief)
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">
                    Escrow Ready
                  </span>
                </div>
                <div className="max-w-md mx-auto">
                  <CampaignCard campaign={previewCampaign} />
                </div>
              </div>
            ) : (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/8 dark:border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">BRAND</span>
                  <span className="text-sm font-bold text-[#0A0A0E] dark:text-[#F4F4F8] font-display">
                    {currentBrand?.companyName || "The Whole Truth Foods"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">BRIEF TITLE</span>
                  <span className="text-sm font-bold text-[#0A0A0E] dark:text-[#F4F4F8] font-display break-words">
                    {formData.title || "Untitled Brief"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">BUDGET ALLOCATION</span>
                  <span className="text-sm font-extrabold font-mono text-[#0A0A0E] dark:text-[#FFD21F]">
                    {formatCurrency(formData.totalBudget, formData.currency)} ({formatCurrency(formData.perCreatorBudget, formData.currency)}/creator)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">TARGET CREATORS</span>
                  <span className="text-sm font-bold text-[#0A0A0E] dark:text-[#F4F4F8] font-mono">
                    {formData.maxCreators} Creators • {formData.deliverables.length} Deliverable Formats
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-bold text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">TIMELINE DEADLINE</span>
                  <span className="text-sm font-bold text-[#0A0A0E] dark:text-[#F4F4F8] font-mono">
                    Applications: {formData.applicationDeadline} • Content Due: {formData.contentSubmissionDeadline}
                  </span>
                </div>
              </div>
            )}

            {/* Escrow Disclaimer Notice */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-[#8A7000] dark:text-amber-300 flex items-start gap-2.5">
              <Lock className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                By publishing, this campaign will be listed in the AbeyCollab directory. Your allocated escrow collateral ({formatCurrency(formData.totalBudget, formData.currency)}) will be pre-authorized and held in institutional custody until work is verified.
              </p>
            </div>
          </div>
        )}

        {/* ── 4. Wizard Navigation Footer (Responsive & Clear of Bottom Mobile Dock) ── */}
        <div className="pt-6 border-t border-black/8 dark:border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="rounded-full w-full sm:w-auto font-bold cursor-pointer"
          >
            Previous
          </Button>

          {step < 7 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                if (step === 1 && !formData.title.trim()) {
                  addToast({
                    type: "warning",
                    title: "Campaign Title Missing",
                    message: "Please enter a title for your campaign brief to continue.",
                  });
                  return;
                }
                setStep((s) => Math.min(7, s + 1));
              }}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#0A0A0E]" />}
              className="rounded-full w-full sm:w-auto font-bold cursor-pointer shadow-xs"
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
              className="rounded-full w-full sm:w-auto font-black cursor-pointer shadow-md bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700]"
            >
              Publish Campaign Brief &amp; Deploy Escrow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
