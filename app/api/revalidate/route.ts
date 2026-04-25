import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/combo-kits");
  revalidatePath("/under-299");
  revalidatePath("/under-499");
  revalidatePath("/under-999");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
