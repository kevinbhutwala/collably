"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  gradientWords?: string[];
  gradientClass?: string;
  as?: "h2" | "h3" | "p" | "div";
}

export function ScrollRevealText({
  children,
  className = "",
  gradientWords = [],
  gradientClass = "bg-gradient-to-r from-brand-accent via-rose-500 to-pink-500 bg-clip-text text-transparent font-black",
  as = "h2",
}: ScrollRevealTextProps) {
  const words = children.split(" ");
  const Component = as;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative select-none"
    >
      <Component className={className}>
        {words.map((word, i) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9$]/g, "").toLowerCase();
          const isGradient = gradientWords.some(
            (gw) => gw.toLowerCase() === cleanWord || word.toLowerCase().includes(gw.toLowerCase())
          );

          return (
            <span
              key={i}
              className={`inline-block mr-[0.26em] my-[0.03em] ${
                isGradient ? gradientClass : ""
              }`}
            >
              {word}
            </span>
          );
        })}
      </Component>
    </motion.div>
  );
}
