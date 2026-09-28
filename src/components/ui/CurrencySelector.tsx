"use client";

import React from "react";
import { Check } from "lucide-react";
import { SupportedCurrency } from "@/core/utils/currency";

interface CurrencySelectorProps {
  variant?: "compact" | "cards" | "select";
  className?: string;
  onCurrencyChange?: (currency: SupportedCurrency) => void;
}

export function CurrencySelector({
  variant = "compact",
  className = "",
}: CurrencySelectorProps) {
  if (variant === "cards") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
        <div
          data-testid="currency-card-INR"
          className="p-4 rounded-2xl border-2 border-[#FFD21F] bg-[#FFFDF5] dark:bg-[#1A1A28] shadow-sm ring-2 ring-[#FFD21F]/20 flex flex-col justify-between gap-3 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl" role="img" aria-label="Indian Rupee">🇮🇳</span>
              <div>
                <span className="font-extrabold text-sm text-[#0A0A0E] dark:text-white block">INR</span>
                <span className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4]">Indian Rupee (Platform Currency)</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-bold flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Active</span>
            </span>
          </div>

          <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="text-[#7A7A8A] dark:text-[#8E8EA4]">Settlement Rails</span>
            <span className="font-mono font-extrabold text-[#0A0A0E] dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md">
              UPI • Netbanking • IMPS (₹)
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default: Compact Navbar Badge
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div
        data-testid="currency-selector-button"
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-bold text-[#0A0A0E] dark:text-[#F4F4F8] border border-black/8 dark:border-white/10 shadow-2xs select-none"
        title="AbeyCollab operates in Indian Rupees (INR / ₹) with direct UPI & IMPS bank settlements"
      >
        <span className="text-sm">🇮🇳</span>
        <span className="font-mono text-[11px] font-extrabold text-[#0A0A0E] dark:text-white">INR</span>
        <span className="font-mono text-[11px] text-[#8A7000] dark:text-[#FFD21F] font-black">(₹)</span>
      </div>
    </div>
  );
}
