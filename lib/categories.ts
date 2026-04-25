import type { Category } from "@/types/category";
import { mapCategory } from "./mappers";
import { sampleCategories } from "./sample-data";
import { readSheetValues, rowsToObjects, shouldUseSampleData } from "./google/sheets";

export async function getCategories(): Promise<Category[]> {
  if (shouldUseSampleData()) return sortCategories(sampleCategories);

  const rows = await readSheetValues(process.env.PRODUCTS_SPREADSHEET_ID, process.env.CATEGORIES_RANGE || "Categories!A:Z");
  const mapped = rowsToObjects(rows).map(mapCategory);
  return sortCategories(mapped.length ? mapped : sampleCategories).filter((category) => category.visible);
}

export async function getCategoryBySlug(slug: string) {
  return (await getCategories()).find((category) => category.slug === slug) || null;
}

function sortCategories(categories: Category[]) {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}
