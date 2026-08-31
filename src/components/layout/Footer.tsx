import React from "react";
import Link from "next/link";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      {/* Top Pre-Footer Callout */}
      <div className="border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-accent text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scale High-Impact Collaborations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ready to create campaigns that actually move culture?
            </h2>
            <p className="text-base text-slate-600 max-w-2xl">
              Connect with top-tier verified creators, automate deliverables with escrow security, and measure verifiable ROI across every platform.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/app/brand/campaigns/create"
              className="inline-flex items-center justify-center font-semibold bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-md text-sm"
            >
              Start a Campaign <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link
              href="/creator/register"
              className="inline-flex items-center justify-center font-semibold bg-white text-slate-800 border border-slate-300 px-6 py-3.5 rounded-xl hover:bg-slate-100 transition-all text-sm shadow-sm"
            >
              Join as a Creator
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-4">
          <CollablyLogo href="/" size="sm" subtext="Creator × Brand Intelligence" />
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            The next-generation creator intelligence platform and modern marketing agency connecting world-class creators with ambitious brands.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Escrow Protected & SEC-Compliant Payouts</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 font-mono">
            Platform
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/creators" className="hover:text-slate-900 transition-colors">Creator Discovery</Link></li>
            <li><Link href="/campaigns" className="hover:text-slate-900 transition-colors">Live Campaigns</Link></li>
            <li><Link href="/brands" className="hover:text-slate-900 transition-colors">Brand Directory</Link></li>
            <li><Link href="/app/collaborations" className="hover:text-slate-900 transition-colors">Workspace & Deliverables</Link></li>
            <li><Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing & Escrow</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 font-mono">
            Agency Services
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/services" className="hover:text-slate-900 transition-colors">Full-Service Management</Link></li>
            <li><Link href="/services" className="hover:text-slate-900 transition-colors">Talent Representation</Link></li>
            <li><Link href="/services" className="hover:text-slate-900 transition-colors">Campaign Production</Link></li>
            <li><Link href="/case-studies" className="hover:text-slate-900 transition-colors">Case Studies & ROI</Link></li>
            <li><Link href="/about" className="hover:text-slate-900 transition-colors">Our Story & Team</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 font-mono">
            Resources & Legal
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
            <li><Link href="/dpa" className="hover:text-slate-900 transition-colors">Data Processing (DPA)</Link></li>
            <li><Link href="/refund-policy" className="hover:text-slate-900 transition-colors">Escrow & Refund Policy</Link></li>
            <li><Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing & Commission</Link></li>
            <li><Link href="/login" className="hover:text-slate-900 transition-colors">Member Sign In</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Collably Inc. All rights reserved.</p>
        <p className="font-mono text-[11px] text-slate-500">
          The Premier Creator × Brand Collaboration Platform
        </p>
      </div>
    </footer>
  );
}
