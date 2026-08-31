"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function CollablyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Creators", href: "/creators" },
    { label: "For Brands", href: "/for-brands" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Video Review", href: "/app/collaborations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Agency", href: "/services" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3.5 bg-[#0a070a]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Collably Brand Logo */}
          <CollablyLogo href="/" size="md" subtext="Creator × Brand Ecosystem" />

          {/* Desktop Navigation Links (anchorhetvi.com styling) */}
          <nav className="hidden lg:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-medium text-white/80 hover:text-white transition-colors"
            >
              Log in
            </Link>

            <Link
              href="/creator/register"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] shadow-lg shadow-[hsl(327,100%,50%)]/25 hover:shadow-xl hover:shadow-[hsl(327,100%,50%)]/35 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>Join Founding Cohort</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-30 p-6 bg-[#0a070a]/98 backdrop-blur-3xl border-b border-white/10 shadow-2xl flex flex-col gap-4 lg:hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/[0.06]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold text-white/80 border border-white/10 rounded-xl"
              >
                Log In
              </Link>
              <Link
                href="/creator/register"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] rounded-xl"
              >
                Join Founding Cohort
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
