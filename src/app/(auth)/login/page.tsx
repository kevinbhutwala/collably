"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Sparkles, AlertCircle, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/app/dashboard";
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await login(email, password);
      addToast({
        type: "success",
        title: "Signed in successfully",
        message: "Welcome to your workspace!",
      });
      router.push(redirect);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-[#0E0C15]/90 border border-white/15 p-8 space-y-6 shadow-2xl backdrop-blur-2xl relative z-10 text-white select-none">
      {/* Top Header with Back to Home button */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <span className="text-[10px] font-mono text-white/80 font-bold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2A5CFF] animate-pulse" />
          Portal Login
        </span>
      </div>

      <div className="text-center space-y-1.5">
        <Link href="/" className="inline-flex items-center gap-2 group mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(42,92,255,0.4)]">
            <Sparkles className="w-4 h-4 fill-blue-400 text-blue-400" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white">
            Collably
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-display">
          Welcome back
        </h2>
        <p className="text-xs text-white/50 font-sans">
          Access your brand briefs, milestone escrows, and 4K QA studio.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="name@agency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-4 h-4" />}
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(42,92,255,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Sign In to Workspace</span>
          )}
        </button>
      </form>

      <div className="space-y-2 pt-2 border-t border-white/10 text-center text-xs text-white/50 font-sans">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/creator/register" className="text-white hover:text-blue-400 font-bold">
            Sign up as Creator
          </Link>
          {" · "}
          <Link href="/brand/register" className="text-white hover:text-blue-400 font-bold">
            Sign up as Brand
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#07070B] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <Suspense fallback={<div className="text-white/40 font-mono text-xs">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
