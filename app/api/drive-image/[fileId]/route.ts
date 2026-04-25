import { NextResponse } from "next/server";
import { downloadDriveFile } from "@/lib/google/drive";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ fileId: string }> }) {
  try {
    const { fileId } = await params;
    const safeFileId = decodeURIComponent(fileId || "").trim();

    if (!safeFileId) return placeholderResponse();

    const result = await downloadDriveFile(safeFileId);
    if (!result) return placeholderResponse();

    const body = new ArrayBuffer(result.buffer.byteLength);
    new Uint8Array(body).set(result.buffer);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": result.mimeType,
        "Cache-Control": `public, max-age=${process.env.IMAGE_CACHE_SECONDS || 86400}, stale-while-revalidate=604800`
      }
    });
  } catch {
    return placeholderResponse();
  }
}

function placeholderResponse() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#F1EDE6"/><rect x="160" y="180" width="480" height="380" rx="28" fill="#FFFFFF" stroke="#E4DDD3"/><circle cx="290" cy="310" r="58" fill="#EAF4EF"/><path d="M195 520l130-150 100 110 75-82 105 122H195z" fill="#D8E8DF"/><text x="400" y="625" text-anchor="middle" font-family="Arial" font-size="28" fill="#667085">GharSet product</text></svg>`;
  return new NextResponse(svg, {
    status: 200,
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" }
  });
}
