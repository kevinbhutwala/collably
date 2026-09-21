import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center select-none bg-[#FAFAF8] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8]">
      <div className="max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
          <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
          <span>404 • PAGE NOT FOUND</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#0A0A0E] dark:text-white tracking-tight">
            Lost in Creative Space
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#6A6A78] dark:text-[#8E8EA4] max-w-sm mx-auto">
            The workspace or resource you requested does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Workspace</span>
          </Link>

          <Link
            href="/creators"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F8F8FC] dark:bg-[#181824] hover:bg-[#EAEAEF] dark:hover:bg-[#202030] text-[#0A0A0E] dark:text-white text-xs font-bold border border-black/8 dark:border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Discovery</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
