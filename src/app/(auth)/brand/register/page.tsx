"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { Input } from "@/components/ui/Input";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Building2,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
  Upload,
  Trash2,
  Check,
  Camera,
} from "lucide-react";
import { formatCurrency } from "@/core/utils/formatters";

// ─── Validation helpers ────────────────────────────────────────────────────────
const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE    = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

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
    case "companyName": {
      const v = String(value ?? "").trim();
      if (!v)           return "Company / brand name is required.";
      if (v.length < 2) return "Company name must be at least 2 characters.";
      if (v.length > 100) return "Company name must be 100 characters or fewer.";
      return "";
    }
    case "contactName": {
      const v = String(value ?? "").trim();
      if (!v)           return "Marketing lead name is required.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      if (v.length > 80) return "Name must be 80 characters or fewer.";
      return "";
    }
    case "email": {
      const v = String(value ?? "").trim();
      if (!v)                 return "Work email address is required.";
      if (!EMAIL_RE.test(v))  return "Enter a valid email address (e.g. name@company.com).";
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
    case "websiteUrl": {
      const v = String(value ?? "").trim();
      if (!v) return ""; // optional
      if (!URL_RE.test(v)) return "Enter a valid website URL (e.g. https://brand.com).";
      return "";
    }
    default:
      return "";
  }
}

