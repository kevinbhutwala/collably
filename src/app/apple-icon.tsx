import { ImageResponse } from "next/og";


export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0E0E14 0%, #0A0A0E 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          border: "4px solid rgba(255, 210, 31, 0.7)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          width="116"
          height="116"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Abey Creator Arch (Letter "A" dynamic left ramp and crown apex) */}
          <path
            d="M12 39L23.1 9.8C23.5 8.7 24.5 8 25.7 8C26.9 8 27.9 8.7 28.3 9.8L38 35"
            stroke="#FFD21F"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 2. Brand Partnership Synergy Loop & Deal Crossbar */}
          <path
            d="M16 28.5C16 23 20 18.5 25.5 18.5C31.5 18.5 35.5 23 35.5 28.5C35.5 34 31 38 25.5 38C19.5 38 15 33.5 22 28.5H38"
            stroke="#FFFFFF"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Escrow Settlement Node (Deal Core at nexus of creator and brand) */}
          <circle cx="24.5" cy="27.5" r="3.2" fill="#FFD21F" />
          <circle cx="24.5" cy="27.5" r="1.3" fill="#0A0A0E" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
