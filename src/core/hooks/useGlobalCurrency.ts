import { useEffect } from "react";
import { useUIStore } from "@/stores/ui.store";
import {
  formatCurrency,
  convertCurrency,
  convertAndFormat,
  SupportedCurrency,
  SUPPORTED_CURRENCIES,
} from "@/core/utils/currency";

export function useGlobalCurrency() {
  const {
    selectedCurrency,
    setSelectedCurrency,
    rates,
    rateTimestamp,
    fetchLiveRates,
  } = useUIStore();

  useEffect(() => {
    if (!rates || Object.keys(rates).length === 0) {
      fetchLiveRates();
    }
  }, [rates, fetchLiveRates]);

  const format = (
    amount: number | string | null | undefined,
    fromCurrency: string = "USD",
    options?: { compact?: boolean; maximumFractionDigits?: number; minimumFractionDigits?: number; showApprox?: boolean }
  ) => {
    const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
    const source = (fromCurrency || "USD").toUpperCase();
    const converted = convertCurrency(num, source, selectedCurrency);
    const formatted = formatCurrency(converted, selectedCurrency, options);
    if (options?.showApprox && source !== selectedCurrency.toUpperCase()) {
      return `≈ ${formatted}`;
    }
    return formatted;
  };

  const convert = (amount: number, fromCurrency: string = "USD") => {
    return convertCurrency(amount, fromCurrency, selectedCurrency);
  };

  const activeConfig = SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.USD;

  return {
    currency: selectedCurrency,
    symbol: activeConfig.symbol,
    setCurrency: setSelectedCurrency,
    format,
    convert,
    convertAndFormat: (amount: number | string | null | undefined, fromCurrency: string = "USD", options?: any) =>
      convertAndFormat(amount, fromCurrency, selectedCurrency, options),
    rates,
    rateTimestamp,
    config: activeConfig,
  };
}
