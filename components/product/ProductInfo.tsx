import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { PriceBlock } from "./PriceBlock";
import { StockBadge } from "./StockBadge";

export function ProductInfo({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  void whatsappNumber;
  return (
    <div className="lg:sticky lg:top-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">{product.category}</p>
      <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-ink sm:text-[34px]">{product.name}</h1>
      <p className="mt-2 text-sm font-medium leading-6 text-muted">{product.shortDescription}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <PriceBlock price={product.price} mrp={product.mrp} />
        <StockBadge status={product.stockStatus} />
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <AddToCartButton product={product} className="h-12 w-full sm:h-11" />
        <AddToCartButton product={product} buyNow className="h-12 w-full border border-primary bg-white text-primary shadow-soft hover:bg-primarySoft sm:h-11" />
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-white p-4 shadow-soft">
        <p className="text-sm font-semibold text-ink">Key benefits</p>
        <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-muted">
          {(product.features.length ? product.features : ["Useful for daily home organization", "Compact and budget-friendly", "Confirm availability before COD order"]).map((feature) => (
            <li key={feature} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white text-sm shadow-soft">
        <DetailGroup title="Product details">
          <DetailRow label="Best for" value={product.bestFor} />
          <DetailRow label="Material" value={product.material} />
          <DetailRow label="Dimensions" value={product.dimensions} />
          <DetailRow label="In the box" value={product.whatsInBox} />
        </DetailGroup>
        <DetailGroup title="Delivery and payment">
          <DetailRow label="Payment" value="COD after WhatsApp confirmation" />
          <DetailRow label="Delivery" value={product.deliveryCharge ? `${formatPrice(product.deliveryCharge)} delivery charge may apply` : "Free delivery available"} />
          <DetailRow label="Order flow" value="Share details on WhatsApp, confirm availability, then COD order is processed." />
          <DetailRow label="Price" value={formatPrice(product.price)} />
        </DetailGroup>
        <DetailGroup title="Return note">
          <p className="px-4 pb-4 text-sm font-medium leading-6 text-muted">
            Return or replacement support depends on product condition, supplier policy and confirmation shared before dispatch.
          </p>
        </DetailGroup>
      </div>
    </div>
  );
}

function DetailGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-line last:border-b-0" open>
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink">
        {title}
        <span className="text-muted transition group-open:rotate-45">+</span>
      </summary>
      <div className="divide-y divide-line">{children}</div>
    </details>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[104px_1fr] gap-3 px-4 py-3 sm:grid-cols-[120px_1fr]">
      <span className="font-medium text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
