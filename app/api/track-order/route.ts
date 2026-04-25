import { NextResponse } from "next/server";
import { findOrder } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = String(body.orderId || "").trim();
    const phoneLast4 = String(body.phoneLast4 || "").trim();

    if (!orderId || !phoneLast4) {
      return NextResponse.json({ error: "Order ID and phone last 4 digits are required." }, { status: 400 });
    }

    const order = await findOrder(orderId, phoneLast4);
    if (!order) {
      return NextResponse.json({ error: "Order not found. Please check your details or message us on WhatsApp." }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: "Could not track this order right now." }, { status: 500 });
  }
}
