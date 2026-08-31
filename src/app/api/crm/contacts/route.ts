import { NextRequest, NextResponse } from "next/server";
import { crmRepo } from "@/server/repositories/crm.repo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId") || undefined;
    const contacts = crmRepo.getContacts(brandId);
    return NextResponse.json(contacts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactId, action, stage, authorName, content, tag } = body;

    if (action === "updateStage") {
      const updated = crmRepo.updateStage(contactId, stage);
      return NextResponse.json({ success: true, contact: updated });
    }

    if (action === "addNote") {
      const ok = crmRepo.addNote(contactId, authorName, content);
      return NextResponse.json({ success: ok });
    }

    if (action === "addTag") {
      const ok = crmRepo.addTag(contactId, tag);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
