import "server-only";

import { google } from "googleapis";
import { unstable_cache } from "next/cache";

export type SheetRows = string[][];
export type SheetObject = Record<string, string>;

const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

export function shouldUseSampleData() {
  return process.env.USE_SAMPLE_DATA === "true";
}

export function rowsToObjects(rows: SheetRows): SheetObject[] {
  const [headers = [], ...dataRows] = rows;

  return dataRows
    .filter((row) => row.some((cell) => String(cell || "").trim().length > 0))
    .map((row) => {
      const object: SheetObject = {};

      headers.forEach((header, index) => {
        const key = String(header || "").trim();
        if (!key) return;

        object[key] = String(row[index] || "").trim();
      });

      return object;
    });
}

export function getGoogleAuth() {
  if (!serviceAccountEmail || !privateKey) {
    return null;
  }

  return new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.readonly"
    ]
  });
}

function getSheetsClient() {
  if (!serviceAccountEmail || !privateKey) {
    throw new Error("Missing Google service account credentials.");
  }

  const auth = getGoogleAuth();
  if (!auth) {
    throw new Error("Missing Google service account credentials.");
  }

  return google.sheets({ version: "v4", auth });
}

async function readSheetValuesRaw(
  spreadsheetId: string | undefined,
  range: string
): Promise<SheetRows> {
  if (!spreadsheetId) {
    throw new Error("Missing Google spreadsheet ID.");
  }

  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range
  });

  return (response.data.values || []) as SheetRows;
}

const cachedReadSheetValues = unstable_cache(
  async (spreadsheetId: string, range: string) => {
    return readSheetValuesRaw(spreadsheetId, range);
  },
  ["google-sheet-values"],
  {
    revalidate: 900
  }
);

export async function readSheetValues(
  spreadsheetId: string | undefined,
  range: string
) {
  return cachedReadSheetValues(spreadsheetId || "", range);
}

export async function appendSheetValues(
  spreadsheetId: string | undefined,
  range: string,
  values: Array<string | number | boolean | null | undefined>
) {
  if (!spreadsheetId) {
    throw new Error("Missing Google spreadsheet ID.");
  }

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values.map((value) => value ?? "")]
    }
  });
}
