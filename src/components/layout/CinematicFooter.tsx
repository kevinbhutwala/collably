"use client";

import React from "react";
import Link from "next/link";
import { AbeyCollabSymbol } from "@/components/ui/AbeyCollabLogo";
import { ArrowRight, ShieldCheck, Mail, MapPin } from "lucide-react";

export function CinematicFooter() {
  return (
    <footer className="border-t border-black/8 dark:border-white/10 bg-[#F6F6F9] dark:bg-[#07070B] text-[#5A5A68] dark:text-[#8E8EA4] text-xs font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-1 sm:col-span-2 space-y-4">

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] border border-black/10 flex items-center justify-center text-[#0A0A0E] group-hover:scale-105 transition-transform shadow-[0_2px_10px_rgba(255,210,31,0.3)]">
              <AbeyCollabSymbol size={20} />
            </div>
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#0A0A0E] dark:text-white">
              AbeyCollab
            </span>
          </Link>
          <p className="text-xs text-[#6A6A78] dark:text-[#9A9AA8] max-w-sm font-sans leading-relaxed">
            The creator × brand collaboration platform. Run high-impact campaigns, discover vetted talent, and receive secure milestone payments.
          </p>
          <div className="space-y-1 text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
            <p>support@abeycollab.com / kevinbhutwala417@gmail.com</p>
            <p>Delaware, United States &amp; Mumbai, India</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#0A0A0E] dark:text-white font-sans pt-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>Escrow-Protected Milestone Rails via Stripe Connect</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white mb-4 font-mono">
            Platform
          </h4>
          <ul className="space-y-2.5 text-xs text-[#6A6A78] font-sans">
            <li><Link href="/for-brands" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">For Brands</Link></li>
            <li><Link href="/creators" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">For Creators</Link></li>
            <li><Link href="/campaigns" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Campaigns</Link></li>
            <li><Link href="/pricing" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white mb-4 font-mono">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs text-[#6A6A78] font-sans">
            <li><Link href="/case-studies" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Case Studies</Link></li>
            <li><Link href="/services" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Agency Solutions</Link></li>
            <li><Link href="/about" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Contact Sales</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white mb-4 font-mono">
            Legal &amp; Trust
          </h4>
          <ul className="space-y-2.5 text-xs text-[#6A6A78] font-sans">
            <li><Link href="/privacy" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/dpa" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Data Processing (DPA)</Link></li>
            <li><Link href="/refund-policy" className="hover:text-[#0A0A0E] dark:hover:text-white transition-colors">Escrow Protection SLA</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/8 dark:border-white/10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7A8A] dark:text-[#8E8EA4]">
        <p>© {new Date().getFullYear()} AbeyCollab Inc. All rights reserved.</p>
        <p className="font-mono text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
          <span>The Creator × Brand Collaboration Platform</span>
        </p>
      </div>
    </footer>
  );
}
