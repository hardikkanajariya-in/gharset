"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CheckoutCustomer } from "@/types/cart";
import {
  clearStoredCart,
  getCartDeliveryCharge,
  getCartSubtotal,
  getStoredCart,
  type StoredCartItem
} from "@/lib/cart-storage";
import { formatPrice } from "@/lib/utils";

type CouponState = {
  code: string;
  discount: number;
  finalAmount: number;
  message: string;
  valid: boolean;
};

export function CheckoutForm() {
  const router = useRouter();
  const [items] = useState<StoredCartItem[]>(() => getStoredCart());
  const [customer, setCustomer] = useState<CheckoutCustomer>({
    name: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    note: ""
  });
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<CouponState | null>(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const deliveryCharge = useMemo(() => getCartDeliveryCharge(items), [items]);
  const productTotalAfterDiscount = coupon?.valid ? coupon.finalAmount : subtotal;
  const finalAmount = productTotalAfterDiscount + deliveryCharge;
  const discount = coupon?.valid ? coupon.discount : 0;

  function update(key: keyof CheckoutCustomer, value: string) {
    setCustomer((current) => ({ ...current, [key]: value }));
  }

  async function applyCoupon() {
    setLoadingCoupon(true);
    setError("");
    setCoupon(null);

    const response = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: couponCode,
        subtotal,
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
      })
    });
    const data = await response.json();
    setLoadingCoupon(false);

    if (!response.ok) {
      setCoupon({ ...data, valid: false, finalAmount: subtotal, discount: 0 });
      return;
    }

    setCoupon(data);
  }

  async function placeOrder(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    setPlacing(true);
    const response = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer,
        couponCode: coupon?.valid ? coupon.code || couponCode : "",
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
      })
    });
    const data = await response.json();
    setPlacing(false);

    if (!response.ok) {
      setError(data.error || "Could not place this order.");
      return;
    }

    window.sessionStorage.setItem("gharset_last_order", JSON.stringify(data.order));
    clearStoredCart();
    window.open(data.order.whatsappUrl, "_blank", "noopener,noreferrer");
    router.push(`/order-confirmation?orderId=${encodeURIComponent(data.order.orderId)}&last4=${encodeURIComponent(data.order.phoneLast4)}`);
  }

  if (!items.length) {
    return (
      <div className="page-panel p-5 text-center">
        <p className="text-base font-black text-ink">Your cart is empty</p>
        <p className="mt-1 text-sm font-medium text-muted">Add products before checkout.</p>
        <Link href="/shop" className="focus-ring mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-white shadow-crisp">
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={placeOrder} className="grid gap-5 lg:grid-cols-[1fr_380px]">
      <div className="page-panel grid gap-4 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Full name" value={customer.name} onChange={(value) => update("name", value)} required />
          <Field label="Mobile number" value={customer.phone} onChange={(value) => update("phone", value)} required />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Alternate mobile" value={customer.alternatePhone || ""} onChange={(value) => update("alternatePhone", value)} />
          <Field label="Pincode" value={customer.pincode} onChange={(value) => update("pincode", value)} required />
        </div>
        <label className="grid gap-1 text-sm font-bold text-ink">
          Delivery address
          <textarea
            value={customer.address}
            onChange={(event) => update("address", event.target.value)}
            required
            rows={3}
            className="rounded-xl border border-lineStrong px-3 py-2 text-sm font-medium text-ink outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="City" value={customer.city} onChange={(value) => update("city", value)} required />
          <Field label="State" value={customer.state || ""} onChange={(value) => update("state", value)} />
          <Field label="Landmark" value={customer.landmark || ""} onChange={(value) => update("landmark", value)} />
        </div>
        <label className="grid gap-1 text-sm font-bold text-ink">
          Order note
          <textarea
            value={customer.note || ""}
            onChange={(event) => update("note", event.target.value)}
            rows={3}
            placeholder="Preferred delivery note, color request, or anything we should confirm."
            className="rounded-xl border border-lineStrong px-3 py-2 text-sm font-medium text-ink outline-none transition placeholder:text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/15"
          />
        </label>
      </div>

      <aside className="page-panel h-fit p-4">
        <p className="text-sm font-black text-ink">Order summary</p>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between gap-3 text-sm">
              <span className="font-bold text-muted">
                {item.name} x {item.quantity}
                <span className="mt-0.5 block text-[11px] font-bold text-muted">
                  {item.deliveryCharge ? `Delivery charge: ${formatPrice(item.deliveryCharge)}` : "Free delivery"}
                </span>
              </span>
              <span className="font-black text-ink">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-line pt-4">
          <label className="text-xs font-black uppercase tracking-[0.12em] text-muted">Coupon code</label>
          <div className="mt-2 flex gap-2">
            <input
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
              className="control-input min-w-0 flex-1"
              placeholder="GHARSET50"
            />
            <button
              type="button"
              onClick={applyCoupon}
              disabled={loadingCoupon || !couponCode.trim()}
              className="focus-ring h-11 rounded-xl border border-lineStrong bg-white px-3 text-xs font-black text-primary disabled:opacity-60"
            >
              {loadingCoupon ? "Checking" : "Apply"}
            </button>
          </div>
          {coupon ? (
            <p className={`mt-2 text-xs font-bold ${coupon.valid ? "text-successText" : "text-dangerText"}`}>
              {coupon.message}
            </p>
          ) : null}
        </div>
        <div className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
          <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
          <SummaryRow label="Discount" value={`- ${formatPrice(discount)}`} />
          <SummaryRow label="Delivery" value={deliveryCharge ? formatPrice(deliveryCharge) : "Free"} />
          <SummaryRow label="COD amount" value={formatPrice(finalAmount)} strong />
        </div>
        {error ? <p className="mt-3 rounded-xl bg-dangerBg p-3 text-xs font-bold text-dangerText">{error}</p> : null}
        <button
          disabled={placing}
          className="focus-ring mt-5 h-12 w-full rounded-xl bg-primary px-4 text-sm font-black text-white shadow-crisp transition hover:bg-primaryDark disabled:opacity-70"
        >
          {placing ? "Placing order..." : "Place COD order"}
        </button>
        <p className="mt-3 text-xs font-medium leading-5 text-muted">
          After placing the order, WhatsApp opens with your order number, delivery address, items and coupon details prefilled.
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm font-bold text-ink">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="control-input"
      />
    </label>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 ${strong ? "text-lg font-black text-ink" : "font-bold text-muted"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
