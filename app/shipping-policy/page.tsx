import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Shipping Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="card p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Policy</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Shipping Policy</h1>
          <div className="prose-policy mt-4">
            <p>GharSet currently operates as a manual COD catalog. Delivery timelines depend on product availability, supplier dispatch and customer location.</p>
            <h2>Important points</h2>
            <ul><li>Typical delivery estimate is 4–7 working days after confirmation.</li><li>Some products or pin codes may take longer.</li><li>Tracking status can be checked using the Track Order page after an order ID is issued.</li><li>We are not responsible for delays caused by incorrect address or unreachable phone number.</li></ul>
            <p>For questions, contact us through the Contact page or WhatsApp support.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
