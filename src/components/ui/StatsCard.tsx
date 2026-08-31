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
    <Card className={cn("p-6 relative group bg-white border border-slate-200/90 shadow-card", className)} hoverEffect>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        {icon && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 group-hover:text-slate-900 group-hover:border-slate-300 transition-colors">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md font-mono",
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
        <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">{subtitle}</p>
      )}
    </Card>
  );
}
