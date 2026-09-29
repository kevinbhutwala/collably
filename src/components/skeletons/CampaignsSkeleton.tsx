"use client";

import React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export function CampaignsSkeleton() {
  return (
    <div className="space-y-6 select-none font-sans animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8 dark:border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-36 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-full" />
          </div>
          <Skeleton className="h-7 sm:h-8 w-56 rounded-xl" />
          <Skeleton className="h-3.5 w-80 rounded-md" />
        </div>
      </div>

      {/* Filter Chips & Search Bar Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full shrink-0" />
          ))}
        </div>
        <Skeleton className="h-10 w-full md:w-72 rounded-2xl shrink-0" />
      </div>

      {/* Campaign Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <div
            key={card}
            className="rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 overflow-hidden shadow-xs space-y-4 p-4 sm:p-5"
          >
            {/* Cover Banner Wireframe */}
            <Skeleton className="h-44 sm:h-52 w-full rounded-2xl" />

            {/* Brand Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                <div className="space-y-1">
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                  <Skeleton className="h-2.5 w-16 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Campaign Title & Description */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-4/5 rounded-md" />
              <SkeletonText lines={2} lastLineWidth="70%" />
            </div>

            {/* Budget & Deliverables Strip */}
            <div className="pt-3 border-t border-black/6 dark:border-white/6 flex items-center justify-between gap-2">
              <div className="space-y-1">
                <Skeleton className="h-2.5 w-12 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
