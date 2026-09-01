import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  trend = "up",
  subtitle,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] shadow-xs hover:shadow-editorial transition-all duration-200 relative group overflow-hidden text-[#111111]",
        className
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] font-mono">
          {title}
        </p>
        {icon && (
          <div className="p-2 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] shadow-xs">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-2 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-mono">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-md font-mono shadow-xs",
              trend === "up" && "bg-[#B7FF3C] text-[#111111] border border-[#9EE61C]",
              trend === "down" && "bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]",
              trend === "neutral" && "bg-[#FAFAF8] text-[#6B6B6B] border border-[#E7E7E4]"
            )}
          >
            {trend === "up" && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {trend === "down" && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-[#6B6B6B] font-medium font-sans relative z-10">
          {subtitle}
        </p>
      )}
    </div>
  );
}
