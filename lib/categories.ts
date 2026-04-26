import type { Category } from "@/types/category";
import { mapCategory } from "./mappers";
import { readOptionalSheetValues, rowsToObjects } from "./google/sheets";

export async function getCategories(): Promise<Category[]> {
  const rows = await readOptionalSheetValues(process.env.PRODUCTS_SPREADSHEET_ID, process.env.CATEGORIES_RANGE || "Categories!A:Z");
  const mapped = rowsToObjects(rows).map(mapCategory);
  return sortCategories(mapped).filter((category) => category.visible);
}

export async function getCategoryBySlug(slug: string) {
  return (await getCategories()).find((category) => category.slug === slug) || null;
}

function sortCategories(categories: Category[]) {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}
