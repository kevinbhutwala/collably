import { create } from "zustand";
import { SupportedCurrency } from "@/core/utils/currency";

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
  openModal: (modalId: string, props?: Record<string, any>) => void;
  closeModal: () => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  setSelectedCurrency: (currency: SupportedCurrency) => void;
}

const getInitialCurrency = (): SupportedCurrency => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("abeycollab_currency") as SupportedCurrency;
    if (saved) return saved;
  }
  return "USD";
};

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  modalProps: {},
  toasts: [],
  selectedCurrency: getInitialCurrency(),

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
      localStorage.setItem("abeycollab_currency", currency);
    }
    set({ selectedCurrency: currency });
  },
}));
