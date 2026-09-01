"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FCFCFA]">
      {/* Primary Hero Atmosphere (Subtle Emerald/Mint environmental lighting) */}
      <div
        className="absolute top-0 right-0 w-[1000px] h-[650px] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 60% 25%, rgba(172, 235, 210, 0.75) 0%, rgba(235, 248, 241, 0.45) 30%, rgba(255,255,255,0) 68%)",
        }}
      />

      {/* Secondary Atmosphere */}
      <div
        className="absolute top-[45%] left-0 w-[800px] h-[600px] opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(224, 242, 234, 0.6) 0%, transparent 55%)",
        }}
      />

      {/* Bottom Soft Mint Ambient Lift */}
      <div
        className="absolute bottom-0 right-[15%] w-[700px] h-[500px] opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(234, 248, 242, 0.8) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
