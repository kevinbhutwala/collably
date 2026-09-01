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
        border: "#E2E6E1",
        input: "#E2E6E1",
        ring: "#087F5B",
        background: "#FCFCFA",
        foreground: "#101310",
        primary: {
          DEFAULT: "#087F5B",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#075E45",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#C53030",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F1F2EE",
          foreground: "#626862",
        },
        accent: {
          DEFAULT: "#EAF8F2",
          foreground: "#087F5B",
        },
        emerald: {
          DEFAULT: "#087F5B",
          50: "#F2FAF6",
          100: "#EAF8F2",
          200: "#C3EBDA",
          300: "#8DD9BA",
          400: "#4EC296",
          500: "#087F5B", // Primary Emerald
          600: "#075E45", // Deep Emerald
          700: "#064B39", // Dark Emerald
          800: "#053B2D",
          900: "#042D22",
        },
        stone: {
          DEFAULT: "#F1F2EE",
          50: "#FCFCFA",
          100: "#F6F7F3",
          200: "#E2E6E1",
          300: "#D3D9D2",
          400: "#8A908B",
          500: "#626862",
          900: "#101310",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F6F7F3",
          stone: "#F1F2EE",
          border: "#E2E6E1",
        },
      },
      borderRadius: {
        lg: "0.75rem", // 12px
        md: "0.5625rem", // 9px (button radius)
        sm: "0.375rem",
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
        fintech: "0 20px 60px rgba(15, 30, 22, 0.06)",
        card: "0 2px 10px rgba(15, 30, 22, 0.04), 0 0 1px 1px #E2E6E1",
        elevated: "0 24px 70px rgba(15, 30, 22, 0.09)",
        subtle: "0 1px 3px rgba(15, 30, 22, 0.04)",
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
