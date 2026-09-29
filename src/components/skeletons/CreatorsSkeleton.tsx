"use client";

import React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export function CreatorsSkeleton() {
  return (
    <div className="space-y-6 select-none font-sans animate-in fade-in duration-300">
      {/* Top Tabs Wireframe */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Skeleton className="h-9 w-32 rounded-xl shrink-0" />
        <Skeleton className="h-9 w-36 rounded-xl shrink-0" />
        <Skeleton className="h-9 w-36 rounded-xl shrink-0" />
      </div>

      {/* Filter Bar Wireframe */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>

      {/* Quick Sort & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-2xs">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-20 rounded-xl" />
          <Skeleton className="h-7 w-24 rounded-xl" />
          <Skeleton className="h-7 w-24 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>

      {/* Creator Cards Grid Wireframe */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 p-4 sm:p-6 shadow-xs space-y-4"
          >
            {/* Creator Header */}
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0" />
              <div className="space-y-1.5 grow">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="w-3.5 h-3.5 rounded-full" />
                </div>
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>

            {/* Bio */}
            <SkeletonText lines={2} lastLineWidth="80%" />

            {/* Social / Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/6 dark:border-white/6 text-center">
              <div className="space-y-1">
                <Skeleton className="h-2.5 w-10 mx-auto rounded" />
                <Skeleton className="h-4 w-12 mx-auto rounded" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-2.5 w-10 mx-auto rounded" />
                <Skeleton className="h-4 w-12 mx-auto rounded" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-2.5 w-10 mx-auto rounded" />
                <Skeleton className="h-4 w-12 mx-auto rounded" />
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-black/6 dark:border-white/6 flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
