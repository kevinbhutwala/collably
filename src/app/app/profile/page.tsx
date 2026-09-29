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
  DollarSign,
  Eye,
  Camera,
  Clock,
  Layers,
  Star,
  Zap,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Award,
  FileText,
  Compass,
  ChevronRight,
  RefreshCw,
  X,
  Sliders,
  Tag,
  Languages,
  BadgeCheck,
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

const CURRENCIES = ["USD", "INR", "EUR", "GBP", "AED", "CAD", "AUD"];

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

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    "identity" | "socials" | "rates" | "preview"
  >("identity");

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
  const [coverImageUrl, setCoverImageUrl] = useState(
    currentCreator?.coverImageUrl || ""
  );
  const [primaryCategory, setPrimaryCategory] = useState<CreatorCategory>(
    currentCreator?.primaryCategory || "Technology & AI"
  );
  const [location, setLocation] = useState(currentCreator?.location || "");
  const [languages, setLanguages] = useState<string>(
    (currentCreator?.languages || ["English"]).join(", ")
  );
  const [startingPrice, setStartingPrice] = useState<number>(
    currentCreator?.startingPrice || 0
  );
  const [creatorCurrency, setCreatorCurrency] = useState<string>(
    (currentCreator?.currency as string) || globalCurrency || "USD"
  );
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
      setCoverImageUrl(currentCreator.coverImageUrl || "");
      setPrimaryCategory(currentCreator.primaryCategory || "Technology & AI");
      setLocation(currentCreator.location || "");
      setLanguages((currentCreator.languages || ["English"]).join(", "));
      setStartingPrice(currentCreator.startingPrice || 0);
      setCreatorCurrency(
        (currentCreator.currency as string) || globalCurrency || "USD"
      );
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

  // Profile Completeness calculation
  const completeness = useMemo(() => {
    const checks = [
      {
        id: "headline",
        label: "Profile Headline",
        done: Boolean(headline && headline.trim().length >= 5),
      },
      {
        id: "bio",
        label: "Editorial Bio",
        done: Boolean(bio && bio.trim().length >= 20),
      },
      {
        id: "rates",
        label: "Starting Rate",
        done: Boolean(startingPrice && startingPrice > 0),
      },
      {
        id: "socials",
        label: "Connected Channel",
        done: Boolean(socialAccounts && socialAccounts.length > 0),
      },
      {
        id: "avatar",
        label: "Profile Avatar",
        done: Boolean(avatarUrl && avatarUrl.trim().length > 0),
      },
    ];
    const completedCount = checks.filter((c) => c.done).length;
    const score = Math.round((completedCount / checks.length) * 100);
    return { score, checks, isComplete: score === 100 };
  }, [headline, bio, startingPrice, socialAccounts, avatarUrl]);

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

        const payload = {
          fullName: fullName.trim() || user?.name || "Creator",
          handle:
            handle.trim().replace(/^@/, "") ||
            user?.name?.toLowerCase().replace(/[^a-z0-9_]/g, "") ||
            "creator",
          headline: headline.trim(),
          bio: bio.trim(),
          avatarUrl: avatarUrl.trim(),
          coverImageUrl: coverImageUrl.trim(),
          primaryCategory,
          location: location.trim(),
          languages: langArray.length > 0 ? langArray : ["English"],
          startingPrice: Number(startingPrice) || 0,
          currency: creatorCurrency,
          socialAccounts,
          rateCards,
          totalFollowers,
          avgEngagementRate: avgEngagement,
          tier,
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

        addToast({
          type: "success",
          title: "Profile & Media Kit Saved",
          message: "All changes are live and visible to partnering brands.",
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

  // ─────────────────────────────────────────────────────────────
  // BRAND VIEW
  // ─────────────────────────────────────────────────────────────
  if (isBrand) {
    return (
      <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans max-w-6xl mx-auto pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#EAEAEF] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Brand Workspace
              </span>
              <span className="text-[#8A8A9A] dark:text-[#6A6A7E]">•</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-yellow-400 font-mono text-[10px] font-bold">
                Verified Sponsor
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] dark:text-white font-display tracking-tight">
              Brand Profile &amp; Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
              Manage your company information, brand bio, and public presence for creators.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <Link
              href="/brands"
              target="_blank"
              className="px-4 py-2.5 rounded-full bg-white dark:bg-[#181824] hover:bg-[#F8F8FC] dark:hover:bg-[#202030] border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Browse Directory</span>
            </Link>

            <button
              onClick={() => handleSaveProfile()}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center gap-1.5 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
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
                required
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
                required
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

            <div className="pt-2">
              <Input
                label="Brand Logo URL"
                value={brandLogoUrl}
                onChange={(e) => setBrandLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // CREATOR VIEW (World-Class Redesigned Media Kit & Profile Studio)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans max-w-7xl mx-auto pb-24">
      {/* ── HERO BANNER: Identity Command Strip ── */}
      <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-[0_6px_28px_rgba(0,0,0,0.04)] overflow-hidden relative">
        {/* Cover Backdrop */}
        <div className="h-32 sm:h-44 w-full bg-gradient-to-r from-[#FFD21F]/20 via-[#FFE052]/10 to-amber-500/15 dark:from-[#FFD21F]/15 dark:via-[#1A1A28] dark:to-[#12121A] relative overflow-hidden">
          {coverImageUrl ? (
            <SafeImage
              src={coverImageUrl}
              alt="Cover Banner"
              fill
              className="object-cover opacity-60"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(#FFD21F_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          )}

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPhotoModal(true)}
              className="px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 shadow-sm border border-white/20 cursor-pointer"
            >
              <Camera className="w-3 h-3 text-[#FFD21F]" />
              <span>Change Cover / Avatar</span>
            </button>
          </div>
        </div>

        {/* Identity Row */}
        <div className="px-5 sm:px-8 pb-6 pt-0 relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 -mt-12 sm:-mt-16">
            {/* Avatar + Main Title */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5">
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-[#FAF9F5] dark:bg-[#1A1A24] border-4 border-white dark:border-[#12121A] shadow-md overflow-hidden flex items-center justify-center text-2xl font-black text-[#0A0A0E] dark:text-white">
                  {avatarUrl ? (
                    <SafeImage
                      src={avatarUrl}
                      alt={fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span>{fullName?.charAt(0) || "C"}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(true)}
                  className="absolute bottom-1 right-1 p-2 rounded-xl bg-[#FFD21F] hover:bg-[#FFE052] text-[#0A0A0E] shadow-sm transition-all cursor-pointer group-hover:scale-105"
                  title="Update profile avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display tracking-tight">
                    {fullName || "Your Creator Name"}
                  </h1>
                  <span className="text-xs font-mono font-bold text-[#6A6A78] dark:text-[#8E8EA4]">
                    @{handle || "handle"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-[#FFD21F] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {tier} Tier
                  </span>
                  {socialAccounts.some((s) => s.verifiedBadge) && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                      <BadgeCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] line-clamp-1 max-w-xl font-medium">
                  {headline || "No headline set yet. Add a catchy title for brands."}
                </p>

                {/* Micro Stats Strip */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] pt-0.5">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#FFD21F]" />
                    <strong className="text-[#0A0A0E] dark:text-white">
                      {(totalFollowers || 0).toLocaleString()}
                    </strong>{" "}
                    Total Reach
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#FFD21F]" />
                    <strong className="text-[#0A0A0E] dark:text-white">
                      {avgEngagement.toFixed(1)}%
                    </strong>{" "}
                    Avg Engagement
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-500" />
                    <strong className="text-[#0A0A0E] dark:text-white">
                      {startingPrice > 0
                        ? `${currencySymbol}${startingPrice}`
                        : "Rate not set"}
                    </strong>{" "}
                    Starting
                  </span>
                </div>
              </div>
            </div>

            {/* Top Action Buttons & Completeness Meter */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Completeness Capsule */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#FAF9F5] dark:bg-[#181826] border border-black/8 dark:border-white/10">
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      className="stroke-black/10 dark:stroke-white/10"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#FFD21F"
                      strokeWidth="3.5"
                      strokeDasharray={88}
                      strokeDashoffset={88 - (88 * completeness.score) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-mono font-black text-[#0A0A0E] dark:text-white">
                    {completeness.score}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#6A6A78] dark:text-[#8E8EA4] block leading-none">
                    Media Kit Health
                  </span>
                  <span className="text-xs font-bold text-[#0A0A0E] dark:text-white">
                    {completeness.isComplete ? "100% Ready" : "Incomplete"}
                  </span>
                </div>
              </div>

              {Boolean(currentCreator?.handle || currentCreator?.id || user?.id) && (
                <Link
                  href={`/creators/${
                    currentCreator?.handle || currentCreator?.id || user?.id
                  }`}
                  target="_blank"
                  className="px-4 py-2.5 rounded-full bg-white dark:bg-[#181824] hover:bg-[#F8F8FC] dark:hover:bg-[#202030] border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Preview Public Media Kit</span>
                  <span className="sm:hidden">Preview</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => handleSaveProfile()}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center gap-1.5 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Segmented Navigation Tabs ── */}
        <div className="px-5 sm:px-8 border-t border-black/6 dark:border-white/10 bg-[#FAF9F5]/70 dark:bg-[#151520]/70 flex items-center gap-2 overflow-x-auto scrollbar-none py-2.5">
          {[
            {
              id: "identity",
              label: "Story & Identity",
              icon: Sparkles,
              count: null,
            },
            {
              id: "socials",
              label: "Verified Channels",
              icon: Zap,
              count: socialAccounts.length,
            },
            {
              id: "rates",
              label: "Rates & Deliverables",
              icon: DollarSign,
              count: rateCards.length,
            },
            {
              id: "preview",
              label: "Live Media Kit",
              icon: Eye,
              count: null,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] shadow-sm"
                    : "text-[#6A6A78] dark:text-[#9A9AA8] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive
                        ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#0A0A0E]"
                        : "bg-black/5 dark:bg-white/10 text-[#6A6A78] dark:text-[#9A9AA8]"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN STUDIO CONTENT (2-Column Grid) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN: Active Settings Tab (8 Cols) ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: STORY & IDENTITY */}
          {activeTab === "identity" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Basic Info */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
                  <div>
                    <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                      Creator Story &amp; Headline
                    </h2>
                    <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4]">
                      Tell brands who you are and why your audience engages with your content.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#8A8A9A] dark:text-[#6A6A7E] uppercase font-bold">
                    Tab 1 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name / Brand Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Alex Morgan"
                  />
                  <Input
                    label="Creator Handle"
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
                  label="Profile Headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. AI & Tech Storyteller • Short-Form Video Producer"
                  required
                />

                <Textarea
                  label="Editorial Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="Write a compelling overview of your content focus, production aesthetic, and the brands you love to partner with..."
                  required
                />
              </div>

              {/* Niche & Category Selection */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#FFD21F]" />
                    <span>Primary Editorial Category</span>
                  </h2>
                  <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                    Select your core niche so matching brand campaigns surface in your feed.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {AVAILABLE_CATEGORIES.map((cat) => {
                    const isSelected = primaryCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPrimaryCategory(cat)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] border-[#0A0A0E] dark:border-[#FFD21F] font-bold shadow-xs"
                            : "bg-[#F8F8FC] dark:bg-[#181824] hover:bg-[#EFEFF8] dark:hover:bg-[#202030] text-[#4A4A58] dark:text-[#B0B0C0] border-black/6 dark:border-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location & Languages */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#FFD21F]" />
                    <span>Geographic &amp; Language Reach</span>
                  </h2>
                  <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                    Helps international brands verify demographic suitability for targeted deals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <Input
                    label="Home Base / City & Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai, India or New York, USA"
                    icon={<MapPin className="w-3.5 h-3.5 text-[#8A8A9A]" />}
                  />
                  <Input
                    label="Content Languages (Comma-separated)"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="e.g. English, Hindi"
                    icon={<Languages className="w-3.5 h-3.5 text-[#8A8A9A]" />}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VERIFIED CHANNELS */}
          {activeTab === "socials" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/8 dark:border-white/10">
                  <div>
                    <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#FFD21F]" />
                      <span>Connected Social Channels</span>
                    </h2>
                    <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                      Sync live metrics via OAuth or add manual links with our verification handshake.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddSocialModal(true)}
                    className="px-4 py-2 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] hover:bg-[#20202B] dark:hover:bg-[#FFE052] text-white dark:text-[#0A0A0E] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Connect Channel</span>
                  </button>
                </div>

                {/* Instant Official Handshake Banners */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-red-900 dark:text-red-300 flex items-center gap-1.5">
                        <Youtube className="w-4 h-4 text-red-600" />
                        <span>Official YouTube OAuth</span>
                      </span>
                      <p className="text-[11px] text-red-800/80 dark:text-red-300/80 mt-1">
                        1-click Google OAuth verification. Instantly syncs subscriber count and watch metrics.
                      </p>
                    </div>
                    <GoogleSignInButton
                      mode="connect_youtube"
                      label="Connect YouTube"
                      className="!h-8.5 !py-0 !px-4 !text-xs !rounded-xl !bg-red-600 hover:!bg-red-700 !text-white font-bold border-0 cursor-pointer shadow-xs"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-pink-900 dark:text-pink-300 flex items-center gap-1.5">
                        <Instagram className="w-4 h-4 text-pink-600" />
                        <span>Official Instagram Handshake</span>
                      </span>
                      <p className="text-[11px] text-pink-800/80 dark:text-pink-300/80 mt-1">
                        Meta OAuth connection. Syncs live followers and grants verified platform status.
                      </p>
                    </div>
                    <InstagramSignInButton
                      mode="connect_instagram"
                      label="Connect Instagram"
                      className="!h-8.5 !py-0 !px-4 !text-xs !rounded-xl !bg-gradient-to-r !from-purple-600 !via-pink-600 !to-rose-500 !text-white font-bold border-0 cursor-pointer shadow-xs"
                    />
                  </div>
                </div>

                {/* Accounts List */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-[#7A7A8A] dark:text-[#8E8EA4]">
                    Active Media Kit Channels ({socialAccounts.length})
                  </h3>

                  {socialAccounts.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 bg-[#FAFAFC] dark:bg-[#161622] space-y-3">
                      <div className="w-10 h-10 mx-auto rounded-full bg-amber-50 dark:bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-[#0A0A0E] dark:text-white">
                          No Channels Linked
                        </p>
                        <p className="text-xs text-[#6A6A78] dark:text-[#9A9AA8] max-w-sm mx-auto">
                          Connect at least one channel above to establish your verified audience reach and qualify for brand campaigns.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {socialAccounts.map((acc) => {
                        const isVerified =
                          acc.verifiedBadge || acc.verificationStatus === "verified";
                        return (
                          <div
                            key={acc.id}
                            className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 flex flex-col justify-between gap-3 transition-all hover:border-[#FFD21F]/60"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 flex items-center justify-center text-[#0A0A0E] dark:text-white shadow-2xs shrink-0">
                                  {acc.platform === "youtube" && (
                                    <Youtube className="w-4 h-4 text-red-600" />
                                  )}
                                  {acc.platform === "instagram" && (
                                    <Instagram className="w-4 h-4 text-pink-600" />
                                  )}
                                  {acc.platform === "x" && (
                                    <Twitter className="w-4 h-4 text-[#0A0A0E] dark:text-white" />
                                  )}
                                  {acc.platform === "linkedin" && (
                                    <Linkedin className="w-4 h-4 text-blue-600" />
                                  )}
                                  {acc.platform === "tiktok" && (
                                    <Video className="w-4 h-4 text-[#0A0A0E] dark:text-white" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-xs text-[#0A0A0E] dark:text-white truncate">
                                      @{acc.handle}
                                    </span>
                                    {isVerified ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    ) : (
                                      <Circle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                    )}
                                  </div>
                                  <span className="text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] block">
                                    {(acc.followers || 0).toLocaleString()} followers
                                    {acc.engagementRate
                                      ? ` • ${acc.engagementRate}% ER`
                                      : ""}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveSocial(acc.id)}
                                className="text-[#8A8A9A] dark:text-[#6A6A7E] hover:text-red-600 dark:hover:text-red-400 p-1.5 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
                                title="Remove channel"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-[11px] font-mono">
                              <a
                                href={acc.url || `https://${acc.platform}.com/${acc.handle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0055D6] dark:text-[#FFD21F] hover:underline flex items-center gap-1"
                              >
                                <span>Visit Profile</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>

                              {!isVerified && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedVerifyAccount(acc);
                                    setShowVerifyModal(true);
                                  }}
                                  className="text-amber-700 dark:text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>Verify Code</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RATES & COMMERCIAL SERVICES */}
          {activeTab === "rates" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Baseline Rate & Currency */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>Commercial Starting Rate</span>
                  </h2>
                  <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                    Your baseline floor price for brand sponsorships and creative deliverables.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <Input
                      label={`Starting Rate (${currencySymbol} ${creatorCurrency})`}
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
                    <p className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] font-mono mt-1">
                      Display equivalent in brand discovery catalogs.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0E] dark:text-[#EAEAEF] block mb-1.5 font-display">
                      Settlement Currency
                    </label>
                    <select
                      value={creatorCurrency}
                      onChange={(e) => setCreatorCurrency(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-mono font-bold bg-[#F8F8FC] dark:bg-[#181824] text-[#0A0A0E] dark:text-white"
                    >
                      {CURRENCIES.map((cur) => (
                        <option key={cur} value={cur}>
                          {cur} ({getCurrencySymbol(cur)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Deliverable Rate Cards */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/8 dark:border-white/10">
                  <div>
                    <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#FFD21F]" />
                      <span>Commercial Deliverable Packages</span>
                    </h2>
                    <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                      Define standalone services brands can book directly from your media kit.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddRateCardModal(true)}
                    className="px-4 py-2 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] hover:bg-[#20202B] dark:hover:bg-[#FFE052] text-white dark:text-[#0A0A0E] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Package</span>
                  </button>
                </div>

                {rateCards.length === 0 ? (
                  <div className="p-6 text-center rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 bg-[#FAFAFC] dark:bg-[#161622] space-y-3">
                    <p className="text-xs text-[#6A6A78] dark:text-[#9A9AA8]">
                      No individual packages listed yet. Add your standard formats (e.g. 60s Reel, Dedicated Video, Newsletter Integration) with turnaround days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAddRateCardModal(true)}
                      className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:border-[#FFD21F] text-xs font-bold transition-colors cursor-pointer"
                    >
                      + Create First Package
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {rateCards.map((rc) => (
                      <div
                        key={rc.id}
                        className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] font-mono text-[10px] font-bold">
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
                          <h4 className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
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
                          <span className="font-bold text-[#0A0A0E] dark:text-white">
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
          )}

          {/* TAB 4: LIVE MEDIA KIT PREVIEW */}
          {activeTab === "preview" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#FFD21F]" />
                    <span>Brand Perspective Preview</span>
                  </h2>
                  <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5">
                    This is how Fortune 500 &amp; top agencies see your media kit card.
                  </p>
                </div>
                {Boolean(currentCreator?.handle || currentCreator?.id || user?.id) && (
                  <Link
                    href={`/creators/${
                      currentCreator?.handle || currentCreator?.id || user?.id
                    }`}
                    target="_blank"
                    className="text-xs font-bold text-[#0055D6] dark:text-[#FFD21F] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Full Public View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {/* Full Interactive Preview */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-[#FAF9F5] dark:bg-[#181826]">
                <div className="h-32 bg-gradient-to-r from-[#FFD21F]/30 via-amber-400/20 to-transparent relative">
                  {coverImageUrl && (
                    <SafeImage
                      src={coverImageUrl}
                      alt="Cover"
                      fill
                      className="object-cover opacity-60"
                    />
                  )}
                </div>

                <div className="p-5 sm:p-6 space-y-4 -mt-10 relative">
                  <div className="flex items-end justify-between gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-white dark:bg-[#12121A] border-4 border-[#FAF9F5] dark:border-[#181826] overflow-hidden relative shadow-md flex items-center justify-center font-bold text-xl">
                      {avatarUrl ? (
                        <SafeImage
                          src={avatarUrl}
                          alt={fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span>{fullName?.charAt(0) || "C"}</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#7A7A8A] dark:text-[#8E8EA4] block">
                        Starting Rate
                      </span>
                      <span className="text-base sm:text-lg font-black font-mono text-[#0A0A0E] dark:text-white">
                        {startingPrice > 0
                          ? `${currencySymbol}${startingPrice.toLocaleString()}`
                          : "Custom Quote"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#0A0A0E] dark:text-white font-display">
                      {fullName || "Creator Name"}
                    </h3>
                    <p className="text-xs text-[#0A0A0E] dark:text-[#FFD21F] font-mono font-medium">
                      @{handle || "handle"} • {primaryCategory}
                    </p>
                    <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-2 italic font-serif">
                      &ldquo;{headline || "No headline declared"}&rdquo;
                    </p>
                  </div>

                  {bio && (
                    <p className="text-xs text-[#4A4A58] dark:text-[#B0B0C4] leading-relaxed whitespace-pre-line font-sans border-t border-black/6 dark:border-white/10 pt-3">
                      {bio}
                    </p>
                  )}

                  {/* Connected channels preview */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    {socialAccounts.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-xs font-mono font-bold"
                      >
                        {s.platform === "youtube" && (
                          <Youtube className="w-3.5 h-3.5 text-red-600" />
                        )}
                        {s.platform === "instagram" && (
                          <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        )}
                        {s.platform === "x" && (
                          <Twitter className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-white" />
                        )}
                        <span>@{s.handle}</span>
                        {s.verifiedBadge && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: Sticky Real-time Card & Health (4 Cols) ── */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          {/* Real-time Mini Card Preview */}
          <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
                Live Card Feed
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-bold">
                {tier}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] dark:bg-[#1A1A26] border border-black/10 dark:border-white/10 overflow-hidden relative shrink-0 flex items-center justify-center font-bold text-sm">
                {avatarUrl ? (
                  <SafeImage
                    src={avatarUrl}
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>{fullName?.charAt(0) || "C"}</span>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#0A0A0E] dark:text-white truncate">
                  {fullName || "Your Name"}
                </h4>
                <p className="text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] truncate">
                  @{handle || "handle"} • {primaryCategory}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] line-clamp-2 leading-relaxed">
              {headline || "Add a catchy headline to show in brand search results."}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-black/6 dark:border-white/10 text-xs font-mono">
              <span className="text-[#6A6A78] dark:text-[#8E8EA4]">
                {(totalFollowers || 0).toLocaleString()} reach
              </span>
              <span className="font-bold text-[#0A0A0E] dark:text-white">
                {startingPrice > 0
                  ? `${currencySymbol}${startingPrice}`
                  : "No rate"}
              </span>
            </div>
          </div>

          {/* Completeness Checklist Card */}
          <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-[#0A0A0E] dark:text-white">
                Profile Readiness
              </h3>
              <span className="text-xs font-mono font-bold text-[#FFD21F]">
                {completeness.score}%
              </span>
            </div>

            <div className="space-y-2">
              {completeness.checks.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between text-xs font-medium"
                >
                  <span
                    className={
                      c.done
                        ? "text-[#0A0A0E] dark:text-white"
                        : "text-[#8A8A9A] dark:text-[#6A6A7E]"
                    }
                  >
                    {c.label}
                  </span>
                  {c.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-amber-500" />
                  )}
                </div>
              ))}
            </div>

            {!completeness.isComplete && (
              <p className="text-[11px] text-amber-700 dark:text-amber-400/90 leading-tight pt-1">
                Complete all items above to unlock campaign applications and priority brand discovery.
              </p>
            )}
          </div>

          {/* Pro Sponsorship Tip */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#FFD21F]/5 to-transparent border border-amber-500/20 text-xs space-y-2">
            <span className="font-bold text-[#0A0A0E] dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
              <span>Sponsorship Pro-Tip</span>
            </span>
            <p className="text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed text-[11px]">
              Profiles with connected YouTube or Instagram channels close deals <strong>3.4x faster</strong> because brands can instantly verify real engagement metrics.
            </p>
          </div>
        </div>
      </div>

      {/* ── MOBILE FLOATING ACTION BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 dark:bg-[#12121A]/95 backdrop-blur-md border-t border-black/8 dark:border-white/10 z-40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#FFD21F]">
            {completeness.score}%
          </span>
          <span className="text-[11px] text-[#6A6A78] dark:text-[#8E8EA4]">
            {completeness.isComplete ? "Ready" : "Incomplete"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleSaveProfile()}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-md border border-black/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </>
          )}
        </button>
      </div>

      {/* ── MODALS ── */}

      {/* 1. Photo & Visual Assets Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#12121A] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/10 dark:border-white/10 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
              <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                Profile Images &amp; Artwork
              </h3>
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="text-[#8A8A9A] hover:text-[#0A0A0E] dark:hover:text-white"
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
                  className="text-xs font-mono text-[#0055D6] dark:text-[#FFD21F] hover:underline flex items-center gap-1"
                >
                  <span>Use Connected Account Avatar</span>
                </button>
              )}

              <Input
                label="Cover Banner URL (Optional)"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://example.com/banner.jpg"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/8 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-5 py-2.5 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] text-xs font-bold cursor-pointer"
              >
                Apply Images
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
              <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                Add Social Channel
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSocialModal(false)}
                className="text-[#8A8A9A] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0A0A0E] dark:text-[#EAEAEF] block mb-1">
                  Platform
                </label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-sans bg-[#F8F8FC] dark:bg-[#181824] text-[#0A0A0E] dark:text-white font-medium"
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
                className="px-5 py-2 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] text-xs font-bold transition-all cursor-pointer"
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
              <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                Add Deliverable Package
              </h3>
              <button
                type="button"
                onClick={() => setShowAddRateCardModal(false)}
                className="text-[#8A8A9A] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0A0A0E] dark:text-[#EAEAEF] block mb-1">
                  Deliverable Format
                </label>
                <select
                  value={newRateType}
                  onChange={(e) =>
                    setNewRateType(e.target.value as DeliverableType)
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-sans bg-[#F8F8FC] dark:bg-[#181824] text-[#0A0A0E] dark:text-white font-medium"
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
                  label={`Price (${currencySymbol})`}
                  type="number"
                  placeholder="e.g. 800"
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
                className="px-5 py-2 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] text-xs font-bold transition-all cursor-pointer"
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
                  <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
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
                className="text-[#8A8A9A] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold font-mono">
                  Account
                </span>
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
                  className="text-xs font-bold text-[#0055D6] dark:text-[#FFD21F] hover:underline flex items-center gap-1 font-mono"
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
                      onClick={() =>
                        handleCopyCode(
                          selectedVerifyAccount.verificationCode || ""
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 text-xs font-mono font-bold text-[#0A0A0E] dark:text-white transition-all shadow-2xs"
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
