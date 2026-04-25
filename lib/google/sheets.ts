import { google } from "googleapis";

type SheetRows = string[][];

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.readonly"
];

function hasGoogleCredentials() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
}

export function shouldUseSampleData() {
  return process.env.USE_SAMPLE_DATA !== "false";
}

export async function getGoogleAuth() {
  if (!hasGoogleCredentials()) return null;

  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: SCOPES
  });
}

export async function readSheetValues(spreadsheetId: string | undefined, range: string | undefined): Promise<SheetRows> {
  if (!spreadsheetId || !range) return [];
  const auth = await getGoogleAuth();
  if (!auth) return [];

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  return (response.data.values || []) as SheetRows;
}

export async function appendSheetValues(
  spreadsheetId: string | undefined,
  range: string | undefined,
  values: Array<string | number | null | undefined>
) {
  if (!spreadsheetId || !range) {
    throw new Error("Missing spreadsheet ID or range.");
  }

  const auth = await getGoogleAuth();
  if (!auth) throw new Error("Missing Google service account credentials.");

  const sheets = google.sheets({ version: "v4", auth });
  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] }
  });
}

export function rowsToObjects<T extends Record<string, string>>(rows: SheetRows): T[] {
  const [headers, ...body] = rows;
  if (!headers?.length) return [];

  return body
    .filter((row) => row.some((value) => String(value || "").trim()))
    .map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[String(header).trim()] = String(row[index] || "").trim();
      });
      return obj as T;
    });
}
