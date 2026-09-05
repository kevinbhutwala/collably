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

export default function CreatorRegisterPage() {
  const router = useRouter();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();
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
    // Social Accounts
    youtubeHandle: "",
    youtubeSubscribers: 25000,
    instagramHandle: "",
    instagramFollowers: 15000,
    tiktokHandle: "",
    tiktokFollowers: 30000,
    xHandle: "",
    xFollowers: 10000,
    linkedinHandle: "",
    linkedinFollowers: 5000,
  });

  // Calculate live total reach based on active inputs
  const calculateTotalReach = () => {
    let total = 0;
    if (formData.youtubeSubscribers) total += Number(formData.youtubeSubscribers) || 0;
    if (formData.instagramFollowers) total += Number(formData.instagramFollowers) || 0;
    if (formData.tiktokFollowers) total += Number(formData.tiktokFollowers) || 0;
    if (formData.xFollowers) total += Number(formData.xFollowers) || 0;
    if (formData.linkedinFollowers) total += Number(formData.linkedinFollowers) || 0;
    return total;
  };

  const totalReach = calculateTotalReach();
  const currentTier = getCreatorTier(totalReach);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await authService.registerCreator({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        handle: formData.handle.startsWith("@") ? formData.handle : `@${formData.handle}`,
        location: formData.location,
        primaryCategory: formData.primaryCategory,
        startingPrice: Number(formData.startingPrice) || 500,
        bio:
          formData.bio ||
          `Content creator specializing in ${formData.primaryCategory}. Available for brand integrations and dedicated productions.`,
        youtubeHandle: formData.youtubeHandle,
        youtubeSubscribers: Number(formData.youtubeSubscribers) || 0,
        instagramHandle: formData.instagramHandle,
        instagramFollowers: Number(formData.instagramFollowers) || 0,
        tiktokHandle: formData.tiktokHandle,
        tiktokFollowers: Number(formData.tiktokFollowers) || 0,
        xHandle: formData.xHandle || formData.handle,
        xFollowers: Number(formData.xFollowers) || 0,
        linkedinHandle: formData.linkedinHandle,
        linkedinFollowers: Number(formData.linkedinFollowers) || 0,
      });

      if (res.user) {
        setAuthData(res.user, res.creatorProfile, res.brandProfile);
        addToast({
          type: "success",
          title: "Creator Account Activated",
          message: "Welcome to AbeyCollab! Your media kit and social accounts are live.",
        });
        router.push("/app/dashboard");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white border border-black/8 p-6 sm:p-10 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <Link
          href="/register"
          className="text-xs font-sans font-semibold text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors"
        >
          Switch to Brand &rarr;
        </Link>
      </div>

      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] text-[11px] font-bold font-mono">
          <Sparkles className="w-3.5 h-3.5 fill-[#FFD21F] text-[#0A0A0E]" />
          <span>Creator Media Kit Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] tracking-tight font-display">
          Create Your Creator Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] font-sans">
          Connect your channels to generate your verified rate card and audited telemetry.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1-Click Social Sign-Up */}
      <div className="space-y-2">
        <SocialAuthButtons mode="register" role="creator" redirectUrl="/app/dashboard" />
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-black/8" />
        <span className="flex-shrink mx-3 text-[10px] font-mono text-[#8A8A98] uppercase">or fill details</span>
        <div className="flex-grow border-t border-black/8" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] font-mono flex items-center gap-1.5">
            <span>1. Creator Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Brand Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Elena Rostova"
              required
            />
            <Input
              label="Primary Handle (@)"
              value={formData.handle}
              onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
              placeholder="elenatech"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="elena@example.com"
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••••••"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left font-sans">
              <label className="block text-xs font-bold text-[#0A0A0E]">Primary Content Niche</label>
              <select
                value={formData.primaryCategory}
                onChange={(e) =>
                  setFormData({ ...formData, primaryCategory: e.target.value as CreatorCategory })
                }
                className="w-full bg-[#F8F8FC] border border-black/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F] transition-all font-sans"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-white text-[#0A0A0E]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Starting Sponsorship Rate ($ USD)"
              type="number"
              value={formData.startingPrice}
              onChange={(e) =>
                setFormData({ ...formData, startingPrice: parseInt(e.target.value) || 0 })
              }
              required
            />
          </div>
        </div>

        {/* Section 2: Social Media Channels */}
        <div className="space-y-4 pt-4 border-t border-black/8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] font-mono">
              2. Connect Social Channels
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] text-[11px] font-mono font-bold border border-[#FFD21F]/40 self-start sm:self-auto">
              <Users className="w-3.5 h-3.5 text-[#0A0A0E]" />
              <span>Est. Reach: {totalReach.toLocaleString()} ({currentTier} Tier)</span>
            </div>
          </div>

          {/* YouTube */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
              <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <Youtube className="w-3.5 h-3.5" />
              </div>
              <span>YouTube Channel</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Channel handle (e.g. @ElenaTech)"
                value={formData.youtubeHandle}
                onChange={(e) => setFormData({ ...formData, youtubeHandle: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Subscribers (e.g. 45000)"
                value={formData.youtubeSubscribers}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeSubscribers: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          {/* Instagram */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
              <div className="w-6 h-6 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span>Instagram Profile</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Instagram handle (e.g. @elena_creates)"
                value={formData.instagramHandle}
                onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Followers (e.g. 30000)"
                value={formData.instagramFollowers}
                onChange={(e) =>
                  setFormData({ ...formData, instagramFollowers: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          {/* TikTok */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
              <div className="w-6 h-6 rounded-lg bg-black/10 text-black flex items-center justify-center">
                <Video className="w-3.5 h-3.5" />
              </div>
              <span>TikTok Channel</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="TikTok handle (e.g. @elenatok)"
                value={formData.tiktokHandle}
                onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Followers (e.g. 50000)"
                value={formData.tiktokFollowers}
                onChange={(e) =>
                  setFormData({ ...formData, tiktokFollowers: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          {/* X / Twitter */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
              <div className="w-6 h-6 rounded-lg bg-black/10 text-black flex items-center justify-center">
                <Twitter className="w-3.5 h-3.5" />
              </div>
              <span>X (Twitter) Profile</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="X handle (e.g. @elenatech)"
                value={formData.xHandle}
                onChange={(e) => setFormData({ ...formData, xHandle: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Followers (e.g. 20000)"
                value={formData.xFollowers}
                onChange={(e) =>
                  setFormData({ ...formData, xFollowers: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bio */}
        <div className="space-y-2 pt-4 border-t border-black/8">
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

      <div className="pt-3 border-t border-black/8 text-center">
        <p className="text-xs text-[#5A5A68]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0A0A0E] hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
