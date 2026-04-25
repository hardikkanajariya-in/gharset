"use client";

import { useState } from "react";
import type { SafeOrder } from "@/types/order";
import { OrderResultCard } from "./OrderResultCard";

export function TrackOrderForm() {
  const [orderId, setOrderId] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<SafeOrder | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    const response = await fetch("/api/track-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, phoneLast4 })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Order not found.");
      return;
    }

    setOrder(data.order);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="card grid gap-3 p-4">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Order ID
          <input value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="GS-1001" className="h-11 rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-primary" required />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Phone number last 4 digits
          <input value={phoneLast4} onChange={(event) => setPhoneLast4(event.target.value)} placeholder="3210" className="h-11 rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-primary" required maxLength={4} />
        </label>
        <button disabled={loading} className="focus-ring h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primaryDark disabled:opacity-70">
          {loading ? "Checking..." : "Track order"}
        </button>
      </form>
      {error ? <div className="mt-4 rounded-xl border border-[#F0D0D0] bg-[#F7EAEA] p-3 text-sm font-medium text-[#8A2D2D]">{error}</div> : null}
      {order ? <OrderResultCard order={order} /> : null}
    </div>
  );
}
