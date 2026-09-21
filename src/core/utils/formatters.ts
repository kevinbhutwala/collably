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
  currency: string = "USD",
  options?: { compact?: boolean; maximumFractionDigits?: number; minimumFractionDigits?: number }
): string {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
  const targetCurrency = (currency || "USD") as SupportedCurrency;
  return formatGlobalCurrency(num, targetCurrency, options);
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
