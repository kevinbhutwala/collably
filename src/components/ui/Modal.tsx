"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
  className,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/40 backdrop-blur-xs will-change-[opacity]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative w-full z-10 bg-[#FFFFFF] border border-[#E7E7E4] rounded-2xl shadow-editorial-lg overflow-hidden my-auto text-[#111111] will-change-[transform,opacity]",
              maxWidthMap[maxWidth],
              className
            )}
          >
            {/* Header */}
            {(title || description) && (
              <div className="p-5 sm:p-6 pb-3 sm:pb-4 border-b border-[#E7E7E4] flex items-start justify-between">
                <div>
                  {title && (
                    <h2 className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight font-display">{title}</h2>
                  )}
                  {description && (
                    <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 sm:mt-1 font-sans">{description}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  type="button"
                  aria-label="Close dialog"
                  className="text-[#6B6B6B] hover:text-[#111111] p-1.5 rounded-lg hover:bg-[#FAFAF8] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-5 sm:p-6 max-h-[85vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
