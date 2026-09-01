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
          ? "border-b border-[#E6E6E8] bg-[#FFFFFF]/95 backdrop-blur-md py-3 shadow-xs"
          : "border-b border-[#E6E6E8] bg-[#FFFFFF]/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-[#08090C]">
        {/* Brand Logo */}
        <CollablyLogo href="/" size="md" subtext="Creator Commerce" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FAFAFA] border border-[#E6E6E8] px-2 py-1 rounded-full shadow-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all select-none font-sans",
                  isActive
                    ? "bg-[#3047FF] text-white shadow-xs"
                    : "text-[#6B7280] hover:text-[#08090C] hover:bg-[#F0F0F2]"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-[#EEF0FF] hover:bg-[#DDE1FF] border border-[#C8CEFF] text-xs font-mono text-[#3047FF] transition-colors font-bold"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#3047FF]" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 rounded-lg text-[#6B7280] hover:text-[#08090C] hover:bg-[#F6F7F9] transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-3 py-2 text-xs font-semibold text-[#08090C] hover:text-[#3047FF] transition-colors font-sans"
              >
                Log in
              </Link>
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[9px] text-xs font-semibold text-white bg-[#3047FF] hover:bg-[#1726C7] active:bg-[#0E1A9E] shadow-ultramarine-glow transition-all font-sans"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#08090C] rounded-lg bg-[#FAFAFA] border border-[#E6E6E8]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6E6E8] bg-[#FFFFFF] p-5 flex flex-col gap-2 shadow-lg text-[#08090C]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#6B7280] hover:text-[#08090C] hover:bg-[#F6F7F9] transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#E6E6E8] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-[9px] bg-[#FFFFFF] border border-[#E6E6E8] text-[#08090C] font-semibold text-center text-xs font-sans"
            >
              Log in
            </Link>
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-[9px] bg-[#3047FF] hover:bg-[#1726C7] text-white font-semibold text-center text-xs shadow-xs font-sans"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
