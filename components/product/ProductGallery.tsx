import type { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";

export function ProductGallery({ product }: { product: Product }) {
  const count = Math.max(product.imageDriveIds.length, 1);
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-soft">
        <div className="aspect-square overflow-hidden rounded-xl bg-mutedSurface">
          <ProductImage product={product} className="object-cover" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {Array.from({ length: Math.min(count, 4) }).map((_, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-xl border border-lineStrong bg-white shadow-soft">
            <ProductImage product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
