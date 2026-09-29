"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/ui.store";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />,
    info: <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
  };

  const borderMap = {
    success: "border-emerald-500/30 bg-[#0E1015]/95 text-white shadow-[0_12px_32px_rgba(16,185,129,0.14)]",
    error: "border-red-500/30 bg-[#160D12]/95 text-white shadow-[0_12px_32px_rgba(239,68,68,0.14)]",
    info: "border-primary/30 bg-[#0E1015]/95 text-white shadow-[0_12px_32px_rgba(var(--theme-primary-rgb),0.14)]",
    warning: "border-amber-500/30 bg-[#16120D]/95 text-white shadow-[0_12px_32px_rgba(245,158,11,0.14)]",
  };

  return (
    <div
      className="fixed z-50 pointer-events-none flex flex-col gap-2.5 transition-all
        top-4 inset-x-3 mx-auto max-w-[calc(100%-1.5rem)] w-full
        sm:top-5 sm:right-5 sm:bottom-auto sm:left-auto sm:inset-x-auto sm:mx-0 sm:max-w-sm sm:w-full
        lg:top-auto lg:bottom-6 lg:right-6"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className={cn(
              "px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl pointer-events-auto flex items-start gap-2.5 sm:gap-3",
              borderMap[toast.type]
            )}
          >
            {iconMap[toast.type]}
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs font-bold text-white font-display tracking-tight leading-snug">
                {toast.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-white/75 mt-0.5 leading-relaxed font-sans">
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white p-1 -mr-1 -mt-0.5 rounded-full hover:bg-white/10 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
