"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Sparkles, AlertCircle, Lock, Mail, Loader2, ArrowLeft, ShieldCheck, UserCheck, Building2 } from "lucide-react";
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

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setIsLoading(true);
    setErrorMessage("");

    try {
      await login(demoEmail, "password123");
      addToast({
        type: "success",
        title: "Signed in with Demo Persona",
        message: `Welcome to Collably as ${demoEmail}!`,
      });
      router.push(redirect);
    } catch (err: any) {
      setErrorMessage(err.message || "Demo login failed");
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
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(42,92,255,0.4)]">
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

      {/* Demo Credentials Quick Switcher */}
      <div className="space-y-2 pt-1 pb-1">
        <span className="text-[10px] font-mono text-white/40 uppercase font-bold block text-center">
          ⚡ 1-Click Demo Personas
        </span>
        <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => handleDemoLogin("elena@example.com")}
            className="p-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#B7FF3C]" />
            <span className="font-bold">Creator</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("alex@hypeagency.com")}
            className="p-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold">Brand</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("admin@collably.com")}
            className="p-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">Admin</span>
          </button>
        </div>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-white/10" />
        <span className="flex-shrink mx-3 text-[10px] font-mono text-white/30 uppercase">or with email</span>
        <div className="flex-grow border-t border-white/10" />
      </div>

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
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(42,92,255,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
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
    <Suspense fallback={<div className="text-white/40 font-mono text-xs">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
