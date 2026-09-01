"use client";

import React from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { ArrowUpRight, ShieldCheck, Sparkles, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c080e] text-slate-400 text-xs font-mono">
      {/* Pre-Footer CTA */}
      <div className="border-b border-white/10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Founding Cohort Open</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Ready to collaborate without chasing invoices?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
              Connect with vetted creators, automate deliverable feedback with frame-accurate video players, and guarantee payouts with milestone protection.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/app/brand/campaigns/create"
              className="inline-flex items-center justify-center font-bold bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white px-6 py-3.5 rounded-full hover:brightness-110 transition-all shadow-lg shadow-pink-500/25 text-sm font-display"
            >
              Start a Campaign Brief <ArrowUpRight className="w-4 h-4 ml-1.5 text-amber-300" />
            </Link>
            <Link
              href="/creator/register"
              className="inline-flex items-center justify-center font-semibold bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-full hover:bg-white/15 transition-all text-sm font-display shadow-xs"
            >
              Apply as a Creator
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-4">
          <CollablyLogo href="/" size="sm" subtext="Creator × Brand Ecosystem" />
          <p className="text-xs text-slate-400 max-w-sm font-sans leading-relaxed">
            Collably is the modern creator collaboration workspace and milestone payment platform connecting vetted video creators with high-growth brands.
          </p>
          <div className="space-y-1.5 text-xs text-slate-400 font-mono">
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Contact: support@collably.io / kevinbhutwala417@gmail.com</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Collably Inc. • Delaware, United States &amp; Mumbai, India</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-sans pt-1 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Milestone Payments via Stripe Connect &amp; Razorpay</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
            Platform
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            <li><Link href="/creators" className="hover:text-pink-300 transition-colors">Creator Discovery</Link></li>
            <li><Link href="/for-brands" className="hover:text-pink-300 transition-colors">For Brand Marketers</Link></li>
            <li><Link href="/campaigns" className="hover:text-pink-300 transition-colors">Live Briefs</Link></li>
            <li><Link href="/app/collaborations" className="hover:text-pink-300 transition-colors">Video Review Player</Link></li>
            <li><Link href="/pricing" className="hover:text-pink-300 transition-colors">Pricing &amp; 10% Fee</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
            Agency Services
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            <li><Link href="/services" className="hover:text-pink-300 transition-colors">Managed Campaigns</Link></li>
            <li><Link href="/services" className="hover:text-pink-300 transition-colors">Talent Roster Curation</Link></li>
            <li><Link href="/services" className="hover:text-pink-300 transition-colors">Contract &amp; Rights QA</Link></li>
            <li><Link href="/about" className="hover:text-pink-300 transition-colors">About Collably</Link></li>
            <li><Link href="/contact" className="hover:text-pink-300 transition-colors">Book a Demo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
            Legal &amp; Compliance
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            <li><Link href="/privacy" className="hover:text-pink-300 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-pink-300 transition-colors">Terms of Service</Link></li>
            <li><Link href="/dpa" className="hover:text-pink-300 transition-colors">Data Processing (DPA)</Link></li>
            <li><Link href="/refund-policy" className="hover:text-pink-300 transition-colors">Milestone Refund Policy</Link></li>
            <li><Link href="/login" className="hover:text-pink-300 transition-colors font-bold text-[hsl(327,100%,55%)]">Sign In →</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Collably Inc. All rights reserved.</p>
        <p className="font-mono text-[11px] text-slate-400">
          The Premier Creator × Brand Collaboration Platform
        </p>
      </div>
    </footer>
  );
}
