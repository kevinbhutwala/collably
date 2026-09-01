import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { CommandPalette } from "@/components/navigation/CommandPalette";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Collably | Creator Commerce & Milestone Collaboration Workspace",
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
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-screen bg-[#FAFAF8] text-[#111111] antialiased font-sans selection:bg-[#B7FF3C] selection:text-[#111111]">
        {children}
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
