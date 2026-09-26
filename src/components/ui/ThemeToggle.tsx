"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme =
        (localStorage.getItem("abeycollab_theme") as "light" | "dark") ||
        (localStorage.getItem("collably_theme") as "light" | "dark");

      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.style.colorScheme = "dark";
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.style.colorScheme = "light";
        }
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      }
    } catch (e) {
      // Ignore localStorage security errors in sandbox/iframe
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    try {
      localStorage.setItem("abeycollab_theme", nextTheme);
      localStorage.setItem("collably_theme", nextTheme);
    } catch (e) {}

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-full border border-black/8 dark:border-white/10 bg-[#F4F4F8] dark:bg-[#14141E] opacity-70",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative p-2 rounded-full border border-black/8 dark:border-white/12 bg-[#F4F4F8] dark:bg-[#14141E] hover:bg-[#EBEBF0] dark:hover:bg-[#1E1E2C] text-[#0A0A0E] dark:text-[#FFD21F] transition-all active:scale-95 shadow-xs flex items-center gap-2 group select-none",
        className
      )}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-[#FFD21F] fill-[#FFD21F]/20 group-hover:scale-110 transition-transform" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-[#D99B00] group-hover:rotate-45 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-bold text-[#5A5A68] dark:text-[#A0A0B4]">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
    </button>
  );
}
