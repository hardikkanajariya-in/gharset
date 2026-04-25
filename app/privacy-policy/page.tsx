import { Container } from "@/components/common/Container";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Privacy Policy — GharSet" });

export default function PolicyPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <div className="page-panel p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">Policy</p>
          <h1 className="mt-2 text-[26px] font-black tracking-tight text-ink sm:text-[34px]">Privacy Policy</h1>
          <div className="prose-policy mt-4">
            <p>We collect only the information needed to process COD orders, support requests and product suggestions.</p>
            <h2>Important points</h2>
            <ul><li>This may include name, phone number, address, order details and WhatsApp messages.</li><li>We do not sell customer personal data.</li><li>Order data may be stored in Google Sheets and used only for order support and operations.</li><li>Customers can contact us to correct or remove unnecessary personal data.</li></ul>
            <p>For questions, contact us through the Contact page or WhatsApp support.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
