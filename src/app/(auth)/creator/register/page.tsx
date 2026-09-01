"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { CATEGORIES } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
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
} from "lucide-react";

export default function CreatorRegisterPage() {
  const router = useRouter();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        bio: formData.bio || `Content creator specializing in ${formData.primaryCategory}. Available for brand integrations and dedicated productions.`,
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
          message: "Welcome to Collably! Your media kit and social accounts are live.",
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
    <div className="w-full flex items-center justify-center p-2 py-6 text-[#111111]">
      <div className="w-full max-w-2xl rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 sm:p-10 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/register"
            className="text-[10px] font-mono text-[#6B6B6B] hover:text-[#111111] transition-colors"
          >
            Change Account Type &rarr;
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-xs font-semibold font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
              <span>Creator Onboarding &amp; Media Kit</span>
            </div>
            <CollablyLogo href="/" size="sm" variant="icon" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Create Your Creator Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans font-medium">
            Connect your primary platforms (YouTube, Instagram, TikTok, X, LinkedIn) to generate your verified rate card.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Legal / Creator Name"
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
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••••••"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left font-sans">
                <label className="block text-xs font-semibold text-[#111111]">Primary Content Niche</label>
                <select
                  value={formData.primaryCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryCategory: e.target.value as CreatorCategory })
                  }
                  className="w-full bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
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
          <div className="space-y-4 pt-2 border-t border-[#E7E7E4]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
                2. Connect Social Channels
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] text-[#111111] text-[11px] font-mono font-bold border border-[#E7E7E4]">
                <Users className="w-3 h-3 text-[#111111]" />
                <span>Est. Reach: {totalReach.toLocaleString()} ({currentTier} Tier)</span>
              </div>
            </div>

            {/* YouTube */}
            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                  <Youtube className="w-3.5 h-3.5" />
                </div>
                <span>YouTube Channel</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  placeholder="Channel handle or link (e.g. @ElenaTech)"
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
            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <div className="w-6 h-6 rounded-lg bg-[#111111] text-white flex items-center justify-center">
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
            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <div className="w-6 h-6 rounded-lg bg-[#111111] text-white flex items-center justify-center">
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
            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <div className="w-6 h-6 rounded-lg bg-[#111111] text-white flex items-center justify-center">
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

            {/* LinkedIn */}
            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <div className="w-6 h-6 rounded-lg bg-sky-700 text-white flex items-center justify-center">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span>LinkedIn Profile (Optional)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  placeholder="LinkedIn profile or handle"
                  value={formData.linkedinHandle}
                  onChange={(e) => setFormData({ ...formData, linkedinHandle: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Connections/Followers (e.g. 5000)"
                  value={formData.linkedinFollowers}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedinFollowers: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section 3: Bio */}
          <div className="space-y-2 pt-2 border-t border-[#E7E7E4]">
            <Textarea
              label="Bio & Audience Positioning"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell brands about your audience demographics, past campaigns, and primary deliverable formats..."
              rows={3}
            />
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}
              className="w-full rounded-[9px]"
            >
              Activate &amp; Publish Media Kit
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-[#E7E7E4] text-center">
          <p className="text-xs text-[#6B6B6B]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#111111] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
