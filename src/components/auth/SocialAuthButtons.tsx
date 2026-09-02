"use client";

import React from "react";

interface SocialAuthButtonsProps {
  mode?: "login" | "register";
  role?: "creator" | "brand";
  redirectUrl?: string;
  className?: string;
}

/**
 * Social OAuth providers (Google, Apple) are not yet enabled in Supabase.
 * This component is intentionally empty until they are configured.
 * To re-enable: turn on providers in the Supabase dashboard → Auth → Providers,
 * then restore the OAuth flow here.
 */
export function SocialAuthButtons({ className = "" }: SocialAuthButtonsProps) {
  // Providers not configured — render nothing to avoid showing broken buttons
  return null;
}
