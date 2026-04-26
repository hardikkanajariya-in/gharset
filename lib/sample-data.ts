import type { Bundle } from "@/types/bundle";
import type { Category } from "@/types/category";
import type { Coupon } from "@/types/coupon";
import type { OfferBanner } from "@/types/offer";
import type { Order } from "@/types/order";
import type { Product } from "@/types/product";
import type { StoreSettings } from "@/types/settings";
import { BRAND, DEFAULT_ANNOUNCEMENT } from "./constants";

export const sampleSettings: StoreSettings = {
  whatsappNumber: BRAND.whatsappNumber,
  codEnabled: true,
  announcementText: DEFAULT_ANNOUNCEMENT,
  defaultDeliveryNote: "Delivery usually takes 4–7 working days after WhatsApp confirmation.",
  supportEmail: BRAND.supportEmail,
  siteUrl: BRAND.siteUrl,
  brandName: BRAND.name,
  brandTagline: BRAND.tagline
};

export const sampleCategories: Category[] = [
  {
    categoryId: "CAT-001",
    name: "Kitchen Organizers",
    slug: "kitchen-organizers",
    description: "Space-saving products for sink, shelves, fridge and daily kitchen use.",
    visible: true,
    sortOrder: 1
  },
  {
    categoryId: "CAT-002",
    name: "Bathroom Organizers",
    slug: "bathroom-organizers",
    description: "Compact shelves, holders and hooks for cleaner bathroom spaces.",
    visible: true,
    sortOrder: 2
  },
  {
    categoryId: "CAT-003",
    name: "Fridge Organizers",
    slug: "fridge-organizers",
    description: "Boxes and trays to keep fruits, bottles and leftovers easy to access.",
    visible: true,
    sortOrder: 3
  },
  {
    categoryId: "CAT-004",
    name: "Wardrobe Organizers",
    slug: "wardrobe-organizers",
    description: "Simple storage helpers for clothes, drawers and small rooms.",
    visible: true,
    sortOrder: 4
  }
];

