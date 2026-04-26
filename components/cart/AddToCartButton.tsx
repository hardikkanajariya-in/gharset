"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/types/product";
import { addProductToCart } from "@/lib/cart-storage";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  className,
  buyNow = false
}: {
  product: Product;
  className?: string;
  buyNow?: boolean;
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const disabled = product.stockStatus === "out_of_stock";

  function add() {
    if (disabled) return;
    addProductToCart(product);
    setAdded(true);

    if (buyNow) {
      router.push("/checkout");
      return;
    }

    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={add}
      className={cn(
        "focus-ring inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-crisp transition hover:bg-primaryDark active:scale-[0.98] disabled:bg-mutedSurface disabled:text-muted",
        className
      )}
    >
      {disabled ? "Unavailable" : added ? "Added to cart" : buyNow ? "Buy now" : "Add to cart"}
    </button>
  );
}
