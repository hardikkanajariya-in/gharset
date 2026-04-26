import type { Product } from "@/types/product";
import { productOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppOrderButton({ product, phone, className }: { product: Product; phone: string; className?: string }) {
  const disabled = product.stockStatus === "out_of_stock";
  if (disabled) {
    return <button disabled className={cn("h-11 rounded-xl bg-mutedSurface px-4 text-sm font-medium text-muted", className)}>Unavailable</button>;
  }

  return (
    <a href={whatsappUrl(productOrderMessage(product), phone)} target="_blank" rel="noopener noreferrer" className={cn("focus-ring inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-white shadow-crisp transition hover:bg-primaryDark active:scale-[0.98]", className)}>
      Order on WhatsApp
    </a>
  );
}