export const sampleProducts: Product[] = [
  {
    productId: "GS-KIT-001",
    slug: "sink-organizer-stand",
    name: "Kitchen Sink Organizer Stand",
    shortDescription: "Keeps soap, sponge and scrub in one clean corner.",
    category: "Kitchen Organizers",
    subcategory: "Sink Area",
    price: 249,
    mrp: 399,
    supplierPrice: 160,
    margin: 89,
    imageDriveIds: [],
    imageAlt: "Kitchen sink organizer stand",
    material: "Plastic",
    dimensions: "22 x 10 x 8 cm",
    bestFor: "Small kitchens and rented homes",
    features: ["Keeps sink area clean", "Easy to wash", "Compact daily-use design"],
    whatsInBox: "1 sink organizer",
    stockStatus: "in_stock",
    featured: true,
    visible: true,
    sortOrder: 1,
    tags: ["kitchen", "sink", "under-299"]
  },
  {
    productId: "GS-KIT-002",
    slug: "oil-bottle-dispenser-set",
    name: "Oil Bottle Dispenser Set",
    shortDescription: "A neat bottle set for daily cooking oil and sauces.",
    category: "Kitchen Organizers",
    subcategory: "Oil & Spices",
    price: 349,
    mrp: 599,
    supplierPrice: 235,
    margin: 114,
    imageDriveIds: [],
    imageAlt: "Oil bottle dispenser for kitchen",
    material: "Food-grade plastic",
    dimensions: "500 ml each",
    bestFor: "Daily cooking counters",
    features: ["Cleaner pouring", "Easy refill opening", "Keeps counter organized"],
    whatsInBox: "2 dispenser bottles",
    stockStatus: "in_stock",
    featured: true,
    visible: true,
    sortOrder: 2,
    tags: ["kitchen", "oil", "under-499"]
  },
  {
    productId: "GS-KIT-003",
    slug: "compact-spice-rack",
    name: "Compact Spice Rack",
    shortDescription: "Keeps masala jars visible and easy to reach.",
    category: "Kitchen Organizers",
    subcategory: "Oil & Spices",
    price: 399,
    mrp: 699,
    supplierPrice: 270,
    margin: 129,
    imageDriveIds: [],
    imageAlt: "Compact spice rack",
    material: "Plastic / metal finish varies",
    dimensions: "Approx. 30 x 12 x 14 cm",
    bestFor: "Masala jars and small bottles",
    features: ["Space-saving rack", "Easy to move", "Useful for compact shelves"],
    whatsInBox: "1 spice rack",
    stockStatus: "limited",
    featured: true,
    visible: true,
    sortOrder: 3,
    tags: ["kitchen", "spice", "under-499"]
  },
  {
    productId: "GS-FRG-001",
    slug: "fridge-storage-box",
    name: "Fridge Storage Box",
    shortDescription: "Organizes fruits, packets and leftovers neatly.",
    category: "Fridge Organizers",
    subcategory: "Storage Box",
    price: 199,
    mrp: 349,
    supplierPrice: 130,
    margin: 69,
    imageDriveIds: [],
    imageAlt: "Fridge storage box",
    material: "Plastic",
    dimensions: "Approx. 26 x 15 x 8 cm",
    bestFor: "Fridge shelves and fruits",
    features: ["Better fridge visibility", "Stack-friendly", "Lightweight"],
    whatsInBox: "1 storage box",
    stockStatus: "in_stock",
    featured: false,
    visible: true,
    sortOrder: 4,
    tags: ["fridge", "under-299"]
  },
  {
    productId: "GS-BTH-001",
    slug: "wall-mounted-bathroom-shelf",
    name: "Wall Mounted Bathroom Shelf",
    shortDescription: "Keeps shampoo, soap and daily items off the floor.",
    category: "Bathroom Organizers",
    subcategory: "Wall Shelf",
    price: 299,
    mrp: 499,
    supplierPrice: 200,
    margin: 99,
    imageDriveIds: [],
    imageAlt: "Wall mounted bathroom shelf",
    material: "Plastic",
    dimensions: "Approx. 28 x 11 x 8 cm",
    bestFor: "Compact bathrooms",
    features: ["Wall mounted", "No-drill variants may depend on product", "Keeps bathroom cleaner"],
    whatsInBox: "1 bathroom shelf",
    stockStatus: "in_stock",
    featured: true,
    visible: true,
    sortOrder: 5,
    tags: ["bathroom", "shelf", "under-299"]
  },
  {
    productId: "GS-BTH-002",
    slug: "toothbrush-holder-with-hooks",
    name: "Toothbrush Holder With Hooks",
    shortDescription: "A compact holder for toothbrushes and small bathroom items.",
    category: "Bathroom Organizers",
    subcategory: "Holder",
    price: 179,
    mrp: 299,
    supplierPrice: 115,
    margin: 64,
    imageDriveIds: [],
    imageAlt: "Toothbrush holder with hooks",
    material: "Plastic",
    dimensions: "Approx. 18 x 8 x 7 cm",
    bestFor: "Family bathrooms and rented rooms",
    features: ["Compact wall holder", "Useful hooks", "Easy daily access"],
    whatsInBox: "1 toothbrush holder",
    stockStatus: "in_stock",
    featured: false,
    visible: true,
    sortOrder: 6,
    tags: ["bathroom", "under-299"]
  },
  {
    productId: "GS-WRD-001",
    slug: "drawer-divider-organizer",
    name: "Drawer Divider Organizer",
    shortDescription: "Separates socks, innerwear and small clothes neatly.",
    category: "Wardrobe Organizers",
    subcategory: "Drawer",
    price: 229,
    mrp: 399,
    supplierPrice: 150,
    margin: 79,
    imageDriveIds: [],
    imageAlt: "Drawer divider organizer",
    material: "Fabric / plastic mesh varies",
    dimensions: "Approx. 32 x 24 x 10 cm",
    bestFor: "Wardrobes and drawers",
    features: ["Easy compartment storage", "Foldable", "Good for small wardrobes"],
    whatsInBox: "1 drawer organizer",
    stockStatus: "in_stock",
    featured: false,
    visible: true,
    sortOrder: 7,
    tags: ["wardrobe", "under-299"]
  },
  {
    productId: "GS-ROM-001",
    slug: "multi-purpose-wall-hooks",
    name: "Multi-purpose Wall Hooks",
    shortDescription: "Useful hooks for kitchen, bathroom or rented rooms.",
    category: "Wardrobe Organizers",
    subcategory: "Hooks",
    price: 149,
    mrp: 249,
    supplierPrice: 90,
    margin: 59,
    imageDriveIds: [],
    imageAlt: "Multi purpose wall hooks",
    material: "Plastic / adhesive",
    dimensions: "Pack size varies",
    bestFor: "Keys, towels and daily-use items",
    features: ["Budget-friendly", "Multi-room use", "Easy to place"],
    whatsInBox: "Hook set",
    stockStatus: "in_stock",
    featured: false,
    visible: true,
    sortOrder: 8,
    tags: ["hooks", "under-299", "rented room"]
  }
];

