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

        /* ── CENTRAL PRODUCT THEME SYSTEM (Change in globals.css) ── */
        primary: {
          DEFAULT: "rgb(var(--theme-primary-rgb) / <alpha-value>)",
          hover: "rgb(var(--theme-primary-hover-rgb) / <alpha-value>)",
          active: "var(--theme-primary-active)",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "rgb(var(--theme-accent-rgb) / <alpha-value>)",
          hover: "rgb(var(--theme-accent-hover-rgb) / <alpha-value>)",
          foreground: "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
        },
        midnight: {
          DEFAULT: "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
          light: "#121020",
          card: "#1A172E",
        },
        canvas: {
          DEFAULT: "rgb(var(--theme-canvas-rgb) / <alpha-value>)",
        },
        theme: {
          primary: "rgb(var(--theme-primary-rgb) / <alpha-value>)",
          accent: "rgb(var(--theme-accent-rgb) / <alpha-value>)",
          midnight: "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
          canvas: "rgb(var(--theme-canvas-rgb) / <alpha-value>)",
        },
        brand: {
          primary: "rgb(var(--theme-primary-rgb) / <alpha-value>)",
          purple: "rgb(var(--theme-primary-rgb) / <alpha-value>)",
          "purple-hover": "rgb(var(--theme-primary-hover-rgb) / <alpha-value>)",
          "purple-active": "var(--theme-primary-active)",
          lilac: "rgb(var(--theme-accent-rgb) / <alpha-value>)",
          accent: "rgb(var(--theme-accent-rgb) / <alpha-value>)",
          midnight: "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
          canvas: "rgb(var(--theme-canvas-rgb) / <alpha-value>)",
          obsidian: "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
          carbon: "#121020",
          "carbon-light": "#1A172E",
          trust: "#10B981",
          "trust-dark": "#059669",
          /* Compatibility aliases */
          solar: "rgb(var(--theme-primary-rgb) / <alpha-value>)",
          "solar-hover": "rgb(var(--theme-primary-hover-rgb) / <alpha-value>)",
          "solar-active": "var(--theme-primary-active)",
          "solar-amber": "rgb(var(--theme-accent-rgb) / <alpha-value>)",
        },

        /* Map amber so any amber classes throughout legacy code dynamically reflect the theme */
        amber: {
          50: "rgb(var(--theme-primary-rgb) / 0.05)",
          100: "rgb(var(--theme-primary-rgb) / 0.10)",
          200: "rgb(var(--theme-primary-rgb) / 0.20)",
          300: "rgb(var(--theme-accent-rgb) / 0.45)",
          400: "rgb(var(--theme-accent-rgb) / <alpha-value>)",
          500: "rgb(var(--theme-primary-rgb) / <alpha-value>)",
          600: "rgb(var(--theme-primary-hover-rgb) / <alpha-value>)",
          700: "var(--theme-primary-active)",
          800: "#4C1D95",
          900: "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
          950: "#06050B",
        },

        carbon: "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
        "ink-primary": "rgb(var(--theme-midnight-rgb) / <alpha-value>)",
        "ink-secondary": "#474554",
        "ink-muted": "#79768F",
        "stone-text": "#545266",
        "stone-border": "#E2E8F0",
        "micro-accent": "rgb(var(--theme-primary-rgb) / <alpha-value>)",
        "micro-accent-dark": "rgb(var(--theme-primary-hover-rgb) / <alpha-value>)",
        "micro-accent-soft": "rgb(var(--theme-primary-rgb) / 0.12)",
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
        editorial: "0 10px 30px rgba(var(--theme-midnight-rgb), 0.04)",
        "editorial-lg": "0 20px 50px rgba(var(--theme-midnight-rgb), 0.07)",
        "theme-glow": "0 4px 20px rgba(var(--theme-primary-rgb), 0.35)",
        "theme-glow-lg": "0 8px 32px rgba(var(--theme-primary-rgb), 0.50)",
        "purple-glow": "0 4px 20px rgba(var(--theme-primary-rgb), 0.35)",
        "purple-glow-lg": "0 8px 32px rgba(var(--theme-primary-rgb), 0.50)",
        "solar-glow": "0 4px 20px rgba(var(--theme-primary-rgb), 0.35)",
        "solar-glow-lg": "0 8px 32px rgba(var(--theme-primary-rgb), 0.50)",
        "trust-glow": "0 4px 20px rgba(16, 185, 129, 0.30)",
        "micro-glow": "0 0 20px rgba(var(--theme-primary-rgb), 0.35)",
        "ultramarine-glow": "0 0 25px rgba(48, 71, 255, 0.25)",
        "infrared-glow": "0 0 25px rgba(255, 59, 48, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
