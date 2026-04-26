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
      "https://www.googleapis.com/auth/drive.file",
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

function columnLetter(index: number) {
  let value = index + 1;
  let result = "";

  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }

  return result;
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

export async function readSheetValuesUncached(
  spreadsheetId: string | undefined,
  range: string
) {
  return readSheetValuesRaw(spreadsheetId, range);
}

export async function updateSheetRowByKey({
  spreadsheetId,
  sheetName,
  keyHeader,
  keyValue,
  updates
}: {
  spreadsheetId: string | undefined;
  sheetName: string;
  keyHeader: string;
  keyValue: string;
  updates: Record<string, string>;
}) {
  if (!spreadsheetId) {
    throw new Error("Missing Google spreadsheet ID.");
  }

  const rows = await readSheetValuesRaw(spreadsheetId, `${sheetName}!A:Z`);
  const [headers = [], ...dataRows] = rows;
  const keyIndex = headers.indexOf(keyHeader);

  if (keyIndex === -1) {
    throw new Error(`Missing ${keyHeader} column in ${sheetName}.`);
  }

  const rowIndex = dataRows.findIndex((row) => String(row[keyIndex] || "").trim() === keyValue);

  if (rowIndex === -1) {
    throw new Error(`Could not find ${keyValue} in ${sheetName}.`);
  }

  const sheets = getSheetsClient();
  const data = Object.entries(updates).map(([header, value]) => {
    const columnIndex = headers.indexOf(header);
    if (columnIndex === -1) {
      throw new Error(`Missing ${header} column in ${sheetName}.`);
    }

    const rowNumber = rowIndex + 2;
    const column = columnLetter(columnIndex);

    return {
      range: `${sheetName}!${column}${rowNumber}`,
      values: [[value]]
    };
  });

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "USER_ENTERED",
      data
    }
  });
}
