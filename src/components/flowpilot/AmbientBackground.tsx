"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AmbientBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 45, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 120 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x * 90);
      mouseY.set(y * 90);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#FCFDFF]">
      {/* Soft Warm Radial Gradient Blobs (Orange, Pink, Rose, Amber) */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[650px] rounded-full bg-gradient-to-tr from-orange-200/40 via-rose-200/30 to-pink-200/40 blur-[140px] opacity-80"
      />

      {/* Secondary Corner Glows */}
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-pink-200/30 via-orange-100/30 to-transparent blur-[160px]" />
      <div className="absolute top-2/3 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-100/40 via-rose-100/30 to-transparent blur-[160px]" />

      {/* Modern Grid Lines Mask */}
      <div
        className="absolute inset-0 opacity-[0.03]"
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
