/**
 * Centralized Currency & Financial Formatters for AbeyCollab
 */

export type SupportedCurrency =
  | "USD"
  | "EUR"
  | "GBP"
  | "INR"
  | "CAD"
  | "AUD"
  | "JPY"
  | "SGD"
  | "AED"
  | "BRL";

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  flag: string;
  exchangeRateToUSD: number; // 1 USD = X Currency
  locale: string;
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", exchangeRateToUSD: 1.0, locale: "en-US" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", exchangeRateToUSD: 0.92, locale: "de-DE" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", exchangeRateToUSD: 0.78, locale: "en-GB" },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳", exchangeRateToUSD: 83.5, locale: "en-IN" },
  CAD: { code: "CAD", symbol: "CA$", name: "Canadian Dollar", flag: "🇨🇦", exchangeRateToUSD: 1.36, locale: "en-CA" },
  AUD: { code: "AUD", symbol: "AU$", name: "Australian Dollar", flag: "🇦🇺", exchangeRateToUSD: 1.52, locale: "en-AU" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵", exchangeRateToUSD: 154.0, locale: "ja-JP" },
  SGD: { code: "SGD", symbol: "SG$", name: "Singapore Dollar", flag: "🇸🇬", exchangeRateToUSD: 1.35, locale: "en-SG" },
  AED: { code: "AED", symbol: "AED", name: "UAE Dirham", flag: "🇦🇪", exchangeRateToUSD: 3.67, locale: "ar-AE" },
  BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real", flag: "🇧🇷", exchangeRateToUSD: 5.25, locale: "pt-BR" },
};

export const SUPPORTED_CURRENCY_LIST: CurrencyConfig[] = Object.values(SUPPORTED_CURRENCIES);

/**
 * Convert an amount from one currency to another using dynamic exchange rates
 */
export function convertCurrency(
  amount: number,
  from: SupportedCurrency = "USD",
  to: SupportedCurrency = "USD"
): number {
  if (from === to || !amount) return amount;
  const fromRate = SUPPORTED_CURRENCIES[from]?.exchangeRateToUSD ?? 1.0;
  const toRate = SUPPORTED_CURRENCIES[to]?.exchangeRateToUSD ?? 1.0;
  // Convert from -> USD -> to
  const inUSD = amount / fromRate;
  const converted = inUSD * toRate;
  return to === "JPY" ? Math.round(converted) : Math.round(converted * 100) / 100;
}

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
  const config = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;
  const digits = options?.maximumFractionDigits !== undefined ? options.maximumFractionDigits : (currency === "JPY" ? 0 : 0);

  if (options?.compact && amount >= 1000) {
    if (amount >= 1_000_000) {
      return (
        new Intl.NumberFormat(config.locale, {
          style: "currency",
          currency: currency,
          maximumFractionDigits: 1,
        }).format(amount / 1_000_000) + "M"
      );
    }
    return (
      new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 1,
      }).format(amount / 1_000) + "K"
    );
  }

  return new Intl.NumberFormat(config.locale, {
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

