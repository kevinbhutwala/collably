"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollStackSectionProps {
  children: React.ReactNode;
  index: number;
  total?: number;
  className?: string;
  isFirst?: boolean;
}

export function ScrollStackSection({
  children,
  index,
  total = 6,
  className,
  isFirst = false,
}: ScrollStackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Apply smooth spring physics to eliminate scroll micro-stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate subtle scale and opacity effect for overlapping realism
  const scale = useTransform(smoothProgress, [0, 1], isFirst ? [1, 1] : [0.98, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.25, 1], isFirst ? [1, 1, 1] : [0.9, 0.98, 1]);
  const y = useTransform(smoothProgress, [0, 1], isFirst ? [0, 0] : [40, 0]);

  // Increasing z-index so each subsequent section sits on top of previous
  const zIndex = (index + 1) * 10;

  return (
    <div
      ref={containerRef}
      style={{ zIndex }}
      className={cn(
        "relative w-full gpu-accelerated",
        !isFirst && "-mt-8 sm:-mt-12 lg:-mt-16",
        className
      )}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        className={cn(
          "w-full gpu-accelerated",
          !isFirst &&
            "rounded-t-[2rem] sm:rounded-t-[3rem] lg:rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.06)] border-t border-black/8 overflow-hidden bg-white"
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
