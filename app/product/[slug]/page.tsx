import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { PriceBlock } from "@/components/product/PriceBlock";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getProductBySlug, getRelatedProducts, getVisibleProducts } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const revalidate = 900;

export async function generateStaticParams() {
  const products = await getVisibleProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return siteMetadata({
    title: product ? `${product.name} — GharSet` : "Product — GharSet",
    description: product?.shortDescription
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [settings, related] = await Promise.all([getStoreSettings(), getRelatedProducts(product)]);

  return (
    <>
      <section className="compact-section pb-24 sm:pb-11">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.92fr_0.78fr] lg:gap-8">
            <ProductGallery product={product} />
            <ProductInfo product={product} whatsappNumber={settings.whatsappNumber} />
          </div>
        </Container>
      </section>
      <HowItWorks />
      <Container>
        <RelatedProducts products={related} whatsappNumber={settings.whatsappNumber} />
      </Container>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white p-3 shadow-lift sm:hidden">
        <div className="mx-auto flex max-w-[430px] items-center gap-3">
          <div className="flex-1"><PriceBlock price={product.price} mrp={product.mrp} compact /></div>
          <AddToCartButton product={product} buyNow className="h-12 min-w-[156px]" />
        </div>
      </div>
    </>
  );
}
