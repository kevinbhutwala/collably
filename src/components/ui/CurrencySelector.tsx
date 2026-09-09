"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";
import {
  PRIMARY_CURRENCY_LIST,
  SUPPORTED_CURRENCIES,
  SupportedCurrency,
} from "@/core/utils/currency";

interface CurrencySelectorProps {
  variant?: "compact" | "cards" | "select";
  className?: string;
  onCurrencyChange?: (currency: SupportedCurrency) => void;
}

export function CurrencySelector({
  variant = "compact",
  className = "",
  onCurrencyChange,
}: CurrencySelectorProps) {
  const { selectedCurrency, setSelectedCurrency } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeConfig =
    SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.USD;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedCurrency) => {
    setSelectedCurrency(code);
    if (onCurrencyChange) {
      onCurrencyChange(code);
    }
    setIsOpen(false);
  };

  if (variant === "cards") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ${className}`}>
        {PRIMARY_CURRENCY_LIST.map((curr) => {
          const isSelected = selectedCurrency === curr.code;
          return (
            <button
              key={curr.code}
              type="button"
              onClick={() => handleSelect(curr.code)}
              data-testid={`currency-card-${curr.code}`}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? "border-[#FFD21F] bg-[#FFFDF5] dark:bg-[#1A1A28] shadow-sm ring-2 ring-[#FFD21F]/20"
                  : "border-black/8 dark:border-white/10 bg-white dark:bg-[#12121A] hover:border-black/20 dark:hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label={curr.name}>
                    {curr.flag}
                  </span>
                  <div>
                    <span className="font-extrabold text-sm text-[#0A0A0E] dark:text-white block">
                      {curr.code}
                    </span>
                    <span className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4]">
                      {curr.name}
                    </span>
                  </div>
                </div>
                {isSelected ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-black/15 dark:border-white/15" />
                )}
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#7A7A8A] dark:text-[#8E8EA4]">Symbol</span>
                <span className="font-mono font-extrabold text-[#0A0A0E] dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md">
                  {curr.symbol}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "select") {
    return (
      <div className={`relative inline-block ${className}`}>
        <select
          value={selectedCurrency}
          onChange={(e) => handleSelect(e.target.value as SupportedCurrency)}
          className="appearance-none w-full bg-white dark:bg-[#161622] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 pr-8 text-xs font-bold text-[#0A0A0E] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#FFD21F]"
          data-testid="currency-select-dropdown"
        >
          {PRIMARY_CURRENCY_LIST.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.flag} {curr.code} ({curr.symbol})
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-[#7A7A8A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    );
  }

  // Default: Compact Navbar Button + Popover
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="currency-selector-button"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-bold text-[#0A0A0E] dark:text-[#F4F4F8] border border-black/8 dark:border-white/10 transition-colors shadow-2xs cursor-pointer select-none"
        aria-label="Select Currency (USD, INR, GBP, AED)"
        title="Select Worldwide Currency (USD, INR, GBP, AED)"
      >
        <Globe className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F] shrink-0" />
        <span className="font-mono text-[11px] font-extrabold flex items-center gap-1">
          <span>{activeConfig.flag}</span>
          <span>{activeConfig.code}</span>
          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4]">({activeConfig.symbol})</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-[#7A7A8A] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          data-testid="currency-selector-popover"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-2.5 py-1.5 border-b border-black/8 dark:border-white/10 mb-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A8A] dark:text-[#8E8EA4]">
              Supported Currencies
            </p>
          </div>

          <div className="space-y-0.5">
            {PRIMARY_CURRENCY_LIST.map((curr) => {
              const isSelected = selectedCurrency === curr.code;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => handleSelect(curr.code)}
                  data-testid={`currency-option-${curr.code}`}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-white font-bold border border-[#FFD21F]/40"
                      : "hover:bg-black/5 dark:hover:bg-white/5 text-[#5A5A68] dark:text-[#B8B8CC] font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{curr.flag}</span>
                    <div>
                      <span className="font-bold text-[#0A0A0E] dark:text-white mr-1">
                        {curr.code}
                      </span>
                      <span className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4]">
                        {curr.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#0A0A0E] dark:text-white">
                      {curr.symbol}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
