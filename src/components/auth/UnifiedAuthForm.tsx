"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { authService } from "@/services/auth.service";
import { Input } from "@/components/ui/Input";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { InstagramSignInButton } from "@/components/auth/InstagramSignInButton";
import {
  AlertCircle,
  Lock,
  Mail,
  User,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
  Video,
  Building2,
  Sparkles,
} from "lucide-react";

interface UnifiedAuthFormProps {
  initialTab?: "signin" | "register";
}

export function UnifiedAuthForm({ initialTab = "signin" }: UnifiedAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL parameters
  const redirect = searchParams.get("redirect") || "/app/dashboard";
  const errorParam = searchParams.get("error");
  const queryRole = searchParams.get("role");

  // Auth Store
  const { login, isAuthenticated, user, checkSession, setAuthData } = useAuthStore();
  const { addToast } = useUIStore();

  // Tab State: "signin" | "register"
  const [activeTab, setActiveTab] = useState<"signin" | "register">(initialTab);

  // Registration Role: "creator" | "brand"
  const [role, setRole] = useState<"creator" | "brand">(
    queryRole === "brand" ? "brand" : "creator"
  );

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync tab with props or URL params
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (queryRole === "brand" || queryRole === "creator") {
      setRole(queryRole);
    }
  }, [queryRole]);

  // Handle URL errors
  useEffect(() => {
    if (errorParam === "session_expired") {
      setErrorMessage("Your session has expired. Please sign in again.");
    } else if (errorParam === "auth_required") {
      setErrorMessage("Please sign in to access that page.");
    } else if (errorParam === "admin_required") {
      setErrorMessage("Administrative access required.");
    } else if (errorParam === "brand_access_denied") {
      setErrorMessage("Brand workspace access required.");
    }
  }, [errorParam]);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (errorParam) return;

    if (isAuthenticated && user) {
      const isAdmin =
        user.role === "agency_admin" ||
        user.role === "agency_owner" ||
        user.role === "super_admin" ||
        (user.role as string) === "admin";
      const target =
        redirect !== "/app/dashboard"
          ? redirect
          : isAdmin
          ? "/admin"
          : user.role === "brand"
          ? "/app/brand/campaigns"
          : "/app/dashboard";
      router.replace(target);
      return;
    }

    checkSession().then((isValid) => {
      if (isValid) {
        const activeUser = useAuthStore.getState().user;
        const isAdmin =
          activeUser?.role === "agency_admin" ||
          activeUser?.role === "agency_owner" ||
          activeUser?.role === "super_admin" ||
          (activeUser?.role as string) === "admin";
        const target =
          redirect !== "/app/dashboard"
            ? redirect
            : isAdmin
            ? "/admin"
            : activeUser?.role === "brand"
            ? "/app/brand/campaigns"
            : "/app/dashboard";
        router.replace(target);
      }
    });
  }, [isAuthenticated, user, errorParam, redirect, router, checkSession]);

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      setIsLoading(false);
      return;
    }

    if (activeTab === "register" && !name.trim()) {
      setErrorMessage("Please enter your name.");
      setIsLoading(false);
      return;
    }

    try {
      if (activeTab === "signin") {
        // Sign In Flow
        await login(trimmedEmail, password);
        addToast({
          type: "success",
          title: "Welcome back!",
          message: "Signed in successfully to AbeyCollab.",
        });

        const activeUser = useAuthStore.getState().user;
        const target =
          redirect !== "/app/dashboard"
            ? redirect
            : activeUser?.role === "brand"
            ? "/app/brand/campaigns"
            : "/app/dashboard";
        router.push(target);
      } else {
        // Sign Up Flow
        const res = await authService.register({
          name: name.trim(),
          email: trimmedEmail,
          password,
          role,
          companyName: role === "brand" ? name.trim() : undefined,
          contactName: role === "brand" ? name.trim() : undefined,
        });

        if (res.user) {
          if (res.token) authService.saveToken(res.token);
          setAuthData(res.user, res.creatorProfile, res.brandProfile);
          addToast({
            type: "success",
            title: "Account Created!",
            message: `Welcome to AbeyCollab, ${name.trim()}!`,
          });

          const target = role === "brand" ? "/app/brand/campaigns" : "/app/dashboard";
          router.push(target);
        }
      }
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          (activeTab === "signin"
            ? "Invalid email or password. Please try again."
            : "Registration failed. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] dark:text-[#F4F4F8] select-none transition-all">
      {/* Header with Title & Live Badge */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-3 h-3 text-[#FFD21F]" />
          <span>AbeyCollab Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
          {activeTab === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans">
          {activeTab === "signin"
            ? "Sign in to manage your campaigns, deals, and payouts."
            : "Join India's verified creator & brand collaboration network."}
        </p>
      </div>

      {/* Segmented Switcher: [ Sign In ] | [ Create Account ] */}
      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/8 dark:border-white/10">
        <button
          type="button"
          onClick={() => {
            setActiveTab("signin");
            setErrorMessage("");
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
            activeTab === "signin"
              ? "bg-white dark:bg-[#1E1E2C] text-[#0A0A0E] dark:text-white shadow-xs border border-black/10 dark:border-white/15"
              : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
          }`}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("register");
            setErrorMessage("");
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
            activeTab === "register"
              ? "bg-white dark:bg-[#1E1E2C] text-[#0A0A0E] dark:text-white shadow-xs border border-black/10 dark:border-white/15"
              : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Role Picker (Only shown when on Create Account tab) */}
      {activeTab === "register" && (
        <div className="space-y-1.5 pt-0.5">
          <label className="text-[11px] font-bold text-[#5A5A68] dark:text-[#A0A0B4] font-sans">
            I am joining as:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("creator")}
              className={`py-2 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                role === "creator"
                  ? "bg-[#FFD21F]/15 dark:bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] border-[#FFD21F]/60"
                  : "bg-black/[0.02] dark:bg-white/[0.03] text-[#7A7A8A] dark:text-[#8E8EA4] border-black/8 dark:border-white/8 hover:text-[#0A0A0E] dark:hover:text-white"
              }`}
            >
              <Video className="w-3.5 h-3.5 text-amber-500" />
              <span>Creator / Influencer</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("brand")}
              className={`py-2 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                role === "brand"
                  ? "bg-[#FFD21F]/15 dark:bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] border-[#FFD21F]/60"
                  : "bg-black/[0.02] dark:bg-white/[0.03] text-[#7A7A8A] dark:text-[#8E8EA4] border-black/8 dark:border-white/8 hover:text-[#0A0A0E] dark:hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Brand / Business</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1-Click Social Sign-In & Sign-Up (Works for BOTH existing and new users!) */}
      <div className="space-y-2.5">
        <GoogleSignInButton
          mode={activeTab === "register" ? "register" : "login"}
          role={role}
          redirect={redirect}
          label={
            activeTab === "register"
              ? `Sign up as ${role === "brand" ? "Brand" : "Creator"} with Google`
              : "Continue with Google"
          }
        />
        <InstagramSignInButton
          mode={activeTab === "register" ? "register" : "login"}
          role={role}
          redirect={redirect}
          label={
            activeTab === "register"
              ? `Sign up as ${role === "brand" ? "Brand" : "Creator"} with Instagram`
              : "Continue with Instagram"
          }
        />

        {/* Symmetric Centered Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-px bg-black/10 dark:bg-white/10 grow" />
          <span className="text-[11px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4] font-semibold uppercase tracking-wider whitespace-nowrap">
            or with email
          </span>
          <div className="h-px bg-black/10 dark:bg-white/10 grow" />
        </div>
      </div>

      {/* Streamlined Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name / Company Name (Only on register) */}
        {activeTab === "register" && (
          <Input
            label={role === "brand" ? "Company / Brand Name" : "Your Name"}
            type="text"
            required
            placeholder={role === "brand" ? "e.g. Acme Studio" : "e.g. Alex Rivera"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            icon={<User className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
          />
        )}

        {/* Email Address */}
        <Input
          label={activeTab === "register" && role === "brand" ? "Work Email" : "Email Address"}
          type="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          icon={<Mail className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
        />

        {/* Password */}
        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
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
          {activeTab === "signin" && (
            <div className="flex justify-end pt-0.5">
              <Link
                href="/forgot-password"
                className="text-[11px] font-sans text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.35)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 cursor-pointer mt-1"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
              <span>{activeTab === "signin" ? "Signing In..." : "Creating Account..."}</span>
            </>
          ) : (
            <>
              <span>{activeTab === "signin" ? "Sign In" : `Create ${role === "brand" ? "Brand" : "Creator"} Account`}</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
            </>
          )}
        </button>
      </form>

      {/* Bottom Switcher */}
      <div className="text-center pt-1 border-t border-black/8 dark:border-white/10">
        <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
          {activeTab === "signin" ? (
            <>
              New to AbeyCollab?{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setErrorMessage("");
                }}
                className="text-[#0A0A0E] dark:text-[#FFD21F] hover:underline font-bold cursor-pointer"
              >
                Create an Account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signin");
                  setErrorMessage("");
                }}
                className="text-[#0A0A0E] dark:text-[#FFD21F] hover:underline font-bold cursor-pointer"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
