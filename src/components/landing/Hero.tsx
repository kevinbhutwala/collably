"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Zap,
  CheckCircle2,
  Play,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-white">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-orange-100/60 via-purple-50/40 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping" />
              <span className="font-bold text-slate-900">Collably</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">Where top brands meet creators that move people</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
          >
            Creators that make{" "}
            <span className="bg-gradient-to-r from-brand-accent via-orange-600 to-amber-600 bg-clip-text text-transparent">
              brands matter.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            We connect ambitious brands with vetted creators who build attention, trust, and measurable action — backed by smart escrow and automated deliverable pipelines.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/app/brand/campaigns/create">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowUpRight className="w-5 h-5" />}
                className="w-full sm:w-auto text-base shadow-xl shadow-brand-accent/25"
              >
                Start a Campaign
              </Button>
            </Link>

            <Link href="/creator/register">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Sparkles className="w-4 h-4 text-amber-500" />}
                className="w-full sm:w-auto text-base"
              >
                Join as a Creator
              </Button>
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Escrow Protection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-accent" />
              <span>Verified Audience Analytics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              <span>Avg 4.8x Campaign ROI</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual Composition: Floating Collaboration Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="relative rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-elevated overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/30 via-transparent to-purple-50/20 pointer-events-none" />

            {/* Mock Collaboration Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Creator"
                      fallbackType="creator"
                      fallbackName="Elena Rostova"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    LD
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Linear Dynamics × Elena Rostova
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">Live Campaign Workspace • Tranche 1 Released</p>
                </div>
              </div>

              <Badge variant="success" size="sm" dot>
                Approved Deliverable
              </Badge>
            </div>

            {/* 3-Column Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Creator Stats */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Creator Performance</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-slate-900">485K+</div>
                <p className="text-xs text-slate-600">Total verified reach across YouTube & X</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Engagement:</span>
                  <span className="text-emerald-600 font-bold">6.4%</span>
                </div>
              </div>

              {/* Card 2: Campaign Deliverable Preview */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Active Deliverable</span>
                  <Badge variant="purple" size="sm">YouTube 60s</Badge>
                </div>
                <div className="relative h-20 rounded-xl overflow-hidden bg-slate-200 group shadow-inner">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
                    alt="Video preview"
                    fallbackType="campaign"
                    fallbackName="Video Preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center text-slate-900">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-slate-900 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified 4K
                  </span>
                </div>
              </div>

              {/* Card 3: Escrow & ROI */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Escrow Security</span>
                  <Badge variant="glow" size="sm">Protected</Badge>
                </div>
                <div className="text-3xl font-extrabold font-mono text-emerald-600">$3,500.00</div>
                <p className="text-xs text-slate-600">Funds locked until final video sign-off</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Payout Speed:</span>
                  <span className="text-slate-900 font-bold">Instant Release</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
