import type { SafeOrder } from "@/types/order";
import { formatPrice, safeDate } from "@/lib/utils";
import { OrderStatusTimeline } from "./OrderStatusTimeline";

export function OrderResultCard({ order }: { order: SafeOrder }) {
  return (
    <div className="card mt-4 p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Order found</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">{order.orderId}</h2>
        </div>
        <span className="rounded-full bg-[#EAF4EF] px-3 py-1 text-xs font-semibold text-primary">{order.status}</span>
      </div>
      <div className="mt-4 grid gap-3 rounded-xl border border-line bg-cream p-3">
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
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
