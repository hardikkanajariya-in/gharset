import Link from "next/link";
import type { Product } from "@/types/product";
import { PriceBlock } from "./PriceBlock";
import { ProductImage } from "./ProductImage";
import { StockBadge } from "./StockBadge";
import { WhatsAppOrderButton } from "./WhatsAppOrderButton";

export function ProductCard({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  return (
    <article className="card flex flex-col overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block aspect-square border-b border-line bg-mutedSurface">
        <ProductImage product={product} />
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">{product.subcategory || product.category}</p>
          <StockBadge status={product.stockStatus} />
        </div>
        <Link href={`/product/${product.slug}`} className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-ink hover:text-primary">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-muted">{product.shortDescription}</p>
        <div className="mt-3">
          <PriceBlock price={product.price} mrp={product.mrp} compact />
        </div>
        <WhatsAppOrderButton product={product} phone={whatsappNumber} className="mt-3 w-full" />
      </div>
    </article>
  );
}
