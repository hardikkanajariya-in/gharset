import { NextResponse } from "next/server";
import { createCheckoutOrder } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await createCheckoutOrder(body);
    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not place this order." },
      { status: 400 }
    );
  }
}
