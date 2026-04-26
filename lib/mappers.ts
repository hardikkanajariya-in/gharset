import type { Bundle } from "@/types/bundle";
import type { Category } from "@/types/category";
import type { Coupon, CouponType } from "@/types/coupon";
import type { OfferBanner } from "@/types/offer";
import type { Order } from "@/types/order";
import type { Product, StockStatus } from "@/types/product";
import type { StoreSettings } from "@/types/settings";
import { BRAND, DEFAULT_ANNOUNCEMENT } from "./constants";
import { normalizeYesNo, splitList, toNumber } from "./utils";

type Row = Record<string, string>;

export function mapProduct(row: Row): Product {
  const stock = (row.stock_status || "in_stock") as StockStatus;
  return {
    productId: row.product_id || row.id || "",
    slug: row.slug || "",
    name: row.name || "Untitled product",
    shortDescription: row.short_description || row.description || "Useful organizer for everyday spaces.",
    category: row.category || "Shop",
    subcategory: row.subcategory || "",
    price: toNumber(row.price),
    mrp: toNumber(row.mrp),
    supplierPrice: toNumber(row.supplier_price),
    margin: toNumber(row.margin),
    imageDriveIds: [row.image_1_drive_id, row.image_2_drive_id, row.image_3_drive_id].filter(Boolean),
    imageAlt: row.image_alt || row.name || "GharSet product image",
    material: row.material,
    dimensions: row.dimensions,
    bestFor: row.best_for,
    features: splitList(row.features),
    whatsInBox: row.whats_in_box,
    stockStatus: ["in_stock", "out_of_stock", "limited"].includes(stock) ? stock : "in_stock",
    featured: normalizeYesNo(row.featured),
    visible: normalizeYesNo(row.visible, true),
    sortOrder: toNumber(row.sort_order, 999),
    tags: splitList(row.tags)
  };
}

export function mapCategory(row: Row): Category {
  return {
    categoryId: row.category_id || row.id || "",
    name: row.name || "Category",
    slug: row.slug || "",
    description: row.description || "Useful products for organized homes.",
    imageDriveId: row.image_drive_id,
    visible: normalizeYesNo(row.visible, true),
    sortOrder: toNumber(row.sort_order, 999)
  };
}

export function mapBundle(row: Row): Bundle {
  return {
    bundleId: row.bundle_id || row.id || "",
    slug: row.slug || "",
    name: row.name || "Combo Kit",
    shortDescription: row.short_description || row.description || "A useful product combo for everyday home organization.",
    productIds: splitList(row.product_ids),
    price: toNumber(row.price),
    mrp: toNumber(row.mrp),
    imageDriveId: row.image_drive_id,
    visible: normalizeYesNo(row.visible, true),
    featured: normalizeYesNo(row.featured),
    sortOrder: toNumber(row.sort_order, 999)
  };
}

export function mapOrder(row: Row): Order {
  return {
    orderId: row.order_id || "",
    orderDate: row.order_date || "",
    customerName: row.customer_name || "",
    phone: row.phone || "",
    address: row.address || "",
    city: row.city || "",
    state: row.state || "",
    pincode: row.pincode || "",
    landmark: row.landmark || "",
    productIds: splitList(row.product_ids),
    productNames: splitList(row.product_names),
    quantities: splitList(row.quantities).map((value) => toNumber(value, 1)),
    subtotal: toNumber(row.subtotal),
    couponCode: row.coupon_code || "",
    discount: toNumber(row.discount),
    orderAmount: toNumber(row.order_amount),
    supplierCost: toNumber(row.supplier_cost),
    profit: toNumber(row.profit),
    paymentMethod: row.payment_method || "COD",
    status: row.status || "New Order",
    trackingNote: row.tracking_note || "",
    expectedDelivery: row.expected_delivery || "",
    lastUpdated: row.last_updated || "",
    internalNote: row.internal_note || ""
  };
}

export function mapCoupon(row: Row): Coupon {
  const type = (row.type || "fixed").toLowerCase() as CouponType;

  return {
    code: (row.code || "").trim().toUpperCase(),
    description: row.description || "",
    type: type === "percent" ? "percent" : "fixed",
    value: toNumber(row.value),
    minOrderAmount: toNumber(row.min_order_amount),
    maxDiscount: toNumber(row.max_discount),
    active: normalizeYesNo(row.active, true),
    expiresAt: row.expires_at || "",
    usageNote: row.usage_note || ""
  };
}

export function mapOffer(row: Row): OfferBanner {
  return {
    offerId: row.offer_id || row.id || "",
    title: row.title || "GharSet offer",
    description: row.description || "Useful home organizers at better prices.",
    badge: row.badge || "",
    href: row.href || "/shop",
    active: normalizeYesNo(row.active, true),
    sortOrder: toNumber(row.sort_order, 999)
  };
}

export function mapSettings(rows: Row[]): StoreSettings {
  const settings = new Map(rows.map((row) => [row.key, row.value]));
  return {
    whatsappNumber: settings.get("whatsapp_number") || BRAND.whatsappNumber,
    codEnabled: normalizeYesNo(settings.get("cod_enabled") || "yes", true),
    announcementText: settings.get("announcement_text") || DEFAULT_ANNOUNCEMENT,
    defaultDeliveryNote: settings.get("default_delivery_note") || "Delivery usually takes 4–7 working days after confirmation.",
    supportEmail: settings.get("support_email") || BRAND.supportEmail,
    siteUrl: settings.get("site_url") || BRAND.siteUrl,
    brandName: settings.get("brand_name") || BRAND.name,
    brandTagline: settings.get("brand_tagline") || BRAND.tagline
  };
}
