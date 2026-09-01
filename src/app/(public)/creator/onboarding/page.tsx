"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/core/constants";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Upload,
} from "lucide-react";

export default function CreatorOnboardingWizardPage() {
  const router = useRouter();
  const { setRole, currentCreator, updateCreatorProfile } = useAuthStore();
  const { addToast } = useUIStore();
  const [step, setStep] = useState(1);
  const totalSteps = 9;

  // Form State across 9 steps
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "Elena Rostova",
    handle: "elenatech",
    email: "elena@example.com",
    location: "San Francisco, CA",
    // Step 2: Creator Identity
    primaryCategory: "Technology & AI",
    headline: "AI Engineer & Next-Gen Hardware Reviewer",
    bio: "Demystifying artificial intelligence, spatial computing, and developer ergonomics for 480k+ tech professionals.",
    // Step 3: Social Channels
    youtube: "ElenaRostovaTech",
    instagram: "elena_creates",
    tiktok: "",
    x: "elenatech",
    // Step 4: Audience
    totalReach: 485000,
    avgEngagement: 6.4,
    topCountry: "United States",
    // Step 5: Portfolio
    portfolioLink: "https://youtube.com/@elenatech/videos",
    // Step 6: Services
    services: ["YouTube 60s Integration", "X (Twitter) Thread", "UGC Video Ad"],
    // Step 7: Pricing
    startingFee: 2200,
    // Step 8: Availability
    availability: "Available",
  });

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save profile
      if (currentCreator) {
        await updateCreatorProfile({
          headline: formData.headline,
          bio: formData.bio,
          startingPrice: formData.startingFee,
          totalFollowers: formData.totalReach,
          avgEngagementRate: formData.avgEngagement,
        });
      }
      setRole("creator");
      addToast({
        type: "success",
        title: "Creator Profile Published!",
        message: "Welcome to the Collably creator talent roster.",
      });
      router.push("/app/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Progress Bar & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-mono font-bold text-[#111111] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span>Progressive Creator Onboarding • Step {step} of {totalSteps}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
            Build Your Media Kit &amp; Rate Card
          </h1>
          <p className="text-sm text-[#6B6B6B] font-sans font-medium">
            Takes under 3 minutes. Zero fluff. Connect with vetted brands paying guaranteed escrow.
          </p>

          <div className="w-full h-2 rounded-full bg-[#E7E7E4] overflow-hidden mt-4">
            <div
              className="h-full bg-[#111111] transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Card Container */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6 text-[#111111]">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 1: Creator Identity &amp; Handle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name / Brand Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
                <Input
                  label="Unique Creator Handle (@)"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Primary Contact Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  label="Primary Location / City"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Niche & Narrative */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 2: Niche &amp; Positioning</h3>
              <div className="space-y-1.5 text-left font-sans">
                <label className="text-xs font-semibold text-[#111111]">Primary Category</label>
                <select
                  value={formData.primaryCategory}
                  onChange={(e) => setFormData({ ...formData, primaryCategory: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111] shadow-xs"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Headline Tagline"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              />
              <Textarea
                label="Bio Narrative"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>
          )}

          {/* Step 3: Social Channels */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 3: Social Media Channels</h3>
              <p className="text-xs text-[#6B6B6B] font-sans font-medium">Provide handles for audience verification and OAuth sync.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="YouTube Channel Handle"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder="@ElenaRostovaTech"
                />
                <Input
                  label="Instagram Username"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@elena_creates"
                />
                <Input
                  label="X (Twitter) Username"
                  value={formData.x}
                  onChange={(e) => setFormData({ ...formData, x: e.target.value })}
                  placeholder="@elenatech"
                />
                <Input
                  label="TikTok Username"
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                  placeholder="@elena_tiktok"
                />
              </div>
            </div>
          )}

          {/* Step 4: Audience Metrics */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 4: Audience Metrics &amp; Reach</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <Input
                  label="Combined Total Follower Reach"
                  type="number"
                  value={formData.totalReach}
                  onChange={(e) => setFormData({ ...formData, totalReach: parseInt(e.target.value) || 0 })}
                />
                <Input
                  label="Average Engagement Rate (%)"
                  type="number"
                  step="0.1"
                  value={formData.avgEngagement}
                  onChange={(e) => setFormData({ ...formData, avgEngagement: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <Input
                label="Top Audience Country"
                value={formData.topCountry}
                onChange={(e) => setFormData({ ...formData, topCountry: e.target.value })}
              />
            </div>
          )}

          {/* Step 5: Portfolio Assets */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 5: Previous Sponsorship Portfolio</h3>
              <Input
                label="Primary Portfolio / Best Work URL"
                value={formData.portfolioLink}
                onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                placeholder="https://youtube.com/@yourhandle/videos"
              />
              <div className="p-8 border-2 border-dashed border-[#E7E7E4] rounded-2xl text-center space-y-2 bg-[#FAFAF8]">
                <Upload className="w-8 h-8 text-[#6B6B6B] mx-auto" />
                <p className="text-xs text-[#111111] font-bold font-sans">Drag &amp; drop raw campaign video files or PDF case studies</p>
                <p className="text-[11px] text-[#6B6B6B] font-mono">Supports MP4, MOV, PDF up to 500MB</p>
              </div>
            </div>
          )}

          {/* Step 6: Services */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 6: Supported Deliverable Formats</h3>
              <p className="text-xs text-[#6B6B6B] font-sans">Select formats you regularly produce for brand partners.</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {["YouTube 60s Integration", "Instagram Reel", "TikTok Video", "X (Twitter) Thread", "UGC Video Ad", "Keynote Appearance"].map((srv) => (
                  <label key={srv} className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center gap-2.5 cursor-pointer hover:border-[#111111]">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(srv)}
                      onChange={(e) => {
                        if (e.target.checked) setFormData({ ...formData, services: [...formData.services, srv] });
                        else setFormData({ ...formData, services: formData.services.filter((s) => s !== srv) });
                      }}
                      className="rounded text-[#111111] focus:ring-[#111111]"
                    />
                    <span className="font-medium text-[#111111] font-sans">{srv}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Pricing */}
          {step === 7 && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 7: Minimum Starting Fee</h3>
              <Input
                label="Minimum Starting Fee ($ USD)"
                type="number"
                value={formData.startingFee}
                onChange={(e) => setFormData({ ...formData, startingFee: parseInt(e.target.value) || 0 })}
              />
              <p className="text-[11px] text-[#6B6B6B] font-sans">
                Brands will see this on your public card. You can still submit custom rates during campaign applications.
              </p>
            </div>
          )}

          {/* Step 8: Availability */}
          {step === 8 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111] font-display">Step 8: Current Booking Availability</h3>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {["Available", "Busy (2 Wk Delay)", "Booked (Waitlist)"].map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setFormData({ ...formData, availability: av })}
                    className={`p-4 rounded-xl border text-center font-bold transition-all ${
                      formData.availability === av
                        ? "bg-[#111111] text-[#FAFAF8] border-transparent shadow-xs"
                        : "bg-[#FAFAF8] text-[#6B6B6B] border-[#E7E7E4] hover:text-[#111111]"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 9: Preview & Submit */}
          {step === 9 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
                <h3 className="text-xl font-bold text-[#111111] font-display">Step 9: Final Media Kit Preview</h3>
                <span className="px-2 py-0.5 rounded bg-[#B7FF3C] text-[#111111] text-[10px] font-mono font-bold">
                  Ready to Publish
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] text-[#B7FF3C] flex items-center justify-center font-bold text-base font-mono">
                    {formData.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#111111] font-display">{formData.fullName}</h4>
                    <p className="text-xs text-[#6B6B6B] font-mono">@{formData.handle} • {formData.location}</p>
                  </div>
                </div>
                <p className="text-xs text-[#111111] font-semibold font-sans">{formData.headline}</p>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">{formData.bio}</p>
                <div className="flex gap-4 font-mono text-xs pt-2 border-t border-[#E7E7E4]">
                  <span>Reach: <strong className="text-[#111111]">{formData.totalReach.toLocaleString()}</strong></span>
                  <span>Engagement: <strong className="text-[#111111] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />{formData.avgEngagement}%</strong></span>
                  <span>Starting: <strong className="text-[#111111]">${formData.startingFee}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#E7E7E4]">
            <Button
              variant="secondary"
              size="md"
              onClick={handleBack}
              disabled={step === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="rounded-[9px]"
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}
              className="rounded-[9px]"
            >
              {step === totalSteps ? "Publish Media Kit & Launch" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
