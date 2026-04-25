import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { Pagination } from "@/components/common/Pagination";
import { ListingToolbar } from "@/components/product/ListingToolbar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories } from "@/lib/categories";
import { getProductsUnderPrice } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";
import { paginateItems } from "@/lib/pagination";

export const revalidate = 900;
export const metadata = siteMetadata({ title: "Home Organizers Under ₹499 — GharSet" });

const PRODUCTS_PER_PAGE = 12;

export default async function Under499Page({
  searchParams
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const [products, settings, categories] = await Promise.all([getProductsUnderPrice(499), getStoreSettings(), getCategories()]);
  const pagination = paginateItems({ items: products, page, perPage: PRODUCTS_PER_PAGE });

  return (
    <section className="compact-section">
      <Container>
        <PageHeader eyebrow="Budget picks" title="Useful finds under ₹499" description="Budget-friendly organizers for kitchen, bathroom, fridge and wardrobe." />
        <ListingToolbar categories={categories} activeHref="/under-499" resultCount={products.length} />
        <div className="mt-5"><ProductGrid products={pagination.items} whatsappNumber={settings.whatsappNumber} /></div>
        <Pagination basePath="/under-499" currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      </Container>
    </section>
  );
}
