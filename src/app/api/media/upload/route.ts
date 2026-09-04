import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Direct media upload has been deprecated and disabled. Please submit external links (Google Drive, Dropbox, Frame.io) instead.",
      deprecated: true,
    },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error: "Direct media upload has been deprecated and disabled. Please submit external links (Google Drive, Dropbox, Frame.io) instead.",
      deprecated: true,
    },
    { status: 410 }
  );
}
