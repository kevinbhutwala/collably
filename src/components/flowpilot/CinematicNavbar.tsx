"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FlowPilotLogo } from "./FlowPilotLogo";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sparkles, Activity, ShieldCheck } from "lucide-react";

export function CinematicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "engine", label: "AI Engine", href: "#engine" },
    { id: "story", label: "Pipeline", href: "#story" },
    { id: "demo", label: "Interactive Demo", href: "#demo" },
    { id: "recovery", label: "Revenue Recovery", href: "#recovery" },
    { id: "industries", label: "Industries", href: "#industries" },
    { id: "security", label: "Architecture", href: "#security" },
    { id: "pricing", label: "ROI Calculator", href: "#pricing" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#05070D]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <FlowPilotLogo href="/" size="md" subtext="Autonomous Conversational Revenue" />

          {/* Desktop Nav Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveTab(link.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 select-none ${
                  activeTab === link.id
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {activeTab === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-accent/30 to-orange-500/20 border border-brand-accent/40 shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Stack */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Telemetry Status Badge */}
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>99.98% Model Uptime</span>
            </div>

            <a
              href="#demo"
              className="relative inline-flex items-center justify-center text-xs font-bold text-white px-5 py-2.5 rounded-xl overflow-hidden group transition-all duration-300 bg-gradient-to-r from-brand-accent via-orange-500 to-amber-500 shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98]"
              data-cursor="DEMO"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Book Architecture Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation"
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
            className="fixed inset-x-0 top-[72px] z-30 p-6 bg-[#05070D]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col gap-4 lg:hidden"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#demo"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-accent to-orange-500 text-white font-bold text-center text-sm shadow-lg shadow-brand-accent/25"
              >
                Launch Live Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
