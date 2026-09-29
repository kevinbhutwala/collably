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
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#09090D] text-white dark:text-[#F4F4F8] flex flex-col justify-between selection:bg-primary selection:text-white relative overflow-x-hidden select-none transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-primary/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Floating Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0E0E14]/90 backdrop-blur-xl border-b border-black/8 dark:border-white/10 px-3.5 sm:px-8 py-3 flex items-center justify-between gap-2">
        {/* Left: Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F4F4F8] dark:bg-[#181824] hover:bg-[#EAEAEF] dark:hover:bg-[#222234] text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0B0A14] dark:hover:text-[#F4F4F8] font-sans text-xs font-bold transition-all group border border-black/6 dark:border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>

        {/* Center: Brand Logo */}
        <AbeyCollabLogo href="/" size="sm" variant="full" />

        {/* Right: Security & Escrow Trust Badge */}
        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="text-[10px] sm:text-[11px] font-mono text-[#0B0A14] dark:text-accent font-bold uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Escrow Protected</span>
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative z-10 w-full">
        {children}
      </main>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-[11px] sm:text-xs font-sans text-[#7A7A8A] dark:text-[#8E8EA4] border-t border-black/8 dark:border-white/10 bg-white/70 dark:bg-[#0E0E14]/70 relative z-10 px-4">
        © {new Date().getFullYear()} AbeyCollab Inc. • Safe payments and direct creator partnerships
      </footer>
    </div>
  );
}
