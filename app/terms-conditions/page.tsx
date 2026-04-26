import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Terms & Conditions — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">Policy</p>
          <h1 className="mt-2 text-[26px] font-black tracking-tight text-ink sm:text-[34px]">Terms & Conditions</h1>
          <div className="prose-policy mt-4">
            <p>By using GharSet, placing an order or contacting us for support, you agree to these terms and the related shipping, COD, return and privacy policies.</p>
            <h2>Catalog and product information</h2>
            <ul><li>GharSet is a product catalog and assisted COD ordering platform for home organization products.</li><li>Images, colors, dimensions, packaging and accessories are shown for reference and may vary slightly by batch.</li><li>Prices, offers, coupons, delivery charges and availability may change before final confirmation.</li><li>We may correct listing errors, cancel unavailable products or suggest alternatives before dispatch.</li></ul>
            <h2>Orders and cancellation</h2>
            <ul><li>Orders are processed only after customer details and product availability are verified.</li><li>Customers may request cancellation before dispatch. Once dispatched, cancellation may not be possible and refusal at delivery may be treated as failed delivery.</li><li>We may cancel suspicious, duplicate, unreachable or serviceability-failed orders.</li></ul>
            <h2>Customer responsibilities</h2>
            <ul><li>Provide accurate name, mobile number, address, pincode and delivery instructions.</li><li>Inspect the package at delivery and report issues within the stated window.</li><li>Use products only as intended and follow product-specific care or installation instructions.</li></ul>
            <p>These terms are governed by applicable Indian laws. For help, contact GharSet support with your order details.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
