"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { checkCreatorProfileStatus } from "@/core/utils/profileCompleteness";
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  ArrowRight,
  Lock,
  ShieldAlert,
} from "lucide-react";

export function ProfileCompletionBanner({ creator: customCreator }: { creator?: any } = {}) {
  const { role, currentCreator } = useAuthStore();

  if (role !== "creator") return null;

  const creator = customCreator || currentCreator;
  const status = checkCreatorProfileStatus(creator);

  // If 100% complete and all socials verified, do not show banner
  if (status.canApplyToCampaigns) return null;

  const isBlockedByUnverified = status.unverifiedSocials.length > 0;

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/15 dark:via-amber-500/5 dark:to-transparent border border-amber-500/30 dark:border-amber-500/25 p-4 sm:p-6 shadow-sm relative overflow-hidden text-[#0A0A0E] dark:text-white transition-all">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5 relative z-10">
        {/* Left Side: Header & Progress */}
        <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                {isBlockedByUnverified
                  ? "Unverified Channels"
                  : "Profile Incomplete"}
              </span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
              {status.score}% Complete ({status.completedCount}/{status.totalRequirements} Steps)
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20">
              <Lock className="w-3 h-3 shrink-0" />
              <span>Pitches Locked</span>
            </span>
          </div>

          <div>
            <h2 className="text-sm sm:text-lg font-black text-[#0A0A0E] dark:text-white tracking-tight font-display flex items-center gap-1.5">
              <span>
                {isBlockedByUnverified
                  ? "Verify your connected channels to confirm your profile"
                  : "Fill in your profile details first to apply for campaigns"}
              </span>
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            </h2>
            <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] mt-1 font-sans leading-relaxed">
              {isBlockedByUnverified
                ? `You have connected social channels (${status.unverifiedSocials.map((s) => `${s.platform.toUpperCase()} @${s.handle}`).join(", ")}) that are unverified. Complete verification to unlock applications.`
                : "You cannot apply for any campaign until your profile is complete. Brands require your bio, primary category, starting commercial rate, and verified social channels before approving applications."}
            </p>
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-1.5 sm:gap-2 pt-1">
            {status.checks.map((item) => (
              <Link
                key={item.id}
                href={item.href || "/app/profile"}
                title={item.hint}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-sans font-medium transition-all border ${
                  item.done
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                    : "bg-white/80 dark:bg-[#161622] border-black/10 dark:border-white/10 text-[#6A6A78] dark:text-[#A0A0B4] hover:border-[#FFD21F]/60 hover:text-[#0A0A0E] dark:hover:text-white shadow-2xs"
                }`}
              >
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                )}
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Direct Action Button */}
        <div className="shrink-0 flex items-center w-full lg:w-auto pt-2 lg:pt-0">
          <Link href="/app/profile" className="w-full lg:w-auto">
            <button
              type="button"
              className="w-full lg:w-auto px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.35)] border border-black/10 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Complete Profile Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
