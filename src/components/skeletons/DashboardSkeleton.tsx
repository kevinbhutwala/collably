"use client";

import React from "react";
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton } from "@/components/ui/Skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 select-none font-sans animate-in fade-in duration-300">
      {/* ── Welcome Banner Skeleton ── */}
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 p-4 sm:p-6 lg:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2.5 max-w-xl">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-7 sm:h-9 w-64 sm:w-80 rounded-xl" />
          <Skeleton className="h-4 w-72 sm:w-96 rounded-lg" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="h-10 w-28 sm:w-32 rounded-full" />
          <Skeleton className="h-10 w-32 sm:w-36 rounded-full" />
        </div>
      </div>

      {/* ── 4 Stats Grid Skeleton ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-20 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-xl" />
            </div>
            <Skeleton className="h-7 w-28 rounded-lg" />
            <div className="pt-2 border-t border-black/6 dark:border-white/6 flex items-center justify-between">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-3 w-12 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Bento Grid Skeleton (2 Columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          {/* Active Deliverables / Collaborations Card */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/6 dark:border-white/6">
              <div className="space-y-1">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-3.5 w-56 rounded-md" />
              </div>
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            {/* List Items */}
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/6 dark:border-white/6 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-36 sm:w-48 rounded-md" />
                      <Skeleton className="h-3 w-24 sm:w-32 rounded-md" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20 rounded-full hidden sm:block" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Marketplace Wireframe */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-44 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[1, 2].map((card) => (
                <div
                  key={card}
                  className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/6 dark:border-white/6 space-y-2.5"
                >
                  <Skeleton className="h-28 w-full rounded-lg" />
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-48 rounded-md" />
                  <div className="pt-2 flex items-center justify-between">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-5 sm:space-y-6">
          {/* Market Pulse / Profile Progress Skeleton */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-xl" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-36 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-8 w-full rounded-xl" />
            </div>
          </div>

          {/* Quick Shortcuts Skeleton */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-3">
            <Skeleton className="h-4 w-32 rounded-md" />
            <div className="space-y-2">
              {[1, 2, 3].map((btn) => (
                <Skeleton key={btn} className="h-11 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
