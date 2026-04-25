import type { Product } from "@/types/product";
import { mapProduct } from "./mappers";
import { sampleProducts } from "./sample-data";
import { readSheetValues, rowsToObjects, shouldUseSampleData } from "./google/sheets";

export async function getAllProducts(): Promise<Product[]> {
  if (shouldUseSampleData()) return sortProducts(sampleProducts);

  const rows = await readSheetValues(process.env.PRODUCTS_SPREADSHEET_ID, process.env.PRODUCTS_RANGE || "Products!A:Z");
  const mapped = rowsToObjects(rows).map(mapProduct);
  return sortProducts(mapped.length ? mapped : sampleProducts);
}

export async function getVisibleProducts() {
  return (await getAllProducts()).filter((product) => product.visible);
}

export async function getFeaturedProducts(limit = 8) {
  return (await getVisibleProducts()).filter((product) => product.featured).slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  return (await getVisibleProducts()).find((product) => product.slug === slug) || null;
}

export async function getProductsByCategory(categoryNameOrSlug: string) {
  const normalized = categoryNameOrSlug.toLowerCase().replace(/-/g, " ");
  return (await getVisibleProducts()).filter((product) => {
    const category = product.category.toLowerCase();
    return category === normalized || category.replace(/\s+/g, " ").includes(normalized.replace(" organizers", ""));
  });
}

export async function getProductsUnderPrice(price: number) {
  return (await getVisibleProducts()).filter((product) => product.price <= price);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  return (await getVisibleProducts())
    .filter((item) => item.productId !== product.productId && item.category === product.category)
    .slice(0, limit);
}

export function sortProducts(products: Product[]) {
  return [...products].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}
