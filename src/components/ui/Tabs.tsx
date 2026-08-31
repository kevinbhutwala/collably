"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "pills" | "underline" | "segments";
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "pills",
  className,
}: TabsProps) {
  if (variant === "segments") {
    return (
      <div
        className={cn(
          "inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 select-none",
                isActive ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-800"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="segment-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/60"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
                {typeof tab.count === "number" && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                      isActive ? "bg-slate-100 text-slate-900" : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5 overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-150 flex items-center gap-2 select-none whitespace-nowrap",
              isActive
                ? "bg-slate-900 text-white font-semibold shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            )}
          >
            {tab.icon}
            {tab.label}
            {typeof tab.count === "number" && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
