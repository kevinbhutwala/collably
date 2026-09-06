"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/stores/ui.store";
import { Save, Sliders, Flame, ShieldAlert, Award, Sparkles, RefreshCw } from "lucide-react";
import { AlgorithmWeightsConfig, SuspiciousActivityRecord } from "@/core/types";

export default function AdminSettingsPage() {
  const { addToast } = useUIStore();
  const [platformFee, setPlatformFee] = useState(10);
  const [minEscrow, setMinEscrow] = useState(500);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<AlgorithmWeightsConfig | null>(null);
  const [suspicious, setSuspicious] = useState<SuspiciousActivityRecord[]>([]);

  // Load existing configuration from API
  useEffect(() => {
    fetch("/api/admin/algorithm-config")
      .then((res) => res.json())
      .then((data) => {
        if (data.config) setConfig(data.config);
        if (data.suspiciousActivities) setSuspicious(data.suspiciousActivities);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load algorithm config:", err);
        setLoading(false);
      });
  }, []);

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      if (config) {
        await fetch("/api/admin/algorithm-config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        });
      }

      addToast({
        type: "success",
        title: "Platform & Algorithm Config Saved",
        message: "Algorithm weights, badge rules, and financial parameters updated.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Save Failed",
        message: err.message || "Failed to update algorithm config",
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

    addToast({
      type: "info",
      title: "Weights Reset",
      message: "Reset all algorithm weights to recommended baseline defaults.",
    });
  };

  return (
    <div className="space-y-8 max-w-5xl text-[#0A0A0E]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-2.5 py-0.5 text-[11px] font-bold text-[#0A0A0E]">
            <Sparkles className="w-3 h-3 text-[#FFD21F]" />
            <span>AbeyCollab Admin Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display mt-2">
            Marketplace Intelligence & Platform Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Fine-tune real-time trending formulas, rising talent heuristics, badge qualifications, and anti-gaming security.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-full bg-white border border-black/10 hover:bg-neutral-50 text-[#0A0A0E] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-600" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-[#0A0A0E]" />
            <span>{saving ? "Saving Changes..." : "Save Configuration"}</span>
          </button>
        </div>
      </div>

      {/* 1. Global Financial Settings */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-sm font-display">
          <Sliders className="w-4 h-4 text-[#FFD21F]" />
          <span>Financial Parameters & Escrow Limits</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <Input
            label="Default Platform Take-Rate (%)"
            type="number"
            value={platformFee}
            onChange={(e) => setPlatformFee(parseInt(e.target.value) || 0)}
          />
          <Input
            label="Minimum Campaign Escrow Requirement ($ USD)"
            type="number"
            value={minEscrow}
            onChange={(e) => setMinEscrow(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* 2. Creator Trending Algorithm Weights */}
      {config && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-sm font-display">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Creator Trending Formula Weights (Sum = 100%)</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              Live Weighted Scoring Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            {/* Engagement Rate */}
            <div className="p-3.5 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Engagement Rate</span>
                <span className="font-mono text-[#FFD21F] font-bold">
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
                className="w-full accent-[#FFD21F] cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Weight for organic audience engagement %</p>
            </div>

            {/* Engagement Growth */}
            <div className="p-3.5 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Engagement Growth</span>
                <span className="font-mono text-[#FFD21F] font-bold">
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
                className="w-full accent-[#FFD21F] cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">MoM velocity of engagement metrics</p>
            </div>

            {/* Profile Views */}
            <div className="p-3.5 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Profile Views & Searches</span>
                <span className="font-mono text-[#FFD21F] font-bold">
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
                className="w-full accent-[#FFD21F] cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Deduplicated brand profile views (1h window)</p>
            </div>

            {/* Profile Saves */}
            <div className="p-3.5 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Profile Saves / Bookmarks</span>
                <span className="font-mono text-[#FFD21F] font-bold">
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
                className="w-full accent-[#FFD21F] cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Brands shortlisting creator for briefs</p>
            </div>

            {/* Successful Collabs */}
            <div className="p-3.5 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Completed Escrow Deals</span>
                <span className="font-mono text-[#FFD21F] font-bold">
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
                className="w-full accent-[#FFD21F] cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Delivered and approved escrow campaigns</p>
            </div>

            {/* Response Rate */}
            <div className="p-3.5 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Inquiry Response Speed</span>
                <span className="font-mono text-[#FFD21F] font-bold">
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
                className="w-full accent-[#FFD21F] cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Reward creators responding in &lt; 2 hours</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Rising Creator Criteria & Badge Thresholds */}
      {config && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-sm font-display">
            <Award className="w-4 h-4 text-purple-600" />
            <span>Rising Creator Heuristics & Reputation Thresholds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            {/* Max Followers for Rising */}
            <div className="p-4 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Rising Follower Cap</span>
                <span className="font-mono font-bold text-purple-700">
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
                className="w-full accent-purple-600 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Creators under this cap qualify for Rising status</p>
            </div>

            {/* Min Engagement for Rising */}
            <div className="p-4 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Rising Min Engagement</span>
                <span className="font-mono font-bold text-purple-700">
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
                className="w-full accent-purple-600 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Required engagement rate to trigger Rising badge</p>
            </div>

            {/* Fast Responder Hours */}
            <div className="p-4 rounded-2xl bg-[#F8F8FA] border border-black/5 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Fast Responder Threshold</span>
                <span className="font-mono font-bold text-cyan-700">
                  &le; {config.badgeThresholds.fastResponderMaxHours} hrs
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={config.badgeThresholds.fastResponderMaxHours}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    badgeThresholds: { ...config.badgeThresholds, fastResponderMaxHours: parseFloat(e.target.value) },
                  })
                }
                className="w-full accent-cyan-600 cursor-pointer"
              />
              <p className="text-[10px] text-[#5A5A68]">Max average latency for ⚡ Fast Responder badge</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Anti-Gaming Security & Suspicious Activity Log */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-sm font-display">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Anti-Gaming Security & Throttling Feed</span>
          </div>
          <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-600">
            {suspicious.length} Incidents Flagged
          </span>
        </div>

        {suspicious.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-[#F8F8FA] p-6 text-center text-xs text-[#5A5A68]">
            ✓ No suspicious interaction bursts detected. Rate limits, window decay, and deduplication are active.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-black/5 text-[10px] uppercase font-bold text-[#5A5A68]">
                  <th className="pb-2">Timestamp</th>
                  <th className="pb-2">Actor ID</th>
                  <th className="pb-2">Target</th>
                  <th className="pb-2">Trigger Reason</th>
                  <th className="pb-2">Burst Velocity</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 font-mono text-[11px]">
                {suspicious.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8F8FA]">
                    <td className="py-2.5 text-neutral-600">
                      {new Date(item.detectedAt).toLocaleTimeString()}
                    </td>
                    <td className="py-2.5 font-bold text-[#0A0A0E]">
                      {item.actorId || "Anonymous Session"}
                    </td>
                    <td className="py-2.5 text-neutral-600">{item.targetId}</td>
                    <td className="py-2.5 text-rose-600 font-sans">{item.reason}</td>
                    <td className="py-2.5">{item.burstCount} actions/min</td>
                    <td className="py-2.5 text-right">
                      <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 uppercase">
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
    </div>
  );
}
