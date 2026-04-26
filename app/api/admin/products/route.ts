import { NextResponse } from "next/server";
import { getAdminProducts, getImageLibrary, requireAdminSession } from "@/lib/admin";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const [products, images] = await Promise.all([getAdminProducts(), getImageLibrary()]);
  return NextResponse.json({ products, images });
}
