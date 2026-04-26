import type { Bundle } from "@/types/bundle";
import type { CheckoutCustomer } from "@/types/cart";
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

export function checkoutOrderMessage({
  orderId,
  customer,
  items,
  subtotal,
  discount,
  finalAmount,
  couponCode,
  phoneLast4
}: {
  orderId: string;
  customer: CheckoutCustomer;
  items: Array<{ product: Product; quantity: number; lineTotal: number }>;
  subtotal: number;
  discount: number;
  finalAmount: number;
  couponCode?: string;
  phoneLast4: string;
}) {
  return [
    "Hi GharSet, I placed a COD order from the website. Please finalize it.",
    "",
    `Order ID: ${orderId}`,
    `Phone last 4 digits for tracking: ${phoneLast4}`,
    "",
    "Customer details:",
    `Name: ${customer.name}`,
    `Mobile: ${customer.phone}`,
    customer.alternatePhone ? `Alternate mobile: ${customer.alternatePhone}` : "",
    `Address: ${customer.address}`,
    `City: ${customer.city}`,
    customer.state ? `State: ${customer.state}` : "",
    `Pincode: ${customer.pincode}`,
    customer.landmark ? `Landmark: ${customer.landmark}` : "",
    "",
    "Order items:",
    ...items.map((item, index) => {
      return `${index + 1}. ${item.product.name} (${item.product.productId}) x ${item.quantity} = ${formatPrice(item.lineTotal)}`;
    }),
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    couponCode ? `Coupon: ${couponCode}` : "Coupon: Not applied",
    `Discount: ${formatPrice(discount)}`,
    `COD amount: ${formatPrice(finalAmount)}`,
    customer.note ? `Customer note: ${customer.note}` : "",
    "",
    "Please confirm availability, delivery timeline and COD details."
  ]
    .filter(Boolean)
    .join("\n");
}