// ─── Brand Logo Presets ────────────────────────────────────────────────────────
const BRAND_LOGO_PRESETS = [
  { label: "Sportswear", name: "Apex Athletics", url: "/brands/adidas.svg", hint: "Athletic & Performance" },
  { label: "Streetwear", name: "Snitch Studio", url: "/brands/snitch.png", hint: "Fashion & Lifestyle" },
  { label: "Nutrition", name: "The Whole Truth", url: "/brands/the-whole-truth.png", hint: "Clean Food & Wellness" },
  { label: "Modern SaaS", name: "Linear Cloud", url: "/brands/linear.png", hint: "Developer Tools & Tech" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function BrandRegisterPage() {
  const router = useRouter();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError]   = useState("");
  const [formErrors, setFormErrors]     = useState<Record<string, string>>({});
  const [touched, setTouched]           = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    companyName:   "",
    contactName:   "",
    email:         "",
    password:      "",
    websiteUrl:    "",
    logoUrl:       "",
    industry:      "Technology & AI",
    companySize:   "11-50",
    monthlyBudget: "$10,000 - $25,000",
  });

  const industries = [
    "Technology & AI", "Fashion & Luxury", "Fitness & Wellness", "Consumer Electronics",
    "Beauty & Skincare", "Food & Beverage", "Gaming & Entertainment", "Finance & Fintech",
    "Travel & Hospitality",
  ];

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, logoUrl: "Logo must be smaller than 5 MB." }));
      setTouched(prev => ({ ...prev, logoUrl: true }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateField("logoUrl", reader.result as string);
      setFormErrors(prev => ({ ...prev, logoUrl: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    updateField("logoUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const companyInitials = (formData.companyName || "")
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "B";

  const handleFillDemo = () => {
    const s = Math.floor(1000 + Math.random() * 9000);
    setFormData({
      companyName: `Apex Athletics ${s}`, contactName: "Sarah Chen",
      email: `sarah.chen.${s}@apexathletics.com`, password: "Password123!",
      websiteUrl: "https://apexathletics.com",
      logoUrl: "/brands/adidas.svg",
      industry: "Fitness & Wellness",
      companySize: "11-50", monthlyBudget: "$10,000 - $25,000",
    });
    setFormErrors({});
    setTouched({});
    setGlobalError("");
    addToast({ type: "info", title: "Sample Brand Loaded", message: "Form pre-filled with verified brand details & logo. Ready to submit!" });
  };

  const pwChecks  = checkPassword(formData.password);
  const strength  = pwdScore(formData.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength] ?? "";
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][strength] ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");

    const required = ["companyName", "contactName", "email", "password"];
    const newTouched = { ...touched };
    const newErrors  = { ...formErrors };

    required.forEach(f => {
      newTouched[f] = true;
      newErrors[f]  = validateField(f, (formData as Record<string, unknown>)[f]);
    });

    // Validate optional website if filled
    if (formData.websiteUrl.trim()) {
      newTouched.websiteUrl = true;
      newErrors.websiteUrl  = validateField("websiteUrl", formData.websiteUrl);
    }

    setTouched(newTouched);
    setFormErrors(newErrors);

    if (Object.values(newErrors).some(e => e)) {
      setGlobalError("Please fix the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    const compName = formData.companyName.trim();
    const contName = formData.contactName.trim();
    const emailVal = formData.email.trim();
    const logoVal  = formData.logoUrl.trim();
    let webUrl     = formData.websiteUrl.trim();
    if (webUrl && !/^https?:\/\//i.test(webUrl)) webUrl = `https://${webUrl}`;

    try {
      const res = await authService.register({
        name: contName || compName, contactName: contName, companyName: compName,
        email: emailVal, password: formData.password, role: "brand",
        industry: formData.industry, websiteUrl: webUrl,
        companySize: formData.companySize, monthlyBudget: formData.monthlyBudget,
        logoUrl: logoVal || undefined,
        avatarUrl: logoVal || undefined,
      });

      if (res.user) {
        if (res.token) authService.saveToken(res.token);
        setAuthData(res.user, res.creatorProfile, res.brandProfile);
        addToast({ type: "success", title: "Brand Workspace Ready", message: `Welcome to AbeyCollab, ${contName || compName}!` });
        router.push("/app/brand/campaigns/create");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please check your entries and try again.";
      setGlobalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-8 md:p-10 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <Link href="/register" className="text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors">
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

      {/* Demo fill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <div className="space-y-0.5">
          <p className="text-xs font-bold font-sans flex items-center gap-1.5 text-[#0A0A0E] dark:text-white">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Testing Brand Onboarding?
          </p>
          <p className="text-[11px] text-[#6A6A78] dark:text-[#8E8EA4]">
            Autofill a complete, verified brand persona with industry and budget presets.
          </p>
        </div>
        <button type="button" onClick={handleFillDemo}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFD21F] text-[#0A0A0E] hover:bg-[#FFE052] transition-colors shadow-sm shrink-0 font-sans">
          ⚡ Fill Sample Brand
        </button>
      </div>

      {/* Global error */}
      {globalError && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>

        {/* Brand Logo & Insignia */}
        <div className={`p-4 rounded-2xl border space-y-3 transition-colors ${
          formData.logoUrl
            ? "bg-[#F8F8FC] dark:bg-[#181824] border-amber-400/60 dark:border-amber-400/40"
            : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10"
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-[#0A0A0E] dark:text-white flex items-center gap-1.5 font-sans">
                <Building2 className="w-3.5 h-3.5 text-[#FFD21F]" />
                Brand Logo &amp; Insignia
              </span>
              <span className="text-[11px] font-normal text-[#5A5A68] dark:text-[#8E8EA4]">(Recommended)</span>
            </div>
            {formData.logoUrl && (
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                <Check className="w-3 h-3" /> Attached
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Logo Preview */}
            <div className="relative group shrink-0">
              <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex items-center justify-center relative bg-white dark:bg-[#101018] ${
                formData.logoUrl
                  ? "border-[#FFD21F] shadow-[0_0_14px_rgba(255,210,31,0.25)]"
                  : "border-dashed border-black/20 dark:border-white/20"
              }`}>
                {formData.logoUrl ? (
                  <SafeImage
                    src={formData.logoUrl}
                    alt="Brand Logo Preview"
                    fill
                    className="object-contain p-2"
                    fallbackType="brand"
                    fallbackName={formData.companyName || "Brand"}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#7A7A8A] dark:text-[#8E8EA4] p-1 text-center">
                    {formData.companyName.trim() ? (
                      <span className="font-mono font-black text-xl text-[#0A0A0E] dark:text-[#FFD21F] tracking-wider">
                        {companyInitials}
                      </span>
                    ) : (
                      <Building2 className="w-7 h-7 opacity-40 text-[#FFD21F]" />
                    )}
                    <span className="text-[9px] font-mono mt-0.5 opacity-60">Logo Preview</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions & Preset Buttons */}
            <div className="flex-1 space-y-2 w-full">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/svg+xml,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0A0A0E] text-white dark:bg-white dark:text-[#0A0A0E] hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 shadow-xs font-sans"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{formData.logoUrl ? "Change Logo" : "Upload Brand Logo"}</span>
                </button>
                {formData.logoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors inline-flex items-center gap-1 font-sans"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4]">
                SVG, PNG, JPG, or WebP · Max 5 MB · Displayed across campaign briefs, creator feed &amp; escrow contracts
              </p>

              {/* Quick Brand Presets */}
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                <span className="text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">Or preset:</span>
                {BRAND_LOGO_PRESETS.map((preset) => {
                  const isSelected = formData.logoUrl === preset.url;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        updateField("logoUrl", preset.url);
                        if (!formData.companyName) updateField("companyName", preset.name);
                        if (!formData.industry) updateField("industry", preset.hint);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500 text-[#0A0A0E] dark:text-white font-bold ring-1 ring-amber-500/50"
                          : "bg-white dark:bg-[#12121A] border-black/10 dark:border-white/10 text-[#5A5A68] dark:text-[#8E8EA4] hover:border-black/20 dark:hover:border-white/20"
                      }`}
                      title={preset.hint}
                    >
                      <span className="w-3.5 h-3.5 relative overflow-hidden rounded shrink-0">
                        <SafeImage src={preset.url} alt={preset.label} fill className="object-contain" fallbackType="brand" />
                      </span>
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Company + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company / Brand Name"
            placeholder="Nike, Inc."
            required
            value={formData.companyName}
            onChange={e => updateField("companyName", e.target.value)}
            onBlur={() => handleBlur("companyName")}
            error={fieldError("companyName")}
            hint="Official brand or company name (2–100 characters)"
          />
          <Input
            label="Marketing Lead Name"
            placeholder="Alex Rivera"
            required
            value={formData.contactName}
            onChange={e => updateField("contactName", e.target.value)}
            onBlur={() => handleBlur("contactName")}
            error={fieldError("contactName")}
            hint="Your full name or that of the primary contact"
          />
        </div>

        {/* Email + Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Work Email Address"
            type="email"
            placeholder="alex@nike.com"
            required
            value={formData.email}
            onChange={e => updateField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={fieldError("email")}
            hint="Use a work/business email for faster brand verification"
          />

          <div className="space-y-2">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              required
              value={formData.password}
              onChange={e => updateField("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              error={fieldError("password")}
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

        {/* Industry + Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left font-sans">
            <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">Industry / Category</label>
            <select
              value={formData.industry}
              onChange={e => updateField("industry", e.target.value)}
              className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans">
              {industries.map(ind => (
                <option key={ind} value={ind} className="bg-white dark:bg-[#181824]">{ind}</option>
              ))}
            </select>
            <p className="text-[11px] text-[#6A6A78] dark:text-[#9A9AA8]">Your brand&apos;s primary industry vertical</p>
          </div>

          <Input
            label="Company Website / Store"
            placeholder="https://brand.com"
            value={formData.websiteUrl}
            onChange={e => updateField("websiteUrl", e.target.value)}
            onBlur={() => handleBlur("websiteUrl")}
            error={fieldError("websiteUrl")}
            hint="Optional — helps creators research your brand before applying"
          />
        </div>

        {/* Company Size + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left font-sans">
            <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">
              Company Size <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.companySize}
              onChange={e => updateField("companySize", e.target.value)}
              className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans">
              <option value="1-10">1–10 Employees (Startup / Boutique)</option>
              <option value="11-50">11–50 Employees (Growth Stage)</option>
              <option value="51-200">51–200 Employees (Scaleup)</option>
              <option value="201-1000+">201–1000+ Employees (Enterprise)</option>
            </select>
            <p className="text-[11px] text-[#6A6A78] dark:text-[#9A9AA8]">Helps creators understand your scale</p>
          </div>

          <div className="space-y-1.5 text-left font-sans">
            <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white">
              Est. Monthly Creator Budget <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.monthlyBudget}
              onChange={e => updateField("monthlyBudget", e.target.value)}
              className="w-full bg-[#F8F8FC] dark:bg-[#181824] border border-black/10 dark:border-white/10 rounded-2xl px-3.5 py-3 text-sm text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] transition-all font-sans">
              <option value="<$5,000">&lt; {formatCurrency(5000)} / month</option>
              <option value="$5,000 - $10,000">{formatCurrency(5000)} – {formatCurrency(10000)} / month</option>
              <option value="$10,000 - $25,000">{formatCurrency(10000)} – {formatCurrency(25000)} / month</option>
              <option value="$25,000 - $100,000+">{formatCurrency(25000)} – {formatCurrency(100000)}+ / month</option>
            </select>
            <p className="text-[11px] text-[#6A6A78] dark:text-[#9A9AA8]">Approximate monthly spend on creator campaigns</p>
          </div>
        </div>

        {/* Required fields note */}
        <p className="text-[11px] text-[#8A8A9A] dark:text-[#8E8EA4]">
          <span className="text-red-500 font-bold">*</span> Required fields. All data is encrypted and never shared with third parties.
        </p>

        {/* Submit */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Launching Brand Workspace...</span></>
            ) : (
              <><span>Create Brand Account</span><ArrowRight className="w-4 h-4" /></>
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
