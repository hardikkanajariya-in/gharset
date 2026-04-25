import { formatPrice } from "@/lib/utils";

export function PriceBlock({ price, mrp, compact = false }: { price: number; mrp?: number; compact?: boolean }) {
  const saving = mrp && mrp > price ? mrp - price : 0;
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={compact ? "text-base font-black text-ink" : "text-2xl font-black text-ink"}>{formatPrice(price)}</span>
      {mrp && mrp > price ? <span className="text-xs font-bold text-muted line-through">{formatPrice(mrp)}</span> : null}
      {saving ? <span className="text-[11px] font-black text-accent">Save {formatPrice(saving)}</span> : null}
    </div>
  );
}
