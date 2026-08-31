"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import {
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  DollarSign,
  Users,
} from "lucide-react";

export default function BrandOnboardingWizardPage() {
  const router = useRouter();
  const { setRole } = useAuthStore();
  const { addToast } = useUIStore();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    companyName: "Linear Dynamics",
    industry: "Developer Tools & AI",
    website: "https://linear.app",
    location: "San Francisco, CA",
    headline: "The issue tracker built for high-performance software teams.",
    description: "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
    budgetTier: "$25,000 - $50,000 / month",
    targetGoals: ["Developer Awareness", "Signups & Free Trial Conversions", "Product Launch Buzz"],
    teamMembers: "sarah@linear.app, alex@linear.app",
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setRole("brand");
      addToast({
        type: "success",
        title: "Brand Organization Verified",
        message: "Welcome to Collably! Start discovering top-tier creators or post a campaign brief.",
      });
      router.push("/app/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Brand Enterprise Onboarding • Step {step} of {totalSteps}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Configure Your Brand Workspace
          </h1>
          <p className="text-sm text-slate-600">
            Set up your company profile, escrow parameters, and target creator cohorts.
          </p>

          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mt-4">
            <div
              className="h-full bg-slate-900 transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
          {/* Step 1: Company Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Step 1: Company Identity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company / Organization Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
                <Input
                  label="Primary Industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Website URL"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  required
                />
                <Input
                  label="Headquarters Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Value Proposition & Narrative */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Step 2: Brand Tagline & Mission</h3>
              <Input
                label="Headline Value Proposition"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              />
              <Textarea
                label="Company Overview (Visible on Campaign Briefs)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          )}

          {/* Step 3: Campaign Budget Tiers */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Step 3: Estimated Monthly Campaign Budget</h3>
              <p className="text-xs text-slate-500">Helps match you with creator cohorts within your target budget tier.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {["$5k - $15k / mo", "$25k - $50k / mo", "$100k+ Enterprise / mo"].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetTier: tier })}
                    className={`p-4 rounded-2xl border text-center font-bold transition-all ${
                      formData.budgetTier === tier
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Marketing Objectives */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Step 4: Primary Campaign Objectives</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  "Developer Awareness",
                  "Signups & Free Trial Conversions",
                  "Product Launch Buzz",
                  "High-Converting UGC Video Ads",
                  "App Installs & Downloads",
                  "SEO & Thought Leadership",
                ].map((obj) => (
                  <label key={obj} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.targetGoals.includes(obj)}
                      onChange={(e) => {
                        if (e.target.checked) setFormData({ ...formData, targetGoals: [...formData.targetGoals, obj] });
                        else setFormData({ ...formData, targetGoals: formData.targetGoals.filter((g) => g !== obj) });
                      }}
                      className="rounded text-brand-accent focus:ring-brand-accent"
                    />
                    <span className="font-medium text-slate-800">{obj}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Team Seats & Escrow Confirmation */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Step 5: Team Access & Escrow Protection</h3>
              <Input
                label="Invite Teammate Emails (Comma Separated)"
                value={formData.teamMembers}
                onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
              />
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-900">100% Escrow Milestone Protection</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Your campaign funds remain secured in the Collably escrow vault until your marketing team reviews and signs off on deliverables.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <Button
              variant="outline"
              size="md"
              onClick={handleBack}
              disabled={step === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {step === totalSteps ? "Launch Brand Workspace" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
