import type { StoreSettings } from "@/types/settings";
import { mapSettings } from "./mappers";
import { readSheetValues, rowsToObjects } from "./google/sheets";

export async function getStoreSettings(): Promise<StoreSettings> {
  const rows = await readSheetValues(process.env.PRODUCTS_SPREADSHEET_ID, process.env.SETTINGS_RANGE || "Settings!A:B");
  const mapped = rowsToObjects(rows);
  return mapSettings(mapped);
}
