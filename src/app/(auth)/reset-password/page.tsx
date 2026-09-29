"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Lock,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { cn } from "@/lib/utils";

// ── Password strength helpers ─────────────────────────────────────────────────

interface StrengthResult {
  score: 0 | 1 | 2 | 3 | 4; // 0 = empty, 1 = weak, 2 = fair, 3 = good, 4 = strong
  label: string;
  color: string;
  rules: { label: string; met: boolean }[];
}

function analysePassword(pw: string): StrengthResult {
  const rules = [
    { label: "At least 8 characters", met: pw.length >= 8 },
    { label: "Contains a letter", met: /[A-Za-z]/.test(pw) },
    { label: "Contains a number", met: /[0-9]/.test(pw) },
    { label: "Contains a special character (!@#$…)", met: /[^A-Za-z0-9]/.test(pw) },
    { label: "At least 12 characters (recommended)", met: pw.length >= 12 },
  ];

  if (!pw) return { score: 0, label: "", color: "", rules };

  const met = rules.slice(0, 3).filter((r) => r.met).length; // first 3 are required

  if (met < 2) return { score: 1, label: "Weak", color: "bg-red-500", rules };
  if (met === 2) return { score: 2, label: "Fair", color: "bg-orange-400", rules };
  if (met === 3 && !rules[3].met) return { score: 3, label: "Good", color: "bg-yellow-400", rules };
  return { score: 4, label: "Strong", color: "bg-emerald-500", rules };
}

// ── Main form ─────────────────────────────────────────────────────────────────

type TokenState = "validating" | "valid" | "invalid" | "expired" | "used";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [tokenState, setTokenState] = useState<TokenState>("validating");
  const [tokenError, setTokenError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = analysePassword(password);

  // ── Pre-validate the token when the page loads ──────────────────────────────
  useEffect(() => {
    if (!token) {
      setTokenState("invalid");
      setTokenError("No reset token found in the link. Please request a new one.");
      return;
    }

    fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json();
        if (data.valid) {
          setTokenState("valid");
        } else {
          if (data.reason === "expired") {
            setTokenState("expired");
            setTokenError("This reset link has expired. Links are valid for 1 hour.");
          } else if (data.reason === "already_used") {
            setTokenState("used");
            setTokenError("This reset link has already been used.");
          } else {
            setTokenState("invalid");
            setTokenError("This reset link is invalid or has been tampered with.");
          }
        }
      })
      .catch(() => {
        setTokenState("invalid");
        setTokenError("Could not validate the reset link. Please try again.");
      });
  }, [token]);

  // ── Submit handler ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (strength.score < 2) {
      setError("Password is too weak. It must have at least 8 characters, a letter, and a number.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to reset password. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Render: token invalid / expired / used ──────────────────────────────────
  const renderTokenError = () => (
    <div className="text-center space-y-5 py-4">
      <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
        <XCircle className="w-7 h-7 text-red-500 dark:text-red-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-black text-[#0B0A14] dark:text-white font-display">
          {tokenState === "expired" ? "Link Expired" : tokenState === "used" ? "Link Already Used" : "Invalid Link"}
        </h2>
        <p className="text-sm text-[#6A6A78] dark:text-[#8E8EA4] font-sans leading-relaxed">
          {tokenError}
        </p>
      </div>
      <Link
        href="/forgot-password"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-extrabold text-sm transition-all shadow-[0_4px_16px_rgba(var(--theme-primary-rgb),0.4)] border border-black/10 hover:opacity-90 active:scale-[0.98]"
      >
        Request a New Reset Link
      </Link>
    </div>
  );

  // ── Render: success ─────────────────────────────────────────────────────────
  const renderSuccess = () => (
    <div className="text-center space-y-5 py-4">
      <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
        <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-black text-[#0B0A14] dark:text-white font-display">
          Password Updated
        </h2>
        <p className="text-sm text-[#6A6A78] dark:text-[#8E8EA4] font-sans leading-relaxed">
          Your password has been updated successfully. You can now sign in with your new password.
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => router.push("/login")}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-primary via-[#9333EA] to-accent text-white font-extrabold text-sm transition-all shadow-[0_4px_16px_rgba(var(--theme-primary-rgb),0.4)] border border-black/10 hover:opacity-90 active:scale-[0.98]"
        >
          Back to Login
        </button>
      </div>
    </div>
  );

  // ── Render: validating ──────────────────────────────────────────────────────
  if (tokenState === "validating") {
    return (
      <div className="w-full max-w-md mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] flex items-center justify-center">
        <CreativeLoader size="sm" label="Verifying reset link…" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0B0A14] dark:text-[#F4F4F8] select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0B0A14] dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Sign In
        </Link>
        <span className="text-[10px] font-mono text-[#0B0A14] dark:text-accent font-bold uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40">
          <KeyRound className="w-3 h-3 text-[#0B0A14] dark:text-accent" />
          Reset
        </span>
      </div>

      {/* Content */}
      {tokenState !== "valid" && !success && renderTokenError()}
      {success && renderSuccess()}

      {tokenState === "valid" && !success && (
        <>
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B0A14] dark:text-white tracking-tight font-display">
              Set New Password
            </h1>
            <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans">
              Choose a strong password you haven&apos;t used before.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Input
                label="New Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0B0A14] dark:hover:text-white transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              {/* Strength bar */}
              {password && (
                <div className="space-y-2">
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "flex-1 rounded-full transition-all duration-300",
                          strength.score >= level ? strength.color : "bg-black/10 dark:bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-bold font-mono uppercase",
                        strength.score <= 1 ? "text-red-500" : strength.score === 2 ? "text-orange-400" : strength.score === 3 ? "text-yellow-500" : "text-emerald-500"
                      )}
                    >
                      {strength.label}
                    </span>
                  </div>
                  {/* Rule checklist */}
                  <ul className="space-y-0.5">
                    {strength.rules.slice(0, 4).map((rule) => (
                      <li key={rule.label} className="flex items-center gap-1.5 text-[10px]">
                        {rule.met ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-black/20 dark:border-white/20 shrink-0" />
                        )}
                        <span className={rule.met ? "text-emerald-600 dark:text-emerald-400" : "text-[#8E8EA4]"}>
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Input
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
            />

            {/* Match indicator */}
            {confirmPassword && (
              <p
                className={cn(
                  "text-[11px] flex items-center gap-1.5 font-medium",
                  password === confirmPassword ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                )}
              >
                {password === confirmPassword ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" />
                )}
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || strength.score < 2 || password !== confirmPassword}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:from-accent hover:to-primary text-white font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(var(--theme-primary-rgb),0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating…
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Reset Password
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-center shadow-sm">
          <CreativeLoader size="sm" label="Loading…" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
