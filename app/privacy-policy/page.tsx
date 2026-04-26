import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Privacy Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Policy</p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-ink sm:text-[34px]">Privacy Policy</h1>
          <div className="prose-policy mt-4">
            <p>GharSet collects customer information only to process orders, provide support, prevent misuse and improve the shopping experience.</p>
            <h2>Information we collect</h2>
            <ul><li>Name, mobile number, alternate phone, delivery address, pincode and order notes.</li><li>Order details such as products, quantity, coupon code, delivery charge, payment method and status.</li><li>WhatsApp messages, support requests, issue photos/videos and tracking conversations when shared by the customer.</li></ul>
            <h2>How we use data</h2>
            <ul><li>To confirm COD orders, arrange delivery, update tracking and resolve returns or refunds.</li><li>To detect fake, duplicate, suspicious or failed-delivery orders.</li><li>To maintain operational records in secure tools such as Google Sheets and order-management systems.</li><li>We do not sell customer personal data.</li></ul>
            <h2>Customer rights</h2>
            <ul><li>Customers can ask us to correct inaccurate order details.</li><li>Customers can request deletion of unnecessary support data, subject to legal, fraud-prevention and operational record requirements.</li></ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
