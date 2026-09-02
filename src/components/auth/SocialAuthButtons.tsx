"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabaseClient";
import { useUIStore } from "@/stores/ui.store";
import { Loader2 } from "lucide-react";
import { AuthResponse } from "@/services/auth.service";
import { SocialFallbackModal } from "@/components/auth/SocialFallbackModal";

interface SocialAuthButtonsProps {
  mode?: "login" | "register";
  role?: "creator" | "brand";
  redirectUrl?: string;
  onSuccess?: (res: AuthResponse) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function SocialAuthButtons({
  mode = "login",
  role = "creator",
  redirectUrl,
  onSuccess,
  onError,
  className = "",
}: SocialAuthButtonsProps) {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [fallbackModalProvider, setFallbackModalProvider] = useState<"google" | "apple" | "github" | null>(null);

  const handleSocialAuth = async (provider: "google" | "apple" | "github") => {
    setLoadingProvider(provider);

    try {
      const supabase = getBrowserSupabase();
      const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
      const destination = redirectUrl || (role === "brand" ? "/app/brand/campaigns" : "/app/dashboard");
      const callbackUrl = `${origin}/api/auth/callback?role=${role}&redirect=${encodeURIComponent(destination)}`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        // If provider not enabled in Supabase dashboard, activate the graceful prompt modal
        console.warn(`Supabase ${provider} provider returned:`, error.message);
        setFallbackModalProvider(provider);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.warn("OAuth redirect catch:", err);
      setFallbackModalProvider(provider);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <>
      <div className={`space-y-2.5 ${className}`}>
        {/* Google Button */}
        <button
          type="button"
          onClick={() => handleSocialAuth("google")}
          disabled={loadingProvider !== null}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#F8F8FC] border border-black/10 hover:border-black/20 text-[#0A0A0E] text-xs font-bold font-sans transition-all flex items-center justify-center gap-3 shadow-2xs active:scale-[0.98] disabled:opacity-50"
        >
          {loadingProvider === "google" ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{mode === "register" ? "Sign up with Google" : "Continue with Google"}</span>
        </button>

        {/* Apple Button */}
        <button
          type="button"
          onClick={() => handleSocialAuth("apple")}
          disabled={loadingProvider !== null}
          className="w-full py-3 px-4 rounded-2xl bg-[#0A0A0E] hover:bg-[#1C1C24] text-white text-xs font-bold font-sans transition-all flex items-center justify-center gap-3 shadow-2xs active:scale-[0.98] disabled:opacity-50"
        >
          {loadingProvider === "apple" ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.62-2.66 1.37-.56.65-1.06 1.71-.93 2.74 1.04.08 2.06-.52 2.67-1.24z" />
            </svg>
          )}
          <span>{mode === "register" ? "Sign up with Apple" : "Continue with Apple"}</span>
        </button>
      </div>

      {/* Graceful OAuth Fallback Modal */}
      {fallbackModalProvider && (
        <SocialFallbackModal
          isOpen={true}
          onClose={() => setFallbackModalProvider(null)}
          provider={fallbackModalProvider}
          role={role}
          mode={mode}
          redirectUrl={redirectUrl}
        />
      )}
    </>
  );
}
