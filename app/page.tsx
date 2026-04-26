import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BundleGrid } from "@/components/bundle/BundleGrid";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ShopByProblem } from "@/components/home/ShopByProblem";
import { TrustSection } from "@/components/home/TrustSection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedBundles, getBundleProducts } from "@/lib/bundles";
import { getFeaturedProducts, getProductsUnderPrice } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { getActiveOffers } from "@/lib/offers";

export const revalidate = 900;

export default async function HomePage() {
  const settings = await getStoreSettings();
  const featuredProducts = await getFeaturedProducts(8);
  const under499 = await getProductsUnderPrice(499);
  const bundles = await getFeaturedBundles(3);
  const offers = await getActiveOffers(2);
  const bundleItems = await Promise.all(bundles.map(async (bundle) => ({ bundle, products: await getBundleProducts(bundle) })));

  return (
    <>
      <HeroSection whatsappNumber={settings.whatsappNumber} offers={offers} />
      <ShopByProblem />
      <section className="compact-section">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeader title="Featured organizers" description="A compact selection of practical daily-use products." />
            <Link href="/shop" className="hidden rounded-full border border-lineStrong bg-white px-4 py-2 text-sm font-semibold text-primary shadow-soft transition hover:border-primary sm:inline-flex">View all</Link>
          </div>
          <div className="mt-5">
            <ProductGrid products={featuredProducts} whatsappNumber={settings.whatsappNumber} />
          </div>
        </Container>
      </section>
      <section className="compact-section bg-white">
        <Container>
          <SectionHeader title="Combo kits" description="Bundles designed around a specific space so customers buy a complete solution." />
          <div className="mt-5">
            <BundleGrid items={bundleItems} whatsappNumber={settings.whatsappNumber} />
          </div>
        </Container>
      </section>
      <section className="compact-section">
        <Container>
          <SectionHeader title="Useful finds under ₹499" description="Affordable home upgrades that are easy to test and promote." />
          <div className="mt-5">
            <ProductGrid products={under499.slice(0, 8)} whatsappNumber={settings.whatsappNumber} />
          </div>
        </Container>
      </section>
      <HowItWorks />
      <TrustSection />
    </>
  );
}
