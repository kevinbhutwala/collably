"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { checkCreatorProfileStatus } from "@/core/utils/profileCompleteness";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Instagram,
  ShieldCheck,
} from "lucide-react";

export function ProfileCompletionBanner({ creator: customCreator }: { creator?: any } = {}) {
  const { role, currentCreator } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (role !== "creator" || isDismissed) return null;

  const creator = customCreator || currentCreator;
  const status = checkCreatorProfileStatus(creator);

  // If 100% complete and all socials verified, do not show banner
  if (status.canApplyToCampaigns) return null;

  const isBlockedByUnverified = status.unverifiedSocials.length > 0;
  const nextIncompleteCheck = status.checks.find((c) => !c.done);

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14141E] border border-primary/35 dark:border-white/10 p-4 sm:p-5 shadow-[0_4px_20px_rgba(var(--theme-primary-rgb),0.08)] relative overflow-hidden text-[#0B0A14] dark:text-white transition-all">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        {/* Top Header Row: Badge, Progress & Dismiss */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary dark:text-accent dark:text-accent flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
              Creator Setup ({status.completedCount}/{status.totalRequirements} Complete)
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300 bg-primary/20 px-2 py-0.5 rounded-full">
              {status.score}%
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0B0A14] dark:hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span>{isExpanded ? "Hide checklist" : "View all steps"}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-full text-[#8A8A98] hover:text-[#0B0A14] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="Dismiss for this session"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-black/[0.06] dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${Math.max(status.score, 10)}%` }}
          />
        </div>

        {/* Actionable Next Step Card (Compact) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#FBFBFD] dark:bg-[#181826] border border-black/[0.06] dark:border-white/10">
          <div className="min-w-0 space-y-0.5">
            <p className="text-xs font-bold text-[#0B0A14] dark:text-white truncate">
              {isBlockedByUnverified
                ? `Verify your Instagram channel (${status.unverifiedSocials[0]?.handle || "@connected"})`
                : `Next: ${nextIncompleteCheck?.label || "Complete your profile"}`}
            </p>
            <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] truncate">
              {isBlockedByUnverified
                ? "Complete verification to unlock 1-click pitches to open brand briefs."
                : nextIncompleteCheck?.hint || "Fill in your details to get verified by top brands."}
            </p>
          </div>

          <Link href={nextIncompleteCheck?.href || "/app/profile"} className="shrink-0">
            <button
              type="button"
              className="w-full sm:w-auto px-4 py-1.5 rounded-full bg-primary hover:bg-accent text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{isBlockedByUnverified ? "Verify Channel" : "Complete Step"}</span>
              <ArrowRight className="w-3 h-3 text-[#0B0A14]" />
            </button>
          </Link>
        </div>

        {/* Collapsible Checklist (Only shown when user taps "View all steps") */}
        {isExpanded && (
          <div className="pt-2 border-t border-black/[0.06] dark:border-white/10 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-[10px] font-mono text-[#7A7A8A] uppercase font-bold">
              Checklist Requirements ({status.totalRequirements - status.completedCount} left):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {status.checks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href || "/app/profile"}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all border ${
                    item.done
                      ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                      : "bg-white dark:bg-[#1A1A28] border-black/8 dark:border-white/10 text-[#5A5A68] dark:text-[#A0A0B4] hover:border-primary/60 hover:text-[#0B0A14] dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {item.done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className="truncate font-medium">{item.label}</span>
                  </div>
                  {!item.done && (
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold shrink-0">
                      Pending →
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
