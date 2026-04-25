import { NextResponse } from "next/server";
import { createLead } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const area = String(body.area || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone number are required." }, { status: 400 });
    }

    const lead = await createLead({ name, phone, area, budget, message, source: "free-suggestion-page" });
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    return NextResponse.json({ error: "Could not save the request." }, { status: 500 });
  }
}
