"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AbeyCollabLogo } from "@/components/ui/AbeyCollabLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0A0A0E] flex flex-col justify-between selection:bg-[#FFD21F] selection:text-[#0A0A0E] relative overflow-x-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-[#FFD21F]/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Floating Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-black/8 px-3.5 sm:px-8 py-3 flex items-center justify-between gap-2">
        {/* Left: Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F4F4F8] hover:bg-[#EAEAEF] text-[#5A5A68] hover:text-[#0A0A0E] font-sans text-xs font-bold transition-all group border border-black/6"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>

        {/* Center: Brand Logo */}
        <AbeyCollabLogo href="/" size="sm" variant="full" />

        {/* Right: Quick Action Switcher */}
        <div className="flex items-center gap-1.5 text-xs font-sans">
          {isLoginPage ? (
            <Link
              href="/register"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold transition-all shadow-[0_2px_10px_rgba(255,210,31,0.35)] border border-black/10 active:scale-95"
            >
              <span>Sign Up</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F4F4F8] hover:bg-[#EAEAEF] text-[#0A0A0E] font-bold transition-all border border-black/8 active:scale-95"
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative z-10 w-full">
        {children}
      </main>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-[11px] sm:text-xs font-sans text-[#7A7A8A] border-t border-black/8 bg-white/70 relative z-10 px-4">
        © {new Date().getFullYear()} AbeyCollab Inc. • Protected by Escrow Payment Infrastructure
      </footer>
    </div>
  );
}
