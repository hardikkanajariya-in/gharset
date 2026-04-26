import type { Product } from "@/types/product";

export type StoredCartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  mrp?: number;
  imageDriveIds: string[];
  imageAlt: string;
  category: string;
  quantity: number;
};

const CART_KEY = "gharset_cart";
export const CART_UPDATED_EVENT = "gharset-cart-updated";

export function getStoredCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(items: StoredCartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function productToCartItem(product: Product, quantity = 1): StoredCartItem {
  return {
    productId: product.productId,
    slug: product.slug,
    name: product.name,
    price: product.price,
    mrp: product.mrp,
    imageDriveIds: product.imageDriveIds,
    imageAlt: product.imageAlt,
    category: product.category,
    quantity
  };
}

export function addProductToCart(product: Product, quantity = 1) {
  const items = getStoredCart();
  const existing = items.find((item) => item.productId === product.productId);

  if (existing) {
    existing.quantity = Math.min(20, existing.quantity + quantity);
    saveStoredCart(items);
    return existing.quantity;
  }

  saveStoredCart([...items, productToCartItem(product, quantity)]);
  return quantity;
}

export function updateCartQuantity(productId: string, quantity: number) {
  const safeQuantity = Math.max(0, Math.min(20, quantity));
  const items =
    safeQuantity === 0
      ? getStoredCart().filter((item) => item.productId !== productId)
      : getStoredCart().map((item) =>
          item.productId === productId ? { ...item, quantity: safeQuantity } : item
        );

  saveStoredCart(items);
}

export function clearStoredCart() {
  saveStoredCart([]);
}

export function getCartSubtotal(items: StoredCartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartCount(items: StoredCartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
