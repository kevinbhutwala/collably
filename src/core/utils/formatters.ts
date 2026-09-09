export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

export const formatCompactNumber = formatNumber;

import { formatCurrency as formatGlobalCurrency, convertCurrency, convertAndFormat, SupportedCurrency } from "./currency";

export { formatGlobalCurrency, convertAndFormat };

export function formatCurrency(
  amount: number | string | null | undefined,
  currency?: string,
  options?: { compact?: boolean; maximumFractionDigits?: number; minimumFractionDigits?: number }
): string {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
  let targetCurrency = currency;
  if (!targetCurrency && typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("abeycollab_currency");
      if (stored) {
        targetCurrency = stored;
      }
    } catch {
      // ignore
    }
  }

  // If currency was omitted (base USD numeric value) and target currency is set and not USD, convert it
  if (!currency && targetCurrency && targetCurrency !== "USD") {
    const converted = convertCurrency(num, "USD", targetCurrency as SupportedCurrency);
    return formatGlobalCurrency(converted, targetCurrency as SupportedCurrency, options);
  }

  return formatGlobalCurrency(num, (targetCurrency || "USD") as SupportedCurrency, options);
}

export function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
