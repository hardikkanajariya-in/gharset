import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "COD Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="card p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Policy</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">COD Policy</h1>
          <div className="prose-policy mt-4">
            <p>COD is available on selected products after WhatsApp confirmation. Availability may depend on product stock, supplier support and delivery location. Orders are considered confirmed only after we verify your details and confirm the order on WhatsApp.</p>
            <h2>Important points</h2>
            <ul><li>We may cancel fake, incomplete or unreachable COD orders.</li><li>Customers should share accurate address and phone details.</li><li>COD amount is paid to the delivery partner at delivery time.</li><li>Product availability and delivery date may change before confirmation.</li></ul>
            <p>For questions, contact us through the Contact page or WhatsApp support.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
