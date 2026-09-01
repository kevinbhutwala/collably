"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Menu, X, ArrowUpRight, User as UserIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, checkSession, logout } = useAuthStore();

  useEffect(() => {
    checkSession();
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkSession]);

  const navLinks = [
    { href: "/creators", label: "Creators" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/pricing", label: "Pricing" },
    { href: "/services", label: "Agency" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0a070a]/90 backdrop-blur-xl py-3.5 shadow-2xl shadow-black/60"
          : "border-b border-white/5 bg-[#0a070a]/70 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <CollablyLogo href="/" size="md" subtext="Creator × Brand Ecosystem" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-full transition-all select-none",
                  isActive
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold shadow-md shadow-pink-500/25"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/app/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors font-semibold"
              >
                <UserIcon className="w-3.5 h-3.5 text-[hsl(327,100%,55%)]" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:brightness-110 active:scale-[0.98] transition-all font-display"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-white/[0.05] border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0c080e]/95 backdrop-blur-2xl p-6 flex flex-col gap-3 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-center text-sm shadow-lg shadow-pink-500/25 font-display"
            >
              Apply as a Creator
            </Link>
            <Link
              href="/for-brands"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-center text-sm hover:bg-white/10 transition-colors font-sans"
            >
              For Brand Marketers
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
