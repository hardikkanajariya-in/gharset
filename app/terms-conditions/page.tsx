import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Terms & Conditions — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="card p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Policy</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Terms & Conditions</h1>
          <div className="prose-policy mt-4">
            <p>By using GharSet, you agree that this website is a catalog and COD order support platform. Product availability, delivery timelines and prices can change before confirmation.</p>
            <h2>Important points</h2>
            <ul><li>All orders require WhatsApp confirmation.</li><li>Images and product details are shown for reference and may vary slightly by supplier batch.</li><li>We may refuse or cancel orders with incomplete, suspicious or unreachable details.</li><li>Policy pages form part of these terms.</li></ul>
            <p>For questions, contact us through the Contact page or WhatsApp support.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
