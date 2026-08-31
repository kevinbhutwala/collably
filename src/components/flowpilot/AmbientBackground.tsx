"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#0a070a] transform-gpu">
      {/* anchorhetvi.com Velvet Magenta & Royal Violet Radiant Mesh Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1300px] h-[700px] rounded-full bg-[radial-gradient(closest-side,hsl(327_100%_46%/0.25),transparent)] blur-[120px] opacity-80 transform-gpu pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(closest-side,hsl(300_100%_42%/0.20),transparent)] blur-[140px] transform-gpu pointer-events-none" />
      <div className="absolute top-2/3 -left-32 w-[650px] h-[650px] rounded-full bg-[radial-gradient(closest-side,#d4af37/0.12,transparent)] blur-[140px] transform-gpu pointer-events-none" />

      {/* Floating Gold Sparkle Stars (Signature to anchorhetvi.com) */}
      <span className="pointer-events-none absolute z-10 rounded-full bg-gold/60" style={{ top: "14%", left: "7%", width: "3px", height: "3px" }} />
      <span className="pointer-events-none absolute z-10 rounded-full bg-gold/50" style={{ top: "22%", left: "91%", width: "2px", height: "2px" }} />
      <span className="pointer-events-none absolute z-10 rounded-full bg-gold/70" style={{ top: "58%", left: "5%", width: "4px", height: "4px" }} />
      <span className="pointer-events-none absolute z-10 rounded-full bg-gold/60" style={{ top: "72%", left: "87%", width: "3px", height: "3px" }} />
      <span className="pointer-events-none absolute z-10 rounded-full bg-gold/50" style={{ top: "33%", left: "77%", width: "3px", height: "3px" }} />

      {/* Subtle Dark Luxury Mesh Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 25%, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}
