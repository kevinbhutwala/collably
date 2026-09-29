"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center select-none bg-[#FAFAF8] text-[#0B0A14]">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-black/8 shadow-xl space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto text-primary dark:text-accent">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#5A5A68] uppercase tracking-wider">
            Runtime Exception
          </span>
          <h2 className="text-2xl font-bold font-display text-[#0B0A14]">
            Something went off-track
          </h2>
          <p className="text-xs font-sans text-[#6A6A78] leading-relaxed">
            {error?.message || "An unexpected error occurred while loading this view."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white text-xs font-bold shadow-xs border border-black/10 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F8F8FC] hover:bg-[#EAEAEF] text-[#0B0A14] text-xs font-bold border border-black/8 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
