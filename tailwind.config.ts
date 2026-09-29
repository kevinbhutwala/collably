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
        /* Midnight Purple Palette */
        brand: {
          midnight: "#0B0A14",
          purple: "#7C3AED",
          "purple-hover": "#6D28D9",
          "purple-active": "#5B21B6",
          lilac: "#C084FC",
          canvas: "#F8FAFC",
          obsidian: "#0B0A14",
          carbon: "#121020",
          "carbon-light": "#1A172E",
          trust: "#10B981",
          "trust-dark": "#059669",
          /* Compatibility aliases */
          solar: "#7C3AED",
          "solar-hover": "#6D28D9",
          "solar-active": "#5B21B6",
          "solar-amber": "#C084FC",
        },
        canvas: "#F8FAFC",
        carbon: "#0B0A14",
        "ink-primary": "#0B0A14",
        "ink-secondary": "#474554",
        "ink-muted": "#79768F",
        "stone-text": "#545266",
        "stone-border": "#E2E8F0",
        "micro-accent": "#7C3AED",
        "micro-accent-dark": "#6D28D9",
        "micro-accent-soft": "#F3E8FF",
        /* Editorial Accents */
        trust: "#10B981",
        ultramarine: "#3047FF",
        infrared: "#FF3B30",
      },
      backgroundImage: {
        "chrome-linear":
          "linear-gradient(135deg, #FFFFFF 0%, #D9D9D6 25%, #FFFFFF 50%, #BFC1C4 75%, #FFFFFF 100%)",
        "chrome-subtle":
          "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
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
        editorial: "0 10px 30px rgba(11, 10, 20, 0.04)",
        "editorial-lg": "0 20px 50px rgba(11, 10, 20, 0.07)",
        "purple-glow": "0 4px 20px rgba(124, 58, 237, 0.35)",
        "purple-glow-lg": "0 8px 32px rgba(124, 58, 237, 0.50)",
        "solar-glow": "0 4px 20px rgba(124, 58, 237, 0.35)",
        "solar-glow-lg": "0 8px 32px rgba(124, 58, 237, 0.50)",
        "trust-glow": "0 4px 20px rgba(16, 185, 129, 0.30)",
        "micro-glow": "0 0 20px rgba(124, 58, 237, 0.35)",
        "ultramarine-glow": "0 0 25px rgba(48, 71, 255, 0.25)",
        "infrared-glow": "0 0 25px rgba(255, 59, 48, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
