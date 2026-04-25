import type { Bundle } from "@/types/bundle";
import type { Product } from "@/types/product";
import { bundleOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

export function BundleCard({ bundle, products, whatsappNumber }: { bundle: Bundle; products: Product[]; whatsappNumber: string }) {
  const saving = bundle.mrp && bundle.mrp > bundle.price ? bundle.mrp - bundle.price : 0;

  return (
    <article className="card overflow-hidden">
      <div className="border-b border-line bg-mutedSurface p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Combo kit</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{bundle.name}</h3>
        <p className="mt-1 text-sm leading-6 text-muted">{bundle.shortDescription}</p>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-ink">Includes</p>
        <ul className="mt-2 space-y-2 text-sm text-muted">
          {products.map((product) => <li key={product.productId}>• {product.name}</li>)}
        </ul>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-semibold text-ink">{formatPrice(bundle.price)}</span>
          {bundle.mrp ? <span className="text-xs text-muted line-through">{formatPrice(bundle.mrp)}</span> : null}
          {saving ? <span className="text-xs font-semibold text-accent">Save {formatPrice(saving)}</span> : null}
        </div>
        <a href={whatsappUrl(bundleOrderMessage(bundle), whatsappNumber)} className="focus-ring mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primaryDark">
          Order combo on WhatsApp
        </a>
      </div>
    </article>
  );
}
