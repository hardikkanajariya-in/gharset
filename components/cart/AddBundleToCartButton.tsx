"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/types/product";
import { addProductToCart } from "@/lib/cart-storage";
import { cn } from "@/lib/utils";

export function AddBundleToCartButton({
  products,
  className
}: {
  products: Product[];
  className?: string;
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const availableProducts = products.filter((product) => product.stockStatus !== "out_of_stock");

  function addBundle() {
    availableProducts.forEach((product) => addProductToCart(product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  function checkoutBundle() {
    availableProducts.forEach((product) => addProductToCart(product));
    router.push("/checkout");
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <button
        type="button"
        onClick={addBundle}
        disabled={!availableProducts.length}
        className="focus-ring h-11 rounded-xl bg-primary px-4 text-sm font-black text-white shadow-crisp transition hover:bg-primaryDark disabled:bg-mutedSurface disabled:text-muted"
      >
        {added ? "Added to cart" : "Add bundle to cart"}
      </button>
      <button
        type="button"
        onClick={checkoutBundle}
        disabled={!availableProducts.length}
        className="focus-ring h-11 rounded-xl border border-lineStrong bg-white px-4 text-sm font-black text-primary transition hover:bg-primarySoft disabled:bg-mutedSurface disabled:text-muted"
      >
        Checkout bundle
      </button>
    </div>
  );
}
