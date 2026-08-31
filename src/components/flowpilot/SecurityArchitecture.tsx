"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Key, Server, Cpu, Database, RefreshCw, Layers } from "lucide-react";

export function SecurityArchitecture() {
  const integrations = [
    { name: "WhatsApp Cloud API", role: "Direct Meta Enterprise Ingest" },
    { name: "Instagram Graph API", role: "DM Lead Routing & Voice Notes" },
    { name: "HubSpot CRM", role: "Two-Way Contact & Deal Sync" },
    { name: "Salesforce CRM", role: "Enterprise Pipeline Automation" },
    { name: "Google & Outlook Calendar", role: "Real-Time Free/Busy Conflict Check" },
    { name: "Stripe Connect", role: "Instant In-Chat Deposit Checkout" },
    { name: "Cal.com & Calendly", role: "Universal Scheduling Engine" },
    { name: "Custom Webhooks (HMAC)", role: "Sub-50ms Event Delivery" },
  ];

  return (
    <section id="security" className="py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Security &amp; Stack Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Seamless integrations. Zero security compromises.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered to plug directly into your existing CRM, calendar infrastructure, and payment rails in under 15 minutes.
          </p>
        </div>

        {/* Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-950 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">SOC2 &amp; HIPAA Ready</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every conversational thread and customer record is protected with AES-256 at rest and TLS 1.3 in transit.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-950 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">Zero Customer Data Training</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your proprietary sales transcripts, objection playbooks, and lead data are never used to train public foundation models.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-950 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">Sub-100ms Global Edge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-region inference routing ensures instant response generation worldwide with 99.98% guaranteed SLA.
            </p>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Native Two-Way Integrations
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">15-Min Setup</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-white/20 transition-all select-none space-y-1"
              >
                <span className="text-xs font-bold text-white font-mono block">
                  {item.name}
                </span>
                <span className="text-[11px] text-slate-400 font-mono block">
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
