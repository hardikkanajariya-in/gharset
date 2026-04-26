import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Checkout — GharSet" });

export default function CheckoutPage() {
  return (
    <section className="compact-section">
      <Container>
        <PageHeader
          eyebrow="Checkout"
          title="Delivery details"
          description="Enter the details needed to process the COD order and open WhatsApp for final confirmation."
        />
        <div className="mt-5">
          <CheckoutForm />
        </div>
      </Container>
    </section>
  );
}
