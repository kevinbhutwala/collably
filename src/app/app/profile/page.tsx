"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Input, Textarea } from "@/components/ui/Input";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { InstagramSignInButton } from "@/components/auth/InstagramSignInButton";
import {
  SocialAccount,
  PlatformType,
  CreatorCategory,
  RateCardItem,
  DeliverableType,
} from "@/core/types";
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
  Circle,
  ShieldCheck,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Coins,
  Camera,
  Clock,
  Layers,
  Zap,
  ShieldAlert,
  X,
  Languages,
  BadgeCheck,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { useGlobalCurrency } from "@/context/CurrencyContext";
import { getCurrencySymbol } from "@/core/utils/currency";
import { SafeImage } from "@/components/ui/SafeImage";

// Available Creator Categories for Niche Selection
const AVAILABLE_CATEGORIES: CreatorCategory[] = [
  "Technology & AI",
  "Design & Creative",
  "Visual Storytelling & Design",
  "Fashion & Style",
  "Beauty & Skincare",
  "Fitness & Wellness",
  "Finance & Business",
  "Gaming & Esports",
  "Lifestyle & Travel",
  "Food & Culinary",
  "Education & Science",
  "Content Creator",
];

const DELIVERABLE_OPTIONS: DeliverableType[] = [
  "Instagram Reel",
  "Instagram Story Set (3x)",
  "Instagram Dedicated Post",
  "Carousel Post",
  "YouTube Dedicated Video",
  "YouTube 60s Integration",
  "YouTube Short",
  "TikTok Video",
  "UGC Video Ad",
  "X (Twitter) Thread",
  "Keynote / Event Appearance",
];

