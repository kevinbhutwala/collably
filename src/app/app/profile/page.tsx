"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Input, Textarea } from "@/components/ui/Input";
import { SocialAccount, PlatformType } from "@/core/types";
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
  Building2,
  MapPin,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function ProfileEditPage() {
  const { role, currentCreator, currentBrand, updateCreatorProfile, updateBrandProfile } = useAuthStore();
  const { addToast } = useUIStore();

  const isBrand = role === "brand" || role === "brand_owner" || role === "brand_manager";

  // Creator state
  const [headline, setHeadline] = useState(currentCreator?.headline || "");
  const [bio, setBio] = useState(currentCreator?.bio || "");
  const [startingPrice, setStartingPrice] = useState(currentCreator?.startingPrice || 500);
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(currentCreator?.socialAccounts || []);

  // Brand state
  const [companyName, setCompanyName] = useState(currentBrand?.companyName || "");
  const [industry, setIndustry] = useState(currentBrand?.industry || "");
  const [brandHeadline, setBrandHeadline] = useState(currentBrand?.headline || "");
  const [brandDescription, setBrandDescription] = useState(currentBrand?.description || "");
  const [websiteUrl, setWebsiteUrl] = useState(currentBrand?.websiteUrl || "");
  const [location, setLocation] = useState(currentBrand?.location || "");
  const [companySize, setCompanySize] = useState(currentBrand?.companySize || "11-50");

  const [isSaving, setIsSaving] = useState(false);

  // New social account modal state (for creators)
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

  useEffect(() => {
    if (currentBrand) {
      setCompanyName(currentBrand.companyName || "");
      setIndustry(currentBrand.industry || "");
      setBrandHeadline(currentBrand.headline || "");
      setBrandDescription(currentBrand.description || "");
      setWebsiteUrl(currentBrand.websiteUrl || "");
      setLocation(currentBrand.location || "");
      setCompanySize(currentBrand.companySize || "11-50");
    }
  }, [currentBrand]);

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
      if (isBrand) {
        if (!companyName.trim()) {
          throw new Error("Company name is required");
        }
        await updateBrandProfile({
          companyName,
          industry,
          headline: brandHeadline,
          description: brandDescription,
          websiteUrl,
          location,
          companySize,
        });
        addToast({
          type: "success",
          title: "Brand Profile Saved",
          message: "Your brand workspace profile has been updated.",
        });
      } else {
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
          message: "Your profile, social metrics, and rates have been saved.",
        });
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Save Failed",
        message: err.message || "Could not save profile changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isBrand) {
    return (
      <div className="space-y-6 text-[#0A0A0E] select-none font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Brand Workspace
              </span>
              <span className="text-[#8A8A9A]">•</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
                Verified Sponsor
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display tracking-tight">
              Brand Profile Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#5A5A68]">
              Manage your company information, brand bio, and public presence for creators.
            </p>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center gap-1.5 self-start sm:self-center active:scale-98 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving Changes..." : "Save Brand Profile"}</span>
          </button>
        </div>

        {/* Brand Edit Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0A0A0E] font-display">
              <Building2 className="w-4 h-4 text-[#FFD21F]" />
              <span>Company Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Acme Corp"
              />
              <Input
                label="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Technology & AI, Consumer Tech"
              />
            </div>

            <Input
              label="Brand Headline"
              value={brandHeadline}
              onChange={(e) => setBrandHeadline(e.target.value)}
              placeholder="e.g. Next-Generation Developer Productivity Tools"
            />

            <Textarea
              label="Company Overview & Mission"
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              rows={4}
              placeholder="Tell creators about your brand, product philosophy, and sponsorship expectations..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <Input
                label="Website URL"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://acme.com"
                icon={<Globe className="w-3.5 h-3.5 text-[#8A8A9A]" />}
              />
              <Input
                label="HQ Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                icon={<MapPin className="w-3.5 h-3.5 text-[#8A8A9A]" />}
              />
              <Input
                label="Company Size"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                placeholder="10-50 employees"
                icon={<Users className="w-3.5 h-3.5 text-[#8A8A9A]" />}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Creator profile rendering
  return (
    <div className="space-y-6 text-[#0A0A0E] select-none font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Audited Media Kit
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold uppercase">
              {tier} Tier
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display tracking-tight">
            Creator Profile &amp; Media Kit
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Configure your public rates, headline, and connected social channels.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          {currentCreator && (
            <Link
              href={`/creators/${currentCreator.id}`}
              target="_blank"
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Kit</span>
            </Link>
          )}

          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center gap-1.5 active:scale-98 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Profile"}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-[#0A0A0E] font-display">Bio &amp; Positioning</h2>

          <Input
            label="Professional Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. AI & Tech Storyteller • Full-Stack Developer"
            required
          />

          <Textarea
            label="Biography"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell brands about your audience demographics, past brand work, and content focus..."
            required
          />

          <div className="max-w-xs">
            <Input
              label="Starting Sponsorship Rate ($ USD)"
              type="number"
              min={100}
              step={50}
              value={startingPrice}
              onChange={(e) => setStartingPrice(Number(e.target.value))}
              required
            />
          </div>
        </div>

        {/* Connected Channels & Social Accounts */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h2 className="text-base font-bold text-[#0A0A0E] font-display">Connected Social Channels</h2>
              <p className="text-xs text-[#5A5A68]">
                Channels are audited for combined follower reach and tier status.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 rounded-full bg-[#0A0A0E] hover:bg-[#20202B] text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Channel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialAccounts.map((acc) => (
              <div
                key={acc.id}
                className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#0A0A0E] shadow-2xs">
                    {acc.platform === "youtube" && <Youtube className="w-4 h-4 text-red-600" />}
                    {acc.platform === "instagram" && <Instagram className="w-4 h-4 text-pink-600" />}
                    {acc.platform === "x" && <Twitter className="w-4 h-4 text-[#0A0A0E]" />}
                    {acc.platform === "linkedin" && <Linkedin className="w-4 h-4 text-blue-600" />}
                    {acc.platform === "tiktok" && <Video className="w-4 h-4 text-[#0A0A0E]" />}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0A0A0E] block">@{acc.handle}</span>
                    <span className="text-[11px] font-mono text-[#6A6A78]">
                      {(acc.followers || 0).toLocaleString()} followers • {acc.engagementRate}% eng
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSocial(acc.id)}
                  className="text-[#8A8A9A] hover:text-red-600 p-1.5 transition-colors"
                  title="Remove channel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* Add Social Channel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#0A0A0E] font-display">Add Social Channel</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0A0A0E] block mb-1">Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-black/10 text-xs font-sans bg-[#F8F8FC] text-[#0A0A0E]"
                >
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="x">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>

              <Input
                label="Channel Handle / Username"
                placeholder="e.g. techcreator"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
              />

              <Input
                label="Followers / Subscribers"
                type="number"
                value={newFollowers}
                onChange={(e) => setNewFollowers(Number(e.target.value))}
              />

              <Input
                label="Average Engagement Rate (%)"
                type="number"
                step="0.1"
                value={newEngagement}
                onChange={(e) => setNewEngagement(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-black/8">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full border border-black/10 text-xs font-bold text-[#5A5A68] hover:text-[#0A0A0E]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSocialAccount}
                className="px-5 py-2 rounded-full bg-[#0A0A0E] hover:bg-[#20202B] text-white text-xs font-bold transition-all"
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
