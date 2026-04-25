import { Container } from "@/components/common/Container";
import { Pagination } from "@/components/common/Pagination";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
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

  const settings = await getStoreSettings();
  const products = await getVisibleProducts();

  const pagination = paginateItems({
    items: products,
    page,
    perPage: PRODUCTS_PER_PAGE
  });

  return (
    <section className="compact-section">
      <Container>
        <SectionHeader
          title="Shop all organizers"
          description="Browse compact kitchen, bathroom, fridge, wardrobe and daily-use home organizers."
        />

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