"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import {
  ArrowUpRight,
  Menu,
  X,
  Building2,
  Video,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";

export function CollablyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const navLinks = [
    { href: "/creators", label: "Creators", icon: Users },
    { href: "/campaigns", label: "Campaigns", icon: Compass },
    { href: "/for-brands", label: "For Brands", icon: Building2 },
    { href: "/pricing", label: "Fee Model", icon: Sparkles },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a070a]/80 backdrop-blur-2xl border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <CollablyLogo href="/" size="md" subtext="Milestone Protected" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wide uppercase font-display text-white/80">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[hsl(327,100%,55%)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
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
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] shadow-sm font-display"
            >
              Start
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Trending Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-30 p-5 bg-[#0e0910]/98 backdrop-blur-3xl border-b border-white/10 shadow-2xl flex flex-col gap-4 lg:hidden text-white"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl text-slate-200 hover:text-white hover:bg-white/[0.06] font-display"
                  >
                    <Icon className="w-4 h-4 text-pink-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold text-white/90 bg-white/[0.05] border border-white/10 rounded-full font-display"
              >
                Sign In
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setRoleModalOpen(true);
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] rounded-full font-display shadow-lg shadow-pink-500/25"
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
        title="Welcome to Collably"
        description="Choose your account type to proceed."
        maxWidth="md"
      >
        <div className="space-y-4 pt-2">
          {/* Brand Option */}
          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="block p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 hover:bg-white/[0.08] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-[hsl(327,100%,55%)]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display group-hover:text-pink-300 transition-colors">
                    I&apos;m a Brand or Agency
                  </h4>
                  <p className="text-xs text-slate-400 font-sans">
                    Launch campaign briefs &amp; hire vetted creators
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </Link>

          {/* Creator Option */}
          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="block p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 hover:bg-white/[0.08] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display group-hover:text-purple-300 transition-colors">
                    I&apos;m a Creator
                  </h4>
                  <p className="text-xs text-slate-400 font-sans">
                    Apply to paid briefs with protected milestone payouts
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </Link>
        </div>
      </Modal>
    </>
  );
}
