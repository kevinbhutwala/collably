"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";

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
    <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 space-y-6 shadow-xs relative z-10 text-[#111111]">
      {/* Top Header with Back to Home button */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <span className="text-[10px] font-mono text-[#111111] font-bold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
          Portal Login
        </span>
      </div>

      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <CollablyLogo href="/" size="sm" subtext="Creator × Brand Ecosystem" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#111111] tracking-tight font-display">
          Welcome Back
        </h1>
        <p className="text-xs text-[#6B6B6B] font-sans font-medium">
          Sign in to access your campaigns, creator roster, and escrow payouts.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          leftIcon={<Mail className="w-4 h-4 text-[#6B6B6B]" />}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leftIcon={<Lock className="w-4 h-4 text-[#6B6B6B]" />}
        />

        <Button variant="primary" size="lg" type="submit" isLoading={isLoading} className="w-full font-display rounded-[9px]">
          Sign In to Collably
        </Button>
      </form>

      <div className="pt-4 border-t border-[#E7E7E4] text-center space-y-2">
        <p className="text-xs text-[#6B6B6B] font-sans">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#111111] font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full flex items-center justify-center p-2 py-6">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-12 text-center shadow-xs text-[#111111]">
            <Loader2 className="w-8 h-8 text-[#111111] animate-spin mx-auto mb-2" />
            <p className="text-xs text-[#6B6B6B] font-mono">Loading workspace...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
