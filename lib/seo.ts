import type { Metadata } from "next";
import { BRAND } from "./constants";

export function siteMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title || `${BRAND.name} — ${BRAND.tagline}`;
  const description =
    overrides.description ||
    "Compact kitchen, bathroom, fridge and wardrobe organizers for Indian homes. COD orders through WhatsApp.";

  return {
    metadataBase: new URL(BRAND.siteUrl),
    title,
    description,
    openGraph: {
      title: String(title),
      description: String(description),
      url: BRAND.siteUrl,
      siteName: BRAND.name,
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: BRAND.name }],
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: String(title),
      description: String(description),
      images: ["/og-image.svg"]
    },
    ...overrides
  };
}
