"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("abeycollab_theme") || localStorage.getItem("collably_theme")) as "light" | "dark" | null;
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("abeycollab_theme", nextTheme);
    localStorage.setItem("collably_theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  };


  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={cn(
        "relative p-2 rounded-xl border transition-all select-none hover-lift active:scale-95",
        theme === "dark"
          ? "bg-[#181824] border-white/10 text-[#FFD21F] hover:bg-[#202030]"
          : "bg-white border-black/8 text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5",
        className
      )}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-label={`Toggle theme (currently ${theme})`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 transition-transform -rotate-90 scale-100" />
      )}
    </button>
  );
}
