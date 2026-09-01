"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Modal } from "@/components/ui/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Building2, Sparkles, ArrowRight } from "lucide-react";

export function CollablyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Platform", href: "/for-brands" },
    { label: "For Brands", href: "/for-brands" },
    { label: "For Creators", href: "/creators" },
    { label: "How It Works", href: "/#workflow" },
    { label: "Pricing", href: "/pricing" },
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors font-display"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-medium text-white/80 hover:text-white transition-colors font-display"
            >
              Sign In
            </Link>

            <button
              onClick={() => setRoleModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] shadow-lg shadow-[hsl(327,100%,50%)]/25 hover:shadow-xl hover:shadow-[hsl(327,100%,50%)]/35 hover:brightness-110 active:scale-[0.98] transition-all font-display"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
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
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/[0.06] font-display"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold text-white/80 border border-white/10 rounded-full font-display"
              >
                Sign In
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setRoleModalOpen(true);
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] rounded-full font-display"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Selector Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title="Get Started on Collably"
        description="Choose your account type to proceed to customized onboarding."
        maxWidth="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Brand Track */}
          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 hover:bg-white/[0.07] transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">I&apos;m a Brand or Agency</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Discover vetted creators, launch campaign briefs, and manage deliverables with protected milestone payments.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[hsl(327,100%,55%)] font-mono pt-2">
              <span>Continue as Brand</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Creator Track */}
          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.07] transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">I&apos;m a Creator</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Publish your verified media kit, connect with high-growth brands, and receive guaranteed milestone payouts.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 font-mono pt-2">
              <span>Continue as Creator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </Modal>
    </>
  );
}
