"use client";

import React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export function AuthSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-7 space-y-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="text-center space-y-2 flex flex-col items-center">
        <Skeleton className="h-5 w-36 rounded-full" />
        <Skeleton className="h-8 w-44 rounded-xl" />
        <Skeleton className="h-3.5 w-64 rounded-md" />
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/8 dark:border-white/10">
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
      </div>

      {/* Social Button */}
      <Skeleton className="h-11 w-full rounded-2xl" />

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="h-px bg-black/10 dark:bg-white/10 grow" />
        <Skeleton className="h-3 w-20 rounded" />
        <div className="h-px bg-black/10 dark:bg-white/10 grow" />
      </div>

      {/* Form Fields Wireframe */}
      <div className="space-y-3.5">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-11 w-full rounded-2xl" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-11 w-full rounded-2xl" />
        </div>

        {/* Submit Button */}
        <Skeleton className="h-12 w-full rounded-full" />
      </div>

      {/* Footer Switcher */}
      <div className="pt-2 border-t border-black/8 dark:border-white/10 flex justify-center">
        <Skeleton className="h-3.5 w-48 rounded" />
      </div>
    </div>
  );
}
