import type { StockStatus } from "@/types/product";

export function StockBadge({ status }: { status: StockStatus }) {
  const copy = status === "out_of_stock" ? "Currently unavailable" : status === "limited" ? "Limited stock" : "COD available";
  const tone = status === "out_of_stock" ? "bg-[#F7EAEA] text-[#8A2D2D]" : "bg-[#EAF4EF] text-primary";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}>{copy}</span>;
}
