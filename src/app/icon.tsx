import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

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
          background: "linear-gradient(135deg, #181820 0%, #08080C 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9,
          border: "1.5px solid rgba(255, 210, 31, 0.6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Arc */}
          <path
            d="M45 19.5 C39 12.5 28 12 21 17.5 C13 23.5 13 36.5 21 42.5 C27.5 47.5 38 48 45 40.5"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Arc */}
          <path
            d="M26 24 C29 20 37 19.5 42 24.5 C47 29.5 46 37 40 40"
            stroke="#FFD21F"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Solar Center Spark */}
          <circle cx="43.5" cy="32" r="5.5" fill="#FFD21F" />
          <circle cx="43.5" cy="32" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
