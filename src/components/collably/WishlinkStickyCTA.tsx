"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { useAuthStore } from "@/stores/auth.store";

export function WishlinkStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls past 300px
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 px-4 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
        <div className="pointer-events-auto max-w-xl mx-auto rounded-full bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2 sm:p-2.5 flex items-center justify-between gap-3 select-none">
          {/* Left: Avatar Stack & Text */}
          <div className="flex items-center gap-2.5 pl-1.5 min-w-0">
            <div className="flex -space-x-2 shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white relative">
                <SafeImage src="/creators/prarthana.jpg" alt="Creator" fill className="object-cover" />
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white relative">
                <SafeImage src="/creators/vasudha-rai.jpg" alt="Creator" fill className="object-cover" />
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white relative">
                <SafeImage src="/creators/kunal-rajput.jpg" alt="Creator" fill className="object-cover" />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-extrabold text-[#0A0A0E] font-display truncate">
                Join AbeyCollab Today
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono text-[#6A6A78] truncate">
                100% Escrow Protected • 24h Payouts
              </p>
            </div>
          </div>

          {/* Right Action */}
          {isAuthenticated ? (
            <Link
              href={user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#FFE052] text-[#0A0A0E] text-xs sm:text-sm font-extrabold shadow-sm flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/register"
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs sm:text-sm font-extrabold shadow-[0_2px_12px_rgba(255,210,31,0.4)] flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 border border-black/8"
            >
              <span>Sign up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
