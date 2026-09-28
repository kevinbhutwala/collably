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
    if (typeof window !== "undefined") {
      localStorage.setItem("abeycollab_currency", "INR");
      document.cookie = "abeycollab_currency=INR; path=/; max-age=31536000; SameSite=Lax";
      if (useUIStore.getState().selectedCurrency !== "INR") {
        useUIStore.getState().setSelectedCurrency("INR");
      }
    }
  }, []);

  const format = (
    amount: number | string | null | undefined,
    fromCurrency: string = "INR",
    options?: { compact?: boolean; maximumFractionDigits?: number; minimumFractionDigits?: number; showApprox?: boolean }
  ) => {
    const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
    const source = (fromCurrency || "INR").toUpperCase();
    const converted = convertCurrency(num, source, "INR");
    return formatCurrency(converted, "INR", options);
  };

  const convert = (amount: number, fromCurrency: string = "INR") => {
    return convertCurrency(amount, fromCurrency, "INR");
  };

  const activeConfig = SUPPORTED_CURRENCIES.INR;

  return {
    currency: "INR" as SupportedCurrency,
    symbol: "₹",
    setCurrency: () => {},
    format,
    convert,
    convertAndFormat: (amount: number | string | null | undefined, fromCurrency: string = "INR", options?: any) =>
      convertAndFormat(amount, fromCurrency, "INR", options),
    rates,
    rateTimestamp,
    config: activeConfig,
  };
}
