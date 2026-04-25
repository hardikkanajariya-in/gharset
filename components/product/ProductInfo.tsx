import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { PriceBlock } from "./PriceBlock";
import { StockBadge } from "./StockBadge";
import { WhatsAppOrderButton } from "./WhatsAppOrderButton";

export function ProductInfo({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  return (
    <div className="lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{product.category}</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{product.name}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">{product.shortDescription}</p>
      <div className="mt-4 flex items-center gap-3">
        <PriceBlock price={product.price} mrp={product.mrp} />
        <StockBadge status={product.stockStatus} />
      </div>
      <WhatsAppOrderButton product={product} phone={whatsappNumber} className="mt-5 w-full sm:w-auto" />

      <div className="mt-5 rounded-2xl border border-line bg-white p-4">
        <p className="text-sm font-semibold text-ink">Key benefits</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
          {(product.features.length ? product.features : ["Useful for daily home organization", "Compact and budget-friendly", "Confirm availability before COD order"]).map((feature) => (
            <li key={feature} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white text-sm">
        <DetailRow label="Best for" value={product.bestFor} />
        <DetailRow label="Material" value={product.material} />
        <DetailRow label="Dimensions" value={product.dimensions} />
        <DetailRow label="In the box" value={product.whatsInBox} />
        <DetailRow label="Payment" value="COD after WhatsApp confirmation" />
        <DetailRow label="Price" value={formatPrice(product.price)} />
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 px-4 py-3">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
