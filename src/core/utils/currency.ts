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
 * Supported active currencies: INR (Indian Rupee) only
 */
export const ACTIVE_CURRENCIES = ["INR"] as const;
export type ActiveCurrency = (typeof ACTIVE_CURRENCIES)[number];

export const ACTIVE_CURRENCY_LIST: CurrencyConfig[] = ACTIVE_CURRENCIES.map(
  (code) => SUPPORTED_CURRENCIES[code]
);

/**
 * Primary platform currency: INR only
 */
export const PRIMARY_CURRENCIES = ["INR"] as const;
export type PrimaryCurrency = (typeof PRIMARY_CURRENCIES)[number];
export const PRIMARY_CURRENCY_LIST: CurrencyConfig[] = PRIMARY_CURRENCIES.map(
  (code) => SUPPORTED_CURRENCIES[code]
);

export const EXTENSIBLE_CURRENCIES = PRIMARY_CURRENCIES;
export type ExtensibleCurrency = PrimaryCurrency;
export const EXTENSIBLE_CURRENCY_LIST = PRIMARY_CURRENCY_LIST;

export const SUPPORTED_CURRENCY_LIST: CurrencyConfig[] = [SUPPORTED_CURRENCIES.INR];

// Global in-memory dynamic exchange rates cache for client-side evaluation
let runtimeExchangeRates: Record<string, number> = {
  INR: 1.0,
  USD: 1 / 83.5,
};

export function updateRuntimeExchangeRates(rates: Record<string, number>) {
  if (rates && typeof rates === "object") {
    runtimeExchangeRates = { ...runtimeExchangeRates, ...rates };
  }
}

export function getRuntimeExchangeRates(): Record<string, number> {
  return { ...runtimeExchangeRates };
}

export function getExchangeRateToUSD(currency: SupportedCurrency | string = "INR"): number {
  const code = (currency || "INR").toUpperCase();
  return (
    runtimeExchangeRates[code] ??
    (SUPPORTED_CURRENCIES[code as SupportedCurrency]?.exchangeRateToUSD ?? 83.5)
  );
}

export function isValidCurrency(currency: any): currency is ActiveCurrency {
  return typeof currency === "string" && currency.toUpperCase() === "INR";
}

export function isExtensibleCurrency(currency: any): currency is ExtensibleCurrency {
  return typeof currency === "string" && currency.toUpperCase() === "INR";
}

/**
 * Platform currency is Indian Rupee (INR - ₹)
 */
export function getDefaultCurrencyForCountry(country?: string): SupportedCurrency {
  return "INR";
}

export function getCurrencySymbol(currency: SupportedCurrency | string = "INR"): string {
  const curr = (currency || "INR").toUpperCase();
  if (curr === "INR") return "₹";
  if (curr === "USD") return "$";
  if (curr === "GBP") return "£";
  if (curr === "AED") return "AED";
  if (curr === "EUR") return "€";
  return "₹";
}

export function getCurrencyFlag(currency: SupportedCurrency | string = "INR"): string {
  return "🇮🇳";
}

export function getCurrencyName(currency: SupportedCurrency | string = "INR"): string {
  return "Indian Rupee (INR)";
}

/**
 * Convert an amount from one currency to another using dynamic exchange rates
 */
export function convertCurrency(
  amount: number,
  from: SupportedCurrency | string = "INR",
  to: SupportedCurrency | string = "INR"
): number {
  const fromCurr = (from || "INR").toUpperCase();
  const toCurr = (to || "INR").toUpperCase();
  if (fromCurr === toCurr || !amount) return amount;

  // Convert USD amounts to INR if legacy USD data is encountered
  if (fromCurr === "USD" && toCurr === "INR") {
    return Math.round(amount * 83.5);
  }
  if (fromCurr === "INR" && toCurr === "USD") {
    return Math.round((amount / 83.5) * 100) / 100;
  }

  const fromRate = runtimeExchangeRates[fromCurr] ?? (SUPPORTED_CURRENCIES[fromCurr as SupportedCurrency]?.exchangeRateToUSD ?? 1.0);
  const toRate = runtimeExchangeRates[toCurr] ?? (SUPPORTED_CURRENCIES[toCurr as SupportedCurrency]?.exchangeRateToUSD ?? 1.0);

  const inUSD = amount / fromRate;
  const converted = inUSD * toRate;
  return toCurr === "JPY" ? Math.round(converted) : Math.round(converted * 100) / 100;
}

/**
 * Convert and format as INR
 */
export function convertAndFormat(
  amount: number | string | null | undefined,
  fromCurrency: string = "INR",
  displayCurrency: string = "INR",
  options?: {
    compact?: boolean;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    showApprox?: boolean;
  }
): string {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
  const from = (fromCurrency || "INR").toUpperCase();
  const target = (displayCurrency || "INR").toUpperCase();

  if (from === target) {
    return formatCurrency(num, target, options);
  }

  const converted = convertCurrency(num, from, target);
  return formatCurrency(converted, target, options);
}

export interface FeeBreakdown {
  grossAmount: number;
  platformFeeRate: number; // e.g. 0.10 (10%)
  platformFeeAmount: number;
  creatorNetAmount: number;
  currency: string;
}

/**
 * Format a number as Indian Rupees (INR) with ₹ symbol and en-IN locale
 * e.g.
 * formatCurrency(10000) => "₹10,000"
 * formatCurrency(150000) => "₹1,50,000"
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  currency: SupportedCurrency | string = "INR",
  options?: {
    compact?: boolean;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
  }
): string {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0)) || 0;
  const config = SUPPORTED_CURRENCIES.INR;

  const hasFractions = num % 1 !== 0;
  const digits =
    options?.maximumFractionDigits !== undefined
      ? options.maximumFractionDigits
      : hasFractions
      ? 2
      : 0;

  if (options?.compact && Math.abs(num) >= 1000) {
    if (Math.abs(num) >= 10_000_000) {
      return `₹${(num / 10_000_000).toFixed(1)}Cr`;
    }
    if (Math.abs(num) >= 100_000) {
      return `₹${(num / 100_000).toFixed(1)}L`;
    }
    return `₹${(num / 1_000).toFixed(1)}K`;
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
  currency: string = "INR"
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
 */
export function toSubunits(amount: number, _currency: string = "INR"): number {
  return Math.round(Number(amount) * 100);
}

export function fromSubunits(subunits: number, _currency: string = "INR"): number {
  return Number((Number(subunits) / 100).toFixed(2));
}

export function rupeesToPaise(rupees: number): number {
  return toSubunits(rupees, "INR");
}

export function dollarsToCents(dollars: number): number {
  return toSubunits(dollars, "INR");
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
