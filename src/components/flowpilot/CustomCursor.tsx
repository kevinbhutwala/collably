"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const checkTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(checkTouch);
    if (checkTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over element with custom cursor attribute
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor]") as HTMLElement | null;
      const clickableEl = target?.closest("button, a, input, [role='button']") as HTMLElement | null;

      if (interactiveEl) {
        setCursorText(interactiveEl.getAttribute("data-cursor") || "");
        setIsHovered(true);
      } else if (clickableEl) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary Outer Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.85 : isHovered ? (cursorText ? 2.6 : 1.8) : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
        className={`fixed flex items-center justify-center rounded-full transition-colors ${
          cursorText
            ? "h-14 w-14 bg-white/95 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-2xl backdrop-blur-md"
            : isHovered
            ? "h-10 w-10 border border-brand-accent/80 bg-brand-accent/15 backdrop-blur-xs"
            : "h-6 w-6 border border-white/40 bg-white/10"
        }`}
      >
        {cursorText && (
          <span className="scale-90 select-none font-mono font-bold tracking-tight">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Tiny Center Dot */}
      {!cursorText && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className={`fixed h-1.5 w-1.5 rounded-full ${
            isHovered ? "bg-brand-accent scale-150" : "bg-white"
          } transition-all duration-150`}
        />
      )}
    </div>
  );
}
