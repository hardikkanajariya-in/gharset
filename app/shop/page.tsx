import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductBrowser } from "@/components/product/ProductBrowser";
import { getVisibleProducts } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const revalidate = 900;
export const metadata = siteMetadata({ title: "Shop Home Organizers — GharSet" });

export default async function ShopPage() {
  const [products, settings] = await Promise.all([getVisibleProducts(), getStoreSettings()]);
  return (
    <section className="compact-section">
      <Container>
        <SectionHeader title="Shop all organizers" description="Browse the full GharSet catalog. Filter by space, price and daily-use need." />
        <div className="mt-5">
          <ProductBrowser products={products} whatsappNumber={settings.whatsappNumber} />
        </div>
      </Container>
    </section>
  );
}
