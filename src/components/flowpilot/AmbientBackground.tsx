"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#FCFDFF] transform-gpu">
      {/* Soft Warm Static Ambient Glows (Optimized for 120fps hardware scroll without repaint lag) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[650px] rounded-full bg-gradient-radial from-orange-200/40 via-rose-200/25 to-transparent blur-[120px] opacity-75 transform-gpu pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-radial from-pink-200/30 via-orange-100/20 to-transparent blur-[140px] transform-gpu pointer-events-none" />
      <div className="absolute top-2/3 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-radial from-amber-100/35 via-rose-100/25 to-transparent blur-[140px] transform-gpu pointer-events-none" />

      {/* Subtle Modern Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 20%, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}
