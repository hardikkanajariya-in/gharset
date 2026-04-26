import type { Bundle } from "@/types/bundle";
import type { Product } from "@/types/product";
import { mapBundle } from "./mappers";
import { readOptionalSheetValues, rowsToObjects } from "./google/sheets";
import { getVisibleProducts } from "./products";

export async function getBundles(): Promise<Bundle[]> {
  const rows = await readOptionalSheetValues(process.env.PRODUCTS_SPREADSHEET_ID, process.env.BUNDLES_RANGE || "Bundles!A:Z");
  const mapped = rowsToObjects(rows).map(mapBundle);
  return sortBundles(mapped).filter((bundle) => bundle.visible);
}

export async function getFeaturedBundles(limit = 4) {
  return (await getBundles()).filter((bundle) => bundle.featured).slice(0, limit);
}

export async function getBundleProducts(bundle: Bundle): Promise<Product[]> {
  const products = await getVisibleProducts();
  return bundle.productIds
    .map((id) => products.find((product) => product.productId === id))
    .filter((product): product is Product => Boolean(product));
}

export async function getBundleBySlug(slug: string) {
  return (await getBundles()).find((bundle) => bundle.slug === slug) || null;
}

function sortBundles(bundles: Bundle[]) {
  return [...bundles].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}
