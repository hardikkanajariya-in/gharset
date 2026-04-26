import { BundleGrid } from "@/components/bundle/BundleGrid";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { ListingToolbar } from "@/components/product/ListingToolbar";
import { getBundles, getBundleProducts } from "@/lib/bundles";
import { getCategories } from "@/lib/categories";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const revalidate = 900;
export const metadata = siteMetadata({ title: "Combo Kits — GharSet", description: "Value-focused home organization combo kits for kitchen, bathroom and rented rooms." });

export default async function ComboKitsPage() {
  const [bundles, settings, categories] = await Promise.all([getBundles(), getStoreSettings(), getCategories()]);
  const bundleItems = await Promise.all(bundles.map(async (bundle) => ({ bundle, products: await getBundleProducts(bundle) })));

  return (
    <section className="compact-section">
      <Container>
        <PageHeader
          eyebrow="Bundles"
          title="Combo kits"
          description="Higher-value bundles that solve one home organization problem at a time."
          aside={<span className="rounded-full bg-accentSoft px-3 py-2 text-xs font-semibold text-accent">Savings shown clearly</span>}
        />
        <ListingToolbar categories={categories} activeHref="/combo-kits" resultCount={bundles.length} label="Kits" />
        <div className="mt-5">
          <BundleGrid items={bundleItems} whatsappNumber={settings.whatsappNumber} />
        </div>
      </Container>
    </section>
  );
}
