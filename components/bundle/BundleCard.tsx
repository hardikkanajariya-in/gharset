import type { Bundle } from "@/types/bundle";
import type { Product } from "@/types/product";
import { bundleOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

export function BundleCard({ bundle, products, whatsappNumber }: { bundle: Bundle; products: Product[]; whatsappNumber: string }) {
  const saving = bundle.mrp && bundle.mrp > bundle.price ? bundle.mrp - bundle.price : 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-lineStrong hover:shadow-lift">
      <div className="border-b border-line bg-primaryDark p-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">Solution bundle</p>
            <h3 className="mt-2 text-lg font-black text-white">{bundle.name}</h3>
          </div>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-primaryDark">
            {products.length} items
          </span>
        </div>
        <p className="mt-2 text-sm font-medium leading-6 text-blue-100">{bundle.shortDescription}</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {products.slice(0, 3).map((product) => (
            <div key={product.productId} className="rounded-xl border border-line bg-mutedSurface px-2 py-3 text-center text-[10px] font-black leading-tight text-mutedStrong">
              {product.subcategory || product.category.replace(" Organizers", "")}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm font-black text-ink">Includes</p>
        <ul className="mt-2 space-y-2 text-sm font-medium text-muted">
          {products.map((product) => <li key={product.productId} className="line-clamp-1">+ {product.name}</li>)}
        </ul>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-black text-ink">{formatPrice(bundle.price)}</span>
          {bundle.mrp ? <span className="text-xs font-bold text-muted line-through">{formatPrice(bundle.mrp)}</span> : null}
          {saving ? <span className="rounded-full bg-accentSoft px-2 py-1 text-xs font-black text-accent">Save {formatPrice(saving)}</span> : null}
        </div>
        <a href={whatsappUrl(bundleOrderMessage(bundle), whatsappNumber)} target="_blank" rel="noopener noreferrer" className="focus-ring mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-black text-white shadow-crisp transition hover:bg-primaryDark">
          Order combo on WhatsApp
        </a>
      </div>
    </article>
  );
}