export const sampleBundles: Bundle[] = [
  {
    bundleId: "BND-001",
    slug: "kitchen-clean-setup",
    name: "Kitchen Clean Setup",
    shortDescription: "A starter kit to organize sink, oil bottles, spices and fridge space.",
    productIds: ["GS-KIT-001", "GS-KIT-002", "GS-KIT-003", "GS-FRG-001"],
    price: 899,
    mrp: 1299,
    visible: true,
    featured: true,
    sortOrder: 1
  },
  {
    bundleId: "BND-002",
    slug: "bathroom-fresh-setup",
    name: "Bathroom Fresh Setup",
    shortDescription: "Compact holders and shelves for cleaner bathroom counters.",
    productIds: ["GS-BTH-001", "GS-BTH-002", "GS-ROM-001"],
    price: 599,
    mrp: 899,
    visible: true,
    featured: true,
    sortOrder: 2
  },
  {
    bundleId: "BND-003",
    slug: "rented-room-setup",
    name: "Rented Room Setup",
    shortDescription: "Budget organizers for rented flats, PG rooms and small spaces.",
    productIds: ["GS-ROM-001", "GS-WRD-001", "GS-BTH-002"],
    price: 499,
    mrp: 747,
    visible: true,
    featured: true,
    sortOrder: 3
  }
];

export const sampleCoupons: Coupon[] = [
  {
    code: "GHARSET50",
    description: "Sample launch coupon",
    type: "fixed",
    value: 50,
    minOrderAmount: 499,
    maxDiscount: 50,
    active: true,
    usageNote: "₹50 off applied."
  },
  {
    code: "SET10",
    description: "Sample percent coupon",
    type: "percent",
    value: 10,
    minOrderAmount: 999,
    maxDiscount: 150,
    active: true,
    usageNote: "10% off applied."
  }
];

export const sampleOffers: OfferBanner[] = [
  {
    offerId: "OFF-001",
    title: "Kitchen reset under ₹999",
    description: "Build a compact kitchen setup with sink, spice and fridge organizers.",
    badge: "Combo value",
    href: "/combo-kits",
    active: true,
    sortOrder: 1
  },
  {
    offerId: "OFF-002",
    title: "Budget organizers under ₹499",
    description: "Small daily-use upgrades for bathrooms, shelves and rented rooms.",
    badge: "Budget picks",
    href: "/under-499",
    active: true,
    sortOrder: 2
  }
];

export const sampleOrders: Order[] = [
  {
    orderId: "GS-1001",
    orderDate: "2026-04-26",
    customerName: "Rina Ben",
    phone: "9876543210",
    productIds: ["GS-KIT-001"],
    productNames: ["Kitchen Sink Organizer Stand"],
    orderAmount: 249,
    supplierCost: 160,
    profit: 89,
    paymentMethod: "COD",
    status: "Customer Confirmed",
    trackingNote: "Your COD order is confirmed and will be placed with supplier.",
    expectedDelivery: "4–7 working days",
    lastUpdated: "2026-04-26"
  }
];
