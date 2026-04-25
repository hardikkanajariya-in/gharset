import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Return & Refund Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">Policy</p>
          <h1 className="mt-2 text-[26px] font-black tracking-tight text-ink sm:text-[34px]">Return & Refund Policy</h1>
          <div className="prose-policy mt-4">
            <p>Return and exchange eligibility may depend on product category, supplier policy and delivery condition. We clearly communicate important product details before order confirmation.</p>
            <h2>Important points</h2>
            <ul><li>Report product issues quickly on WhatsApp with photos/video.</li><li>Used, damaged-by-customer or missing-item claims may be rejected.</li><li>Size, color and design can slightly vary depending on supplier batch. We try to show clear details before confirmation.</li><li>Refunds, if applicable, follow the supplier or payment method process.</li></ul>
            <p>For questions, contact us through the Contact page or WhatsApp support.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
