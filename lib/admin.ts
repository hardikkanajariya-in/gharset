import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { Product } from "@/types/product";
import { getAllProducts } from "./products";
import {
  appendSheetValues,
  readSheetValuesUncached,
  rowsToObjects,
  shouldUseSampleData,
  updateSheetRowByKey
} from "./google/sheets";
import { uploadDriveImage } from "./google/drive";

export type AdminImage = {
  fileId: string;
  name: string;
  mimeType?: string;
  createdAt?: string;
};

const COOKIE_NAME = "gharset_admin";

export async function validateAdminLogin(username: string, password: string) {
  const creds = await getAdminCredentials();
  return username === creds.username && password === creds.password;
}

export async function createAdminSession(username: string) {
  const timestamp = Date.now().toString();
  const payload = `${username}.${timestamp}`;
  const signature = sign(payload);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `${payload}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value || "";
  const [username, timestamp, signature] = token.split(".");

  if (!username || !timestamp || !signature) return false;

  const age = Date.now() - Number(timestamp);
  if (!Number.isFinite(age) || age > 60 * 60 * 8 * 1000) return false;

  const expected = sign(`${username}.${timestamp}`);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function getAdminProducts() {
  return getAllProducts();
}

export async function getImageLibrary(): Promise<AdminImage[]> {
  if (shouldUseSampleData()) return [];

  const rows = await readSheetValuesUncached(
    process.env.PRODUCTS_SPREADSHEET_ID,
    process.env.IMAGE_LIBRARY_RANGE || "ImageLibrary!A:Z"
  );

  return rowsToObjects(rows)
    .map((row) => ({
      fileId: row.file_id || "",
      name: row.name || "Uploaded image",
      mimeType: row.mime_type || "",
      createdAt: row.created_at || ""
    }))
    .filter((image) => image.fileId);
}

export async function uploadAdminImages(files: File[]) {
  const uploaded: AdminImage[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`${file.name} is not an image.`);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadDriveImage({
      buffer,
      filename: file.name,
      mimeType: file.type
    });
    const image = {
      fileId: result.fileId,
      name: result.name,
      mimeType: result.mimeType,
      createdAt: new Date().toISOString()
    };

    uploaded.push(image);

    if (!shouldUseSampleData()) {
      await appendSheetValues(
        process.env.PRODUCTS_SPREADSHEET_ID,
        process.env.IMAGE_LIBRARY_RANGE || "ImageLibrary!A:Z",
        [image.fileId, image.name, image.mimeType || "", image.createdAt]
      );
    }
  }

  return uploaded;
}

export async function updateProductImages({
  productId,
  imageDriveIds,
  imageAlt
}: {
  productId: string;
  imageDriveIds: string[];
  imageAlt?: string;
}) {
  const products = await getAllProducts();
  const product = products.find((item: Product) => item.productId === productId);

  if (!product) {
    throw new Error("Product not found.");
  }

  if (shouldUseSampleData()) {
    return { productId, sampleMode: true };
  }

  await updateSheetRowByKey({
    spreadsheetId: process.env.PRODUCTS_SPREADSHEET_ID,
    sheetName: "Products",
    keyHeader: "product_id",
    keyValue: productId,
    updates: {
      image_1_drive_id: imageDriveIds[0] || "",
      image_2_drive_id: imageDriveIds[1] || "",
      image_3_drive_id: imageDriveIds[2] || "",
      image_alt: imageAlt || product.name
    }
  });

  return { productId, sampleMode: false };
}

async function getAdminCredentials() {
  if (shouldUseSampleData()) {
    return { username: "admin", password: "admin123" };
  }

  const rows = await readSheetValuesUncached(
    process.env.PRODUCTS_SPREADSHEET_ID,
    process.env.SETTINGS_RANGE || "Settings!A:B"
  );
  const settings = new Map(rowsToObjects(rows).map((row) => [row.key, row.value]));

  return {
    username: settings.get("admin_username") || process.env.ADMIN_USERNAME || "admin",
    password: settings.get("admin_password") || process.env.ADMIN_PASSWORD || ""
  };
}

function sign(value: string) {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ||
    "gharset-local-admin-secret";

  return createHmac("sha256", secret).update(value).digest("hex");
}
