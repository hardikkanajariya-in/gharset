import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsUnderPrice } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const revalidate = 900;
export const metadata = siteMetadata({ title: "Home Organizers Under ₹999 — GharSet" });

export default async function Under999Page() {
  const [products, settings] = await Promise.all([getProductsUnderPrice(999), getStoreSettings()]);
  return (
    <section className="compact-section">
      <Container>
        <SectionHeader title="Home upgrades under ₹999" description="Practical products and higher-value organizers that still stay budget friendly." />
        <div className="mt-5"><ProductGrid products={products} whatsappNumber={settings.whatsappNumber} /></div>
      </Container>
    </section>
  );
}
