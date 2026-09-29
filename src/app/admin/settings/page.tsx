"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/stores/ui.store";
import {
  Save,
  Sliders,
  Flame,
  ShieldAlert,
  Award,
  Sparkles,
  RefreshCw,
  Zap,
  Bot,
  ShieldCheck,
  Scale,
  BarChart3,
  Video,
  Layers,
  Search,
  Filter,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Info,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Clock,
  Users,
  Target,
  Activity,
  CheckCircle2,
} from "lucide-react";
import {
  AlgorithmWeightsConfig,
  SuspiciousActivityRecord,
  FeatureFlagConfig,
} from "@/core/types";

const DEFAULT_FEATURE_FLAGS: FeatureFlagConfig = {
  ai_matching: true,
  ai_assistant: false,
  payments_escrow: true,
  creator_verification: true,
  timecoded_video_review: true,
  dispute_management: true,
  advanced_analytics: true,
};

const FEATURE_METADATA: Record<
  keyof FeatureFlagConfig,
  { name: string; description: string; category: string; icon: React.ComponentType<{ className?: string }> }
> = {
  ai_matching: {
    name: "AI Creator Matchmaking",
    description: "Vector & algorithmic audience fit match score on campaign discovery",
    category: "AI & Discovery",
    icon: Sparkles,
  },
  ai_assistant: {
    name: "AI Campaign & Pitch Assistant",
    description: "LLM-assisted pitch drafting and campaign brief generation",
    category: "AI & Discovery",
    icon: Bot,
  },
  payments_escrow: {
    name: "Escrow Milestone Gateways",
    description: "Multi-currency milestone escrow and 10% platform fee ledger",
    category: "Finance & Escrow",
    icon: Zap,
  },
  creator_verification: {
    name: "Social Identity Verification",
    description: "External profile checks and official blue checkmark badge issuance",
    category: "Compliance & Trust",
    icon: ShieldCheck,
  },
  timecoded_video_review: {
    name: "Timecoded Video Review & SLA",
    description: "Frame-accurate feedback, revision requests, and 120h auto-release",
    category: "Deliverables & Review",
    icon: Video,
  },
  dispute_management: {
    name: "Dispute Arbitration Court",
    description: "5-stage formal conflict resolution and escrow split engine",
    category: "Legal & Arbitration",
    icon: Scale,
  },
  advanced_analytics: {
    name: "Advanced Analytics & ROI",
    description: "Deep audience demographics, CPM benchmarks, and GMV breakdown",
    category: "Analytics & Reporting",
    icon: BarChart3,
  },
};

type SettingsTab =
  | "all"
  | "flags"
  | "financial"
  | "creator_weights"
  | "campaign_weights"
  | "badges"
  | "antigaming";

