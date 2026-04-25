import type { StockStatus } from "@/types/product";

export function StockBadge({ status }: { status: StockStatus }) {
  const copy = status === "out_of_stock" ? "Currently unavailable" : status === "limited" ? "Limited stock" : "COD available";
  const tone = status === "out_of_stock" ? "bg-dangerBg text-dangerText" : status === "limited" ? "bg-warningBg text-warningText" : "bg-successBg text-successText";
  return <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-black leading-none sm:text-[11px] ${tone}`}>{copy}</span>;
}
