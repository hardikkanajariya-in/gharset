"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

type LastOrder = {
  orderId: string;
  phoneLast4: string;
  finalAmount: number;
  discount: number;
  productNames: string[];
  whatsappUrl: string;
};

export function OrderConfirmation() {
  const searchParams = useSearchParams();
  const [order] = useState<LastOrder | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const stored = window.sessionStorage.getItem("gharset_last_order");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const orderId = order?.orderId || searchParams.get("orderId") || "";
  const last4 = order?.phoneLast4 || searchParams.get("last4") || "";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
        <div className="bg-primaryDark p-5 text-white sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-successBg">Order placed</p>
          <h1 className="mt-2 text-[28px] font-black tracking-tight sm:text-[36px]">
            Your COD order is recorded.
          </h1>
          <p className="mt-2 text-sm font-medium leading-6 text-blue-100">
            Use the order number and mobile last 4 digits below to track the order after confirmation.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Info label="Order number" value={orderId || "-"} />
            <Info label="Mobile last 4 digits" value={last4 || "-"} />
          </div>

          {order ? (
            <div className="rounded-2xl border border-line bg-background p-4">
              <p className="text-sm font-black text-ink">Order summary</p>
              <ul className="mt-3 space-y-2 text-sm font-medium text-muted">
                {order.productNames.map((name) => <li key={name}>+ {name}</li>)}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
                <span className="font-bold text-muted">COD amount</span>
                <span className="text-lg font-black text-ink">{formatPrice(order.finalAmount)}</span>
              </div>
            </div>
          ) : null}

          <div className="grid gap-2 sm:grid-cols-2">
            {order?.whatsappUrl ? (
              <a
                href={order.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-primary px-4 text-sm font-black text-white shadow-crisp"
              >
                Continue on WhatsApp
              </a>
            ) : null}
            <Link
              href={`/track-order?orderId=${encodeURIComponent(orderId)}&last4=${encodeURIComponent(last4)}`}
              className="focus-ring inline-flex h-12 items-center justify-center rounded-xl border border-lineStrong bg-white px-4 text-sm font-black text-primary"
            >
              Track order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-background p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-ink">{value}</p>
    </div>
  );
}
