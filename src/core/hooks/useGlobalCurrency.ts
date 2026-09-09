"use client";

import { useUIStore } from "@/stores/ui.store";
import { formatCurrency, convertCurrency, SupportedCurrency, SUPPORTED_CURRENCIES } from "@/core/utils/currency";

export function useGlobalCurrency() {
  const { selectedCurrency, setSelectedCurrency } = useUIStore();

  const format = (
    amount: number | string | null | undefined,
    fromCurrency: string = "USD",
    options?: { compact?: boolean; maximumFractionDigits?: number; minimumFractionDigits?: number }
  ) => {
    const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
    const source = (fromCurrency || "USD").toUpperCase();
    const converted = convertCurrency(num, source, selectedCurrency);
    return formatCurrency(converted, selectedCurrency, options);
  };

  const convert = (amount: number, fromCurrency: string = "USD") => {
    return convertCurrency(amount, fromCurrency, selectedCurrency);
  };

  return {
    currency: selectedCurrency,
    setCurrency: setSelectedCurrency,
    format,
    convert,
    config: SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.USD,
  };
}
