"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CollablyLogo } from "@/components/ui/CollablyLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111] flex flex-col justify-between selection:bg-[#B7FF3C] selection:text-[#111111]">
      {/* Top Floating Navigation Header with "Back to Home" */}
      <header className="sticky top-0 z-50 w-full bg-[#FAFAF8]/90 backdrop-blur-2xl border-b border-[#E7E7E4] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#FAFAF8] text-[#6B6B6B] hover:text-[#111111] font-mono text-xs font-semibold transition-all group border border-[#E7E7E4] shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Center: Brand Logo */}
        <div className="flex items-center justify-center">
          <CollablyLogo href="/" size="sm" subtext="Creator × Brand Ecosystem" />
        </div>

        {/* Right: Quick Action Switcher */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {isLoginPage ? (
            <Link
              href="/register"
              className="px-4 py-1.5 rounded-lg bg-[#111111] hover:bg-[#222222] text-[#FAFAF8] font-bold transition-all shadow-xs"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-lg bg-[#111111] hover:bg-[#222222] text-[#FAFAF8] font-bold transition-all shadow-xs"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-xs font-mono text-[#6B6B6B] border-t border-[#E7E7E4] bg-[#FAFAF8]">
        © {new Date().getFullYear()} Collably, Inc. All rights reserved. • Protected by Escrow Infrastructure.
      </footer>
    </div>
  );
}
