import Link from "next/link";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { PriceBlock } from "./PriceBlock";
import { ProductImage } from "./ProductImage";
import { StockBadge } from "./StockBadge";

export function ProductCard({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  void whatsappNumber;
  const under499 = product.price <= 499;
  const popular = product.featured || product.tags.some((tag) => tag.toLowerCase().includes("popular"));

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-lineStrong hover:shadow-lift active:scale-[0.99]">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden border-b border-line bg-mutedSurface">
        <ProductImage product={product} />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {popular ? <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-black leading-none text-white">Popular</span> : null}
          {under499 ? <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-black leading-none text-white">Under ₹499</span> : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 truncate text-[10px] font-black uppercase tracking-[0.12em] text-secondary sm:text-[11px]">{product.subcategory || product.category}</p>
          <StockBadge status={product.stockStatus} />
        </div>
        <Link href={`/product/${product.slug}`} className="mt-2 line-clamp-2 min-h-10 text-[14px] font-black leading-5 text-ink transition group-hover:text-primary sm:text-[15px]">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-1 text-xs font-medium leading-5 text-muted sm:text-[13px]">{product.shortDescription}</p>
        <div className="mt-3">
          <PriceBlock price={product.price} mrp={product.mrp} compact />
        </div>
        <p className={`mt-2 text-[11px] font-black ${product.deliveryCharge ? "text-warningText" : "text-successText"}`}>
          {product.deliveryCharge ? `Delivery ₹${product.deliveryCharge}` : "Free delivery"}
        </p>
        <AddToCartButton product={product} className="mt-3 h-11 w-full text-xs sm:text-sm" />
      </div>
    </article>
  );
}
