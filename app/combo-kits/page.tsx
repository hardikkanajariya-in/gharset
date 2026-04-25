import { BundleGrid } from "@/components/bundle/BundleGrid";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getBundles, getBundleProducts } from "@/lib/bundles";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const revalidate = 900;
export const metadata = siteMetadata({ title: "Combo Kits — GharSet", description: "Value-focused home organization combo kits for kitchen, bathroom and rented rooms." });

export default async function ComboKitsPage() {
  const [bundles, settings] = await Promise.all([getBundles(), getStoreSettings()]);
  const bundleItems = await Promise.all(bundles.map(async (bundle) => ({ bundle, products: await getBundleProducts(bundle) })));

  return (
    <section className="compact-section">
      <Container>
        <SectionHeader title="Combo kits" description="Higher-value bundles that solve one home organization problem at a time." />
        <div className="mt-5">
          <BundleGrid items={bundleItems} whatsappNumber={settings.whatsappNumber} />
        </div>
      </Container>
    </section>
  );
}
