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
import { ValenceLogo } from "@/components/ui/ValenceLogo";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";

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
    location: "",
    primaryCategory: "Technology & AI" as CreatorCategory,
    startingPrice: 500,
    bio: "",
    youtubeHandle: "",
    instagramHandle: "",
    tiktokHandle: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await authService.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "creator",
        handle: formData.handle,
        category: formData.primaryCategory,
      });

      if (res.user) {
        setAuthData(res.user, res.creatorProfile, res.brandProfile);
        addToast({
          type: "success",
          title: "Creator Account Activated",
          message: "Welcome to Collably! Your media kit is ready.",
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
    <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-slate-50/50">
      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 space-y-6 shadow-elevated">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creator Application</span>
            </div>
            <ValenceLogo href="/" size="sm" variant="icon" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Creator Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Set up your media kit, channels, and starting rate card with backend persistence.
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
              label="Full Legal Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Elena Rostova"
              required
            />
            <Input
              label="Creator Handle (@)"
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
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Primary Category</label>
              <select
                value={formData.primaryCategory}
                onChange={(e) =>
                  setFormData({ ...formData, primaryCategory: e.target.value as CreatorCategory })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-400"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Starting Rate ($ USD)"
              type="number"
              value={formData.startingPrice}
              onChange={(e) =>
                setFormData({ ...formData, startingPrice: parseInt(e.target.value) || 0 })
              }
              required
            />
          </div>

          <Textarea
            label="Bio & Content Positioning"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell brands about your audience demographics, past campaigns, and video formats..."
            rows={3}
          />

          <div className="pt-2">
            <Button
              variant="accent"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              Activate & Store Profile
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-accent font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
