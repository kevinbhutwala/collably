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
        /* Ultramarine Palette */
        ultramarine: {
          DEFAULT: "#3047FF",
          50: "#EEF0FF",
          100: "#DDE1FF",
          200: "#BCC4FF",
          300: "#9BA7FF",
          400: "#6B7CFF",
          500: "#3047FF",
          600: "#1726C7",
          700: "#0E1A9E",
          800: "#08106B",
          900: "#040838",
        },
        /* Infrared Palette */
        infrared: {
          DEFAULT: "#FF3B30",
          50: "#FFF0EE",
          100: "#FFE1DC",
          200: "#FFC2B9",
          300: "#FFA396",
          400: "#FF6F63",
          500: "#FF3B30",
          600: "#D92218",
          700: "#A8140C",
          800: "#750B05",
          900: "#420401",
        },
        /* Editorial Neutrals */
        editorial: {
          black: "#08090C",
          charcoal: "#1A1C23",
          slate: "#4B5563",
          muted: "#6B7280",
          border: "#E6E6E8",
          surface: "#F6F7F9",
          canvas: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        serif: ["Playfair Display", "Instrument Serif", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        editorial: "0 20px 60px rgba(8, 9, 12, 0.06)",
        "editorial-lg": "0 30px 80px rgba(8, 9, 12, 0.09)",
        "ultramarine-glow": "0 10px 30px rgba(48, 71, 255, 0.20)",
        "infrared-glow": "0 10px 30px rgba(255, 59, 48, 0.20)",
      },
    },
  },
  plugins: [],
};

export default config;
