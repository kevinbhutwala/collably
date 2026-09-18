import { create } from "zustand";
import { SupportedCurrency, updateRuntimeExchangeRates } from "@/core/utils/currency";

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface UIState {
  activeModal: string | null;
  modalProps: Record<string, any>;
  toasts: ToastNotification[];
  selectedCurrency: SupportedCurrency;
  rates: Record<string, number>;
  rateTimestamp: string;
  openModal: (modalId: string, props?: Record<string, any>) => void;
  closeModal: () => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  setSelectedCurrency: (currency: SupportedCurrency) => void;
  fetchLiveRates: (force?: boolean) => Promise<void>;
}

const DEFAULT_RATES: Record<string, number> = {
  USD: 1.0,
  INR: 83.5,
  GBP: 0.78,
  AED: 3.67,
  EUR: 0.92,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 154.0,
  SGD: 1.35,
  BRL: 5.25,
};

export const useUIStore = create<UIState>((set, get) => ({
  activeModal: null,
  modalProps: {},
  toasts: [],
  selectedCurrency: "USD",
  rates: DEFAULT_RATES,
  rateTimestamp: new Date().toISOString(),

  fetchLiveRates: async (force: boolean = false) => {
    // Avoid re-fetching if recently fetched within last 5 minutes (unless force is true)
    const lastTimestamp = get().rateTimestamp;
    if (!force && lastTimestamp && Date.now() - new Date(lastTimestamp).getTime() < 300000) {
      return;
    }
    try {
      const res = await fetch("/api/fx-rates?base=USD");
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          updateRuntimeExchangeRates(data.rates);
          set({ rates: data.rates, rateTimestamp: data.timestamp });
        }
      }
    } catch {}
  },

  openModal: (modalId, props = {}) => set({ activeModal: modalId, modalProps: props }),
  closeModal: () => set({ activeModal: null, modalProps: {} }),

  addToast: (toast) => {
    const id = `toast-${Date.now()}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  setSelectedCurrency: (currency: SupportedCurrency) => {
    const current = get().selectedCurrency;
    if (current === currency) return;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("abeycollab_currency", currency);
        document.cookie = `abeycollab_currency=${currency}; path=/; max-age=31536000; SameSite=Lax`;
        window.dispatchEvent(new CustomEvent("currencyChange", { detail: currency }));
      } catch {}

      // Persist to user profile in background if logged in
      fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferredCurrency: currency }),
      }).catch(() => {});
    }
    set({ selectedCurrency: currency });
  },
}));
