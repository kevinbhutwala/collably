"use client";

import React, { useState } from "react";
import { Play, Pause, CheckCircle2, Video, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function VideoReviewDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:42");
  const [approved, setApproved] = useState(false);

  const comments = [
    {
      time: "00:14",
      author: "Growth Marketer (Sponsor)",
      text: "Hook pacing is punchy! Crisp transition into product interface demo.",
    },
    {
      time: "00:42",
      author: "Creative Director",
      text: "Updated the lower-third CTA badge with coupon code. Perfect color match.",
    },
    {
      time: "01:08",
      author: "Legal & Rights QA",
      text: "FTC disclosure audio statement confirmed. Ready for full commercial approval.",
    },
  ];

  const handleApprove = () => {
    setApproved(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF5E3A", "#F43F5E", "#FBBF24", "#10B981"],
    });
  };

  return (
    <section className="py-24 sm:py-28 bg-slate-50/60 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header with Scroll Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
              <Video className="w-3.5 h-3.5" />
              <span>Interactive 4K Video Review Player</span>
            </div>

            <ScrollRevealText
              as="h2"
              gradientWords={["frame-accurate", "video", "reviews"]}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
            >
              Frame-accurate deliverable reviews.
            </ScrollRevealText>

            <ScrollRevealText
              as="p"
              gradientWords={["timecoded", "version", "one-click", "payout"]}
              className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed"
            >
              Review 4K video drafts with timecoded notes, instant version comparison, and one-click milestone payout approval.
            </ScrollRevealText>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setApproved(false);
                setCurrentTime("00:42");
              }}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-xs"
            >
              Reset Player Demo
            </button>
          </div>
        </div>

        {/* Video Player Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Simulated 4K Player Frame */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-card relative overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-900 font-bold">Elena Rostova • Next-Gen AI Review (4K Cut v2)</span>
              </div>
              <span className="text-brand-accent font-bold">1080p 60fps</span>
            </div>

            {/* Video Canvas Stage */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden flex flex-col justify-between p-6 group shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Floating Top Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white border border-white/15 font-bold">
                  TIMECODE: {currentTime}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/30">
                  MILESTONE: $3,200 LOCKED
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-2xl"
                  aria-label="Play / Pause"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 text-white" />}
                </button>
              </div>

              {/* Bottom Scrubber & Time Markers */}
              <div className="relative z-10 space-y-2">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                  <div className="bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 h-full w-[45%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>00:42 / 01:30</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Ready for Sign-Off
                  </span>
                </div>
              </div>
            </div>

            {/* Approve Button */}
            <div className="pt-2">
              {approved ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono flex items-center justify-between shadow-xs">
                  <span className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Milestone Approved! \$2,880 Disbursed to Creator.
                  </span>
                  <span className="text-emerald-800 font-bold font-mono">STATUS: PAID</span>
                </div>
              ) : (
                <button
                  onClick={handleApprove}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-brand-accent/25 flex items-center justify-center gap-2 transition-all font-sans"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Deliverable &amp; Release Payout (\$3,200)</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Timecoded Comments Stream */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1">
              <span className="text-slate-900 font-bold uppercase">Timecoded Review Notes</span>
              <span>3 Comments</span>
            </div>

            <div className="space-y-3">
              {comments.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentTime(c.time)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                    currentTime === c.time
                      ? "bg-white border-brand-accent shadow-md shadow-brand-accent/15"
                      : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                    <span className="font-bold text-brand-accent flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> @ {c.time}
                    </span>
                    <span className="text-slate-500 text-[11px]">{c.author}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
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
