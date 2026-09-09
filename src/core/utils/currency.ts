/**
 * Centralized Multi-Currency & Financial System for AbeyCollab
 * 
 * Initial supported active currencies:
 * - INR: Indian Rupee (₹), default for users in India
 * - USD: US Dollar ($), default for international users
 * 
 * Extensible architecture: GBP (£) and AED (AED) are registered and configurable.
 */

export type SupportedCurrency =
  | "INR"
  | "USD"
  | "GBP"
  | "AED"
  | "EUR"
  | "CAD"
  | "AUD"
  | "JPY"
  | "SGD"
  | "BRL";

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  flag: string;
  exchangeRateToUSD: number; // 1 USD = X Currency (for optional estimation/conversion)
  locale: string;
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳", exchangeRateToUSD: 83.5, locale: "en-IN" },
  USD: { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", exchangeRateToUSD: 1.0, locale: "en-US" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", exchangeRateToUSD: 0.78, locale: "en-GB" },
  AED: { code: "AED", symbol: "AED", name: "UAE Dirham", flag: "🇦🇪", exchangeRateToUSD: 3.67, locale: "en-AE" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", exchangeRateToUSD: 0.92, locale: "de-DE" },
  CAD: { code: "CAD", symbol: "CA$", name: "Canadian Dollar", flag: "🇨🇦", exchangeRateToUSD: 1.36, locale: "en-CA" },
  AUD: { code: "AUD", symbol: "AU$", name: "Australian Dollar", flag: "🇦🇺", exchangeRateToUSD: 1.52, locale: "en-AU" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵", exchangeRateToUSD: 154.0, locale: "ja-JP" },
  SGD: { code: "SGD", symbol: "SG$", name: "Singapore Dollar", flag: "🇸🇬", exchangeRateToUSD: 1.35, locale: "en-SG" },
  BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real", flag: "🇧🇷", exchangeRateToUSD: 5.25, locale: "pt-BR" },
};

/**
 * Initial active transaction currencies: INR and USD
 */
export const ACTIVE_CURRENCIES = ["INR", "USD"] as const;
export type ActiveCurrency = (typeof ACTIVE_CURRENCIES)[number];

export const ACTIVE_CURRENCY_LIST: CurrencyConfig[] = ACTIVE_CURRENCIES.map(
  (code) => SUPPORTED_CURRENCIES[code]
);

/**
 * Supported global focus currencies: USD, INR, GBP, AED
 */
export const PRIMARY_CURRENCIES = ["USD", "INR", "GBP", "AED"] as const;
export type PrimaryCurrency = (typeof PRIMARY_CURRENCIES)[number];
export const PRIMARY_CURRENCY_LIST: CurrencyConfig[] = PRIMARY_CURRENCIES.map(
  (code) => SUPPORTED_CURRENCIES[code]
);

export const EXTENSIBLE_CURRENCIES = PRIMARY_CURRENCIES;
export type ExtensibleCurrency = PrimaryCurrency;
export const EXTENSIBLE_CURRENCY_LIST = PRIMARY_CURRENCY_LIST;

export const SUPPORTED_CURRENCY_LIST: CurrencyConfig[] = Object.values(SUPPORTED_CURRENCIES);

export function isValidCurrency(currency: any): currency is ActiveCurrency {
  return typeof currency === "string" && (currency.toUpperCase() === "INR" || currency.toUpperCase() === "USD");
}

export function isExtensibleCurrency(currency: any): currency is ExtensibleCurrency {
  return typeof currency === "string" && ["INR", "USD", "GBP", "AED"].includes(currency.toUpperCase());
}

/**
 * Detect default currency based on user country:
 * India -> INR
 * All other international users -> USD
 */
export function getDefaultCurrencyForCountry(country?: string): ActiveCurrency {
  if (!country) return "USD";
  const normalized = country.trim().toUpperCase();
  if (
    normalized === "IN" ||
    normalized === "IND" ||
    normalized === "INDIA" ||
    normalized.includes("INDIA") ||
    normalized === "+91"
  ) {
    return "INR";
  }
  return "USD";
}

export function getCurrencySymbol(currency: SupportedCurrency | string = "USD"): string {
  const curr = (currency || "USD").toUpperCase();
  if (curr === "INR") return "₹";
  if (curr === "USD") return "$";
  if (curr === "GBP") return "£";
  if (curr === "AED") return "AED";
  if (curr === "EUR") return "€";
  return SUPPORTED_CURRENCIES[curr as SupportedCurrency]?.symbol || "$";
}

export function getCurrencyFlag(currency: SupportedCurrency | string = "USD"): string {
  const curr = (currency || "USD").toUpperCase();
  return SUPPORTED_CURRENCIES[curr as SupportedCurrency]?.flag || "🌐";
}

export function getCurrencyName(currency: SupportedCurrency | string = "USD"): string {
  const curr = (currency || "USD").toUpperCase();
  return SUPPORTED_CURRENCIES[curr as SupportedCurrency]?.name || curr;
}

/**
 * Convert an amount from one currency to another using dynamic exchange rates
 */
export function convertCurrency(
  amount: number,
  from: SupportedCurrency | string = "USD",
  to: SupportedCurrency | string = "USD"
): number {
  const fromCurr = (from || "USD").toUpperCase() as SupportedCurrency;
  const toCurr = (to || "USD").toUpperCase() as SupportedCurrency;
  if (fromCurr === toCurr || !amount) return amount;
  const fromRate = SUPPORTED_CURRENCIES[fromCurr]?.exchangeRateToUSD ?? 1.0;
  const toRate = SUPPORTED_CURRENCIES[toCurr]?.exchangeRateToUSD ?? 1.0;
  // Convert from -> USD -> to
  const inUSD = amount / fromRate;
  const converted = inUSD * toRate;
  return toCurr === "JPY" ? Math.round(converted) : Math.round(converted * 100) / 100;
}

export interface FeeBreakdown {
  grossAmount: number;
  platformFeeRate: number; // e.g. 0.10 (10%)
  platformFeeAmount: number;
  creatorNetAmount: number;
  currency: string;
}

/**
 * Format a number as currency with proper symbols and locale
 * e.g.
 * formatCurrency(10000, "INR") => "₹10,000"
 * formatCurrency(500, "USD") => "$500"
 * formatCurrency(500.5, "USD") => "$500.50"
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  currency: SupportedCurrency | string = "USD",
  options?: {
    compact?: boolean;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
  }
): string {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
  const currKey = (currency || "USD").toUpperCase();
  const config =
    SUPPORTED_CURRENCIES[currKey as SupportedCurrency] ||
    (currKey === "INR" ? SUPPORTED_CURRENCIES.INR : SUPPORTED_CURRENCIES.USD);

  const hasFractions = num % 1 !== 0;
  const digits =
    options?.maximumFractionDigits !== undefined
      ? options.maximumFractionDigits
      : hasFractions
      ? 2
      : 0;

  if (options?.compact && Math.abs(num) >= 1000) {
    if (Math.abs(num) >= 1_000_000) {
      return (
        new Intl.NumberFormat(config.locale, {
          style: "currency",
          currency: config.code,
          maximumFractionDigits: 1,
        }).format(num / 1_000_000) + "M"
      );
    }
    return (
      new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: config.code,
        maximumFractionDigits: 1,
      }).format(num / 1_000) + "K"
    );
  }

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    maximumFractionDigits: digits,
    minimumFractionDigits:
      options?.minimumFractionDigits !== undefined
        ? options.minimumFractionDigits
        : 0,
  }).format(num);
}

/**
 * Calculate transparent 10% platform fee and 90% creator net earnings
 */
export function calculateMilestoneFeeBreakdown(
  grossBudget: number,
  feeRate: number = 0.1,
  currency: string = "USD"
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
 * Currency Subunits (Paise / Cents) Arithmetic & Rounding
 * - INR: 1 Rupee = 100 paise
 * - USD: 1 Dollar = 100 cents
 */
export function toSubunits(amount: number, _currency: string = "USD"): number {
  return Math.round(Number(amount) * 100);
}

export function fromSubunits(subunits: number, _currency: string = "USD"): number {
  return Number((Number(subunits) / 100).toFixed(2));
}

export function dollarsToCents(dollars: number): number {
  return toSubunits(dollars);
}

export function centsToDollars(cents: number): number {
  return fromSubunits(cents);
}

export function calculateFeeCents(
  grossCents: number,
  feeRatePercent: number
): { grossCents: number; feeCents: number; netCents: number } {
  const feeCents = Math.round((grossCents * feeRatePercent) / 100);
  const netCents = grossCents - feeCents;
  return { grossCents, feeCents, netCents };
}
