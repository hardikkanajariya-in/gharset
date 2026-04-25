export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "GharSet",
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Smart organizers for every Indian home.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@gharset.in",
  businessCity: process.env.NEXT_PUBLIC_BUSINESS_CITY || "India",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX"
};

export const NAV_ITEMS = [
  { label: "Shop", href: "/shop" },
  { label: "Kitchen", href: "/category/kitchen-organizers" },
  { label: "Bathroom", href: "/category/bathroom-organizers" },
  { label: "Combo Kits", href: "/combo-kits" },
  { label: "Under ₹499", href: "/under-499" },
  { label: "Track Order", href: "/track-order" }
];

export const STATUS_STEPS = [
  "Customer Confirmed",
  "Placed with Supplier",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];

export const DEFAULT_ANNOUNCEMENT = "COD available on selected products · WhatsApp order support · New organizer kits added";
