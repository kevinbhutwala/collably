"use client";

import React from "react";
import { SubscriptionPlanId, UserRole } from "@/core/types";
import { Sparkles, Crown, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionBadgeProps {
  planId?: SubscriptionPlanId;
  role?: UserRole;
  isAdmin?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SubscriptionBadge({
  planId = "creator_starter",
  role = "creator",
  isAdmin = false,
  className,
  size = "md",
}: SubscriptionBadgeProps) {
  if (isAdmin || role === "agency_admin" || role === "super_admin" || role === "agency_owner") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-mono font-bold uppercase tracking-wider bg-black text-[#FFD21F] border border-[#FFD21F]/40 shadow-[0_0_12px_rgba(255,210,31,0.25)]",
          size === "sm" ? "text-[9px] px-2 py-0.5" : size === "lg" ? "text-xs px-3.5 py-1.5" : "text-[10px] px-2.5 py-1",
          className
        )}
      >
        <Crown className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />
        <span>Admin Override</span>
      </span>
    );
  }

  const badgeConfigs: Record<
    SubscriptionPlanId,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode; glow?: string }
  > = {
    creator_starter: {
      label: "Starter",
      bg: "bg-[#F4F4F8]",
      text: "text-[#5A5A68]",
      border: "border-black/10",
      icon: null,
    },
    creator_pro: {
      label: "PRO CREATOR",
      bg: "bg-gradient-to-r from-[#FFD21F] to-[#FFE052]",
      text: "text-[#0A0A0E]",
      border: "border-black/15",
      icon: <Sparkles className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />,
      glow: "shadow-[0_2px_10px_rgba(255,210,31,0.35)]",
    },
    creator_enterprise: {
      label: "STUDIO COLLECTIVE",
      bg: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]",
      text: "text-white",
      border: "border-white/20",
      icon: <Crown className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />,
      glow: "shadow-[0_2px_10px_rgba(139,92,246,0.35)]",
    },
    brand_starter: {
      label: "Brand Starter",
      bg: "bg-[#F4F4F8]",
      text: "text-[#5A5A68]",
      border: "border-black/10",
      icon: null,
    },
    brand_growth: {
      label: "BRAND GROWTH",
      bg: "bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]",
      text: "text-white",
      border: "border-white/20",
      icon: <Zap className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />,
      glow: "shadow-[0_2px_10px_rgba(14,165,233,0.35)]",
    },
    brand_enterprise: {
      label: "GLOBAL ENTERPRISE",
      bg: "bg-gradient-to-r from-[#059669] to-[#10B981]",
      text: "text-white",
      border: "border-white/20",
      icon: <ShieldCheck className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />,
      glow: "shadow-[0_2px_10px_rgba(5,150,105,0.35)]",
    },
  };

  const config = badgeConfigs[planId] || badgeConfigs.creator_starter;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-mono font-bold uppercase tracking-wider transition-all select-none border",
        config.bg,
        config.text,
        config.border,
        config.glow,
        size === "sm" ? "text-[9px] px-2 py-0.5" : size === "lg" ? "text-xs px-3.5 py-1.5" : "text-[10px] px-2.5 py-1",
        className
      )}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}
