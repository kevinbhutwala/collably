"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function CollablyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/campaigns", label: "Explore Briefs" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/creators", label: "Creator Roster" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0A0A10]/90 backdrop-blur-md border-b border-black/8 dark:border-white/10 select-none transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <CollablyLogo href="/" size="md" subtext="Creator Commerce" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-bold tracking-normal font-sans text-[#5A5A68]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full transition-all",
                    isActive
                      ? "bg-[#FFD21F] text-[#0A0A0E] font-bold shadow-xs border border-black/10"
                      : "hover:text-[#0A0A0E] hover:bg-black/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <CurrencySelector />
            <ThemeToggle />

            <Link
              href="/login"
              className="text-xs font-bold text-[#0A0A0E] dark:text-[#F4F4F8] hover:text-black dark:hover:text-white transition-colors font-sans px-2"
            >
              Sign In
            </Link>

            <button
              onClick={() => setRoleModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold text-[#0A0A0E] bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] border border-black/10 shadow-[0_2px_12px_rgba(255,210,31,0.4)] active:scale-[0.98] transition-all font-sans"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Theme Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle className="w-8 h-8 p-1.5" />
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0A0A0E] bg-[#FFD21F] shadow-xs font-sans"
            >
              Start
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full bg-[#F4F4F8] dark:bg-[#14141E] border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white hover:bg-[#EAEAEF] dark:hover:bg-[#1C1C28] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[64px] z-30 p-5 bg-white dark:bg-[#0E0E16] border-b border-black/8 dark:border-white/10 shadow-xl flex flex-col gap-3 lg:hidden text-[#0A0A0E] dark:text-[#F4F4F8]"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0A0A0E] dark:hover:text-white hover:bg-[#F4F4F8] dark:hover:bg-[#181824]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-black/8 dark:border-white/10 flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4]">Currency</span>
                <CurrencySelector />
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4]">Appearance</span>
                <ThemeToggle showLabel />
              </div>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-[#F4F4F8] dark:bg-[#181824] text-xs font-bold text-[#0A0A0E] dark:text-white"
              >
                Sign In
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setRoleModalOpen(true);
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-extrabold"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Selection Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title="Join the AbeyCollab Network"
        description="Choose your pathway to explore briefings or share your creator kit."
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
            <ArrowRight className="w-4 h-4 text-[#08080C] group-hover:translate-x-1 transition-transform" />
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
