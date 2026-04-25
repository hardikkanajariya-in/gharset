import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsUnderPrice } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const revalidate = 900;
export const metadata = siteMetadata({ title: "Home Organizers Under ₹499 — GharSet" });

export default async function Under499Page() {
  const [products, settings] = await Promise.all([getProductsUnderPrice(499), getStoreSettings()]);
  return (
    <section className="compact-section">
      <Container>
        <SectionHeader title="Useful finds under ₹499" description="Budget-friendly organizers for kitchen, bathroom, fridge and wardrobe." />
        <div className="mt-5"><ProductGrid products={products} whatsappNumber={settings.whatsappNumber} /></div>
      </Container>
    </section>
  );
}
