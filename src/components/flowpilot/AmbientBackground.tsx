"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#08080c] transform-gpu">
      {/* Radiant Sunset Orange & Pink-Orange Ambient Mesh Aura */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1300px] h-[750px] rounded-full bg-gradient-radial from-orange-500/20 via-rose-500/15 to-transparent blur-[140px] opacity-90 transform-gpu pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-radial from-pink-500/18 via-orange-500/12 to-transparent blur-[150px] transform-gpu pointer-events-none" />
      <div className="absolute top-2/3 -left-32 w-[700px] h-[700px] rounded-full bg-gradient-radial from-rose-500/18 via-amber-500/12 to-transparent blur-[150px] transform-gpu pointer-events-none" />

      {/* Subtle Precision Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
        }}
      />
    </div>
  );
}
