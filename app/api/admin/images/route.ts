import { NextResponse } from "next/server";
import { requireAdminSession, uploadAdminImages } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((item): item is File => item instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "Select at least one image." }, { status: 400 });
  }

  try {
    const images = await uploadAdminImages(files);
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not upload images." },
      { status: 400 }
    );
  }
}
