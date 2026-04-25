import type { Product } from "@/types/product";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, whatsappNumber }: { products: Product[]; whatsappNumber: string }) {
  if (!products.length) return <EmptyState title="No products found" message="Try a different category or message us for suggestions." />;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => <ProductCard key={product.productId} product={product} whatsappNumber={whatsappNumber} />)}
    </div>
  );
}
