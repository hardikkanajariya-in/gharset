import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";
import { getCategories } from "@/lib/categories";
import { getVisibleProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getVisibleProducts(), getCategories()]);
  const staticPages = ["", "/shop", "/combo-kits", "/under-299", "/under-499", "/under-999", "/free-suggestion", "/track-order", "/contact", "/about"];

  return [
    ...staticPages.map((path) => ({ url: `${BRAND.siteUrl}${path}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${BRAND.siteUrl}/product/${product.slug}`, lastModified: new Date() })),
    ...categories.map((category) => ({ url: `${BRAND.siteUrl}/category/${category.slug}`, lastModified: new Date() }))
  ];
}
