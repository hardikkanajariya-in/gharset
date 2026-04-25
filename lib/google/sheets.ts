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

function getSheetsClient() {
  if (!serviceAccountEmail || !privateKey) {
    throw new Error("Missing Google service account credentials.");
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  return google.sheets({ version: "v4", auth });
}

async function readSheetValuesRaw(
  spreadsheetId: string,
  range: string
): Promise<SheetRows> {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range
  });

  return (response.data.values || []) as SheetRows;
}

export const readSheetValues = unstable_cache(
  async (spreadsheetId: string, range: string) => {
    return readSheetValuesRaw(spreadsheetId, range);
  },
  ["google-sheet-values"],
  {
    revalidate: 900
  }
);