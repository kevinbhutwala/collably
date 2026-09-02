"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { Modal } from "@/components/ui/Modal";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkSession]);

  const navLinks = [
    { href: "/campaigns", label: "Explore Briefs" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/creators", label: "Creator Roster" },
    { href: "/pricing", label: "Pricing" },
    { href: "/case-studies", label: "Case Studies" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 select-none ${
          scrolled
            ? "border-b border-black/8 bg-white/95 backdrop-blur-xl py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            : "border-b border-black/5 bg-white/80 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-[#0A0A0E]">
          {/* Brand Logo */}
          <CollablyLogo href="/" size="md" subtext="Creator Commerce" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F5F5F9] border border-black/5 px-2 py-1 rounded-full shadow-xs backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-1.5 text-xs font-semibold rounded-full transition-all select-none font-sans tracking-tight",
                    isActive
                      ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_2px_10px_rgba(255,210,31,0.4)] font-bold border border-black/10"
                      : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/[0.04]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href={user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"}
                className="px-4 py-2 rounded-full bg-[#F5F5F9] hover:bg-[#EAEAEF] text-[#0A0A0E] text-xs font-bold transition-all flex items-center gap-2 border border-black/5"
              >
                <span>Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-[#5A5A68] hover:text-[#0A0A0E] px-3 py-2 transition-colors font-sans"
                >
                  Sign In
                </Link>

                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold shadow-[0_2px_12px_rgba(255,210,31,0.35)] border border-black/10 transition-all active:scale-98 flex items-center gap-1.5 font-sans"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0A0A0E] bg-[#FFD21F] shadow-xs font-sans"
            >
              Start
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-[#F4F4F8] border border-black/8 text-[#0A0A0E] hover:bg-[#EAEAEF] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[64px] z-30 p-5 bg-white border-b border-black/8 shadow-xl flex flex-col gap-3 lg:hidden text-[#0A0A0E]">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-bold text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-[#F4F4F8]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-black/8 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl bg-[#F4F4F8] text-xs font-bold text-[#0A0A0E]"
            >
              Sign In
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setRoleModalOpen(true);
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-extrabold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Role Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title="Join Collably"
        description="Select your pathway to access tailored briefings and verified creator kits."
        maxWidth="md"
      >
        <div className="space-y-3 pt-2 text-[#0A0A0E] select-none font-sans">
          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#FFD21F] hover:shadow-md transition-all group flex items-center justify-between block"
          >
            <div>
              <h4 className="text-sm font-bold font-display">I am a Brand / Business</h4>
              <p className="text-xs text-[#6A6A78]">Post campaign briefs, hire creators &amp; escrow funds</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FAFAFC] border border-black/10 hover:border-black/20 hover:bg-white hover:shadow-md transition-all group flex items-center justify-between block"
          >
            <div>
              <h4 className="text-sm font-bold font-display">I am a Creator</h4>
              <p className="text-xs text-[#6A6A78]">Pitch briefs, share audited media kit &amp; get paid</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#08080C] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Modal>
    </>
  );
}
