"use client";

import React from "react";
import Link from "next/link";
import { FlowPilotLogo } from "./FlowPilotLogo";
import { ShieldCheck, Mail, MapPin, Activity, ArrowUpRight } from "lucide-react";

export function CinematicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05070D] text-slate-400 py-16 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <FlowPilotLogo href="/" size="md" subtext="Autonomous Conversational Revenue" />
            <p className="text-slate-500 max-w-sm text-xs font-sans leading-relaxed">
              FlowPilot is the autonomous conversational revenue engine that qualifies inbound intent, handles objection matrices, and books verified high-ticket calendar pipeline 24/7.
            </p>
            <div className="space-y-1 text-slate-500 text-xs">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>kevinbhutwala417@gmail.com</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>FlowPilot Systems Inc. • San Francisco, CA &amp; Mumbai, IN</span>
              </p>
            </div>
          </div>

          {/* Core Modules */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Engine Modules
            </h4>
            <ul className="space-y-2 text-slate-400 font-sans">
              <li><a href="#engine" className="hover:text-white transition-colors">Neural Core Ingest</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">5-Stage Pipeline</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Interactive Chat Replay</a></li>
              <li><a href="#recovery" className="hover:text-white transition-colors">Revenue Recovery ($148k)</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Industry Vertical Models</a></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Legal &amp; Security
            </h4>
            <ul className="space-y-2 text-slate-400 font-sans">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/dpa" className="hover:text-white transition-colors">Data Processing (DPA)</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">SLA &amp; Refund Policy</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors font-bold text-brand-accent">Pricing &amp; ROI →</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">All Edge Regions Operational (Latency: 48ms)</span>
          </div>

          <p>© {new Date().getFullYear()} FlowPilot Systems Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
