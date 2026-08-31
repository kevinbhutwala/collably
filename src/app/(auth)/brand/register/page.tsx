"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ValenceLogo } from "@/components/ui/ValenceLogo";
import { Building2, ArrowRight, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-slate-50/50">
      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 space-y-6 shadow-elevated">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Brand Onboarding</span>
            </div>
            <ValenceLogo href="/" size="sm" variant="icon" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Register Brand Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Launch briefs, review creator proposals, and manage deliverables in database storage.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
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
              variant="accent"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              Launch Brand Workspace
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Already registered?{" "}
            <Link href="/login" className="text-brand-accent font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
