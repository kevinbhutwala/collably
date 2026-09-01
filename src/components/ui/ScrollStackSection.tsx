"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  // Calculate subtle scale and opacity effect for overlapping realism
  const scale = useTransform(scrollYProgress, [0, 1], isFirst ? [1, 1] : [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], isFirst ? [1, 1, 1] : [0.85, 0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], isFirst ? [0, 0] : [60, 0]);

  // Increasing z-index so each subsequent section sits on top of previous
  const zIndex = (index + 1) * 10;

  return (
    <div
      ref={containerRef}
      style={{ zIndex }}
      className={cn(
        "relative w-full transition-all will-change-transform",
        !isFirst && "-mt-10 sm:-mt-14 lg:-mt-20",
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
          "w-full transition-shadow duration-300",
          !isFirst &&
            "rounded-t-[2rem] sm:rounded-t-[3rem] lg:rounded-t-[3.5rem] shadow-[0_-25px_60px_rgba(0,0,0,0.07)] border-t border-black/8 overflow-hidden bg-white"
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
