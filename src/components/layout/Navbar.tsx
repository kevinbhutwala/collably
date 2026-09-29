"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AbeyCollabLogo } from "@/components/ui/AbeyCollabLogo";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { motion, AnimatePresence } from "framer-motion";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    if (path === "/") return "AbeyCollab";
    if (path === "/campaigns") return "Explore Briefs";
    if (path === "/creators") return "Creator Roster";
    if (path === "/for-brands") return "For Brands";
    if (path === "/pricing") return "Pricing";
    if (path === "/case-studies") return "Case Studies";
    if (path === "/services") return "Agency Services";
    if (path === "/about") return "About AbeyCollab";
    if (path === "/contact") return "Contact Sales";
    if (path === "/login") return "Sign In";
    if (path === "/register") return "Get Started";
    if (path === "/register?role=creator") return "Creator Sign Up";
    if (path === "/register?role=brand") return "Brand Sign Up";
    if (path.startsWith("/campaigns/")) return "Campaign Brief";
    if (path.startsWith("/creators/")) return "Creator Profile";
    return "AbeyCollab";
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
            ? "border-b border-black/8 dark:border-white/10 bg-white/95 dark:bg-[#0A0A0F]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            : "border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-md"
        }`}
      >
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 text-[#0B0A14] dark:text-[#F4F4F8]">
          {/* Brand Logo / Mobile Screen Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="shrink-0">
              <AbeyCollabLogo href="/" size="sm" />
            </div>

            {/* Mobile Header Screen Title (Subpages only) */}
            {pathname !== "/" && currentTitle !== "AbeyCollab" && (
              <div className="flex lg:hidden items-center gap-1.5 min-w-0">
                <span className="text-xs text-[#8A8A98] font-mono">•</span>
                <p className="text-sm font-extrabold text-[#0B0A14] dark:text-white font-display tracking-tight truncate">
                  {currentTitle}
                </p>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links (Visible on Large Screens >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F5F5F9] dark:bg-[#14141E] border border-black/5 dark:border-white/10 px-2 py-1 rounded-full shadow-xs backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-1.5 text-xs font-semibold rounded-full transition-all select-none font-sans tracking-tight",
                    isActive
                      ? "bg-[#7C3AED] dark:bg-[#7C3AED] text-white dark:text-white shadow-[0_2px_12px_rgba(124,58,237,0.4)] font-bold border border-[#7C3AED]/30"
                      : "text-[#545266] dark:text-[#94A3B8] hover:text-[#0B0A14] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Visible on Large Screens >= 1024px) */}
          <div className="hidden lg:flex items-center gap-3">
            <CurrencySelector />

            {isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href={user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#181824] border border-black/5 dark:border-white/10 hover:border-black/15 transition-all text-xs group"
                >
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white font-black text-[11px] flex items-center justify-center font-mono">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 ring-2 ring-white dark:ring-[#181824]" />
                  </div>
                  <span className="font-bold text-[#0B0A14] dark:text-white max-w-[120px] truncate font-sans">
                    {user?.name?.split(" ")[0] || "Workspace"}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#545266] dark:text-[#94A3B8] uppercase">
                    {user?.role || "user"}
                  </span>
                </Link>

                <Link
                  href={user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"}
                  className="px-4 py-2 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_2px_12px_rgba(124,58,237,0.35)] active:scale-95"
                >
                  <span>Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-[#545266] dark:text-[#94A3B8] hover:text-[#0B0A14] dark:hover:text-white px-3 py-2 transition-colors font-sans"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#C084FC] hover:from-[#6D28D9] hover:to-[#A855F7] text-white text-xs font-extrabold shadow-[0_2px_14px_rgba(124,58,237,0.35)] border border-white/10 transition-all active:scale-98 flex items-center gap-1.5 font-sans hover-lift"
                >
                  <span>Sign up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile & Tablet Hamburger + Quick Sign up (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>
            {isAuthenticated ? (
              <Link
                href={user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#7C3AED] shadow-xs font-sans active:scale-95 inline-flex items-center gap-1"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[#7C3AED] to-[#9333EA] shadow-xs font-sans active:scale-95"
              >
                Sign up
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#F4F4F8] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-[#0B0A14] dark:text-white hover:bg-[#EAEAEF] dark:hover:bg-[#222232] transition-colors active:scale-95 touch-manipulation"
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
              className="fixed inset-x-0 top-16 z-40 p-5 sm:p-6 bg-white dark:bg-[#0E0E16] border-b border-black/10 dark:border-white/10 shadow-2xl flex flex-col gap-4 lg:hidden text-[#0B0A14] dark:text-[#F4F4F8] max-h-[calc(100vh-4rem)] overflow-y-auto"
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
                          ? "bg-[#7C3AED] dark:bg-[#7C3AED] text-white dark:text-white shadow-xs"
                          : "text-[#545266] dark:text-[#94A3B8] hover:text-[#0B0A14] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-white/10"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="sm:hidden px-1 pt-1 pb-2">
                <CurrencySelector />
              </div>

              <div className="pt-3 border-t border-black/8 dark:border-white/10 flex flex-col sm:flex-row gap-2.5">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2.5 w-full">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-black/4 dark:bg-white/5 border border-black/5 dark:border-white/10">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative shrink-0">
                          <div className="w-9 h-9 rounded-full bg-[#7C3AED] text-white font-black text-sm flex items-center justify-center font-mono">
                            {user?.name?.charAt(0) || "U"}
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-white dark:ring-[#0E0E16]" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-bold text-[#0B0A14] dark:text-white truncate">{user?.name}</p>
                          <p className="text-[10px] font-mono text-[#545266] dark:text-[#94A3B8] uppercase">{user?.role}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        LOGGED IN
                      </span>
                    </div>

                    <Link
                      href={user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3.5 text-center rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-extrabold shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center rounded-2xl bg-[#F1F5F9] dark:bg-[#181824] text-xs font-bold text-[#0B0A14] dark:text-white border border-black/5 dark:border-white/10"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#C084FC] text-white text-xs font-extrabold shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Sign up</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
