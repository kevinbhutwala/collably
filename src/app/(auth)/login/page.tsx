"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import {
  AlertCircle,
  Lock,
  Mail,
  Loader2,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

function LoginForm() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/app/dashboard";
  const errorParam = searchParams.get("error");
  const { login, isAuthenticated, user, checkSession } = useAuthStore();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle error messages from URL params
  useEffect(() => {
    if (errorParam === "session_expired") {
      setErrorMessage("Your session has expired. Please sign in again to continue.");
    } else if (errorParam === "auth_required") {
      setErrorMessage("You must sign in to your verified account to access that page.");
    } else if (errorParam === "admin_required") {
      setErrorMessage("Administrative access required. Please sign in with an authorized admin account.");
    } else if (errorParam === "brand_access_denied") {
      setErrorMessage("Brand workspace access required. Please sign in with a brand account.");
    }
  }, [errorParam]);

  // Auto-redirect if already authenticated and no explicit error is set
  useEffect(() => {
    if (errorParam) return;

    if (isAuthenticated && user) {
      const isAdmin =
        user.role === "agency_admin" ||
        user.role === "agency_owner" ||
        user.role === "super_admin" ||
        (user.role as string) === "admin";
      const targetDestination =
        redirect !== "/app/dashboard"
          ? redirect
          : isAdmin
          ? "/admin"
          : "/app/dashboard";
      router.replace(targetDestination);
      return;
    }

    // Verify session in background in case token exists in cookie or localStorage
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
            : "/app/dashboard";
        router.replace(target);
      }
    });
  }, [isAuthenticated, user, errorParam, redirect, router, checkSession]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const idVal = email.trim();
    if (!idVal) {
      setErrorMessage("Please enter your email address or creator handle.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your account password.");
      setIsLoading(false);
      return;
    }

    try {
      await login(idVal, password);
      addToast({
        type: "success",
        title: "Signed in successfully",
        message: "Welcome to your AbeyCollab workspace!",
      });
      const activeUser = useAuthStore.getState().user;
      const isAdmin =
        activeUser?.role === "agency_admin" ||
        activeUser?.role === "agency_owner" ||
        activeUser?.role === "super_admin" ||
        (activeUser?.role as string) === "admin";
      const targetDestination =
        redirect !== "/app/dashboard"
          ? redirect
          : isAdmin
          ? "/admin"
          : "/app/dashboard";
      router.push(targetDestination);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid email/handle or password. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      {/* Top Header with Back to Home button */}
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
          Secure Portal
        </span>
      </div>

      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Welcome back
        </h1>
        <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans">
          Sign in to view your projects, messages, and payments.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-3">
        <GoogleSignInButton mode="login" redirect={redirect} />
        
        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-black/10 dark:border-white/10 w-full" />
          <span className="bg-white dark:bg-[#12121A] px-3 text-[10px] text-[#7A7A8A] font-semibold uppercase tracking-wider">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address or Creator Handle"
          type="text"
          required
          placeholder="name@example.com or @handle"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          icon={<Mail className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
        />

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
          <div className="flex justify-end pt-1">
            <Link
              href="/forgot-password"
              className="text-[11px] font-sans text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
              <span>Verifying Session...</span>
            </>
          ) : (
            <span>Sign In with Email</span>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
          New to AbeyCollab?{" "}
          <Link href="/register" className="text-[#0A0A0E] dark:text-[#FFD21F] hover:underline font-bold">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-center text-[#0A0A0E] dark:text-[#F4F4F8] shadow-sm">
          <CreativeLoader size="sm" label="Loading Sign In..." />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

