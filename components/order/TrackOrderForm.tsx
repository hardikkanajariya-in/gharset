"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SafeOrder } from "@/types/order";
import { OrderResultCard } from "./OrderResultCard";

export function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");
  const [phoneLast4, setPhoneLast4] = useState(searchParams.get("last4") || "");
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
      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-lift">
        <label className="grid gap-1 text-sm font-bold text-ink">
          Order ID
          <input value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="GS-1001" className="control-input" required />
        </label>
        <label className="grid gap-1 text-sm font-bold text-ink">
          Phone number last 4 digits
          <input value={phoneLast4} onChange={(event) => setPhoneLast4(event.target.value)} placeholder="3210" className="control-input" required maxLength={4} />
        </label>
        <button disabled={loading} className="focus-ring h-12 rounded-xl bg-primary px-4 text-sm font-black text-white shadow-crisp transition hover:bg-primaryDark disabled:opacity-70">
          {loading ? "Checking..." : "Track order"}
        </button>
      </form>
      {error ? <div className="mt-4 rounded-xl border border-dangerText/20 bg-dangerBg p-3 text-sm font-bold text-dangerText">{error}</div> : null}
      {order ? <OrderResultCard order={order} /> : null}
    </div>
  );
}
