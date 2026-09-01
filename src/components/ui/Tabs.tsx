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
          "inline-flex p-1 bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl shadow-xs",
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
                "relative px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 select-none",
                isActive ? "text-[#FAFAF8]" : "text-[#6B6B6B] hover:text-[#111111]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="segment-pill"
                  className="absolute inset-0 bg-[#111111] rounded-lg shadow-xs"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 font-display">
                {tab.icon}
                {tab.label}
                {typeof tab.count === "number" && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-md font-bold font-mono",
                      isActive ? "bg-[#FFFFFF] text-[#111111]" : "bg-[#FFFFFF] text-[#6B6B6B] border border-[#E7E7E4]"
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
              "px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-2 select-none whitespace-nowrap font-display",
              isActive
                ? "bg-[#111111] text-[#FAFAF8] shadow-xs"
                : "bg-[#FFFFFF] text-[#6B6B6B] hover:text-[#111111] border border-[#E7E7E4]"
            )}
          >
            {tab.icon}
            {tab.label}
            {typeof tab.count === "number" && (
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-md font-mono font-bold",
                isActive ? "bg-[#FFFFFF] text-[#111111]" : "bg-[#FAFAF8] text-[#6B6B6B]"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
