import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsUnderPrice } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const revalidate = 900;
export const metadata = siteMetadata({ title: "Home Organizers Under ₹299 — GharSet" });

export default async function Under299Page() {
  const [products, settings] = await Promise.all([getProductsUnderPrice(299), getStoreSettings()]);
  return (
    <section className="compact-section">
      <Container>
        <SectionHeader title="Useful organizers under ₹299" description="Small, easy-to-test products for daily home spaces." />
        <div className="mt-5"><ProductGrid products={products} whatsappNumber={settings.whatsappNumber} /></div>
      </Container>
    </section>
  );
}
