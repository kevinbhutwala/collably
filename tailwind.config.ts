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
        /* User Specific Theme Colors */
        canvas: "#FAFAF8",
        carbon: "#111111",
        "stone-text": "#6B6B6B",
        "stone-border": "#E7E7E4",
        "micro-accent": "#B7FF3C",
        "micro-accent-dark": "#9EE61C",
        "micro-accent-soft": "#F4FFE0",
      },
      backgroundImage: {
        "chrome-linear":
          "linear-gradient(135deg, #FFFFFF 0%, #D9D9D6 25%, #FFFFFF 50%, #BFC1C4 75%, #FFFFFF 100%)",
        "chrome-subtle":
          "linear-gradient(180deg, #FFFFFF 0%, #F4F4F0 100%)",
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
        editorial: "0 20px 60px rgba(17, 17, 17, 0.05)",
        "editorial-lg": "0 30px 80px rgba(17, 17, 17, 0.08)",
        "micro-glow": "0 0 25px rgba(183, 255, 60, 0.40)",
      },
    },
  },
  plugins: [],
};

export default config;
