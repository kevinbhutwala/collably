"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/ui.store";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-[#101010] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#FF3B30] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#101010] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
  };

  const borderMap = {
    success: "border-[#E7E7E4] bg-[#FFFFFF] text-[#101010]",
    error: "border-[#FEE2E2] bg-[#FEF2F2] text-[#991B1B]",
    info: "border-[#E7E7E4] bg-[#FFFFFF] text-[#101010]",
    warning: "border-[#FEF3C7] bg-[#FFFBEB] text-[#92400E]",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={cn(
              "p-4 rounded-xl border shadow-lg backdrop-blur-xl pointer-events-auto flex items-start gap-3",
              borderMap[toast.type]
            )}
          >
            {iconMap[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#101010] font-display">{toast.title}</h4>
              <p className="text-xs text-[#626262] mt-0.5 leading-relaxed font-sans">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#626262] hover:text-[#101010] p-1 -mr-1 -mt-1 rounded-full hover:bg-[#FAFAF8] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
