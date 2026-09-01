"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import {
  ArrowRight,
  Menu,
  X,
  Building2,
  Video,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";

export function CollablyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const navLinks = [
    { href: "/campaigns", label: "Platform" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/creators", label: "For Creators" },
    { href: "/#workflow", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FCFCFA]/90 backdrop-blur-md border-b border-[#E2E6E1] select-none transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <CollablyLogo href="/" size="md" subtext="Creator Commerce" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-normal font-sans text-[#626862]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#101310] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#101310] hover:text-[#087F5B] transition-colors font-sans"
            >
              Sign In
            </Link>

            <button
              onClick={() => setRoleModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[9px] text-xs font-semibold text-white bg-[#087F5B] hover:bg-[#075E45] active:bg-[#064B39] shadow-xs transition-all font-sans"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-3.5 py-1.5 rounded-[9px] text-xs font-semibold text-white bg-[#087F5B] shadow-xs font-sans"
            >
              Start
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-[#F1F2EE] border border-[#E2E6E1] text-[#101310] hover:bg-[#E2E6E1] transition-colors"
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
            className="fixed inset-x-0 top-[72px] z-30 p-5 bg-[#FCFCFA] border-b border-[#E2E6E1] shadow-lg flex flex-col gap-3 lg:hidden text-[#101310]"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3.5 py-2.5 text-xs font-semibold rounded-lg text-[#101310] hover:bg-[#F1F2EE] font-sans"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E2E6E1] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold text-[#101310] bg-[#FFFFFF] border border-[#E2E6E1] rounded-[9px] font-sans"
              >
                Sign In
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setRoleModalOpen(true);
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#087F5B] rounded-[9px] font-sans shadow-xs"
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
        <div className="space-y-3 pt-2">
          {/* Brand Option */}
          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="block p-4 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] hover:border-[#087F5B] hover:bg-[#F2FAF6] transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EAF8F2] border border-[#C3EBDA] flex items-center justify-center text-[#087F5B]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#101310] font-sans group-hover:text-[#087F5B] transition-colors">
                    I&apos;m a Brand or Agency
                  </h4>
                  <p className="text-xs text-[#626862] font-sans">
                    Launch campaign briefs &amp; hire vetted creators
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8A908B] group-hover:text-[#087F5B] transition-colors" />
            </div>
          </Link>

          {/* Creator Option */}
          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="block p-4 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] hover:border-[#087F5B] hover:bg-[#F2FAF6] transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EAF8F2] border border-[#C3EBDA] flex items-center justify-center text-[#087F5B]">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#101310] font-sans group-hover:text-[#087F5B] transition-colors">
                    I&apos;m a Creator
                  </h4>
                  <p className="text-xs text-[#626862] font-sans">
                    Apply to paid briefs with protected milestone payouts
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8A908B] group-hover:text-[#087F5B] transition-colors" />
            </div>
          </Link>
        </div>
      </Modal>
    </>
  );
}
