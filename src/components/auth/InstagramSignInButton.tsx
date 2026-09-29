"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface InstagramSignInButtonProps {
  mode?: "login" | "register" | "connect_instagram";
  role?: "creator" | "brand";
  redirect?: string;
  className?: string;
  label?: string;
}

export function InstagramSignInButton({
  mode = "login",
  role = "creator",
  redirect,
  className = "",
  label,
}: InstagramSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    const searchParams = new URLSearchParams({
      mode,
      role,
      ...(redirect ? { redirect } : {}),
    });
    window.location.href = `/api/auth/facebook?${searchParams.toString()}`;
  };

  const defaultLabel =
    mode === "connect_instagram"
      ? "Connect Official Instagram"
      : mode === "register"
      ? "Sign up with Instagram"
      : "Continue with Instagram";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full h-11 px-4 rounded-xl border border-black/10 dark:border-white/12 bg-white dark:bg-[#161622] hover:bg-neutral-50 dark:hover:bg-[#1C1C2A] hover:border-black/20 dark:hover:border-white/25 text-[#0B0A14] dark:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-150 shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#0B0A14] dark:text-white shrink-0" />
      ) : (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="ig-btn-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            fill="url(#ig-btn-grad)"
          />
        </svg>
      )}
      <span className="truncate">{label || defaultLabel}</span>
    </button>
  );
}
