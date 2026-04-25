import type { SafeOrder } from "@/types/order";
import { formatPrice, safeDate } from "@/lib/utils";
import { OrderStatusTimeline } from "./OrderStatusTimeline";

export function OrderResultCard({ order }: { order: SafeOrder }) {
  return (
    <div className="mt-4 rounded-2xl border border-line bg-white p-4 text-sm shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">Order found</p>
          <h2 className="mt-1 text-lg font-black text-ink">{order.orderId}</h2>
        </div>
        <span className="rounded-full bg-successBg px-3 py-1 text-xs font-black text-successText">{order.status}</span>
      </div>
      <div className="mt-4 grid gap-3 rounded-xl border border-line bg-background p-3">
        <Info label="Products" value={order.productNames.join(", ") || "-"} />
        <Info label="Amount" value={order.orderAmount ? formatPrice(order.orderAmount) : "-"} />
        <Info label="Payment" value={order.paymentMethod || "COD"} />
        <Info label="Expected delivery" value={order.expectedDelivery || "After confirmation"} />
        <Info label="Last updated" value={safeDate(order.lastUpdated) || "-"} />
        {order.trackingNote ? <Info label="Note" value={order.trackingNote} /> : null}
      </div>
      <OrderStatusTimeline status={order.status} />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3">
      <span className="font-medium text-muted">{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}
