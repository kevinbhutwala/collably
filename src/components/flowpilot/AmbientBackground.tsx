"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#FAFBFC] transform-gpu">
      {/* Soft Luminous Diffused Indigo & Coral Glow (Linear / Stripe style aesthetic) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[600px] rounded-full bg-gradient-radial from-indigo-100/40 via-sky-50/30 to-transparent blur-[120px] opacity-70 transform-gpu pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-radial from-rose-100/25 via-orange-50/20 to-transparent blur-[130px] transform-gpu pointer-events-none" />
      <div className="absolute top-2/3 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-radial from-amber-50/30 via-slate-100/20 to-transparent blur-[130px] transform-gpu pointer-events-none" />

      {/* Subtle Precision Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 25%, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}
