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
          "inline-flex p-1.5 bg-[#120c16] border border-white/10 rounded-full shadow-xs",
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
                "relative px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2 select-none",
                isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="segment-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] rounded-full shadow-md shadow-pink-500/25"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 font-display">
                {tab.icon}
                {tab.label}
                {typeof tab.count === "number" && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold font-mono",
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
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
    <div className={cn("flex items-center gap-2 overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-150 flex items-center gap-2 select-none whitespace-nowrap font-display",
              isActive
                ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-semibold shadow-md shadow-pink-500/25"
                : "bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
            )}
          >
            {tab.icon}
            {tab.label}
            {typeof tab.count === "number" && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
