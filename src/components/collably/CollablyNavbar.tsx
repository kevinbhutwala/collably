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
            ? "py-3 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Collably Brand Logo */}
          <CollablyLogo href="/" size="md" subtext="Creator × Brand Ecosystem" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/70 border border-slate-200/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-slate-600 hover:text-slate-950 hover:bg-white transition-all shadow-none hover:shadow-xs"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors"
            >
              Log in
            </Link>

            <Link
              href="/creator/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all"
            >
              <span>Join Founding Cohort</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
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
            className="fixed inset-x-0 top-[65px] z-30 p-6 bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xl flex flex-col gap-4 lg:hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-slate-700 border border-slate-200 rounded-xl"
              >
                Log In
              </Link>
              <Link
                href="/creator/register"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-slate-900 rounded-xl"
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
