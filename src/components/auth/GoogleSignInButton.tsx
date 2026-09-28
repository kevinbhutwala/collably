"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface GoogleSignInButtonProps {
  mode?: "login" | "register" | "connect_youtube";
  role?: "creator" | "brand";
  redirect?: string;
  className?: string;
  label?: string;
}

export function GoogleSignInButton({
  mode = "login",
  role = "creator",
  redirect,
  className = "",
  label,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    const searchParams = new URLSearchParams({
      mode,
      role,
      ...(redirect ? { redirect } : {}),
    });
    window.location.href = `/api/auth/google?${searchParams.toString()}`;
  };

  const defaultLabel =
    mode === "connect_youtube"
      ? "Connect YouTube Channel"
      : mode === "register"
      ? "Sign up with Google"
      : "Continue with Google";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full h-11 px-4 rounded-xl border border-black/10 dark:border-white/12 bg-white dark:bg-[#161622] hover:bg-neutral-50 dark:hover:bg-[#1C1C2A] hover:border-black/20 dark:hover:border-white/25 text-[#0A0A0E] dark:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-150 shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E] dark:text-white shrink-0" />
      ) : mode === "connect_youtube" ? (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
            fill="#FF0000"
          />
          <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
        </svg>
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
      <span className="truncate">{label || defaultLabel}</span>
    </button>
  );
}
