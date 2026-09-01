"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Menu, X, ArrowRight, User as UserIcon, LogOut } from "lucide-react";
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
    { href: "/campaigns", label: "Platform" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/creators", label: "For Creators" },
    { href: "/#workflow", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 select-none ${
        scrolled
          ? "border-b border-[#E7E7E4] bg-[#FAFAF8]/95 backdrop-blur-md py-3 shadow-xs"
          : "border-b border-[#E7E7E4] bg-[#FAFAF8]/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-[#101010]">
        {/* Brand Logo: strong typographic presence */}
        <CollablyLogo href="/" size="md" subtext="Creator Commerce" />

        {/* Desktop Navigation Links: Geist 14–15px / 500 */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF] border border-[#E7E7E4] px-2 py-1 rounded-full shadow-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-1.5 text-[14px] font-medium rounded-full transition-all select-none font-sans tracking-tight",
                  isActive
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs font-semibold"
                    : "text-[#626262] hover:text-[#101010] hover:bg-[#F4F4F0]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Items: Geist 14-15px / 600 */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/app/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-[#101010] text-[14px] font-mono text-[#FAFAF8] transition-colors font-bold shadow-xs"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#B7FF3C]" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 rounded-lg text-[#626262] hover:text-[#101010] hover:bg-[#F4F4F0] transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 font-sans">
              <Link
                href="/login"
                className="px-3.5 py-2 text-[14px] font-medium text-[#101010] hover:text-black transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] text-[14px] font-semibold text-[#FAFAF8] bg-[#101010] hover:bg-[#262626] active:bg-[#000000] shadow-xs transition-all group tracking-tight"
              >
                <span>Get Started</span>
                <span className="w-2 h-2 rounded-full bg-[#B7FF3C] group-hover:scale-125 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#101010] rounded-lg bg-[#FFFFFF] border border-[#E7E7E4]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E7E4] bg-[#FAFAF8] p-5 flex flex-col gap-2 shadow-lg text-[#101010]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#626262] hover:text-[#101010] hover:bg-[#F4F4F0] transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#E7E7E4] flex flex-col gap-2 font-sans">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-[9px] bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] font-semibold text-center text-sm"
            >
              Log in
            </Link>
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-[9px] bg-[#101010] text-[#FAFAF8] font-semibold text-center text-sm shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
