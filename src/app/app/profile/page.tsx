"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
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

    setSocialAccounts([...socialAccounts, newAcc]);
    setShowAddModal(false);
    setNewHandle("");
    addToast({
      type: "success",
      title: "Social Channel Added",
      message: `Added @${cleanHandle} (${newPlatform}). Click Save to persist changes.`,
    });
  };

  const handleRemoveSocialAccount = (id: string) => {
    const updated = socialAccounts.filter((a) => a.id !== id);
    setSocialAccounts(updated);
    addToast({
      type: "info",
      title: "Account Removed",
      message: "Social channel unlinked from your public media kit.",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateCreatorProfile({
        headline,
        bio,
        startingPrice,
        socialAccounts,
        totalFollowers,
        avgEngagementRate: avgEngagement,
        tier,
      });

      addToast({
        type: "success",
        title: "Media Kit Updated",
        message: "Your creator media kit and social metrics have been saved to the database.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Update Failed",
        message: err.message || "Failed to save profile changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case "youtube":
        return <Youtube className="w-4 h-4 text-rose-500" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case "tiktok":
        return <Video className="w-4 h-4 text-white" />;
      case "x":
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 text-blue-400" />;
      default:
        return <Globe className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-10 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[hsl(327,100%,55%)]">
              Media Kit &amp; Social Manager
            </span>
            <span className="text-white/20">•</span>
            <Badge variant="glow" size="sm">Public Link Enabled</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Creator Media Kit
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            Manage your connected YouTube, Instagram, TikTok, X, and LinkedIn channels and sponsorship rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentCreator && (
            <Link href={`/creators/${currentCreator.id}`} target="_blank">
              <Button variant="secondary" size="md" rightIcon={<ExternalLink className="w-4 h-4" />} className="rounded-full">
                Preview Public Kit
              </Button>
            </Link>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="rounded-full font-display font-bold"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Edit */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Headline & Bio */}
          <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-4">
            <h3 className="text-base font-bold text-white font-display">Headline &amp; Positioning</h3>
            <Input
              label="Creator Tagline / Headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. AI Engineer & Hardware Reviewer"
            />
            <Textarea
              label="Bio & Media Kit Narrative"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
            <Input
              label="Minimum Starting Fee ($ USD)"
              type="number"
              value={startingPrice}
              onChange={(e) => setStartingPrice(parseInt(e.target.value) || 0)}
            />
          </div>

          {/* Section 2: Connected Social Accounts */}
          <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display">Connected Social Channels</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-sans">
                  Audience metrics update your public media kit and discovery ranking.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                className="rounded-full"
              >
                Connect Channel
              </Button>
            </div>

            {/* Social Accounts Grid */}
            <div className="space-y-3">
              {socialAccounts.length === 0 ? (
                <div className="p-8 text-center bg-white/[0.03] rounded-2xl border border-dashed border-white/20 space-y-3">
                  <Users className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-300 font-sans">No social channels connected yet.</p>
                  <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)} className="rounded-full">
                    Connect Your First Channel
                  </Button>
                </div>
              ) : (
                socialAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-sm">
                        {getPlatformIcon(acc.platform)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white capitalize font-display">
                            {acc.platform}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">@{acc.handle}</span>
                          {acc.verifiedBadge && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                          <span>{acc.followers.toLocaleString()} Followers</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold">{acc.engagementRate}% Eng. Rate</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={acc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                        title="Visit Channel"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveSocialAccount(acc.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Remove Channel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Social Account Modal / Drawer Inline */}
            {showAddModal && (
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1c1122] to-[#120c16] border border-pink-500/30 text-white space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-pink-300 font-mono">
                    Connect New Platform
                  </h4>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-200">Platform</label>
                    <select
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[hsl(327,100%,50%)]/50"
                    >
                      <option value="youtube" className="bg-[#120c16] text-white">YouTube</option>
                      <option value="instagram" className="bg-[#120c16] text-white">Instagram</option>
                      <option value="tiktok" className="bg-[#120c16] text-white">TikTok</option>
                      <option value="x" className="bg-[#120c16] text-white">X (Twitter)</option>
                      <option value="linkedin" className="bg-[#120c16] text-white">LinkedIn</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-200">Handle or Channel URL</label>
                    <input
                      type="text"
                      placeholder="e.g. @ElenaTech"
                      value={newHandle}
                      onChange={(e) => setNewHandle(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[hsl(327,100%,50%)]/50 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-200">Followers / Subscribers</label>
                    <input
                      type="number"
                      placeholder="25000"
                      value={newFollowers}
                      onChange={(e) => setNewFollowers(parseInt(e.target.value) || 0)}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[hsl(327,100%,50%)]/50"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-200">Average Engagement Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="5.2"
                      value={newEngagement}
                      onChange={(e) => setNewEngagement(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[hsl(327,100%,50%)]/50"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button variant="primary" size="sm" onClick={handleAddSocialAccount} className="rounded-full">
                    Add Channel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Media Kit Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6 sticky top-24">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto border-2 border-pink-500/30 shadow-md relative bg-white/[0.05]">
                {currentCreator?.avatarUrl ? (
                  <Image
                    src={currentCreator.avatarUrl}
                    alt={currentCreator.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                    {currentCreator?.fullName?.charAt(0) || "C"}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">{currentCreator?.fullName || "Creator"}</h3>
                <p className="text-xs text-slate-400 font-mono">@{currentCreator?.handle}</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Badge variant="glow" size="sm">
                  {tier} Tier
                </Badge>
                <Badge variant="purple" size="sm">
                  {currentCreator?.primaryCategory || "Technology"}
                </Badge>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Combined Reach:</span>
                <span className="font-extrabold text-white font-mono">
                  {totalFollowers.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Avg. Engagement Rate:</span>
                <span className="font-extrabold text-emerald-400 font-mono">
                  {avgEngagement}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Connected Platforms:</span>
                <span className="font-bold text-white font-mono">
                  {socialAccounts.length}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-slate-400">Base Deal Rate:</span>
                <span className="font-extrabold text-[hsl(327,100%,55%)] font-mono text-sm">
                  {formatCurrency(startingPrice)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
              className="w-full rounded-full font-display font-bold"
            >
              Publish Live Updates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
