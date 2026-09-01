"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Architectural Base Canvas #FAFAF8 */}
      <div className="absolute inset-0 bg-[#FAFAF8]" />

      {/* Chrome Environmental Sheen & Micro-Accent Glow (#FFD21F @ 15% 15% + Chrome Sheen) */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(255, 210, 31, 0.12) 0%, transparent 28%),
            radial-gradient(circle at 85% 25%, rgba(217, 217, 214, 0.5) 0%, transparent 35%),
            radial-gradient(circle at 50% 85%, rgba(191, 193, 196, 0.3) 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle Studio Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
