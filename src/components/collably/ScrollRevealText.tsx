"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  gradientWords?: string[];
  gradientClass?: string;
  as?: "h2" | "h3" | "p" | "div";
}

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isGradient: boolean;
  gradientClass: string;
}

function Word({ word, progress, range, isGradient, gradientClass }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <span className="inline-block relative mr-[0.28em] my-[0.05em] align-baseline">
      {/* Ghost background placeholder */}
      <span className="opacity-20 select-none text-slate-400">{word}</span>
      
      {/* Illuminated foreground word on scroll */}
      <motion.span
        style={{ opacity, y }}
        className={`absolute inset-0 ${
          isGradient
            ? gradientClass
            : "text-slate-900"
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function ScrollRevealText({
  children,
  className = "",
  gradientWords = [],
  gradientClass = "bg-gradient-to-r from-brand-accent via-rose-500 to-pink-500 bg-clip-text text-transparent font-extrabold",
  as = "h2",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "center 0.45"],
  });

  const words = children.split(" ");
  const Component = as;

  return (
    <div ref={containerRef} className="relative select-none">
      <Component className={className}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          const cleanWord = word.replace(/[^a-zA-Z0-9$]/g, "").toLowerCase();
          const isGradient = gradientWords.some(
            (gw) => gw.toLowerCase() === cleanWord || word.toLowerCase().includes(gw.toLowerCase())
          );

          return (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
              isGradient={isGradient}
              gradientClass={gradientClass}
            />
          );
        })}
      </Component>
    </div>
  );
}
