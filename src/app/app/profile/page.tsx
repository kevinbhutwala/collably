"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Input, Textarea } from "@/components/ui/Input";
import { SocialAccount, PlatformType } from "@/core/types";
import {
  calculateTotalFollowers,
  calculateAvgEngagementRate,
  getCreatorTier,
  validatePlatformHandle,
  generateSocialVerificationCode,
} from "@/core/utils/social";
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
  ShieldCheck,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { useGlobalCurrency } from "@/context/CurrencyContext";
import { getCurrencySymbol } from "@/core/utils/currency";

export default function ProfileEditPage() {
  const { role, currentCreator, currentBrand, updateCreatorProfile, updateBrandProfile } = useAuthStore();
  const { addToast } = useUIStore();
  const { currency: globalCurrency } = useGlobalCurrency();
  const creatorCurrency = (currentCreator?.currency as any) || globalCurrency || "USD";
  const currencySymbol = getCurrencySymbol(creatorCurrency);

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

  // Social account ownership verification modal state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedVerifyAccount, setSelectedVerifyAccount] = useState<SocialAccount | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

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
    const validation = validatePlatformHandle(newPlatform, newHandle);
    if (!validation.valid) {
      addToast({
        type: "error",
        title: "Invalid Social Link",
        message: validation.error || "Please enter a valid handle or profile link.",
      });
      return;
    }

    const { cleanHandle, url } = validation;

    // Check if duplicate in current profile
    const alreadyAdded = socialAccounts.some(
      (acc) => acc.platform === newPlatform && acc.handle.toLowerCase() === cleanHandle.toLowerCase()
    );
    if (alreadyAdded) {
      addToast({
        type: "error",
        title: "Already Added",
        message: `You already added @${cleanHandle} on ${newPlatform.toUpperCase()} to your media kit.`,
      });
      return;
    }

    const verificationCode = generateSocialVerificationCode(newPlatform, cleanHandle);

    const newAcc: SocialAccount = {
      id: `sa_${Date.now()}`,
      platform: newPlatform,
      handle: cleanHandle,
      url,
      followers: Number(newFollowers) || 10000,
      engagementRate: Number(newEngagement) || 4.5,
      avgViews: 0,
      verifiedBadge: false,
      verificationStatus: "unverified",
      verificationCode,
    };

    setSocialAccounts((prev) => [...prev, newAcc]);
    setShowAddModal(false);
    setNewHandle("");

    // Open verification modal immediately for the new account
    setSelectedVerifyAccount(newAcc);
    setShowVerifyModal(true);

    addToast({
      type: "info",
      title: "Channel Added",
      message: `@${cleanHandle} connected. Please verify ownership to get the Verified badge.`,
    });
  };

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setHasCopiedCode(true);
      setTimeout(() => setHasCopiedCode(false), 2000);
      addToast({
        type: "info",
        title: "Code Copied",
        message: `Verification code "${code}" copied to clipboard.`,
      });
    }
  };

  const handleVerifyAccount = async (targetAccount?: SocialAccount) => {
    const acc = targetAccount || selectedVerifyAccount;
    if (!acc) return;

    setIsVerifying(true);
    try {
      const res = await fetch("/api/creators/verify-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId: currentCreator?.id,
          accountId: acc.id,
          platform: acc.platform,
          handle: acc.handle,
          verificationCode: acc.verificationCode,
          followers: acc.followers,
          engagementRate: acc.engagementRate,
          method: "instant_auth",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Verification failed. Please try again.");
      }

      // Update social accounts in state
      const updatedAccounts = socialAccounts.map((item) =>
        item.id === acc.id ||
        (item.platform === acc.platform && item.handle.toLowerCase() === acc.handle.toLowerCase())
          ? {
              ...item,
              verifiedBadge: true,
              verificationStatus: "verified" as const,
              verifiedAt: new Date().toISOString(),
            }
          : item
      );
      setSocialAccounts(updatedAccounts);

      // Persist to creator profile if available
      if (currentCreator) {
        await updateCreatorProfile({
          socialAccounts: updatedAccounts,
          totalFollowers: calculateTotalFollowers(updatedAccounts),
          avgEngagementRate: calculateAvgEngagementRate(updatedAccounts),
          tier: getCreatorTier(calculateTotalFollowers(updatedAccounts)),
        });
      }

      setShowVerifyModal(false);
      setSelectedVerifyAccount(null);

      addToast({
        type: "success",
        title: "Account Verified!",
        message: `@${acc.handle} on ${acc.platform.toUpperCase()} is verified and badged!`,
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Verification Failed",
        message: err.message || "Could not verify account ownership.",
      });
    } finally {
      setIsVerifying(false);
    }
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
      <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#EAEAEF] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Brand Workspace
              </span>
              <span className="text-[#8A8A9A] dark:text-[#6A6A7E]">•</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-yellow-400 font-mono text-[10px] font-bold">
                Verified Sponsor
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display tracking-tight">
              Brand Profile Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4]">
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
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0A0A0E] dark:text-white font-display">
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
    <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#EAEAEF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Creator Profile
            </span>
            <span className="text-[#8A8A9A] dark:text-[#6A6A7E]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-yellow-400 font-mono text-[10px] font-bold uppercase">
              {tier} Tier
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display tracking-tight">
            Media Kit &amp; Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4]">
            Set your starting rates, bio, and connected social accounts for brands to view.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          {currentCreator && (
            <Link
              href={`/creators/${currentCreator.id}`}
              target="_blank"
              className="px-4 py-2.5 rounded-full bg-white dark:bg-[#181824] hover:bg-[#F8F8FC] dark:hover:bg-[#202030] border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Profile</span>
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
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">About You &amp; Your Rates</h2>

          <Input
            label="Profile Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. AI & Tech Storyteller • Content Creator"
            required
          />

          <Textarea
            label="About You"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell brands about what kind of content you create, your audience, and your creative style..."
            required
          />

          <div className="max-w-xs">
            <Input
              label={`Starting Rate (${currencySymbol} ${creatorCurrency})`}
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
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">Connected Social Channels</h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4]">
                Channels are audited for combined follower reach and tier status.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] hover:bg-[#20202B] dark:hover:bg-[#FFE052] text-white dark:text-[#0A0A0E] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Channel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialAccounts.map((acc) => {
              const isAccountVerified = acc.verifiedBadge || acc.verificationStatus === "verified";
              return (
                <div
                  key={acc.id}
                  className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 flex items-center justify-center text-[#0A0A0E] dark:text-white shadow-2xs shrink-0">
                      {acc.platform === "youtube" && <Youtube className="w-4 h-4 text-red-600" />}
                      {acc.platform === "instagram" && <Instagram className="w-4 h-4 text-pink-600" />}
                      {acc.platform === "x" && <Twitter className="w-4 h-4 text-[#0A0A0E] dark:text-white" />}
                      {acc.platform === "linkedin" && <Linkedin className="w-4 h-4 text-blue-600" />}
                      {acc.platform === "tiktok" && <Video className="w-4 h-4 text-[#0A0A0E] dark:text-white" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <a
                          href={acc.url || `https://${acc.platform}.com/${acc.handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-xs text-[#0A0A0E] dark:text-white hover:text-[#0055D6] dark:hover:text-[#FFD21F] hover:underline flex items-center gap-1 group truncate"
                          title={`Open ${acc.platform} profile in new tab`}
                        >
                          <span className="truncate">@{acc.handle}</span>
                          <ExternalLink className="w-3 h-3 text-[#7A7A8A] dark:text-[#8E8EA4] group-hover:text-[#0055D6] dark:group-hover:text-[#FFD21F] shrink-0" />
                        </a>

                        {isAccountVerified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-bold font-mono shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-[10px] font-bold font-mono shrink-0">
                            <span>Unverified</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] block truncate">
                        {(acc.followers || 0).toLocaleString()} followers • {acc.engagementRate}% eng
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {!isAccountVerified && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVerifyAccount(acc);
                          setShowVerifyModal(true);
                        }}
                        className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 hover:bg-amber-100 dark:hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 text-[11px] font-bold font-mono transition-all flex items-center gap-1"
                        title="Verify account ownership"
                      >
                        <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>Verify</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveSocial(acc.id)}
                      className="text-[#8A8A9A] dark:text-[#6A6A7E] hover:text-red-600 dark:hover:text-red-400 p-1.5 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                      title="Remove channel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>

      {/* Add Social Channel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#12121A] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0E] dark:text-white font-display">Add Social Channel</h3>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Connect your social media account to showcase your real reach to brands.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0A0A0E] dark:text-[#EAEAEF] block mb-1">Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-sans bg-[#F8F8FC] dark:bg-[#181824] text-[#0A0A0E] dark:text-white"
                >
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="x">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>

              <Input
                label="Channel Handle or Profile Link"
                placeholder="e.g. techcreator or https://instagram.com/techcreator"
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

            <div className="flex justify-end gap-2 pt-3 border-t border-black/8 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSocialAccount}
                className="px-5 py-2 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] hover:bg-[#20202B] dark:hover:bg-[#FFE052] text-white dark:text-[#0A0A0E] text-xs font-bold transition-all"
              >
                Add Channel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Account Ownership Verification Modal */}
      {showVerifyModal && selectedVerifyAccount && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#12121A] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 dark:border-white/10 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/8 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                    Verify Account Ownership
                  </h3>
                  <span className="text-xs text-[#5A5A68] dark:text-[#A0A0B4]">
                    Confirm that you own this account
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowVerifyModal(false);
                  setSelectedVerifyAccount(null);
                }}
                className="text-[#8A8A9A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold font-mono">Account</span>
                <span className="px-2 py-0.5 rounded-full bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-[11px] font-mono font-bold capitalize text-[#0A0A0E] dark:text-white">
                  {selectedVerifyAccount.platform}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0A0A0E] dark:text-white">
                  @{selectedVerifyAccount.handle}
                </span>
                <a
                  href={selectedVerifyAccount.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0055D6] dark:text-[#FFD21F] hover:underline flex items-center gap-1"
                >
                  <span>Open Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                Verification proves you own this profile, unlocks your green <strong>Verified</strong> badge, and makes your link trusted by brands.
              </p>

              {selectedVerifyAccount.verificationCode && (
                <div className="p-3.5 rounded-2xl bg-[#FFFDF0] dark:bg-[#1C1808] border border-[#FFD21F]/40 dark:border-[#FFD21F]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#0A0A0E] dark:text-[#F4F4F8]">
                      Your Verification Code
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(selectedVerifyAccount.verificationCode || "")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 hover:bg-[#F8F8FC] dark:hover:bg-[#20202E] text-xs font-mono font-bold text-[#0A0A0E] dark:text-white transition-all shadow-2xs"
                    >
                      {hasCopiedCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#7A7A8A] dark:text-[#8E8EA4]" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#12121A] rounded-xl border border-black/6 dark:border-white/10 font-mono text-center font-black text-sm tracking-wider text-[#0A0A0E] dark:text-[#FFD21F]">
                    {selectedVerifyAccount.verificationCode}
                  </div>
                  <p className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] leading-tight">
                    Optional: Paste this code into your profile bio or about section so brands can instantly verify you.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-3 border-t border-black/8 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setShowVerifyModal(false);
                  setSelectedVerifyAccount(null);
                }}
                disabled={isVerifying}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
              >
                Verify Later
              </button>
              <button
                type="button"
                onClick={() => handleVerifyAccount(selectedVerifyAccount)}
                disabled={isVerifying}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all shadow-[0_4px_14px_rgba(5,150,105,0.3)] flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Ownership...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify Ownership Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
