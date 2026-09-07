"use client";

import React from "react";
import { getCategoryVisual, getIconForTitle, getDeliverableIcon } from "@/core/utils/titleMedia";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CategoryBadgeProps {
  category?: string;
  showIcon?: boolean;
  showEmoji?: boolean;
  size?: "xs" | "sm" | "md";
  className?: string;
}

export function CategoryBadge({
  category = "Technology & AI",
  showIcon = true,
  showEmoji = false,
  size = "sm",
  className,
}: CategoryBadgeProps) {
  const meta = getCategoryVisual(category);
  const Icon = meta.icon;

  const sizeClasses = {
    xs: "px-2 py-0.5 text-[9px] gap-1",
    sm: "px-2.5 py-1 text-[10px] gap-1.5",
    md: "px-3.5 py-1.5 text-xs gap-2",
  };

  const iconSizes = {
    xs: "w-2.5 h-2.5",
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-mono font-bold tracking-wider uppercase border backdrop-blur-md transition-all shadow-xs",
        meta.badgeBg,
        meta.badgeBorder,
        meta.badgeText,
        sizeClasses[size],
        className
      )}
    >
      {showEmoji && <span className="text-[1.1em]">{meta.emoji}</span>}
      {showIcon && !showEmoji && <Icon className={cn("shrink-0", iconSizes[size])} />}
      <span className="truncate">{category}</span>
    </span>
  );
}

interface TitleIconProps {
  title: string;
  category?: string;
  className?: string;
  size?: number;
}

export function TitleIcon({ title, category, className = "w-4 h-4", size }: TitleIconProps) {
  const Icon: LucideIcon = getIconForTitle(title, category);
  return <Icon className={className} size={size} />;
}

interface DeliverableBadgeProps {
  type: string;
  className?: string;
}

export function DeliverableBadge({ type, className }: DeliverableBadgeProps) {
  const Icon = getDeliverableIcon(type);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-[#0A0A0E] dark:text-white font-mono text-[11px] font-semibold border border-black/5 dark:border-white/10",
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 text-[#A37F00] dark:text-[#FFD21F] shrink-0" />
      <span className="truncate">{type}</span>
    </span>
  );
}
