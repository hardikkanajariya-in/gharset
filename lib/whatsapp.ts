import type { Bundle } from "@/types/bundle";
import type { Product } from "@/types/product";
import { BRAND } from "./constants";
import { formatPrice } from "./utils";

function cleanPhone(phone = BRAND.whatsappNumber) {
  return phone.replace(/\D/g, "");
}

export function whatsappUrl(message: string, phone?: string) {
  return `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(product: Product) {
  return [
    "Hi GharSet, I want to order this product:",
    "",
    `Product: ${product.name}`,
    `Product ID: ${product.productId}`,
    `Price: ${formatPrice(product.price)}`,
    "Payment: COD",
    "",
    "Please confirm availability and delivery details."
  ].join("\n");
}

export function bundleOrderMessage(bundle: Bundle) {
  return [
    "Hi GharSet, I want to order this combo:",
    "",
    `Combo: ${bundle.name}`,
    `Combo ID: ${bundle.bundleId}`,
    `Price: ${formatPrice(bundle.price)}`,
    "Payment: COD",
    "",
    "Please confirm availability and delivery details."
  ].join("\n");
}

export function suggestionMessage(area?: string, budget?: string) {
  return [
    "Hi GharSet, I need help organizing my home.",
    "",
    `Area: ${area || "Kitchen / Bathroom / Wardrobe / Fridge"}`,
    `Budget: ${budget || "Please suggest"}`,
    "",
    "I can share photos and details here."
  ].join("\n");
}

export function trackingMessage(orderId = "") {
  return `Hi GharSet, I want to track my order. My Order ID is: ${orderId}`;
}
