"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { Modal } from "@/components/ui/Modal";
import { motion, AnimatePresence } from "framer-motion";

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

  // Close mobile drawer on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const getPublicScreenTitle = (path: string): string => {
    if (path === "/") return "Collably";
    if (path === "/campaigns") return "Explore Briefs";
    if (path === "/creators") return "Creator Roster";
    if (path === "/for-brands") return "For Brands";
    if (path === "/pricing") return "Pricing";
    if (path === "/case-studies") return "Case Studies";
    if (path === "/services") return "Agency Services";
    if (path === "/about") return "About Collably";
    if (path === "/contact") return "Contact Sales";
    if (path === "/login") return "Sign In";
    if (path === "/register") return "Get Started";
    if (path === "/creator/register") return "Creator Sign Up";
    if (path === "/brand/register") return "Brand Sign Up";
    if (path.startsWith("/campaigns/")) return "Campaign Brief";
    if (path.startsWith("/creators/")) return "Creator Profile";
    return "Collably";
  };

  const currentTitle = getPublicScreenTitle(pathname);

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
            ? "border-b border-black/8 bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            : "border-b border-black/5 bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 text-[#0A0A0E]">
          {/* Brand Logo / Mobile Screen Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="shrink-0">
              <CollablyLogo href="/" size="sm" />
            </div>

            {/* Mobile Header Screen Title */}
            <div className="flex lg:hidden items-center gap-1.5 min-w-0">
              <span className="text-xs text-[#8A8A98] font-mono">•</span>
              <p className="text-sm font-extrabold text-[#0A0A0E] font-display tracking-tight truncate">
                {currentTitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on Large Screens >= 1024px) */}
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

          {/* Desktop Right Actions (Visible on Large Screens >= 1024px) */}
          <div className="hidden lg:flex items-center gap-3">
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
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold shadow-[0_2px_12px_rgba(255,210,31,0.35)] border border-black/10 transition-all active:scale-98 flex items-center gap-1.5 font-sans hover-lift"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile & Tablet Hamburger + Quick Start (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#0A0A0E] bg-gradient-to-r from-[#FFD21F] to-[#FFE052] shadow-xs font-sans border border-black/8 active:scale-95"
            >
              Start
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#F4F4F8] border border-black/8 text-[#0A0A0E] hover:bg-[#EAEAEF] transition-colors active:scale-95 touch-manipulation"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="public-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Full-Width Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-16 z-30 bg-black/30 backdrop-blur-[2px] lg:hidden"
            />

            {/* Menu Body */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              id="public-navigation"
              className="fixed inset-x-0 top-16 z-40 p-5 sm:p-6 bg-white border-b border-black/10 shadow-2xl flex flex-col gap-4 lg:hidden text-[#0A0A0E] max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-2xl text-sm font-bold transition-colors font-sans",
                        isActive
                          ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs"
                          : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-[#F4F4F8]"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-black/8 flex flex-col sm:flex-row gap-2.5">
                {isAuthenticated ? (
                  <Link
                    href={user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center rounded-2xl bg-[#0A0A0E] text-white text-xs font-bold"
                  >
                    Go to Workspace
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center rounded-2xl bg-[#F4F4F8] text-xs font-bold text-[#0A0A0E] border border-black/5"
                    >
                      Sign In
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setRoleModalOpen(true);
                      }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-extrabold shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
            className="w-full text-left p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#FFD21F] hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
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
            className="w-full text-left p-4 rounded-2xl bg-[#FAFAFC] border border-black/10 hover:border-black/20 hover:bg-white hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
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
