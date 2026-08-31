import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.10)",
        input: "rgba(255, 255, 255, 0.12)",
        ring: "hsl(327, 100%, 50%)",
        background: "#0a070a",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "hsl(327, 100%, 50%)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "hsl(300, 100%, 42%)",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#18111c",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "hsl(327, 100%, 50%)",
          foreground: "#ffffff",
        },
        gold: {
          DEFAULT: "#d4af37",
          50: "#fdfbf2",
          100: "#faf4dc",
          200: "#f5e8b7",
          300: "#eed58a",
          400: "#e6be5c",
          500: "#d4af37",
          600: "#b89028",
          700: "#936e20",
          800: "#79571f",
          900: "#67481f",
        },
        magenta: {
          DEFAULT: "hsl(327, 100%, 50%)",
          glow: "hsl(327, 100%, 46%)",
          purple: "hsl(300, 100%, 42%)",
        },
        brand: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f472b6",
          400: "#ec4899",
          500: "#db2777",
          600: "#be185d",
          700: "#9d174d",
          800: "#831843",
          900: "#500724",
          accent: "hsl(327, 100%, 50%)", // Hot Magenta
          purple: "hsl(300, 100%, 42%)", // Royal Purple
          gold: "#d4af37", // Luxury Gold
        },
        surface: {
          DEFAULT: "#120c16",
          subtle: "#18101e",
          muted: "#201428",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "'Outfit'",
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "'JetBrains Mono'",
          "monospace",
        ],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        card: "0 2px 12px -2px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.06)",
        elevated: "0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 0, 128, 0.2)",
        glow: "0 0 35px rgba(255, 0, 128, 0.35)",
        gold: "0 0 30px rgba(212, 175, 55, 0.30)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
