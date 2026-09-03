"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUIStore } from "@/stores/ui.store";
import {
  AlertCircle,
  Lock,
  Mail,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const { addToast } = useUIStore();

  const [email, setEmail] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(Boolean(initialEmail));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (isResetMode) {
      if (newPassword.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        setIsLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...(isResetMode ? { newPassword } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to process request");

      if (isResetMode) {
        addToast({
          type: "success",
          title: "Password Updated",
          message: "Your new password has been set. You can now log in.",
        });
        router.push("/login");
      } else {
        setSuccessMessage(data.message || "Instructions sent! You can also set a new password below.");
        setIsResetMode(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white border border-black/8 p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Sign In</span>
        </Link>
        <span className="text-[10px] font-mono text-[#0A0A0E] font-bold uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40">
          <KeyRound className="w-3 h-3 text-[#0A0A0E]" />
          Recovery
        </span>
      </div>

      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] tracking-tight font-display">
          {isResetMode ? "Set New Password" : "Reset Password"}
        </h1>
        <p className="text-xs text-[#6A6A78] font-sans">
          {isResetMode
            ? "Enter your new account password to regain workspace access."
            : "Enter your registered email address to recover your account."}
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="name@agency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-4 h-4 text-[#7A7A8A]" />}
          disabled={isResetMode && Boolean(initialEmail)}
        />

        {isResetMode && (
          <>
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Minimum 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-[#7A7A8A]" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <Input
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-[#7A7A8A]" />}
            />
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
              <span>Processing...</span>
            </>
          ) : isResetMode ? (
            <span>Save &amp; Reset Password</span>
          ) : (
            <span>Send Reset Instructions</span>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-[#6A6A78]">
          Remembered your credentials?{" "}
          <Link href="/login" className="text-[#0A0A0E] hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-black/8 text-center text-[#0A0A0E] shadow-sm">
          <CreativeLoader size="sm" label="Loading..." />
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
