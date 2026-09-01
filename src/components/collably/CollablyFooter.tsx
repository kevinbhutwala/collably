"use client";

import React from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

export function CollablyFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0c080e] text-slate-400 py-16 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <CollablyLogo href="/" size="md" subtext="Creator × Brand Ecosystem" />
            <p className="text-slate-300 max-w-sm text-xs font-sans leading-relaxed">
              Collably is the premier collaboration workspace and milestone payment platform connecting vetted video creators with high-growth brands.
            </p>
            <div className="space-y-1.5 text-slate-400 text-xs">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span>Contact: support@collably.io / kevinbhutwala417@gmail.com</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>Collably Inc. • Delaware, United States &amp; Mumbai, India</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-sans pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Milestone Payments via Stripe Connect &amp; Razorpay</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono font-display">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-300 font-sans">
              <li><Link href="/creators" className="hover:text-white transition-colors">Creator Directory</Link></li>
              <li><Link href="/for-brands" className="hover:text-white transition-colors">Collably for Brands</Link></li>
              <li><Link href="/campaigns" className="hover:text-white transition-colors">Active Brand Briefs</Link></li>
              <li><Link href="/app/collaborations" className="hover:text-white transition-colors">4K Video Player</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing &amp; 10% Fee</Link></li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono font-display">
              Legal &amp; Compliance
            </h4>
            <ul className="space-y-2 text-slate-300 font-sans">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/dpa" className="hover:text-white transition-colors">Data Processing (DPA)</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Milestone Refund Policy</Link></li>
              <li><Link href="/login" className="hover:text-pink-300 transition-colors font-bold text-[hsl(327,100%,55%)]">Sign In to Dashboard →</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Milestone Custody Rails Operational (Stripe Connect)</span>
          </div>

          <p>© {new Date().getFullYear()} Collably Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
