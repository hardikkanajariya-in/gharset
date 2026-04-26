import { NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await validateCoupon({
      code: body.code,
      subtotal: Number(body.subtotal || 0),
      items: Array.isArray(body.items) ? body.items : []
    });

    return NextResponse.json(result, { status: result.valid ? 200 : 400 });
  } catch {
    return NextResponse.json(
      {
        valid: false,
        message: "Could not validate coupon right now.",
        discount: 0,
        finalAmount: 0
      },
      { status: 500 }
    );
  }
}
