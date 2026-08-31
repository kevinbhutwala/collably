"use client";

import React from "react";
import Link from "next/link";

interface FlowPilotLogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  subtext?: string;
  className?: string;
}

export function FlowPilotLogo({
  href = "/",
  size = "md",
  subtext,
  className = "",
}: FlowPilotLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const content = (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Glowing Neon Emblem */}
      <div
        className={`relative flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-glow transition-all duration-500 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 p-[1.5px] ${iconSizes[size]}`}
      >
        <div className="w-full h-full bg-[#05070D] rounded-[inherit] flex items-center justify-center relative overflow-hidden">
          {/* Subtle internal pulse aura */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/30 via-transparent to-amber-500/20 pointer-events-none group-hover:opacity-100 transition-opacity" />

          {/* Precision Flow Pilot Geometry: Telemetry Wave + Conversational Pulse */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/5 h-3/5 relative z-10"
          >
            <path
              d="M6 16C6 10.48 10.48 6 16 6C21.52 6 26 10.48 26 16C26 21.52 21.52 26 16 26"
              stroke="url(#flowPilotGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M11 16L15 20L22 12"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="26" cy="16" r="2.5" fill="#FF5E3A" className="animate-pulse" />
            <defs>
              <linearGradient
                id="flowPilotGrad"
                x1="6"
                y1="6"
                x2="26"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF5E3A" />
                <stop offset="0.5" stopColor="#F97316" />
                <stop offset="1" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-black text-white font-sans tracking-tight leading-none ${textSizes[size]}`}
          >
            FlowPilot
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-[9px] font-mono font-bold uppercase text-brand-accent tracking-widest">
            AI
          </span>
        </div>
        {subtext && (
          <span className="text-[11px] text-slate-400 font-medium tracking-tight mt-1 leading-none font-sans hidden sm:inline">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
