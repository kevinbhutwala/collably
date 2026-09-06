"use client";

import { useUIStore } from "@/stores/ui.store";
import { formatCurrency, convertCurrency, SupportedCurrency, SUPPORTED_CURRENCIES } from "@/core/utils/currency";

export function useGlobalCurrency() {
  const { selectedCurrency, setSelectedCurrency } = useUIStore();

  const format = (amountInUSD: number, options?: { compact?: boolean; maximumFractionDigits?: number }) => {
    const converted = convertCurrency(amountInUSD, "USD", selectedCurrency);
    return formatCurrency(converted, selectedCurrency, options);
  };

  const convert = (amountInUSD: number) => {
    return convertCurrency(amountInUSD, "USD", selectedCurrency);
  };

  return {
    currency: selectedCurrency,
    setCurrency: setSelectedCurrency,
    format,
    convert,
    config: SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.USD,
  };
}
