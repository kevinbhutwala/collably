"use client";

import React from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { ArrowRight, ShieldCheck, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#E7E7E4] bg-[#FAFAF8] text-[#6B6B6B] text-xs font-sans">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-4">
          <CollablyLogo href="/" size="sm" subtext="Creator Commerce" />
          <p className="text-xs text-[#6B6B6B] max-w-sm font-sans leading-relaxed">
            Collably is the modern creator collaboration workspace and milestone payment platform connecting vetted video creators with high-growth brands.
          </p>
          <div className="space-y-1.5 text-xs text-[#6B6B6B] font-mono">
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#6B6B6B]" />
              <span>support@collably.io / kevinbhutwala417@gmail.com</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#6B6B6B]" />
              <span>Collably Inc. • Delaware, United States &amp; Mumbai, India</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#111111] font-sans pt-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span>Milestone-Protected Payments via Stripe Connect &amp; Razorpay</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4 font-mono">
            Platform
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            <li><Link href="/creators" className="hover:text-[#111111] transition-colors">Creator Discovery</Link></li>
            <li><Link href="/for-brands" className="hover:text-[#111111] transition-colors">For Brand Marketers</Link></li>
            <li><Link href="/campaigns" className="hover:text-[#111111] transition-colors">Live Briefs</Link></li>
            <li><Link href="/app/collaborations" className="hover:text-[#111111] transition-colors">Video Review Player</Link></li>
            <li><Link href="/pricing" className="hover:text-[#111111] transition-colors">Pricing &amp; 10% Fee</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4 font-mono">
            Agency Services
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            <li><Link href="/services" className="hover:text-[#111111] transition-colors">Managed Campaigns</Link></li>
            <li><Link href="/services" className="hover:text-[#111111] transition-colors">Talent Roster Curation</Link></li>
            <li><Link href="/services" className="hover:text-[#111111] transition-colors">Contract &amp; Rights QA</Link></li>
            <li><Link href="/about" className="hover:text-[#111111] transition-colors">About Collably</Link></li>
            <li><Link href="/contact" className="hover:text-[#111111] transition-colors">Book a Demo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4 font-mono">
            Legal &amp; Compliance
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            <li><Link href="/privacy" className="hover:text-[#111111] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#111111] transition-colors">Terms of Service</Link></li>
            <li><Link href="/dpa" className="hover:text-[#111111] transition-colors">Data Processing (DPA)</Link></li>
            <li><Link href="/refund-policy" className="hover:text-[#111111] transition-colors">Milestone Refund Policy</Link></li>
            <li><Link href="/login" className="hover:text-[#111111] transition-colors font-bold flex items-center gap-1 text-[#111111]">Sign In <span className="text-[#B7FF3C]">→</span></Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#E7E7E4] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">
        <p>© {new Date().getFullYear()} Collably Inc. All rights reserved.</p>
        <p className="font-mono text-[11px] text-[#6B6B6B] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
          <span>Creator Commerce &amp; Milestone Payment Workspace</span>
        </p>
      </div>
    </footer>
  );
}
