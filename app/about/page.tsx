import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "About GharSet" });

export default function AboutPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">About</p>
          <h1 className="mt-2 text-[26px] font-black tracking-tight text-ink sm:text-[34px]">GharSet helps Indian homes stay organized with practical products.</h1>
          <div className="prose-policy mt-4">
            <p>GharSet is a compact catalog for useful home and kitchen organizers. We focus on products that solve everyday storage problems in kitchens, bathrooms, fridges, wardrobes, rented rooms and small homes.</p>
            <p>Our first version uses a COD-first WhatsApp order flow. This allows us to manually confirm product availability, address details and delivery expectations before the order is placed.</p>
            <p>We keep the catalog focused, simple and budget-friendly rather than listing hundreds of random products.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
