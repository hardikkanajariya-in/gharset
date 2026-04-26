import type { OfferBanner } from "@/types/offer";
import { mapOffer } from "./mappers";
import { readSheetValues, rowsToObjects, shouldUseSampleData } from "./google/sheets";
import { sampleOffers } from "./sample-data";

export async function getActiveOffers(limit = 3): Promise<OfferBanner[]> {
  if (shouldUseSampleData()) return sampleOffers.filter((offer) => offer.active).slice(0, limit);

  const rows = await readSheetValues(
    process.env.PRODUCTS_SPREADSHEET_ID,
    process.env.OFFERS_RANGE || "Offers!A:Z"
  );
  const mapped = rowsToObjects(rows)
    .map(mapOffer)
    .filter((offer) => offer.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));

  return mapped.slice(0, limit);
}
