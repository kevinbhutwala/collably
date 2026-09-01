"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Editorial Canvas Base */}
      <div className="absolute inset-0 bg-[#FFFFFF]" />

      {/* Dual Independent Studio Light Sources (Ultramarine @ 20% 20% + Infrared @ 80% 30%) */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at 18% 18%, rgba(48, 71, 255, 0.18) 0%, transparent 35%),
            radial-gradient(circle at 82% 28%, rgba(255, 59, 48, 0.12) 0%, transparent 32%),
            radial-gradient(circle at 50% 85%, rgba(48, 71, 255, 0.08) 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle Studio Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#08090C 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
