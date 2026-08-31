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
    <div className="min-h-screen bg-slate-50/60 flex flex-col justify-between selection:bg-brand-accent/20 selection:text-brand-accent">
      {/* Top Floating Navigation Header with "Back to Home" */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 font-mono text-xs font-bold transition-all group"
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
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors shadow-xs"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors shadow-xs"
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
      <footer className="py-4 text-center text-xs font-mono text-slate-400 border-t border-slate-200/60 bg-white/50">
        © {new Date().getFullYear()} Collably, Inc. All rights reserved. • Protected by Escrow Infrastructure.
      </footer>
    </div>
  );
}
