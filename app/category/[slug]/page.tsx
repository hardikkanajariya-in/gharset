import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { Pagination } from "@/components/common/Pagination";
import { ListingToolbar } from "@/components/product/ListingToolbar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories, getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";
import { paginateItems } from "@/lib/pagination";

export const revalidate = 900;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return siteMetadata({ title: category ? `${category.name} — GharSet` : "Category — GharSet", description: category?.description });
}

const PRODUCTS_PER_PAGE = 12;

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const page = Number(query?.page || 1);
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, settings, categories] = await Promise.all([
    getProductsByCategory(category.name),
    getStoreSettings(),
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
          eyebrow="Category"
          title={category.name}
          description={category.description}
          aside={<span className="rounded-full bg-mutedSurface px-3 py-2 text-xs font-black text-mutedStrong">Fast product discovery</span>}
        />
        <ListingToolbar categories={categories} activeHref={`/category/${category.slug}`} resultCount={products.length} />
        <div className="mt-5">
          <ProductGrid products={pagination.items} whatsappNumber={settings.whatsappNumber} />
        </div>
        <Pagination
          basePath={`/category/${category.slug}`}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </Container>
    </section>
  );
}
