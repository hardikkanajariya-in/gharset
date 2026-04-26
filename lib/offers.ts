import type { OfferBanner } from "@/types/offer";
import { mapOffer } from "./mappers";
import { readOptionalSheetValues, rowsToObjects } from "./google/sheets";

export async function getActiveOffers(limit = 3): Promise<OfferBanner[]> {
  const rows = await readOptionalSheetValues(
    process.env.PRODUCTS_SPREADSHEET_ID,
    process.env.OFFERS_RANGE || "Offers!A:Z"
  );
  const mapped = rowsToObjects(rows)
    .map(mapOffer)
    .filter((offer) => offer.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));

  return mapped.slice(0, limit);
}
