import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.set("abeycollab_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("collably_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("valence_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
