import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Dynamic browser tab icon generation
export default function Icon() {
  const iconPath = path.join(process.cwd(), "public/branding/abeycollab-icon-32.png");
  const iconData = fs.readFileSync(iconPath).toString("base64");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          overflow: "hidden",
          background: "#181b22",
          border: "1px solid rgba(255, 210, 31, 0.5)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${iconData}`}
          width="32"
          height="32"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="AbeyCollab"
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
