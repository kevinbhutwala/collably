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
          ? "border-b border-[#FFD21F]/20 bg-[#08080C]/95 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "border-b border-white/10 bg-[#08080C]/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-white">
        {/* Brand Logo */}
        <CollablyLogo href="/" size="md" subtext="Creator Commerce" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#12121A]/90 border border-[#FFD21F]/20 px-2 py-1 rounded-full shadow-lg backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-full transition-all select-none font-sans tracking-tight",
                  isActive
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_0_15px_rgba(255,210,31,0.45)] font-bold border border-white/40"
                    : "text-white/70 hover:text-white hover:bg-white/[0.06]"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFD21F] text-xs font-mono text-[#0A0A0E] transition-all font-extrabold shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/40"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#0A0A0E]" />
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
            <div className="flex items-center gap-3 font-sans">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#0A0A0E] bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] shadow-[0_0_25px_rgba(255,210,31,0.45)] border border-white/40 transition-all group tracking-tight"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0A0A0E] fill-[#0A0A0E]" />
                <span>Launch Media Kit</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white rounded-xl bg-white/[0.05] border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#FFD21F]/20 bg-[#08080C] p-5 flex flex-col gap-2 shadow-2xl text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2 font-sans">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-center text-xs"
            >
              Sign In
            </Link>
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-bold text-center text-xs shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <Sparkles className="w-3.5 h-3.5 fill-[#0A0A0E]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
