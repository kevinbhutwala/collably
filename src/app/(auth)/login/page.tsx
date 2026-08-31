"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { ValenceLogo } from "@/components/ui/ValenceLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle, Lock, Mail, Loader2 } from "lucide-react";

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
    <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-8 space-y-6 shadow-elevated relative z-10">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <ValenceLogo href="/" size="sm" subtext="Creator × Brand Ecosystem" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-xs text-slate-500">Sign in to your account</p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
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
          leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
        />

        <Button variant="accent" size="lg" type="submit" isLoading={isLoading} className="w-full">
          Sign In
        </Button>
      </form>

      <div className="pt-4 border-t border-slate-100 text-center space-y-2">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-accent font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-slate-50/50 relative">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-12 text-center shadow-elevated">
            <Loader2 className="w-8 h-8 text-brand-accent animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading workspace...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
