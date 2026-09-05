/**
 * Centralized Currency & Financial Formatters for AbeyCollab
 */

export type SupportedCurrency = "USD" | "INR" | "EUR" | "GBP";

export interface FeeBreakdown {
  grossAmount: number;
  platformFeeRate: number; // e.g. 0.10 (10%)
  platformFeeAmount: number;
  creatorNetAmount: number;
  currency: SupportedCurrency;
}

/**
 * Format a number as currency with proper symbols and locale
 */
export function formatCurrency(
  amount: number,
  currency: SupportedCurrency = "USD",
  options?: {
    compact?: boolean;
    maximumFractionDigits?: number;
  }
): string {
  const digits = options?.maximumFractionDigits !== undefined ? options.maximumFractionDigits : 0;

  if (options?.compact && amount >= 1000) {
    if (amount >= 1_000_000) {
      return (
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
          maximumFractionDigits: 1,
        }).format(amount / 1_000_000) + "M"
      );
    }
    return (
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 1,
      }).format(amount / 1_000) + "K"
    );
  }

  const locale = currency === "INR" ? "en-IN" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: digits,
  }).format(amount);
}

/**
 * Calculate transparent 10% platform fee and 90% creator net earnings
 */
export function calculateMilestoneFeeBreakdown(
  grossBudget: number,
  feeRate: number = 0.1,
  currency: SupportedCurrency = "USD"
): FeeBreakdown {
  const platformFeeAmount = Math.round(grossBudget * feeRate);
  const creatorNetAmount = grossBudget - platformFeeAmount;

  return {
    grossAmount: grossBudget,
    platformFeeRate: feeRate,
    platformFeeAmount,
    creatorNetAmount,
    currency,
  };
}

/**
 * Format follower and view counts (e.g. 485K, 1.2M)
 */
export function formatCompactCount(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toLocaleString();
}

/**
 * Exact Integer-Cents Arithmetic & Rounding (Phase 6 Core: Prevent off-by-one errors)
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(Number(dollars) * 100);
}

export function centsToDollars(cents: number): number {
  return Number((Number(cents) / 100).toFixed(2));
}

export function calculateFeeCents(
  grossCents: number,
  feeRatePercent: number
): { grossCents: number; feeCents: number; netCents: number } {
  const feeCents = Math.round((grossCents * feeRatePercent) / 100);
  const netCents = grossCents - feeCents;
  return { grossCents, feeCents, netCents };
}

