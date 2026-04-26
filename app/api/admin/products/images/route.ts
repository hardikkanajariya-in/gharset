import { NextResponse } from "next/server";
import { requireAdminSession, updateProductImages } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const productId = String(body.productId || "").trim();
  const imageDriveIds = Array.isArray(body.imageDriveIds)
    ? body.imageDriveIds.map((value: unknown) => String(value || "").trim()).slice(0, 3)
    : [];
  const imageAlt = String(body.imageAlt || "").trim();

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
  }

  try {
    const result = await updateProductImages({ productId, imageDriveIds, imageAlt });
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update product images." },
      { status: 400 }
    );
  }
}
