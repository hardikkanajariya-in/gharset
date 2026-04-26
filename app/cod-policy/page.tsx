import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "COD Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Policy</p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-ink sm:text-[34px]">COD Policy</h1>
          <div className="prose-policy mt-4">
            <p>Cash on Delivery is available on selected GharSet products and serviceable pin codes. A website order is recorded first, then verified on WhatsApp before it is processed for dispatch.</p>
            <h2>COD confirmation</h2>
            <ul><li>Customer name, mobile number, full address and pincode must be accurate.</li><li>Orders with incomplete details, unreachable phone numbers or repeated failed delivery history may be cancelled.</li><li>Product availability, delivery charges and delivery estimate are confirmed before dispatch.</li><li>The payable amount is collected by the delivery partner at the time of delivery.</li></ul>
            <h2>Refusal and fake order control</h2>
            <ul><li>We may reject suspicious, duplicate or bulk COD orders.</li><li>Customers may be asked to reconfirm high-value, multi-item or paid-delivery orders on WhatsApp.</li><li>If the delivery partner is unable to reach the customer, the order may be marked failed or returned.</li></ul>
            <p>For COD help, use the Contact page or WhatsApp support with your order number.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
