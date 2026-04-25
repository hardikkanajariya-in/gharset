import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories, getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, settings] = await Promise.all([getProductsByCategory(category.name), getStoreSettings()]);

  return (
    <section className="compact-section">
      <Container>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Category</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{category.description}</p>
        </div>
        <div className="mt-5">
          <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} />
        </div>
      </Container>
    </section>
  );
}
