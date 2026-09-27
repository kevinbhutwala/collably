"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { CATEGORIES } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import { Input, Textarea } from "@/components/ui/Input";
import { getCreatorTier } from "@/core/utils/social";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Video,
  Users,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useGlobalCurrency } from "@/context/CurrencyContext";

export default function CreatorRegisterPage() {
  const router = useRouter();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();
  const { currency, symbol: currSymbol } = useGlobalCurrency();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    handle: "",
    location: "United States",
    primaryCategory: "Technology & AI" as CreatorCategory,
    startingPrice: 500,
    bio: "",
    // Social Accounts - default to empty for accurate initial telemetry
    youtubeHandle: "",
    youtubeSubscribers: "" as unknown as number,
    instagramHandle: "",
    instagramFollowers: "" as unknown as number,
    tiktokHandle: "",
    tiktokFollowers: "" as unknown as number,
    xHandle: "",
    xFollowers: "" as unknown as number,
    linkedinHandle: "",
    linkedinFollowers: "" as unknown as number,
  });

  // Calculate live total reach based on active platform inputs
  const calculateTotalReach = () => {
    let total = 0;
    if (formData.youtubeHandle && formData.youtubeSubscribers) total += Number(formData.youtubeSubscribers) || 0;
    if (formData.instagramHandle && formData.instagramFollowers) total += Number(formData.instagramFollowers) || 0;
    if (formData.tiktokHandle && formData.tiktokFollowers) total += Number(formData.tiktokFollowers) || 0;
    if (formData.xHandle && formData.xFollowers) total += Number(formData.xFollowers) || 0;
    if (formData.linkedinHandle && formData.linkedinFollowers) total += Number(formData.linkedinFollowers) || 0;
    return total;
  };

  const handleFillDemo = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setFormData({
      fullName: "Alex Rivera",
      email: `alex.rivera.${randomSuffix}@example.com`,
      password: "Password123!",
      handle: `alexcreatives_${randomSuffix}`,
      location: "United States",
      primaryCategory: "Technology & AI" as CreatorCategory,
      startingPrice: 450,
      bio: "Tech creator reviewing next-gen gadgets, developer tools, and workflow productivity setups.",
      youtubeHandle: "AlexRiveraTech",
      youtubeSubscribers: 42000,
      instagramHandle: "alex_rivera",
      instagramFollowers: 28000,
      tiktokHandle: "alexrivera.tech",
      tiktokFollowers: 65000,
      xHandle: "alexrivera_ai",
      xFollowers: 14000,
      linkedinHandle: "alex-rivera-tech",
      linkedinFollowers: 6000,
    });
    setErrorMessage("");
    addToast({
      type: "info",
      title: "Sample Creator Loaded",
      message: "Form pre-filled with verified creator telemetry. Ready to submit!",
    });
  };

  const totalReach = calculateTotalReach();
  const currentTier = getCreatorTier(totalReach);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const nameVal = formData.fullName.trim();
    const handleVal = formData.handle.trim().replace(/^@/, "");
    const emailVal = formData.email.trim();
    const priceVal = Number(formData.startingPrice);

    if (nameVal.length < 2) {
      setErrorMessage("Full name must be at least 2 characters.");
      setIsSubmitting(false);
      return;
    }

    if (handleVal.length < 2) {
      setErrorMessage("Primary handle must be at least 2 characters.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setIsSubmitting(false);
      return;
    }

    if (!priceVal || priceVal <= 0) {
      setErrorMessage("Starting sponsorship rate must be greater than 0.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await authService.registerCreator({
        fullName: nameVal,
        email: emailVal,
        password: formData.password,
        handle: `@${handleVal}`,
        location: formData.location.trim() || "United States",
        primaryCategory: formData.primaryCategory,
        startingPrice: priceVal,
        currency: currency,
        bio:
          formData.bio.trim() ||
          `Content creator specializing in ${formData.primaryCategory}. Available for brand integrations and dedicated productions.`,
        youtubeHandle: formData.youtubeHandle.trim(),
        youtubeSubscribers: Number(formData.youtubeSubscribers) || 0,
        instagramHandle: formData.instagramHandle.trim(),
        instagramFollowers: Number(formData.instagramFollowers) || 0,
        tiktokHandle: formData.tiktokHandle.trim(),
        tiktokFollowers: Number(formData.tiktokFollowers) || 0,
        xHandle: formData.xHandle.trim() || handleVal,
        xFollowers: Number(formData.xFollowers) || 0,
        linkedinHandle: formData.linkedinHandle.trim(),
        linkedinFollowers: Number(formData.linkedinFollowers) || 0,
      });

      if (res.user) {
        if (res.token) {
          authService.saveToken(res.token);
        }
        setAuthData(res.user, res.creatorProfile, res.brandProfile);
        addToast({
          type: "success",
          title: "Creator Account Activated",
          message: `Welcome to AbeyCollab, ${nameVal}! Your media kit and verified telemetry are live.`,
        });
        router.push("/app/dashboard");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed. Please check your entries and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-6 sm:p-10 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <Link
          href="/register"
          className="text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
        >
          Switch to Brand &rarr;
        </Link>
      </div>

      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-[#FFD21F] text-[11px] font-bold font-mono">
          <Sparkles className="w-3.5 h-3.5 fill-[#FFD21F] text-[#0A0A0E] dark:text-[#FFD21F]" />
          <span>Creator Media Kit Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Create Your Creator Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4] font-sans">
          Connect your channels to generate your verified rate card and audited telemetry.
        </p>
      </div>

      {/* 1-Click Fast Track Testing Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#0A0A0E] dark:text-[#F4F4F8]">
        <div className="space-y-0.5">
          <p className="text-xs font-bold font-sans flex items-center gap-1.5 text-[#0A0A0E] dark:text-white">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Testing Creator Onboarding?
          </p>
          <p className="text-[11px] text-[#6A6A78] dark:text-[#8E8EA4]">
            Autofill a complete, verified creator persona with realistic channels and metrics.
          </p>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFD21F] text-[#0A0A0E] hover:bg-[#FFE052] transition-colors shadow-sm shrink-0 font-sans"
        >
          ⚡ Fill Sample Creator
        </button>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1-Click Social Sign-Up */}
      <div className="space-y-2">
        <SocialAuthButtons mode="register" role="creator" redirectUrl="/app/dashboard" />
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-black/8 dark:border-white/10" />
        <span className="flex-shrink mx-3 text-[10px] font-mono text-[#8A8A98] dark:text-[#7E7E94] uppercase">or fill details</span>
        <div className="flex-grow border-t border-black/8 dark:border-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white font-mono flex items-center gap-1.5">
            <span>1. Creator Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Brand Name"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="e.g. Dipti Parihar"
              required
            />
            <Input
              label="Primary Handle (@)"
              value={formData.handle}
              onChange={(e) => updateField("handle", e.target.value)}
              placeholder="diptiparihar"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="••••••••••••"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left font-sans">
              <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">Primary Content Niche</label>
              <select
                value={formData.primaryCategory}
                onChange={(e) =>
                  updateField("primaryCategory", e.target.value as CreatorCategory)
                }
                className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label={`Starting Sponsorship Rate (${currSymbol} ${currency})`}
              type="number"
              value={formData.startingPrice || ""}
              onChange={(e) =>
                updateField("startingPrice", parseInt(e.target.value) || 0)
              }
              required
            />
          </div>
        </div>

        {/* Section 2: Social Media Channels */}
        <div className="space-y-4 pt-4 border-t border-black/8 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white font-mono">
              2. Connect Social Channels
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] text-[11px] font-mono font-bold border border-[#FFD21F]/40 self-start sm:self-auto">
              <Users className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-[#FFD21F]" />
              <span>Est. Reach: {totalReach.toLocaleString()} ({currentTier} Tier)</span>
            </div>
          </div>

          {/* YouTube */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
                <Youtube className="w-3.5 h-3.5" />
              </div>
              <span>YouTube Channel</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Channel handle (e.g. @decodingtech)"
                value={formData.youtubeHandle}
                onChange={(e) => updateField("youtubeHandle", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Subscribers (e.g. 45000)"
                value={formData.youtubeSubscribers || ""}
                onChange={(e) =>
                  updateField("youtubeSubscribers", parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>

          {/* Instagram */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span>Instagram Profile</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Instagram handle (e.g. @prarthaana.04)"
                value={formData.instagramHandle}
                onChange={(e) => updateField("instagramHandle", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Followers (e.g. 30000)"
                value={formData.instagramFollowers || ""}
                onChange={(e) =>
                  updateField("instagramFollowers", parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>

          {/* TikTok */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 text-black dark:text-white flex items-center justify-center">
                <Video className="w-3.5 h-3.5" />
              </div>
              <span>TikTok Channel</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="TikTok handle (e.g. @yourcreator)"
                value={formData.tiktokHandle}
                onChange={(e) => updateField("tiktokHandle", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Followers (e.g. 50000)"
                value={formData.tiktokFollowers || ""}
                onChange={(e) =>
                  updateField("tiktokFollowers", parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>

          {/* X / Twitter */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 text-black dark:text-white flex items-center justify-center">
                <Twitter className="w-3.5 h-3.5" />
              </div>
              <span>X (Twitter) Profile</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="X handle (e.g. @caimarsalizi)"
                value={formData.xHandle}
                onChange={(e) => updateField("xHandle", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Followers (e.g. 20000)"
                value={formData.xFollowers || ""}
                onChange={(e) =>
                  updateField("xFollowers", parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bio */}
        <div className="space-y-2 pt-4 border-t border-black/8 dark:border-white/10">
          <Textarea
            label="Bio & Audience Demographics"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Describe your content format, production gear, audience geography, and past brand work..."
            rows={3}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
                <span>Activating Profile...</span>
              </>
            ) : (
              <>
                <span>Publish Creator Media Kit</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="pt-3 border-t border-black/8 dark:border-white/10 text-center">
        <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0A0A0E] dark:text-[#FFD21F] hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
