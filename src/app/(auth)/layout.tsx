"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="min-h-screen bg-[#08080C] text-white flex flex-col justify-between selection:bg-[#FFD21F] selection:text-[#0A0A0E] relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FFD21F]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Floating Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-[#08080C]/85 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs font-semibold transition-all group border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Center: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] border border-white/40 flex items-center justify-center text-[#0A0A0E] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,210,31,0.45)]">
            <Sparkles className="w-4 h-4 fill-[#0A0A0E] text-[#0A0A0E]" />
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight text-white">
            Collably
          </span>
        </Link>

        {/* Right: Quick Action Switcher */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {isLoginPage ? (
            <Link
              href="/register"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-extrabold transition-all shadow-[0_0_15px_rgba(255,210,31,0.4)] border border-white/40"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/15"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        {children}
      </main>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-xs font-mono text-white/40 border-t border-white/10 bg-[#08080C]/90 relative z-10">
        © {new Date().getFullYear()} Collably, Inc. All rights reserved. • Protected by Escrow Infrastructure.
      </footer>
    </div>
  );
}
