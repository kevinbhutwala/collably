"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Menu, X, User as UserIcon, LogOut, Sparkles } from "lucide-react";
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
    { href: "/campaigns", label: "Marketplace" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/creators", label: "For Creators" },
    { href: "/pricing", label: "Pricing" },
    { href: "/case-studies", label: "Case Studies" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 select-none ${
        scrolled
          ? "border-b border-blue-500/20 bg-[#060917]/95 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "border-b border-blue-500/10 bg-[#04060E]/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-white">
        {/* Brand Logo */}
        <CollablyLogo href="/" size="md" subtext="Creator Commerce" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0A1026]/90 border border-blue-500/20 px-2 py-1 rounded-full shadow-lg backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-full transition-all select-none font-sans tracking-tight",
                  isActive
                    ? "bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] font-bold border border-blue-400/30"
                    : "text-blue-200/70 hover:text-white hover:bg-white/[0.06]"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] text-xs font-mono text-white transition-all font-bold shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-300/30"
              >
                <UserIcon className="w-3.5 h-3.5 text-white" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 rounded-full text-blue-200/60 hover:text-white hover:bg-blue-900/30 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 font-sans">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-blue-200 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:from-[#1E40AF] hover:via-[#1D4ED8] hover:to-[#2563EB] shadow-[0_0_25px_rgba(37,99,235,0.55)] border border-blue-300/30 transition-all group tracking-tight"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200 fill-blue-200" />
                <span>Launch Media Kit</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white rounded-xl bg-white/[0.05] border border-blue-500/20"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-500/20 bg-[#060917] p-5 flex flex-col gap-2 shadow-2xl text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-blue-200/70 hover:text-white hover:bg-white/[0.05] transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-blue-500/15 flex flex-col gap-2 font-sans">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-white/[0.05] border border-blue-500/20 text-white font-semibold text-center text-xs"
            >
              Sign In
            </Link>
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-semibold text-center text-xs shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <Sparkles className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
