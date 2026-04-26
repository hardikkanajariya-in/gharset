import { google } from "googleapis";
import { Readable } from "stream";
import { getGoogleAuth } from "./sheets";

export type DriveImageResult = {
  buffer: Buffer;
  mimeType: string;
};

export async function downloadDriveFile(fileId: string): Promise<DriveImageResult | null> {
  const auth = await getGoogleAuth();

  if (auth) {
    const drive = google.drive({ version: "v3", auth });
    const metadata = await drive.files.get({ fileId, fields: "mimeType,name" });
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );

    return {
      buffer: Buffer.from(response.data as ArrayBuffer),
      mimeType: metadata.data.mimeType || "image/jpeg"
    };
  }

  if (process.env.GOOGLE_DRIVE_PUBLIC_FALLBACK === "true") {
    const url = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
    const response = await fetch(url, { next: { revalidate: Number(process.env.IMAGE_CACHE_SECONDS || 86400) } });
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    return { buffer: Buffer.from(arrayBuffer), mimeType: contentType };
  }

  return null;
}

export async function uploadDriveImage({
  buffer,
  filename,
  mimeType
}: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}) {
  const auth = await getGoogleAuth();

  if (!auth) {
    throw new Error("Missing Google Drive credentials.");
  }

  const drive = google.drive({ version: "v3", auth });
  const response = await drive.files.create({
    requestBody: {
      name: filename,
      mimeType,
      parents: process.env.GOOGLE_DRIVE_UPLOAD_FOLDER_ID
        ? [process.env.GOOGLE_DRIVE_UPLOAD_FOLDER_ID]
        : undefined
    },
    media: {
      mimeType,
      body: Readable.from(buffer)
    },
    fields: "id,name,mimeType,webViewLink"
  });

  if (!response.data.id) {
    throw new Error("Google Drive did not return a file ID.");
  }

  return {
    fileId: response.data.id,
    name: response.data.name || filename,
    mimeType: response.data.mimeType || mimeType,
    webViewLink: response.data.webViewLink || ""
  };
}
