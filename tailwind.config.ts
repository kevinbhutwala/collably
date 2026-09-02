import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
        /* User Exact Theme Colors */
        canvas: "#FAFAF8",
        carbon: "#101010",
        "ink-primary": "#101010",
        "ink-secondary": "#626262",
        "ink-muted": "#8A8A8A",
        "stone-text": "#626262",
        "stone-border": "#E7E7E4",
        "micro-accent": "#B7FF3C",
        "micro-accent-dark": "#9EE61C",
        "micro-accent-soft": "#F4FFE0",
        /* Editorial Accents */
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
        "micro-glow": "0 0 20px rgba(183, 255, 60, 0.35)",
        "ultramarine-glow": "0 0 25px rgba(48, 71, 255, 0.25)",
        "infrared-glow": "0 0 25px rgba(255, 59, 48, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
