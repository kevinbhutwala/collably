"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { Input } from "@/components/ui/Input";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Video,
  Lock,
  Mail,
  User,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  AtSign,
  Sparkles,
} from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLE_RE = /^[a-zA-Z0-9._-]+$/;

function checkPassword(pw: string) {
  return {
    length: pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
  };
}

function pwdScore(pw: string): number {
  return Object.values(checkPassword(pw)).filter(Boolean).length;
}

function parseSocialLinkOrHandle(input: string): { handle: string; cleanHandle: string; platform?: string } {
  const trimmed = input.trim();
  if (!trimmed) return { handle: "", cleanHandle: "" };

  // Match Instagram URL
  const igMatch = trimmed.match(/(?:instagram\.com\/)([a-zA-Z0-9._]+)/i);
  if (igMatch && igMatch[1]) {
    return { handle: `@${igMatch[1]}`, cleanHandle: igMatch[1], platform: "Instagram" };
  }

  // Match YouTube URL
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:@|c\/|user\/)?)([a-zA-Z0-9._-]+)/i);
  if (ytMatch && ytMatch[1]) {
    return { handle: `@${ytMatch[1]}`, cleanHandle: ytMatch[1], platform: "YouTube" };
  }

  // Match TikTok URL
  const ttMatch = trimmed.match(/(?:tiktok\.com\/@?)([a-zA-Z0-9._]+)/i);
  if (ttMatch && ttMatch[1]) {
    return { handle: `@${ttMatch[1]}`, cleanHandle: ttMatch[1], platform: "TikTok" };
  }

  // Clean raw handle
  const clean = trimmed.replace(/^@/, "");
  return { handle: `@${clean}`, cleanHandle: clean };
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthData } = useAuthStore();
  const { addToast } = useUIStore();

  const urlRole = searchParams.get("role");
  const [role, setRole] = useState<"creator" | "brand">(
    urlRole === "brand" ? "brand" : "creator"
  );

  useEffect(() => {
    const qRole = searchParams.get("role");
    if (qRole === "brand" || qRole === "creator") {
      setRole(qRole);
    }
  }, [searchParams]);

  const [fullName, setFullName] = useState("");
  const [handleInput, setHandleInput] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const detectedSocial = role === "creator" && handleInput.trim() ? parseSocialLinkOrHandle(handleInput) : null;

  const pwStrength = pwdScore(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStrength] ?? "";
  const strengthColor =
    ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][pwStrength] ?? "bg-gray-200";

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = role === "brand" ? "Representative name is required" : "Full name is required";
    } else if (fullName.trim().length < 2) {
      errs.fullName = "Name must be at least 2 characters";
    }

    if (role === "creator" && handleInput.trim()) {
      const parsed = parseSocialLinkOrHandle(handleInput);
      if (!HANDLE_RE.test(parsed.cleanHandle)) {
        errs.handle = "Valid social profile link or handle required (letters, numbers, dots)";
      }
    }

    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!EMAIL_RE.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    setTouched({
      fullName: true,
      handle: true,
      companyName: true,
      email: true,
      password: true,
    });

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const parsed = parseSocialLinkOrHandle(handleInput);
      const cleanHandle =
        parsed.cleanHandle ||
        fullName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      const finalCompanyName = companyName.trim() || fullName.trim();

      const res = await authService.register({
        name: fullName.trim(),
        email: email.trim(),
        password,
        role,
        handle: role === "creator" ? `@${cleanHandle}` : undefined,
        companyName: role === "brand" ? finalCompanyName : undefined,
        contactName: role === "brand" ? fullName.trim() : undefined,
      });

      if (res.user) {
        if (res.token) authService.saveToken(res.token);
        setAuthData(res.user, res.creatorProfile, res.brandProfile);
        addToast({
          type: "success",
          title: "Account Created Successfully",
          message: `Welcome to AbeyCollab, ${fullName.trim()}!`,
        });

        if (role === "brand") {
          router.push("/app/brand/campaigns");
        } else {
          router.push("/app/dashboard");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-8 md:p-10 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <span className="text-[10px] font-mono text-[#0A0A0E] dark:text-[#FFD21F] font-bold uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
          Direct Access
        </span>
      </div>

      {/* Title */}
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Join AbeyCollab
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4] font-sans">
          One common registration for creators, brands, and sponsors.
        </p>
      </div>

      {/* Account Type Selector (Clean Segmented Selector) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#0A0A0E] dark:text-white font-sans">
          I am registering as:
        </label>
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/8 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setRole("creator");
              setErrorMessage("");
              setErrors({});
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all cursor-pointer ${
              role === "creator"
                ? "bg-white dark:bg-[#1E1E2C] text-[#0A0A0E] dark:text-white shadow-sm border border-black/10 dark:border-white/15"
                : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            <Video className={`w-3.5 h-3.5 ${role === "creator" ? "text-amber-500" : ""}`} />
            <span>Creator / Influencer</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("brand");
              setErrorMessage("");
              setErrors({});
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all cursor-pointer ${
              role === "brand"
                ? "bg-white dark:bg-[#1E1E2C] text-[#0A0A0E] dark:text-white shadow-sm border border-black/10 dark:border-white/15"
                : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${role === "brand" ? "text-amber-500" : ""}`} />
            <span>Brand / Sponsor</span>
          </button>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Common Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <Input
          label={role === "brand" ? "Contact / Representative Name" : "Full Name"}
          type="text"
          required
          placeholder={role === "brand" ? "e.g. Sarah Chen" : "e.g. Alex Rivera"}
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          onBlur={() => handleBlur("fullName")}
          error={touched.fullName ? errors.fullName : undefined}
          icon={<User className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
        />

        {/* Optional Role Specific Field */}
        {role === "creator" ? (
          <div className="space-y-1.5">
            <Input
              label="Social Profile Link or Handle (Optional)"
              type="text"
              placeholder="Paste Instagram/YouTube link or @handle"
              value={handleInput}
              onChange={(e) => {
                setHandleInput(e.target.value);
                if (errors.handle) setErrors((prev) => ({ ...prev, handle: "" }));
              }}
              onBlur={() => handleBlur("handle")}
              error={touched.handle ? errors.handle : undefined}
              icon={<AtSign className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
            />
            {detectedSocial && detectedSocial.cleanHandle && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] font-mono text-amber-700 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {detectedSocial.platform ? `Detected ${detectedSocial.platform}: ` : "Auto-extracted: "}
                  <strong>{detectedSocial.handle}</strong>
                </span>
              </div>
            )}
            <p className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] font-sans">
              Leave blank to auto-create from your name. You can also connect channels later in your profile.
            </p>
          </div>
        ) : (
          <div>
            <Input
              label="Company / Brand Name (Optional)"
              type="text"
              placeholder="e.g. Acme Corp (defaults to your name if empty)"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: "" }));
              }}
              onBlur={() => handleBlur("companyName")}
              error={touched.companyName ? errors.companyName : undefined}
              icon={<Building2 className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
            />
          </div>
        )}

        {/* Email Address */}
        <Input
          label={role === "brand" ? "Work Email" : "Email Address"}
          type="email"
          required
          placeholder={role === "brand" ? "partnerships@company.com" : "you@example.com"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          onBlur={() => handleBlur("email")}
          error={touched.email ? errors.email : undefined}
          icon={<Mail className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
        />

        {/* Password */}
        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
            }}
            onBlur={() => handleBlur("password")}
            error={touched.password ? errors.password : undefined}
            icon={<Lock className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          {/* Password strength bar */}
          {password && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">
                <span>Security Strength:</span>
                <span className="font-bold">{strengthLabel}</span>
              </div>
              <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full flex-1 rounded-full transition-colors ${
                      pwStrength >= step ? strengthColor : "bg-black/5 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 cursor-pointer mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
              <span>Creating Your Account...</span>
            </>
          ) : (
            <>
              <span>Create {role === "brand" ? "Brand" : "Creator"} Account</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <div className="text-center pt-2 border-t border-black/8 dark:border-white/10">
        <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0A0A0E] dark:text-[#FFD21F] hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FFD21F]" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
