import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Return & Refund Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Policy</p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-ink sm:text-[34px]">Return & Refund Policy</h1>
          <div className="prose-policy mt-4">
            <p>Returns, replacements and refunds are handled by GharSet according to product eligibility, issue type, delivery status and quality-check outcome. Not every product is returnable for every reason.</p>
            <h2>Return window</h2>
            <ul><li>Eligible return or exchange requests should be raised within 7 days of delivery unless a different window is confirmed for that product.</li><li>Wrong, damaged, defective or missing-item claims should be reported within 24-48 hours of delivery with clear photos or video.</li><li>Items must be unused, unwashed, unaltered and returned with original packaging, labels, accessories and invoice/order proof where applicable.</li></ul>
            <h2>Non-returnable cases</h2>
            <ul><li>Used, installed, washed, stained, damaged by customer handling or incomplete products may be rejected.</li><li>Minor color, size, packaging or design differences caused by product batch variation are not always eligible for return unless materially different from the confirmed product.</li><li>Clearance, hygiene-sensitive, customized, fragile, consumable or marked non-returnable products may not be accepted for return unless wrong or damaged.</li></ul>
            <h2>Refunds and exchanges</h2>
            <ul><li>Refunds or exchanges are processed after pickup/return is completed and the item passes quality check.</li><li>COD refunds, where approved, may require bank or UPI details from the customer.</li><li>Approved refunds typically take 3-7 working days after quality-check approval, depending on banking and payment partner timelines.</li><li>Delivery charges, COD handling charges, return pickup charges or discounts may be deducted where applicable.</li></ul>
            <p>All claims are reviewed case by case. Contact support with your order number, mobile last 4 digits and issue proof.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
