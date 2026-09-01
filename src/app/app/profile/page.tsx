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
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case "tiktok":
        return <Video className="w-4 h-4 text-[#111111]" />;
      case "x":
        return <Twitter className="w-4 h-4 text-sky-500" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 text-blue-500" />;
      default:
        return <Globe className="w-4 h-4 text-[#6B6B6B]" />;
    }
  };

  return (
    <div className="space-y-8 text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Media Kit &amp; Social Manager
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              Public Link Enabled
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Creator Media Kit
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Manage your connected YouTube, Instagram, TikTok, X, and LinkedIn channels and sponsorship rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentCreator && (
            <Link href={`/creators/${currentCreator.id}`} target="_blank">
              <Button variant="secondary" size="md" rightIcon={<ExternalLink className="w-4 h-4 text-[#111111]" />} className="rounded-[9px]">
                Preview Public Kit
              </Button>
            </Link>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4 text-[#B7FF3C]" />}
            className="rounded-[9px]"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Edit */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Headline & Bio */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#111111] font-display">Headline &amp; Positioning</h3>
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
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
              <div>
                <h3 className="text-base font-bold text-[#111111] font-display">Connected Social Channels</h3>
                <p className="text-xs text-[#6B6B6B] mt-0.5 font-sans">
                  Audience metrics update your public media kit and discovery ranking.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAddModal(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                className="rounded-[9px]"
              >
                Connect Channel
              </Button>
            </div>

            {/* Social Accounts Grid */}
            <div className="space-y-3">
              {socialAccounts.length === 0 ? (
                <div className="p-8 text-center bg-[#FAFAF8] rounded-xl border border-dashed border-[#E7E7E4] space-y-3">
                  <Users className="w-8 h-8 text-[#6B6B6B] mx-auto" />
                  <p className="text-xs text-[#6B6B6B] font-sans">No social channels connected yet.</p>
                  <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)} className="rounded-[9px]">
                    Connect Your First Channel
                  </Button>
                </div>
              ) : (
                socialAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] flex items-center justify-center shadow-xs">
                        {getPlatformIcon(acc.platform)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#111111] capitalize font-display">
                            {acc.platform}
                          </span>
                          <span className="text-xs text-[#6B6B6B] font-mono">@{acc.handle}</span>
                          {acc.verifiedBadge && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-[#6B6B6B] mt-1 font-mono">
                          <span>{acc.followers.toLocaleString()} Followers</span>
                          <span>•</span>
                          <span className="text-[#111111] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                            {acc.engagementRate}% Eng. Rate
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={acc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-[#6B6B6B] hover:text-[#111111] rounded-lg hover:bg-[#FFFFFF] transition-colors border border-transparent hover:border-[#E7E7E4]"
                        title="Visit Channel"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveSocialAccount(acc.id)}
                        className="p-2 text-[#6B6B6B] hover:text-rose-600 rounded-lg hover:bg-[#FFFFFF] transition-colors border border-transparent hover:border-[#E7E7E4]"
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
              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#111111] text-[#111111] space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E7E7E4] pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                    Connect New Platform
                  </h4>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-xs text-[#6B6B6B] hover:text-[#111111]"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left font-sans">
                    <label className="text-xs font-semibold text-[#111111]">Platform</label>
                    <select
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                      className="w-full bg-[#FFFFFF] border border-[#E7E7E4] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="x">X (Twitter)</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left font-sans">
                    <label className="text-xs font-semibold text-[#111111]">Handle or Channel URL</label>
                    <input
                      type="text"
                      placeholder="e.g. @ElenaTech"
                      value={newHandle}
                      onChange={(e) => setNewHandle(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E7E7E4] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111] placeholder:text-[#6B6B6B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left font-sans">
                    <label className="text-xs font-semibold text-[#111111]">Followers / Subscribers</label>
                    <input
                      type="number"
                      placeholder="25000"
                      value={newFollowers}
                      onChange={(e) => setNewFollowers(parseInt(e.target.value) || 0)}
                      className="w-full bg-[#FFFFFF] border border-[#E7E7E4] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-1.5 text-left font-sans">
                    <label className="text-xs font-semibold text-[#111111]">Average Engagement Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="5.2"
                      value={newEngagement}
                      onChange={(e) => setNewEngagement(parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#FFFFFF] border border-[#E7E7E4] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button variant="primary" size="sm" onClick={handleAddSocialAccount} className="rounded-[9px]">
                    Add Channel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Media Kit Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6 sticky top-24">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto border-2 border-[#111111] shadow-xs relative bg-[#FAFAF8]">
                {currentCreator?.avatarUrl ? (
                  <Image
                    src={currentCreator.avatarUrl}
                    alt={currentCreator.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-[#6B6B6B]">
                    {currentCreator?.fullName?.charAt(0) || "C"}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111111] font-display">{currentCreator?.fullName || "Creator"}</h3>
                <p className="text-xs text-[#6B6B6B] font-mono">@{currentCreator?.handle}</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#B7FF3C] text-[#111111] text-[10px] font-mono font-bold">
                  {tier} TIER
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-[10px] font-mono font-bold">
                  {currentCreator?.primaryCategory || "Technology"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">Total Combined Reach:</span>
                <span className="font-extrabold text-[#111111] font-mono">
                  {totalFollowers.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">Avg. Engagement Rate:</span>
                <span className="font-extrabold text-[#111111] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                  {avgEngagement}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">Connected Platforms:</span>
                <span className="font-bold text-[#111111] font-mono">
                  {socialAccounts.length}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#E7E7E4]">
                <span className="text-[#6B6B6B]">Base Deal Rate:</span>
                <span className="font-extrabold text-[#111111] font-mono text-sm">
                  {formatCurrency(startingPrice)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4 text-[#B7FF3C]" />}
              className="w-full rounded-[9px]"
            >
              Publish Live Updates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
