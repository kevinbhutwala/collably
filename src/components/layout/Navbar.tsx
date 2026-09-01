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
          ? "border-b border-[#E2E6E1] bg-[#FCFCFA]/95 backdrop-blur-md py-3 shadow-xs"
          : "border-b border-[#E2E6E1] bg-[#FCFCFA]/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-[#101310]">
        {/* Brand Logo */}
        <CollablyLogo href="/" size="md" subtext="Creator Commerce" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF] border border-[#E2E6E1] px-2 py-1 rounded-full shadow-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all select-none font-sans",
                  isActive
                    ? "bg-[#087F5B] text-white shadow-xs"
                    : "text-[#626862] hover:text-[#101310] hover:bg-[#F1F2EE]"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-[#EAF8F2] hover:bg-[#C3EBDA] border border-[#C3EBDA] text-xs font-mono text-[#087F5B] transition-colors font-bold"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 rounded-lg text-[#626862] hover:text-[#101310] hover:bg-[#F1F2EE] transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-3 py-2 text-xs font-semibold text-[#101310] hover:text-[#087F5B] transition-colors font-sans"
              >
                Log in
              </Link>
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[9px] text-xs font-semibold text-white bg-[#087F5B] hover:bg-[#075E45] active:bg-[#064B39] shadow-xs transition-all font-sans"
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
          className="lg:hidden p-2 text-[#101310] rounded-lg bg-[#F1F2EE] border border-[#E2E6E1]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E6E1] bg-[#FCFCFA] p-5 flex flex-col gap-2 shadow-lg text-[#101310]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#626862] hover:text-[#101310] hover:bg-[#F1F2EE] transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#E2E6E1] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-[9px] bg-[#FFFFFF] border border-[#E2E6E1] text-[#101310] font-semibold text-center text-xs font-sans"
            >
              Log in
            </Link>
            <Link
              href="/creator/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white font-semibold text-center text-xs shadow-xs font-sans"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
