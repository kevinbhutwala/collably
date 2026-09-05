"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { CreativeLoader } from "@/components/ui/CreativeLoader";


function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = (searchParams.get("role") as "creator" | "brand") || "creator";
  const { socialLogin } = useAuthStore();
  const { addToast } = useUIStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processAuth() {
      try {
        const supabase = getBrowserSupabase();
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session?.user) {
          const sbUser = session.user;
          const provider = (sbUser.app_metadata?.provider || "google") as "google" | "apple" | "github";
          const email = sbUser.email;
          const fullName =
            sbUser.user_metadata?.full_name ||
            sbUser.user_metadata?.name ||
            sbUser.user_metadata?.user_name ||
            (email ? email.split("@")[0] : "AbeyCollab User");
          const avatarUrl =
            sbUser.user_metadata?.avatar_url ||
            sbUser.user_metadata?.picture ||
            undefined;

          if (!email) {
            throw new Error("No email address returned from social provider.");
          }

          const res = await socialLogin({
            provider: ["google", "apple", "github"].includes(provider) ? provider : "google",
            email,
            name: fullName,
            avatarUrl,
            role: roleParam,
          });

          addToast({
            type: "success",
            title: "Signed In Successfully",
            message: `Welcome to AbeyCollab, ${res.user?.name || "Partner"}!`,
          });

          const destination =
            res.user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard";
          router.push(destination);
        } else {
          // If no session found in browser, fallback to login
          router.push("/login");
        }
      } catch (err: any) {
        console.error("Client callback error:", err);
        setError(err.message || "Failed to process social authentication.");
      }
    }

    processAuth();
  }, [router, roleParam, socialLogin, addToast]);

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white border border-red-200 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#0A0A0E]">Authentication Failed</h2>
        <p className="text-xs text-[#6A6A78] leading-relaxed">{error}</p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 rounded-full bg-[#0A0A0E] text-white text-xs font-bold hover:bg-[#2A2A34] transition-all"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white border border-black/8 text-center shadow-xl">
      <CreativeLoader
        size="md"
        label="Social Authentication"
        subtext="Verifying credentials and preparing your workspace..."
      />
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white border border-black/8 text-center">
          <CreativeLoader size="sm" label="Connecting..." />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}

