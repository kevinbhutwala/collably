import { create } from "zustand";

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
  openModal: (modalId: string, props?: Record<string, any>) => void;
  closeModal: () => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  modalProps: {},
  toasts: [],

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
}));
