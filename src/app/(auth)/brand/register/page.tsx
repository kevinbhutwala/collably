"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Building2, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { CollablyLogo } from "@/components/ui/CollablyLogo";

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
    <div className="w-full flex items-center justify-center p-2 py-6 text-[#111111]">
      <div className="w-full max-w-xl rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 sm:p-10 space-y-6 shadow-xs">
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
              <span>Brand Onboarding</span>
            </div>
            <CollablyLogo href="/" size="sm" variant="icon" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Register Brand Account
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans font-medium">
            Launch briefs, review creator proposals, and manage deliverables in database storage.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
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
            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}
              className="w-full rounded-[9px]"
            >
              Launch Brand Workspace
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-[#E7E7E4] text-center">
          <p className="text-xs text-[#6B6B6B]">
            Already registered?{" "}
            <Link href="/login" className="text-[#111111] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
