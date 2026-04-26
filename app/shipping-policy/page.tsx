import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Shipping Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">Policy</p>
          <h1 className="mt-2 text-[26px] font-black tracking-tight text-ink sm:text-[34px]">Shipping Policy</h1>
          <div className="prose-policy mt-4">
            <p>GharSet ships confirmed orders through third-party delivery partners. Delivery availability, delivery charges and expected timelines may vary by product, location, order value and courier coverage.</p>
            <h2>Delivery timeline</h2>
            <ul><li>Most confirmed orders are usually delivered within 4-9 working days.</li><li>Remote locations, weather issues, courier delays, local restrictions or high-demand periods may take longer.</li><li>Dispatch begins only after order details are verified and the product is available.</li><li>Tracking is available after an order number is issued and updated in our order records.</li></ul>
            <h2>Delivery charges</h2>
            <ul><li>Some products include free delivery and some may carry a delivery charge.</li><li>Delivery charges are shown during checkout and included in the final COD amount.</li><li>If a product is returned, delivery and reverse pickup charges may be non-refundable where applicable.</li></ul>
            <h2>Failed delivery</h2>
            <ul><li>Incorrect addresses, unavailable customers or refused COD delivery may result in cancellation or return to origin.</li><li>We may decline future COD orders after repeated failed deliveries.</li></ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
