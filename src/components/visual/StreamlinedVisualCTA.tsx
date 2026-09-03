"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";

const AVATAR_STRIP = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
];

export function StreamlinedVisualCTA() {
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] select-none relative overflow-hidden border-t border-black/6 dark:border-white/10 font-sans">
      {/* Ambient Pulsing Gold Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[350px] bg-[#FFD21F]/20 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto text-center space-y-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F5] dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-tight text-[#0A0A0E] dark:text-white uppercase">
            SCALE YOUR CAMPAIGN
          </span>
        </div>

        {/* Clean Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0A0A0E] dark:text-white">
          Ready to scale your next{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700]">
            creator drop?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#5A5A68] dark:text-[#8E8EA4] max-w-lg mx-auto leading-relaxed font-sans font-normal">
          Join 50,000+ creators and forward-thinking brands running 4K campaigns with 100% milestone escrow protection.
        </p>

        {/* Overlapping Mini Avatar Strip */}
        <div className="flex items-center justify-center -space-x-3 pt-2">
          {AVATAR_STRIP.map((url, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15, zIndex: 10 }}
              className="w-12 h-12 rounded-full border-2 border-white dark:border-[#14141E] overflow-hidden shadow-sm bg-black shrink-0 relative transition-transform"
            >
              <SafeImage
                src={url}
                alt={`Creator ${i + 1}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setRoleModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,210,31,0.5)] flex items-center justify-center gap-2 group active:scale-[0.98] border border-black/10 font-sans hover-lift"
          >
            <span>Launch Campaign Brief</span>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
          </button>

          <Link href="/creator/register">
            <button className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#14141E] dark:hover:bg-[#1E1E2C] border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98] flex items-center justify-center gap-2 hover-lift">
              <Sparkles className="w-4 h-4 text-[#8A7000] dark:text-[#FFD21F]" />
              <span>Join as a Creator</span>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Role Selection Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title="Join the Creative Network"
        description="Select your pathway to post campaign briefs or showcase your verified creator media kit."
        maxWidth="md"
      >
        <div className="space-y-3 pt-2 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#1A1A28] border-2 border-[#FFD21F] hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
          >
            <div>
              <h4 className="text-sm font-bold font-display text-[#0A0A0E] dark:text-white">I am a Brand / Business</h4>
              <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">Post campaign briefs, hire creators &amp; escrow funds</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] dark:text-[#FFD21F] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FAFAFC] dark:bg-[#14141E] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#1C1C28] hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
          >
            <div>
              <h4 className="text-sm font-bold font-display text-[#0A0A0E] dark:text-white">I am a Content Creator</h4>
              <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">Publish media kit, receive inbound deals &amp; get paid</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] dark:text-[#FFD21F] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Modal>
    </section>
  );
}