export default function ProfileEditPage() {
  const {
    user,
    role,
    currentCreator,
    currentBrand,
    updateCreatorProfile,
    updateBrandProfile,
  } = useAuthStore();
  const { addToast } = useUIStore();
  const { currency: globalCurrency } = useGlobalCurrency();
  const searchParams = useSearchParams();

  const isBrand =
    role === "brand" || role === "brand_owner" || role === "brand_manager";

  // ── Creator Profile State ──
  const [fullName, setFullName] = useState(
    currentCreator?.fullName || user?.name || ""
  );
  const [handle, setHandle] = useState(
    currentCreator?.handle ||
      user?.name?.toLowerCase().replace(/[^a-z0-9_]/g, "") ||
      ""
  );
  const [headline, setHeadline] = useState(currentCreator?.headline || "");
  const [bio, setBio] = useState(currentCreator?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(
    currentCreator?.avatarUrl || user?.avatarUrl || (user as any)?.image || ""
  );
  const [primaryCategory, setPrimaryCategory] = useState<CreatorCategory | "">(
    currentCreator?.primaryCategory || ""
  );
  const [location, setLocation] = useState(currentCreator?.location || "");
  const [languages, setLanguages] = useState<string>(
    (currentCreator?.languages || []).join(", ")
  );
  const [availableForHire, setAvailableForHire] = useState<boolean>(
    currentCreator?.availableForHire ?? true
  );
  const [startingPrice, setStartingPrice] = useState<number>(
    currentCreator?.startingPrice || 0
  );
  const creatorCurrency = "INR";
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(
    currentCreator?.socialAccounts || []
  );
  const [rateCards, setRateCards] = useState<RateCardItem[]>(
    currentCreator?.rateCards || []
  );

  // ── Brand Profile State ──
  const [companyName, setCompanyName] = useState(
    currentBrand?.companyName || ""
  );
  const [industry, setIndustry] = useState(currentBrand?.industry || "");
  const [brandHeadline, setBrandHeadline] = useState(
    currentBrand?.headline || ""
  );
  const [brandDescription, setBrandDescription] = useState(
    currentBrand?.description || ""
  );
  const [websiteUrl, setWebsiteUrl] = useState(currentBrand?.websiteUrl || "");
  const [brandLocation, setBrandLocation] = useState(
    currentBrand?.location || ""
  );
  const [companySize, setCompanySize] = useState(
    currentBrand?.companySize || ""
  );
  const [brandLogoUrl, setBrandLogoUrl] = useState(
    currentBrand?.logoUrl || user?.avatarUrl || (user as any)?.image || ""
  );

  const [isSaving, setIsSaving] = useState(false);

  // Modals
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [showAddRateCardModal, setShowAddRateCardModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedVerifyAccount, setSelectedVerifyAccount] =
    useState<SocialAccount | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

  // New social account form state
  const [newPlatform, setNewPlatform] = useState<PlatformType>("youtube");
  const [newHandle, setNewHandle] = useState("");
  const [newFollowers, setNewFollowers] = useState<number | "">("");
  const [newEngagement, setNewEngagement] = useState<number | "">("");

  // New rate card item state
  const [newRateTitle, setNewRateTitle] = useState("");
  const [newRateType, setNewRateType] =
    useState<DeliverableType>("Instagram Reel");
  const [newRatePrice, setNewRatePrice] = useState<number | "">("");
  const [newRateTurnaround, setNewRateTurnaround] = useState<number>(3);
  const [newRateDescription, setNewRateDescription] = useState("");

  // Handle URL change for quick platform detection
  const handleLinkChange = (value: string) => {
    let cleanVal = value;
    const trimmed = value.trim();
    if (trimmed.includes("instagram.com")) {
      setNewPlatform("instagram");
      const match = trimmed.match(/instagram\.com\/(?:@)?([a-zA-Z0-9._]+)/i);
      if (match && match[1]) cleanVal = match[1];
    } else if (trimmed.includes("youtube.com") || trimmed.includes("youtu.be")) {
      setNewPlatform("youtube");
      const match = trimmed.match(/youtube\.com\/(?:@)?([a-zA-Z0-9._-]+)/i);
      if (match && match[1]) cleanVal = match[1];
    } else if (trimmed.includes("tiktok.com")) {
      setNewPlatform("tiktok");
      const match = trimmed.match(/tiktok\.com\/(?:@)?([a-zA-Z0-9._]+)/i);
      if (match && match[1]) cleanVal = match[1];
    } else if (trimmed.includes("x.com") || trimmed.includes("twitter.com")) {
      setNewPlatform("x");
      const match = trimmed.match(/(?:twitter|x)\.com\/([a-zA-Z0-9_]+)/i);
      if (match && match[1]) cleanVal = match[1];
    }
    setNewHandle(cleanVal);
  };

  // Sync store data when available
  useEffect(() => {
    if (currentCreator) {
      setFullName(currentCreator.fullName || user?.name || "");
      setHandle(currentCreator.handle || "");
      setHeadline(currentCreator.headline || "");
      setBio(currentCreator.bio || "");
      setAvatarUrl(
        currentCreator.avatarUrl || user?.avatarUrl || (user as any)?.image || ""
      );
      setPrimaryCategory(currentCreator.primaryCategory || "");
      setLocation(currentCreator.location || "");
      setLanguages((currentCreator.languages || []).join(", "));
      setAvailableForHire(currentCreator.availableForHire ?? true);
      setStartingPrice(currentCreator.startingPrice || 0);
      setSocialAccounts(currentCreator.socialAccounts || []);
      setRateCards(currentCreator.rateCards || []);
    }
  }, [currentCreator, user, globalCurrency]);

  useEffect(() => {
    if (currentBrand) {
      setCompanyName(currentBrand.companyName || "");
      setIndustry(currentBrand.industry || "");
      setBrandHeadline(currentBrand.headline || "");
      setBrandDescription(currentBrand.description || "");
      setWebsiteUrl(currentBrand.websiteUrl || "");
      setBrandLocation(currentBrand.location || "");
      setCompanySize(currentBrand.companySize || "");
      setBrandLogoUrl(
        currentBrand.logoUrl || user?.avatarUrl || (user as any)?.image || ""
      );
    }
  }, [currentBrand, user]);

  // Social OAuth return notifications
  useEffect(() => {
    if (searchParams?.get("youtube_connected") === "true") {
      const channel = searchParams.get("channel") || "YouTube Channel";
      const subscribers = searchParams.get("subscribers");
      addToast({
        type: "success",
        title: "Official YouTube Channel Connected!",
        message: `${channel} verified via Google OAuth with ${Number(
          subscribers || 0
        ).toLocaleString()} real subscribers.`,
      });
      useAuthStore.getState().checkSession();
    } else if (searchParams?.get("youtube_error")) {
      addToast({
        type: "error",
        title: "YouTube Connection Error",
        message:
          searchParams.get("youtube_error") ||
          "Could not connect YouTube channel.",
      });
    } else if (searchParams?.get("instagram_connected") === "true") {
      const acc = searchParams.get("account") || "Instagram Account";
      addToast({
        type: "success",
        title: "Official Instagram Verified!",
        message: `${acc} verified via Meta OAuth and badged on your profile.`,
      });
      useAuthStore.getState().checkSession();
    }
  }, [searchParams, addToast]);

  // Derived metrics
  const totalFollowers = useMemo(
    () => calculateTotalFollowers(socialAccounts),
    [socialAccounts]
  );
  const avgEngagement = useMemo(
    () => calculateAvgEngagementRate(socialAccounts),
    [socialAccounts]
  );
  const tier = useMemo(() => getCreatorTier(totalFollowers), [totalFollowers]);
  const currencySymbol = useMemo(
    () => getCurrencySymbol(creatorCurrency),
    [creatorCurrency]
  );

  // Profile Completeness & Confirmation calculation
  const completeness = useMemo(() => {
    const unverifiedSocials = (socialAccounts || []).filter(
      (s) => !s.verifiedBadge && s.verificationStatus !== "verified" && !s.verifiedVia
    );
    const hasSocials = Boolean(socialAccounts && socialAccounts.length > 0);
    const allSocialsVerified = hasSocials && unverifiedSocials.length === 0;

    const checks = [
      {
        id: "headline",
        label: "Headline",
        done: Boolean(headline && headline.trim().length >= 5),
      },
      {
        id: "bio",
        label: "Editorial Bio",
        done: Boolean(bio && bio.trim().length >= 20),
      },
      {
        id: "category",
        label: "Niche Category",
        done: Boolean(primaryCategory && primaryCategory.trim().length > 0),
      },
      {
        id: "rates",
        label: "Starting Rate",
        done: Boolean(startingPrice && startingPrice > 0),
      },
      {
        id: "socials",
        label: "Social Channels Added",
        done: hasSocials,
      },
      {
        id: "socials_verified",
        label: "Channel Ownership Verified",
        done: allSocialsVerified,
      },
      {
        id: "avatar",
        label: "Profile Avatar",
        done: Boolean(avatarUrl && avatarUrl.trim().length > 0),
      },
    ];

    const completedCount = checks.filter((c) => c.done).length;
    const score = Math.round((completedCount / checks.length) * 100);
    // Profile is ONLY confirmed if all required fields are complete AND all added social channels are verified
    const isConfirmed = score === 100 && allSocialsVerified;

    return {
      score,
      checks,
      isConfirmed,
      hasSocials,
      allSocialsVerified,
      hasUnverifiedSocials: unverifiedSocials.length > 0,
      unverifiedSocials,
    };
  }, [headline, bio, primaryCategory, startingPrice, socialAccounts, avatarUrl]);

  // Social account management
  const handleAddSocialAccount = () => {
    const validation = validatePlatformHandle(newPlatform, newHandle);
    if (!validation.valid) {
      addToast({
        type: "error",
        title: "Invalid Social Link",
        message:
          validation.error || "Please enter a valid handle or profile link.",
      });
      return;
    }

    const { cleanHandle, url } = validation;
    const alreadyAdded = socialAccounts.some(
      (acc) =>
        acc.platform === newPlatform &&
        acc.handle.toLowerCase() === cleanHandle.toLowerCase()
    );
    if (alreadyAdded) {
      addToast({
        type: "error",
        title: "Already Added",
        message: `You already added @${cleanHandle} on ${newPlatform.toUpperCase()} to your media kit.`,
      });
      return;
    }

    const verificationCode = generateSocialVerificationCode(
      newPlatform,
      cleanHandle
    );

    const newAcc: SocialAccount = {
      id: `sa_${Date.now()}`,
      platform: newPlatform,
      handle: cleanHandle,
      url,
      followers: Number(newFollowers) || 0,
      engagementRate: Number(newEngagement) || 0,
      avgViews: 0,
      verifiedBadge: false,
      verificationStatus: "unverified",
      verificationCode,
    };

    setSocialAccounts((prev) => [...prev, newAcc]);
    setShowAddSocialModal(false);
    setNewHandle("");
    setNewFollowers("");
    setNewEngagement("");

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
          creatorId: currentCreator?.id || user?.id,
          userId: user?.id,
          userName: user?.name,
          userEmail: user?.email,
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

      const updatedAccounts = socialAccounts.map((item) =>
        item.id === acc.id ||
        (item.platform === acc.platform &&
          item.handle.toLowerCase() === acc.handle.toLowerCase())
          ? {
              ...item,
              verifiedBadge: true,
              verificationStatus: "verified" as const,
              verifiedAt: new Date().toISOString(),
            }
          : item
      );
      const finalAccounts = data.creator?.socialAccounts || updatedAccounts;
      setSocialAccounts(finalAccounts);

      if (data.creator) {
        useAuthStore.setState({ currentCreator: data.creator });
      } else if (currentCreator) {
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
      message: "Channel unlinked from your media kit.",
    });
  };

  // Rate card management
  const handleAddRateCard = () => {
    if (!newRateTitle.trim()) {
      addToast({
        type: "error",
        title: "Title Required",
        message: "Please enter a title for this deliverable package.",
      });
      return;
    }
    const priceNum = Number(newRatePrice);
    if (!priceNum || priceNum <= 0) {
      addToast({
        type: "error",
        title: "Valid Price Required",
        message: "Please specify a positive price for this deliverable.",
      });
      return;
    }

    const newItem: RateCardItem = {
      id: `rc_${Date.now()}`,
      title: newRateTitle.trim(),
      deliverableType: newRateType,
      basePrice: priceNum,
      currency: creatorCurrency,
      turnaroundDays: Number(newRateTurnaround) || 3,
      revisionsIncluded: 2,
      description: newRateDescription.trim(),
    };

    setRateCards((prev) => [...prev, newItem]);
    setShowAddRateCardModal(false);
    setNewRateTitle("");
    setNewRatePrice("");
    setNewRateDescription("");
    addToast({
      type: "success",
      title: "Package Added",
      message: `${newItem.title} added to your commercial deliverables.`,
    });
  };

  const handleRemoveRateCard = (id: string) => {
    setRateCards((prev) => prev.filter((r) => r.id !== id));
    addToast({
      type: "info",
      title: "Package Removed",
      message: "Deliverable package removed.",
    });
  };

  // Save profile changes
  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    try {
      if (isBrand) {
        if (!companyName.trim()) {
          throw new Error("Company name is required");
        }
        await updateBrandProfile({
          companyName: companyName.trim(),
          industry: industry.trim(),
          headline: brandHeadline.trim(),
          description: brandDescription.trim(),
          websiteUrl: websiteUrl.trim(),
          location: brandLocation.trim(),
          companySize: companySize.trim(),
          logoUrl: brandLogoUrl.trim(),
        });
        addToast({
          type: "success",
          title: "Brand Profile Saved",
          message: "Your brand profile has been updated successfully.",
        });
      } else {
        const langArray = languages
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        const unverifiedSocials = (socialAccounts || []).filter(
          (s) => !s.verifiedBadge && s.verificationStatus !== "verified" && !s.verifiedVia
        );
        const hasSocials = socialAccounts && socialAccounts.length > 0;
        const allSocialsVerified = hasSocials && unverifiedSocials.length === 0;

        const payload = {
          fullName: fullName.trim() || user?.name || "Creator",
          handle:
            handle.trim().replace(/^@/, "") ||
            user?.name?.toLowerCase().replace(/[^a-z0-9_]/g, "") ||
            "creator",
          headline: headline.trim(),
          bio: bio.trim(),
          avatarUrl: avatarUrl.trim(),
          primaryCategory: (primaryCategory as CreatorCategory) || "Content Creator",
          location: location.trim(),
          languages: langArray,
          availableForHire,
          startingPrice: Number(startingPrice) || 0,
          currency: creatorCurrency,
          socialAccounts,
          rateCards,
          totalFollowers,
          avgEngagementRate: avgEngagement,
          tier,
          verified: allSocialsVerified,
          isAbeyCollabVerified: allSocialsVerified,
        };

        if (currentCreator) {
          await updateCreatorProfile(payload);
        } else if (user?.id) {
          const res = await fetch(`/api/creators/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const data = await res.json();
            useAuthStore.setState({ currentCreator: data });
          }
        }

        if (unverifiedSocials.length > 0) {
          addToast({
            type: "warning",
            title: "Profile Saved (Pending Verification)",
            message: `Profile saved, but remains unconfirmed until ${unverifiedSocials.length} connected channel(s) (${unverifiedSocials.map((s) => `${s.platform.toUpperCase()} @${s.handle}`).join(", ")}) are verified.`,
          });
        } else {
          addToast({
            type: "success",
            title: "Profile Confirmed & Saved",
            message: "All channels verified! Your profile is 100% confirmed and ready for campaigns.",
          });
        }
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

  // ─────────────────────────────────────────────────────────────
  // BRAND VIEW (Bento Workspace)
  // ─────────────────────────────────────────────────────────────
  if (isBrand) {
    return (
      <div className="space-y-6 text-[#0B0A14] dark:text-[#F4F4F8] select-none font-sans max-w-6xl mx-auto pb-16">
        {/* Compact Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8 dark:border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#181826] border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-lg text-[#0B0A14] dark:text-white shadow-xs shrink-0 overflow-hidden relative">
              {brandLogoUrl ? (
                <SafeImage src={brandLogoUrl} alt={companyName} fill className="object-cover" />
              ) : (
                <Building2 className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#0B0A14] dark:text-white font-display tracking-tight">
                  {companyName || "Your Brand"}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-primary dark:text-accent dark:text-yellow-400 font-mono text-[10px] font-bold">
                  Verified Sponsor
                </span>
              </div>
              <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
                {industry || "Brand Partner"} • {brandLocation || "Global"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/brands"
              target="_blank"
              className="px-4 py-2 rounded-full bg-white dark:bg-[#181824] hover:bg-[#F8F8FC] dark:hover:bg-[#202030] border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Browse Directory</span>
            </Link>

            <button
              onClick={() => handleSaveProfile()}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-extrabold text-xs transition-all shadow-[0_4px_16px_rgba(var(--theme-primary-rgb),0.4)] border border-black/10 flex items-center gap-1.5 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Brand Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Brand Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Company Information</span>
            </h2>
            <div className="space-y-3">
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
                required
                placeholder="e.g. Consumer Tech, AI, Gaming"
              />
              <Input
                label="Brand Headline"
                value={brandHeadline}
                onChange={(e) => setBrandHeadline(e.target.value)}
                placeholder="e.g. Next-Generation Developer Productivity Tools"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Operations &amp; Presence</span>
            </h2>
            <div className="space-y-3">
              <Input
                label="Website URL"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://acme.com"
                icon={<Globe className="w-3.5 h-3.5 text-[#8A8A9A]" />}
              />
              <Input
                label="HQ Location"
                value={brandLocation}
                onChange={(e) => setBrandLocation(e.target.value)}
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

          <div className="md:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
            <Textarea
              label="Company Overview & Collaboration Expectations"
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              rows={4}
              placeholder="Tell creators about your brand, products, target audience, and collaboration guidelines..."
            />
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // CREATOR VIEW: Bento Grid Studio (Modern, Minimal & High-End)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 text-[#0B0A14] dark:text-[#F4F4F8] select-none font-sans max-w-7xl mx-auto pb-20">
      {/* ── TOP COMPACT HEADER (Clean, Minimal, High-Status) ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Creator Info */}
        <div className="flex items-center gap-4">
          <div className="relative group shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF9F5] dark:bg-[#1A1A24] ring-4 ring-black/5 dark:ring-white/10 shadow-sm overflow-hidden relative flex items-center justify-center text-xl font-black text-[#0B0A14] dark:text-white isolate">
              {avatarUrl ? (
                <SafeImage
                  src={avatarUrl}
                  alt={fullName}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <span>{fullName?.charAt(0) || "C"}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowPhotoModal(true)}
              className="absolute -bottom-1 -right-1 p-2 rounded-full bg-primary hover:bg-accent text-white shadow-sm border-2 border-white dark:border-[#12121A] transition-all cursor-pointer group-hover:scale-110 active:scale-95 z-10"
              title="Change profile avatar"
            >
              <Camera className="w-3.5 h-3.5 text-[#0B0A14]" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0B0A14] dark:text-white font-display tracking-tight">
                {fullName || "Creator"}
              </h1>
              <span className="text-xs font-mono font-bold text-[#6A6A78] dark:text-[#8E8EA4]">
                @{handle || "handle"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-2xs">
                {tier} Tier
              </span>
              {socialAccounts.some((s) => s.verifiedBadge) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                  <BadgeCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] line-clamp-1 max-w-lg font-medium">
              {headline ? (
                headline
              ) : (
                <span className="italic text-[#8A8A9A]">
                  No headline set yet. Add an editorial headline to attract brands.
                </span>
              )}
            </p>

            {/* Quick Metrics Badges */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] pt-0.5">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-primary" />
                <strong className="text-[#0B0A14] dark:text-white">
                  {(totalFollowers || 0).toLocaleString()}
                </strong>{" "}
                reach
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <strong className="text-[#0B0A14] dark:text-white">
                  {avgEngagement > 0 ? `${avgEngagement.toFixed(1)}%` : "0%"}
                </strong>{" "}
                eng
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <strong className="text-[#0B0A14] dark:text-white">
                  {startingPrice > 0
                    ? `${currencySymbol}${startingPrice.toLocaleString()}`
                    : "Unset"}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Readiness */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-start">
          {/* Readiness Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#FAF9F5] dark:bg-[#181826] border border-black/8 dark:border-white/10 text-[11px] sm:text-xs font-mono">
            {completeness.isConfirmed ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-emerald-800 dark:text-emerald-400">
                  Confirmed (100%)
                </span>
              </>
            ) : completeness.hasUnverifiedSocials ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-bold text-amber-800 dark:text-amber-400">
                  {completeness.unverifiedSocials.length} Unverified
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-black/30 dark:bg-white/30" />
                <span className="font-bold text-[#0B0A14] dark:text-white">
                  {completeness.score}% Setup
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {Boolean(currentCreator?.handle || currentCreator?.id || user?.id) && (
              <Link
                href={`/creators/${
                  currentCreator?.handle || currentCreator?.id || user?.id
                }`}
                target="_blank"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white dark:bg-[#181824] hover:bg-[#F8F8FC] dark:hover:bg-[#202030] border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Public View</span>
                <span className="sm:hidden">Preview</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => handleSaveProfile()}
              disabled={isSaving}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-extrabold text-xs transition-all shadow-[0_4px_16px_rgba(var(--theme-primary-rgb),0.35)] border border-black/10 flex items-center gap-1.5 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── PROFILE COMPLETENESS & CAMPAIGN PITCHING STATUS ── */}
      <div
        className={`p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl border transition-all ${
          completeness.isConfirmed
            ? "bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30"
            : "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30 shadow-xs"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-black/8 dark:border-white/10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  completeness.isConfirmed
                    ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                }`}
              >
                {completeness.isConfirmed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Profile Confirmed • Ready to Apply</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Campaign Pitching Locked • Complete Profile to Apply</span>
                  </>
                )}
              </span>

              <span className="text-xs font-mono font-bold text-[#0B0A14] dark:text-white">
                {completeness.score}% Completed
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#0B0A14] dark:text-white font-display">
              {completeness.isConfirmed
                ? "Your creator profile is confirmed & eligible for campaign pitches"
                : "You cannot apply for brand campaigns until your profile details are complete & channels are verified"}
            </h3>
            <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed max-w-3xl">
              {completeness.isConfirmed
                ? "All required details and channel ownership verifications are satisfied. You can submit proposals, set custom milestones, and accept escrow brand briefs."
                : "First complete all 7 requirements below. Until all details are added and all connected social accounts (Instagram, YouTube, etc.) are verified, your profile remains unconfirmed and you cannot apply for campaigns."}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {completeness.isConfirmed ? (
              <Link href="/app/campaigns">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 border border-black/10 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Browse &amp; Apply to Briefs</span>
                </button>
              </Link>
            ) : (
              <div className="px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/25 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{completeness.checks.filter((c) => !c.done).length} Requirement(s) Remaining</span>
              </div>
            )}
          </div>
        </div>

        {/* 7-Step Interactive Verification Progress Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-5">
          {completeness.checks.map((check) => (
            <div
              key={check.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                check.done
                  ? "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30"
                  : "bg-white dark:bg-[#161622] border-black/8 dark:border-white/10"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {check.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Circle className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs font-bold leading-tight ${
                    check.done
                      ? "text-emerald-950 dark:text-emerald-300"
                      : "text-[#0B0A14] dark:text-white"
                  }`}
                >
                  {check.label}
                </p>
                <span
                  className={`text-[10px] font-mono block mt-0.5 ${
                    check.done
                      ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                      : "text-[#7A7A8A] dark:text-[#A0A0B4]"
                  }`}
                >
                  {check.done ? "Completed" : "Required to Apply"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BENTO GRID STUDIO CANVAS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* ── BENTO CARD 1: STORY & POSITIONING (8 Cols) ── */}
        <div className="lg:col-span-8 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
            <h2 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Identity &amp; Editorial Positioning</span>
            </h2>
            <span className="text-[10px] font-mono text-[#8A8A9A] dark:text-[#6A6A7E] uppercase font-bold">
              Core Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Display Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="e.g. Alex Morgan"
            />
            <Input
              label="Handle"
              value={handle}
              onChange={(e) =>
                setHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))
              }
              required
              placeholder="e.g. alexmorgan"
              icon={<span className="text-xs font-mono font-bold">@</span>}
            />
          </div>

          <Input
            label="Editorial Headline (Pitch to Brands)"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. AI & Tech Storyteller • High-Conversion Video Producer"
            required
          />

          <Textarea
            label="About You & Content Style"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell brands about what kind of content you create, your production standard, and why your audience converts..."
            required
          />

          {/* Niche Categories Pill Cloud */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0B0A14] dark:text-[#EAEAEF] block font-display">
                Primary Niche Category
              </label>
              {!primaryCategory && (
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
                  Select your content niche
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CATEGORIES.map((cat) => {
                const isSelected = primaryCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPrimaryCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#0B0A14] dark:bg-primary text-white dark:text-white border-[#0B0A14] dark:border-primary font-bold shadow-2xs"
                        : "bg-[#F8F8FC] dark:bg-[#181824] hover:bg-[#EFEFF8] dark:hover:bg-[#202030] text-[#5A5A68] dark:text-[#A0A0B4] border-black/6 dark:border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── BENTO CARD 2: COMMERCIAL PRICING (4 Cols) ── */}
        <div className="lg:col-span-4 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
              <h2 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Commercial Pricing</span>
              </h2>
              <span className="text-[10px] font-mono text-[#8A8A9A] dark:text-[#6A6A7E] uppercase font-bold">
                Rates
              </span>
            </div>

            <div className="space-y-3">
              <Input
                label="Starting Rate (₹ INR)"
                type="number"
                min={0}
                step={10}
                placeholder="e.g. 500"
                value={startingPrice === 0 ? "" : startingPrice}
                onChange={(e) =>
                  setStartingPrice(Number(e.target.value) || 0)
                }
                required
              />

              {/* Settlement Currency Rail */}
              <div>
                <label className="text-xs font-bold text-[#0B0A14] dark:text-[#EAEAEF] block mb-1.5 font-display">
                  Settlement Currency
                </label>
                <div className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-[#F8F8FC] dark:bg-[#181824] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base" role="img" aria-label="India Flag">🇮🇳</span>
                    <span className="text-xs font-mono font-extrabold text-[#0B0A14] dark:text-white">
                      INR (₹)
                    </span>
                    <span className="text-[11px] text-[#6A6A78] dark:text-[#8E8EA4]">
                      • Indian Rupee
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">
                    Active Rails
                  </span>
                </div>
                <p className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] mt-1.5 leading-relaxed font-sans">
                  Rates are settled in <strong>INR (₹)</strong>. Multi-currency payouts (USD, EUR, GBP) are scheduled for <strong>Phase 2</strong>.
                </p>
              </div>

              {/* Availability Toggle */}
              <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#181824] border border-black/6 dark:border-white/10">
                <div>
                  <span className="text-xs font-bold text-[#0B0A14] dark:text-white block">
                    Available for Sponsorships
                  </span>
                  <span className="text-[11px] text-[#6A6A78] dark:text-[#8E8EA4]">
                    Show &apos;Available&apos; badge to brands
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAvailableForHire(!availableForHire)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    availableForHire ? "bg-emerald-500" : "bg-black/20 dark:bg-white/20"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-xs ${
                      availableForHire ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-black/6 dark:border-white/10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#6A6A78] dark:text-[#8E8EA4]">Active Packages:</span>
              <strong className="text-[#0B0A14] dark:text-white">{rateCards.length} defined</strong>
            </div>
          </div>
        </div>

        {/* ── BENTO CARD 3: VERIFIED SOCIAL CHANNELS (7 Cols) ── */}
        <div className="lg:col-span-7 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
            <div>
              <h2 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Audience Reach &amp; Connected Channels</span>
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Official OAuth sync &amp; audited social channels
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddSocialModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#0B0A14] dark:bg-primary hover:bg-[#20202B] dark:hover:bg-accent text-white dark:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect</span>
            </button>
          </div>

          {/* Quick OAuth Connect Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col justify-between gap-2">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold text-red-900 dark:text-red-300">
                  YouTube Verification
                </span>
              </div>
              <GoogleSignInButton
                mode="connect_youtube"
                label="Connect YouTube"
                className="!h-8 !py-0 !px-3 !text-xs !rounded-xl !bg-red-600 hover:!bg-red-700 !text-white font-bold border-0 cursor-pointer shadow-2xs"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex flex-col justify-between gap-2">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-bold text-pink-900 dark:text-pink-300">
                  Instagram Handshake
                </span>
              </div>
              <InstagramSignInButton
                mode="connect_instagram"
                label="Connect Instagram"
                className="!h-8 !py-0 !px-3 !text-xs !rounded-xl !bg-gradient-to-r !from-purple-600 !via-pink-600 !to-rose-500 !text-white font-bold border-0 cursor-pointer shadow-2xs"
              />
            </div>
          </div>

          {/* Unverified Channel Warning Alert */}
          {completeness.hasUnverifiedSocials && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-300">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-extrabold text-sm text-[#0B0A14] dark:text-white">
                  Channel Ownership Verification Required
                </p>
                <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                  Until and unless all added channels (Instagram, YouTube, etc.) are verified, your profile remains <strong>unconfirmed</strong> and campaign applications are locked. Click <strong>Verify Ownership</strong> on unverified channels below.
                </p>
              </div>
            </div>
          )}

          {/* Connected Accounts List */}
          <div className="space-y-2 pt-1">
            {socialAccounts.length === 0 ? (
              <div className="p-6 text-center rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#161622] space-y-2">
                <p className="text-xs font-bold text-[#0B0A14] dark:text-white">
                  No Connected Channels Yet
                </p>
                <p className="text-[11px] text-[#6A6A78] dark:text-[#9A9AA8] max-w-sm mx-auto">
                  Connect YouTube or Instagram to verify your follower reach and receive brand proposals.
                </p>
              </div>
            ) : (
              socialAccounts.map((acc) => {
                const isVerified =
                  acc.verifiedBadge || acc.verificationStatus === "verified";
                return (
                  <div
                    key={acc.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isVerified
                        ? "bg-[#FAF9F5] dark:bg-[#181824] border-black/6 dark:border-white/10"
                        : "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 flex items-center justify-center text-[#0B0A14] dark:text-white shrink-0">
                        {acc.platform === "youtube" && (
                          <Youtube className="w-4 h-4 text-red-600" />
                        )}
                        {acc.platform === "instagram" && (
                          <Instagram className="w-4 h-4 text-pink-600" />
                        )}
                        {acc.platform === "x" && (
                          <Twitter className="w-4 h-4 text-[#0B0A14] dark:text-white" />
                        )}
                        {acc.platform === "linkedin" && (
                          <Linkedin className="w-4 h-4 text-blue-600" />
                        )}
                        {acc.platform === "tiktok" && (
                          <Video className="w-4 h-4 text-[#0B0A14] dark:text-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-xs text-[#0B0A14] dark:text-white truncate">
                            @{acc.handle}
                          </span>
                          {isVerified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-900 dark:text-amber-300 text-[10px] font-mono font-bold">
                              <ShieldAlert className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              <span>Unverified Channel</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                          {(acc.followers || 0).toLocaleString()} reach • {acc.engagementRate}% ER
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/6 dark:border-white/10">
                      {!isVerified && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVerifyAccount(acc);
                            setShowVerifyModal(true);
                          }}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white text-[11px] font-bold font-mono cursor-pointer shadow-xs transition-all active:scale-95 flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verify Ownership</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveSocial(acc.id)}
                        className="text-[#8A8A9A] hover:text-red-500 p-1 transition-colors ml-auto sm:ml-0"
                        title="Remove channel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── BENTO CARD 4: TERRITORY & AUDIENCE (5 Cols) ── */}
        <div className="lg:col-span-5 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
            <h2 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Territory &amp; Content Language</span>
            </h2>
            <span className="text-[10px] font-mono text-[#8A8A9A] dark:text-[#6A6A7E] uppercase font-bold">
              Audience
            </span>
          </div>

          <div className="space-y-4">
            <Input
              label="Operational Territory / Base"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Mumbai, India or San Francisco, USA"
              icon={<MapPin className="w-3.5 h-3.5 text-[#8A8A9A]" />}
            />

            <Input
              label="Content Languages"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              placeholder="e.g. English, Hindi"
              icon={<Languages className="w-3.5 h-3.5 text-[#8A8A9A]" />}
            />

            <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#181824] border border-black/6 dark:border-white/10 text-xs space-y-1.5">
              <span className="font-bold text-[#0B0A14] dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Escrow Guarantee</span>
              </span>
              <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] leading-relaxed">
                All collaborations booked through AbeyCollab are backed by 100% upfront brand escrow protection.
              </p>
            </div>
          </div>
        </div>

        {/* ── BENTO CARD 5: DELIVERABLE PACKAGES & TURNAROUND (12 Cols) ── */}
        <div className="lg:col-span-12 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/8 dark:border-white/10">
            <div>
              <h2 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span>Custom Deliverable Packages &amp; Turnaround Times</span>
              </h2>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                Stand-alone packages brands can select when drafting proposals
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddRateCardModal(true)}
              className="px-4 py-2 rounded-full bg-[#0B0A14] dark:bg-primary hover:bg-[#20202B] dark:hover:bg-accent text-white dark:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Package</span>
            </button>
          </div>

          {rateCards.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#161622] space-y-3">
              <p className="text-xs text-[#6A6A78] dark:text-[#9A9AA8]">
                No custom packages yet. Add your standard formats (e.g. 60s Reel, Dedicated Video, Newsletter Integration) with turnaround days.
              </p>
              <button
                type="button"
                onClick={() => setShowAddRateCardModal(true)}
                className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:border-primary text-xs font-bold transition-colors cursor-pointer"
              >
                + Create First Package
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rateCards.map((rc) => (
                <div
                  key={rc.id}
                  className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary dark:text-accent dark:text-accent font-mono text-[10px] font-bold">
                        {rc.deliverableType}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRateCard(rc.id)}
                        className="text-[#8A8A9A] hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                      {rc.title}
                    </h4>
                    {rc.description && (
                      <p className="text-[11px] text-[#6A6A78] dark:text-[#8E8EA4] line-clamp-2">
                        {rc.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 font-mono text-xs">
                    <span className="text-[#6A6A78] dark:text-[#8E8EA4] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rc.turnaroundDays}d turnaround
                    </span>
                    <span className="font-bold text-[#0B0A14] dark:text-white">
                      {currencySymbol}
                      {rc.basePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ── */}

      {/* 1. Photo Avatar Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#12121A] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 dark:border-white/10 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
              <h3 className="text-base font-bold text-[#0B0A14] dark:text-white font-display">
                Profile Avatar
              </h3>
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="text-[#8A8A9A] hover:text-[#0B0A14] dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Avatar Image URL"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />

              {(user?.avatarUrl || (user as any)?.image) && (
                <button
                  type="button"
                  onClick={() =>
                    setAvatarUrl(user?.avatarUrl || (user as any)?.image || "")
                  }
                  className="text-xs font-mono text-[#0055D6] dark:text-accent hover:underline flex items-center gap-1"
                >
                  <span>Use Connected Account Avatar</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/8 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-5 py-2.5 rounded-full bg-[#0B0A14] dark:bg-primary text-white dark:text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Add Social Channel Modal */}
      {showAddSocialModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#12121A] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 dark:border-white/10 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
              <h3 className="text-base font-bold text-[#0B0A14] dark:text-white font-display">
                Add Social Channel
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSocialModal(false)}
                className="text-[#8A8A9A] hover:text-[#0B0A14] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0B0A14] dark:text-[#EAEAEF] block mb-1">
                  Platform
                </label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-sans bg-[#F8F8FC] dark:bg-[#181824] text-[#0B0A14] dark:text-white font-medium cursor-pointer"
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
                onChange={(e) => handleLinkChange(e.target.value)}
                required
              />

              <Input
                label="Followers / Subscribers"
                type="number"
                placeholder="e.g. 25000"
                value={newFollowers}
                onChange={(e) =>
                  setNewFollowers(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                required
              />

              <Input
                label="Average Engagement Rate (%)"
                type="number"
                step="0.1"
                placeholder="e.g. 4.5"
                value={newEngagement}
                onChange={(e) =>
                  setNewEngagement(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/8 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowAddSocialModal(false)}
                className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSocialAccount}
                className="px-5 py-2 rounded-full bg-[#0B0A14] dark:bg-primary text-white dark:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Add Channel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Add Rate Card Package Modal */}
      {showAddRateCardModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#12121A] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 dark:border-white/10 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
              <h3 className="text-base font-bold text-[#0B0A14] dark:text-white font-display">
                Add Deliverable Package
              </h3>
              <button
                type="button"
                onClick={() => setShowAddRateCardModal(false)}
                className="text-[#8A8A9A] hover:text-[#0B0A14] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0B0A14] dark:text-[#EAEAEF] block mb-1">
                  Deliverable Format
                </label>
                <select
                  value={newRateType}
                  onChange={(e) =>
                    setNewRateType(e.target.value as DeliverableType)
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-sans bg-[#F8F8FC] dark:bg-[#181824] text-[#0B0A14] dark:text-white font-medium cursor-pointer"
                >
                  {DELIVERABLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Package Title"
                placeholder="e.g. 60s Instagram Reel + Story Amplification"
                value={newRateTitle}
                onChange={(e) => setNewRateTitle(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Price (₹ INR)"
                  type="number"
                  placeholder="e.g. 5000"
                  value={newRatePrice}
                  onChange={(e) =>
                    setNewRatePrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  required
                />
                <Input
                  label="Turnaround (Days)"
                  type="number"
                  placeholder="e.g. 3"
                  value={newRateTurnaround}
                  onChange={(e) =>
                    setNewRateTurnaround(Number(e.target.value) || 3)
                  }
                  required
                />
              </div>

              <Textarea
                label="Package Deliverable Details"
                placeholder="What is included? e.g. Scripting, 1 round of brand revisions, raw video file..."
                value={newRateDescription}
                onChange={(e) => setNewRateDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/8 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowAddRateCardModal(false)}
                className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddRateCard}
                className="px-5 py-2 rounded-full bg-[#0B0A14] dark:bg-primary text-white dark:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Create Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Social Account Ownership Verification Modal */}
      {showVerifyModal && selectedVerifyAccount && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#12121A] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 dark:border-white/10 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/8 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B0A14] dark:text-white font-display">
                    Verify Channel Ownership
                  </h3>
                  <span className="text-xs text-[#5A5A68] dark:text-[#A0A0B4]">
                    Confirm ownership to get verified
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowVerifyModal(false);
                  setSelectedVerifyAccount(null);
                }}
                className="text-[#8A8A9A] hover:text-[#0B0A14] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold font-mono">
                  Account
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-[11px] font-mono font-bold capitalize text-[#0B0A14] dark:text-white">
                  {selectedVerifyAccount.platform}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B0A14] dark:text-white">
                  @{selectedVerifyAccount.handle}
                </span>
                <a
                  href={selectedVerifyAccount.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0055D6] dark:text-accent hover:underline flex items-center gap-1 font-mono"
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
                <div className="p-3.5 rounded-2xl bg-[#FFFDF0] dark:bg-[#1C1808] border border-primary/40 dark:border-primary/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#0B0A14] dark:text-[#F4F4F8]">
                      Your Verification Code
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyCode(
                          selectedVerifyAccount.verificationCode || ""
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 text-xs font-mono font-bold text-[#0B0A14] dark:text-white transition-all shadow-2xs"
                    >
                      {hasCopiedCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#7A7A8A] dark:text-[#8E8EA4]" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#12121A] rounded-xl border border-black/6 dark:border-white/10 font-mono text-center font-black text-sm tracking-wider text-[#0B0A14] dark:text-accent">
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
                className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4]"
              >
                Verify Later
              </button>
              <button
                type="button"
                onClick={() => handleVerifyAccount(selectedVerifyAccount)}
                disabled={isVerifying}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
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
