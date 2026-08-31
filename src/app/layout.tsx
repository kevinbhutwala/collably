import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { CommandPalette } from "@/components/navigation/CommandPalette";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Collably | The Premier Creator × Brand Collaboration Workspace",
  description:
    "Where world-class creators and high-growth brands collaborate. Milestone payment protection, 4K timecoded video review, and instant automated creator payouts.",
  keywords: [
    "collably",
    "creator marketplace",
    "influencer marketing platform",
    "brand partnerships",
    "creator crm",
    "creator escrow",
    "milestone payments",
    "video review player",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-screen bg-[#FAFBFC] text-slate-900 antialiased font-sans selection:bg-indigo-500/15 selection:text-indigo-600">
        {children}
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
