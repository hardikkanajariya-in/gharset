import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { Pagination } from "@/components/common/Pagination";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ListingToolbar } from "@/components/product/ListingToolbar";
import { getCategories } from "@/lib/categories";
import { getVisibleProducts } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { paginateItems } from "@/lib/pagination";

export const revalidate = 900;

const PRODUCTS_PER_PAGE = 12;

export default async function ShopPage({
  searchParams
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);

  const [settings, products, categories] = await Promise.all([
    getStoreSettings(),
    getVisibleProducts(),
    getCategories()
  ]);

  const pagination = paginateItems({
    items: products,
    page,
    perPage: PRODUCTS_PER_PAGE
  });

  return (
    <section className="compact-section">
      <Container>
        <PageHeader
          eyebrow="Shop"
          title="Shop all organizers"
          description="Browse compact kitchen, bathroom, fridge, wardrobe and daily-use home organizers."
          aside={<span className="rounded-full bg-primarySoft px-3 py-2 text-xs font-semibold text-primary">COD order on WhatsApp</span>}
        />

        <ListingToolbar categories={categories} activeHref="/shop" resultCount={products.length} />

        <div className="mt-5">
          <ProductGrid
            products={pagination.items}
            whatsappNumber={settings.whatsappNumber}
          />
        </div>

        <Pagination
          basePath="/shop"
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </Container>
    </section>
  );
}