export default function AdminSettingsPage() {
  const { addToast } = useUIStore();
  const [platformFee, setPlatformFee] = useState(10);
  const [minEscrow, setMinEscrow] = useState(5000);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<AlgorithmWeightsConfig | null>(null);
  const [suspicious, setSuspicious] = useState<SuspiciousActivityRecord[]>([]);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagConfig>(DEFAULT_FEATURE_FLAGS);

  // Modern command center controls
  const [activeTab, setActiveTab] = useState<SettingsTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCompact, setIsCompact] = useState(true);
  const [showKpis, setShowKpis] = useState(true);
  const [copiedActorId, setCopiedActorId] = useState<string | null>(null);

  // Load existing configuration from API
  useEffect(() => {
    Promise.all([
      fetch("/api/admin/algorithm-config")
        .then((res) => res.json())
        .catch(() => ({})),
      fetch("/api/admin/feature-flags")
        .then((res) => res.json())
        .catch(() => ({})),
    ])
      .then(([algoData, flagsData]) => {
        if (algoData.config) setConfig(algoData.config);
        if (algoData.suspiciousActivities) setSuspicious(algoData.suspiciousActivities);
        if (flagsData.flags) setFeatureFlags(flagsData.flags);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load admin settings:", err);
        setLoading(false);
      });
  }, []);

  const handleToggleFlag = async (key: keyof FeatureFlagConfig) => {
    const nextVal = !featureFlags[key];
    const previousFlags = { ...featureFlags };
    setFeatureFlags((prev) => ({ ...prev, [key]: nextVal }));

    try {
      const res = await fetch("/api/admin/feature-flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: nextVal }),
      });

      if (res.ok) {
        addToast({
          type: "success",
          title: "Feature Flag Updated",
          message: `${FEATURE_METADATA[key]?.name || key} is now ${nextVal ? "Enabled" : "Disabled"}.`,
        });
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to update feature flag");
      }
    } catch (err: any) {
      setFeatureFlags(previousFlags);
      addToast({
        type: "error",
        title: "Update Failed",
        message: err.message || "Could not update flag status.",
      });
    }
  };

  const handleBatchToggleFlags = async (enable: boolean) => {
    const updated = { ...featureFlags };
    (Object.keys(updated) as (keyof FeatureFlagConfig)[]).forEach((k) => {
      updated[k] = enable;
    });
    setFeatureFlags(updated);

    try {
      const res = await fetch("/api/admin/feature-flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        addToast({
          type: "success",
          title: enable ? "All Features Enabled" : "All Features Disabled",
          message: `All 7 architectural modules are now ${enable ? "active" : "disabled"}.`,
        });
      }
    } catch {
      addToast({
        type: "error",
        title: "Batch Update Failed",
        message: "Could not apply batch flag toggle.",
      });
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const tasks: Promise<any>[] = [];
      if (config) {
        tasks.push(
          fetch("/api/admin/algorithm-config", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(config),
          })
        );
      }
      tasks.push(
        fetch("/api/admin/feature-flags", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(featureFlags),
        })
      );

      await Promise.all(tasks);

      addToast({
        type: "success",
        title: "Platform Settings Saved",
        message: "Algorithm weights, badge rules, financial limits, and feature flags updated.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Save Failed",
        message: err.message || "Failed to update settings",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (!config) return;
    setConfig({
      ...config,
      creatorWeights: {
        engagementRate: 0.20,
        engagementGrowth: 0.15,
        profileViews: 0.10,
        profileSaves: 0.10,
        campaignApplications: 0.05,
        successfulCollabs: 0.15,
        completionRate: 0.10,
        responseRate: 0.05,
        reviewsRating: 0.10,
      },
      campaignWeights: {
        views: 0.20,
        applications: 0.30,
        velocity: 0.25,
        categoryDemand: 0.15,
        daysRemaining: 0.10,
      },
      risingCriteria: {
        maxFollowers: 100000,
        minEngagementRate: 4.5,
        minRecentVelocity: 1.25,
        minCompletedDeals: 1,
      },
      badgeThresholds: {
        fastResponderMaxHours: 2,
        topPerformerMinCompletionRate: 95,
        topRatedMinRating: 4.8,
        topRatedMinReviewsCount: 3,
        brandFavoriteMinRehireRate: 60,
        newTalentMaxAccountAgeDays: 30,
      },
    });

    setPlatformFee(10);
    setMinEscrow(500);

    addToast({
      type: "info",
      title: "Settings Reset to Defaults",
      message: "Reset all marketplace weights and parameters to recommended production defaults.",
    });
  };

  const handleCopyActor = (actorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(actorId);
    setCopiedActorId(actorId);
    setTimeout(() => setCopiedActorId(null), 2000);
    addToast({
      type: "info",
      title: "Actor ID Copied",
      message: `Copied ${actorId} to clipboard.`,
    });
  };

  // Weight Sum Calculations
  const creatorWeightSum = useMemo(() => {
    if (!config?.creatorWeights) return 100;
    const sum = Object.values(config.creatorWeights).reduce((acc, val) => acc + val, 0);
    return Math.round(sum * 100);
  }, [config?.creatorWeights]);

  const campaignWeightSum = useMemo(() => {
    if (!config?.campaignWeights) return 100;
    const sum = Object.values(config.campaignWeights).reduce((acc, val) => acc + val, 0);
    return Math.round(sum * 100);
  }, [config?.campaignWeights]);

  // Active flags count
  const activeFlagsCount = useMemo(() => {
    return Object.values(featureFlags).filter(Boolean).length;
  }, [featureFlags]);

  const totalFlagsCount = Object.keys(DEFAULT_FEATURE_FLAGS).length;

  // Filtered flag keys based on search
  const filteredFlagKeys = useMemo(() => {
    const keys = Object.keys(FEATURE_METADATA) as (keyof FeatureFlagConfig)[];
    if (!searchQuery.trim()) return keys;
    const q = searchQuery.toLowerCase();
    return keys.filter((k) => {
      const meta = FEATURE_METADATA[k];
      return (
        meta.name.toLowerCase().includes(q) ||
        meta.description.toLowerCase().includes(q) ||
        meta.category.toLowerCase().includes(q) ||
        k.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Filtered suspicious records
  const filteredSuspicious = useMemo(() => {
    if (!searchQuery.trim()) return suspicious;
    const q = searchQuery.toLowerCase();
    return suspicious.filter((s) => {
      return (
        (s.actorId && s.actorId.toLowerCase().includes(q)) ||
        (s.targetId && s.targetId.toLowerCase().includes(q)) ||
        (s.reason && s.reason.toLowerCase().includes(q)) ||
        (s.status && s.status.toLowerCase().includes(q))
      );
    });
  }, [suspicious, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl text-[#0B0A14] dark:text-[#F4F4F8] pb-16">
      {/* 1. Header Command Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-[#0B0A14] dark:text-[#F4F4F8] uppercase tracking-wider font-mono">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>AbeyCollab Admin Command Center</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B0A14] dark:text-white tracking-tight font-display mt-1.5 flex items-center gap-2">
            <span>Platform Settings & Marketplace Engine</span>
          </h1>
          <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA6] mt-0.5 font-sans max-w-2xl">
            Live architectural toggles, algorithmic matchmaking weights, badge eligibility criteria, and anti-gaming security throttles.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle KPIs */}
          <button
            onClick={() => setShowKpis(!showKpis)}
            className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-[#F4F4F8] text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Toggle Executive KPI Strip"
          >
            <Activity className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
            <span className="hidden sm:inline">KPI Strip</span>
            {showKpis ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Reset Defaults */}
          <button
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#0B0A14] dark:text-[#F4F4F8] text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Reset algorithm weights & limits to factory default"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-600 dark:text-[#9A9AA6]" />
            <span>Reset Defaults</span>
          </button>

          {/* Save Configuration */}
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-accent hover:brightness-105 active:scale-95 text-white text-[11px] font-black transition-all shadow-xs border border-black/15 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5 text-[#0B0A14]" />
            <span>{saving ? "Saving..." : "Save Configuration"}</span>
          </button>
        </div>
      </div>

      {/* 2. Executive KPI Strip (Collapsible) */}
      {showKpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Card 1: Active Feature Flags */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Architectural Modules</span>
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-black text-[#0B0A14] dark:text-white font-mono">
                {activeFlagsCount}/{totalFlagsCount}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">
                {Math.round((activeFlagsCount / totalFlagsCount) * 100)}% Online
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              {totalFlagsCount - activeFlagsCount === 0 ? "All core systems active" : `${totalFlagsCount - activeFlagsCount} module disabled`}
            </p>
          </div>

          {/* Card 2: Financial Take-Rate & Escrow Floor */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Commission & Escrow</span>
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-black text-[#0B0A14] dark:text-white font-mono">
                {platformFee}%
              </span>
              <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded-sm">
                Floor: ${minEscrow}
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              Double-entry platform revenue cut
            </p>
          </div>

          {/* Card 3: Weight Balance */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Algorithm Health</span>
              <Sliders className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-black text-[#0B0A14] dark:text-white font-mono">
                {creatorWeightSum}% / {campaignWeightSum}%
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                  creatorWeightSum === 100 && campaignWeightSum === 100
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                {creatorWeightSum === 100 && campaignWeightSum === 100 ? "Balanced" : "Skewed"}
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              9 Creator • 5 Campaign Weights
            </p>
          </div>

          {/* Card 4: Anti-Gaming Guard */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Anti-Gaming Guard</span>
              <ShieldAlert className="w-4 h-4 text-rose-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-black text-[#0B0A14] dark:text-white font-mono">
                {suspicious.length}
              </span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded-sm">
                {suspicious.length === 0 ? "Clean Ledger" : "Anomalies"}
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              Sliding window decay active
            </p>
          </div>
        </div>
      )}

      {/* 3. Navigation Bar & Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-2 bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 rounded-xl shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            All Sections
          </button>
          <button
            onClick={() => setActiveTab("flags")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "flags"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Feature Flags</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/10 dark:bg-white/10 font-mono">
              {activeFlagsCount}/{totalFlagsCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("financial")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "financial"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-500" />
            <span>Financial & Escrow</span>
          </button>
          <button
            onClick={() => setActiveTab("creator_weights")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "creator_weights"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Creator Algorithm</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/10 dark:bg-white/10 font-mono">
              9
            </span>
          </button>
          <button
            onClick={() => setActiveTab("campaign_weights")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "campaign_weights"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Target className="w-3.5 h-3.5 text-cyan-500" />
            <span>Campaign Algorithm</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/10 dark:bg-white/10 font-mono">
              5
            </span>
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "badges"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-purple-500" />
            <span>Badges & Rising</span>
          </button>
          <button
            onClick={() => setActiveTab("antigaming")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "antigaming"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Anti-Gaming</span>
            {suspicious.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500 text-white font-mono font-bold">
                {suspicious.length}
              </span>
            )}
          </button>
        </div>

        {/* Right Search & Density Switch */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search setting or weight..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-hidden focus:ring-1 focus:ring-primary text-[#0B0A14] dark:text-white placeholder:text-neutral-400"
            />
          </div>

          <button
            onClick={() => setIsCompact(!isCompact)}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              isCompact
                ? "bg-primary/15 text-primary dark:text-accent dark:text-accent border-primary/40"
                : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-black/10 dark:border-white/10"
            }`}
            title="Toggle compact card spacing"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden sm:inline">{isCompact ? "Compact" : "Comfortable"}</span>
          </button>
        </div>
      </div>

      {/* 4. Section: Feature Flags */}
      {(activeTab === "all" || activeTab === "flags") && (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-black/8 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/15 border border-primary/30 text-primary dark:text-accent dark:text-accent">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#0B0A14] dark:text-white font-display">
                  Global Feature Flags & Architectural Modules
                </h2>
                <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                  Instant state propagation across webhooks, discovery feed, video SLA engines, and dispute arbitrators.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBatchToggleFlags(true)}
                className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 transition-all cursor-pointer"
              >
                Enable All
              </button>
              <button
                onClick={() => handleBatchToggleFlags(false)}
                className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/20 transition-all cursor-pointer"
              >
                Disable All
              </button>
            </div>
          </div>

          <div className={`p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isCompact ? "gap-3" : "gap-4"}`}>
            {filteredFlagKeys.map((key) => {
              const meta = FEATURE_METADATA[key];
              const Icon = meta.icon;
              const isEnabled = featureFlags[key];

              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isEnabled
                      ? "bg-[#FBFBFC] dark:bg-[#181824] border-black/8 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                      : "bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg border shrink-0 transition-colors ${
                          isEnabled
                            ? "bg-primary/15 border-primary/30 text-primary dark:text-accent dark:text-accent"
                            : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                            {meta.name}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block">
                          {meta.category}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled}
                      onClick={() => handleToggleFlag(key)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        isEnabled ? "bg-primary" : "bg-black/20 dark:bg-white/20"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-[#0B0A14] shadow-sm ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6] mt-2.5 leading-snug">
                    {meta.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">flag: {key}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isEnabled
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-neutral-500/10 text-neutral-500"
                      }`}
                    >
                      {isEnabled ? "Online" : "Bypassed"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Section: Financial Parameters & Escrow Limits */}
      {(activeTab === "all" || activeTab === "financial") && (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-black/8 dark:border-white/10 flex items-center gap-2.5 bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0B0A14] dark:text-white font-display">
                Financial Parameters & Escrow Vault Safeguards
              </h2>
              <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                Double-entry escrow commission take-rate, deal minimum thresholds, and disbursement hold periods.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Take-Rate % */}
            <div className="p-4 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Platform Take-Rate (Commission)
                </span>
                <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {platformFee}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={platformFee}
                onChange={(e) => setPlatformFee(parseInt(e.target.value) || 0)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>0% (Free)</span>
                <span>10% (Default)</span>
                <span>25% (Max)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#12121A] border border-black/5 dark:border-white/5 text-[10px] space-y-1">
                <div className="flex justify-between text-neutral-500">
                  <span>Brand Gross Escrow:</span>
                  <span className="font-mono font-bold text-[#0B0A14] dark:text-white">₹10,000.00</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Platform Fee ({platformFee}%):</span>
                  <span className="font-mono font-bold">₹{((10000 * platformFee) / 100).toLocaleString("en-IN")}.00</span>
                </div>
                <div className="flex justify-between text-neutral-700 dark:text-neutral-300 font-bold border-t border-black/5 dark:border-white/5 pt-1">
                  <span>Creator Net Disbursement:</span>
                  <span className="font-mono">₹{(10000 - (10000 * platformFee) / 100).toLocaleString("en-IN")}.00</span>
                </div>
              </div>
            </div>

            {/* Min Escrow ₹ */}
            <div className="p-4 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Minimum Campaign Escrow Floor
                </span>
                <span className="font-mono text-sm font-black text-[#0B0A14] dark:text-accent bg-primary/15 px-2 py-0.5 rounded-md">
                  ₹{minEscrow.toLocaleString("en-IN")} INR
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={minEscrow}
                onChange={(e) => setMinEscrow(parseInt(e.target.value) || 0)}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>₹1,000</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                {[2500, 5000, 10000, 25000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMinEscrow(preset)}
                    className={`flex-1 py-1 text-[10px] font-mono font-bold rounded-md border transition-all cursor-pointer ${
                      minEscrow === preset
                        ? "bg-primary text-white border-black/20"
                        : "bg-white dark:bg-[#12121A] text-neutral-600 dark:text-neutral-400 border-black/5 dark:border-white/5 hover:border-black/20"
                    }`}
                  >
                    ₹{preset.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] leading-tight">
                Campaign briefs with budgets below this threshold require administrator waiver.
              </p>
            </div>

            {/* SLA Policies & Windows */}
            <div className="p-4 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2.5">
              <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display block">
                Disbursement & Arbitration SLAs
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-white dark:bg-[#12121A] border border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="text-[11px] font-medium">Deliverable Review SLA</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#0B0A14] dark:text-white">
                    120 Hours (5d)
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-[#12121A] border border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-[11px] font-medium">Arbitration Hold Period</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#0B0A14] dark:text-white">
                    7 Days
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-[#12121A] border border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] font-medium">Auto-Release on Silence</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Section: Creator Trending Formula Weights */}
      {config && (activeTab === "all" || activeTab === "creator_weights") && (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-black/8 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#0B0A14] dark:text-white font-display">
                  Creator Trending Algorithm Formula (Sum = 100%)
                </h2>
                <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                  Relative weighting coefficients calculated continuously to position creators on discovery explore feeds.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                  creatorWeightSum === 100
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                }`}
              >
                <span>Total Weight:</span>
                <span className="font-black">{creatorWeightSum}%</span>
                {creatorWeightSum === 100 ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                )}
              </div>
            </div>
          </div>

          {/* Allocation Bar */}
          <div className="px-5 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/5 dark:border-white/5">
            <div className="h-2 rounded-full overflow-hidden flex bg-black/5 dark:bg-white/5">
              <div
                style={{ width: `${Math.round(config.creatorWeights.engagementRate * 100)}%` }}
                className="bg-primary h-full"
                title={`Engagement Rate: ${Math.round(config.creatorWeights.engagementRate * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.engagementGrowth * 100)}%` }}
                className="bg-amber-500 h-full"
                title={`Engagement Growth: ${Math.round(config.creatorWeights.engagementGrowth * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.profileViews * 100)}%` }}
                className="bg-cyan-500 h-full"
                title={`Profile Views: ${Math.round(config.creatorWeights.profileViews * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.profileSaves * 100)}%` }}
                className="bg-purple-500 h-full"
                title={`Profile Saves: ${Math.round(config.creatorWeights.profileSaves * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.successfulCollabs * 100)}%` }}
                className="bg-emerald-500 h-full"
                title={`Completed Deals: ${Math.round(config.creatorWeights.successfulCollabs * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.completionRate * 100)}%` }}
                className="bg-blue-500 h-full"
                title={`Completion Rate: ${Math.round(config.creatorWeights.completionRate * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.reviewsRating * 100)}%` }}
                className="bg-rose-500 h-full"
                title={`Reviews & Rating: ${Math.round(config.creatorWeights.reviewsRating * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.responseRate * 100)}%` }}
                className="bg-teal-500 h-full"
                title={`Response Rate: ${Math.round(config.creatorWeights.responseRate * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.creatorWeights.campaignApplications * 100)}%` }}
                className="bg-indigo-500 h-full"
                title={`Applications: ${Math.round(config.creatorWeights.campaignApplications * 100)}%`}
              />
            </div>
          </div>

          <div className={`p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${isCompact ? "gap-3" : "gap-4"}`}>
            {/* 1. Engagement Rate */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Engagement Rate
                </span>
                <span className="font-mono text-xs font-black text-[#0B0A14] dark:text-accent bg-primary/15 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.engagementRate * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.4"
                step="0.01"
                value={config.creatorWeights.engagementRate}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, engagementRate: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-primary cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Weight for organic audience engagement %</p>
            </div>

            {/* 2. Engagement Growth */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Engagement Growth Velocity
                </span>
                <span className="font-mono text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.engagementGrowth * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={config.creatorWeights.engagementGrowth}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, engagementGrowth: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">MoM acceleration of engagement metrics</p>
            </div>

            {/* 3. Profile Views */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Profile Views & Searches
                </span>
                <span className="font-mono text-xs font-black text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.profileViews * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={config.creatorWeights.profileViews}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, profileViews: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Deduplicated brand profile views (1h window)</p>
            </div>

            {/* 4. Profile Saves */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Profile Bookmarks & Saves
                </span>
                <span className="font-mono text-xs font-black text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.profileSaves * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={config.creatorWeights.profileSaves}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, profileSaves: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Brands shortlisting creator into campaign rosters</p>
            </div>

            {/* 5. Successful Collabs */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Completed Escrow Deals
                </span>
                <span className="font-mono text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.successfulCollabs * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={config.creatorWeights.successfulCollabs}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, successfulCollabs: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Delivered and approved escrow campaigns</p>
            </div>

            {/* 6. Completion Rate */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Escrow Completion Rate %
                </span>
                <span className="font-mono text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.completionRate * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.25"
                step="0.01"
                value={config.creatorWeights.completionRate}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, completionRate: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Milestones delivered without cancellation or dispute</p>
            </div>

            {/* 7. Reviews & Ratings */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Brand Review Scores
                </span>
                <span className="font-mono text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.reviewsRating * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.25"
                step="0.01"
                value={config.creatorWeights.reviewsRating}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, reviewsRating: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">5-star post-collaboration ratings average</p>
            </div>

            {/* 8. Response Rate */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Inquiry Response Speed
                </span>
                <span className="font-mono text-xs font-black text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.responseRate * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={config.creatorWeights.responseRate}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, responseRate: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-teal-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Rewards creators responding in under 2 hours</p>
            </div>

            {/* 9. Campaign Applications */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Campaign Applications Active
                </span>
                <span className="font-mono text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.creatorWeights.campaignApplications * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={config.creatorWeights.campaignApplications}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    creatorWeights: { ...config.creatorWeights, campaignApplications: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Active pitching participation in public briefs</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. Section: Campaign Trending & Demand Weights */}
      {config && (activeTab === "all" || activeTab === "campaign_weights") && (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-black/8 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#0B0A14] dark:text-white font-display">
                  Campaign Trending & Demand Formula (Sum = 100%)
                </h2>
                <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                  Weights regulating brand campaign ranking on the creator discovery job board.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                  campaignWeightSum === 100
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                }`}
              >
                <span>Total Weight:</span>
                <span className="font-black">{campaignWeightSum}%</span>
                {campaignWeightSum === 100 ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                )}
              </div>
            </div>
          </div>

          {/* Allocation Bar */}
          <div className="px-5 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/5 dark:border-white/5">
            <div className="h-2 rounded-full overflow-hidden flex bg-black/5 dark:bg-white/5">
              <div
                style={{ width: `${Math.round(config.campaignWeights.views * 100)}%` }}
                className="bg-cyan-500 h-full"
                title={`Views: ${Math.round(config.campaignWeights.views * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.campaignWeights.applications * 100)}%` }}
                className="bg-primary h-full"
                title={`Applications: ${Math.round(config.campaignWeights.applications * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.campaignWeights.velocity * 100)}%` }}
                className="bg-emerald-500 h-full"
                title={`Velocity: ${Math.round(config.campaignWeights.velocity * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.campaignWeights.categoryDemand * 100)}%` }}
                className="bg-purple-500 h-full"
                title={`Demand Index: ${Math.round(config.campaignWeights.categoryDemand * 100)}%`}
              />
              <div
                style={{ width: `${Math.round(config.campaignWeights.daysRemaining * 100)}%` }}
                className="bg-rose-500 h-full"
                title={`Urgency: ${Math.round(config.campaignWeights.daysRemaining * 100)}%`}
              />
            </div>
          </div>

          <div className={`p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${isCompact ? "gap-3" : "gap-4"}`}>
            {/* Views */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Impressions & Views
                </span>
                <span className="font-mono text-xs font-black text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.campaignWeights.views * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.4"
                step="0.01"
                value={config.campaignWeights.views}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    campaignWeights: { ...config.campaignWeights, views: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Creator views on campaign brief</p>
            </div>

            {/* Applications */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Applications Volume
                </span>
                <span className="font-mono text-xs font-black text-[#0B0A14] dark:text-accent bg-primary/15 px-2 py-0.5 rounded-md">
                  {Math.round(config.campaignWeights.applications * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={config.campaignWeights.applications}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    campaignWeights: { ...config.campaignWeights, applications: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-primary cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Total creator pitches submitted</p>
            </div>

            {/* Velocity */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Application Velocity (Daily)
                </span>
                <span className="font-mono text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.campaignWeights.velocity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.4"
                step="0.01"
                value={config.campaignWeights.velocity}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    campaignWeights: { ...config.campaignWeights, velocity: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Pitches per 24 hours surge index</p>
            </div>

            {/* Category Demand */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Category Demand Index
                </span>
                <span className="font-mono text-xs font-black text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.campaignWeights.categoryDemand * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={config.campaignWeights.categoryDemand}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    campaignWeights: { ...config.campaignWeights, categoryDemand: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Niche scarcity & search popularity bonus</p>
            </div>

            {/* Days Remaining Urgency */}
            <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                  Urgency / Days Remaining
                </span>
                <span className="font-mono text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
                  {Math.round(config.campaignWeights.daysRemaining * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={config.campaignWeights.daysRemaining}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    campaignWeights: { ...config.campaignWeights, daysRemaining: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Boost for briefs nearing application deadline</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. Section: Rising Talent Criteria & Badge Thresholds */}
      {config && (activeTab === "all" || activeTab === "badges") && (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-black/8 dark:border-white/10 flex items-center gap-2.5 bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0B0A14] dark:text-white font-display">
                Rising Talent Criteria & Reputation Badge Thresholds
              </h2>
              <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                Rules governing automatic badge issuance, Top Performer qualifications, and Fast Responder status.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-6">
            {/* Rising Talent Sub-section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-600 dark:text-neutral-400">
                  Rising Star Heuristics (Micro-Creator Accelerator)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Max Followers */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span>Follower Ceiling</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                      {Math.round(config.risingCriteria.maxFollowers / 1000)}k Max
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="250000"
                    step="5000"
                    value={config.risingCriteria.maxFollowers}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        risingCriteria: { ...config.risingCriteria, maxFollowers: parseInt(e.target.value) },
                      })
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Under this cap qualifies for Rising filter</p>
                </div>

                {/* Min Engagement */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span>Min Engagement %</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                      {config.risingCriteria.minEngagementRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="8.0"
                    step="0.1"
                    value={config.risingCriteria.minEngagementRate}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        risingCriteria: { ...config.risingCriteria, minEngagementRate: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Minimum required audience engagement</p>
                </div>

                {/* Velocity */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span>Recent Velocity</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                      {config.risingCriteria.minRecentVelocity}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.05"
                    value={config.risingCriteria.minRecentVelocity}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        risingCriteria: { ...config.risingCriteria, minRecentVelocity: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Minimum follower or view growth multiplier</p>
                </div>

                {/* Min Completed Deals */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span>Completed Escrow Deals</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                      &ge; {config.risingCriteria.minCompletedDeals}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={config.risingCriteria.minCompletedDeals}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        risingCriteria: { ...config.risingCriteria, minCompletedDeals: parseInt(e.target.value) },
                      })
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Proof of at least one approved deal</p>
                </div>
              </div>
            </div>

            {/* Badge Thresholds Sub-section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-600 dark:text-neutral-400">
                  Reputation Badge Auto-Issuance Thresholds
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Fast Responder */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-500" />
                      <span>⚡ Fast Responder</span>
                    </span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                      &le; {config.badgeThresholds.fastResponderMaxHours} hrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6"
                    step="0.5"
                    value={config.badgeThresholds.fastResponderMaxHours}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        badgeThresholds: { ...config.badgeThresholds, fastResponderMaxHours: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Maximum average chat message response latency</p>
                </div>

                {/* Top Performer */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-500" />
                      <span>🏆 Top Performer</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      &ge; {config.badgeThresholds.topPerformerMinCompletionRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="100"
                    step="1"
                    value={config.badgeThresholds.topPerformerMinCompletionRate}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        badgeThresholds: { ...config.badgeThresholds, topPerformerMinCompletionRate: parseInt(e.target.value) },
                      })
                    }
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Minimum collaboration escrow completion rate</p>
                </div>

                {/* Top Rated */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>⭐ Top Rated</span>
                    </span>
                    <span className="font-mono font-bold text-[#0B0A14] dark:text-accent bg-primary/15 px-2 py-0.5 rounded-md">
                      &ge; {config.badgeThresholds.topRatedMinRating} / 5.0
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="5.0"
                    step="0.05"
                    value={config.badgeThresholds.topRatedMinRating}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        badgeThresholds: { ...config.badgeThresholds, topRatedMinRating: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">
                    Requires &ge; {config.badgeThresholds.topRatedMinReviewsCount} verified brand reviews
                  </p>
                </div>

                {/* Brand Favorite */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-500" />
                      <span>💎 Brand Favorite</span>
                    </span>
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                      &ge; {config.badgeThresholds.brandFavoriteMinRehireRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    step="5"
                    value={config.badgeThresholds.brandFavoriteMinRehireRate}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        badgeThresholds: { ...config.badgeThresholds, brandFavoriteMinRehireRate: parseInt(e.target.value) },
                      })
                    }
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Minimum repeat hire or re-engagement rate</p>
                </div>

                {/* New Talent */}
                <div className="p-3.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center font-semibold text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>🌱 New Talent Cap</span>
                    </span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
                      &le; {config.badgeThresholds.newTalentMaxAccountAgeDays} days
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="90"
                    step="1"
                    value={config.badgeThresholds.newTalentMaxAccountAgeDays}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        badgeThresholds: { ...config.badgeThresholds, newTalentMaxAccountAgeDays: parseInt(e.target.value) },
                      })
                    }
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">Account age limit for early discovery boost badge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Section: Anti-Gaming Security & Suspicious Activity Log */}
      {(activeTab === "all" || activeTab === "antigaming") && (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-black/8 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#0B0A14] dark:text-white font-display">
                  Anti-Gaming Security & Interaction Throttling Log
                </h2>
                <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]">
                  Real-time detection of interaction bursts, profile view manipulation, and automated query spam.
                </p>
              </div>
            </div>

            <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400 font-mono">
              {filteredSuspicious.length} Incidents Flagged
            </span>
          </div>

          {filteredSuspicious.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                No Malicious Gaming Patterns Detected
              </h3>
              <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6] max-w-md mx-auto">
                Rate limits, IP deduplication, and sliding-window decay filters are actively sanitizing marketplace signals.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] uppercase font-bold text-[#5A5A68] dark:text-[#9A9AA6] font-mono">
                    <th className="py-2.5 px-4">Detected</th>
                    <th className="py-2.5 px-4">Actor</th>
                    <th className="py-2.5 px-4">Target Entity</th>
                    <th className="py-2.5 px-4">Trigger Pattern</th>
                    <th className="py-2.5 px-4">Velocity</th>
                    <th className="py-2.5 px-4 text-right">Sanction Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono text-[11px]">
                  {filteredSuspicious.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F8F8FA] dark:hover:bg-[#181824] transition-colors">
                      <td className="py-3 px-4 text-neutral-600 dark:text-[#9A9AA6]">
                        {new Date(item.detectedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={(e) => handleCopyActor(item.actorId || "anon", e)}
                          className="font-bold text-[#0B0A14] dark:text-[#F4F4F8] hover:text-primary flex items-center gap-1.5 cursor-pointer group"
                        >
                          <span>{item.actorId || "Anonymous Session"}</span>
                          {copiedActorId === item.actorId ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 text-neutral-400 transition-opacity" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-neutral-600 dark:text-[#9A9AA6]">{item.targetId}</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400 font-sans font-medium">
                        {item.reason}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-neutral-700 dark:text-neutral-300">
                          {item.burstCount}
                        </span>{" "}
                        <span className="text-[10px] text-neutral-400">actions/min</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-mono">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
