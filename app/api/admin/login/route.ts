import { NextResponse } from "next/server";
import { createAdminSession, validateAdminLogin } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const username = String(body.username || "").trim();
  const password = String(body.password || "");

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const valid = await validateAdminLogin(username, password);

  if (!valid) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  await createAdminSession(username);
  return NextResponse.json({ ok: true });
}
