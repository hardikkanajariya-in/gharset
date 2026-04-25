import type { Product } from "@/types/product";
import { getProductImageSrc } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductImage({ product, index = 0, className }: { product: Product; index?: number; className?: string }) {
  return (
    <img
      src={getProductImageSrc(product, index)}
      alt={product.imageAlt || product.name}
      loading="lazy"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
