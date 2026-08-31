import { NextResponse } from "next/server";
import { auditRepo } from "@/server/repositories/audit.repo";

export async function GET() {
  try {
    const logs = auditRepo.getAuditLogs();
    return NextResponse.json(logs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
