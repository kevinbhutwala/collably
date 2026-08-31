"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, CheckCircle2, MessageSquare, Sparkles, ShieldCheck, Video, Clock } from "lucide-react";
import confetti from "canvas-confetti";

export function VideoReviewDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:42");
  const [approved, setApproved] = useState(false);

  const comments = [
    {
      time: "00:14",
      author: "Growth Marketer (Sponsor)",
      text: "Hook pacing is punchy! Crisp transition into product interface demo.",
      resolved: true,
    },
    {
      time: "00:42",
      author: "Creative Director",
      text: "Updated the lower-third CTA badge with coupon code. Perfect color match.",
      resolved: true,
    },
    {
      time: "01:08",
      author: "Legal & Rights QA",
      text: "FTC disclosure audio statement confirmed. Ready for full commercial approval.",
      resolved: true,
    },
  ];

  const handleApprove = () => {
    setApproved(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF5E3A", "#F97316", "#FBBF24", "#10B981"],
    });
  };

  return (
    <section className="py-28 bg-[#05070D] border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-mono font-bold text-brand-accent">
              <Video className="w-3.5 h-3.5" />
              <span>Interactive 4K Video Review Player</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              Frame-accurate deliverable reviews.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans">
              Review 4K video drafts with timecoded notes, instant version comparison, and one-click milestone payout approval.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setApproved(false);
                setCurrentTime("00:42");
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-mono font-bold text-slate-300 hover:text-white transition-all"
            >
              Reset Player Demo
            </button>
          </div>
        </div>

        {/* Video Player Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Simulated 4K Player Frame */}
          <div className="lg:col-span-7 rounded-3xl bg-[#090D1A] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-bold">Elena Rostova • Next-Gen AI Review (4K Cut v2)</span>
              </div>
              <span className="text-brand-accent font-bold">1080p 60fps</span>
            </div>

            {/* Video Canvas Stage */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-white/10 overflow-hidden flex flex-col justify-between p-6 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              {/* Floating Top Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white border border-white/15 font-bold">
                  TIMECODE: {currentTime}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/30">
                  MILESTONE: $3,200 LOCKED
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-2xl"
                  aria-label="Play / Pause"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 text-white" />}
                </button>
              </div>

              {/* Bottom Scrubber & Time Markers */}
              <div className="relative z-10 space-y-2">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                  <div className="bg-gradient-to-r from-brand-accent to-orange-500 h-full w-[45%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>00:42 / 01:30</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Ready for Sign-Off
                  </span>
                </div>
              </div>
            </div>

            {/* Approve Button */}
            <div className="pt-2">
              {approved ? (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
                  <span className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Milestone Approved! \$2,880 Disbursed to Creator.
                  </span>
                  <span className="text-white font-bold font-mono">STATUS: PAID</span>
                </div>
              ) : (
                <button
                  onClick={handleApprove}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all font-sans"
                  data-cursor="APPROVE"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Deliverable &amp; Release Payout (\$3,200)</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Timecoded Comments Stream */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
              <span className="text-white font-bold uppercase">Timecoded Review Notes</span>
              <span>3 Comments</span>
            </div>

            <div className="space-y-3">
              {comments.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentTime(c.time)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                    currentTime === c.time
                      ? "bg-slate-900 border-brand-accent/50 shadow-lg"
                      : "bg-[#090D1A]/70 border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                    <span className="font-bold text-brand-accent flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> @ {c.time}
                    </span>
                    <span className="text-slate-400 text-[11px]">{c.author}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
