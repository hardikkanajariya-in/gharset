"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getCartDeliveryCharge,
  getCartSubtotal,
  getStoredCart,
  updateCartQuantity,
  type StoredCartItem
} from "@/lib/cart-storage";
import { formatPrice } from "@/lib/utils";

export function CartView() {
  const [items, setItems] = useState<StoredCartItem[]>(() => getStoredCart());

  function update(productId: string, quantity: number) {
    updateCartQuantity(productId, quantity);
    setItems(getStoredCart());
  }

  const subtotal = getCartSubtotal(items);
  const deliveryCharge = getCartDeliveryCharge(items);
  const payable = subtotal + deliveryCharge;

  if (!items.length) {
    return (
      <div className="page-panel p-5 text-center">
        <p className="text-base font-black text-ink">Your cart is empty</p>
        <p className="mt-1 text-sm font-medium text-muted">
          Add organizers to review your COD order summary.
        </p>
        <Link
          href="/shop"
          className="focus-ring mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-white shadow-crisp"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.productId} className="page-panel flex gap-3 p-3 sm:p-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-mutedSurface sm:h-24 sm:w-24">
              <img
                src={item.imageDriveIds[0] ? `/api/drive-image/${item.imageDriveIds[0]}` : "/placeholder-product.svg"}
                alt={item.imageAlt || item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-secondary">
                {item.category}
              </p>
              <Link href={`/product/${item.slug}`} className="mt-1 line-clamp-2 text-sm font-black text-ink hover:text-primary">
                {item.name}
              </Link>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-base font-black text-ink">{formatPrice(item.price)}</p>
                <span className={`rounded-full px-2 py-1 text-[10px] font-black ${item.deliveryCharge ? "bg-warningBg text-warningText" : "bg-successBg text-successText"}`}>
                  {item.deliveryCharge ? `Delivery ${formatPrice(item.deliveryCharge)}` : "Free delivery"}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => update(item.productId, item.quantity - 1)}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="focus-ring h-9 w-9 rounded-xl border border-lineStrong bg-white text-sm font-black text-ink"
                >
                  -
                </button>
                <span className="flex h-9 min-w-10 items-center justify-center rounded-xl bg-mutedSurface px-3 text-sm font-black text-ink">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => update(item.productId, item.quantity + 1)}
                  aria-label={`Increase ${item.name} quantity`}
                  className="focus-ring h-9 w-9 rounded-xl border border-lineStrong bg-white text-sm font-black text-ink"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => update(item.productId, 0)}
                  className="focus-ring ml-auto rounded-xl px-3 py-2 text-xs font-black text-accent hover:bg-accentSoft"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="page-panel h-fit p-4">
        <p className="text-sm font-black text-ink">Order summary</p>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between font-bold text-muted">
            <span>Items</span>
            <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-lg font-black text-ink">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between font-bold text-muted">
            <span>Delivery</span>
            <span>{deliveryCharge ? formatPrice(deliveryCharge) : "Free"}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-lg font-black text-ink">
            <span>Total before coupon</span>
            <span>{formatPrice(payable)}</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="focus-ring mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-black text-white shadow-crisp transition hover:bg-primaryDark"
        >
          Continue to checkout
        </Link>
        <p className="mt-3 text-xs font-medium leading-5 text-muted">
          COD order is recorded first. WhatsApp opens after order placement with all details prefilled for final confirmation.
        </p>
      </aside>
    </div>
  );
}
