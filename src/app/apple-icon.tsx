import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  const iconPath = path.join(process.cwd(), "public/branding/abeycollab-icon-square.png");
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
          borderRadius: 36,
          overflow: "hidden",
          background: "#181b22",
          border: "3px solid rgba(255, 210, 31, 0.6)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${iconData}`}
          width="180"
          height="180"
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
