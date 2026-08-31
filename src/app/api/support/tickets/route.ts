import { NextRequest, NextResponse } from "next/server";
import { disputeRepo } from "@/server/repositories/dispute.repo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;
    const tickets = disputeRepo.getTickets(userId);
    return NextResponse.json(tickets);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newTicket = disputeRepo.createTicket(body);
    return NextResponse.json(newTicket, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
