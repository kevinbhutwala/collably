import React from "react";
import { Card } from "./Card";
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
        "p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-orange-200/90 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden",
        className
      )}
    >
      {/* Subtle Corner Glow Accent */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-radial from-orange-100/40 via-transparent to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between relative z-10">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
          {title}
        </p>
        {icon && (
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-slate-50 to-orange-50/60 border border-slate-200/80 group-hover:border-orange-300/80 shadow-xs transition-all duration-200 group-hover:scale-105">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-mono">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-lg font-mono shadow-xs",
              trend === "up" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
              trend === "down" && "bg-rose-50 text-rose-700 border border-rose-200",
              trend === "neutral" && "bg-slate-100 text-slate-600 border border-slate-200"
            )}
          >
            {trend === "up" && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {trend === "down" && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed font-sans relative z-10">
          {subtitle}
        </p>
      )}
    </div>
  );
}
