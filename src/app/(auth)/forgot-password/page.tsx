"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Mail,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  SendHorizonal,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      // Always show the same success message regardless of whether the email exists.
      await res.json(); // consume body
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          Recovery
        </span>
      </div>

      {sent ? (
        /* ── Sent state ── */
        <div className="text-center space-y-5 py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-[#0B0A14] dark:text-white font-display">
              Check your inbox
            </h2>
            <p className="text-sm text-[#6A6A78] dark:text-[#8E8EA4] font-sans leading-relaxed">
              If an account exists with{" "}
              <span className="font-semibold text-[#0B0A14] dark:text-white">{email}</span>, we&apos;ve
              sent a password reset link. The link expires in{" "}
              <span className="font-semibold">1 hour</span>.
            </p>
            <p className="text-xs text-[#8E8EA4] dark:text-[#6A6A78] font-sans">
              Don&apos;t see it? Check your spam folder.
            </p>
          </div>
          <button
            onClick={() => { setSent(false); setEmail(""); }}
            className="text-xs font-bold text-[#0B0A14] dark:text-accent hover:underline transition-colors"
          >
            Try a different email
          </button>
        </div>
      ) : (
        /* ── Email entry state ── */
        <>
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B0A14] dark:text-white tracking-tight font-display">
              Forgot Password?
            </h1>
            <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans">
              Enter the email linked to your account and we&apos;ll send a secure reset link.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4 text-[#7A7A8A] dark:text-[#8E8EA4]" />}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:from-accent hover:to-primary text-white font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(var(--theme-primary-rgb),0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <SendHorizonal className="w-4 h-4" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-1">
            <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
              Remembered it?{" "}
              <Link href="/login" className="text-[#0B0A14] dark:text-accent hover:underline font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-center shadow-sm">
          <CreativeLoader size="sm" label="Loading…" />
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
