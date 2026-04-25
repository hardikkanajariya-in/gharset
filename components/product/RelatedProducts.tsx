import type { Product } from "@/types/product";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductGrid } from "./ProductGrid";

export function RelatedProducts({ products, whatsappNumber }: { products: Product[]; whatsappNumber: string }) {
  if (!products.length) return null;
  return (
    <section className="compact-section">
      <SectionHeader title="Related organizers" description="More products from the same space." />
      <div className="mt-5">
        <ProductGrid products={products} whatsappNumber={whatsappNumber} />
      </div>
    </section>
  );
}
