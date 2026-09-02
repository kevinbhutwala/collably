"use client";

import React, { useState, Suspense } from "react";
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
  ShieldCheck,
  UserCheck,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

function LoginForm() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/app/dashboard";
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        message: "Welcome to your Collably workspace!",
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
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white border border-black/8 p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] select-none">
      {/* Top Header with Back to Home button */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <span className="text-[10px] font-mono text-[#0A0A0E] font-bold uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
          Secure Portal
        </span>
      </div>

      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] tracking-tight font-display">
          Welcome back
        </h1>
        <p className="text-xs text-[#6A6A78] font-sans">
          Access your brand briefs, milestone escrows, and 4K QA studio.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Social Login Options (Google, Apple) */}
      <div className="space-y-2">
        <SocialAuthButtons mode="login" redirectUrl={redirect} />
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-black/8" />
        <span className="flex-shrink mx-3 text-[10px] font-mono text-[#8A8A98] uppercase">or with email</span>
        <div className="flex-grow border-t border-black/8" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="name@agency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-4 h-4 text-[#7A7A8A]" />}
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      {/* 1-Click Demo Personas */}
      <div className="space-y-2 pt-2 border-t border-black/8">
        <span className="text-[10px] font-mono text-[#6A6A78] uppercase font-bold block text-center tracking-wider">
          ⚡ 1-Click Instant Demo Access
        </span>
        <div className="grid grid-cols-3 gap-2 text-xs font-sans">
          <button
            type="button"
            onClick={() => handleDemoLogin("elena@example.com")}
            className="p-2.5 rounded-2xl bg-[#F8F8FC] hover:bg-[#FFFDF5] border border-black/8 hover:border-[#FFD21F] text-[#0A0A0E] transition-all flex flex-col items-center gap-1 shadow-2xs active:scale-95 group"
          >
            <div className="w-6 h-6 rounded-full bg-[#FFD21F]/20 flex items-center justify-center text-[#0A0A0E] group-hover:scale-110 transition-transform">
              <UserCheck className="w-3 h-3" />
            </div>
            <span className="font-bold text-[10px]">Creator</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("alex@hypeagency.com")}
            className="p-2.5 rounded-2xl bg-[#F8F8FC] hover:bg-[#FFFDF5] border border-black/8 hover:border-[#FFD21F] text-[#0A0A0E] transition-all flex flex-col items-center gap-1 shadow-2xs active:scale-95 group"
          >
            <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-[#0A0A0E] group-hover:scale-110 transition-transform">
              <Building2 className="w-3 h-3" />
            </div>
            <span className="font-bold text-[10px]">Brand</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("admin@collably.com")}
            className="p-2.5 rounded-2xl bg-[#F8F8FC] hover:bg-[#FFFDF5] border border-black/8 hover:border-[#FFD21F] text-[#0A0A0E] transition-all flex flex-col items-center gap-1 shadow-2xs active:scale-95 group"
          >
            <div className="w-6 h-6 rounded-full bg-[#087F5B]/10 text-[#087F5B] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-3 h-3" />
            </div>
            <span className="font-bold text-[10px]">Admin</span>
          </button>
        </div>
      </div>

      <div className="text-center pt-2">
        <p className="text-xs text-[#6A6A78]">
          New to Collably?{" "}
          <Link href="/register" className="text-[#0A0A0E] hover:underline font-bold">
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
        <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-black/8 text-center text-[#0A0A0E] shadow-sm">
          <CreativeLoader size="sm" label="Loading Sign In..." />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

