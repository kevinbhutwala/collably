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
  fetchLiveRates: () => Promise<void>;
}

const getInitialCurrency = (): SupportedCurrency => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("abeycollab_currency") as SupportedCurrency;
    if (saved && ["INR", "USD", "GBP", "AED"].includes(saved)) return saved;

    // Detect if user is in India
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") {
        return "INR";
      }
      const lang = navigator.language || "";
      if (lang.toLowerCase().includes("in") || lang.toLowerCase().startsWith("hi")) {
        return "INR";
      }
    } catch {
      // Fallback
    }
  }
  return "USD";
};

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  modalProps: {},
  toasts: [],
  selectedCurrency: getInitialCurrency(),
  rates: {},
  rateTimestamp: "",

  fetchLiveRates: async () => {
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
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("abeycollab_currency", currency);
        document.cookie = `abeycollab_currency=${currency}; path=/; max-age=31536000; SameSite=Lax`;
        window.dispatchEvent(new CustomEvent("currencyChange", { detail: currency }));
        window.dispatchEvent(new Event("storage"));
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
