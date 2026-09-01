"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Input, Textarea } from "@/components/ui/Input";
import { SocialAccount, PlatformType } from "@/core/types";
import { formatCurrency } from "@/core/utils/formatters";
import { calculateTotalFollowers, calculateAvgEngagementRate, getCreatorTier } from "@/core/utils/social";
import {
  ExternalLink,
  Save,
  Plus,
  Trash2,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Video,
  Globe,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function CreatorProfileEditPage() {
  const { currentCreator, updateCreatorProfile } = useAuthStore();
  const { addToast } = useUIStore();

  const [headline, setHeadline] = useState(currentCreator?.headline || "");
  const [bio, setBio] = useState(currentCreator?.bio || "");
  const [startingPrice, setStartingPrice] = useState(currentCreator?.startingPrice || 500);
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(currentCreator?.socialAccounts || []);
  const [isSaving, setIsSaving] = useState(false);

  // New social account form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlatform, setNewPlatform] = useState<PlatformType>("youtube");
  const [newHandle, setNewHandle] = useState("");
  const [newFollowers, setNewFollowers] = useState(10000);
  const [newEngagement, setNewEngagement] = useState(4.5);

  useEffect(() => {
    if (currentCreator) {
      setHeadline(currentCreator.headline || "");
      setBio(currentCreator.bio || "");
      setStartingPrice(currentCreator.startingPrice || 500);
      setSocialAccounts(currentCreator.socialAccounts || []);
    }
  }, [currentCreator]);

  const totalFollowers = calculateTotalFollowers(socialAccounts);
  const avgEngagement = calculateAvgEngagementRate(socialAccounts);
  const tier = getCreatorTier(totalFollowers);

  const handleAddSocialAccount = () => {
    if (!newHandle.trim()) {
      addToast({
        type: "error",
        title: "Handle Required",
        message: "Please enter your channel handle or profile URL.",
      });
      return;
    }

    const cleanHandle = newHandle.replace(/^@/, "").trim();
    const newAcc: SocialAccount = {
      id: `sa_${Date.now()}`,
      platform: newPlatform,
      handle: cleanHandle,
      url: `https://${newPlatform}.com/${cleanHandle}`,
      followers: Number(newFollowers) || 0,
      engagementRate: Number(newEngagement) || 0,
      avgViews: 0,
      verifiedBadge: false,
    };

    setSocialAccounts((prev) => [...prev, newAcc]);
    setShowAddModal(false);
    setNewHandle("");
    addToast({
      type: "success",
      title: "Social Channel Added",
      message: `@${cleanHandle} connected. Remember to save your profile changes.`,
    });
  };

  const handleRemoveSocial = (id: string) => {
    setSocialAccounts((prev) => prev.filter((acc) => acc.id !== id));
    addToast({
      type: "info",
      title: "Channel Removed",
      message: "Channel unlinked from your public media kit.",
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (currentCreator) {
        await updateCreatorProfile({
          headline,
          bio,
          startingPrice: Number(startingPrice) || 500,
          socialAccounts,
          totalFollowers,
          avgEngagementRate: avgEngagement,
          tier,
        });
      }

      addToast({
        type: "success",
        title: "Media Kit Updated",
        message: "Your changes are live and synced with brand discovery radar.",
      });
    } catch {
      addToast({
        type: "error",
        title: "Save Failed",
        message: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case "youtube":
        return <Youtube className="w-4 h-4 text-red-400" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case "tiktok":
        return <Video className="w-4 h-4 text-cyan-400" />;
      case "x":
        return <Twitter className="w-4 h-4 text-white" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 text-sky-400" />;
      default:
        return <Globe className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="space-y-8 text-white select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Creator Media Kit
            </span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">
              Public Pitch Card
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Creator Profile &amp; Rate Card
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Customize your bio, connect social audience channels, and set starting collaboration rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentCreator?.id && (
            <Link
              href={`/creators/${currentCreator.id}`}
              target="_blank"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/15"
            >
              <span>View Public Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/40 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* Basic Positioning Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
          <h3 className="text-base font-bold text-white font-display">
            1. Positioning &amp; Starting Rates
          </h3>

          <div className="space-y-4">
            <Input
              label="Professional Tagline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. AI & SaaS Tech Reviewer • 4K Cinematic Workflow Integrations"
            />

            <Textarea
              label="Creator Bio & Editorial Voice"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your creative focus, audience demographic profile, and content format styles..."
              rows={4}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Starting Sponsorship Rate ($ USD)"
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                placeholder="500"
              />
            </div>
          </div>
        </div>

        {/* Connected Social Accounts */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                2. Connected Social Channels
              </h3>
              <p className="text-xs text-white/50">
                Audience reach: {totalFollowers.toLocaleString()} total followers ({tier} Tier)
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect Channel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialAccounts.map((sa) => (
              <div
                key={sa.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    {getPlatformIcon(sa.platform)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">@{sa.handle}</h4>
                    <p className="text-[11px] font-mono text-white/50">
                      {sa.followers.toLocaleString()} followers • {sa.engagementRate}% ER
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSocial(sa.id)}
                  className="text-white/40 hover:text-red-400 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#101018] border border-white/15 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-display">Connect Social Channel</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                  className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="youtube" className="bg-[#101018]">YouTube</option>
                  <option value="instagram" className="bg-[#101018]">Instagram</option>
                  <option value="tiktok" className="bg-[#101018]">TikTok</option>
                  <option value="x" className="bg-[#101018]">X / Twitter</option>
                  <option value="linkedin" className="bg-[#101018]">LinkedIn</option>
                </select>
              </div>

              <Input
                label="Channel Handle (@)"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                placeholder="e.g. elenatech"
              />

              <Input
                label="Follower / Subscriber Count"
                type="number"
                value={newFollowers}
                onChange={(e) => setNewFollowers(Number(e.target.value))}
              />

              <Input
                label="Average Engagement Rate (%)"
                type="number"
                value={newEngagement}
                onChange={(e) => setNewEngagement(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSocialAccount}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-[0_0_15px_rgba(255,210,31,0.4)]"
              >
                Add Channel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
