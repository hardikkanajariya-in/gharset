import type { Order, SafeOrder } from "@/types/order";
import type { CheckoutPayload } from "@/types/cart";
import { appendSheetValues, readSheetValues, rowsToObjects } from "./google/sheets";
import { mapOrder } from "./mappers";
import { getLastFour } from "./utils";
import { getVisibleProducts } from "./products";
import { validateCoupon } from "./coupons";
import { checkoutOrderMessage, whatsappUrl } from "./whatsapp";
import { getStoreSettings } from "./settings";

export async function getOrders(): Promise<Order[]> {
  const rows = await readSheetValues(process.env.ORDERS_SPREADSHEET_ID, process.env.ORDERS_RANGE || "Orders!A:Z");
  const mapped = rowsToObjects(rows).map(mapOrder);
  return mapped.length ? mapped : [];
}

export async function findOrder(orderId: string, phoneLast4: string): Promise<SafeOrder | null> {
  if (process.env.ORDER_TRACKING_ENABLED === "false") return null;

  const cleanOrderId = orderId.trim().toUpperCase();
  const cleanLast4 = getLastFour(phoneLast4);

  const order = (await getOrders()).find((item) => {
    return item.orderId.trim().toUpperCase() === cleanOrderId && getLastFour(item.phone) === cleanLast4;
  });

  return order ? toSafeOrder(order) : null;
}

export function toSafeOrder(order: Order): SafeOrder {
  return {
    orderId: order.orderId,
    orderDate: order.orderDate,
    productNames: order.productNames,
    orderAmount: order.orderAmount,
    paymentMethod: order.paymentMethod,
    status: order.status,
    trackingNote: order.trackingNote,
    expectedDelivery: order.expectedDelivery,
    lastUpdated: order.lastUpdated
  };
}

export async function createCheckoutOrder(payload: CheckoutPayload) {
  const customer = payload.customer;
  const cleanPhone = customer.phone.replace(/\D/g, "");
  const phoneLast4 = getLastFour(customer.phone);

  if (!customer.name.trim() || cleanPhone.length < 10) {
    throw new Error("Customer name and valid mobile number are required.");
  }

  if (!customer.address.trim() || !customer.city.trim() || !customer.pincode.trim()) {
    throw new Error("Delivery address, city and pincode are required.");
  }

  const requestedItems = payload.items
    .map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, Math.min(20, Number(item.quantity) || 1))
    }))
    .filter((item) => item.productId);

  if (!requestedItems.length) {
    throw new Error("Add at least one product to place an order.");
  }

  const products = await getVisibleProducts();
  const items = requestedItems.map((item) => {
    const product = products.find((entry) => entry.productId === item.productId);

    if (!product) {
      throw new Error("One or more products are no longer available.");
    }

    if (product.stockStatus === "out_of_stock") {
      throw new Error(`${product.name} is currently unavailable.`);
    }

    return {
      product,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity
    };
  });

  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  const deliveryCharge = items.reduce(
    (highest, item) => Math.max(highest, item.product.deliveryCharge || 0),
    0
  );
  const coupon = await validateCoupon({
    code: payload.couponCode,
    subtotal,
    items: requestedItems
  });

  if (payload.couponCode && !coupon.valid) {
    throw new Error(coupon.message);
  }

  const orderId = `GS-${Date.now().toString().slice(-8)}`;
  const createdAt = new Date().toISOString();
  const productIds = items.map((item) => item.product.productId);
  const productNames = items.map((item) => item.product.name);
  const quantities = items.map((item) => item.quantity);
  const address = [
    customer.address,
    customer.landmark ? `Landmark: ${customer.landmark}` : "",
    customer.city,
    customer.state,
    customer.pincode
  ]
    .filter(Boolean)
    .join(", ");
  const settings = await getStoreSettings();
  const whatsappMessage = checkoutOrderMessage({
    orderId,
    customer,
    items,
    subtotal,
    discount: coupon.discount,
    deliveryCharge,
    finalAmount: coupon.finalAmount + deliveryCharge,
    couponCode: coupon.code,
    phoneLast4
  });

  await appendSheetValues(process.env.ORDERS_SPREADSHEET_ID, process.env.ORDERS_RANGE || "Orders!A:Z", [
    orderId,
    createdAt,
    customer.name,
    cleanPhone,
    address,
    productIds.join("|"),
    productNames.join("|"),
    coupon.finalAmount + deliveryCharge,
    "",
    "",
    "COD",
    "New Order",
    "Website checkout submitted. Awaiting WhatsApp final confirmation.",
    "After WhatsApp confirmation",
    createdAt,
    customer.note || "",
    customer.city,
    customer.state || "",
    customer.pincode,
    customer.landmark || "",
    quantities.join("|"),
    subtotal,
    deliveryCharge,
    coupon.code || "",
    coupon.discount,
    customer.alternatePhone || ""
  ]);

  return {
    orderId,
    phoneLast4,
    status: "New Order",
    subtotal,
    deliveryCharge,
    discount: coupon.discount,
    finalAmount: coupon.finalAmount + deliveryCharge,
    couponCode: coupon.code,
    productNames,
    whatsappUrl: whatsappUrl(whatsappMessage, settings.whatsappNumber)
  };
}

export async function createLead(input: {
  name: string;
  phone: string;
  area: string;
  budget: string;
  message: string;
  source?: string;
}) {
  const leadId = `GS-LD-${Date.now()}`;
  const createdAt = new Date().toISOString();

  await appendSheetValues(process.env.ORDERS_SPREADSHEET_ID, process.env.LEADS_RANGE || "Leads!A:Z", [
    leadId,
    createdAt,
    input.name,
    input.phone,
    input.area,
    input.budget,
    input.message,
    input.source || "website",
    "New"
  ]);

  return { leadId };
}
