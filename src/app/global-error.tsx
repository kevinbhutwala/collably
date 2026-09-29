"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAF8] dark:bg-[#07070B] text-[#0B0A14] dark:text-[#F4F4F8] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto text-primary dark:text-accent dark:text-accent">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display text-[#0B0A14] dark:text-white">Critical Exception</h2>
            <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
              {error?.message || "An unhandled global error occurred."}
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer hover:bg-accent"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Platform</span>
          </button>
        </div>
      </body>
    </html>
  );
}
