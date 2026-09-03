import { ImageResponse } from "next/og";


// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Dynamic browser tab icon generation
export default function Icon() {
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
          borderRadius: 9,
          border: "1.5px solid rgba(255, 210, 31, 0.7)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Creator Partnership Arc */}
          <path
            d="M34 14C30 9 22.5 8.5 16.5 13C9.5 18.5 9.5 31.5 16.5 37C22.5 41.5 30 41 34 36"
            stroke="#FFD21F"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Brand Synergy Arc */}
          <path
            d="M20 20C22.5 16.5 28.5 16 33.5 20.5C38.5 25 38.5 33 33.5 37.5C28.5 42 22.5 41.5 20 38"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Escrow Hub Pulse Core */}
          <circle cx="34" cy="27" r="3.5" fill="#FFD21F" />
          <circle cx="34" cy="27" r="1.5" fill="#0A0A0E" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
