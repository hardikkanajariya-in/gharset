import type { Bundle } from "@/types/bundle";
import type { Product } from "@/types/product";
import { BundleCard } from "./BundleCard";

export function BundleGrid({ items, whatsappNumber }: { items: Array<{ bundle: Bundle; products: Product[] }>; whatsappNumber: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(({ bundle, products }) => <BundleCard key={bundle.bundleId} bundle={bundle} products={products} whatsappNumber={whatsappNumber} />)}
    </div>
  );
}
