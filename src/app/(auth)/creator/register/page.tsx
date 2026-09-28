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
  Video,
  Users,
  Eye,
  EyeOff,
  Loader2,
  Camera,
  Upload,
  Check,
  Trash2,
  User as UserIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useGlobalCurrency } from "@/context/CurrencyContext";
import { SafeImage } from "@/components/ui/SafeImage";

// ─── Avatar presets ──────────────────────────────────────────────────────────
const AVATAR_PRESETS = [
  { label: "Male Creator 1",   url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80", gender: "male"   as const },
  { label: "Female Creator 1", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80", gender: "female" as const },
  { label: "Male Creator 2",   url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80", gender: "male"   as const },
  { label: "Female Creator 2", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80", gender: "female" as const },
];

// ─── Validation helpers ───────────────────────────────────────────────────────
const EMAIL_RE   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLE_RE  = /^[a-zA-Z0-9._-]+$/;

interface PwdChecks { length: boolean; uppercase: boolean; lowercase: boolean; number: boolean }

function checkPassword(pw: string): PwdChecks {
  return {
    length:    pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    number:    /[0-9]/.test(pw),
  };
}
function pwdScore(pw: string): number {
  return Object.values(checkPassword(pw)).filter(Boolean).length;
}

function validateField(field: string, value: unknown): string {
  switch (field) {
    case "fullName": {
      const v = String(value ?? "").trim();
      if (!v)           return "Full name is required.";
      if (v.length < 2) return "Full name must be at least 2 characters.";
      if (v.length > 80) return "Full name must be 80 characters or fewer.";
      return "";
    }
    case "handle": {
      const v = String(value ?? "").trim().replace(/^@/, "");
      if (!v)            return "Handle is required.";
      if (v.length < 2)  return "Handle must be at least 2 characters.";
      if (v.length > 50) return "Handle must be 50 characters or fewer.";
      if (!HANDLE_RE.test(v)) return "Only letters, numbers, dots, underscores and hyphens allowed.";
      return "";
    }
    case "email": {
      const v = String(value ?? "").trim();
      if (!v)                 return "Email address is required.";
      if (!EMAIL_RE.test(v))  return "Enter a valid email address (e.g. name@domain.com).";
      return "";
    }
    case "password": {
      const v = String(value ?? "");
      if (!v)           return "Password is required.";
      if (v.length < 8) return "Password must be at least 8 characters.";
      const c = checkPassword(v);
      if (!c.uppercase) return "Password must include at least one uppercase letter (A–Z).";
      if (!c.lowercase) return "Password must include at least one lowercase letter (a–z).";
      if (!c.number)    return "Password must include at least one number (0–9).";
      return "";
    }
    case "startingPrice": {
      const v = Number(value);
      if (!v || v <= 0)    return "Sponsorship rate must be greater than 0.";
      if (v > 10_000_000)  return "Rate seems too high — please double-check.";
      return "";
    }
    case "bio": {
      const v = String(value ?? "").trim();
      if (v.length > 500) return `Bio is too long (${v.length}/500 characters).`;
      return "";
    }
    default:
      return "";
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CreatorRegisterPage() {
  const router = useRouter();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();
  const { currency, symbol: currSymbol } = useGlobalCurrency();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched]       = useState<Record<string, boolean>>({});

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    fullName:           "",
    email:              "",
    password:           "",
    handle:             "",
    avatarUrl:          "",
    gender:             "" as "male" | "female" | "",
    location:           "",
    primaryCategory:    "Technology & AI" as CreatorCategory,
    startingPrice:      "" as unknown as number,
    bio:                "",
    youtubeHandle:      "",
    youtubeSubscribers: "" as unknown as number,
    instagramHandle:    "",
    instagramFollowers: "" as unknown as number,
    tiktokHandle:       "",
    tiktokFollowers:    "" as unknown as number,
    xHandle:            "",
    xFollowers:         "" as unknown as number,
    linkedinHandle:     "",
    linkedinFollowers:  "" as unknown as number,
  });

  // ── helpers ──
  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setGlobalError("");
    if (touched[field]) {
      setFormErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFormErrors(prev => ({
      ...prev,
      [field]: validateField(field, (formData as Record<string, unknown>)[field]),
    }));
  };

  const fieldError = (field: string) => (touched[field] ? formErrors[field] ?? "" : "");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, avatarUrl: "Photo must be smaller than 5 MB." }));
      setTouched(prev => ({ ...prev, avatarUrl: true }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateField("avatarUrl", reader.result as string);
      setFormErrors(prev => ({ ...prev, avatarUrl: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateField("avatarUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const totalReach = (() => {
    let t = 0;
    if (formData.youtubeHandle    && formData.youtubeSubscribers) t += Number(formData.youtubeSubscribers)  || 0;
    if (formData.instagramHandle  && formData.instagramFollowers)  t += Number(formData.instagramFollowers)  || 0;
    if (formData.tiktokHandle     && formData.tiktokFollowers)     t += Number(formData.tiktokFollowers)     || 0;
    if (formData.xHandle          && formData.xFollowers)          t += Number(formData.xFollowers)          || 0;
    if (formData.linkedinHandle   && formData.linkedinFollowers)   t += Number(formData.linkedinFollowers)   || 0;
    return t;
  })();
  const currentTier = getCreatorTier(totalReach);

  const pwChecks = checkPassword(formData.password);
  const strength = pwdScore(formData.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength] ?? "";
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][strength] ?? "bg-gray-200";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");

    // Touch + validate all required fields
    const required = ["fullName", "handle", "email", "password", "startingPrice"];
    const newTouched = { ...touched };
    const newErrors  = { ...formErrors };
    required.forEach(f => {
      newTouched[f] = true;
      newErrors[f]  = validateField(f, (formData as Record<string, unknown>)[f]);
    });

    if (!formData.avatarUrl.trim()) newErrors.avatarUrl = "Profile photo is required.";
    newTouched.avatarUrl = true;
    if (!formData.gender)           newErrors.gender    = "Please select your gender.";
    newTouched.gender = true;

    setTouched(newTouched);
    setFormErrors(newErrors);

    if (Object.values(newErrors).some(e => e)) {
      setGlobalError("Please fix the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    const nameVal   = formData.fullName.trim();
    const handleVal = formData.handle.trim().replace(/^@/, "");
    const emailVal  = formData.email.trim();
    const priceVal  = Number(formData.startingPrice);

    try {
      const res = await authService.registerCreator({
        fullName: nameVal, email: emailVal, password: formData.password,
        handle: `@${handleVal}`, avatarUrl: formData.avatarUrl, gender: formData.gender,
        location: formData.location.trim() || "United States",
        primaryCategory: formData.primaryCategory, startingPrice: priceVal, currency,
        bio: formData.bio.trim() || `Content creator specializing in ${formData.primaryCategory}.`,
        youtubeHandle: formData.youtubeHandle.trim(),      youtubeSubscribers: Number(formData.youtubeSubscribers)  || 0,
        instagramHandle: formData.instagramHandle.trim(),  instagramFollowers: Number(formData.instagramFollowers)  || 0,
        tiktokHandle: formData.tiktokHandle.trim(),        tiktokFollowers:    Number(formData.tiktokFollowers)     || 0,
        xHandle: formData.xHandle.trim() || handleVal,    xFollowers:         Number(formData.xFollowers)           || 0,
        linkedinHandle: formData.linkedinHandle.trim(),   linkedinFollowers:  Number(formData.linkedinFollowers)   || 0,
      });
      if (res.user) {
        if (res.token) authService.saveToken(res.token);
        setAuthData(res.user, res.creatorProfile, res.brandProfile);
        addToast({ type: "success", title: "Creator Account Activated", message: `Welcome to AbeyCollab, ${nameVal}!` });
        router.push("/app/dashboard");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setGlobalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-8 md:p-10 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <Link href="/register" className="text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors">
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

      {/* Global error */}
      {globalError && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        {/* ── Section 1: Creator Identity ───────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white font-mono">
            1. Creator Identity
          </h2>

          {/* Profile Photo */}
          <div className={`p-4 rounded-2xl border space-y-3 transition-colors ${
            touched.avatarUrl && formErrors.avatarUrl
              ? "bg-red-50/40 dark:bg-red-950/20 border-red-300 dark:border-red-700"
              : formData.avatarUrl
              ? "bg-[#F8F8FC] dark:bg-[#181824] border-green-400/50 dark:border-green-600/40"
              : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10"
          }`}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0A0A0E] dark:text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-500" />
                Profile Photo
                <span className="text-red-500 font-bold">*</span>
                <span className="text-[11px] font-normal text-[#5A5A68] dark:text-[#8E8EA4]">(Mandatory)</span>
              </label>
              {formData.avatarUrl && (
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Attached
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative group shrink-0">
                <div className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all flex items-center justify-center relative ${
                  formData.avatarUrl
                    ? "border-amber-500 shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                    : touched.avatarUrl && formErrors.avatarUrl
                    ? "border-dashed border-red-400"
                    : "border-dashed border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
                }`}>
                  {formData.avatarUrl ? (
                    <SafeImage src={formData.avatarUrl} alt="Avatar Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#7A7A8A] dark:text-[#8E8EA4]">
                      <UserIcon className="w-7 h-7 opacity-40" />
                      <span className="text-[9px] font-mono mt-0.5 opacity-60">Required</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <input type="file" ref={fileInputRef} accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoUpload} className="hidden" />

                <div className="flex items-center gap-2 flex-wrap">
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0A0A0E] text-white dark:bg-white dark:text-[#0A0A0E] hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{formData.avatarUrl ? "Change Photo" : "Upload Photo"}</span>
                  </button>
                  {formData.avatarUrl && (
                    <button type="button" onClick={handleRemovePhoto}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors inline-flex items-center gap-1">
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4]">
                  JPG, PNG or WebP · max 5 MB · mandatory for brand discovery
                </p>

                {/* Preset avatars */}
                <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                  <span className="text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">Or pick:</span>
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button key={idx} type="button"
                      onClick={() => { updateField("avatarUrl", preset.url); if (!formData.gender) updateField("gender", preset.gender); }}
                      className={`w-6 h-6 rounded-full overflow-hidden border transition-transform hover:scale-110 relative ${
                        formData.avatarUrl === preset.url ? "ring-2 ring-amber-500 border-amber-500" : "border-black/10 dark:border-white/10"
                      }`}
                      title={preset.label}>
                      <SafeImage src={preset.url} alt={preset.label} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {touched.avatarUrl && formErrors.avatarUrl && (
              <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />{formErrors.avatarUrl}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-1.5 text-left font-sans">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">
                Gender
                <span className="text-red-500 font-bold ml-1">*</span>
                <span className="text-[11px] font-normal text-[#5A5A68] dark:text-[#8E8EA4] ml-1.5">(Mandatory for campaign matching)</span>
              </label>
              {formData.gender && (
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-[#FFD21F] capitalize flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {formData.gender}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(["male", "female"] as const).map(g => (
                <button key={g} type="button"
                  onClick={() => { updateField("gender", g); setTouched(p => ({ ...p, gender: true })); setFormErrors(p => ({ ...p, gender: "" })); }}
                  className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between ${
                    formData.gender === g
                      ? "border-amber-500 bg-amber-500/15 dark:bg-amber-500/20 ring-2 ring-amber-500/30"
                      : touched.gender && formErrors.gender
                      ? "border-red-400 bg-red-50/30 dark:bg-red-950/20"
                      : "border-black/10 dark:border-white/10 bg-[#F8F8FC] dark:bg-[#181824] hover:border-black/20 dark:hover:border-white/20"
                  }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base ${
                      formData.gender === g ? "bg-amber-500 text-[#0A0A0E]" : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#8E8EA4]"
                    }`}>
                      {g === "male" ? "♂" : "♀"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0A0A0E] dark:text-white capitalize">{g}</p>
                      <p className="text-[10px] text-[#5A5A68] dark:text-[#8E8EA4]">{g === "male" ? "Male" : "Female"} Creator</p>
                    </div>
                  </div>
                  {formData.gender === g && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-[#0A0A0E] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {touched.gender && formErrors.gender && (
              <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />{formErrors.gender}
              </p>
            )}
          </div>

          {/* Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Brand Name"
              value={formData.fullName}
              onChange={e => updateField("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              error={fieldError("fullName")}
              hint="Your real name or creator alias (2–80 characters)"
              placeholder="e.g. Dipti Parihar"
              required
            />
            <Input
              label="Primary Handle (@)"
              value={formData.handle}
              onChange={e => updateField("handle", e.target.value)}
              onBlur={() => handleBlur("handle")}
              error={fieldError("handle")}
              hint="Letters, numbers, dots, underscores, hyphens only"
              placeholder="diptiparihar"
              required
            />
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={e => updateField("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={fieldError("email")}
              hint="We'll use this to contact you about campaigns"
              placeholder="you@example.com"
              required
            />

            <div className="space-y-2">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={e => updateField("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                error={fieldError("password")}
                placeholder="••••••••••••"
                required
                rightElement={
                  <button type="button" onClick={() => setShowPassword(p => !p)}
                    className="text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors p-1">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              {/* Password strength meter */}
              {formData.password && (
                <div className="space-y-1.5 px-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1 flex-1">
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < strength ? strengthColor : "bg-black/10 dark:bg-white/10"
                        }`} />
                      ))}
                    </div>
                    <span className={`text-[10px] font-bold font-mono ${
                      strength <= 1 ? "text-red-500" : strength === 2 ? "text-orange-500" : strength === 3 ? "text-yellow-500" : "text-green-500"
                    }`}>{strengthLabel}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                    {([
                      { label: "8+ characters",    ok: pwChecks.length },
                      { label: "Uppercase letter",  ok: pwChecks.uppercase },
                      { label: "Lowercase letter",  ok: pwChecks.lowercase },
                      { label: "Contains a number", ok: pwChecks.number },
                    ] as { label: string; ok: boolean }[]).map(req => (
                      <div key={req.label} className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${
                        req.ok ? "text-green-600 dark:text-green-400" : "text-[#8A8A9A] dark:text-[#8E8EA4]"
                      }`}>
                        {req.ok
                          ? <CheckCircle2 className="w-3 h-3 shrink-0" />
                          : <XCircle className="w-3 h-3 shrink-0 opacity-50" />}
                        {req.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category & Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left font-sans">
              <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">Primary Content Niche</label>
              <select
                value={formData.primaryCategory}
                onChange={e => updateField("primaryCategory", e.target.value as CreatorCategory)}
                className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans">
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-white dark:bg-[#181824]">{cat}</option>
                ))}
              </select>
            </div>

            <Input
              label={`Starting Sponsorship Rate (${currSymbol} ${currency})`}
              type="number"
              value={formData.startingPrice || ""}
              onChange={e => updateField("startingPrice", parseInt(e.target.value) || 0)}
              onBlur={() => handleBlur("startingPrice")}
              error={fieldError("startingPrice")}
              hint="Minimum per-campaign fee you charge brands"
              required
            />
          </div>
        </div>

        {/* ── Section 2: Social Channels ─────────────────────────────────── */}
        <div className="space-y-4 pt-4 border-t border-black/8 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white font-mono">
              2. Connect Social Channels
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] text-[11px] font-mono font-bold border border-[#FFD21F]/40 self-start sm:self-auto">
              <Users className="w-3.5 h-3.5" />
              <span>Est. Reach: {totalReach.toLocaleString()} ({currentTier} Tier)</span>
            </div>
          </div>

          <p className="text-[11px] text-[#6A6A78] dark:text-[#8E8EA4]">
            Optional — but adding at least one channel unlocks your verified rate card and improves brand matching.
            If you fill a handle, please also enter the follower/subscriber count.
          </p>

          {/* YouTube */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
                <Youtube className="w-3.5 h-3.5" />
              </div>
              <span>YouTube Channel</span>
              <span className="text-[10px] font-normal text-[#8A8A9A]">(optional)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="Channel handle (e.g. @decodingtech)"
                value={formData.youtubeHandle}
                onChange={e => updateField("youtubeHandle", e.target.value)}
                error={formData.youtubeHandle && !formData.youtubeSubscribers ? "Please enter subscriber count too." : ""}
                hint="Include @ prefix or just the channel name" />
              <Input type="number" placeholder="Subscribers (e.g. 45000)"
                value={formData.youtubeSubscribers || ""}
                onChange={e => updateField("youtubeSubscribers", parseInt(e.target.value) || 0)}
                error={!formData.youtubeHandle && formData.youtubeSubscribers ? "Please enter the channel handle too." : ""}
                hint="Total subscriber count" />
            </div>
          </div>

          {/* Instagram */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span>Instagram Profile</span>
              <span className="text-[10px] font-normal text-[#8A8A9A]">(optional)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="Instagram handle (e.g. @prarthaana.04)"
                value={formData.instagramHandle}
                onChange={e => updateField("instagramHandle", e.target.value)}
                error={formData.instagramHandle && !formData.instagramFollowers ? "Please enter follower count too." : ""}
                hint="Your @username" />
              <Input type="number" placeholder="Followers (e.g. 30000)"
                value={formData.instagramFollowers || ""}
                onChange={e => updateField("instagramFollowers", parseInt(e.target.value) || 0)}
                error={!formData.instagramHandle && formData.instagramFollowers ? "Please enter the Instagram handle too." : ""}
                hint="Total follower count" />
            </div>
          </div>

          {/* TikTok */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 text-black dark:text-white flex items-center justify-center">
                <Video className="w-3.5 h-3.5" />
              </div>
              <span>TikTok Channel</span>
              <span className="text-[10px] font-normal text-[#8A8A9A]">(optional)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="TikTok handle (e.g. @yourcreator)"
                value={formData.tiktokHandle}
                onChange={e => updateField("tiktokHandle", e.target.value)}
                error={formData.tiktokHandle && !formData.tiktokFollowers ? "Please enter follower count too." : ""}
                hint="Your @username" />
              <Input type="number" placeholder="Followers (e.g. 50000)"
                value={formData.tiktokFollowers || ""}
                onChange={e => updateField("tiktokFollowers", parseInt(e.target.value) || 0)}
                error={!formData.tiktokHandle && formData.tiktokFollowers ? "Please enter the TikTok handle too." : ""}
                hint="Total follower count" />
            </div>
          </div>

          {/* X / Twitter */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
              <div className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 text-black dark:text-white flex items-center justify-center">
                <Twitter className="w-3.5 h-3.5" />
              </div>
              <span>X (Twitter) Profile</span>
              <span className="text-[10px] font-normal text-[#8A8A9A]">(optional)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="X handle (e.g. @caimarsalizi)"
                value={formData.xHandle}
                onChange={e => updateField("xHandle", e.target.value)}
                error={formData.xHandle && !formData.xFollowers ? "Please enter follower count too." : ""}
                hint="Your @username" />
              <Input type="number" placeholder="Followers (e.g. 20000)"
                value={formData.xFollowers || ""}
                onChange={e => updateField("xFollowers", parseInt(e.target.value) || 0)}
                error={!formData.xHandle && formData.xFollowers ? "Please enter the X handle too." : ""}
                hint="Total follower count" />
            </div>
          </div>
        </div>

        {/* ── Section 3: Bio ─────────────────────────────────────────────── */}
        <div className="space-y-2 pt-4 border-t border-black/8 dark:border-white/10">
          <Textarea
            label="Bio & Audience Demographics"
            value={formData.bio}
            onChange={e => { updateField("bio", e.target.value); handleBlur("bio"); }}
            onBlur={() => handleBlur("bio")}
            error={fieldError("bio")}
            hint={`${formData.bio.length}/500 characters — Describe your content format, audience geography and past brand work`}
            placeholder="Describe your content format, production gear, audience geography, and past brand work..."
            rows={3}
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Activating Profile...</span></>
            ) : (
              <><span>Publish Creator Media Kit</span><ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </form>

      <div className="pt-3 border-t border-black/8 dark:border-white/10 text-center">
        <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0A0A0E] dark:text-[#FFD21F] hover:underline font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
