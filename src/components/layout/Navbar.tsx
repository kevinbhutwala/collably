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
          ? "border-b border-white/[0.08] bg-[#05070D]/90 backdrop-blur-2xl py-3.5 shadow-2xl"
          : "border-b border-white/[0.05] bg-[#05070D]/80 backdrop-blur-xl py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <CollablyLogo href="/" size="md" subtext="Creator × Brand Ecosystem" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-full transition-all select-none",
                  isActive
                    ? "bg-white text-slate-950 font-bold shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-brand-accent" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-accent via-orange-500 to-amber-500 shadow-md shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
        <div className="lg:hidden border-t border-white/10 bg-[#05070D]/98 backdrop-blur-2xl p-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-accent to-orange-500 text-white font-bold text-center text-sm shadow-md"
            >
              Apply as a Creator
            </Link>
            <Link
              href="/for-brands"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-white/[0.06] border border-white/10 text-slate-200 font-semibold text-center text-sm"
            >
              For Brand Marketers
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
