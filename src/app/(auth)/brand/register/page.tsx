"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { Input } from "@/components/ui/Input";
import {
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Building2,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { formatCurrency } from "@/core/utils/formatters";

export default function BrandRegisterPage() {
  const router = useRouter();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    password: "",
    websiteUrl: "",
    industry: "Technology & AI",
    companySize: "11-50",
    monthlyBudget: "$10,000 - $25,000",
  });

  const industries = [
    "Technology & AI",
    "Fashion & Luxury",
    "Fitness & Wellness",
    "Consumer Electronics",
    "Beauty & Skincare",
    "Food & Beverage",
    "Gaming & Entertainment",
    "Finance & Fintech",
    "Travel & Hospitality",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await authService.register({
        name: formData.contactName || formData.companyName,
        email: formData.email,
        password: formData.password,
        role: "brand",
        companyName: formData.companyName,
        industry: formData.industry,
      });

      if (res.user) {
        setAuthData(res.user, res.creatorProfile, res.brandProfile);
        addToast({
          type: "success",
          title: "Brand Workspace Ready",
          message: "Welcome to AbeyCollab! Your brand account is ready.",
        });
        router.push("/app/brand/campaigns/create");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-6 sm:p-10 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
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
          Switch to Creator &rarr;
        </Link>
      </div>

      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0E] dark:bg-[#1A1A28] text-white border border-transparent dark:border-white/10 text-[11px] font-bold font-mono">
          <Building2 className="w-3.5 h-3.5 text-[#FFD21F]" />
          <span>Brand &amp; Agency Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Register Brand Account
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4] font-sans">
          Post campaign briefs, match with 50K+ vetted creators, and escrow milestones.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1-Click Social Sign-Up */}
      <div className="space-y-2">
        <SocialAuthButtons mode="register" role="brand" redirectUrl="/app/brand/campaigns" />
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-black/8 dark:border-white/10" />
        <span className="flex-shrink mx-3 text-[10px] font-mono text-[#8A8A98] dark:text-[#7E7E94] uppercase">or fill company details</span>
        <div className="flex-grow border-t border-black/8 dark:border-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company / Brand Name"
            placeholder="Nike, Inc."
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
          <Input
            label="Marketing Lead Name"
            placeholder="Alex Rivera"
            required
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Work Email Address"
            type="email"
            placeholder="alex@nike.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">Industry / Category</label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind} className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Company Website / Store (Optional)"
            placeholder="https://brand.com"
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left font-sans">
            <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">Company Size</label>
            <select
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
              className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans"
            >
              <option value="1-10" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">1-10 Employees (Startup / Boutique)</option>
              <option value="11-50" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">11-50 Employees (Growth Stage)</option>
              <option value="51-200" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">51-200 Employees (Scaleup)</option>
              <option value="201-1000+" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">201-1000+ Employees (Enterprise)</option>
            </select>
          </div>

          <div className="space-y-1.5 text-left font-sans">
            <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">Est. Monthly Creator Budget</label>
            <select
              value={formData.monthlyBudget}
              onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
              className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans"
            >
              <option value="<$5,000" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">&lt; {formatCurrency(5000)} / month</option>
              <option value="$5,000 - $10,000" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">{formatCurrency(5000)} - {formatCurrency(10000)} / month</option>
              <option value="$10,000 - $25,000" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">{formatCurrency(10000)} - {formatCurrency(25000)} / month</option>
              <option value="$25,000 - $100,000+" className="bg-white dark:bg-[#181824] text-[#0A0A0E] dark:text-white">{formatCurrency(25000)} - {formatCurrency(100000)}+ / month</option>
            </select>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
                <span>Launching Brand Workspace...</span>
              </>
            ) : (
              <>
                <span>Create Brand Account</span>
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
