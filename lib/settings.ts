import type { StoreSettings } from "@/types/settings";
import { mapSettings } from "./mappers";
import { sampleSettings } from "./sample-data";
import { readSheetValues, rowsToObjects, shouldUseSampleData } from "./google/sheets";

export async function getStoreSettings(): Promise<StoreSettings> {
  if (shouldUseSampleData()) return sampleSettings;

  const rows = await readSheetValues(process.env.PRODUCTS_SPREADSHEET_ID, process.env.SETTINGS_RANGE || "Settings!A:B");
  const mapped = rowsToObjects(rows);
  return mapped.length ? mapSettings(mapped) : sampleSettings;
}
