"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AbeyCollabSymbol } from "@/components/ui/AbeyCollabLogo";
import { Sparkles, Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function CinematicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, checkSession, logout } = useAuthStore();

  useEffect(() => {
    checkSession();
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkSession]);

  const navLinks = [
    { href: "/for-brands", label: "For Brands" },
    { href: "/creators", label: "For Creators" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/case-studies", label: "Resources" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 select-none ${
        scrolled
          ? "bg-[#07070B]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-white">
        {/* Exact AbeyCollab Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] border border-white/40 flex items-center justify-center text-[#0A0A0E] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,210,31,0.45)]">
            <AbeyCollabSymbol size={20} />
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white">
            AbeyCollab
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs sm:text-[13px] font-sans transition-colors tracking-tight",
                  isActive
                    ? "text-[#FFD21F] font-bold"
                    : "text-white/70 hover:text-white font-normal"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Links */}
        <div className="hidden sm:flex items-center gap-4 font-sans">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/app/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-[#FFD21F]/30 text-xs font-mono text-white transition-all shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-[#FFD21F]" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs sm:text-[13px] font-medium text-white/80 hover:text-white transition-colors px-2 py-1"
              >
                Log in
              </Link>

              <Link href="/creator/register">
                <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs sm:text-[13px] font-bold transition-all shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/40 active:scale-95">
                  <span>Get Started</span>
                </button>
              </Link>
            </>
          )}

          {/* Theme Mode Toggle */}
          <ThemeToggle className="text-white border-white/10 hover:bg-white/10" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white rounded-lg bg-white/5 border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#07070B] p-5 flex flex-col gap-3 shadow-2xl text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2 font-sans">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-white/10 border border-white/15 text-white font-semibold text-center text-xs"
            >
              Log in
            </Link>
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-[#2A5CFF] text-white font-semibold text-center text-xs shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
