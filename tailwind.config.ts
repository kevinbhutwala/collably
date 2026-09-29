import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".never-active-dark-mode"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        /* Solar Gold & Obsidian Authority Palette */
        brand: {
          solar: "#FFD21F",
          "solar-hover": "#FFC700",
          "solar-active": "#E5A500",
          "solar-amber": "#F59E0B",
          obsidian: "#0A0A0E",
          carbon: "#12121A",
          "carbon-light": "#1A1A24",
          trust: "#10B981",
          "trust-dark": "#059669",
        },
        canvas: "#FAFAF8",
        carbon: "#0A0A0E",
        "ink-primary": "#0A0A0E",
        "ink-secondary": "#4A4A58",
        "ink-muted": "#7A7A8C",
        "stone-text": "#5A5A68",
        "stone-border": "#E8E8EE",
        "micro-accent": "#FFD21F",
        "micro-accent-dark": "#FFC700",
        "micro-accent-soft": "#FFF8D6",
        /* Editorial Accents */
        trust: "#10B981",
        ultramarine: "#3047FF",
        infrared: "#FF3B30",
      },
      backgroundImage: {
        "chrome-linear":
          "linear-gradient(135deg, #FFFFFF 0%, #D9D9D6 25%, #FFFFFF 50%, #BFC1C4 75%, #FFFFFF 100%)",
        "chrome-subtle":
          "linear-gradient(180deg, #FFFFFF 0%, #F4F4F0 100%)",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        sans: ["var(--font-jakarta)", "'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        ui: ["var(--font-jakarta)", "'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        editorial: ["var(--font-instrument)", "'Instrument Serif'", "Georgia", "serif"],
        serif: ["var(--font-instrument)", "'Instrument Serif'", "Georgia", "serif"],
        mono: ["var(--font-mono)", "'JetBrains Mono'", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        editorial: "0 10px 30px rgba(16, 16, 16, 0.04)",
        "editorial-lg": "0 20px 50px rgba(16, 16, 16, 0.07)",
        "solar-glow": "0 4px 20px rgba(255, 210, 31, 0.35)",
        "solar-glow-lg": "0 8px 32px rgba(255, 210, 31, 0.50)",
        "trust-glow": "0 4px 20px rgba(16, 185, 129, 0.30)",
        "micro-glow": "0 0 20px rgba(255, 210, 31, 0.35)",
        "ultramarine-glow": "0 0 25px rgba(48, 71, 255, 0.25)",
        "infrared-glow": "0 0 25px rgba(255, 59, 48, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
