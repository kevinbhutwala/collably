import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation for browser tab icon / favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0F19",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          border: "1.5px solid #FF4D00",
          boxShadow: "0 0 10px rgba(255, 77, 0, 0.4)",
          position: "relative",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 10C22.2 7.5 19.3 6 16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C19.3 26 22.2 24.5 24 22"
            stroke="#FF4D00"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="3.5" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
