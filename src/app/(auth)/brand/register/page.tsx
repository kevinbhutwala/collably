"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { Input } from "@/components/ui/Input";
import { ArrowRight, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";

export default function BrandRegisterPage() {
  const router = useRouter();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    password: "",
    websiteUrl: "",
    industry: "",
    companySize: "11-50",
    monthlyBudget: "$10,000 - $25,000",
  });

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
          message: "Welcome to Collably! Your brand account is ready.",
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
    <div className="w-full flex items-center justify-center p-2 py-6 text-[#0A0A0E] select-none">
      <div className="w-full max-w-xl rounded-3xl bg-white border border-black/8 p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-black/8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/register"
            className="text-[10px] font-mono text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors"
          >
            Change Account Type &rarr;
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] text-xs font-bold font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Brand Onboarding</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#FFD21F]/20 border border-[#FFD21F]/40 flex items-center justify-center text-[#0A0A0E]">
              <Sparkles className="w-3.5 h-3.5 fill-[#FFD21F] text-[#0A0A0E]" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Register Brand Account
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans">
            Launch briefs, review creator proposals, and manage escrow disbursements.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company / Brand Name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Linear Dynamics"
              required
            />
            <Input
              label="Primary Contact Person"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="Sarah Lin (Head of Growth)"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Work Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="partnerships@linear.app"
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
            <Input
              label="Company Website URL"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://linear.app"
            />
            <Input
              label="Industry Domain"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="Developer Tools & AI"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-xs border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Launch Brand Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-black/8 text-center">
          <p className="text-xs text-[#5A5A68]">
            Already registered?{" "}
            <Link href="/login" className="text-[#0A0A0E] underline font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
