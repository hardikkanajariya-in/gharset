import type { Product } from "@/types/product";

export function getProductImageSrc(product: Product, index = 0) {
  const fileId = product.imageDriveIds[index];
  return fileId ? `/api/drive-image/${encodeURIComponent(fileId)}` : "/placeholder-product.svg";
}